<template>
  <div
    :style="{
      'background-color': color,
    }"
    class="schedule"
  >
    <p class="schedule__title">
      {{ article.title }}
    </p>
    <p class="schedule__date">
      {{ article.pub_date }}
    </p>
    <p class="schedule__text">
      {{ article.text }}
    </p>
    <BaseButton
      :text="article.text"
      :index="index"
    />
  </div>
</template>

<script>
import BaseButton from './components/BaseButton';

export default {
  name: 'App',
  components: {
    BaseButton,
  },
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      color: '#fff',
    };
  },
  computed: {
    article() {
      return this.$store.state.data[this.index];
    },
  },
  created() {
    this.$bus.$on('change:text', this.onchangeText);
  },
  beforeDestroy() {
    this.$bus.$off('change:text', this.onchangeText);
  },
  methods: {
    onchangeText({ index, text }) {
      if (index !== this.index) {
        this.color = '#ff0';
        console.log('other component change text to:', text);
        return;
      }
      this.color = '#0ff';
      console.log('same component change text to:', text);
    },
  },
};
</script>
