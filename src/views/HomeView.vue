<template>
  <main>
    <!-- Desktop navbar -->
    <DesktopNavBar
      class="nav-bar-desktop"
      @isNavBarVisible="adjustHeaderWidth"
      :imgLogo="getResponsiveLogo"
    />
    <!-- Mobile navbar -->
    <AnimationTransition name="fade" group>
      <MobileNavBar
        class="nav-bar-mobile"
        v-if="isNavMobileOpen"
        @close="() => (isNavMobileOpen = false)"
      />
    </AnimationTransition>
    <!-- Header -->
    <TheHeader
      class="header"
      :headerMarginLeft="currentHeaderMarginLeft"
      :imgLogo="getResponsiveLogo"
      @openMobileNav="showNavMobile"
    />
  </main>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue'

// Components
import DesktopNavBar from '@/components/DesktopNavBar.vue'
import MobileNavBar from '@/components/MobileNavBar.vue'
import TheHeader from '@/components/TheHeader.vue'
import AnimationTransition from '@/components/animations/AnimationTransition.vue'

//Images
import imgLogoDark from '@/assets/icons/logo-dark.svg'
import imgLogoLight from '@/assets/icons/logo-light.svg'

const MARGIN_LEFT = 300

const currentHeaderMarginLeft = ref(MARGIN_LEFT)
const getResponsiveLogo = ref(imgLogoDark)
const appElement = document.getElementById('app')
const isNavMobileOpen = ref(false)

const adjustHeaderWidth = (navDesktopIsVisible: boolean) => {
  currentHeaderMarginLeft.value = navDesktopIsVisible ? MARGIN_LEFT : 0
}

const showNavMobile = () => {
  isNavMobileOpen.value = true
}

// Create a mutation observer to change the logo when the color theme changes
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      getResponsiveLogo.value = appElement?.classList.contains('dark-theme')
        ? imgLogoLight
        : imgLogoDark
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

.nav-bar-desktop {
  display: none;
}

.header {
  width: auto;
  transition: all 0.3s ease-in-out;
}

@include media-query($laptop-medium) {
  .nav-bar-desktop {
    display: block;
    width: $navbar-width;
    position: fixed;
  }

  .nav-bar-mobile {
    display: none;
  }
}
</style>
