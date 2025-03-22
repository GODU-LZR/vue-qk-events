import eventRequest from '../../utils/eventRequest.js'

// 否决待审核、撤销已通过的赛事
export const rejectAndCancelEvent = (event_id, reject_opinion) => {
    const url = '';
    const data = {
        event_id: event_id, // 赛事id
        reject_opinion: reject_opinion // 否决原因
    }
    return eventRequest.post(url, data);
}