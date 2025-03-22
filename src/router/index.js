// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue' // 示例
import GetEvent from '../views/GetEvent.vue'
import AddEvent from '../views/AddEvent.vue'
import MyEvent from '../views/MyEvent.vue'
import FollowEvent from '../views/FollowEvent.vue'
import GetReferee from '../views/GetReferee.vue'
import AuditEvent from '../views/AuditEvent.vue'

Vue.use(Router)

const routes = [
  {path: '/', component: GetEvent},
  {path: '/GetEvent', component: GetEvent},
  {path: '/AddEvent', component: AddEvent},
  {path: '/MyEvent', component: MyEvent},
  {path: '/FollowEvent', component: FollowEvent},
  {path: '/GetReferee', component: GetReferee},
  {path: '/AuditEvent', component: AuditEvent}
]

const router = new Router({
  mode: 'history',
  // 若在 qiankun 环境下，设置 base 为 /events
  base: window.__POWERED_BY_QIANKUN__ ? '/events' : '/',
  routes
})

export default router
