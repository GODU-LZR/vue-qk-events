// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue' // 示例

import AddMatch from '../views/MyWorkbench/AddMatch.vue'

import FollowEvent from '../views/FollowEvent.vue'
import GetReferee from '../views/GetReferee.vue'
import AuditEvent from '../views/AuditEvent.vue'

import sport from '../views/sport/sport'
import type from '../views/sport/type'
import competition from '../views/sport/competition'
import game from '../views/sport/game'
import match from '../views/sport/match'

import GetMyMatch from '../views/MyWorkbench/GetMyMatch/GetMyMatch'
import GetMyDetailMatch from '../views/MyWorkbench/GetMyMatch/GetMyDetailMatch'
import GetMyMatchSchedule from '../views/MyWorkbench/GetMyMatch/GetMyMatchSchedule'
import GetMyMatchEvent from '../views/MyWorkbench/GetMyMatch/GetMyMatchEvent'

Vue.use(Router)

const routes = [
  {path: '/', redirect: '/sport'},
  {path: '/sport', component: sport, redirect: '/sport/type',children: [
                                                 {path: 'type', component: type},
                                                 {path: 'competition/:sportId?', component: competition},
                                                 {path: 'game/:gameId?', component: game},
                                                 {path: 'match/:matchId?', component: match}]},
  {path: '/GetReferee', component: GetReferee},
  {path: '/AddMatch', component: AddMatch},

  {path: '/GetMyMatch', component: GetMyMatch,redirect: '/GetMyMatch/GetMyDetailMatch', children: [
                                                     {path: 'GetMyDetailMatch', component: GetMyDetailMatch},
                                                     {path: 'GetMyMatchSchedule', component: GetMyMatchSchedule},
                                                     {path: 'GetMyMatchEvent', component: GetMyMatchEvent}]},

  {path: '/FollowEvent', component: FollowEvent},

  {path: '/AuditEvent', component: AuditEvent},
]

const router = new Router({
  mode: 'history',
  // 若在 qiankun 环境下，设置 base 为 /events
  base: window.__POWERED_BY_QIANKUN__ ? '/events' : '/',
  routes
})

export default router
