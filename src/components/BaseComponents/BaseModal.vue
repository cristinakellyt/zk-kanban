<template>
  <div>
    <div class="backdrop" @click.stop="cancel"></div>

    <div class="modal">
      <div class="modal__content">
        <h2>
          <slot name="title"></slot>
        </h2>

        <div>
          <slot name="text-warn">Are you sure?</slot>
        </div>

        <div class="modal__content--buttons">
          <BaseButton @click="confirm" text="Delete" buttonStyle="tertiary" />
          <BaseButton @click="cancel" text="Cancel" buttonStyle="secondary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseComponents/BaseButton.vue'
const emit = defineEmits(['confirm', 'cancel'])

// Function to emit the 'confirm' event when the first button is clicked
const confirm = ($event) => {
  emit('confirm')
}

// Function to emit the 'cancel' event when the second button is clicked or backdrop is clicked
const cancel = ($event) => {
  emit('cancel')
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(195, 195, 195, 0.5);
  height: 100%;
  width: 100%;
  z-index: 1000;
}
.modal {
  // @extend %flex-row-centralize;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  border-radius: pxToRem(10);
  box-shadow: 0 0 pxToRem(20) pxToRem(-4) rgba(0, 0, 0, 0.1);
  padding: pxToRem(20);
  // margin: pxToRem(20) 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: pxToRem(640);
  width: pxToRem(300);
  z-index: 10000;
  transition: all 0.2s ease-out;

  &__content {
    // text-align: center;
    display: flex;
    flex-direction: column;

    gap: pxToRem(20);
    padding: pxToRem(20) 0;

    &--buttons {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: pxToRem(20);
      margin-top: pxToRem(12);
    }
  }
}

@include media-query($tablet) {
  .modal {
    // max-width: pxToRem(520);
    width: pxToRem(520);
    padding: pxToRem(15) pxToRem(20);

    // &__content h2 {
    //   font-size: pxToRem(22);
    // }

    &__content {
      gap: pxToRem(10);
      // padding: pxToRem(10) 0;

      h2 {
        margin-bottom: pxToRem(18);
      }

      &--buttons {
        margin-top: pxToRem(32);
      }
    }
  }
}
</style>
