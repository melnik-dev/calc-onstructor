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
    <div class="drag__box calculator ">
      <div v-for="(item, i) in arrayCalcElement"
           :key="i" :id="item"
           ref="calculatorDraggableElm">
        <ConstructorType :type="item"/>
      </div>
    </div>

    <div class="drag__box constructor"
         ref="dragzone"
         @dragenter="dragEnterZone"
         @dragleave="dragLeaveZone"
         @dragover="dragOver"
         @drop="dragDrop">
      <div :class="['constructor__note', { 'constructor__note--hiden' : arrayConstructorElement.length }]">
        <img class="constructor__pic" src="../assets/pic.png" alt="pic">
        <span class="constructor__title">Перетащите сюда</span>
        <span class="constructor__subtitle">любой элемент<br> из левой панели</span>
      </div>
      <div v-for="(item, i) in arrayConstructorElement"
           :key="i"
           :id="item"
           class="constructor-elm"
           ref="constructorDraggableElm">
        <ConstructorType :type="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchMode from "@/components/SwitchMode";
import ConstructorType from "@/components/ConstructorType";
import {nextTick} from "vue";

export default {
  name: "dragCalc",
  components: {
    SwitchMode,
    ConstructorType
  },
  data() {
    return {
      arrayCalcElement: ['input', 'operation', 'number', 'equally'],
      arrayConstructorElement: [],
      indexElemAfterPaste: 0
    }
  },
  methods: {
    onRuntime() {
      console.log('onRuntime')
      this.$store.commit('clear')

      this.$refs.calculatorDraggableElm.forEach(elm => {
        this.removeEventElement(elm)
      })

      if (this.$refs.constructorDraggableElm) {
        this.$refs.constructorDraggableElm.forEach(elm => {
          this.removeEventConstructorElement(elm)
        })
      }
    },
    onConstructor() {
      console.log('onConstructor')
      this.$store.commit('clear')

      this.$refs.calculatorDraggableElm.forEach(elm => {
        this.addEventElement(elm)
      })
      if (this.$refs.constructorDraggableElm) {
        this.$refs.constructorDraggableElm.forEach(elm => {
          this.addEventConstructorElement(elm)
        })
      }
    },

    dragStart(evt) {
      evt.currentTarget.style.opacity = '0.5';
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    },
    dragEnd(evt) {
      evt.target.style.opacity = '1';
    },
    dragEnterZone() {
      this.$refs.dragzone.style.background = '#F0F9FF';
    },
    dragLeaveZone() {
      this.$refs.dragzone.style.background = 'none';
    },
    dragOver(evt) {
      evt.preventDefault()
    },

    dragEnter(evt) {
      evt.currentTarget.classList.add('line')
      this.indexElemAfterPaste = this.getIndexElmInConstructor(evt.currentTarget.id)
      console.log('dragEnter C', this.indexElemAfterPaste)
    },
    dragLeave(evt) {
      evt.currentTarget.classList.remove('line')
    },

    async dragDrop(evt) {
      console.log('dragDrop');
      evt.stopPropagation();
      evt.preventDefault();
      this.$refs.dragzone.style.background = 'none';
      let id = evt.dataTransfer.getData("text");


        if (id === 'input') {
          if(this.getIndexElmInConstructor(id) === -1) {
            this.arrayConstructorElement.unshift(id);
          }
        } else {

          let indexElemInConstructor = this.getIndexElmInConstructor(id)
          if(indexElemInConstructor !== -1) {
            this.arrayConstructorElement.splice(indexElemInConstructor, 1)
          }

        console.log('indexElemInConstructor', indexElemInConstructor)
        console.log('indexElemAfterPaste', this.indexElemAfterPaste)

        this.arrayConstructorElement.splice(this.indexElemAfterPaste + 1, 0, id)
      }
        await nextTick()
      this.$refs.constructorDraggableElm.forEach(elm => {
        console.log(elm.id)
        if(elm.id === id) {
          this.addEventConstructorElement(elm)
        }
      })

      this.indexElemAfterPaste = this.arrayConstructorElement.length

      if (!(this.getIndexElmInConstructor(id) === -1)) {
        this.$refs.calculatorDraggableElm[this.getIndexElmInCalc(id)]
            .style.visibility = 'hidden';
      }

      evt.dataTransfer.clearData();
    },
    removeElement(evt) {
      evt.stopPropagation()
      let id = evt.currentTarget.id;

      let indexElemInConstructor = this.getIndexElmInConstructor(id)
      this.arrayConstructorElement.splice(indexElemInConstructor, 1)

      this.$refs.calculatorDraggableElm[this.getIndexElmInCalc(id)]
          .style.visibility = 'visible';
    },
    getIndexElmInConstructor(id) {
      return this.arrayConstructorElement.indexOf(id)
    },
    getIndexElmInCalc(id) {
      return this.arrayCalcElement.indexOf(id)
    },

    addEventElement(elm) {
      elm.draggable = true
      elm.addEventListener('dragstart', this.dragStart)
      elm.addEventListener('dragend', this.dragEnd)
    },
    removeEventElement(elm) {
      elm.draggable = false
      elm.removeEventListener('dragstart', this.dragStart)
      elm.removeEventListener('dragend', this.dragEnd)
    },

    addEventConstructorElement(elm) {
      this.addEventElement(elm)
      elm.addEventListener('dblclick', this.removeElement);
      elm.addEventListener('dragenter', this.dragEnter);
      elm.addEventListener('dragleave', this.dragLeave);
    },
    removeEventConstructorElement(elm) {
      this.removeEventElement(elm)
      elm.removeEventListener('dblclick', this.removeElement);
      elm.removeEventListener('dragenter', this.dragEnter);
      elm.removeEventListener('dragleave', this.dragLeave);
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
.constructor-elm {
  position: relative;
}
.line::after {
  content: '';
  position: absolute;
  height: 2px;
  width: 100%;
  bottom: -7px;
  background: #5D5FEF;
}
</style>