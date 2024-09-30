<template>
  <header ref="header" class="header-wrapper">
    <div class="logo-wrapper" v-if="headerMarginLeft === 0">
      <img class="logo" alt="kanban-logo" :src="imgLogo" />
    </div>
    <div class="content-wrapper">
      <h1>My App</h1>
      <div class="header-options">
        <BaseButton text="Add new task" icon="src/assets/icons/icon-add-white.svg" is-disabled />
        <div class="icon-options">
          <img src="@/assets/icons/icon-vertical-ellipsis.svg" alt="options-icon" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

// Components
import BaseButton from './BaseComponents/BaseButton.vue'

// Images
import imgLogoDark from '@/assets/icons/logo-dark.svg'

const props = withDefaults(
  defineProps<{
    headerMarginLeft: number
    imgLogo?: string
  }>(),
  {
    headerMarginLeft: 300,
    imgLogo: imgLogoDark
  }
)

const pxToRem = (px: number) => `${px / 16}rem`
const header = ref<HTMLElement | null>(null)

//watch props and adjust margin left in the header
watch(
  () => props.headerMarginLeft,
  (newVal) => {
    if (header.value) {
      header.value.style.marginLeft = pxToRem(newVal)
    }
  }
)
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.header-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  color: var(--text-color);
  border-bottom: pxToRem(1) solid var(--secondary-color);

  .header-title-wrapper {
    display: flex;
    align-items: center;
    gap: pxToRem(46);
  }

  .logo-wrapper {
    width: pxToRem(300);
    border-right: pxToRem(1) solid var(--secondary-color);
    padding: 0 pxToRem(32);
    align-self: stretch;
    justify-self: center;
    display: flex;
    align-items: center;
  }

  .content-wrapper {
    display: flex;
    align-items: center;
    gap: pxToRem(16);
    padding: pxToRem(32);
    width: 100%;
  }

  .header-options {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: pxToRem(16);

    .icon-options {
      cursor: pointer;
      width: max-content;
      height: fit-content;
      object-fit: cover;
      padding: pxToRem(8);
    }
  }
}
</style>
