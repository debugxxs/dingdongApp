import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import loginsetwind from '../components/SetWind.vue'
import modifypass from '../components/modifypass.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/setwind',
      name:'setwind',
      component:loginsetwind
    },
    {
      path:'/modifypass',
      name:'modifypass',
      component:modifypass
    }
  ]
})
