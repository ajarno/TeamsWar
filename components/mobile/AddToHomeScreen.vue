<template>
  <button v-if="display" class="add-button">Add to home screen</button>
</template>

<script>
export default {
  data() {
    return {
      deferredPrompt: undefined,
      display: false,
    }
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.deferredPrompt = e
      this.display = true
    })
  },
  prompt() {
    this.display = false
    this.deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      deferredPrompt = undefined
    })
  },
}
</script>

<style></style>
