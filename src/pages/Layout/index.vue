<template>
 <div class="layout">
    <router-view></router-view>
<van-tabbar v-model="active" route>
  <van-tabbar-item icon="home-o" to="/layout/home">้ฆ้กต</van-tabbar-item>
  <van-tabbar-item icon="user-o" to="/layout/personal">ๆ็</van-tabbar-item>
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
  .layout{
    padding-bottom: 50px;
  }
</style>