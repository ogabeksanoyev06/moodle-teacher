import Vue from "vue";
import VueRouter from "vue-router";
import TokenService from "@/service/TokenService";

Vue.use(VueRouter);

const routes = [
  {
    path: "/landing-page",
    name: "landing-page",
    component: () => import("../components/landing-page/index.vue"),
  },
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [

      {
        path: '/',
        name: 'list-subject',
        component:()=>import(
            "@/views/site/teacher/subject-store/list-subject.vue"
            )
      },
      {
        path: 'list/subject/view/:id/:nextId',
        name: 'list-view',
        component:()=>import(
            "@/views/site/teacher/subject-store/list-subject-view.vue"
            ),
        props:true
      },
      {
        path: 'list/subject/add/:id',
        name: 'list-add',
        component:()=>import(
            "@/views/site/teacher/subject-store/list-subject-add.vue"
            ),
        props: true
      },
      {
        path: 'list/subject/task/view/:id',
        name: 'task-view',
        component:()=>import(
            "@/views/site/teacher/subject-store/task-view.vue"
            ),
        props: true
      }, {
        path: 'list/subject/task/view/:id',
        name: 'task-view-for-result',
        component:()=>import(
            "@/views/site/teacher/subject-store/task-view-for-result.vue"
            ),
        props: true
      },
      {
        path: 'list/subject/task/group-add/:topic_id',
        name: 'task-add-group',
        component:()=>import(
            "@/views/site/teacher/subject-store/task-add-group.vue"
            ),
        props: true
      },
      {
        path: 'list/subject/task/student-add/:topic_id',
        name: 'task-add-student',
        component:()=>import(
            "@/views/site/teacher/subject-store/task-add-student.vue"
            ),
        props: true
      },
        {
        path: 'list/subject/task/view/student/:task_id',
        name: 'task-view-for-result-student',
        component:()=>import(
            "@/views/site/teacher/subject-store/task-view-for-result-student.vue"
            ),
        props: true
      },
       
  {
        path: 'lessons/:id/:nextId',
        name: 'lessons',
        component:()=>import(
            "@/views/site/teacher/subject-store/lessons.vue"
            ),
        props: true
      },
      {
        path: "teacher/subject/topics",
        name: "subject-title",
        component: () =>
          import(
            "@/views/site/teacher/subject-store/subject-title.vue"
          ),
      },
      {
        path: "teacher/subject/resource",
        name: "subject-resource",
        component: () =>
          import("../views/site/teacher/subject-store/subject-resource.vue"),
      },
      {
        path: "teacher/subject/resource/add",
        name: "subject-resource-add",
        component: () =>
          import(
            "../views/site/teacher/subject-store/subject-resource-add.vue"
          ),
      },
      {
        path: "teacher/subject/resource/catalog",
        name: "subject-resource-catalog",
        component: () =>
          import("../views/site/teacher/subject-store/subject-resource-catalog.vue"),
      },
      {
        path: "teacher/subject/tasks",
        name: "subject-mission",
        component: () =>
          import(
            "../views/site/teacher/subject-store/subject-mission.vue"
          ),
      },
      // curriculum
      {
        path: "teacher/subject/course/task",
        name: "subject-course-mission",
        component: () =>
          import(
            "../views/site/teacher/subject-store/subject-course-mission.vue"
          ),
      },
      {
        path: "teacher/teacher/calendar/plan",
        name: "subject-calendar-plan",
        component: () =>
          import(
            "../views/site/teacher/subject-store/subject-calendar-plan.vue"
          ),
      },
      {
        path: "teacher/exam/list",
        name: "exam-list",
        component: () =>
          import(
            "../views/site/teacher/learning-prosess/exam-list.vue"
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
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

router.beforeEach((to, from, next) => {
  const isLogin = JSON.parse(localStorage.getItem("employeeInfo"));
  let hasToken = !!TokenService.getToken();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLogin&&!hasToken) {
      next("/landing-page");
      return;
    }
  }

  if (to.matched.some((record) => record.meta.guestOnly)) {
    if (isLogin&&hasToken) {
      next("/");
      return;
    }
  }

  next();
});

export default router;
