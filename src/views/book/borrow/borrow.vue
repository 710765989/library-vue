<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item style="display: none">
        <el-input v-model="form.bookId" disabled />
      </el-form-item>
      <el-form-item label="书名">
        <el-input v-model="form.name" disabled />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" disabled />
      </el-form-item>
      <el-form-item label="书籍类型">
        <el-select v-model="form.type" placeholder="选择书籍类型" disabled>
          <el-option
            v-for="item in bookType"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="借阅状态">
        <el-select v-model="form.status" placeholder="选择借阅状态" disabled>
          <el-option
            v-for="item in bookStatus"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="归还时间">
        <el-date-picker v-model="form.returnTime" value-format="yyyy-MM-dd 23:59:59" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// export default {
//   name: 'info.vue'
// }
import { save } from '@/api/borrow'
import { bookStatuses, bookTypes } from '@/api/dictionary'
export default {
  data() {
    return {
      form: {
        bookId: '',
        name: '',
        author: '',
        type: '',
        status: '',
        returnTime: ''
      },
      bookType: [],
      bookStatus: []
    }
  },
  created() {
    const info = this.$route.params
    if (info && JSON.stringify(info) !== '{}') {
      info.bookId = info.id
      this.form = info
      console.log(info)
    }
    bookStatuses().then(r => {
      if (r.code === 0) {
        this.bookStatus = r.data
        console.log(r.data)
      } else {
        console.log(r.message)
      }
    })
    bookTypes().then(r => {
      if (r.code === 0) {
        this.bookType = r.data
        console.log(r.data)
      } else {
        console.log(r.message)
      }
    })
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      save(this.form).then(r => {
        if (r.code === 0) {
          this.$router.push({ name: 'list' })
          this.$message('保存成功')
        } else {
          this.$message('保存失败')
        }
      })
    },
    onCancel() {
      // this.$message({
      //   message: 'cancel!',
      //   type: 'warning'
      // })
      history.back()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
