<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.oldPwd" type="password" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.newPwd" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.repeatPwd" type="password" placeholder="确认密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { save } from '@/api/list'
import { bookStatuses, bookTypes } from '@/api/dictionary'
import { updatePwd } from '@/api/password'
export default {
  data() {
    return {
      form: {
        oldPwd: '',
        newPwd: '',
        repeatPwd: ''
      },
      bookStatus: [],
      bookType: []
    }
  },
  created() {
    const info = this.$route.params
    if (info && JSON.stringify(info) !== '{}') {
      this.form = info
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
      const pass = this.form.oldPwd
      const newPass = this.form.newPwd
      const confirmPass = this.form.repeatPwd
      if (pass === '' || newPass === '' || confirmPass === '') {
        this.$alert('请在文本框输入密码！')
        return
      }
      if (pass === newPass) {
        this.$alert('新旧密码不能相同' + pass + ':' + newPass)
        return
      }
      if (newPass !== confirmPass) {
        this.$alert('新密码与确认密码不一致')
        return
      }
      updatePwd(this.form).then(r => {
        if (r.code === 0) {
          this.$router.push({ name: 'list' })
          this.$message('保存成功')
        } else {
          // this.$message('保存失败')
          this.$message(r.message)
        }
      })
    },
    onCancel() {
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
