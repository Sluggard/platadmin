<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default {
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px; /*滚动条宽度*/
  height: 8px; /*滚动条高度*/
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -box-shadow: inset 0 0 2px rgba(173, 158, 158, 0.3);
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: rgb(226, 221, 221); /*滚动条的背景颜色*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  -box-shadow: inset 0 0 2px rgba(184, 169, 169, 0.3);
  background-color: rgb(60, 178, 214); /*滚动条的背景颜色*/
}
</style>
