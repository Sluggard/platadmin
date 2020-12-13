<template>
  <a-menu-item v-if="!menu.children" :key="menu.key">
    {{ menu.title }}
  </a-menu-item>
  <a-sub-menu v-else :key="menu.key">
    <template #title>
      <MenuFoldOutlined />
      <span> {{ menu.title }}</span>
    </template>
    <menu-list
      v-for="subMenu in menu.children"
      :menu="subMenu"
      :key="subMenu.key"
    />
  </a-sub-menu>
</template>
<script>
import { MenuFoldOutlined } from '@ant-design/icons-vue'
export default {
  // 必须要写name, 否则在组件内部使用TreeNode标签将无法解析
  name: 'menuList',
  components: { MenuFoldOutlined },
  props: ['menu'],
  data: function() {
    return {}
  }
}
</script>
