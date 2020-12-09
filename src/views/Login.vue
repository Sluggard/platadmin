<template>
  <div class="login-container">
    <div class="login-form">
      <a-form :layout="horizontal" :model="user" :labelCol="{ span: 5 }">
        <a-form-item label="用户名">
          <a-input v-model:value="user.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model:value="user.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item label="验证码">
          <a-input v-model:value="user.password" placeholder="请输入密码" />
          <img class="checkcode-img" />
        </a-form-item>
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
import { defineComponent, reactive } from 'vue'
interface User {
  username: string
  password: string
}
export default defineComponent({
  name: 'Login',
  setup() {
    const user: User = reactive({
      username: '',
      password: ''
    })

    return { user }
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
      background: black;
      position: relative;
      top: -42px;
      left: 150px;
      float: right;
    }
  }
}
</style>
