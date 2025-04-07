import eventRequest from '../../utils/eventRequest.js'

// 添加赛事到赛程中
export const addEventToSchedule = (event_id, schedule_id, round_index) => {
    const url = '';
    const data = {
        event_id: event_id,
        schedule_id: schedule_id,
        round_index: round_index
    }
    return eventRequest.post(url, data);
}