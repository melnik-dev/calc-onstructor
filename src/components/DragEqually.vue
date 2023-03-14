<template>
  <div class="drag__equally-wrapper" id="equally">
    <button class="drag__equally-btn">=</button>
  </div>
</template>

<script>
export default {
  name: "DragEqually"
}
</script>

<style scoped>
.drag__equally-wrapper {
  width: 100%;
  height: 60px;
  padding: 4px;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
}

.drag__equally-btn {
  flex-grow: 1;
  border: 1px solid #E2E3E5;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  background: #5D5FEF;
}
</style>