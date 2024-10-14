import { BaseTransition } from 'vue';
<template>
  <div class="color-theme-wrapper">
    <img :src="iconLightTheme" alt="icon-light-theme" />
    <!-- Toggle -->
    <BaseToggle @changeToggle="updateColorTheme" :checkedVModel="isDarkThemeColor" />
    <img :src="iconDarkTheme" alt="icon-dark" />
  </div>
</template>

<script setup lang="ts">
//Vue
import { computed, ref } from 'vue'

// Components
import BaseToggle from '@/components/BaseComponents/BaseToggle.vue'

//Images
import iconDarkTheme from '@/assets/icons/icon-dark-theme.svg'
import iconLightTheme from '@/assets/icons/icon-light-theme.svg'

//Store
import { useDesignSettingsStore } from '@/stores/DesignSettingsStore'

//Types
import { ColorTheme } from '@/types/appTypes'

const designSettingsStore = useDesignSettingsStore()
const isDarkThemeColor = ref(designSettingsStore.getThemeColor === ColorTheme.Dark)

const updateColorTheme = (isChecked: boolean) => {
  if (isChecked) {
    isDarkThemeColor.value = true
    designSettingsStore.setThemeColor(ColorTheme.Dark)
  } else {
    isDarkThemeColor.value = false
    designSettingsStore.setThemeColor(ColorTheme.Light)
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
