<template>
  <div
    class="h-full mx-auto flex flex-col justify-center items-center bg-gray-100"
  >
    <div class="px-10 md:max-w-80%">
      <h1
        class="mb-10 text-4xl text-center font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight"
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
      <progress-adversity-bar
        :first-team-color="firstTeam.bgColor"
        :second-team-color="secondTeam.bgColor"
        :first-team-score="firstTeam.score"
        :second-team-score="secondTeam.score"
      />
      <div class="w-full flex flex-wrap-reverse mt-12">
        <div
          class="w-full md:w-2/5 lg:w-1/3 opacity-80 hover:opacity-90 tansition-all duration-500 bg-gray-50 text-gray-700 font-bold leading-none tracking-normal md:tracking-tight px-7 py-8 h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
        >
          <div class="flex flex-col space-y-7 text-lg">
            <voting-button
              v-for="(team, index) in teams"
              :key="team.index"
              :index="index"
              :label="team.label"
              :class="team.bgColorHover + ' ' + team.focusRing"
              @increaseScore="increaseScore"
            />
          </div>
        </div>
        <div class="w-full md:w-3/5 lg:w-2/3 text-right mb-8 md:mb-0">
          <transition
            mode="out-in"
            :enter-active-class="enterClassName"
            :leave-active-class="leaveClassName"
          >
            <div :key="winner && winner.label">
              <div v-if="winner !== null">
                <current-winner-display
                  :extra-class="winnerColor"
                  :label="winner.label"
                  :percentage-winner="percentageWinner"
                />
              </div>
              <div v-else>
                <equality-display :class="winnerColor" />
              </div>
            </div>
          </transition>
        </div>
        <add-to-home-screen />
      </div>
    </div>
  </div>
</template>

<script>
import ProgressAdversityBar from '~/components/ProgressAdversityBar.vue'
import VotingButton from '~/components/VotingButton.vue'
import CurrentWinnerDisplay from '~/components/CurrentWinnerDisplay.vue'
import EqualityDisplay from '~/components/EqualityDisplay.vue'
import AddToHomeScreen from '~/components/mobile/AddToHomeScreen.vue'

export default {
  name: 'IndexPage',
  components: {
    ProgressAdversityBar,
    VotingButton,
    CurrentWinnerDisplay,
    EqualityDisplay,
    AddToHomeScreen
},
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
    percentageWinner() {
      return Math.round((this.winner.score / this.totalVotes) * 100)
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
