<template>
 <div class="m-home">
  <van-nav-bar>
  <template #left>
    <img src="@/assets/logo.png">
  </template>
  <template #right>
    <van-icon name="search" size="18" color="#fff" />
  </template>
</van-nav-bar>
 </div>
</template>

<script>
 export default {
   name:''
   }
</script>

<style scoped lang='less'>
  .van-nav-bar{
    background-color: #0077ff;
    img{
      width: 100px;
      height: 30px;
    }
  }
</style>