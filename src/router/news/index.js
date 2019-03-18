export default [
  {
    path: '/news',
    component: () => import(/* nwbpackChunkName: "news" */'@/views/news/index.vue')
  }
]
