import Vue from 'vue'
import VueRouter from '../plugins/router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/main', component: Main },
    { path: '/about', component: About },
  ],
})
