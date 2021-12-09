<template>
  <RecycleScroller
    :class="$style.scroller"
    :items="rows"
    :item-size="55"
    :buffer="2000"
    page-mode
    key-field="id"
    v-slot="{ item }"
  >
    <slot v-bind="{ item }"></slot>
  </RecycleScroller>
</template>

<script>

export default {
  name: 'VirtalScrollWrapper',
  props: {
    rows: {
      type: Array,
      default: () => []
    },
  },
  // async created() {
  //   const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
  //   this.rows = await res.json();
  // },
  // data() {
  //   return {
  //     rows: [],
  //     rendered: false
  //   };
  // }

};
</script>

<style module>
.scroller {
  text-align: left;
  margin: 24px;
}

.scroller, .scroller > div, .scroller > div > div {
  display: contents !important;
  text-align: center;
}
</style>
