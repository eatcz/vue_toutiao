<template>
  <div class="m-header">
    <van-nav-bar fixed>
      <template #left>
        <img src="@/assets/logo.png" />
      </template>
      <template #right>
        <van-icon name="search" size="0.45rem" color="#fff" @click="goSearch" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods:{
    goSearch() {
      this.$router.push('/search')
    }
  }
};
</script>

<style scoped lang='less'>
.van-nav-bar {
  background-color: #0077ff;
  img {
    width: 100px;
    height: 30px;
  }
}
</style>