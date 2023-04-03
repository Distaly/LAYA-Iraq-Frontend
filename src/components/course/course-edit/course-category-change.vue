<!--
Filename: course-category-change.vue
Use: Change course category
Author: cmc
Date: October 27, 2020
Dependencies:
  vuex,
  @/mixins/locale.vue
-->

<template>
  <div class="row mt-3">
    <div class="col">
      <b-button
        size="sm"
        variant="warning"
        :class="langIsAr? 'float-left' : 'float-right'"
        @click="$bvModal.show('author-change-category-confirm')"
      >
        <i class="fas fa-exclamation-circle"></i> {{ y18n('changeCategory') }}
      </b-button>
    </div>

    <div class="col text-dark">
      {{ y18n('changeCategory.tip') }}
    </div>

    <b-modal
      id="author-change-category-confirm"
      :title="y18n('changeCategory')"
      header-bg-variant="warning"
      ok-variant="warning"
      :ok-title="y18n('save')"
      :cancel-title="y18n('cancel')"
      centered
      static
      :aria-label="y18n('popupwarning')"
      @ok="changeCourseCategory"
    >
      <p>
        {{ y18n('changeCategory') }}
        <input
          v-model="newCategory"
          type="text"
          class="form-control"
          :class="badInput ? 'border border-danger': ''"
          :placeholder="y18n('changeCategory.new')"
          :aria-label="y18n('changeCategory.new')"
          @blur="newCategory = newCategory.trim()"
        >
      </p>
      <p
        v-if="badInput"
        id="input-warning"
      >
        <i class="fas fa-exclamation-triangle"></i>
        {{ inputWarning }}
      </p>
    </b-modal>
    <div
      id="openPopup"
      style="display:none"
    >
      {{ y18n('popupwarning') }}
    </div>
  </div>
</template>

<script>
import { locale } from '@/mixins'
import { mapGetters } from 'vuex'

export default {
  name: 'CourseCategoryChange',

  mixins: [
    locale
  ],

  data () {
    return {
      badInput: null,
      newCategory: ''
    }
  },

  computed: {
    ...mapGetters(['course']),

    inputWarning () {
      return this.badInput ? this.y18n(`changeCategory.${this.badInput}`) : ''
    }
  },

  methods: {

    /**
     * Function changeCourseCategory: change course category
     *
     * Author: cmc
     *
     * Last Updated: August 9, 2022
     */
    changeCourseCategory (e) {
      e.preventDefault()
      if (!this.newCategory) {
        this.badInput = 'empty'
      } else if (this.newCategory === this.course.category) {
        this.badInput = 'same'
      } else {
        this.$nextTick(() => {
          this.$bvModal.hide('author-change-category-confirm')
        })
        this.badInput = null
        this.$store.commit('changeCourseCategory', this.newCategory.trim())
        this.$store.dispatch('updateCourse')
          .then(() => {
            this.$store.dispatch('fetchCourseList')
            this.$emit('changedCategory')
          })
          .catch(err => console.error(err))
      }
    }
  }
}
</script>