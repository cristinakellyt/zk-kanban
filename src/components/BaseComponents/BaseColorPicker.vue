<template>
  <div>
    <input
      v-if="selectedColor"
      type="color"
      id="colorPicker"
      v-model="selectedColor"
      class="color-input"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['selectedColor'])

const props = withDefaults(
  defineProps<{
    color: string
  }>(),
  {
    color: '#49c4e5'
  }
)

console.log(props.color)

const selectedColor = ref(props.color)

watch(
  () => selectedColor.value,
  (color) => {
    emit('selectedColor', color)
  },
  { immediate: true }
)

watch(
  () => props.color,
  (newColor) => {
    selectedColor.value = newColor
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.color-input {
  width: pxToRem(28);
  height: pxToRem(28);
  border: none;
  border-radius: pxToRem(5);
  cursor: pointer;
}
</style>
