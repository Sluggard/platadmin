<template>
  <a-row>
    <a-col :span="12">
      <a-space>
        <a-button type="primary">
          <template #icon>
            <PlusOutlined />
          </template>
          添加
        </a-button>
        <a-button type="primary">
          <template #icon>
            <UploadOutlined />
          </template>
          上传
        </a-button>
        <a-button type="primary">
          <template #icon>
            <DownloadOutlined />
          </template>
          下载
        </a-button>
        <a-button type="danger">
          <template #icon>
            <DeleteOutlined />
          </template>
          删除
        </a-button>
      </a-space>
    </a-col>
    <a-col :span="12">
      <a-form layout="inline" :model="searchForm" @submit="search">
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
          <a-button type="primary" html-type="submit">
            <template #icon>
              <SearchOutlined />
            </template>
            查询
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
  <a-divider></a-divider>
</template>
<script>
import {
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'
export default {
  name: 'upms-user',
  components: {
    DownloadOutlined,
    UploadOutlined,
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined
  },
  data() {
    return {
      searchForm: {
        date: '',
        username: '',
        gender: ''
      }
    }
  },
  methods: {
    search() {}
  }
}
</script>
