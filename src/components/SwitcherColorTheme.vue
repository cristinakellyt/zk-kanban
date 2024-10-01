import { BaseTransition } from 'vue';
<template>
  <div class="color-theme-wrapper">
    <img :src="iconLightTheme" alt="icon-light-theme" />
    <!-- Toggle -->
    <BaseToggle @changeToggle="updateColorTheme" :checkedVModel="isDarkThemeColor" />
    <img :src="iconDarkTheme" alt="icon-dark-theme" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseToggle from '@/components/BaseComponents/BaseToggle.vue'
import iconDarkTheme from '@/assets/icons/icon-dark-theme.svg'
import iconLightTheme from '@/assets/icons/icon-light-theme.svg'

const isDarkThemeColor = ref(document.getElementById('app')?.classList.contains('dark-theme'))

const updateColorTheme = (isChecked: boolean) => {
  if (isChecked) {
    isDarkThemeColor.value = true
    document.getElementById('app')?.classList.add('dark-theme')
  } else {
    isDarkThemeColor.value = false
    document.getElementById('app')?.classList.remove('dark-theme')
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';
$toggle-width: pxToRem(50);
$toggle-height: pxToRem(25);

.color-theme-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: pxToRem(20);
  background-color: var(--secondary-color);
  border-radius: pxToRem(4);
  padding: pxToRem(12) pxToRem(16);
  width: 100%;
}
</style>
