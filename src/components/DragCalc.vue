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
    <div
        class="drag__box calculator"
    >
      <div id="input" class="draggable">
        <DragInput/>
      </div>
      <div id="operation" class="draggable">
        <DragOperation/>
      </div>
      <div id="number" class="draggable">
        <DragNumber/>
      </div>
      <div id="equally" class="draggable">
        <DragEqually/>
      </div>
    </div>
    <div
        class="drag__box constructor"
        ref="dragzone"
    >
      <div :class="['constructor__note', { 'constructor__note--hiden' : isNoteInZone }]">
        <img class="constructor__pic" src="../assets/pic.png" alt="pic">
        <span class="constructor__title">Перетащите сюда</span>
        <span class="constructor__subtitle">любой элемент<br> из левой панели</span>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchMode from "@/components/SwitchMode";
import DragInput from "@/components/DragInput";
import DragOperation from "@/components/DragOperation";
import DragNumber from "@/components/DragNumber";
import DragEqually from "@/components/DragEqually";

export default {
  name: "dragCalc",
  components: {
    SwitchMode,
    DragInput,
    DragOperation,
    DragNumber,
    DragEqually
  },
  data() {
    return {
      isNoteInZone: false,
      hasInConstructor: []
    }
  },
  methods: {
    onRuntime() {
      this.$store.commit('clear')
      let dragElement = document.querySelectorAll('.draggable')
      dragElement.forEach(elm => {
        elm.draggable = false
        this.removeEventElement(elm)
        this.removeConctructorEvent()
        console.log(elm.id)
      })
      console.log(dragElement)
      console.log('onRuntime')
    },
    onConstructor() {
      this.$store.commit('clear')
      let dragElement = document.querySelectorAll('.draggable')
      dragElement.forEach(elm => {
        if(!this.hasInConstructor.includes(elm.id)) {
          elm.draggable = true
          this.addEventElement(elm)
          this.addConctructorEvent()
        }
      })
      let dragConstructorElement = document.querySelectorAll('.constructor__draggable')
      if(dragConstructorElement) {this.addEventRemoveElement(dragConstructorElement)}
      console.log(dragElement)
      console.log('onConstructor')
    },

    dragStart(evt) {
      evt.currentTarget.style.opacity = '0.5';
      evt.dataTransfer.dropEffect = 'copy';
      evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
      console.log('dragStart')
    },
    dragEnd(evt) {
      if (!this.hasInConstructor.includes(evt.currentTarget.id)) {
        evt.target.style.opacity = '1';
      }
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
    // dragOverElement(evt) {
    //   evt.preventDefault()
    //   console.log('dragOverElement')
    // },
    // dragEnterElement(evt) {
    //   console.log('dragEnterElement')
    //   console.log(evt.currentTarget)
    // },
    // dragLeaveElement(evt) {
    //   console.log('dragLeaveElement')
    //   console.log(evt.currentTarget)
    // },
    dragDrop(evt) {
      console.log('dragDrop');
      evt.stopPropagation();
      evt.preventDefault();
      this.$refs.dragzone.style.background = 'none';
      let id = evt.dataTransfer.getData("text");


      // if(this.hasInConstructor.includes(id)) {
      //   let dragElm = this.$refs.dragzone.splice(0, 1);
      //   this.$refs.dragzone.splice(2, 0, dragElm);
      //   console.log(this.$refs.dragzone.childNodes)
      //
      //
      // } else {

        let clone = this.clonedElement(id);
        if (id === 'input') {
          this.$refs.dragzone.prepend(clone);
          this.hasInConstructor.push(id);
        } else if (clone){
          this.$refs.dragzone.appendChild(clone);
          this.hasInConstructor.push(id);
        }
      // }

      console.log(this.hasInConstructor);
      this.isNoteInZone = true;
      evt.dataTransfer.clearData();
    },
    clonedElement(id) {
      if(!id) {return }
      let elm = document.getElementById(id);

      let cloned = elm.cloneNode(true);
      cloned.style.opacity = '1';
      cloned.classList.add('constructor__draggable')
      cloned.addEventListener('dblclick', this.removeElement);

      this.disabledElement(elm);
      return cloned;
    },
    removeElement(evt) {
      let id = evt.currentTarget.id;
      let elm = document.getElementById(id)
      this.enableElement(elm)
      evt.currentTarget.remove();
      let indexElementInConstructor = this.hasInConstructor.indexOf(id)
      this.hasInConstructor.splice(indexElementInConstructor, 1)

      if (this.$refs.dragzone.childNodes.length <= 1) {
        this.isNoteInZone = false;
      }
    },
    disabledElement(elm) {
      elm.style.opacity = '0.5';
      elm.draggable = false;
    },
    enableElement(elm) {
      elm.style.opacity = '1';
      elm.draggable = true;
    },
    addEventElement(elm) {
      elm.addEventListener('dragstart', this.dragStart)
      elm.addEventListener('dragend', this.dragEnd)

      // elm.addEventListener('dragenter', this.dragEnterElement)
      // elm.addEventListener('dragleave', this.dragLeaveElement)
      // elm.addEventListener('dragover', this.dragOverElement)
    },
    removeEventElement(elm) {
      elm.removeEventListener('dragstart', this.dragStart)
      elm.removeEventListener('dragend', this.dragEnd)
      elm.removeEventListener('dblclick', this.removeElement);
      // elm.removeEventListener('dragenter', this.dragEnterElement)
      // elm.removeEventListener('dragleave', this.dragLeaveElement)
      // elm.removeEventListener('dragover', this.dragOverElement)
    },
    addEventRemoveElement(collection) {
      collection.forEach(elm => {
        elm.addEventListener('dblclick', this.removeElement);
      })
    },
    addConctructorEvent() {
      let conctructor = document.querySelector('.constructor')
      conctructor.addEventListener('dragenter', this.dragEnterZone)
      conctructor.addEventListener('dragleave', this.dragLeaveZone)
      conctructor.addEventListener('dragover', this.dragOver)
      conctructor.addEventListener('drop', this.dragDrop)
    },
    removeConctructorEvent() {
      let conctructor = document.querySelector('.constructor')
      conctructor.removeEventListener('dragenter', this.dragEnterZone)
      conctructor.removeEventListener('dragleave', this.dragLeaveZone)
      conctructor.removeEventListener('dragover', this.dragOver)
      conctructor.removeEventListener('drop', this.dragDrop)
    },

    enterNumber(evt) {
      this.$store.commit('enterNumber', evt.target.textContent)
    },
    enterOperator(evt) {
      this.$store.commit('enterOperator', evt.target.textContent)
    },
    calculate(evt) {
      this.$store.commit('calculate', evt.target.textContent)
    },

    // createInputComponent() {
    //   console.log(this.$refs.dragzone.childNodes)
    //   const ClonedComponent = createApp(DragInput).use(store).mount(this.$refs.dragzone)
    //   ClonedComponent.$el.addEventListener('dblclick', this.delElm);
    //   this.$refs.dragzone.prepend(ClonedComponent.$el);
    // },
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