<template>
  <button
    class="button"
    @click="onclickButton"
  >
    Удвоить текст
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onclickButton() {
      const newText = this.text.repeat(2);
      this.$store.commit(this.$types.SET_TEXT, {
        index: this.index,
        text: newText,
      });
      this.$bus.$emit('text:change', {
        index: this.index,
        text: newText,
      });
    },
  },
};
</script>
