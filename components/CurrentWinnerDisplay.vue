<template>
  <div>
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
  </div>
</template>

<script>
import AnimatedNumber from './AnimatedNumber.vue'
export default {
  components: { AnimatedNumber },
  props: {
    label: { type: String, required: true },
    percentageWinner: { type: Number, required: true },
    extraClass: { type: String, required: false, default: '' },
  },
}
</script>

<style></style>
