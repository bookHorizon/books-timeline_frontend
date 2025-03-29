import { createRouter, createWebHistory } from 'vue-router'
import { globalStore } from '@/stores/globalStore';
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        isDefaultLayout:true,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta:{
        isDefaultLayout:true,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/404.vue'),
      meta:{
        isDefaultLayout:false,
      }
    },
  ]
})

router.beforeEach((to,from)=>{
  const global = globalStore()
  function webTitle(item){
    return item==='中文'?'書海藍圖':'Book Horizon'
  }

  document.title = webTitle(global.languageLabel)
  
  global.$subscribe((mutation,state)=>{      
    document.title = webTitle(state.languageLabel)
  })
})

// router.beforeEach((to,from)=>{
//   const global = globalStore()  
//   document.title = global.languageLabel==='中文'?'書海藍圖':'Book Horizon'
//   global.$subscribe((mutation,state)=>{      
//     document.title = state.languageLabel==='中文'?'書海藍圖':'Book Horizon'
//   })
// })



export default router
