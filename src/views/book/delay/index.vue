<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
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
          {{ scope.row.book.name }}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.book.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预计归还时间" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.borrow.returnTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际归还时间" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.borrow.realReturnTime }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="延期天数" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}天</span>
        </template>
      </el-table-column>
<!--      <el-table-column class-name="status-col" label="实际归还时间" width="110" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.realReturnTime }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column class-name="status-col" label="操作" width="300" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <template v-if="scope.row.status === '1'">-->
<!--            <el-button type="primary" @click="returnBook(scope.row.id)">归还</el-button>-->
<!--            <el-button type="warning" @click="edit(scope.row)">续借</el-button>-->
<!--          </template>-->
<!--&lt;!&ndash;          <el-button :type="scope.row.delFlag | delFilter" @click="enable(scope.row.id, scope.row.delFlag)">{{ scope.row.delFlag === "1" ? "启用" : "停用" }}</el-button>&ndash;&gt;-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column class-name="status-col" label="操作" width="300" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <template v-if="scope.row.delFlag === '0' && scope.row.status === '0'">-->
<!--            <el-button type="primary" @click="borrow(scope.row)">借阅</el-button>-->
<!--          </template>-->
<!--          <el-button type="warning" @click="edit(scope.row)">编辑</el-button>-->
<!--          <el-button :type="scope.row.delFlag | delFilter" @click="enable(scope.row.id, scope.row.delFlag)">{{ scope.row.delFlag === "1" ? "启用" : "停用" }}</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
  </div>
</template>
<style>
.el-form > .el-button ,.el-select, .el-input {
  margin-right: 5px;
}
</style>
<script>
import { list, returnBook } from '@/api/delay'

export default {
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
    // query() {
    //   this.listLoading = true
    //   getList(this.form).then(response => {
    //     this.list = response.data
    //     this.listLoading = false
    //   })
    // },
    create() {
      this.$router.push({ name: 'edit' })
    },
    edit(info) {
      this.$router.push({ name: 'edit', params: info })
    },
    returnBook(id) {
      // this.$router.push({ name: 'borrow', params: info })
      returnBook(id).then(r => {
        if (r.code === '0') {
          this.fetchData()
          this.$message('操作成功')
        } else {
          this.$message('操作成功')
        }
      })
    },
    // enable(id, delFlag) {
    //   enable({ id: id, delFlag: delFlag }).then(r => {
    //     if (r.code === 0) {
    //       this.$router.push({ name: 'list' })
    //       // 刷新数据
    //       this.query()
    //       this.$message('操作成功')
    //     } else {
    //       this.$message('操作失败')
    //     }
    //   })
    // }
  }
}
</script>
