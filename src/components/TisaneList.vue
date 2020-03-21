<template>
  <div id="vue-infusi-app">
    <v-overlay :value="overlay" :absolute="true" :opacity="0">
      <p class="loading_txt">Mescoliamo le Erbe...</p>
      <v-progress-circular indeterminate size="50">
        <img
          src="https://icongr.am/feather/coffee.svg?size=20&color=333333"
          style="vertical-align: text-bottom"
        />
      </v-progress-circular>
    </v-overlay>
    <div id="tisane-vue-code" class="vue-code">
      <!-- VUE.JS -->
      <div id="vue-tisane">
        <div id="vue-filter" class="categorySelect">
          <h2>{{ title_filter }}</h2>
          <a
            :if="btn_tutte"
            class="vue_btn"
            bind:key="category.id"
            v-on:click="currentCategory = 231; overlay=true"
            href="javascript:;"
          >Tutte</a>
          <!-- href="javascript:;" per bloccare la propagazione -->
          <!-- <a v-if="category.id===333" class="vue_btn" v-for="category in categoryList" v-bind:key="category.id" v-on:click="currentCategory=231" href="javascript:;">Tutte</a> v-else -->
          <a
            class="vue_btn"
            v-for="category in categoryList"
            v-bind:key="category.id"
            v-on:click="currentCategory = category.id; overlay=true"
            href="javascript:;"
          >{{ category.name }}</a>
        </div>

        <div id="listTisane" class="elencoProd">
          <div class="post" v-for="post in posts" :key="post.id">
            <a :href="post.permalink">
              <h2 class="post-name" v-html="post.name"></h2>
            </a>
            <a :href="post.permalink">
              <img class="post-image" v-if="post.images.length != 0" :src="post.images[0].src" />
            </a>
            <div class="post-info">
              <div class="post-desc" v-html="post.description"></div>
              <div class="prod-price-wrap">
                <p class="prod-price" v-html="post.price_html"></p>
              </div>
              <div class="test">{{post.variations}} - OK</div>
              <div class="test" v-for="(vario, index) in postVar" :key="index">
                <div v-if="post.variations[0]===vario.id">{{vario.price}} - per il primo</div>
                <div v-if="post.variations[1]===vario.id">{{vario.price}} - per il secondo</div>
                <div v-if="post.variations[2]===vario.id">{{vario.price}} - per il terzo</div>
              </div>
              <div class="wrapper" v-if="post.variations[0]">prezzo 6,00€ - {{post.variations[0]}}</div>
              <div class="wrapper" v-if="post.variations[1]">prezzo 12,00€ - {{post.variations[1]}}</div>
              <div class="wrapper" v-if="post.variations[2]">prezzo 30,00€ - {{post.variations[2]}}</div>
              <!-- <div class="test">{{post.variations[0]}}</div> -->
              <!-- <div class="wrapper" v-if="post.variations[0]===1255">
                <div
                  class="test"
                  v-for="vario in postVar"
                  :key="vario.id"
                >{{vario.price[0]}} for {{post.variations[0]}}</div>
              </div>-->
              <!-- <div class="test">{{post.variations[1]}}</div>
              <div class="test" v-for="vario in postVar" :key="vario.id">{{vario.price}}</div>
              <div class="test">{{post.variations[2]}}</div>
              <div class="test" v-for="vario in postVar" :key="vario.id">{{vario.price}}</div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "TisaneList",
  data() {
    return {
      currentCategory: "231",
      categoryList: null,
      posts: null,
      postIDs: [],
      postVar: [],
      postVar2: [],
      postVar3: [],
      imgs: null,
      btn_tutte: true,
      title_filter: "Filtra Tisane",
      overlay: false
    };
  },
  mounted() {
    axios
      .all([
        axios.get(
          "https://infusodivino.it/shop/wp-json/wc/v3/products/1254/variations?consumer_key=ck_eefade272d2c275e56a58d4db5b8cb9264016df1&consumer_secret=cs_e6f1a010f7683b59bf84abc916abb42f65929ecf&per_page=50"
        ),
        axios.get(
          "https://infusodivino.it/shop/wp-json/wc/v3/products/categories?parent=231&per_page=50&hide_empty=true&consumer_key=ck_eefade272d2c275e56a58d4db5b8cb9264016df1&consumer_secret=cs_e6f1a010f7683b59bf84abc916abb42f65929ecf"
        )
      ])
      .then(
        axios.spread((ElencoVariazioni, ElencoCategorieTisane) => {
          this.postVar = ElencoVariazioni.data;
          this.categoryList = ElencoCategorieTisane.data;
        })
      )
      .catch(error => console.log(error));
  },
  created: function created() {
    this.fetchData();
  },
  watch: {
    currentCategory: "fetchData"
  },
  methods: {
    fetchData: function fetchData() {
      var apiWCUrl =
        "https://infusodivino.it/shop/wp-json/wc/v3/products?consumer_key=ck_eefade272d2c275e56a58d4db5b8cb9264016df1&consumer_secret=cs_e6f1a010f7683b59bf84abc916abb42f65929ecf&per_page=50&category=";

      var xhr = new XMLHttpRequest();
      var self = this;

      var xxhr = new XMLHttpRequest();
      var apivarurl = "https://infusodivino.it/shop/wp-json/wc/v3/products/";
      var apivarurl2 =
        "/variations?consumer_key=ck_eefade272d2c275e56a58d4db5b8cb9264016df1&consumer_secret=cs_e6f1a010f7683b59bf84abc916abb42f65929ecf&per_page=50";

      xhr.open("GET", apiWCUrl + self.currentCategory);
      self.overlay = true; //attivo il loading overlay
      xhr.onload = function() {
        self.posts = JSON.parse(xhr.responseText);
        //cilo la risposta ed estrapolo tutti i dati
        for (var postsid in self.posts) {
          //console.log(self.posts[postsid].id);
          //popolo l'array postIDs dichiarato in precedenza in data con solo gli ID di self.posts
          self.postIDs.push(self.posts[postsid].id);
        }
        self.overlay = false; // spengo il loading overlay

        for (var item in self.postIDs) {
          xxhr.open("GET", apivarurl + self.postIDs[item] + apivarurl2);
          //console.log(apivarurl + self.postIDs[item] + apivarurl2);
          //console.log(self.postIDs[item]);
          xxhr.onload = function() {
            self.postVar2 = JSON.parse(xxhr.responseText);
            // self.postVar3.push(self.postVar2[item]);
            // console.log(self.postVar3);
          };
          xxhr.send();
        }
      };
      xhr.send();
    }
  },
  computed: {
    VariationsList() {
      return this.postVar.length;
    }
  }
};
</script>

