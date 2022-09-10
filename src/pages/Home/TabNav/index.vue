<template>
  <div class="m-tab">
    <van-tabs v-model="channel_id" sticky animated offset-top="1.2227rem">
      <van-tab :title="c1.name" :name="c1.id"  v-for="c1 in channels" :key="c1.id">
        <ArticleItem :channelId="channel_id" /> <!--:article="artileLists"-->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArticleItem from '@/pages/Home/Article/ArticleItem.vue'
export default {
  name: "TabNav",
  components:{
    ArticleItem
  },
  data() {
    return {
      channel_id: 0,
      // artileLists:[],
    };
  },
  methods:{
    
  },
  async mounted() {
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