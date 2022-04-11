<template>
  <div
    v-if="showInstallMessage"
    class="sticky bottom-5 right-1/2 translate-x-1/4 max-w-[70%]"
  >
    <div
      class="bg-gray-200 text-gray-800 text-sm rounded py-1 px-4 right-0 bottom-full shadow-sm active:bg-gray-300 active:shadow"
      @click="discard"
    >
      Installez cette appli sur votre iPhone. Cliquez sur
      <apple-share class="w-4 h-4 inline text-sky-500/90" /> et choisissez "Sur
      l'écran d'accueil"
      <svg
        class="absolute text-gray-200 h-4 w-full left-0 top-full"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xml:space="preserve"
      >
        <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  </div>
</template>

<script>
import AppleShare from '../svg/AppleShare.vue'
export default {
  components: { AppleShare },
  data() {
    return {
      showInstallMessage: false,
    }
  },
  mounted() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator.standalone

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this.showInstallMessage = true
    }
  },
  methods: {
    discard() {
      this.showInstallMessage = false
    },
  },
}
</script>

<style></style>
