import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // evenTable表格数据
    eventTableData: [{
      event_id: 123456,
      schedule_id: 1,
      event_sport: '篮球',
      venue_name: '篮球场1号',
      referee_name: '张三、李四、王五',
      start_time: '2025-01-01 12:00',
      end_time: '2025-01-01 13:00',
      responsible_person: '张三',
      phone: 12345678,
      note: '备注备注备注备注备注备注备注备注备注备注',
      review_status: 1,
      is_followed: 1, // 1表示关注,0表示未关注
      participants: [
        {
          teamName: '软件1223',
          team_score: 90,
          players: [{name: '张三', person_score: '40'}, {name: '李四', person_score: '30'}, {name: '王五', person_score: '20'}]
        },
        {
          teamName: '软件1224',
          team_score: 80,
          players: [{name: '赵大', person_score: '20'}, {name: '刘二', person_score: '30'}, {name: '齐六', person_score: '40'}]
        }
      ]
    }, {
      event_id: 123457,
      schedule_id: null,
      event_sport: '足球',
      venue_name: '足球场1号',
      referee_name: '张三、李四、王五',
      start_time: '2025-01-01 12:00',
      end_time: '2025-01-01 13:00',
      responsible_person: '李四',
      phone: 12345678,
      note: '备注备注备注备注备注备注备注备注备注备注',
      review_status: 1,
      is_followed: 0,
      participants: [
        {
          teamName: '土木1223',
          team_score: 90,
          players: [{name: '张三', person_score: '40'}, {name: '李四', person_score: '30'}, {name: '王五', person_score: '20'}]
        },
        {
          teamName: '土木1224',
          team_score: 80,
          players: [{name: '赵大', person_score: '20'}, {name: '刘二', person_score: '30'}, {name: '齐六', person_score: '40'}]
        }
      ]
    }],

    myEventTableData: [{
      event_id: 123456,
      schedule_id: 1,
      event_sport: '篮球',
      venue_name: '篮球场1号',
      referee_name: '张三、李四、王五',
      start_time: '2026-01-01 12:00',
      end_time: '2026-01-01 13:00',
      responsible_person: '张三',
      phone: 12345678,
      note: '备注备注备注备注备注备注备注备注备注备注',
      review_status: 1,
      is_followed: 1, // 1表示关注,0表示未关注
      participants: [
        {
          teamName: '软件1223',
          team_score: 90,
          players: [{name: '张三', person_score: '40'}, {name: '李四', person_score: '30'}, {name: '王五', person_score: '20'}]
        },
        {
          teamName: '软件1224',
          team_score: 80,
          players: [{name: '赵大', person_score: '20'}, {name: '刘二', person_score: '30'}, {name: '齐六', person_score: '40'}]
        }
      ]
    }],

    // followEventTable表格数据
    followEventTableData: [{
      event_id: 123456,
      schedule_id: 1,
      event_sport: '篮球',
      venue_name: '篮球场1号',
      referee_name: '张三、李四、王五',
      start_time: '2026-01-01 12:00',
      end_time: '2026-01-01 13:00',
      responsible_person: '张三',
      phone: 12345678,
      note: '备注备注备注备注备注备注备注备注备注备注',
      review_status: 1,
      is_followed: 1, // 1表示关注,0表示未关注
      participants: [
        {
          teamName: '软件1223',
          team_score: 90,
          players: [{name: '张三', person_score: '40'}, {name: '李四', person_score: '30'}, {name: '王五', person_score: '20'}]
        },
        {
          teamName: '软件1224',
          team_score: 80,
          players: [{name: '赵大', person_score: '20'}, {name: '刘二', person_score: '30'}, {name: '齐六', person_score: '40'}]
        }
      ]
    },{
      event_id: 123456,
      schedule_id: 1,
      event_sport: '篮球',
      venue_name: '篮球场1号',
      start_time: '2026-01-01 12:00',
      end_time: '2026-01-01 13:00',
      responsible_person: '张三',
      phone: 12345678,
      note: '备注备注备注备注备注备注备注备注备注备注',
      review_status: 1,
      is_followed: 1, // 1表示关注,0表示未关注
      participants: [
        {
          teamName: '软件1223',
          team_score: 90,
          players: [{name: '张三', person_score: '40'}, {name: '李四', person_score: '30'}, {name: '王五', person_score: '20'}]
        },
        {
          teamName: '软件1224',
          team_score: 80,
          players: [{name: '赵大', person_score: '20'}, {name: '刘二', person_score: '30'}, {name: '齐六', person_score: '40'}]
        }
      ]
    }],

    // auditTable表格数据
    auditEventTableData: [{
      event_id: 123456,
      schedule_id: 1,
      event_sport: '篮球',
      venue_name: '篮球场1号',
      referee_name: '张三、李四、王五',
      start_time: '2026-01-01 12:00',
      end_time: '2026-01-01 13:00',
      responsible_person: '张三',
      phone: 12345678,
      note: '备注备注备注备注备注备注备注备注备注备注',
      review_status: 0,
      opinion: '',
      participants: [
        {
          teamName: '软件1223',
          team_score: 90,
          players: [{name: '张三', person_score: '40'}, {name: '李四', person_score: '30'}, {name: '王五', person_score: '20'}]
        },
        {
          teamName: '软件1224',
          team_score: 80,
          players: [{name: '赵大', person_score: '20'}, {name: '刘二', person_score: '30'}, {name: '齐六', person_score: '40'}]
        }
      ]
    },{
      event_id: 123456,
      schedule_id: 1,
      event_sport: '篮球',
      venue_name: '篮球场1号',
      referee_name: '张三、李四、王五',
      start_time: '2026-01-01 12:00',
      end_time: '2026-01-01 13:00',
      responsible_person: '张三',
      phone: 12345678,
      note: '备注备注备注备注备注备注备注备注备注备注',
      review_status: 2,
      opinion: '这是否决原因',
      participants: [
        {
          teamName: '软件1223',
          team_score: 90,
          players: [{name: '张三', person_score: '40'}, {name: '李四', person_score: '30'}, {name: '王五', person_score: '20'}]
        }
      ]
    }],

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

    // myVenueTable我的赛事数据
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

    // 统计状态数据
    statData: {
      totalEventCount: 4154,
      monthEventCount: 1314,
      todayEventCount: 1000,
      todayWaitEventCount: 500
    },

    // myEventList数据:添加赛事到赛程的可用我的赛事
    myEventListData: [
      {
        event_id: 123456,
        scheduled_id: 123,
        event_sport: '篮球',
        start_time: '2026-01-01 12:00',
        end_time: '2026-01-01 13:00',
        participants: [
          {
            teamName: '软件1223',
            players: [
              {name: '张三'},
              {name: '李四'},
              {name: '王五'}
            ]
          },
          {
            teamName: '软件1224',
            players: [
              {name: '赵大'},
              {name: '刘二'},
              {name: '齐六'}
            ]
          }
        ]
      },
      {
        event_id: 123457,
        scheduled_id: 123,
        event_sport: '足球',
        start_time: '2026-01-02 15:00',
        end_time: '2026-01-02 16:30',
        participants: [
          {
            teamName: '网络1221',
            players: [
              {name: '孙七'},
              {name: '周八'}
            ]
          },
          {
            teamName: '网络1222',
            players: [
              {name: '吴九'},
              {name: '郑十'}
            ]
          }
        ]
      },
      {
        event_id: 123456,
        scheduled_id: 123,
        event_sport: '篮球',
        start_time: '2026-01-01 12:00',
        end_time: '2026-01-01 13:00',
        participants: [
          {
            teamName: '软件1223',
            players: [
              {name: '张三'},
              {name: '李四'},
              {name: '王五'}
            ]
          },
          {
            teamName: '软件1224',
            players: [
              {name: '赵大'},
              {name: '刘二'},
              {name: '齐六'}
            ]
          }
        ]
      }
    ],

    // 我的赛程队伍数据
    myScheduleTreeData: {
      schedule_id: 123456789,
      winner: '软件1223',
      schedule: [[{event_id: 123456, team1: '软件1223', team2: '软件1224', winner: '软件1223', team1_score: 16, team2_score: 8},
       {event_id: 123456, team1: '土木1223', team2: '土木1224', winner: '土木1224', team1_score: 4, team2_score: 9},
       {event_id: 123456, team1: '能源1223', team2: '能源1224', winner: '能源1223', time: "2023-07-15 15:00"},
       {event_id: 123456, team1: '计网1223'}],

      [{event_id: 123456, team1: '软件1223', team2: '软件1224', winner: '软件1223', team1_score: 16, team2_score: 8},
       {event_id: 123456, team1: '土木1223', team2: '土木1224', winner: '土木1224', team1_score: 4, team2_score: 9},
       {event_id: 123456, team1: '能源1223', team2: '能源1224', winner: '能源1223', time: "2023-07-15 15:00"},
       {event_id: 123456, team1: '计网1223'}],

      [{event_id: 123456, team1: '软件1223', team2: '软件1224', winner: '软件1224'},
       {event_id: 123456, team1: '土木1223', team2: '土木1224', winner: '土木1223'}],

      [{event_id: 123456, team1: '软件1223', team2: '软件1224', winner: '软件1223'}]
    ]}
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
    },
    updateMyEventListDataByReset(state, n) {
      state.myEventListData = n;
    },
    updateMyEventListDataByAdd(state, n) {
      state.myEventListData.push(...n);
    },
    updateMyScheduleTreeData(state, n) {
      state.myScheduleTreeData = n;
    },

  },
  actions: {
  },
  modules: {
  }
})
