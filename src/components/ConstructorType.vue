<template>
  <DragInput v-if="type === 'input'"/>
  <DragOperation v-if="type === 'operation'"/>
  <DragNumber v-if="type === 'number'"/>
  <DragEqually v-if="type === 'equally'"/>
</template>

<script>
import DragInput from "@/components/DragInput";
import DragOperation from "@/components/DragOperation";
import DragNumber from "@/components/DragNumber";
import DragEqually from "@/components/DragEqually";

export default {
  name: "ConstructorType",
  components: {
    DragInput,
    DragOperation,
    DragNumber,
    DragEqually
  },
  props: ['type'],
}
</script>

<style scoped>

</style>