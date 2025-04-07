import eventRequest from '../../utils/eventRequest.js'

// 添加赛事到赛程中
export const deleteEventToSchedule = (event_id, schedule_id) => {
    const url = '';
    const data = {
        event_id: event_id,
        schedule_id: schedule_id
    }
    return eventRequest.post(url, data);
}