<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-button type="primary" @click="$refs.userChange.handleChange()" icon="el-icon-plus" v-if="userType === 'current_manager'">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="$refs.userChange.handleChange(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <UserChange ref="userChange" @ok="fetchData()"></UserChange>
  </div>
</template>
<style>
.el-form > .el-button ,.el-select, .el-input {
  margin-right: 5px;
}
</style>
<script>
import { list } from '@/api/user'
import UserChange from '@/views/system/user-change';
import { delUser } from '@/api/user';
import { getToken } from '@/utils/auth'

export default {
  components: { UserChange },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '0': 'success',
        '1': 'primary'
      }
      return statusMap[status]
    },
    delFilter(delFlag) {
      const statusMap = {
        '0': 'danger',
        '1': 'success'
      }
      return statusMap[delFlag]
    },
    typeFilter(type){
      const typeMap = {
        '0': '管理员',
        '1': '普通用户'
      }
      return typeMap[type]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      userType: getToken(),
      form: {
        name: ''
      }
    }
  },
  created() {
    if (this.userType !== 'current_manager') {
      this.listLoading = false
      this.$alert('权限不足', {
        callback: action => {
          history.back()
        }
      })
      return
    }
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      list().then(response => {
        this.list = response.data
      }).finally(() => {
        this.listLoading = false
      })
    },
    create() {
      this.$router.push({ name: 'edit' })
    },
    handleDelete(id) {
      this.$confirm('是否确认删除选择的用户').then(() => {
        delUser(id).then(() => {
          this.fetchData()
          this.$message.success('刪除成功')
        })
      })
    }
  }
}
</script>
