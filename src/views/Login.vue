<template>
  <div class="login-container">
    <div class="login-form">
      <a-form layout="horizontal" :model="loginForm" :labelCol="{ span: 5 }">
        <a-form-item label="用户名">
          <a-input
            v-model:value="loginForm.username"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            v-model:value="loginForm.password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item label="验证码">
          <a-input
            v-model:value="loginForm.checkcode"
            placeholder="请输入验证码"
          />
        </a-form-item>
        <div class="checkcode-img" @click="changeCheckCode">
          <img :src="checkcodeUrl" />
        </div>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
interface LoginForm {
  username: string
  password: string
  checkcode: string
  checkCodePrefix: string
}
interface DataProps {
  loginForm: LoginForm
  checkcodeUrl: string
  changeCheckCode: () => void
}
export default defineComponent({
  name: 'Login',
  setup() {
    const data: DataProps = reactive({
      loginForm: {
        username: '',
        password: '',
        checkcode: '',
        checkCodePrefix: ''
      },
      checkcodeUrl: '',
      changeCheckCode: () => {
        console.log()
      }
    })
    return { ...toRefs(data) }
  }
})
</script>
<style lang="scss">
.login-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .login-form {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 5px 5px 5px 5px #888888;
    text-align: center;
    width: 600px;
    height: 300px;

    .checkcode-img {
      position: relative;
      top: -60px;
      left: 150px;
      float: right;
      height: 0px;

      img {
        height: 34px;
        width: 120px;
      }
    }
  }
}
</style>
