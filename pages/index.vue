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
        :class="secondTeam.score === 0 ? 'bg-gray-400' : secondTeam.bgColor"
      >
        <span class="absolute w-full pr-3 text-right">
          {{ secondTeam.score }}
        </span>
        <div
          class="absolute bg-gradient-to-r h-5 from-white/5 to-white/20 transition-all duration-500 text-left pl-3"
          :class="
            (percentageFirst > 90 ? 'rounded-full ' : 'rounded-l-full ') +
            (firstTeam.score === 0 ? 'bg-gray-400' : firstTeam.bgColor)
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
            <button
              v-for="(team, index) in teams"
              :key="team.label"
              class="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br hover:text-white dark:text-white focus:ring-4 focus:outline-none"
              :class="team.bgColorHover + ' ' + team.focusRing"
              type="button"
              @click="() => increaseScore(index)"
            >
              <span
                class="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
              >
                {{ team.label }}
              </span>
              <span
                class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease text-lg"
              >
                🍺
              </span>
            </button>
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
      database: undefined,
      scoresKey: undefined,
      teams: [
        {
          bgColor: 'bg-blue-600',
          bgColorHover:
            'from-blue-500 to-blue-700 group-hover:from-blue-500 group-hover:to-blue-700',
          focusRing: 'focus:ring-blue-300 dark:focus:ring-blue-800',
          score: 0,
          label: 'Promo 22',
        },
        {
          bgColor: 'bg-red-600',
          bgColorHover:
            'from-red-500 to-red-700 group-hover:from-red-500 group-hover:to-red-700',
          focusRing: 'focus:ring-red-300 dark:focus:ring-red-800',
          score: 0,
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
  mounted() {
    this.defineDb()
    this.onDbChange()
  },
  methods: {
    defineDb() {
      this.database = this.$fire.database.ref('scores')
    },
    onDbChange() {
      try {
        this.database.on('value', (snapshot) => {
          this.scoresKey = snapshot.key
          this.firstTeam.score = snapshot.toJSON().firstTeam
          this.secondTeam.score = snapshot.toJSON().secondTeam
        })
      } catch (e) {
        console.error(e)
      }
    },
    async increaseScore(index) {
      try {
        const recentSnap = await this.database.once('value')
        const update = {
          firstTeam: recentSnap.val().firstTeam + 1,
          secondTeam: recentSnap.val().secondTeam + 1,
        }
        index === 0 ? delete update.secondTeam : delete update.firstTeam
        this.database.update(update)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
<style scoped></style>
