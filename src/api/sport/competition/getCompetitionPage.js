import eventRequest from '../../../utils/eventRequest.js'

// 获取赛事列表
export const getCompetitionPage = (sportId) => {
    const url = '';
    const data = {
        sportId: sportId,
    }
    // return new Promise(resolve => {
    //     setTimeout(() => {
    //     resolve(301);
    //     }, 3000); // 模拟一个小的网络延迟
    // });
    return eventRequest.post(url, data);
}