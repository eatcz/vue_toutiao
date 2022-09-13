<template>
   <div >
    <van-pull-refresh v-model="isLoading">
    
      <van-cell v-for="item in results" :key="item.art_id" @click="goDetail(item.art_id)">
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
          </div>
        </template>
      </van-cell>
      <van-cell />
    </van-pull-refresh>
    <van-action-sheet
     v-model="show" 
     :actions="actions"
      get-container="body"
      :cancel-text="text" 
      />
  </div>
</template>

<script>
import { timeAgo } from "@/utils/date";
import {Toast} from  'vant';
import {firstActions , secondActions} from '@/api/report.js'
export default {
  name: "ResultList",
  props: ["results"],
  data() {
    return {
      article: [],
      loading:false,
      finished:false,
      timestamp:new Date().getTime(),
      isLoading:false,
      show:false,
      actions: firstActions,
      text:'取消',
      id:0
    };
  },
  methods: {
    formateTime: timeAgo,
    goDetail(id) {
      this.$router.push(`/detail/${id}`)
    }
  
  },
    // 底部加载方法(触底加载)
}
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