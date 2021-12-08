<script lang="jsx">
import orderBy from "lodash.orderby";
import Pager from "@/components/Table/Pager";

const props = {
  data: {
    type: Array,
    default: () => []
  },
  orderedBy: {
    type: Array,
    default: () => [] // array of titles
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    required: false
  }
};

export default {
  name: "b-table",
  components: {
    Pager
  },
  props,
  data() {
    return {
      orderedColumns: {},
      filterTextByColumn: {},
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersected");
        console.log(this.$refs.body);
      }
    }, { threshold: 0.9 });

    this.observer.observe(this.$refs.body);
  },
  destroyed() {
    this.observer.disconnect();
  },
  computed: {
    orderedMap() {
      return Object.entries(this.orderedColumns)
        .reduce((acc, [key, value]) => ({
          keys: [...acc.keys, key],
          values: [value, ...acc.values]
        }), {keys: [], values: []})
    },
    rows() {
      let rows = Object.keys(this.filterTextByColumn).length > 0
        ? this.filterRows(this.filterTextByColumn, this.data)
        : this.data;

      if (this.itemsPerPage) {
          rows = rows.slice(
            (this.currentPage - 1) * this.itemsPerPage,
            this.currentPage * this.itemsPerPage
          );
      }

      return this.orderedMap.keys.length > 0
        ? orderBy(rows, this.orderedMap.keys, this.orderedMap.values)
        : rows
    }
  },
  methods: {
    toggleOrderedColumn(prop) {
      this.$set(this.orderedColumns, prop, this.orderedColumns?.[prop] === "asc" ? "desc" : "asc")
    },
    changeFilter(prop, value) {
      this.$set(this.filterTextByColumn, prop, value);
    },
    filterRows(filters, rows) {
      return rows.filter(row => {
        return Object.keys(filters)
          .every(prop => String(row[prop]) === String(filters[prop]))
      });
    },
    renderHead(h, columnsOptions) {
      return columnsOptions.map((column) => {
        const renderedTitle = column.scopedSlots.title ? column.scopedSlots.title() : column.title;

        return (
          <th key={column.title}
              class={[this.$style?.headerCell]}>
            <div>
              <span>{renderedTitle}</span>
              <font-awesome-icon style={{padding: "0 4px"}}
                                 on={{click: () => this.toggleOrderedColumn(column.prop)}}
                                 icon={this.orderedColumns?.[column.prop] === "asc" ? "caret-up" : "caret-down"}/>
              <input type="text"
                     class="filter-input"
                     value={this.filterTextByColumn?.[column.prop]}
                     on={{change: ({target: {value}}) => this.changeFilter(column.prop, value)}}/>
            </div>
          </th>
        );
      });
    },
    renderRows(h, columnsOptions) {
      return this.rows.map((row, index) => {
        return <tr key={row?.id ?? index}>
          {...this.renderColumns(h, row, columnsOptions[index % columnsOptions.length]?.title, columnsOptions)}
        </tr>;
      });
    },
    renderColumns(h, row, prop, columnsOptions) {
      return columnsOptions.map((column, index) => {
        return (
          <td key={index} class={this.$style?.cell}>
            {column.scopedSlots.body
              ? column.scopedSlots.body({row})
              : row[column.prop]}
          </td>
        );
      });
    },
    getColumnOptions() {
      return this.$slots.default
        .filter(item => item.componentOptions && item.componentOptions.tag === 'b-table-column')
        .map(column =>
          Object.assign({}, column.componentOptions.propsData, {
              scopedSlots: column.data.scopedSlots || {},
            }
          )
        );
    }
  },
  render(h) {
    const columnsOptions = this.getColumnOptions();
    const columnsHead = this.renderHead(h, columnsOptions);
    const rows = this.renderRows(h, columnsOptions);

    return (
      <div>
        <table className={this.$style?.table}>
          <thead>{...columnsHead}</thead>
          <tbody ref="body">{...rows}</tbody>
        </table>
        {this.itemsPerPage &&
          <Pager currentPage={this.currentPage} on={{change: page => this.$emit("onPageChange", page)}}/>}
      </div>
    );
  }
}
</script>
<style>
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 10px;
}

td {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid lightgray;
}

th {
  cursor: pointer;
}
</style>
