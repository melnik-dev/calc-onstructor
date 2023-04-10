<template>
<div class="drag__wrapper drag__numbers-wrapper">
  <button
      @click="enterNumber(value)"
      class="drag__btn drag__numbers-btn"
      v-for="(value, i) in values" :key="i">
    {{ value }}
  </button>
</div>
</template>

<script>
export default {
  name: "DragNumber",
  data() {
    return {
      values: ['7','8','9','4','5','6','1','2','3','0','C',',']
    }
  },
  methods: {
    enterNumber(value) {
      this.$store.commit('enterNumber', value)
    }
  }
}
</script>

<style scoped>
.drag__numbers-wrapper {
  height: 224px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>