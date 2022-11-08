<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.name" style="width: 15%;" placeholder="输入需要查询的图书名称" />
        <el-input v-model="form.author" style="width: 15%;" placeholder="输入需要查询的作者" />
        <el-select v-model="form.type" style="width: 10%;" placeholder="选择书籍类型">
          <el-option label="-- 任意 --" value="" />
          <el-option label="教育" value="1" />
          <el-option label="工具" value="2" />
        </el-select>
        <el-select v-model="form.status" style="width: 10%;" placeholder="选择借阅状态">
          <el-option label="-- 任意 --" value="" />
          <el-option label="在库" value="0" />
          <el-option label="借出" value="1" />
        </el-select>
        <el-button @click="query"><svg-icon icon-class="search" /></el-button>
        <el-button style="float: right" type="primary" @click="create">添加书籍</el-button>
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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="书名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="书籍类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.typeText }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="借阅状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.statusText }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.delFlag === '0' && scope.row.status === '0'">
            <el-button type="primary" @click="borrow(scope.row)">借阅</el-button>
          </template>
          <el-button type="warning" @click="edit(scope.row)">编辑</el-button>
          <template v-if="scope.row.status === '0'">
            <el-button :type="scope.row.delFlag | delFilter" @click="enable(scope.row)">{{ scope.row.delFlag === "1" ? "启用" : "停用" }}</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>
.el-form > .el-button ,.el-select, .el-input {
  margin-right: 5px;
}
</style>
<script>
import { getList, enable } from '@/api/list'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        // published: 'success',
        // draft: 'gray',
        // deleted: 'danger'
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
    }
  },
  data() {
    return {
      list: null,
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
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    query() {
      this.listLoading = true
      getList(this.form).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    create() {
      this.$router.push({ name: 'edit' })
    },
    edit(info) {
      this.$router.push({ name: 'edit', params: info })
    },
    borrow(info) {
      this.$router.push({ name: 'borrow', params: info })
    },
    enable(info) {
      const enableText = info.delFlag === '1' ? '启用' : '停用'
      this.$confirm('是否确认' + enableText + '图书《' + info.name + '》？').then(() => {
        enable({ id: info.id, delFlag: info.delFlag }).then(r => {
          if (r.code === 0) {
            this.$router.push({ name: 'list' })
            // 刷新数据
            this.query()
            this.$message('操作成功')
          } else {
            this.$message('操作失败')
          }
        })
      }).catch(r => {
        console.log(r)
      })
    }
  }
}
</script>
