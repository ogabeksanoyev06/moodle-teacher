import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/teacher",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/site/home/index.vue"),
      },
      {
        path: "subject/topics",
        name: "subject-title",
        component: () =>
          import(
            "@/views/site/teacher/subject-store/subject-title.vue"
          ),
      },
      {
        path: "subject/resource",
        name: "subject-resource",
        component: () =>
          import("../views/site/teacher/subject-store/subject-resource.vue"),
      },
      {
        path: "subject/resource/add",
        name: "subject-resource-add",
        component: () =>
          import(
            "../views/site/teacher/subject-store/subject-resource-add.vue"
          ),
      },
      {
        path: "subject/resource/catalog",
        name: "subject-resource-catalog",
        component: () =>
          import("../views/site/teacher/subject-store/subject-resource-catalog.vue"),
      },
      {
        path: "subject/tasks",
        name: "subject-mission",
        component: () =>
          import(
            "../views/site/teacher/subject-store/subject-mission.vue"
          ),
      },
      // curriculum
      {
        path: "subject/course/task",
        name: "subject-course-mission",
        component: () =>
          import(
            "../views/site/teacher/subject-store/subject-course-mission.vue"
          ),
      },
      {
        path: "teacher/calendar/plan",
        name: "subject-calendar-plan",
        component: () =>
          import(
            "../views/site/teacher/subject-store/subject-calendar-plan.vue"
          ),
      },
      {
        path: "curriculum/curriculum-list",
        name: "curriculum-curriculum-list",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-curriculum-list.vue"
          ),
      },
      {
        path: "curriculum/semester",
        name: "curriculum-semester",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-semester.vue"
          ),
      },
      {
        path: "curriculum/curriculum-block",
        name: "curriculum-curriculum-block",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-curriculum-block.vue"
          ),
      },
      {
        path: "curriculum/student-register",
        name: "curriculum-student-register",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-student-register.vue"
          ),
      },
      {
        path: "curriculum/schedule-info",
        name: "curriculum-schedule-info",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-schedule-info.vue"
          ),
      },
      {
        path: "curriculum/schedule-info-view",
        name: "curriculum-schedule-info-view",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-schedule-info-view.vue"
          ),
      },
      {
        path: "curriculum/exam-schedule-info",
        name: "curriculum-exam-schedule-info",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-exam-schedule-info.vue"
          ),
      },
      {
        path: "curriculum/exam-schedule-info-view",
        name: "curriculum-exam-schedule-info-view",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-exam-schedule-info-view.vue"
          ),
      },
      {
        path: "curriculum/marking-system",
        name: "curriculum-marking-system",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-marking-system.vue"
          ),
      },
      {
        path: "curriculum/grade-type",
        name: "curriculum-grade-type",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-grade-type.vue"
          ),
      },
      {
        path: "curriculum/rating-grade",
        name: "curriculum-rating-grade",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-rating-grade.vue"
          ),
      },
      {
        path: "curriculum/lesson-pair",
        name: "curriculum-lesson-pair",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-lesson-pair.vue"
          ),
      },
      {
        path: "curriculum/lesson-pair",
        name: "curriculum-lesson-pair",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-lesson-pair.vue"
          ),
      },
      {
        path: "curriculum/curriculum-edit",
        name: "curriculum-curriculum-edit",
        component: () =>
          import(
            "../views/site/super-admin/curriculum/curriculum-curriculum-edit.vue"
          ),
      },

      // transfer
      {
        path: "transfer/subject-register",
        name: "transfer-subject-register",
        component: () =>
          import(
            "../views/site/super-admin/transfer/transfer-subject-register.vue"
          ),
      },
      // hemis-struktura
      {
        path: "hemis-baza",
        name: "hemis-baza",
        component: () => import("../views/site/super-admin/hemis/index.vue"),
      },
      {
        path: "curriculum-hemis",
        name: "curriculum-hemis",
        component: () =>
          import("../views/site/super-admin/hemis/curriculum-hemis.vue"),
      },
      // dashboadr
      {
        path: "dashboard/profile",
        name: "dashboard-profile",
        component: () => import("../views/cabinet/profile.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
