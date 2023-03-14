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
    <SwitchMode/>
    <div
        class="drag__box drag__box-left"
        @dragstart="dragStart"
        @dragend="dragEnd"
    >
      <DragInput draggable="true"/>
      <DragOperation draggable="true"/>
      <DragNumber draggable="true"/>
      <DragEqually draggable="true"/>
    </div>
    <div
        class="drag__box drag__box-right"
        ref="dragzone"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragover="dragOver"
        @drop="dragDrop"
    >
      <div :class="['drag__box-right--back', { 'drag__box-right--back-none' : isZonElm }]">
        <img class="box-right__pic" src="../assets/pic.png">
        <span class="box-right__title">Перетащите сюда</span>
        <span class="box-right__subtitle">любой элемент<br> из левой панели</span>
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
      isZonElm: false
    }
  },
  methods: {
    hasElemZone(id) {
     return !!this.$refs.dragzone.querySelector(`#${id}`);
    },
    dragStart(evt) {
      evt.target.style.opacity = '0.5';

      evt.dataTransfer.dropEffect='copy';
      evt.dataTransfer.setData("text/plain", evt.target.id);
      console.log('dragStart')
    },
    dragEnd(evt) {
      if(!this.hasElemZone(evt.target.id)) {
        evt.target.style.opacity = '1';
      }
      console.log('dragEnd')
      console.log(evt.target.id)
    },
    dragEnter() {
      this.$refs.dragzone.style.background = '#F0F9FF';
      console.log('dragEnter')
    },
    dragLeave() {
      this.$refs.dragzone.style.background = 'none';
      console.log('dragLeave')
    },
    dragOver(evt) {
      evt.preventDefault()
      console.log('dragOver')
    },
    dragDrop(evt) {
      console.log('dragDrop');
      evt.preventDefault();
      this.$refs.dragzone.style.background = 'none';
      let id = evt.dataTransfer.getData("text");
      let elm = document.getElementById(id);
      elm.style.opacity = '0.5';
      elm.draggable = false;

      let cloned = elm.cloneNode(true);
      cloned.style.opacity = '1';
      cloned.addEventListener('dblclick',  this.delElm);

      this.$refs.dragzone.appendChild(cloned);
      this.isZonElm = true;
      evt.dataTransfer.clearData();

      this.disabledElm(elm);

    },
    delElm(evt) {
      console.log(evt.currentTarget)

      let id = evt.currentTarget.id;
      let elm = document.querySelector(`#${id}`)
      elm.style.opacity = '1';
      elm.draggable = true;
      console.log(elm)
      this.enaebleElm(elm)
      evt.currentTarget.remove();



      // if(hasChild) {
      //   this.isZonElm = false;
      // }

    },
    disabledElm(elm) {
      let allBtn = elm.querySelectorAll("button");
      let input = elm.querySelector("input");
      if(allBtn) {
        allBtn.forEach(btn => {
          btn.disabled = true
          btn.style.cursor = 'not-allowed'
        })
      }
      if(input) {
        input.disabled = true
        input.style.cursor = 'not-allowed'
      }
    },
    enaebleElm(elm) {
      let allBtn = elm.querySelectorAll("button");
      let input = elm.querySelector("input");
      if(allBtn) {
        allBtn.forEach(btn => {
          btn.disabled = false
          btn.style.cursor = 'pointer'
        })
      }
      if(input) {
        input.disabled = false
        input.style.cursor = 'pointer'
      }
    }
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

.drag__box-right {
  position: relative;
  border: 2px dashed #C4C4C4;
}

.drag__box-right--back {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.drag__box-right--back-none{
  display: none;
}
.box-right__pic {
  width: 11px;
}

.box-right__title {
  font-weight: 500;
  font-size: 14px;
  color: #5D5FEF;
  white-space: nowrap;
}

.box-right__subtitle {
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  color: #6B7280;
}
</style>