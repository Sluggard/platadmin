<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      :mode="mode"
      :theme="theme"
      @click="chooseMenu"
    >
      <menuList v-for="menu in menuList" :menu="menu" :key="menu.key" />
    </a-menu>
  </a-layout-sider>
</template>
<script>
import { mapState } from 'vuex'
import menuList from './MenuList'
export default {
  name: 'admin-slider',
  data() {
    return {
      menuList: [
        {
          key: '/system',
          title: '系统设置',
          children: [
            { key: '/user', title: '用户管理' },
            { key: '/userGroup', title: '用户组管理' },
            { key: '/role', title: '角色管理' },
            { key: '/menu', title: '菜单管理' },
            { key: '/resource', title: '资源管理' },
            { key: '/organization', title: '组织管理' },
            { key: '/department', title: '职位管理' }
          ]
        }
      ],
      mode: 'inline',
      theme: 'dark',
      selectedKeys: [],
      openKeys: [],
      preOpenKeys: []
    }
  },
  components: {
    menuList
  },
  created() {
    if (this.$route.path !== '/index') {
      this.selectedKeys.push(this.$route.path)
    }
    this.defaltOpenKey(this.menuList)
  },
  watch: {
    $route(to) {
      if (to.path == '/index') {
        this.selectedKeys = []
      }
    },
    openKeys(val, oldVal) {
      this.preOpenKeys = oldVal
    },
    collapsed() {
      this.openKeys = this.collapsed ? [] : this.preOpenKeys
    }
  },
  methods: {
    defaltOpenKey(menuList) {
      for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].children && this.defaltOpenKey(menuList[i].children)) {
          this.openKeys.push(menuList[i].key)
        } else if (menuList[i].key == this.$route.path) {
          this.openKeys.push(menuList[i].key)
          return true
        }
        return false
      }
    },
    chooseMenu({ item, key, keyPath }) {
      console.log(item, 'item')
      console.log(key, 'key')
      console.log(keyPath, 'keyPath')
      if (this.$router.path !== key) {
        this.$router.push({ path: key })
      }
    }
  },
  computed: mapState({
    collapsed: state => state.collapsed
  })
}
</script>
<style lang="scss" scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
