<template>
  <span v-if="type == 0">添加用户</span>
  <span v-else>修改用户</span>
  <a-divider></a-divider>
  <a-form
    class="user-add-form"
    layout="inline"
    :model="upmsUser"
    :labelCol="{ style: 'width:80px' }"
    labelAlign="right"
    :rules="rules"
    ref="submitUserForm"
  >
    <a-row>
      <a-col :span="6" :offset="4">
        <a-form-item
          label="头像"
          :labelCol="{ style: 'line-height: 102px;width:80px' }"
        >
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img
              v-if="upmsUser.headPortrait"
              :src="upmsUser.headPortrait"
              alt="avatar"
              style="width: 102px;height:102px"
            />
            <div v-else>
              <!-- todo -->
              <loading-outlined v-if="loading" />
              <plus-outlined v-else />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <!-- <a-input v-model:value="upmsUser.headPortrait" placeholder="头像">
        </a-input> -->
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-line">
      <a-col :span="6" :offset="4">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="upmsUser.username" placeholder="用户名">
          </a-input>
        </a-form-item>
        <a-form-item label="姓名" name="realName">
          <a-input v-model:value="upmsUser.realName" placeholder="姓名">
          </a-input>
        </a-form-item>
        <a-form-item label="身份证" name="idNo">
          <a-input v-model:value="upmsUser.idNo" placeholder="身份证">
          </a-input>
        </a-form-item>
        <a-form-item label="手机号码" name="telephone">
          <a-input v-model:value="upmsUser.telephone" placeholder="手机号码">
          </a-input>
        </a-form-item>
        <a-form-item label="年龄">
          <a-input-number
            style="width:194px"
            v-model:value="upmsUser.age"
            :min="1"
            @change="ageChange"
          />
        </a-form-item>
      </a-col>
      <a-col :span="6" :offset="4">
        <a-form-item label="密码" name="password">
          <a-input
            :disabled="type == 0 ? false : true"
            :type="type == 0 ? 'text' : 'password'"
            v-model:value="upmsUser.password"
            placeholder="密码"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="出生日期" name="birthday">
          <a-date-picker
            :allowClear="false"
            v-model:value="upmsUser.birthday"
            @change="birthday"
          />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group name="radioGroup" v-model:value="upmsUser.gender">
            <a-radio value="MAN">
              男
            </a-radio>
            <a-radio value="FEMALE">
              女
            </a-radio>
            <a-radio value="SECRET">
              保密
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group name="radioGroup" v-model:value="upmsUser.enable">
            <a-radio :value="true">
              启用
            </a-radio>
            <a-radio :value="false">
              禁用
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="锁定">
          <a-radio-group name="radioGroup" v-model:value="upmsUser.locked">
            <a-radio :value="false">
              未锁定
            </a-radio>
            <a-radio :value="true">
              已锁定
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :offset="4">
        <a-form-item label="备注">
          <a-textarea
            style="width:100%"
            v-model:value="upmsUser.remark"
            :cols="120"
            :rows="4"
          >
          </a-textarea>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <a-row justify="center" class="btn-group">
    <a-space size="large">
      <a-button @click="save" type="primary" :disabled="submitLoading"
        >保存</a-button
      >
      <a-button @click="$router.back(-1)">返回</a-button>
    </a-space>
  </a-row>
</template>
<script>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'
import userApi from '@/api/user'
export default {
  name: 'userinfo',
  components: {
    PlusOutlined,
    LoadingOutlined
  },
  data() {
    return {
      loading: false,
      // 类型 0 新增 1 修改
      type: 0,
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          },
          {
            pattern: /[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*/,
            message: '用户名由大小写字母及数字组成',
            trigger: 'blur'
          }
        ],
        birthday: [
          {
            type: 'date',
            required: true,
            message: '出生日期不能为空',
            trigger: 'blur'
          }
        ],
        realName: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }
        ],
        idNo: [
          {
            required: true,
            message: '身份证号码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: '身份证号码格式错误',
            trigger: 'blur'
          }
        ],
        telephone: [
          {
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: '手机号码格式错误',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      },
      upmsUser: {
        id: null,
        username: null,
        password: null,
        headPortrait: null,
        realName: null,
        gender: 'SECRET',
        age: 1,
        idNo: null,
        telephone: null,
        birthDay: null,
        birthday: null,
        remark: null,
        enable: true,
        locked: false,
        createTime: null,
        updateTime: null,
        version: null
      }
    }
  },
  mounted() {
    this.type = this.$route.query.type
    if (this.$route.query.type == 1) {
      userApi.getUserById(this.$route.query.id).then(res => {
        if (res.code == 200) {
          this.upmsUser = res.data
          this.upmsUser.birthday = moment(this.upmsUser.birthDay)
        }
      })
    }
  },
  methods: {
    ...mapMutations(['openLoading', 'closeLoading']),
    save() {
      this.$refs.submitUserForm.validate().then(() => {
        this.openLoading()
        if (this.upmsUser.id) {
          // 更新用户
          userApi.updateUser(this.upmsUser).then(res => {
            this.closeLoading()
            if (res.code === 200) {
              this.$message.info('保存成功', this.back())
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          // 新增用户
          userApi.saveUser(this.upmsUser).then(res => {
            this.closeLoading()
            if (res.code === 200) {
              this.$message.info('保存成功', this.back())
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    back() {
      let that = this
      setTimeout(function() {
        that.$router.back(-1)
      }, 500)
    },
    ageChange(value) {
      this.upmsUser.age = value
    },
    birthday(date) {
      if (date) {
        this.upmsUser.birthDay = date.valueOf()
        this.upmsUser.birthday = moment(date.valueOf())
      }
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      // if (info.file.status === 'done') {
      // }
      // if (info.file.status === 'error') {
      //   this.loading = false
      // }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      // if (!isJpgOrPng) {
      // }
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      // }
      // return isJpgOrPng && isLt2M
      return isJpgOrPng
    }
  },
  computed: mapState({
    submitLoading: state => state.submitLoading
  })
}
</script>
<style lang="scss" scoped>
.user-add-form {
  width: 100%;
  .form-line .ant-form-item {
    height: 60px;
  }
  .avatar-uploader > .ant-upload {
    padding: 0 auto !important;
    width: 128px;
    height: 128px;
  }
}
.btn-group {
  margin-top: 50px;
}
</style>
