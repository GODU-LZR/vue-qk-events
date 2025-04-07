import eventRequest from '../../utils/eventRequest.js'

// 根据id获取赛程
export const getScheduleById = (schedule_id) => {
    const url = '';

    const data = {
        schedule_id: schedule_id
    }
    return eventRequest.post(url, data);
}