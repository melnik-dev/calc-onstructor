<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none" width="20" height="20">
    <symbol id="selector" fill="none" width="20" height="20" viewBox="0 0 20 20">
      <path d="M7.5 13.3333L4.16666 10L7.5 6.66668M12.5 6.66668L15.8333 10L12.5 13.3333"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>
    <symbol id="eye" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
          d="M11.7678 11.7678C12.2366 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.2366 8.70107 11.7678 8.23223C11.2989 7.76339 10.663 7.5 10 7.5C9.33696 7.5 8.70107 7.76339 8.23223 8.23223C7.76339 8.70107 7.5 9.33696 7.5 10C7.5 10.663 7.76339 11.2989 8.23223 11.7678C8.70107 12.2366 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.2366 11.7678 11.7678Z"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path
          d="M2.04834 9.99999C3.11001 6.61916 6.26917 4.16666 10 4.16666C13.7317 4.16666 16.89 6.61916 17.9517 9.99999C16.89 13.3808 13.7317 15.8333 10 15.8333C6.26917 15.8333 3.11001 13.3808 2.04834 9.99999Z"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>
  </svg>

  <div class="container">
    <SwitchMode @onRuntime="onRuntime" @onConstructor="onConstructor"/>
    <div class="drag__box calculator">
      <div v-for="(item, i) in calcElement"
           :key="i" :id="item" ref="calculatorDraggableElm">
        <ConstructorType :type="item"/>
      </div>
    </div>

    <div class="drag__box constructor"
         ref="dragzone"
         @dragenter="dragEnterZone"
         @dragleave="dragLeaveZone"
         @dragover="dragOver"
         @drop="dragDrop">
      <div :class="['constructor__note', { 'constructor__note--hiden' : constructorElement.length }]">
        <img class="constructor__pic" src="../assets/pic.png" alt="pic">
        <span class="constructor__title">Перетащите сюда</span>
        <span class="constructor__subtitle">любой элемент<br> из левой панели</span>
      </div>
      <div v-for="(item, i) in constructorElement"
           :key="i" :id="item"
           ref="constructorDraggableElm">
        <ConstructorType :type="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchMode from "@/components/SwitchMode";
import ConstructorType from "@/components/ConstructorType";
import { nextTick } from 'vue'

export default {
  name: "dragCalc",
  components: {
    SwitchMode,
    ConstructorType
  },
  data() {
    return {
      isNoteInZone: false,
      calcElement: ['input', 'operation', 'number', 'equally'],
      constructorElement: [],
    }
  },
  methods: {
    onRuntime() {
      this.$store.commit('clear')

      this.$refs.calculatorDraggableElm.forEach(elm => {
        elm.draggable = false
        this.removeEventElement(elm)
      })

      if (this.$refs.constructorDraggableElm) {
        this.$refs.constructorDraggableElm.forEach(elm => {
          elm.draggable = true
          elm.removeEventListener('dblclick', this.removeElement);
        })
      }
      console.log('onRuntime')
    },
    onConstructor() {
      this.$store.commit('clear')
      this.$refs.calculatorDraggableElm.forEach(elm => {
          elm.draggable = true
          this.addEventElement(elm)
      })
      if (this.$refs.constructorDraggableElm) {
        this.$refs.constructorDraggableElm.forEach(elm => {
          elm.draggable = true
          elm.addEventListener('dblclick', this.removeElement);
        })
      }
      console.log('onConstructor')
    },

    dragStart(evt) {
      evt.currentTarget.style.opacity = '0.5';
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
      console.log('dragStart')
    },
    dragEnd(evt) {
        evt.target.style.opacity = '1';
      console.log('dragEnd')
    },
    dragEnterZone() {
        this.$refs.dragzone.style.background = '#F0F9FF';
      console.log('dragEnterZone')
    },
    dragLeaveZone() {
      this.$refs.dragzone.style.background = 'none';
      console.log('dragLeaveZone')
    },
    dragOver(evt) {
      evt.preventDefault()
      console.log('dragOver')
    },

    async dragDrop(evt) {
      console.log('dragDrop');
      evt.stopPropagation();
      evt.preventDefault();
      this.$refs.dragzone.style.background = 'none';
      let id = evt.dataTransfer.getData("text");

        if (id === 'input') {
          this.constructorElement.unshift(id);
        } else {
          this.constructorElement.push(id);
        }


      let indexElementInCalcElement = this.calcElement.indexOf(id)

        this.$refs.calculatorDraggableElm[indexElementInCalcElement].style.visibility = 'hidden';


      let indexElementInConstructor = this.constructorElement.indexOf(id)

      await nextTick()
      this.$refs.constructorDraggableElm[indexElementInConstructor].addEventListener('dblclick', this.removeElement)


      evt.dataTransfer.clearData();
    },
    removeElement(evt) {
      let id = evt.currentTarget.id;

      let indexElementInConstructor = this.constructorElement.indexOf(id)
      this.constructorElement.splice(indexElementInConstructor, 1)

      let indexElementInCalcElement = this.calcElement.indexOf(id)
      this.$refs.calculatorDraggableElm[indexElementInCalcElement].style.visibility = 'visible';
    },
    addEventElement(elm) {
      elm.addEventListener('dragstart', this.dragStart)
      elm.addEventListener('dragend', this.dragEnd)
    },
    removeEventElement(elm) {
      elm.removeEventListener('dragstart', this.dragStart)
      elm.removeEventListener('dragend', this.dragEnd)
    },
  },
  mounted() {
    this.onRuntime()
  }
}
</script>

<style scoped>

.container {
  margin: 0 auto;
  max-width: 695px;
  padding: 38px 80px;
  display: flex;
  justify-content: space-between;
  row-gap: 30px;
  flex-wrap: wrap
}

.drag__box {
  width: 243px;
  height: 448px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.constructor {
  position: relative;
  border: 2px dashed #C4C4C4;
}

.constructor__note {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.constructor__note--hiden {
  display: none;
}

.constructor__pic {
  width: 11px;
}

.constructor__title {
  font-weight: 500;
  font-size: 14px;
  color: #5D5FEF;
  white-space: nowrap;
}

.constructor__subtitle {
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  color: #6B7280;
}
</style>