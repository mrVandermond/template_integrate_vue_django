import Vue from 'libs/vue.2.6.10.min';
import * as types from './types';

export default {
  [types.SET_TEXT](state, { text, index }) {
    Vue.set(state.data, index, { ...state.data[index], text });
  },
};
