<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 14:47:00
 * @LastEditTime: 2019-09-18 14:47:00
 * @LastEditors: your name
 -->
<template>
  <div>
    <div>Login...</div>
    <button @click="Login">登陆</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["submitLogin"]),
    async Login() {
      await this.submitLogin();
      if (this.$store.state.isLogin) {
        let { redirect } = this.$route.query;
        if (redirect) {
          //存在重定向地址
          this.$router.push(redirect);
        } else {
          //不存在重定向地址去首页
          this.$router.push("/");
        }
      } else {
        alert("登陆失败 ！");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>