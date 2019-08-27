import Vue from 'libs/vue.2.6.10.min';
import App from './components/App';
import store from './store';
import * as types from './store/types';

window.onload = () => {
  // Даем доступ к BusEvent из любого компонента Vue через this.$bus
  Vue.prototype.$bus = new Vue();
  // Даем доступ ко всем types для удобства использования Vuex
  Vue.prototype.$types = types;

  const countSchedules = store.state.data.length;

  for (let i = 0; i < countSchedules; i += 1) {
    /* eslint-disable no-new */
    new Vue({
      el: `.schedule${i + 1}`,
      store,
      render(h) {
        return h(
          App,
          {
            props: {
              index: i,
            },
          },
        );
      },
    });
  }

  new Vue({
    el: '#counter',
    store,
    render(h) {
      return h(
        {
          data() {
            return {
              counter: 0,
            };
          },
          created() {
            this.$bus.$on('counter:change', this.onchangeCounter);
          },
          beforeDestroy() {
            this.$bus.$off('counter:change', this.onchangeCounter);
          },
          methods: {
            onchangeCounter() {
              this.counter += 1;
            },
          },
          template: '<div>Кол-во кликов: {{ counter }}</div>',
        },
        {
          class: {
            counter: true,
          },
        },
      );
    },
  });
};
