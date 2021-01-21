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
</template>
<script>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import { mapState, mapMutations } from 'vuex'
import { constVar } from '@/config/config'

export default {
  name: 'admin-header',
  data() {
    return {
      routes: [],
      user: null
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
