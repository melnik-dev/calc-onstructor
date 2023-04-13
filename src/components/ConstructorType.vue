<template>
  <DragInput v-if="type === 'input'" :isConstructor="isConstructor"/>
  <DragOperation v-if="type === 'operation'" :isConstructor="isConstructor"/>
  <DragNumber v-if="type === 'number'" :isConstructor="isConstructor"/>
  <DragEqually v-if="type === 'equally'" :isConstructor="isConstructor"/>
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
  props: ['type', 'isConstructor'],
}
</script>

<style scoped>

</style>