import Vuex from 'libs/vuex.3.0.0.min';
import Vue from 'libs/vue.2.6.10.min';
import * as types from './types';

Vue.use(Vuex);

const data = document.getElementsByClassName('data')[0];

const store = new Vuex.Store({
  state: {
    data: JSON.parse(data.dataset.data),
  },
  mutations: {
    [types.SET_TEXT](state, { text, index }) {
      Vue.set(state.data, index, { ...state.data[index], text });
    },
  },
});

export default store;
