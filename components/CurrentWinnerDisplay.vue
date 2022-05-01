<template>
  <div class="relative">
    <div
      class="text-transparent bg-clip-text bg-gradient-to-br from-transparent to-black/10 text-6xl font-extrabold leading-none tracking-normal md:text-8xl md:tracking-tight"
      :class="extraClass"
    >
      {{ label }}
    </div>
    <span
      class="font-bold text-gray-700 text-3xl leading-none tracking-normal md:text-4xl md:tracking-tight"
    >
      <animated-number :number="percentageWinner" />%
    </span>
    <increase-or-decrease-animation
      v-if="increase !== null"
      :key="increase + ' ' + percentageWinner"
      class="absolute -right-[56%] bottom-0 my-auto h-4/5 w-full opacity-50"
      :increase="increase"
    />
  </div>
</template>

<script>
import AnimatedNumber from './animations/AnimatedNumber.vue'
import IncreaseOrDecreaseAnimation from './animations/IncreaseOrDecreaseAnimation.vue'
export default {
  components: { AnimatedNumber, IncreaseOrDecreaseAnimation },
  props: {
    label: { type: String, required: true },
    percentageWinner: { type: Number, required: true },
    extraClass: { type: String, required: false, default: '' },
  },
  data() {
    return { increase: null, displayIncreaseOrDecrease: false }
  },
  watch: {
    percentageWinner(newValue, oldValue) {
      this.increase = oldValue < newValue
    },
  },
}
</script>

<style></style>
