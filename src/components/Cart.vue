<!--
 * @Description: 购物车列表
 * @Author: wuxiaolin
 * @Date: 2019-09-13 16:09:50
 * @LastEditTime: 2019-09-13 18:13:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div v-if="cart.length">
    <h3>{{name}}</h3>
    <table border="1" cellspacing="0" width="500px">
      <tr>
        <th>
          <input type="checkbox" v-model="allCheck" @change="allChecked" />
        </th>
        <th>课程名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>价格</th>
      </tr>
      <tr v-for="(course,index) in cart" :key="course.id" :class="{'active':course.active}">
        <td>
          <input type="checkbox" v-model="course.active" />
        </td>
        <td>{{course.text}}</td>
        <td>{{course.price}}</td>
        <td>
          <button @click="minusCount(index)">-</button>
          {{course.count}}
          <button @click="addCount(index)">+</button>
        </td>
        <td>¥{{course.count*course.price}}</td>
      </tr>
      <tr>
        <td></td>
        <td colspan="2">{{activeCount}}/{{count}}</td>
        <td colspan="2">总价：¥{{this.total}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "cart",
  props: ["name"],
  data() {
    return {
      cart: [],
      allCheck: true
    };
  },
  computed: {
    activeCount() {
      return this.cart.filter(v => v.active).length;
    },
    count() {
      return this.cart.length;
    },
    total() {
      let sum = 0;
      this.cart.forEach(v => {
        if (v.active) {
          sum += v.count * v.price;
        }
      });
      return sum;
    }
  },
  watch: {
    cart: {
      handler(newValue) {
        window.localStorage.setItem("cart", JSON.stringify(newValue));
        this.isAllChecked();
      },
      deep: true
    }
  },
  methods: {
    /**
     * @description: 增加商品数量
     * @param {i}
     * @return:
     */
    addCount(i) {
      this.cart[i].count++;
    },
    /**
     * @description: 减少商品数量
     * @param {i}
     * @return:
     */
    minusCount(i) {
      let count = this.cart[i].count;
      if (count > 1) {
        this.cart[i].count--;
      } else {
        this.remove(i);
      }
    },
    /**
     * @移除商品:
     * @param {i}}
     * @return:
     */
    remove(i) {
      let ret = window.confirm("确认移除该课程？");
      if (ret) {
        this.cart.splice(i, 1);
      }
    },
    /**
     * @description: 单个商品是否选中
     * @param {}
     * @return:
     */
    isAllChecked() {
      let ret = true;
      this.cart.forEach(v => {
        if (!v.active) {
          ret = false;
        }
      });
      this.allCheck = ret;
    },
    /**
     * @description: 全选
     * @param {type}
     * @return:
     */
    allChecked() {
      this.cart.forEach(v => {
        v.active = this.allCheck;
      });
    }
  },
  created() {
    //监听父组件添加商品事件
    this.$bus.$on("addCart", good => {
      let ret = this.cart.find(v => v.id === good.id);
      if (ret) {
        //购物车已存在该商品
        ret.count++;
      } else {
        this.cart.push({
          ...good,
          count: 1,
          active: true
        });
      }
    });
    this.cart = JSON.parse(window.localStorage.getItem("cart"));
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
.active {
  color: red;
}
</style>