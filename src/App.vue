<template>
  <RouterView />
</template>

<script setup lang="ts">
// Vue
import { computed, watch } from 'vue'

//Store
import { useDesignSettingsStore } from '@/stores/DesignSettingsStore'

// Types
import { ColorTheme } from '@/types/appTypes'

const designSettingsStore = useDesignSettingsStore()

const isDarkThemeColor = computed(() => designSettingsStore.getThemeColor === ColorTheme.Dark)

watch(
  () => isDarkThemeColor.value,
  (value) => {
    if (value) {
      document.getElementById('app')?.classList.add('dark-theme')
    } else {
      document.getElementById('app')?.classList.remove('dark-theme')
    }
  },
  { immediate: true }
)
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
