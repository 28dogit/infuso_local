<template>
  <div id="app">
    <TisaneList />
  </div>
</template>

<script>
import TisaneList from "./components/TisaneList.vue";
export default {
  name: "App",
  components: {
    TisaneList
  }
};
</script>

<style lang="scss" scoped>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
