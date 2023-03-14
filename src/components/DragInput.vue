<template>
<div class="drag__input-wrapper" id="input">
  <input type="text" class="drag__input" placeholder="0" readonly>
</div>
</template>

<script>
export default {
  name: "DragInput"
}
</script>

<style scoped>
.drag__input-wrapper{
  width: 100%;
  height: 60px;
  padding: 4px;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
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
</style>