<template>
  <label v-if="syncLabel" class="check-box-wrapper" :for="id">
    <input :id="id" v-model="checkedVModel" type="checkbox" class="check-box-input" />
    <span class="check-box-label-text">{{ labelText }}</span>
  </label>
  <div v-else class="check-box-wrapper">
    <input :id="id" v-model="checkedVModel" type="checkbox" class="check-box-input" />
    <span class="check-box-label-text">{{ labelText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * The id of the checkbox
     */
    id: number
    /**
     * The label text of the checkbox
     */
    labelText: string
    /**
     * If the checkbox has a label
     */
    syncLabel?: boolean
    /**
     * The v-model of the checkbox
     */
    modelValue: boolean
  }>(),
  {
    syncLabel: true,
    stylingTheme: 'default'
  }
)

const emit = defineEmits(['update:modelValue'])

const checkedVModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';
$check-box-size: pxToRem(20);

.check-box-wrapper {
  display: flex;
  align-items: center;
  gap: pxToRem(16);
  user-select: none;
  margin-bottom: pxToRem(8);
  width: 100%;
  background-color: var(--secondary-color);
  padding: pxToRem(8) pxToRem(16);
  border-radius: pxToRem(5);
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba($primary-color, 0.25);
  }

  .check-box-input {
    width: $check-box-size;
    height: $check-box-size;
    appearance: none;
    border-radius: pxToRem(4);
    border: pxToRem(1.5) solid $medium-grey;
    position: relative;
    background-color: $white;
    cursor: pointer;

    &:checked {
      background-color: $primary-color;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -35%);
        width: pxToRem(14);
        height: pxToRem(14);
        background-image: url('@/assets/icons/icon-check.svg');
        background-size: contain;
        background-repeat: no-repeat;
      }

      & + .check-box-label-text {
        text-decoration: line-through;
        color: $medium-grey;
      }
    }

    & + .check-box-label-text {
      font-weight: 600;
      font-family: $main-font;
      font-size: inherit;
      color: var(--text-color);
    }
  }
}
</style>
