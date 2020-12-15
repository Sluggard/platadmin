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
  <a-table :columns="columns" :data-source="data">
    <a-table-column key="action">
      <template #action="{ title, record }">
        <span>{{ title }} </span>
        {{ record }}
      </template>
      <template #locked="{ title, record }">
        {{ title }}
        <span>{{ record.enable ? '是' : '否' }} </span>
      </template>
    </a-table-column>
  </a-table>
</template>
<script>
import {
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: '头像',
    dataIndex: 'headPortrait',
    key: 'headPortrait'
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    key: 'realName'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '身份证号码',
    dataIndex: 'idNo',
    key: 'idNo'
  },
  {
    title: '电话号码',
    dataIndex: 'telephone',
    key: 'telephone'
  },
  {
    title: '出生日期',
    dataIndex: 'birthDay',
    key: 'birthDay'
  },
  {
    title: '状态',
    dataIndex: 'enable',
    key: 'enable',
    slots: { customRender: 'enable' }
  },
  {
    title: '锁定',
    dataIndex: 'locked',
    key: 'locked',
    slots: { customRender: 'locked' }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]
const data = [
  {
    username: 'zhangsan',
    gender: null,
    headPortrait: null,
    realName: '张三',
    age: 20,
    idNo: '500227199508263122',
    birthDay: 19950820,
    enable: true,
    locked: false,
    createTime: null,
    updateTime: null
  },
  {
    username: 'zhangsan',
    gender: null,
    headPortrait: null,
    realName: '张三',
    age: 20,
    idNo: '500227199508263122',
    birthDay: 19950820,
    enable: true,
    locked: false,
    createTime: null,
    updateTime: null
  },
  {
    username: 'zhangsan',
    gender: null,
    headPortrait: null,
    realName: '张三',
    age: 20,
    idNo: '500227199508263122',
    birthDay: 19950820,
    enable: true,
    locked: false,
    createTime: null,
    updateTime: null
  },
  {
    username: 'zhangsan',
    gender: null,
    headPortrait: null,
    realName: '张三',
    age: 20,
    idNo: '500227199508263122',
    birthDay: 19950820,
    enable: true,
    locked: false,
    createTime: null,
    updateTime: null
  },
  {
    username: 'zhangsan',
    gender: null,
    headPortrait: null,
    realName: '张三',
    age: 20,
    idNo: '500227199508263122',
    birthDay: 19950820,
    enable: true,
    locked: false,
    createTime: null,
    updateTime: null
  }
]
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
      data,
      columns,
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
