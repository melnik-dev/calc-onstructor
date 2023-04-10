<template>
  <DragCalc/>
</template>

<script>
import DragCalc from './components/DragCalc.vue'

export default {
  name: 'App',
  components: {
    DragCalc
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800&display=swap');
* {
  box-sizing: border-box;
  font-family: 'Inter';
}
.drag__wrapper {
  width: 100%;
  padding: 4px;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  gap: 8px;
}

.drag__btn {
  flex-grow: 1;
  border: 1px solid #E2E3E5;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: #000000;
  background: #FFFFFF;
}
.drag__btn:hover {
  border-color: #5D5FEF;
}
</style>
