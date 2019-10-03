<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-13 15:33:24
 * @LastEditTime: 2019-09-13 15:33:24
 * @LastEditors: your name
 -->
<template>
  <div id="app">
    <!-- v-model===:value="value" @input="handlerInput" -->
    <h3>双向数据绑定</h3>
    <w-input v-model="inputValue"></w-input>
    {{inputValue}}
    <h3>slot应用</h3>
    <w-slot>
      <template slot="header">头部信息</template>
      正文信息。。。
      <template slot="footer">底部信息</template>
    </w-slot>
    <ul>
      <li v-for="good in goods" :key="good.id">
        {{good.text}}
        ¥{{good.price}}
        <button @click="addCart(good)">加入购物车</button>
      </li>
    </ul>
    <cart :name="name"></cart>
    <h3>路由信息</h3>
    <router-link to="/dashboard/home">home</router-link>|
    <router-link to="/dashboard/about">about</router-link>|
    <router-link to="/login">login</router-link>
    <router-view />
    <h3>路由守卫</h3>

    <button @click="LogOut">退出</button>
    <h3>vuex</h3>
    <!-- <p>count:{{$store.state.count}}</p> -->
    <p>count:{{count}}</p>
    <!-- <p>您的余额：{{$store.getters.money}}</p> -->
    <p>您的余额mapGetters：{{money}}</p>
    <button @click="inc()">increase</button>
    <button @click="incAsync()">increaseAsync</button>
  </div>
</template>


<script>
import axios from "axios";
import Cart from "@/components/Cart.vue";
import WInput from "@/components/WInput.vue";
import WSlot from "@/components/WSlot.vue";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "购物车列表",
      goods: [],
      inputValue: "hello world!"
    };
  },
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["money"])
  },
  components: {
    WInput,
    Cart,
    WSlot
  },
  methods: {
    ...mapActions(["increaseAsync", "submitLogOut"]),
    ...mapMutations(["increase"]),
    addCart(good) {
      this.$bus.$emit("addCart", good);
    },

    async LogOut() {
      await this.submitLogOut();
      if (!this.$store.state.isLogin) {
        this.$router.push("/login?redirect=" + this.$route.path);
      }
    },
    inc() {
      // this.$store.commit("increase",{value:10});
      this.increase({ value: 10 });
    },
    incAsync() {
      // this.$store.dispatch("increaseAsync",{value:50});
      this.increaseAsync({ value: 50 });
    }
  },
  async created() {
    const ret = await axios.get("/api/goods");
    this.goods = ret.data.list;
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
