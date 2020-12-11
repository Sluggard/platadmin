<template>
  <a-layout id="layout-trigger">
    <admin-slider />
    <a-layout>
      <admin-header />
      <admin-content />
    </a-layout>
  </a-layout>
</template>
<script>
import AdminContent from '@/components/AdminContent'
import AdminHeader from '@/components/AdminHeader'
import AdminSlider from '@/components/AdminSlider'
export default {
  name: 'index',
  components: {
    AdminContent,
    AdminHeader,
    AdminSlider
  },
  data() {
    return {
      selectedKeys: ['1'],
      collapsed: false
    }
  }
}
</script>
<style>
#layout-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#layout-trigger .trigger:hover {
  color: #1890ff;
}

#layout-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ant-layout {
  height: 100vh;
}
</style>
