<template>
  <RouterLink :to="path" v-if="path">
    <button type="button" :class="classes">
      <img v-if="icon" :src="icon" alt="icon" class="button-icon" />
      {{ text }}
    </button>
  </RouterLink>

  <button v-else type="button" :class="classes" @click="onClick">
    <img v-if="icon" :src="icon" alt="icon" class="button-icon" />
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * The text of the button
     */
    text: string
    /**
     * primary, secondary or tertiary button
     */
    buttonStyle: string
    /**
     * size of the button
     */
    size?: 'small' | 'medium' | 'large'
    /**
     * path to navigate to
     */
    path?: string
    /**
     * if the button is disabled
     */
    isDisabled?: boolean
    /**
     * if there is an icon for the button
     */
    icon?: string
    /**
     * if the button is inverted with the colors in background and text swapped
     */
    inverted?: boolean
  }>(),
  {
    text: 'Button text',
    size: 'medium',
    buttonStyle: 'primary',
    isDisabled: false,
    inverted: false
  }
)

const classes = computed(() => ({
  'button-wrapper': true,
  isDisabled: props.isDisabled,
  [`${props.size || 'medium'}`]: true,
  inverted: props.inverted,
  [`${props.buttonStyle || 'primary'}`]: true
}))

const emit = defineEmits<{
  (e: 'click', id: number): void
}>()

const onClick = () => {
  emit('click', 1)
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: pxToRem(8);
  width: 100%;
  border: 0;
  border-radius: pxToRem(50);
  font-weight: 700;
  line-height: 1;
  padding: pxToRem(12) pxToRem(32);
  text-align: center;
  text-decoration: none;
  font-family: $main-font;
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;

  &.primary {
    background-color: $primary-color;
    color: $white;

    &:not(.isDisabled):hover {
      background-color: $primary-color-light;
    }

    &.inverted {
      background-color: $white;
      border: pxToRem(2) solid $primary-color;
      color: $primary-color;

      &:not(.isDisabled):hover {
        background-color: rgba($primary-color, 0.1);
      }
    }
  }

  &.secondary {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;

    &:not(.isDisabled):hover {
      background-color: rgba($primary-color, 0.25);
    }
  }

  &.tertiary {
    background-color: $red;
    color: $white;

    &:not(.isDisabled):hover {
      background-color: $red-light;
    }

    &.inverted {
      background-color: $white;
      border: pxToRem(2) solid $red;
      color: $red;

      &:not(.isDisabled):hover {
        background-color: rgba($red, 0.1);
      }
    }
  }

  &.small {
    font-size: pxToRem(12);
    padding: pxToRem(10) pxToRem(24);
  }

  &.medium {
    font-size: pxToRem(14);
  }

  &.large {
    font-size: pxToRem(16);
  }

  &.isDisabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }

  .button-icon {
    width: pxToRem(24);
  }
}
</style>
