<template>
  <div
    class="h-full mx-auto justify-center items-center bg-gray-100 shadow-2xl overflow-y-auto"
  >
    <div
      class="relative mx-auto w-full h-full flex justify-center items-center"
    >
      <div class="flex flex-col p-8 w-full h-full">
        <div class="flex justify-end -m-6">
          <home-button />
        </div>
        <div class="px-10 md:max-w-80% flex flex-col space-y-6">
          <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
            Paramétrage
          </h2>
          <div class="relative">
            <label for="question" class="leading-7 text-xs text-gray-500">
              Question
            </label>
            <input
              id="question"
              v-model="question"
              type="text"
              name="question"
              class="w-full bg-gray-50 rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-sm outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative">
            <label for="highlighted" class="leading-7 text-xs text-gray-500">
              Section mise en valeur
            </label>
            <input
              id="highlighted"
              v-model="highlighted"
              type="text"
              name="highlighted"
              class="w-full bg-gray-50 rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-sm outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative">
            <label for="team1" class="leading-7 text-xs text-gray-500">
              Nom de l'équipe 1
            </label>
            <input
              id="team1"
              v-model="label1"
              type="text"
              name="team1"
              class="w-full bg-gray-50 rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-sm outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative">
            <label for="team2" class="leading-7 text-xs text-gray-500">
              Nom de l'équipe 2
            </label>
            <input
              id="team2"
              v-model="label2"
              type="text"
              name="team2"
              class="w-full bg-gray-50 rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-sm outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            class="w-full text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
            @click="applyChanges"
          >
            Appliquer les changements
          </button>
          <button
            class="w-full px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-gray-600 hover:text-gray-100 transition-colors duration-300 inline-block"
          >
            <span
              class="absolute bottom-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"
            ></span>
            <span class="relative" @click="reset">
              Réinitialiser les scores
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeButton from '~/components/navigation/HomeButton.vue'

export default {
  name: 'SettingsPage',
  components: { HomeButton },
  transition: { name: 'settings', mode: 'out-in' },
  data() {
    return {
      database: undefined,
      question: '',
      highlighted: '',
      label1: '',
      label2: '',
    }
  },
  computed: {
    beginning() {
      let index = this.question.length
      if (this.highlighted !== '') {
        const foundIndex = this.question.indexOf(this.highlighted)
        if (foundIndex !== -1) index = foundIndex
      }
      return this.question.slice(0, index)
    },
    ending() {
      let index = this.question.length
      if (this.highlighted !== '') {
        const foundIndex = this.question.indexOf(this.highlighted)
        if (foundIndex !== -1) index = foundIndex + this.highlighted.length
      }
      console.log(
        this.beginning +
          this.highlighted +
          this.question.slice(index, this.question.length)
      )
      return this.question.slice(index, this.question.length)
    },
  },
  created() {
    this.defineDb()
    this.getInitialValuesFromStaticDb()
  },
  methods: {
    defineDb() {
      this.database = this.$fire.database
    },
    getInitialValuesFromStaticDb() {
      this.database
        .ref('question')
        .once('value')
        .then((snapshot) => {
          this.question =
            snapshot.toJSON().beginning +
            snapshot.toJSON().highlighted +
            snapshot.toJSON().ending
          this.highlighted = snapshot.toJSON().highlighted
        })
      this.database
        .ref('labels')
        .once('value')
        .then((snapshot) => {
          this.label1 = snapshot.toJSON().firstTeam
          this.label2 = snapshot.toJSON().secondTeam
        })
    },
    applyChanges() {
      this.database.ref('question').update({
        beginning: this.beginning,
        highlighted: this.highlighted,
        ending: this.ending,
      })
      this.database.ref('labels').update({
        firstTeam: this.label1,
        secondTeam: this.label2,
      })
      this.backHome()
    },
    backHome() {
      this.$router.push({
        path: '/',
      })
    },
    reset() {
      this.$fire.database.ref('scores').update({
        firstTeam: 0,
        secondTeam: 0,
      })
    },
  },
}
</script>
<style>
.settings-enter-active {
  -webkit-animation: fadeInRightBig 0.7s;
  animation: fadeInRightBig 0.7s;
}
.settings-leave-active {
  -webkit-animation: zoomOutRight 0.5s;
  animation: zoomOutRight 0.5s;
}
</style>
