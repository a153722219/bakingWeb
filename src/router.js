import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/index',
      name: '音频详情',
      component: () => import('./views/index')
    },
	{
	  path: '/download',
	  name: '下载烘焙',
	  component: () => import('./views/download')
	},
	 {
	  path: '/audioShareDetail',
	  name: '音频详情',
	  component: () => import('./views/audioShareDetail')
	},
	{
	  path: '/videoDetail',
	  name: '视频详情',
	  component: () => import('./views/videoDetail')
	},
	 {
	  path: '/videoShareDetail',
	  name: '视频详情',
	  component: () => import('./views/videoShareDetail')
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
