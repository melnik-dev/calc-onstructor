<template>
  <div class="drag__wrapper drag__equally-wrapper" :class="{'pointer-events' : isConstructor}">
    <button @click="calculate" class="drag__btn drag__equally-btn">=</button>
  </div>
</template>

<script>
export default {
  name: "DragEqually",
  props: ['isConstructor'],
  methods: {
    calculate() {
      this.$store.commit('calculate', '=')
    }
  }
}
</script>

<style scoped>
.drag__equally-wrapper {
  height: 60px;
}
.drag__equally-btn {
  background: #5D5FEF;
  color: #ffffff;
}
</style>