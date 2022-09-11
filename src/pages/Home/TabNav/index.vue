<template>
  <div class="m-tab">
    <van-tabs v-model="channel_id" sticky animated offset-top="1.2227rem">
      <van-tab :title="c1.name" :name="c1.id"  v-for="c1 in Userchannels" :key="c1.id">
        <ArticleItem :channelId="channel_id" /> <!--:article="artileLists"-->
      </van-tab>
    </van-tabs>
    <van-icon name="plus" size="0.373333334rem" class="moreChannels" @click="showPopup"/>
<van-popup v-model="show">
  <ChannelEdit :unCheckList="unCheckChannelList" />
</van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArticleItem from '@/pages/Home/Article/index.vue'
import ChannelEdit from '@/pages/Home/ChannelEdit/index.vue'
export default {
  name: "TabNav",
  components:{
    ArticleItem,
    ChannelEdit
  },
  data() {
    return {
      channel_id: 0,
      show:false
      // artileLists:[],
    };
  },
  methods:{
    showPopup() {
      this.show = true;
    },
  },
  async mounted() {
    this.$store.dispatch('home/getUserChannels')
    this.$store.dispatch('home/getAllChannels')

  },
  computed: {
    ...mapState('home' , ['Userchannels' , 'AllChannels']),
    unCheckChannelList() {
      // 目标：把所有频道数组挨个对象取出 去用户已选频道里查找 如果找不到则存入新数组
      const newArr = this.AllChannels.filter(obj =>{
        let index = this.Userchannels.findIndex(userObj =>{
          return userObj.id === obj.id
      })
      if(index > -1) {
        return false
      }else{
        return true
      }
      })
      return newArr
    }
  }
};
</script>

<style scoped lang='less'>
.van-tabs{
  padding-top: 46px;
}
/deep/.van-tabs__wrap{
    padding-right: 30px;
    background-color: #fff;
  }
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
  // padding: 44px;
}
.van-popup{
  width: 100vw;
  height: 100vh;
}
</style>