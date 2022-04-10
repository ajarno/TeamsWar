<template>
  <div
    class="h-full mx-auto flex flex-col justify-center items-center bg-gray-100"
  >
    <div class="px-10 md:max-w-80%">
      <h1
        class="mb-10 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight"
      >
        C'est qui la
        <span
          class="transition-colors ease-in-out duration-1000 text-transparent bg-clip-text"
          :class="
            winner !== null
              ? 'bg-gradient-to-br from-transparent to-black/10 ' + winnerColor
              : winnerColor
          "
        >
          meilleure
        </span>
        promo ?
      </h1>
      <div
        class="relative w-full leading-tight font-medium text-white bg-gradient-to-l from-black/10 to-white/10 rounded-full h-5"
        :class="secondTeam.bgColor"
      >
        <span class="absolute w-full pr-3 text-right">
          {{ secondTeam.score }}
        </span>
        <div
          class="absolute bg-gradient-to-r h-5 from-white/5 to-white/20 transition-all duration-500 text-left pl-3"
          :class="
            (percentageFirst > 90 ? 'rounded-full ' : 'rounded-l-full ') +
            firstTeam.bgColor
          "
          :style="percentageFirstWidth"
        >
          {{ firstTeam.score }}
        </div>
      </div>
      <div class="w-full flex flex-wrap-reverse mt-12">
        <div
          class="w-10/12 md:w-2/5 lg:w-1/3 opacity-80 hover:opacity-90 tansition-all duration-500 bg-gray-50 text-gray-700 font-bold leading-none tracking-normal md:tracking-tight px-7 py-8 h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
        >
          <div class="flex flex-col space-y-7 text-lg">
            <div
              v-for="team in teams"
              :key="team.label"
              class="w-full cursor-pointer before:content-[' '] before:inline-block before:w-3 before:h-3 before:bg-gradient-to-br before:rounded-full"
              :class="team.bgColorBefore + ' ' + team.textHoverColor"
              @click="++team.score"
            >
              {{ team.label }}
            </div>
          </div>
        </div>
        <div class="w-10/12 md:w-3/5 lg:w-2/3 text-right mb-5 md:mb-0">
          <transition
            mode="out-in"
            :enter-active-class="enterClassName"
            :leave-active-class="leaveClassName"
          >
            <div :key="winner && winner.label">
              <div v-if="winner !== null">
                <!-- class="animate__animated animate__heartBeat" -->
                <div
                  class="text-transparent bg-clip-text bg-gradient-to-br from-transparent to-black/10 text-5xl font-extrabold leading-none tracking-normal md:text-8xl md:tracking-tight"
                  :class="winnerColor"
                >
                  {{ winner.label }}
                </div>
                <span
                  class="font-bold text-gray-700 text-2xl leading-none tracking-normal md:text-4xl md:tracking-tight"
                >
                  {{ Math.round((winner.score / totalVotes) * 100) }} %
                </span>
              </div>
              <div v-else>
                <div
                  class="text-transparent bg-clip-text bg-gradient-to-br from-transparent to-black/10 text-4xl font-extrabold !leading-loose tracking-normal md:text-6xl md:tracking-tight"
                  :class="winnerColor"
                >
                  Égalité
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      leaveClassName: 'animate__animated animate__fadeOut',
      enterClassName: 'animate__animated animate__tada',
      teams: [
        {
          bgColor: 'bg-blue-600',
          bgColorBefore: 'before:bg-blue-600',
          textHoverColor: 'hover:text-blue-700',
          score: 10,
          label: 'Promo 22',
        },
        {
          bgColor: 'bg-red-600',
          bgColorBefore: 'before:bg-red-600',
          textHoverColor: 'hover:text-red-700',
          score: 10,
          label: 'Promo 24',
        },
      ],
    }
  },
  computed: {
    firstTeam() {
      return this.teams[0]
    },
    secondTeam() {
      return this.teams[1]
    },
    winner() {
      return this.firstTeam.score === this.secondTeam.score
        ? null
        : this.firstTeam.score > this.secondTeam.score
        ? this.firstTeam
        : this.secondTeam
    },
    loser() {
      return this.firstTeam.score === this.secondTeam.score
        ? null
        : this.firstTeam.score > this.secondTeam.score
        ? this.secondTeam
        : this.firstTeam
    },
    winnerColor() {
      return this.winner !== null
        ? this.winner.bgColor
        : 'bg-gray-800 dark:bg-gray-100'
    },
    totalVotes() {
      return this.teams.reduce((accumulator, team) => {
        return accumulator + team.score
      }, 0)
    },
    percentageFirst() {
      return (this.firstTeam.score / this.totalVotes) * 100
    },
    percentageFirstWidth() {
      return `width: ${this.percentageFirst}%`
    },
  },
  watch: {
    winner: {
      immediate: true,
      handler(value) {
        if (value === null) {
          this.enterClassName = 'animate__animated animate__flipInX'
          this.leaveClassName = 'animate__animated animate__bounceOut'
        } else {
          this.leaveClassName = 'animate__animated animate__fadeOut'
          this.enterClassName = 'animate__animated animate__tada'
        }
      },
    },
  },
}
</script>
<style scoped></style>
