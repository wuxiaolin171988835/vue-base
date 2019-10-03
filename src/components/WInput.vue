<template>
  <input :type="type" :value="value" @input="handlerInput" />
</template>

<script>
export default {
  name: "WInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  methods: {
    handlerInput(e) {
      this.inputValue = e.target.value;
      //通知父类更新数据
      this.$emit("input", this.inputValue);
      //通知FormItem做检验
      this.$parent.$emit("validate", this.inputValue);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
</style>