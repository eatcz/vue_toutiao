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
        @search="Search_result"
      />
      <!--:autofocus="true" 也是自动获取焦点-->
    </div>

    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="keyword.length !== 0">
      <!-- v-html 可以把标签字符串解析成html元素使用 -->
      <div
        class="sugg-item"
        v-for="(str , index) in suggestions"
        :key="index"
        v-html="lightKw(str , keyword)"
        @click="sugClick(str)"
      ></div>
    </div>

        <!-- 搜索历史 -->
<div class="search-history" v-else>
    <!-- 标题 -->
    <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
			<van-icon name="delete" class="search-icon" @click="clearHis"/>
        </template>
    </van-cell>

    <!-- 历史列表 -->
    <div class="history-list">
        <span class="history-item" v-for="(h , index) in history" :key="index" @click="hisClick(h)">{{h}}</span>
    </div>
</div>
  </div>
</template>

<script>
import { reqSearchSuggest } from "@/api";
import {goSrarchResult} from '@/utils/goRsult'
export default {
  data() {
    return {
      keyword: "", // 搜索关键字
      timer: null,
      suggestions: [],
      history:JSON.parse(localStorage.getItem('history')) || [],
    };
  },
  methods: {
    onInput() {
      // 输入框防抖操作
      clearTimeout(this.timer);
      if (this.keyword == "") {
        this.suggestions = [];
      }
      this.timer = setTimeout(async () => {
        if (this.keyword == "") return;
        // console.log(this.keyword);
        let res = await reqSearchSuggest({
          q: this.keyword
        });
        console.log(res);
        this.suggestions = res.data.options;
      }, 300);
    },
    // 封装搜索关键字高亮函数
    lightKw(orignStr, target) {
      // orignStr:原来的字符串
      // target：关键字
      // replace：默认替换第一个符合条件的
      // replaceAll：替换全部符合条件的
      // 方法一:
      // return orignStr.replaceAll(target , `<span style="color:#ff0000">${target}</span>`)  //会把所有匹配到的全转换为小写
      // 方法二:利用正则
      // 如果要使用变量作为匹配条件  就不能使用正则的语法糖写法
      const reg = new RegExp(target, "ig"); // i 不区分大小写 g 全都匹配
      // match 就是匹配时 原字符串中的那个字符
      return orignStr.replace(reg, match => {
       return  `<span style="color:#ff0000">${match}</span>`
      });
    },
    // 搜索完成跳转搜索结果页面
    Search_result() {
      this.history.push(this.keyword)
      goSrarchResult(this.keyword)
    },
    // 联想菜单点击跳转搜索结果页面
    sugClick(sug) {
      this.history.push(this.keyword)
      goSrarchResult(sug)
    },
    // 点击搜索历史记录跳转搜索结果页面
    hisClick(h) {
      goSrarchResult(h)
    },
    clearHis() {
      this.history = []
    }
  },
  watch:{
    history: {
      deep:true,
      handler() {
        // 数组去重
        // const TheSet = new Set(this.history)
        // const newArr = Array.from(TheSet)
        // console.log(newArr);
        const newArr = [...new Set(this.history)]
        localStorage.setItem('history' , JSON.stringify(newArr))
      }
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
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>