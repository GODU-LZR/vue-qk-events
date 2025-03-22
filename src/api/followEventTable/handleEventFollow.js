import eventRequest from '../../utils/eventRequest.js'

// 关注或取消关注赛事
export const handleEventFollow = (event_id) => {
    const url = '';
    const data = {
        event_id: ''
    }
    return eventRequest.post(url, data);
}