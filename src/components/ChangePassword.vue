<template>
  <a-modal
    v-model:visible="changePasswordVisible"
    title="修改密码"
    @ok="handleOk"
    @cancel="handleCancel"
    :confirmLoading="loading"
  >
    <a-row>
      <a-form
        :validateFirst="true"
        labelAlign="right"
        layout="horizontal"
        :rules="rules"
        :model="changePassword"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        ref="changePassword"
      >
        <a-form-item label="旧密码" name="oldPassword">
          <a-input
            type="password"
            v-model:value="changePassword.oldPassword"
            placeholder="请输入旧密码"
          />
        </a-form-item>
        <a-form-item label="新密码" name="newPassword">
          <a-input
            type="password"
            v-model:value="changePassword.newPassword"
            placeholder="请输入新密码"
          />
        </a-form-item>
        <a-form-item label="重复密码" name="repeatPassword">
          <a-input
            type="password"
            v-model:value="changePassword.repeatPassword"
            placeholder="请重复输入新密码"
          />
        </a-form-item>

        <a-form-item label="验证码" name="checkCode">
          <a-input
            v-model:value="changePassword.checkCode"
            placeholder="请输入验证码"
          />
        </a-form-item>

        <span class="checkcode-img" @click="changeCheckCode">
          <img :src="checkcodeUrl" />
        </span> </a-form
    ></a-row>
  </a-modal>
</template>
<script>
import userApi from '@/api/user'
import auth from '@/api/auth'
export default {
  name: 'changePassword',
  data() {
    return {
      loading: false,
      changePasswordVisible: false,
      checkcodeUrl: '',
      changePassword: {
        id: null,
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
        checkCode: '',
        checkCodePrefix: ''
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }
        ],
        repeatPassword: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value) => {
              if (!value) {
                return Promise.reject('请输入重复密码')
              }
              if (value !== this.changePassword.newPassword) {
                return Promise.reject('两次输入不一致')
              }
              return Promise.reject()
            }
          }
        ],
        checkCode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    changeCheckCode() {
      auth.captcha().then(res => {
        this.checkcodeUrl = res.data.img
        this.changePassword.checkCodePrefix = res.data.checkCodePrefix
      })
    },
    openChangePassword() {
      this.changePassword.id = this.user.id
      this.changeCheckCode()
      this.changePasswordVisible = true
    },
    handleOk() {
      this.$refs.changePassword.validate().then(() => {
        this.loading = true
        userApi.changPassword(this.changePassword).then(res => {
          this.loading = false
          if (res.code === 200) {
            this.$message.info('修改成功，请重新登录')
            this.changePasswordVisible = false
            localStorage.clear()
            this.$router.replace({ path: '/login' })
          } else {
            this.$message.error(res.msg)
            this.changeCheckCode()
          }
        })
      })
    },
    handleCancel() {
      this.$refs.changePassword.resetFields()
    }
  }
}
</script>
