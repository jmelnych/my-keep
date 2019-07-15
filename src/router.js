import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import TaskItemEdit from './components/TaskItemEdit.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: TaskItemEdit,
    },
  ],
});
