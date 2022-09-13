<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章--等待加载中 -->
    <!-- <van-loading color="#1989fa">文章加载ing...</van-loading> -->

    <div>
      <!-- 文章信息区域 -->
      <div class="article-container">
        <!-- 文章标题 -->
        <h1 class="art-title">{{artObj.title}}</h1>

        <!-- 用户信息 -->
        <van-cell center :title="artObj.aut_name" :label="formateTime(artObj.pubdate)">
          <template #icon>
            <img :src="artObj.aut_photo" class="avatar" />
          </template>
          <template #default>
            <div>
              <van-button type="info" size="mini" v-if="artObj.is_followed" @click="followAut(true)">已关注</van-button>
              <van-button icon="plus" type="info" size="mini" plain v-else @click="followAut(false)">关注</van-button>
            </div>
          </template>
        </van-cell>

        <!-- 分割线 -->
        <van-divider></van-divider>

        <!-- 文章内容 -->
        <div class="art-content" v-html="artObj.content"></div>

        <!-- 分割线 -->
        <van-divider>End</van-divider>

        <!-- 点赞(文章) -->
        <!-- attitude:  -1: 无态度，0-不喜欢，1-点赞 -->
        <div class="like-box">
          <van-button icon="good-job" type="danger" size="small" v-if="artObj.attitude === 1" @click="LikeArt(true)">已点赞</van-button>
          <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="LikeArt(false)">点赞</van-button>
        </div>
      </div>

      <!-- 文章评论部分 -->
      <div></div>
    </div>
  </div>
</template>

<script>
import {reqDetail , reqFollow , reqUnFollow , reqLikeArt , reqDisLikeArt} from '@/api'
import { timeAgo } from "@/utils/date.js";
export default {
  name: "Detail",
  data() {
    return {
      artObj: {} // 文章对象
    };
  },
  methods:{
    formateTime:timeAgo,
    // 关注/取关作者
    async followAut(status) {
      // 如果用户点击已关注按钮 则取消关注 显示关注按钮
      if(status == true) {
        this.artObj.is_followed = false
        let res  = await reqUnFollow({
          id:this.artObj.aut_id
        })
        console.log(res);
        // 如果用户点击关注按钮 则关注 显示已关注按钮
      }else{
        this.artObj.is_followed = true
        let res  = await reqFollow({
          id:this.artObj.aut_id
        })
        console.log(res);
      }
    },
    // 点赞/取消点赞
    async LikeArt(status) {
      // 如果已经点赞 则调用取消点赞接口 显示取消点赞 点击之后显示点赞按钮
      // attitude
      if(status == true) {
        this.artObj.attitude = 0
        await reqDisLikeArt({
          id:this.artObj.art_id
        })
      }else{
        this.artObj.attitude = 1
        await reqLikeArt({
          id:this.artObj.art_id
        })
      }
    }
  },
  async mounted() {
    let res =  await reqDetail({
      id:this.$route.params.id
    })
    this.artObj = res.data
  }
};
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}

// 加载中居中样式
.van-loading {
  text-align: center;
  padding-top: 46px;
}
</style>
