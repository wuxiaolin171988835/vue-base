<template>
  <div class="w-form-item">
    <label class="label" v-if="label">{{this.label}}</label>
    <div>
      <slot></slot>
      <p v-if="validateStatus=='error'" class="error">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import schema from "async-validator";
export default {
  name: "WFormItem",
  inject: ["form"], //注入form，获取model和rules
  props: ["label", "prop"],
  data() {
    return {
      validateStatus: "",
      errorMessage: ""
    };
  },
  methods: {
    validate() {
      return new Promise(resolve => {
        //校验当前项，依赖async-validator(element自带，无需安装)
        const desciptor = {
          //校验规则
          [this.prop]: this.form.rules[this.prop]
        };
        const validator = new schema(desciptor);
        validator.validate(
          { [this.prop]: this.form.model[this.prop] },
          errors => {
            if (errors) {
              this.validateStatus = "error";
              this.errorMessage = errors[0].message;
              resolve(false); //校验失败
            } else {
              this.validateStatus = "";
              this.errorMessage = "";
              resolve(true); //校验成功
            }
          }
        );
      });
    }
  },
  created() {
    this.$on("validate", this.validate);
  },
  mounted() {
    //挂载到form上时，派发一个添加事件
    if (this.prop) {
      this.$parent.$emit("formItemAdd", this);
    }
  }
};
</script>

<style scoped>
.label {
  padding-right: 5px;
}
.error {
  color: red;
}
.w-form-item {
  margin-top: 10px;
}
</style>