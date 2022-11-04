<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.name" style="width: 20%;" placeholder="输入需要查询的图书名称"/>
        <el-button @click="query"><svg-icon icon-class="search"/></el-button>
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
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="借阅状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.statusValue }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="info">查看</el-button>
          <el-button type="warning" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/list'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        // published: 'success',
        // draft: 'gray',
        // deleted: 'danger'
        0: 'success',
        1: 'gray'
      }
      return statusMap[status]
    },
    btnFilter(type) {
      const statusMap = {
        info: 'blue',
        edit: 'orange',
        delete: 'red'
      }
      return statusMap[status]
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
      console.log('添加书籍')
    },
    info() {
      console.log('图书信息')
    },
    edit(info) {
      console.log('编辑书籍')
      console.log(info)

    },
    del(id) {
      console.log('确定删除' + id + '吗？')
    }
  }
}
</script>
