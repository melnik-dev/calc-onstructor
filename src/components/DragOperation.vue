<template>
  <div class="drag__operation-wrapper" id="operation">
    <button
        class="drag__operation-btn"
        v-for="(btn, i) in operation" :key="i">
      {{ btn }}
    </button>
  </div>
</template>

<script>
export default {
  name: "DragOperation",
  data() {
    return {
      operation: ['/', 'x', '-', '+']
    }
  }
}
</script>

<style scoped>
.drag__operation-wrapper {
  width: 100%;
  height: 56px;
  padding: 4px;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  gap: 8px;
}

.drag__operation-btn {
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
</style>