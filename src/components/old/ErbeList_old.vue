<template>
  <div id="vue-erbe">
    <!-- <v-overlay :value="overlay" :absolute="true" :opacity="0">
      <p class="loading_txt">Mescoliamo le Erbe...</p>
      <v-progress-circular indeterminate size="50">
        <img
          src="https://icongr.am/feather/coffee.svg?size=20&color=333333"
          style="vertical-align: text-bottom"
        />
      </v-progress-circular>
    </v-overlay>-->
    <div class="search-wrapper">
      <!-- <v-text-field v-model="search" label="Cerca tra le erbe"></v-text-field> -->
      <input type="text" v-model="search" placeholder="Search title.." />
      <label>Search title:</label>
    </div>
    <div class="vue-erbe-list">
      <!-- <v-list-group no-action sub-group value="true"> -->
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col v-for="n in 3" :key="n" cols="12" sm="4">
            <v-list-item-title>A</v-list-item-title>
            <v-list-item v-for="post in filteredList" :key="post.name">
              <v-list-item-title>
                <a :href="post.permalink">
                  <h2 class="post-name" v-html="post.name"></h2>
                </a>
              </v-list-item-title>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
      <!-- </v-list-group> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ErbeList",
  data() {
    return {
      categoryErbList: null,
      posts: null,
      imgs: null,
      overlay: false,
      search: ""
    };
  },
  mounted() {
    axios
      .get(
        "https://infusodivino.it/shop/wp-json/wc/v3/products/categories?parent=334&per_page=100&hide_empty=true&consumer_key=ck_eefade272d2c275e56a58d4db5b8cb9264016df1&consumer_secret=cs_e6f1a010f7683b59bf84abc916abb42f65929ecf"
      )
      .then(response => {
        this.categoryErbList = response.data;
      })
      .catch(error => console.log(error));
  },
  created: function created() {
    this.fetchData();
  },
  methods: {
    fetchData: function fetchData() {
      var apiWCUrl =
        "https://infusodivino.it/shop/wp-json/wc/v3/products?consumer_key=ck_eefade272d2c275e56a58d4db5b8cb9264016df1&consumer_secret=cs_e6f1a010f7683b59bf84abc916abb42f65929ecf&per_page=100&category=334&orderby=title&order=asc";

      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open("GET", apiWCUrl);
      self.overlay = true; //attivo il loading overlay
      xhr.onload = function() {
        self.posts = JSON.parse(xhr.responseText);
        self.overlay = false; // spengo il loading overlay
      };
      xhr.send();
    }
  },
  computed: {
    filteredList() {
      return this.posts.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>