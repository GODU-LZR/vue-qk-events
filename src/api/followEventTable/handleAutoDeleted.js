import eventRequest from '../../utils/eventRequest.js'

// 同意开启或取消自动取关已结束、已撤销的赛事
export const handleAutoDeleted = () => {
    const url = '';
    return eventRequest.post(url);
}