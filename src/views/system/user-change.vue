<template>
  <el-dialog :visible.sync="dialogVisible" :title="dialogType ? '编辑用户' : '新增用户'" width="650px" top="10vh" :close-on-click-modal="false">
    <el-form v-loading="dialogLoading" ref="dialogForm" :model="dialogModel" :validate-on-rule-change="false" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户账号" prop="username">
            <el-input v-model="dialogModel.username" maxlength="15" placeholder="请输入用户账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="!dialogModel.id">
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="dialogModel.password" type="password" maxlength="20" show-password placeholder="请输入用户密码" autocomplete="new-password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="角色">
            <el-select v-model="dialogModel.type" placeholder="请选择角色" class="fullWidth">
              <el-option
                v-for="(item, i) in roleOptions"
                :label="item.roleName"
                :value="item.roleId"
                :key="i">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="dialogSubmitLoading">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getUserOne, addUser, updateUser } from '@/api/user'
export default {
  name: 'UserChange',
  data() {
    return {
      initPassword: '123456',
      dialogVisible: false,
      dialogLoading: false,
      dialogType: 0,
      roleOptions: [],
      dialogModel: {},
      dialogSubmitLoading: false
    }
  },
  created() {
  },
  methods: {
    handleChange(row = {id: 0}) {
      const {id} = row
      this.dialogType = id ? 1 : 0
      this.dialogModel = id ? Object.assign({}, row) : {
        id,
        username: '',
        password: this.initPassword,
        type: ''
      }
      // this.$utils.clearValidate(this)
      setTimeout(() => {
        this.dialogVisible = true
        this.dialogLoading = true
      }, 0)
      getUserOne(id).then(res => {
        const {posts = [], roles = [], postIds = [], roleIds = []} = res
        this.postOptions = posts
        this.roleOptions = [{'roleId': '0', 'roleName': '管理员'},
          {'roleId': '1', 'roleName': '普通用户'}]
        Object.assign(this.dialogModel, {postIds, roleIds})
        this.dialogLoading = false
      })
    },
    handleSubmit() {
      const actionAPI = this.dialogType ? updateUser : addUser
      const message = this.dialogType ? '编辑成功' : '新增成功'
      this.dialogSubmitLoading = true
      actionAPI(this.dialogModel).then(() => {
        this.$emit('ok')
        this.$message(message)
        this.dialogVisible = false
        this.dialogSubmitLoading = false
      }, () => {
        this.dialogSubmitLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
