<template>
<div class="drag__numbers-wrapper" id="number">
  <button
      @click="onClickN(btn)"
      class="drag__numbers-btn"
      v-for="(btn, i) in numbers" :key="i">
    {{ btn }}
  </button>
</div>
</template>

<script>
export default {
  name: "DragNumber",
  data() {
    return {
      numbers: ['7','8','9','4','5','6','1','2','3','0',',']
    }
  },
  methods: {
    onClickN(n) {
      console.log(n)
    }
  }
}
</script>

<style scoped>
.drag__numbers-wrapper {
  width: 100%;
  height: 224px;
  padding: 4px;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.drag__numbers-btn {
  flex-grow: 1;
  background: #FFFFFF;
  border: 1px solid #E2E3E5;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: #000000;
}
.drag__numbers-btn:nth-last-child(2) {
  grid-column: 1/3;
}
</style>