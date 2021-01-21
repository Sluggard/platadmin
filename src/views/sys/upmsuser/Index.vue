<template>
  <a-row>
    <a-col class="excel" :span="10">
      <a-space>
        <a-button type="primary" @click="toAdd">
          <template #icon>
            <PlusOutlined />
          </template>
          添加
        </a-button>
        <a-button type="primary" @click="exportExcel">
          <template #icon>
            <DownloadOutlined />
          </template>
          excel导出
        </a-button>
        <a-button type="primary" @click="templateDownload">
          <template #icon>
            <DownloadOutlined />
          </template>
          excel模板下载
        </a-button>
        <a-upload
          :accept="accept"
          :showUploadList="false"
          name="file"
          :action="action"
          :headers="headers"
          @change="uploadSuccess"
        >
          <a-button> <UploadOutlined /> excel导入 </a-button>
        </a-upload>
        <a-button type="danger" @click="batchDel">
          <template #icon>
            <DeleteOutlined />
          </template>
          删除
        </a-button>
      </a-space>
    </a-col>
    <a-col :span="14">
      <a-form layout="inline" :model="searchForm" @submit="search">
        <a-form-item>
          <a-input
            v-model:value="searchForm.queryParam.username"
            placeholder="用户名"
          >
            <template #prefix
              ><UserOutlined style="color:rgba(0,0,0,.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-model:value="searchForm.queryParam.realName"
            placeholder="姓名"
          >
            <template #prefix
              ><UserOutlined style="color:rgba(0,0,0,.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-select
            v-model:value="searchForm.queryParam.gender"
            style="width: 120px"
            placeholder="请选择"
            @change="handleGenderChange"
            allowClear
          >
            <a-select-option value="MAN">
              男
            </a-select-option>
            <a-select-option value="FEMALE">
              女
            </a-select-option>
            <a-select-option value="SECRET">
              保密
            </a-select-option>
          </a-select>
          <!-- <a-input
            
            placeholder="性别"
          >
            <template #prefix
              ><LockOutlined style="color:rgba(0,0,0,.25)"
            /></template>
          </a-input> -->
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
  <a-table
    size="small"
    :columns="columns"
    :data-source="data"
    rowKey="id"
    :scroll="scrollSize"
    @change="change"
    :pagination="{
      current: searchForm.current,
      pageSize: searchForm.pageSize,
      pageSizeOptions: pagination.pageSizeOptions,
      showSizeChanger: true,
      total: pagination.total,
      showTotal: showTotal
    }"
    :row-selection="rowSelection"
  >
    <template #action="{ record }">
      <a-space>
        <a-button size="small" @click="edit(record.id)" type="primary">
          <template #icon>
            <EditOutlined />
          </template>
          编辑
        </a-button>
        <a-button size="small" @click="del(record)" type="danger">
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
    <template #sortNo="{index }">
      {{ index + 1 }}
    </template>
  </a-table>
