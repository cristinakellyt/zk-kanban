<template>
  <div class="input-wrapper">
    <label :for="fieldName" class="input-label">{{ labelText }}</label>
    <textarea
      v-if="type === 'textarea'"
      :class="{ 'textarea-element': true, extraClass: !!extraClass, error: error }"
      :id="fieldName"
      :name="fieldName"
      :placeholder="placeholder"
      :readonly="isReadOnly"
      :maxlength="maxLength"
      :minlength="minLength"
      :pattern="pattern"
      :required="isRequired"
      v-model="input"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    ></textarea>

    <input
      v-else
      :class="{ 'input-element': true, extraClass: !!extraClass, error: error }"
      :id="fieldName"
      :name="fieldName"
      :type="type"
      :placeholder="placeholder"
      :readonly="isReadOnly"
      :maxlength="maxLength"
      :minlength="minLength"
      :pattern="pattern"
      :required="isRequired"
      v-model="input"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <span class="input-extra"> <slot name="input-extra"></slot></span>

    <span v-if="error" class="text-error">{{ textError }}</span>
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
    input?: string | number | undefined
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
    /**
     * error
     */
    error?: boolean
    /**
     * required
     */
    isRequired?: boolean
  }>(),
  {
    type: 'text',
    placeholder: 'Placeholder',
    isReadonly: false,
    debounce: 0,
    extraClass: '',
    isRequired: true
  }
)

const emit = defineEmits<{
  (e: 'inputChange', value: string): void
  (e: 'focus'): void
  (e: 'blur', value: string): void
}>()

const input = ref()

// watch for changes in the input prop
watch(
  () => props.input,
  () => {
    if (typeof props.input !== 'undefined' || props.input !== null) {
      input.value = props.input
    }
  },
  { immediate: true }
)

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  input.value = target.value
  emit('inputChange', input.value)
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
  position: relative;

  .input-label {
    font-weight: 600;
    font-size: pxToRem(12);
    margin-bottom: pxToRem(5);
    color: var(--medium-grey);
  }

  .textarea-element {
    width: 100%;
    background-color: inherit;
    height: pxToRem(100);
    padding: pxToRem(10) pxToRem(15);
    border: pxToRem(1) solid rgba($medium-grey, 0.6);
    border-radius: pxToRem(5);
    transition: border-color 0.2s;
    font-family: $main-font;
    color: var(--text-color);
    resize: none;
    position: relative;

    &::placeholder {
      color: rgba($medium-grey, 0.6);
      font-size: pxToRem(12);
    }

    &:focus {
      outline: none;
      border-color: $primary-color;
    }

    &.error {
      border-color: $color-red;
    }
  }

  .input-element {
    width: 100%;
    background-color: inherit;
    padding: pxToRem(10) pxToRem(15);
    border: pxToRem(1) solid rgba($medium-grey, 0.6);
    border-radius: pxToRem(5);
    transition: border-color 0.2s;
    font-family: $main-font;
    color: var(--text-color);
    position: relative;

    &::placeholder {
      color: rgba($medium-grey, 0.6);
      font-size: pxToRem(12);
    }

    &:focus {
      outline: none;
      border-color: $primary-color;
    }

    &.error {
      border-color: $color-red;
    }
  }

  .input-extra {
    position: absolute;
    top: 50%;
    right: pxToRem(8);
    transform: translateY(-43%);
  }

  .text-error {
    position: absolute;
    right: pxToRem(8);
    top: 50%;
    transform: translateY(-30%);
    font-size: pxToRem(12);
    color: $color-red;
    margin-top: pxToRem(5);
  }
}
</style>
