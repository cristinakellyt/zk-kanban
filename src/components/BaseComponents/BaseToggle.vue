<template>
  <label class="switch">
    <input
      type="checkbox"
      class="input"
      @change="emit('changeToggle', checkedVModel)"
      v-model="checkedVModel"
    />
    <div class="slider round"></div>
  </label>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['changeToggle'])

const checkedVModel = defineModel('checkedVModel', {
  type: Boolean,
  default: false
})
</script>
<style scoped lang="scss">
@import '@/assets/scss/main.scss';

$toggle-width: pxToRem(50);
$toggle-height: pxToRem(25);

.switch {
  position: relative;
  display: inline-block;
  width: $toggle-width;
  height: $toggle-height;

  .input {
    appearance: none;
  }
}

.slider {
  position: absolute;
  width: 100%;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $primary-color;
  transition: 0.4s;
}

/* Rounded selector*/
.slider:before {
  position: absolute;
  content: '';
  height: pxToRem(18);
  width: pxToRem(18);
  top: 50%;
  transform: translate(20%, -53%);
  background-color: $white;
  transition: 0.4s;
}

.input:checked + .slider {
  background-color: $primary-color;
}

.input:focus + .slider {
  box-shadow: 0 0 pxToRem(1) $primary-color;
}

.input:checked + .slider:before {
  transform: translate(pxToRem(28), -53%);
}

/* Rounded sliders */
.slider.round {
  border-radius: pxToRem(30);
}

.slider.round:before {
  border-radius: 50%;
}
</style>
