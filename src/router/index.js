import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/auth/";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    beforeEnter: (to, from, next) => {
      if (auth.getLocalAuthToken()) next("/profil");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Signup-signin.vue")
  },
  {
    path: "/forum",
    name: "Forum",
    beforeEnter: (to, from, next) => {
      if (!auth.getLocalAuthToken()) next("/");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/MainForum.vue")
  },
  {
    path: "/forum/subject/:id",
    name: "Subject",
    beforeEnter: (to, from, next) => {
      if (!auth.getLocalAuthToken()) next("/");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/ForumSubject.vue")
  },
  {
    path: "/feed",
    name: "Feed",
    beforeEnter: (to, from, next) => {
      if (!auth.getLocalAuthToken()) next("/");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/MainFeed.vue")
  },
  {
    path: "/friend-list",
    name: "Friendlist",
    beforeEnter: (to, from, next) => {
      if (!auth.getLocalAuthToken()) next("/");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/MainFriendList.vue")
  },
  {
    path: "/friend-feed/:id",
    name: "FriendFeed",
    beforeEnter: (to, from, next) => {
      if (!auth.getLocalAuthToken()) next("/");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/MainFriendFeed.vue")
  },
  {
    path: "/add-friends/:id",
    name: "AddFriends",
    beforeEnter: (to, from, next) => {
      if (!auth.getLocalAuthToken()) next("/");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/MainAddFriends.vue")
  },
  {
    path: "/profil",
    name: "Profil",
    beforeEnter: (to, from, next) => {
      if (!auth.getLocalAuthToken()) next("/");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/MainProfil.vue")
  },
  {
    path: "/chat",
    name: "Chat",
    beforeEnter: (to, from, next) => {
      if (!auth.getLocalAuthToken()) next("/");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/MainChat.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    beforeEnter: (to, from, next) => {
      if (!auth.getLocalAuthToken()) next("/");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/MainDashboard.vue")
  },
  {
    path: "/dashboard/edit/:id",
    name: "DashboardEdit",
    beforeEnter: (to, from, next) => {
      if (!auth.getLocalAuthToken()) next("/");
      else next();
    },
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/DashEdit.vue")
  },
  {
    path: "/legalMentions",
    name: "LegalMentions",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/LegalMentions.vue")
  },
  {
    path: "*",
    name: "Not Found",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;