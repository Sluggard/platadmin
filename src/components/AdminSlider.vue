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
        { key: '/index', title: '1' },
        {
          key: '2',
          title: '2',
          children: [
            { key: '2-1', title: '2-1' },
            {
              key: '2-2',
              title: '2-2',
              children: [
                { key: '2-2-1', title: '2-2-1' },
                { key: '2-2-2', title: '2-2-2' }
              ]
            }
          ]
        },
        {
          key: '3',
          title: '3',
          children: [
            { key: '3-1', title: '3-1' },
            { key: '3-2', title: '3-2' }
          ]
        },
        { key: '4', title: '4' }
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
  watch: {
    openKeys(val, oldVal) {
      this.preOpenKeys = oldVal
    },
    collapsed() {
      this.openKeys = this.collapsed ? [] : this.preOpenKeys
    }
  },
  methods: {
    chooseMenu({ item, key, keyPath }) {
      console.log(item, 'item')
      console.log(key, 'key')
      console.log(keyPath, 'keyPath')
    }
  },
  computed: mapState({
    collapsed: state => state.collapsed
  })
}
</script>