</template>
<script>
import moment from 'moment'
import userApi from '@/api/user'
import { createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { constVar, uploads } from '@/config/config'
import {
  QuestionOutlined,
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
  EditOutlined
} from '@ant-design/icons-vue'
const columns = [
  {
    width: 80,
    title: '序号',
    key: 'sortNo',
    slots: { customRender: 'sortNo' },
    fixed: 'left'
  },
  {
    width: 120,
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    fixed: 'left'
  },
  {
    width: 120,
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    slots: { customRender: 'gender' }
  },
  {
    width: 120,
    title: '头像',
    dataIndex: 'headPortrait',
    key: 'headPortrait',
    slots: { customRender: 'headPortrait' }
  },
  {
    width: 120,
    title: '姓名',
    dataIndex: 'realName',
    key: 'realName'
  },
  {
    width: 120,
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    width: 200,
    title: '身份证号码',
    dataIndex: 'idNo',
    key: 'idNo'
  },
  {
    width: 150,
    title: '电话号码',
    dataIndex: 'telephone',
    key: 'telephone'
  },
  {
    width: 150,
    title: '出生日期',
    dataIndex: 'birthDay',
    key: 'birthDay',
    slots: { customRender: 'birthDay' }
  },
  {
    width: 120,
    title: '状态',
    dataIndex: 'enable',
    key: 'enable',
    slots: { customRender: 'enable' }
  },
  {
    width: 120,
    title: '锁定',
    dataIndex: 'locked',
    key: 'locked',
    slots: { customRender: 'locked' }
  },
  {
    width: 200,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    slots: { customRender: 'formatDate' }
  },
  {
    width: 200,
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    slots: { customRender: 'formatDate' }
  },
  {
    width: 160,
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
    fixed: 'right'
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
    UserOutlined,
    EditOutlined
  },
  data() {
    return {
      addModal: true,
      data: [],
      deletedIds: [],
      columns,
      scrollSize: { x: 1800, y: 400 },
      pagination: {
        pageSizeOptions: ['8', '10', '20', '50'],
        total: 10
      },
      searchForm: {
        current: 1,
        pageSize: 8,
        queryParam: { realName: null, username: null, gender: null }
      },
      rowSelection: {
        onChange: selectedRowKeys => {
          this.deletedIds = selectedRowKeys
        }
        // onSelect: (record, selected, selectedRows) => {
        //   this.deletedIds.push(record)
        //   console.log(record, selected, selectedRows)
        // },
        // onSelectAll: (selected, selectedRows, changeRows) => {
        //   console.log(selected, selectedRows, changeRows)
        // }
      },
      accept:
        'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      action: uploads.userInfoUrl,
      headers: {
        authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem(constVar.tokenInfoKey)).access_token
      }
    }
  },
  mounted() {
    this.search()
  },
  created() {
    window.addEventListener('resize', this.resizeWindow)
    this.resizeWindow()
  },
  methods: {
    resizeWindow() {
      if (window.innerHeight - 320 > this.scrollSize.y) {
        this.scrollSize.y = window.innerHeight - 320
      }
    },
    search() {
      userApi.userPageQuery(this.searchForm).then(res => {
        if (res.code === 200) {
          this.data = res.data.records
          this.searchForm.current = res.data.current
          this.searchForm.pageSize = res.data.size
          this.pagination.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    lockedChange(record) {
      let params = {
        id: record.id,
        status: !record.enable
      }
      userApi.lockStatus(params).then(res => {
        if (res.code === 200) {
          this.data.forEach(elemnt => {
            if (elemnt === record) {
              elemnt.locked = !elemnt.locked
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    enableChange(record) {
      let params = {
        id: record.id,
        status: !record.enable
      }
      userApi.changeStatus(params).then(res => {
        if (res.code === 200) {
          this.data.forEach(elemnt => {
            if (elemnt === record) {
              elemnt.enable = !elemnt.enable
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    toAdd() {
      this.$router.push({ path: '/userInfo', query: { type: 0 } })
    },
    edit(id) {
      this.$router.push({ path: '/userInfo', query: { type: 1, id: id } })
    },
    batchDel() {
      let that = this
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionOutlined),
        content: '确定删除选中用户吗？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          userApi.deleteUser(that.deletedIds).then(res => {
            console.log(res.code)
            if (res.code === 200) {
              that.$message.info('删除成功！')
              that.search()
            } else {
              that.$message.error('删除失败！')
            }
          })
        }
      })
    },
    del(record) {
      let that = this
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionOutlined),
        content: '确定删除用户【' + record.realName + '】吗？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          userApi.deleteUser(record.id).then(res => {
            console.log(res.code)
            if (res.code === 200) {
              that.$message.info('删除成功！')
              that.search()
            } else {
              that.$message.error('删除失败！')
            }
          })
        }
      })
    },
    format(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    getGender(gender) {
      return gender === 'MAN' ? '男' : '女'
    },
    birthDay(timestamp) {
      return moment(timestamp).format('YYYY年MM月DD日')
    },
    showTotal: (total, range) => {
      return range[0] + '-' + range[1] + ' 共' + total + '条'
    },
    change(pagination) {
      this.searchForm.current = pagination.current
      this.searchForm.pageSize = pagination.pageSize
      this.search()
    },
    handleGenderChange(value) {
      this.gender = value
    },
    exportExcel() {
      userApi.export(this.searchForm.queryParam).then(res => {
        const link = document.createElement('a')
        const blob = new Blob([res], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.download = '统计表' // 下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    templateDownload() {
      userApi.templateExport().then(res => {
        const link = document.createElement('a')
        const blob = new Blob([res], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.download = '统计表' // 下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    uploadSuccess(info) {
      if (info.file.status === 'done') {
        if (info.file.response.code === 200) {
          this.$message.info('上传成功')
          this.search()
        } else {
          this.$message.error('上传失败，请稍后再试')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.head-portrait {
  width: 60px;
  height: 60px;
}
.excel {
  margin-top: 4px;
}
</style>
