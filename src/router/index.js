import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import IndexAdmin from '../views/IndexAdmin.vue'
import UserProfil from '../views/UserProfil.vue'
import Pelanggan from '../views/Pelanggan.vue'
import FooterAdmin from '../views/layouts/FooterAdmin.vue'
import Sidebar from '../views/layouts/Sidebar.vue'
import NavbarAdmin from '../views/layouts/NavbarAdmin.vue'
import Tarif from '../views/Tarif.vue'
import User from '../views/User.vue'




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
    components: {default: IndexAdmin}
  },
  {
    path: '/pelanggan',
    name: 'pelanggan',
    components: {default: Pelanggan}
  },
  {
    path: '/acount',
    name: 'acount',
    components: {default: UserProfil, header: NavbarAdmin, sidebar: Sidebar, footer: FooterAdmin},
  },
  {
    path: '/user',
    name: 'user',
    components: {default: User},
  },
  {
    path: '/tarif',
    name: 'tarif',
    components: {default: Tarif},
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
