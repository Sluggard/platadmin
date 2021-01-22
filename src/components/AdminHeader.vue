<template>
  <a-layout-header id="layout-header">
    <div class="header-left">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="changeCollapsed"
      />
      <menu-fold-outlined v-else class="trigger" @click="changeCollapsed" />
      <a-breadcrumb :routes="routes">
        <template #itemRender="{ route, routes, paths }">
          <span v-if="routes.indexOf(route) === routes.length - 1">
            {{ route.meta.title }}
          </span>
          <router-link v-else :to="`/${paths.join('/')}`">
            {{ route.meta.title }}
          </router-link>
        </template>
      </a-breadcrumb>
    </div>
    <a-dropdown class="userinfo" placement="bottomCenter">
      <span>
        <a-avatar shape="square">
          <template #icon>
            <img v-if="user && user.headPortrait" :src="user.headPortrait" />
            <UserOutlined v-else />
          </template>
        </a-avatar>
        <span class="username">{{
          user && user.realName ? user.realName : ''
        }}</span>
      </span>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <span>个人信息</span>
          </a-menu-item>
          <a-menu-item @click="openChangePassword">
            <span>修改密码</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="logout">
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
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
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import { mapState, mapMutations } from 'vuex'
import { constVar } from '@/config/config'
import userApi from '@/api/user'
import auth from '@/api/auth'
export default {
  name: 'admin-header',
  data() {
    return {
      routes: [],
      user: null,
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
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
  },
  computed: mapState({
    collapsed: state => state.collapsed
  }),
  mounted() {
    userApi.currentUser().then(res => {
      if (res.code === 200) {
        this.user = res.data
      }
    })
  },
  watch: {
    $route: {
      handler: function(route) {
        route.matched[0].children = []
        if (route.path == '/index') {
          this.routes = [route.matched[0]]
        } else {
          this.routes = route.matched
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations(['changeCollapsed']),
    logout() {
      localStorage.removeItem(constVar.tokenInfoKey)
      this.$router.replace({ path: '/' })
    },
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
<style lang="scss" scoped>
#layout-header {
  background: #fff;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }

  .header-left {
    display: flex;
    flex-direction: row;

    .ant-breadcrumb {
      margin: auto;
      height: 64px;
      line-height: 64px;
      position: relative;
      bottom: 2px;
    }
  }

  .userinfo {
    float: right;
    margin: 0 30px;
    .username {
      margin: 0 10px;
    }
  }
}
.checkcode-img {
  position: relative;
  top: -60px;
  left: 180px;
  float: right;
  height: 0px;

  img {
    height: 34px;
    width: 120px;
  }
}
</style>
