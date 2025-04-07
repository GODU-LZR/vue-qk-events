import eventRequest from '../../utils/eventRequest.js'

// 添加赛事到赛程中
export const updateWinner = (schedule_id, newChampion) => {
    const url = '';
    const data = {
        schedule_id: schedule_id,
        newChampion: newChampion
    }
    return eventRequest.post(url, data);
}