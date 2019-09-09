import Vue from "vue";
import Router from "vue-router";
/* views */
import * as views from "./views";
Vue.use(Router);
export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/test",
      name: "test-view",
      component: views.test
    },
    {
      path: "/",
      name: "root-view",
      component: views.root
    },
    {
      path: "/register",
      name: "register-view",
      component: views.register
    },
    {
      path: "/login",
      name: "login-view",
      component: views.login
    },
    {
      path: "/profile",
      name: "profile-view",
      component: views.profile
    },
    {
      path: "/courses",
      name: "courses-view",
      component: views.courses
    },
    {
      path: "/courses/:name/:step",
      name: "course-detail-view",
      component: views.courseDetail,
      props: true,

      children: [

        {
          path: "edit",
          name: "edit-course-content-view",
          component: views.editCourseContent,
          props: true
        },
        {
          path: "new/:type",
          name: "new-course-content-view",
          component: views.editCourseContent,
          props: true
        },
        {
          path: "editNav",
          name: "edit-course-nav-view",
          component: views.editCourseNav,
        },

        // TODO: review
        {
          path: "new-learning-block",
          name: "new-learning-block",
          component: views.newLearningBlock,
        },
        {
          path: "new-learning-assessment",
          name: "new-learning-assessment",
          component: views.newLearningAssessment,
        },
        {
          path: "new-block",
          name: "new-block",
          component: views.newLearningBlock
        },
        {
          path: "new-assessment",
          name: "new-assessment",
          component: views.newLearningAssessment
        },
        {
          path: "assessment/:type/new",
          name: "assessment-create",
          component: views.assessment
        },
        {
          path: "assessment/:type/:assId",
          name: "assessment-view",
          component: views.assessment
        },
      ]
    },
    /*
    {
      path: "/mycourses",
      name: "mycourses-view",
      component: views.mycourses
    },
    */
    {
      path: "/imprint",
      name: "imprint-view",
      component: views.imprint
    },
    {
      path: "/privacy",
      name: "privacy-view",
      component: views.privacy
    }
  ]
});
