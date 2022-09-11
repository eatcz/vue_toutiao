<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        placeholder="请输入搜索关键词"
        v-focus
        background="#007BFF"
        shape="round"
        v-model="keyword"
        @input="onInput"
      />
      <!--:autofocus="true" 也是自动获取焦点-->
    </div>
    <!-- 搜索建议列表 -->
<div class="sugg-list">
    <div class="sugg-item" v-for="(item , index) in suggestions" :key="index">
         {{item}}
    </div>
</div>
  </div>
</template>

<script>
import {reqSearchSuggest} from '@/api'
export default {
  data() {
    return {
        keyword: "", // 搜索关键字
        timer:null,
        suggestions:[]
    };
  },
  methods: {
     onInput() {
        // 输入框防抖操作
        clearTimeout(this.timer)
        if(this.keyword == '') {
            this.suggestions = []
        }
        this.timer =  setTimeout(async () => {
            if(this.keyword == '') return
            // console.log(this.keyword);
           let res = await reqSearchSuggest({
            q:this.keyword
           })
           console.log(res);
            this.suggestions = res.data.options
        }, 300);
    }
  }
};
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>