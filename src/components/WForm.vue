<template>
  <div>
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: "WForm",
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    async validate(callback) {
      //将FormItem数组转换为validate()返回的promise数组
      const tasks = this.fields.map(item => item.validate());
      //获取所有结果统一处理
      const results = await Promise.all(tasks);
      let ret = true;
      results.forEach(valid => {
        if (!valid) {
          ret = false; //只要一个失败就失败
        }
      });
      callback(ret);
    }
  },
  created() {
    this.fields = [];
    //缓存所有数据项
    this.$on("formItemAdd", item => {
      this.fields.push(item);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>