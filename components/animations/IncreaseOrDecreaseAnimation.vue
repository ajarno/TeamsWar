<template>
  <div>
    <lottie :options="lottieOptions" @animCreated="handleAnimation" />
  </div>
</template>

<script>
import lottie from 'vue-lottie/src/lottie.vue'
import * as increaseAnimation from '~/assets/animations/increase.json'
import * as decreaseAnimation from '~/assets/animations/decrease.json'

export default {
  components: { lottie },
  props: {
    increase: {
      type: Boolean,
      required: false,
      default: true,
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
        animationData: this.increase
          ? increaseAnimation.default
          : decreaseAnimation.default,
        renderer: 'canvas',
        loop: false,
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
