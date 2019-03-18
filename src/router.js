import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

let commonRoute = []
const routerContext = require.context('./router', true, /index\.js$/)
routerContext.keys().forEach(route => {
  const routerModule = routerContext(route)
  commonRoute = [...commonRoute, ...(routerModule.default || routerModule)]
})

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }, ...commonRoute]
})
