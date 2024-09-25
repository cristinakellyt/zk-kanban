<template>
  <div class="input-wrapper">
    <label :for="fieldName" class="input-label">{{ labelText }}</label>
    <input
      :class="{ 'input-element': true, extraClass: !!extraClass, error: !!textError }"
      :id="fieldName"
      :name="fieldName"
      :type="type"
      :placeholder="placeholder"
      :readonly="isReadOnly"
      :maxlength="maxLength"
      :minlength="minLength"
      :pattern="pattern"
      v-model="input"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />

    <span v-if="textError" class="text-error">{{ textError }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * The type of the input
     */
    type: string
    /**
     * The placeholder of the input
     */
    placeholder: string
    /**
     * The fieldName of the input
     */
    fieldName: string
    /**
     * The value of the input
     */
    input?: string
    /**
     * If is readonly
     */
    isReadOnly?: boolean
    /**
     * debounce
     */
    debounce?: number
    /**
     * Max length
     */
    maxLength?: number
    /**
     * Min length
     */
    minLength?: number
    /**
     * label text
     */
    labelText?: string
    /**
     * extra class
     */
    extraClass?: string
    /**
     * pattern
     */
    pattern?: string
    /**
     * text error
     */
    textError?: string
  }>(),
  {
    type: 'text',
    placeholder: 'Placeholder',
    isReadonly: false,
    debounce: 0,
    labelText: 'Label',
    extraClass: '',
    pattern: ''
  }
)

const emit = defineEmits<{
  (e: 'input', value: string): void
  (e: 'focus'): void
  (e: 'blur', value: string): void
}>()

const input = ref('')

// watch for changes in the input prop
watch(
  () => props.input,
  () => {
    input.value = props.input
  },
  { immediate: true }
)

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  input.value = target.value
  emit('input', input.value)
}

const onFocus = () => {
  emit('focus')
}

const onBlur = (e: Event) => {
  emit('blur', props.input)
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: pxToRem(10);
  position: relative;

  .input-label {
    font-weight: 600;
    font-size: pxToRem(12);
    margin-bottom: pxToRem(5);
    color: $medium-grey;
  }

  .input-element {
    width: 100%;

    padding: pxToRem(10) pxToRem(15);
    border: pxToRem(1) solid rgba($medium-grey, 0.6);
    border-radius: pxToRem(5);
    transition: border-color 0.2s;
    font-family: $main-font;
    color: $black;

    &::placeholder {
      color: rgba($medium-grey, 0.6);
      font-size: pxToRem(12);
    }

    &:focus {
      outline: none;
      border-color: $primary-color;
    }

    &.error {
      border-color: $red;
    }
  }

  .text-error {
    position: absolute;
    right: pxToRem(8);
    top: 50%;
    transform: translateY(-30%);
    font-size: pxToRem(12);
    color: $red;
    margin-top: pxToRem(5);
  }
}
</style>
