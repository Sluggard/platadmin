<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="changeCollapsed"
    />
    <menu-fold-outlined v-else class="trigger" @click="changeCollapsed" />
    <a-dropdown class="userinfo" placement="bottomCenter">
      <span>
        <a-avatar shape="square">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <span class="username">系统管理员</span>
      </span>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <span>个人信息</span>
          </a-menu-item>
          <a-menu-item>
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
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { mapState, mapMutations } from 'vuex'
import { constVar } from '@/config/config'
export default {
  name: 'admin-header',
  data() {
    return {}
  },
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  computed: mapState({
    collapsed: state => state.collapsed
  }),
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
.userinfo {
  float: right;
  margin: 0 30px;
  .username {
    margin: 0 10px;
  }
}
</style>
