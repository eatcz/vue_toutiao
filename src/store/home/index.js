import {reqChannels} from '@/api'

const state = {
    channels:[]
};
const mutations = {
    GETCHANNELS(state , channels) {
        state.channels = channels
    }
};
const actions = {
    async getChannels({commit}) {
        try {
            let res = await reqChannels()
            commit('GETCHANNELS' , res.data.channels)
        } catch (error) {
            console.err('数据请求失败');
        }
        
    }
};
const getters = {};

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}