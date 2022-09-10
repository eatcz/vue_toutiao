<template>
 <div>
    <router-view></router-view>
<van-tabbar v-model="active" route>
  <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
  <van-tabbar-item icon="user-o" to="/layout/personal">我的</van-tabbar-item>
</van-tabbar>
 </div>
</template>

<script>
 export default {
   name:'Layout',
     data() {
    return {
      active: 0,
    };
  },

   }
</script>

<style scoped lang='less'>

</style>