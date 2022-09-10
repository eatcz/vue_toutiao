<template>
 <div>
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>

 </div>
</template>

<script>
import ArticleItem from '@/pages/Home/Article/ArticleItem.vue'
 export default {
   name:'ArticleList'
   }
</script>

<style scoped lang='less'>

</style>