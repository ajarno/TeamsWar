<template>
  <span>{{ animatedNumber }}</span>
</template>

<script>
export default {
  props: { number: { type: Number, required: true } },
  data() {
    return {
      tweenedNumber: 0,
    }
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(2)
    },
  },
  watch: {
    number: {
      immediate: true,
      handler(newValue) {
        const gsap = this.$gsap
        gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue })
      },
    },
  },
}
</script>

<style></style>
