<template>
  <div class="login-container">
    <div class="login-form">
      <a-form
        labelAlign="left"
        layout="horizontal"
        :rules="rules"
        :model="loginForm"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        ref="loginForm"
      >
        <div class="title">房产通管理后台</div>
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="loginForm.username"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input
            type="password"
            v-model:value="loginForm.password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item label="验证码" name="checkCode">
          <a-input
            v-model:value="loginForm.checkCode"
            placeholder="请输入验证码"
          />
        </a-form-item>
        <div class="checkcode-img" @click="changeCheckCode">
          <img :src="checkcodeUrl" />
        </div>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button
            :loading="loading"
            @click="login"
            style="width: 120px; opacity: 0.8;"
            type="primary"
          >
            登录
          </a-button>
        </a-form-item>
        <!-- <div class="other-login">
          <GithubOutlined
            :style="{ fontSize: '30px' }"
            @click="authorizationCodeLogin"
          />
          <QqOutlined
            :style="{ fontSize: '30px' }"
            @click="authorizationCodeLogin"
          />
          <WechatOutlined
            :style="{ fontSize: '30px' }"
            @click="authorizationCodeLogin"
          />
        </div> -->
      </a-form>
    </div>
  </div>
</template>
<script>
import auth from '@/api/auth'
import { client, httpConfig, constVar } from '@/config/config'
// import {
//   GithubOutlined,
//   QqOutlined,
//   WechatOutlined
// } from '@ant-design/icons-vue'

export default {
  name: 'Login',
  // components: {
  //   GithubOutlined,
  //   QqOutlined,
  //   WechatOutlined
  // },
  data() {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: '',
        checkCode: '',
        checkCodePrefix: ''
      },
      checkcodeUrl: '',
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
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
  created() {
    this.changeCheckCode()
    this.clearToken()
  },
  // 三方授权登录
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       if (route.path == '/' && route.query.code) {
  //         this.authorizationLogin(this.$route.query.code)
  //       }
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    authorizationCodeLogin() {
      window.location.href = `http://${httpConfig.host}:${httpConfig.port}/api/auth/oauth/authorize?response_type=code&client_id=${client.clientId}&redirect_uri=${client.redirectUri}&scope=${client.scope}`
    },
    changeCheckCode() {
      auth.captcha().then(res => {
        this.checkcodeUrl = res.data.img
        this.loginForm.checkCodePrefix = res.data.checkCodePrefix
      })
    },
    authorizationLogin(code) {
      // 授权成功 换取token
      const fromdata = new FormData()
      fromdata.append('client_id', client.clientId)
      fromdata.append('client_secret', client.clientSecret)
      fromdata.append('code', code)
      fromdata.append('grant_type', 'authorization_code')
      fromdata.append('scope', client.scope)
      fromdata.append('redirect_uri', client.redirectUri)
      auth.login(fromdata).then(res => {
        if (res.code == 500) {
          this.$message.warn(res.msg)
        } else {
          this.$message.info(res.msg)
          this.loginSuceess(res)
        }
      })
    },
    login() {
      this.$refs.loginForm
        .validate()
        .then(() => {
          this.loading = true
          const fromdata = new FormData()
          fromdata.append('client_id', client.clientId)
          fromdata.append('client_secret', client.clientSecret)
          fromdata.append('grant_type', client.grantType)
          fromdata.append('scope', client.scope)
          fromdata.append('username', this.loginForm.username)
          fromdata.append('password', this.loginForm.password)
          fromdata.append('checkCode', this.loginForm.checkCode)
          fromdata.append('checkCodePrefix', this.loginForm.checkCodePrefix)
          console.log(auth.login(fromdata))
          auth
            .login(fromdata)
            .then(res => {
              this.loading = false
              if (res.code == 200) {
                this.$message.info('登录成功')
                this.loginSuceess(res.data)
              } else {
                this.$message.warn(res.msg)
                this.changeCheckCode()
              }
            })
            .catch(error => {
              this.loading = false
              console.log('error', error)
            })
        })
        .catch(error => {
          this.changeCheckCode()
          console.log('error', error)
        })
    },
    loginSuceess(data) {
      // 将返回token相关信息存储到本地
      localStorage.setItem(constVar.tokenInfoKey, JSON.stringify(data))
      this.$router.push({ path: '/index' })
    },
    clearToken() {
      localStorage.removeItem(constVar.tokenInfoKey)
    }
  }
}
</script>
<style lang="scss" scope>
.login-container:before {
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607579146045&di=85f551ff866ab8e4b1399d5b85c2ec8c&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F19%2F211608ztcq7higicydxhsy.jpg');
  background-size: cover;
  width: 100vw;
  height: 100vh;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  -webkit-filter: blur(5px);
  filter: blur(5px);
}
.login-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .login-form {
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 2px 10px 10px #8497bf;
    text-align: center;
    width: 600px;
    height: 400px;
    opacity: 0.8;

    input {
      background-color: transparent;
    }

    label {
      // font-family: 'Courier New', Courier, monospace;
      font-weight: 600;
      font-size: 18px;
      color: #193452;
    }
    .ant-form-item-label > label::after {
      content: '';
    }
    .ant-form-item-required::before {
      opacity: 0;
    }

    .title {
      font-size: 30px;
      font-weight: 600;
      color: #193452;
      padding-bottom: 30px;
      letter-spacing: 10px;
    }
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
    .other-login {
      position: relative;
      left: 120px;
      float: right;
      height: 0px;
      * {
        margin: 0 5px;
      }
    }
  }
}
</style>
