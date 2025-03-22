import eventRequest from '../../utils/eventRequest.js'

// 通过待审核的赛事
export const approvePendingEvent = (event_id) => {
    const url = '';
    const data = {
        event_id: event_id // 赛事id
    }
    return eventRequest.post(url, data);
}