<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-button type="primary" @click="$refs.userChange.handleChange()" icon="el-icon-plus">新增</el-button>
      </el-form-item>
<!--      <el-form-item>-->
<!--        <el-input v-model="form.name" style="width: 15%;" placeholder="输入需要查询的图书名称" />-->
<!--        <el-input v-model="form.author" style="width: 15%;" placeholder="输入需要查询的作者" />-->
<!--        <el-select v-model="form.type" style="width: 10%;" placeholder="选择书籍类型">-->
<!--          <el-option label="&#45;&#45; 任意 &#45;&#45;" value="" />-->
<!--          <el-option label="教育" value="1" />-->
<!--          <el-option label="工具" value="2" />-->
<!--        </el-select>-->
<!--        <el-select v-model="form.status" style="width: 10%;" placeholder="选择借阅状态">-->
<!--          <el-option label="&#45;&#45; 任意 &#45;&#45;" value="" />-->
<!--          <el-option label="在库" value="0" />-->
<!--          <el-option label="借出" value="1" />-->
<!--        </el-select>-->
<!--        <el-button @click="query"><svg-icon icon-class="search" /></el-button>-->
<!--        <el-button style="float: right" type="primary" @click="create">添加书籍</el-button>-->
<!--      </el-form-item>-->
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 756px"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="250">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="角色" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="$refs.userChange.handleChange(scope.row)">编辑</el-button>
          <el-button type="warning" @click="handleDelete(scope.row.id)">删除</el-button>
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
import UserChange from "@/views/system/user-change";
import {delUser} from "@/api/user";

export default {
  components: {UserChange},
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
      form: {
        name: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      list().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    create() {
      this.$router.push({ name: 'edit' })
    },
    handleDelete (id) {
      this.$confirm('是否确认删除选择的用户').then(() => {
        delUser(id).then(() => {
          this.fetchData()
          this.$message.success('刪除成功')
        })
      })
    },
  }
}
</script>
