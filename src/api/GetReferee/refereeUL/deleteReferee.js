import eventRequest from '../../../utils/eventRequest.js'

// 删除裁判
export const deleteReferee = (referee_id) => {
    const url = '';
    const data = {
        referee_id: referee_id // 赛事id
    }
    return eventRequest.post(url, data);
}