<template>
  <div class="drag__wrapper drag__operation-wrapper" :class="{'pointer-events' : isConstructor}">
    <button
        class="drag__btn drag__operation-btn"
        v-for="(operator, i) in operations" :key="i"
        @click="enterOperator(operator)"
    >
      {{ operator }}
    </button>
  </div>
</template>

<script>
export default {
  name: "DragOperation",
  props: ['isConstructor'],
  data() {
    return {
      operations: ['/', 'x', '-', '+']
    }
  },
  methods: {
    enterOperator(operator) {
      this.$store.commit('enterOperator', operator)
    }
  }
}
</script>

<style scoped>
.drag__operation-wrapper {
  height: 56px;
}

</style>