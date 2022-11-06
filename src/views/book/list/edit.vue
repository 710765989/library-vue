<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="书名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" />
      </el-form-item>
      <el-form-item label="书籍类型">
        <el-select v-model="form.type" placeholder="选择书籍类型">
          <el-option label="教育" value="1" />
          <el-option label="工具" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="借阅状态">
        <el-select v-model="form.status" placeholder="选择借阅状态">
          <el-option label="在库" value="0" />
          <el-option label="借出" value="1" />
        </el-select>
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
import { save } from '@/api/list'
export default {
  data() {
    return {
      form: {
        name: '',
        author: '',
        type: '',
        status: ''
      }
    }
  },
  created() {
    const info = this.$route.params
    console.log(info)
    if (info && JSON.stringify(info) !== '{}') {
      console.log(info)
      this.form = info
    }
  },
  methods: {
    onSubmit() {
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
