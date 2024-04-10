<!--
Filename: course-hedgedoc-share.vue
Use: Send out notifications for hedgedoc pads
Author: pj
-->

<template>
  <div class="row mt-3">
    <div class="col">
      <b-button
        size="sm"
        class="w-50"
        variant="warning"
        :class="langIsAr? 'float-left' : 'float-right'"
        @click="$bvModal.show('author-share-hedgedoc-course')"
      >
        <i class="fas fa-exclamation-circle"></i> {{ y18n('collaboration.hedgedoc.notify') }}
      </b-button>
    </div>

    <div class="col text-dark">
      {{ y18n('collaboration.hedgedoc.notify') }}
    </div>

    <b-modal
      id="author-share-hedgedoc-course"
      :title="y18n('collaboration.hedgedoc.notify')"
      header-bg-variant="warning"
      ok-variant="success"
      cancel-variant="primary"
      :ok-title="y18n('save')"
      :cancel-title="y18n('cancel')"
      centered
      static
      :aria-label="y18n('popupwarning')"
      @ok="publishNotification"
    >
      <form>
        <p>
          {{ y18n('collaboration.hedgedoc.notify') }}
          <input
            v-model="shareDoc"
            type="text"
            class="form-control"
            :class="{ 'border-danger': !renameOk }"
            :placeholder="y18n('collaboration.hedgedoc.hyperlink')"
            :aria-label="y18n('collaboration.hedgedoc.hyperlink')"
            @keyup.enter="handleOk"
          >
        </p>
      </form>
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
import axios from 'axios'

export default {
  name: 'CourseHedgedocShare',

  mixins: [
    locale
  ],

  data () {
    return {
      shareDoc: ''
    }
  },

  computed: {
    ...mapGetters(['course'])
  },

  methods: {
    /**
     * Function publishNotification: send out notifications to all users
     * Author: pj
     */
    publishNotification (e) {
      e.preventDefault()
      console.log(this.course.courseId)
      const docId = this.shareDoc
      axios.get('/enrollments/getAllByCourseId', {
        params: {
          courseId: this.course.courseId
        }
      }).then(function (response) {
        const users = JSON.parse(JSON.stringify(response.data))
        for (let i = 0; i < users['subs'].length; i++) {
          const user = users['subs'][i].studentId
          const body = `{
          "userId": ` + user + `,
          "type": "hedgedoc",
          "data": {
            "courseId": "` + 'localhost' + ':' + 3000 + '/' + docId + `"
          }
      }`
          axios.post('/notifications', body).then(function (response) {
            console.log(response)
          })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
        .catch(function (error) {
          console.log(error)
        })
      this.$nextTick(() => {
        this.$bvModal.hide('author-share-hedgedoc-course')
      })
    }
  }
}
</script>
