import eventRequest from '../../utils/eventRequest.js'

// 撤销待审核、已通过的赛事
export const rescindEvent = (event_id) => {
    const url = '';
    const data = {
        event_id: event_id, // 赛事id
    }
    return eventRequest.post(url, data);
}