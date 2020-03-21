<template>
  <div id="apperbe">
    <ErbeList />
  </div>
</template>

<script>
import ErbeList from "./components/ErbeList.vue";
export default {
  name: "AppErbe",
  components: {
    ErbeList
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
