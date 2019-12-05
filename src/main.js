import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import _ from 'lodash';
import moment from 'moment';

import App from './App.vue';
import router from './router';
import store from './store';

Object.defineProperty(Vue.prototype, '_', { value: _ });
Object.defineProperty(Vue.prototype, 'moment', { value: moment });

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
