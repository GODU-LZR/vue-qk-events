import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // evenTable表格数据
    eventTableData: [{
      event_id: 123456,
      event_sport: '篮球',
      participants: '软件1223、软件1224',
      venue_name: '篮球场1号',
      start_time: '2025-01-01 12:00',
      end_time: '2025-01-01 13:00',
      responsible_person: '张三',
      note: '备注备注备注备注备注备注备注备注备注备注',
      review_status: 1,
      is_followed: 1 // 1表示关注,0表示未关注
    }, {
      event_id: 123457,
      event_sport: '足球',
      participants: '土木1223、土木1224',
      venue_name: '足球场1号',
      start_time: '2025-01-01 12:00',
      end_time: '2025-01-01 13:00',
      responsible_person: '李四',
      note: '备注备注备注备注备注备注备注备注备注备注',
      review_status: 1,
      is_followed: 0
    }],

    myEventTableData: [{
      event_id: 123457,
      event_sport: '足球',
      participants: '土木1223、土木1224',
      venue_name: '足球场1号',
      start_time: '2026-01-01 12:00',
      end_time: '2026-01-01 13:00',
      responsible_person: '李四',
      note: '备注备注备注备注备注备注备注备注备注备注',
    }],

    // followEventTable表格数据
    followEventTableData: [{
      event_id: 123456,
      event_sport: '篮球',
      participants: '软件1223、软件1224',
      venue_name: '篮球场1号',
      start_time: '2025-01-01 12:00',
      end_time: '2025-01-01 13:00',
      responsible_person: '张三',
      note: '备注备注备注备注备注备注备注备注备注备注',
      review_status: 1,
    }],

    // auditTable表格数据
    auditEventTableData: [{
      event_id: 123456,
      event_sport: '篮球',
      participants: '软件1223、软件1224',
      venue_name: '篮球场1号',
      start_time: '2025-04-04 12:00',
      end_time: '2025-04-04 13:00',
      responsible_person: '张三',
      note: '备注备注备注备注备注备注备注备注备注备注',
      opinion: '我看不顺眼',
      review_status: 2,
    }, {
      event_id: 123456,
      event_sport: '篮球',
      participants: '软件1223、软件1224',
      venue_name: '篮球场1号',
      start_time: '2025-05-01 12:00',
      end_time: '2025-05-01 13:00',
      responsible_person: '张三',
      note: '备注备注备注备注备注备注备注备注备注备注',
      opinion: '',
      review_status: 0}
    ],

    // refereeUL列表数据
    refereeULData: [{
      referee_id: 10000,
      picture_url: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      referee_name: '张三',
      phone: '123456789',
      specialties: "篮球、 足球、 羽毛球",
      honours: ['国家一级运动员', '国家二级教练'],
      likes: 100
    }, {
      referee_id: 10001,
      picture_url: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      referee_name: '李四',
      phone: '987654321',
      specialties: "乒乓球、 排球",
      honours: ['国家二级运动员', '国家一级教练', '月最佳员工'],
      likes: 428
    }, {
      referee_id: 10001,
      picture_url: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      referee_name: '李四',
      phone: '987654321',
      specialties: "乒乓球、 排球",
      honours: ['国家二级运动员', '国家一级教练', '月最佳员工'],
      likes: 428
    }],

    myVenueTableData: [
      {
        venue_id: 123456,
        venue_name: '篮球场1号',
        start_time: '2019-01-03 11:00:00',
        end_time: '2019-01-03 11:00:00'
      }, {
        venue_id: 123457,
        venue_name: '篮球场2号',
        start_time: '2019-01-02 11:00:00',
        end_time: '2019-01-02 11:00:00'
      }],

    statData: {
      totalEventCount: 4154,
      monthEventCount: 1314,
      todayEventCount: 1000,
      todayWaitEventCount: 500
    }
  },
  getters: {
  },
  mutations: {
    updateEventTableData(state, n) {
      state.eventTableData = n;
    },
    updateMyEventTableData(state, n) {
      state.myEventTableData = n;
    },
    updateFollowEventTableData(state, n) {
      state.followEventTableData = n;
    },
    updateAuditEventTableData(state, n) {
      state.auditEventTableData = n;
    },
    updateRefereeULDataByReset(state, n) {
      state.refereeULData = n;
    },
    updateRefereeULDataByAdd(state, n) {
      state.refereeULData.push(...n);
    },
    updateStatData(state, n) {
      state.statData = n;
    },
    updateMyVenueTableData(state, n) {
      state.myVenueTableData = n;
    }
  },
  actions: {
  },
  modules: {
  }
})
