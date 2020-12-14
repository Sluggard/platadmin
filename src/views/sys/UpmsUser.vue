<template>
  <a-row>
    <a-col>
      <a-space>
        <a-button type="primary">
          添加
        </a-button>
        <a-button type="primary">
          导入
        </a-button>
        <a-button type="primary">
          导出
        </a-button>
        <a-button type="danger">
          删除
        </a-button>
      </a-space>
    </a-col>
    <a-col :offset="4"
      ><a-form layout="inline" :model="searchForm" @submit="search">
        <a-form-item>
          <a-input v-model:value="searchForm.username" placeholder="用户名">
            <template #prefix
              ><UserOutlined style="color:rgba(0,0,0,.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="searchForm.gender" placeholder="性别">
            <template #prefix
              ><LockOutlined style="color:rgba(0,0,0,.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-range-picker v-model:value="value3" @change="onChange" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            查询
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
  <a-divider></a-divider>
</template>
<script>
export default {
  name: 'upms-user',
  data() {
    return {
      searchForm: {}
    }
  },
  methods: {
    search() {}
  }
}
</script>
