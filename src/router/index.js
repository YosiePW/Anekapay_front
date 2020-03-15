import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import IndexAdmin from '../views/IndexAdmin.vue'
import FooterAdmin from '../views/layouts/FooterAdmin.vue'
import Sidebar from '../views/layouts/Sidebar.vue'
import NavbarAdmin from '../views/layouts/NavbarAdmin.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    components: {default: Register}
  },
  {
    path: '/login',
    name: 'login',
    components: {default: Login}
  },
  {
    path: '/',
    name: 'home',
    components: {default: Home}
  },
  {
    path: '/admin',
    name: 'admin',
    components: {default: IndexAdmin, header: NavbarAdmin, sidebar: Sidebar, footer: FooterAdmin},
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
