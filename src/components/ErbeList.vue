<template>
  <div id="vue-erbe">
    <div class="search-wrapper">
      <v-text-field v-model="search" label="Cerca tra le erbe"></v-text-field>
    </div>

    <v-tabs v-model="name" background-color="primary" dark>
      <v-tab v-for="cat in erbecat" :key="cat.name">{{cat.name}}</v-tab>
    </v-tabs>
    <!-- <v-tabs-items v-model="name">
      <v-tab-item v-for="post in filteredList" :key="post.name">
        <v-card flat>
          <v-card-text>{{ post.name }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>-->
    <div class="vue-erbe-list">
      <v-list-item v-for="post in filteredList" :key="post.name">
        <a :href="post.permalink">
          <img class="post-image" v-if="post.images.length != 0" :src="post.images[0].src" />
        </a>
        <a :href="post.permalink" v-html="post.name"></a>
      </v-list-item>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ErbeList",
  data() {
    return {
      name: null,
      erbe: null,
      erbecat: null,
      imgs: null,
      search: ""
    };
  },
  mounted() {
    axios
      .all([
        axios.get(
          "https://infusodivino.it/shop/wp-json/wc/v3/products?consumer_key=ck_eefade272d2c275e56a58d4db5b8cb9264016df1&consumer_secret=cs_e6f1a010f7683b59bf84abc916abb42f65929ecf&per_page=100&category=334&orderby=title&order=asc"
        ),
        axios.get(
          "https://infusodivino.it/shop/wp-json/wc/v3/products/categories?parent=391&per_page=50&hide_empty=true&consumer_key=ck_eefade272d2c275e56a58d4db5b8cb9264016df1&consumer_secret=cs_e6f1a010f7683b59bf84abc916abb42f65929ecf"
        )
      ])
      .then(
        axios.spread((ElencoErbe, ElencoCategorieErbe) => {
          this.erbe = ElencoErbe.data;
          this.erbecat = ElencoCategorieErbe.data;
        })
      )
      .catch(error => console.log(error));
  },
  computed: {
    filteredList() {
      if (this.search) {
        return this.erbe.filter(post => {
          return post.name.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        return this.erbe;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.vue-erbe-list {
  // height: 500px;
  // max-height: 500px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(18, 1fr);
  grid-auto-flow: column;
}
.post-image {
  width: 30px;
}
</style>