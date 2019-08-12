import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/index',
      name: '主页',
      component: () => import('./views/index')
    },
	 {
	  path: '/audioDetail',
	  name: '音频详情',
	  component: () => import('./views/audioDetail')
	},
	 {
	  path: '/videoDetail',
	  name: '视频详情',
	  component: () => import('./views/videoDetail')
	},
	 {
	  path: '/acitonDetail',
	  name: '活动详情',
	  component: () => import('./views/acitonDetail')
	}
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to)
  document.title = to.name
  next();
})

export default router
