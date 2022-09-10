<template>
  <div class="m-login">
    <div class="m-header">
      <van-nav-bar title="登录" />
    </div>
    <div class="m-loginForm">
      <van-form @submit="onSubmit">
        <van-field
          v-model="user.mobile"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请输入正确的11位手机号', pattern:/^1[3-9]\d{9}$/}]"
        />
        <van-field
          v-model="user.code"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' , pattern:/^\d{6}$/}]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <van-loading size="36px" vertical v-show="isShow">登录中...</van-loading>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "@/api";
import { Toast } from "vant";
// 引入操作token
import {setToken} from '@/utils/token.js';
export default {
  name: "Login",
  data() {
    return {
      user: {
        mobile: "",
        code: "246810"
      },
      isShow:false
    };
  },
  methods: {
    async onSubmit(values) {
        try {
            this.isShow= true
            let res =  await reqLogin(this.user)
            // localStorage.setItem('token' , res.data.token)
            setToken(res.data.token)
            this.isShow=false
            Toast.success('登陆成功')
            this.$router.replace('/layout')
        }catch (err) {
            Toast.fail('手机号或密码错误')
        }
    }
  },
  mounted() {
    // reqLogin(this.user)
  }
};
</script>

<style scoped lang='less'>
// 导航栏
.van-nav-bar {
  background-color: #0077ff;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}
</style>