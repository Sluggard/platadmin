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
  <a-table :columns="columns" :data-source="data" rowKey="id">
    <template #action="{ record }">
      <a-space>
        <a-button size="small" @click="edit(record.id)" type="primary">
          <template #icon>
            <EditOutlined />
          </template>
          编辑
        </a-button>
        <a-button size="small" @click="del(record.id)" type="danger">
          <template #icon>
            <DeleteOutlined />
          </template>
          删除
        </a-button>
      </a-space>
    </template>
    <template #headPortrait="{ text }">
      <img class="head-portrait" :src="text" />
    </template>
    <template #gender="{ text }">
      {{ getGender(text) }}
    </template>

    <template #locked="{text,record }">
      <a-switch :checked="text" @change="lockedChange(record)" />
    </template>
    <template #enable="{text,record }">
      <a-switch :checked="text" @change="enableChange(record)" />
    </template>
    <template #formatDate="{text }">
      {{ format(text) }}
    </template>
    <template #birthDay="{text }">
      {{ birthDay(text) }}
    </template>
  </a-table>
</template>
<script>
import moment from 'moment'
import {
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  LockOutlined,
  UserOutlined,
  EditOutlined
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
    key: 'gender',
    slots: { customRender: 'gender' }
  },
  {
    title: '头像',
    dataIndex: 'headPortrait',
    key: 'headPortrait',
    slots: { customRender: 'headPortrait' }
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
    key: 'birthDay',
    slots: { customRender: 'birthDay' }
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
    key: 'createTime',
    slots: { customRender: 'formatDate' }
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    slots: { customRender: 'formatDate' }
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]
const data = [
  {
    id: 1,
    username: 'zhangsan',
    gender: 'MAN',
    headPortrait:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608127667936&di=541f4b27697d6309f11ca898e653412a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg',
    realName: '张三',
    age: 20,
    telephone: 18306079883,
    idNo: '500227199508263122',
    birthDay: 19950820,
    enable: true,
    locked: false,
    createTime: 1607682214000,
    updateTime: 1607682214000
  },
  {
    id: 2,
    username: 'zhangsan',
    gender: 'FEMALE',
    headPortrait:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608127667936&di=541f4b27697d6309f11ca898e653412a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg',
    realName: '张三',
    age: 20,
    telephone: 18306079883,
    idNo: '500227199508263122',
    birthDay: 19950820,
    enable: true,
    locked: false,
    createTime: 1607682214000,
    updateTime: 1607682214000
  },
  {
    id: 3,
    username: 'zhangsan',
    gender: 'MAN',
    headPortrait: null,
    realName: '张三',
    age: 20,
    telephone: 18306079883,
    idNo: '500227199508263122',
    birthDay: 1607682214000,
    enable: true,
    locked: false,
    createTime: 1607682214000,
    updateTime: 1607682214000
  },
  {
    id: 4,
    username: 'zhangsan',
    gender: 'MAN',
    headPortrait: null,
    realName: '张三',
    age: 20,
    telephone: 18306079883,
    idNo: '500227199508263122',
    birthDay: 1607682214000,
    enable: true,
    locked: false,
    createTime: 1607682214000,
    updateTime: 1607682214000
  },
  {
    id: 5,
    username: 'zhangsan',
    gender: 'MAN',
    headPortrait: null,
    realName: '张三',
    age: 20,
    telephone: 18306079883,
    idNo: '500227199508263122',
    birthDay: 1607682214000,
    enable: true,
    locked: false,
    createTime: 1607682214000,
    updateTime: 1607682214000
  }
]
export default {
  name: 'upms-user',
  components: {
    DownloadOutlined,
    UploadOutlined,
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined,
    LockOutlined,
    UserOutlined,
    EditOutlined
  },
  data() {
    return {
      data,
      columns,
      searchForm: {
        username: '',
        gender: ''
      }
    }
  },
  methods: {
    search() {},
    lockedChange(record) {
      this.data.forEach(elemnt => {
        if (elemnt === record) {
          elemnt.locked = !elemnt.locked
        }
      })
    },
    enableChange(record) {
      this.data.forEach(elemnt => {
        if (elemnt === record) {
          elemnt.enable = !elemnt.enable
        }
      })
    },
    edit(id) {
      console.log(id)
    },
    del(id) {
      console.log(id)
    },
    format(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    getGender(gender) {
      return gender === 'MAN' ? '男' : '女'
    },
    birthDay(timestamp) {
      return moment(timestamp).format('YYYY年MM月DD日')
    }
  }
}
</script>
<style lang="scss" scoped>
.head-portrait {
  width: 60px;
  height: 60px;
}
</style>
