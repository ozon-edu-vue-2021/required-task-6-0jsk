<template>
  <div id="app">
    <b-table :data="rows" :current-page="currentPage" @intersected="intersected">
      <b-table-column prop="id" title="ID" />
      <b-table-column prop="postId" title="Post ID" />

      <b-table-column prop="email">
        <template #title>
          <b>Email</b>
        </template>

        <template #body="{ row }">
          <a :href="`mailto:${row.email}`">{{ row.email }}</a>
        </template>
      </b-table-column>

      <b-table-column prop="name" title="Name" />
    </b-table>
  </div>
</template>

<script>
import { BTableColumn, BTable } from "@/components/Table";

export default {
  name: 'App',
  components: {
    BTable,
    BTableColumn
  },
  // async created() {
  //   const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
  //   this.rows = await res.json();
  // },
  data() {
    return {
      rows: [],
      currentPage: 1,
    };
  },
  watch: {
    rows(v) {
      console.log({rows: v});
    }
  },
  methods: {
    async intersected() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${this.currentPage}&_limit=50`
      );

      this.currentPage += 1;
      const newRows = await res.json();
      this.rows = [...this.rows, ...newRows];
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
