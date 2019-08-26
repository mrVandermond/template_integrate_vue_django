import Vue from 'libs/vue.2.6.10.min';
import Vuex from 'libs/vuex.3.0.0.min';
import App from './App.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    data: [],
  },
});

// Даем доступ к BusEvent из любого компонента Vue через this.$bus
Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#schedule1',
  store,
  render(h) {
    return h(App);
  },
});

new Vue({
  el: '#schedule2',
  store,
  render(h) {
    return h(App);
  },
});

new Vue({
  el: '#schedule3',
  store,
  render(h) {
    return h(App);
  },
});

new Vue({
  el: '#schedule4',
  store,
  render(h) {
    return h(App);
  },
});