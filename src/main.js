import Vue from 'vue';
import App from './AppTisane.vue';
import AppErbe from './AppErbe.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');

new Vue({
  vuetify,
  render: h => h(AppErbe)
}).$mount('#apperbe');