<template>
  <div class="switch-mode__wrapper">
    <div class="switch-mode">
      <button :class="['switch-mode__btn', {'switch-mode__btn--active' : isRuntime}]" @click="onRuntime">
        <svg class="btn-icon icon-eye" width="20" height="20">
          <use xlink:href="#eye"></use>
        </svg>
        Runtime
      </button>
      <button :class="['switch-mode__btn', {'switch-mode__btn--active' : !isRuntime}]" @click="onConstructor">
        <svg class="btn-icon selector" width="20" height="20">
          <use xlink:href="#selector"></use>
        </svg>
        Constructor
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwitchMode",
  emits: ['onRuntime', 'onConstructor'],
  data() {
    return {
      isRuntime: true
    }
  },
  methods: {
    onRuntime() {
      this.isRuntime = true
      this.$emit('onRuntime')
    },
    onConstructor() {
      this.isRuntime = false
      this.$emit('onConstructor')
    }
  }
}
</script>

<style scoped>

.switch-mode__wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.switch-mode {
  width: 243px;
  height: 38px;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 1px;
  display: flex;

}

.switch-mode__btn {
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-icon {
  stroke: #4D5562
}

.switch-mode__btn--active {
  background: #FFFFFF;
  border: 1px solid #E2E3E5;
  border-radius: 5px;
}

.switch-mode__btn--active .btn-icon {
  stroke: #5D5FEF
}

</style>