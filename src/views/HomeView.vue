<template>
  <main>
    <NavBar class="nav-bar" @isNavBarVisible="adjustHeaderWidth" :imgLogo="getLogo" />
    <TheHeader class="header" :headerMarginLeft="currentHeaderMarginLeft" :imgLogo="getLogo" />
  </main>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue'

// Components
import NavBar from '@/components/NavBar.vue'
import TheHeader from '@/components/TheHeader.vue'

//Images
import imgLogoDark from '@/assets/icons/logo-dark.svg'
import imgLogoLight from '@/assets/icons/logo-light.svg'

const MARGIN_LEFT = 300

const currentHeaderMarginLeft = ref(MARGIN_LEFT)

const adjustHeaderWidth = (navBarIsVisible: boolean) => {
  currentHeaderMarginLeft.value = navBarIsVisible ? MARGIN_LEFT : 0
}

const getLogo = ref(imgLogoDark)
const appElement = document.getElementById('app')

// Create a mutation observer
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      getLogo.value = appElement?.classList.contains('dark-theme') ? imgLogoLight : imgLogoDark
      console.log('Logo changed')
    }
  }
})

// Start observing the 'app' element for class attribute changes
if (appElement) {
  observer.observe(appElement, { attributes: true })
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';
$navbar-width: pxToRem(300);

.nav-bar {
  width: $navbar-width;
  position: fixed;
}

.header {
  margin-left: $navbar-width;
  width: auto;
  transition: all 0.3s ease-in-out;
}
</style>
