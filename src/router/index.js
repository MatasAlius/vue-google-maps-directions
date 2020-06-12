import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home | Vue Google Maps Directions', 
      metaTags: [ 
        { 
          name: 'description',
          content: 'Vue Google Maps Directions by MatasAlius' 
        },
        { 
          property: 'og:description', 
          content: 'Vue Google Maps Directions by MatasAlius' 
        } 
      ] 
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About | Vue Google Maps Directions', 
      metaTags: [ 
        { 
          name: 'description',
          content: 'Vue Google Maps Directions by MatasAlius' 
        },
        { 
          property: 'og:description', 
          content: 'Vue Google Maps Directions by MatasAlius' 
        } 
      ] 
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});

export default router
