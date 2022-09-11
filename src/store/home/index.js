import {reqUserChannels , reqAllChannels} from '@/api'

const state = {
    Userchannels:[],
    AllChannels:[]
};
const mutations = {
    GETUSERCHANNELS(state , Userchannels) {
        state.Userchannels = Userchannels
    },
    GETALLCHANNELS(state , AllChannels) {
        state.AllChannels = AllChannels
    }
};
const actions = {
    async getUserChannels({commit}) {
        try {
            let res = await reqUserChannels()
            commit('GETUSERCHANNELS' , res.data.channels)
        } catch (error) {
            console.err('数据请求失败');
        }
        
    },
    async getAllChannels({commit}) {
        try {
            let res = await reqAllChannels()
            commit('GETALLCHANNELS' , res.data.channels)
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