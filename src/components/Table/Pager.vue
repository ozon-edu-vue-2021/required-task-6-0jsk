<script lang="jsx">
const props = {
  currentPage: {
    type: Number,
    default: 1
  },
  size: {
    type: Number,
    default: 5
  }
};

export default {
  name: "b-pager",
  props,
  // eslint-disable-next-line no-unused-vars
  render(h) {
    return <div class="pager">
      {[...Array(this.size).keys()]
        .map(k => <h3 class="page" on={{ click: () =>
            this.$emit('change', this.currentPage === 1 ? this.currentPage + k : this.currentPage + k - 1) }}>
          {this.currentPage === 1 ? this.currentPage + k : this.currentPage + k - 1}
        </h3>)}
    </div>;
  }
};
</script>
<style>
  .pager {
    display: flex;
    align-items: center;
    width: 300px;
    justify-content: space-between;
  }

  .page {
    cursor: pointer;
  }
</style>
