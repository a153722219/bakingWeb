import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/index',
      name: '主页',
      component: () => import('./views/index')
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to)
  document.title = to.name
  next();
})

export default router
