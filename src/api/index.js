import requests from "./request";
// 登录
export const reqLogin = ({ mobile , code }) => requests({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
        mobile,
        code
    }
}) 
// 获取所有频道
export const reqAllChannels = () =>requests({url:'/v1_0/channels' , method:'GET'})

// 用户频道获取
export const reqUserChannels = () =>requests({url:'/v1_0/user/channels' , method:'get'})

// 添加频道
export const addChannel = ({channels}) =>requests({
    url:'/v1_0/user/channels',
    method:'PUT',
    data:{
        channels:channels
    }
})

// 列表数据
export const reqArticles = ({channel_id , timestamp}) =>requests({
    url:'/v1_0/articles',
    method:'GET',
    params:{
        channel_id,
        timestamp
    }
})

// 不感兴趣
export const reqDislikes = (id) =>requests({
    url:'/v1_0/article/dislikes',
    method:'POST',
    data:{
        target:id
    }
})

// 文章举报
export const reqReports = ({target , type}) =>requests({
    url:'/v1_0/article/reports',
    method:'POST',
    data:{
        target:target,
        type:type,
        remark:'test'
    }
})

// 联想搜索
export const reqSearchSuggest = ({q}) =>requests({
    url:' /v1_0/suggestion',
    method:'GET',
    params:{
        q:q
    }
})

// 获取搜索结果
export const reqResult =  ({page = 1 , per_page = 10 , q}) =>requests({
    url:'/v1_0/search',
    method:'GET',
    params:{
        page,
        per_page,
        q
    }
})

// 获取文章详情
export const reqDetail = ({id}) =>requests({
    url:`/v1_0/articles/${id}`,
    method:'GET'
})

// 关注用户
export const reqFollow = ({id}) =>requests({
    url:`/v1_0/user/followings/${id}`,
    method:'POST'
})

//取关用户
export const reqUnFollow = ({id}) =>requests({
    url:` /v1_0/user/followings/${id}`,
    method:'DELETE'
})

// 对文章点赞
export const reqLikeArt = ({id}) =>requests({
    url:`/v1_0/article/likings/${id}`,
    method:'POST'
})

// 取消对文章点赞
export const reqDisLikeArt = ({id}) =>requests({
    url:` /v1_0/article/likings/${id}`,
    method:'DELETE'
})