<style lang="scss" scoped>
#vue-infusi-app #tisane-vue-code.vue-code {
  #vue-tisane {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 20px;
  }

  #vue-filter {
    display: grid;
    //grid-template-columns: repeat(6, 1fr);
    grid-template-columns: 1fr;
    grid-auto-rows: -webkit-max-content;
    grid-auto-rows: max-content;
    gap: 10px;
    padding-bottom: 30px;
    //border-bottom: 1px solid rgba(0, 0, 0, 0.05); spostato in DIVI per visualizzare l'elemento
    margin-bottom: 30px;

    h2 {
      border-bottom: 1px solid #91b86b;
    }
  }
  .elencoProd {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    //per evitare che le immagini provochino il blowout delle schede prodotto
    img {
      max-width: 100%;
    }
  }

  .post {
    box-shadow: 0px 12px 18px -6px rgba(0, 0, 0, 0.13);
    background-color: #ffffff;
    font-family: "Montserrat", Helvetica, Arial, Lucida, sans-serif;

    .post-name {
      padding: 20px 15px;
      font-family: "Playfair Display", Georgia, "Times New Roman", serif;
      //min-height: 80px;
      //background-color: #f7f7f7;
      border-bottom: 1px solid #f7f7f7;
      font-size: 22px;
      line-height: 25px;
      //text-transform: uppercase;
      text-align: center;
      color: #333;
      //background-image: url(https://infusodivino.it/shop/wp-content/uploads/2020/02/groovepaper.png);
      background-image: url(https://infusodivino.it/shop/wp-content/uploads/2020/02/gray_jean.png);
      background-repeat: repeat;
    }

    .post-info {
      padding: 10px 15px;
      //background-color: #f7f7f7;
      border-top: 1px solid #f7f7f7;

      .post-desc {
        margin-bottom: 10px;
        min-height: 100px;
      }

      .prod-price {
        &-wrap {
          background-color: #f7f7f7;
        }

        font-size: 18px;
        padding-left: 5px;

        .amount,
        .woocommerce-Price-currencySymbol {
          font-weight: 500;
        }
      }
    }
  }
}
//@import ".././assets/style.css";
/* .over_wrap {
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.5);
} */
.loading_txt {
  margin: 0 auto;
  text-align: center;
  font-size: 25px;
  /* text-transform: uppercase; */
  /* color: #fff; */
  margin-bottom: 15px;
}
/* .loading_txt::before {
  content: url(https://icongr.am/feather/coffee.svg?size=20&color=333333);
  vertical-align: text-bottom;
  margin-right: 15px;
} */
.v-progress-circular {
  color: #88a446;
}
.v-overlay__content {
  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
  text-align: center;
  padding: 20px;
  /* background-color: rgba(255, 255, 255, 0.9); */
  background-color: #eee9de;
  box-shadow: 0 0 20px #ded4bd;
  /* background-image: url(https://infusodivino.it/shop/wp-content/uploads/2020/02/gray_jean.png); */
  /* background-repeat: repeat; */
  border-radius: 25px;
  z-index: 9999;
  color: #333;
}
/* .v-overlay__scrim {
  z-index: 999;
} */
/* #tisane-vue-code {
  margin: 100px;
  padding: 40px;
  background-color: royalblue;
} */
/* vue-infusi-app {
  margin: 100px;
  padding: 30px;
  background-color: red;
} */
</style>