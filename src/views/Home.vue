<template>
  <div class="home">
    <h1>This is an home page</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
  // beforeRouteEnter(to, from, next) {
  //   //页面路由
  //   console.log("home页面路由！！！");
  //   next();
  // },
  // beforeRouteUpdate(to, from) {
  //   //仅路由参数发生变化时触发，eg:page/vue=>page/react
  //   //或者watch $route
  // }
};
</script>
