<template>
  <div
    class="relative w-full leading-tight font-medium text-white bg-gradient-to-l from-black/10 to-white/10 rounded-full h-5"
    :class="secondTeamScore === 0 ? 'bg-gray-400' : secondTeamColor"
  >
    <span class="absolute w-full pr-3 text-right">
      {{ secondTeamScore }}
    </span>
    <div
      class="absolute bg-gradient-to-r h-5 from-white/5 to-white/20 transition-all duration-500 text-left pl-3"
      :class="
        (percentageFirst > 90 ? 'rounded-full ' : 'rounded-l-full ') +
        (firstTeamScore === 0 ? 'bg-gray-400' : firstTeamColor)
      "
      :style="percentageFirstWidth"
    >
      {{ firstTeamScore }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    firstTeamScore: { type: Number, required: true },
    secondTeamScore: { type: Number, required: true },
    firstTeamColor: { type: String, required: true },
    secondTeamColor: { type: String, required: true },
  },
  computed: {
    totalVotes() {
      return this.firstTeamScore + this.secondTeamScore
    },
    percentageFirst() {
      return (this.firstTeamScore / this.totalVotes) * 100
    },
    percentageFirstWidth() {
      return `width: ${this.percentageFirst}%`
    },
  },
}
</script>

<style></style>
