<!--
  Filename: image-matching-view.vue
  Use: View a Image Matching assessment block
  Creator: core
  Since: v1.0.0
-->

<template>
  <div
    class="image-matching-view"
    :class="langIsAr? 'text-right' : 'text-left'"
  >
    <div class="container">
      <div
        :id="title.id"
        class="flaggable row mb-3"
      >
        <div
          id="title"
          class="col"
        >
          <h4>
            {{ courseSimple? title.simple: title.text }}
            <audio-button
              v-if="taskAudio"
              :src="taskAudio"
            >
            </audio-button>
          </h4>
        </div>
        <flag-icon
          v-if="!viewData"
          :ref-data="title"
          @flagged="title.flagged = true"
        ></flag-icon>
      </div>
      <div
        :id="task.id"
        class="flaggable row"
      >
        <div
          id="task"
          class="col"
        >
          <p>{{ courseSimple? task.simple: task.text }}</p>
        </div>
        <flag-icon
          v-if="!viewData"
          :ref-data="task"
          @flagged="task.flagged = true"
        ></flag-icon>
      </div>

      <hr>
      <div class="row">
        <div class="col">
          <form>
            <div
              v-for="(pair,i) in pairs"
              :id="pair.id"
              :key="pair.id"
              class="form-group row flaggable"
            >
              <label
                :for="pair.label+i"
                class="col-sm-6 col-form-label answer-text"
              >
                <img
                  v-if="pair.img"
                  v-auth-image="pair.img"
                  :alt="courseSimple? pair.labelSimple: pair.label"
                >
                <audio-button
                  v-if="pair.audio"
                  :class="langIsAr? 'mr-2' : 'ml-2'"
                  :src="pair.audio"
                >
                </audio-button>
                {{ courseSimple? pair.labelSimple: pair.label }}
              </label>
              <div class="col-sm-6">
                <select
                  :id="'item-' + i"
                  v-model="solution[i]"
                  :disabled="freeze"
                  class="custom-select"
                >
                  <option
                    disabled
                    value="-1"
                  >
                    {{ defaultOption }}
                  </option>
                  <option
                    v-for="(opt, j) in options"
                    :key="'option-' + j"
                    :value="j"
                  >
                    {{ courseSimple? opt.simple: opt.text }}
                  </option>
                </select>
                <div class="d-inline-block pt-3 w-100 text-center">
                  <i :class="eval[i]"></i>
                </div>
              </div>
              <flag-icon
                v-if="!viewData"
                :ref-data="pair"
                :interactive="true"
                @flagged="pair.flagged = true"
              ></flag-icon>
            </div>
          </form>
        </div>
      </div>

      <div class="row pt-3">
        <button
          type="button"
          class="btn btn-warning"
          :disabled="freeze"
          @click="reset"
        >
          {{ y18n('imageMatching.removeInput') }}
        </button>

        <button
          type="button"
          class="btn btn-link"
          :class="langIsAr? 'float-right': 'float-left'"
          :disabled="freeze"
          @click="check"
        >
          {{ y18n('check') }}
        </button>
        <button
          type="button"
          class="btn btn-primary mt-3 btn-lg"
          :class="langIsAr? 'float-left mr-auto': 'float-right ml-auto'"
          @click="done"
        >
          <span>
            {{ y18n('nextContent') }}
            <i
              :class="langIsAr?
                'fas fa-arrow-left' :
                'fas fa-arrow-right'"
            ></i>
          </span>
        </button>
      </div>

      <div class="mt-3">
        <div class="row">
          <div
            v-if="showSolutionsBool"
            id="solutions"
          >
            {{ i18n["layaLaScmc.showCorrect"] }}
            <div
              v-for="(pair, index) in pairs"
              :key="index"
            >
              {{ courseSimple? pair.labelSimple: pair.label }}:
              {{ courseSimple? relations[pair.relation].simple : relations[pair.relation].text }},
            </div>
          </div>
        </div>
        <div>
          <div v-if="allAnswersChosen">
            {{ y18n('imageMatching.missingAnswerWarning') }}
          </div>
          <b-modal
            id="missing-answer-warning"
            :title="y18n('password.error')"
            ok-variant="warning"
            header-bg-variant="warning"
            ok-only
            centered
            static
          >
            {{ y18n('imageMatching.missingAnswerWarning') }}
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { locale, viewPluginProps } from '@/mixins'
import '@/assets/styles/flaggables.css'
import AudioButton from '@/components/helpers/audio-button.vue'
import FlagIcon from '@/components/course/flag/flag-icon.vue'
import { stripKey } from '@/mixins/general/helpers'

export default {
  name: 'ImageMatchingView',
  components: { FlagIcon, AudioButton },

  mixins: [
    locale,
    viewPluginProps
  ],

  data () {
    return {
      ...this.viewData,
      allAnswersChosen: false,
      defaultOption: '',
      solution: [],
      eval: [],
      freeze: false,
      showSolutionsBool: false
    }
  },

  computed: {
    ...mapGetters(['courseSimple']),

    /**
     * options: map pairs to their relation
     *
     * Author: pj
     *
     * Last Updated: 03.03.2022
     */
    options () {
      return this.relations.map(value => ({ ...value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(val => stripKey('sort', val))
    }
  },

  watch: {
    content: {
      deep: true,
      handler () {
        this.fetchData()
      }
    }
  },

  created () {
    this.defaultOption = this.y18n('imageMatching.defaultOption')
    // eslint-disable-next-line no-unused-vars
    for (const i in this.pairs) {
      this.solution.push(-1)
    }
  },

  methods: {

    /**
     * Function reset: reset relations to default
     *
     * Author: core
     *
     * Last Updated: unknown
     */
    reset () {
      this.solution = this.pairs.map(() => -1)
    },

    /**
     * Function done: execute first function from onFinish
     *
     * Author: core
     *
     * Last Updated: unknown
     */
    done () {
      this.onFinish[0]()
    },

    /**
     * Function check: Check if User's solution is correct
     *
     * Author: core
     *
     * Last Updated: March 19, 2021
     */
    check () {
      // map shuffeled answers to their actual equivalents by comparing the text of the options
      const realAnswer = this.solution.map(idx => this.relations.findIndex(val => val.text === this.options[idx]?.text))

      if (!this.solution.includes(-1)) {
        this.allAnswersChosen = false
        for (let i = 0; i < this.pairs.length; ++i) {
          if (this.pairs[i].relation === realAnswer[i]) {
            this.eval[i] = { 'fa fa-check fa-2x text-success': true }
          } else {
            // this.solution[i] = this.pairs[i].relation
            this.eval[i] = { 'fa fa-times fa-2x text-danger': true }
          }
        }
        this.freeze = true
        this.showSolutionsBool = true
        this.$forceUpdate()
      } else {
        this.allAnswersChosen = true
        this.$bvModal.show('missing-answer-warning')
      }
    }
  }
}
</script>

<style scoped>
.item {
  margin-bottom: 2rem;
}
.item:last-child {
  margin-bottom: 0;
}

img {
  max-height: 20rem;
  max-width: 20rem;
}

.form-group.row {
  padding: 15px;
  margin-bottom: 0;
}
.form-group.row:nth-child(2) {
  background-color: #ebece7;
}

</style>