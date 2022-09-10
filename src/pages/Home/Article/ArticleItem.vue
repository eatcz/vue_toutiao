<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list v-model="loading" :immediate-check="false" :finished="finished" offset="50" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in article" :key="item.art_id">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="title">
            <span>{{item.title}}</span>
            <img class="thumb" v-if="item.cover.type === 1" :src="item.cover.images" alt />
          </div>
          <div class="thumb-box" v-if="item.cover.type > 1">
            <img class="thumb" :src="img" v-for="(img , index) in item.cover.images" :key="index" />
          </div>
        </template>
        <template #label>
          <div class="label">
            <div class="intro">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{formateTime(item.pubdate)}}</span>
            </div>
            <van-icon name="cross" />
          </div>
        </template>
      </van-cell>
      <van-cell />
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reqArticles } from "@/api";
import { timeAgo } from "@/utils/date";
export default {
  name: "ArticleItem",
  props: ["channelId"],
  data() {
    return {
      article: [],
      loading:false,
      finished:false,
      timestamp:new Date().getTime(),
      isLoading:false
    };
  },
  methods: {
    formateTime: timeAgo,
    async onLoad() {
       let res = await reqArticles({
        channel_id:this.channelId,
        timestamp:this.timestamp
       })
       
       this.article = [...this.article , ...res.data.results]
       this.timestamp = res.data.pre_timestamp
       this.loading = false
    //    判断时间戳是否为空 为空则数据全部加载完毕 停止请求
       if(res.data.pre_timestamp == null) {
        this.finished = true
        return
       }
  } ,
  async onRefresh() {
    this.article = [],
    this.timestamp = new Date().getTime()
    let res = await reqArticles({
        channel_id:this.channelId,
        timestamp:this.timestamp
    })
    this.article = [...this.article , ...res.data.results]
    this.timestamp = res.data.pre_timestamp
    this.isLoading = false
  }
  },
  async mounted() {
    let res = await reqArticles({
      channel_id: this.channelId,
      timestamp:this.timestamp
    });
    this.article = res.data.results;
    this.timestamp = res.data.pre_timestamp;
  }
};
</script>

<style scoped lang='less'>
.title {
  display: flex;
  justify-content: space-between;
}
.label {
  display: flex;
  justify-content: space-between;
  .intro span {
    margin-right: 0.1rem;
  }
}
.van-cell {
  align-items: flex-end;
}

// 单图
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}
// 三图
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>