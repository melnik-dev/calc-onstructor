<template>
<div class="drag__wrapper drag__input-wrapper">
  <input v-model="input" type="text" class="drag__input" :class="{'drag__input--longword' : fontSize}" readonly>

</div>
</template>

<script>
export default {
  name: "DragInput",
  computed: {
    input: {
      get() {
        return this.$store.state.isInput ? this.$store.state.inputValue : this.$store.state.currentNumber
      },
      set(value) {
        this.$store.commit('enterNumber', value)
      }
    },
    fontSize() {
      return this.$store.getters.getSizeWord
    }
  }
}
</script>

<style scoped>
.drag__input-wrapper{
  height: 60px;
}
.drag__input{
  padding: 4px 8px;
  width: 100%;
  background: #F3F4F6;
  border-radius: 6px;
  border: none;
  outline: none;
  text-align: right;
  font-weight: 800;
  font-size: 36px;
  color: #111827;
  cursor: pointer;
}
.drag__input--longword {
  font-size: 19px
}
</style>