<template>
  <div class="m-tab">
    <van-tabs v-model="channel_id" sticky animated offset-top="1.2227rem">
      <van-tab :title="c1.name" :name="c1.id"  v-for="c1 in UserChannels" :key="c1.id">
        <ArticleItem :channelId="channel_id" /> <!--:article="artileLists"-->
      </van-tab>
    </van-tabs>
    <van-icon name="plus" size="0.373333334rem" class="moreChannels" @click="showPopup"/>
<van-popup v-model="show">
  <ChannelEdit 
  :unCheckList="unCheckChannelList" 
  :UserChannels="UserChannels" 
  @addChannel="addUserChannel"
  @removeChannelEV="remUserChannel"
  @closeEV="closePopup"
  ref="editRef" 
  v-model="channel_id"
  /> <!-- 通过ref获取子组件的变量-->
      <!--和子组件共享channel_id  -->
</van-popup>
  </div>
</template>

<script>
import {reqUserChannels , reqAllChannels , addChannel} from '@/api'
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
      show:false,
      UserChannels:[],
      AllChannels:[]
      // artileLists:[],
    };
  },
  methods:{
    showPopup() {
      this.show = true;
    }, 
     // 添加用户频道
    async addUserChannel(channelObj) {
      // 向用户频道数组添加数据
      this.UserChannels.push(channelObj)

      // 遍历过滤id不为0的数据
      const newArr = this.UserChannels.filter(obj => obj.id !==0)

      const TheNewArr = newArr.map((obj , index) =>{
        const newObj = {...obj} //浅拷贝
        delete newObj.name
        newObj.seq = newObj.index
        return newObj
      })
      // 向后端发送获取添加之后的用户频道
      await addChannel({
        channels:TheNewArr
      })
    },
    // 移除用户频道
    async remUserChannel(channelObj) {
      const index = this.UserChannels.findIndex(obj =>obj.id === channelObj.id)
      this.UserChannels.splice(index , 1)
      await addChannel({
        channels:this.UserChannels
      })
    },
    closePopup() {
      // 隐藏弹出层
      this.show = false
      // 修改编辑状态
      this.$refs.editRef.isEdit = false
    }
  },
  async mounted() {
    // 获取用户频道
    let res = await reqUserChannels()
    this.UserChannels = res.data.channels

    // 获取所有频道
    let res2 = await reqAllChannels()
    this.AllChannels = res2.data.channels
  },

  computed: {
    // ...mapState('home' , ['Userchannels' , 'AllChannels']),
    unCheckChannelList() {
      // 目标：把所有频道数组挨个对象取出 去用户已选频道里查找 如果找不到则存入新数组
      const newArr = this.AllChannels.filter(obj =>{
        let index = this.UserChannels.findIndex(userObj =>{
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