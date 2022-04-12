<template>
  <lottie
    class="h-full w-full fixed top-0 left-0 mx-auto my-0 overflow-hidden"
    :options="lottieOptions"
    @animCreated="handleAnimation"
  />
</template>

<script>
import lottie from 'vue-lottie/src/lottie.vue'
import * as redKingAnimation from '~/assets/animations/red-king.json'
import * as blueKingAnimation from '~/assets/animations/blue-king.json'

export default {
  components: { lottie },
  props: {
    color: {
      type: String,
      required: true,
      validator(value) {
        return ['blue', 'red'].includes(value)
      },
    },
  },
  data() {
    return {
      anim: null,
    }
  },
  computed: {
    lottieOptions() {
      return {
        animationData:
          this.color === 'red'
            ? redKingAnimation.default
            : blueKingAnimation.default,
      }
    },
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim
    },
  },
}
</script>

<style></style>
