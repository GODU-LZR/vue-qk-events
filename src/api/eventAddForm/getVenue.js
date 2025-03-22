import eventRequest from '../../utils/eventRequest.js'

// 获取用户预约的场地
export const getVenue = () => {
    const url = '';
    return eventRequest.post(url);
}