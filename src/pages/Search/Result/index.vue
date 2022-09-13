<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>
    <!-- 搜索结果 -->
    <van-list v-model="loading" :immediate-check="false" :finished="finished" offset="50" finished-text="没有更多了" > <!--@load="onLoad"-->
      <ResultList :results="results"/>
    </van-list>
  </div>
</template>

<script>
import {Toast} from  'vant';
import ResultList from './ResultList.vue'
import { reqResult } from "@/api";
export default {
  name: "SearchResult",
  components: {
    ResultList
  },
  data() {
    return {
      page:1,
      results: [],
      loading:false,
      finished:false,
      timestamp:new Date().getTime(),
      isLoading:false,
      show:false,
      id:0
    };
  },
  methods:{
  //  async onLoad() {
  //     if(this.results.length === 0) {
  //       this.loading = false
  //       return
  //     }else{
  //       let res = await reqResult({
  //         page:this.page++,
  //         q:this.$route.params.keyword
  //       })
  //       console.log(res);
  //       this.results = [...this.results , ...res.data.results]
  //       this.loading = false
  //     }
  //   }
  },
  async mounted() {
    let res = await reqResult({
      page:this.page,
      q: this.$route.params.keyword
    });
    this.results = res.data.results;
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
