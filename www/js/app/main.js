import Vue from 'libs/vue.2.6.10.min';
import App from './App';
import store from './store';
import * as types from './store/types';

window.onload = () => {
  // Даем доступ к BusEvent из любого компонента Vue через this.$bus
  Vue.prototype.$bus = new Vue();
  // Даем доступ ко всем types для удобства использования Vuex
  Vue.prototype.$types = types;

  /* eslint-disable no-new */
  new Vue({
    el: '#schedule1',
    store,
    render(h) {
      return h(
        App,
        {
          props: {
            index: Number(this.$options.el.slice(-1)) - 1,
          },
        },
      );
    },
  });

  new Vue({
    el: '#schedule2',
    store,
    render(h) {
      return h(
        App,
        {
          props: {
            index: Number(this.$options.el.slice(-1)) - 1,
          },
        },
      );
    },
  });

  new Vue({
    el: '#schedule3',
    store,
    render(h) {
      return h(
        App,
        {
          props: {
            index: Number(this.$options.el.slice(-1)) - 1,
          },
        },
      );
    },
  });

  new Vue({
    el: '#schedule4',
    store,
    render(h) {
      return h(
        App,
        {
          props: {
            index: Number(this.$options.el.slice(-1)) - 1,
          },
        },
      );
    },
  });

  new Vue({
    el: '#schedule5',
    store,
    render(h) {
      return h(
        App,
        {
          props: {
            index: Number(this.$options.el.slice(-1)) - 1,
          },
        },
      );
    },
  });

  new Vue({
    el: '#schedule6',
    store,
    render(h) {
      return h(
        App,
        {
          props: {
            index: Number(this.$options.el.slice(-1)) - 1,
          },
        },
      );
    },
  });
};
