import eventRequest from '../../utils/eventRequest.js'

// 获取用户预约的场地
export const getVenueName = (page) => {
    const url = '';
    const data = {
        page: page
    }
    return eventRequest.post(url, data);
}