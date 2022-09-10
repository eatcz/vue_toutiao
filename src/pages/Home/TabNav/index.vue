<template>
  <div class="m-tab">
    <van-tabs v-model="active" sticky offset-top="1.2227rem">
      <van-tab :title="c1.name" v-for="c1 in channels" :key="c1.id">{{c1.name}}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "TabNav",
  data() {
    return {
      active: 2,
      // channels:[]
    };
  },
  mounted() {
    this.$store.dispatch('home/getChannels')
  },
  computed: {
    ...mapState('home' , ['channels'])
  }
};
</script>

<style scoped lang='less'>
.van-tabs{
  padding-top: 46px;
}
</style>