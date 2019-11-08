<template>
  <div class="login">
    <div class="container">
      <div class="content">
        <h2>后台管理系统</h2>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名称"
              prefix-icon="iconfont icon-wo"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入登录密码"
              prefix-icon="iconfont icon-suo"
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="login-btn" @click="login"
            >登录</el-button
          >
        </el-form>
      </div>
      <div class="footer">Copyright © , All Rights Reserved.</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请填写用户账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写登录密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //登录
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // console.log(valid);
          //验证通过,发起请求
          this.$axios({
            url: "api/admin/login",
            method: "post",
            data: {
              username: this.loginForm.username,
              password: this.loginForm.password
            }
          })
            .then(res => {
              // console.log(res);
              //存储token
              localStorage.setItem("picc_token", res.data.data.authorization);
              
              if (res.data.code === 400) {
                //如果错误,弹出提示
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              } else {
                //路由跳转
                this.$router.push({ name: "Home" });
              }
            })
            .catch(() => {
              this.$message({
                message: "服务器异常,请重试",
                type: "error"
              });
            });
        } else {
          //给用户提示
          this.$message({
            message: "数据输入不合法",
            type: "error"
          });
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  .container {
    overflow: hidden;
    .content {
      margin: 100px auto;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 0 8px 4px #ccc;
      width: 350px;
      height: 420px;
      padding: 0 25px;

      h2 {
        font-size: 26px;
        text-align: center;
        font-weight: 700;
        padding: 70px 0 40px 0;
      }

      .login-btn {
        width: 100%;
      }
    }
    .footer {
      color: #fff;
      position: fixed;
      bottom: 0;
      height: 100px;
      line-height: 100px;
      text-align: center;
      width: 100%;
      background-color: #ccc;
    }
  }
}
</style>
