<template>
  <div>
    <w-form :model="ruleForm" :rules="rules" ref="loginForm">
      <w-form-item label="用户名" prop="name">
        <w-p>
          <w-input v-model="ruleForm.name" type="text"></w-input>
        </w-p>
      </w-form-item>
      <w-form-item label="密码" prop="pwd">
        <w-input v-model="ruleForm.pwd" type="password"></w-input>
      </w-form-item>
      <w-form-item>
        <el-button type="primary" @click="submitForm()" size="small">立即创建</el-button>
      </w-form-item>
    </w-form>
  </div>
</template>

<script>
import WFormItem from "@/components/WFormItem.vue";
import WInput from "@/components/WInput.vue";
import WForm from "@/components/WForm.vue";
import WP from "@/components/WP.vue";
export default {
  name: "WFormTest",
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  components: {
    WFormItem,
    WInput,
    WForm,
    WP
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          alert("登陆成功!");
        } else {
          alert("校验失败");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>