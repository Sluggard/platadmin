<template>
  <a-layout-content
    :style="{
      margin: '24px 16px',
      padding: '24px',
      background: '#fff'
    }"
  >
    <router-view />
  </a-layout-content>
</template>
<script>
export default {
  name: 'admin-content'
}
</script>
<style lang="scss">
.ant-layout-content {
  height: 100%;
  min-width: 1500px;
}
</style>
