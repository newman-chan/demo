<!-- 账号管理 -->
<template>
  <div class="account">
    <!-- 面包屑 -->
    <div class="bread">
      管理员 > 账号设置
    </div>
    <div class="container">
      <div class="admin">
        <div class="box1">
          <div class="head"></div>
          <div class="change">
            {{info.username}}
          </div>
          <div class="change">
            <!-- 更换图片 -->
          </div>
        </div>
        <div class="box2">
          <div>
            <span>昵称</span>
            <span>{{info.username}}</span>
          </div>
          <div>
            <span>手机号</span>
            <span>{{info.phone}}</span>
          </div>
          <div>
            <span>性别</span>
            <span></span>
          </div>
          <div>
            <span>创建时间</span>
            <span>{{info.create_time}}</span>
          </div>
        </div>
        <div class="box2">
          <div>
            <span>姓名</span>
            <span></span>
          </div>
          <div>
            <span>邮箱</span>
            <span>{{info.email}}</span>
          </div>
          <div>
            <span>角色名称</span>
            <span></span>
          </div>
          <div>
            <span>最后登录时间</span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="save" @click="showPopup">
        修改密码
      </div>
    </div>
    <div class="mask" v-show="isShow">
      <div class="popup">
        <h1>修改密码</h1>
        <input type="password" v-model="pwd" />
        <div class="canel">
          <div @click="handleSave(1)">保存</div>
          <div @click="handleSave(2)">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      isShow: false,
      pwd: ''
    }
  },
  mounted() {
    this.$axios({
      url: '/api/admin/admin-info'
    }).then(res => {
      console.log(res);
      this.info = res.data.data
    })
  },
  methods: {
    handleSave(index) {
      if (index === 1) {
        this.$axios({
          url: '/api/admin/admin-pwd',
          method: 'post',
          data: {
            pwd: this.pwd
          }
        }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.pwd=''
            this.showPopup()
          }
        })
      }
      if (index === 2) {
        this.showPopup()
      }
    },
    showPopup() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style lang="less" scoped>
.account {
  // width: 1100px;
  padding: 20px;

  .mask {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 100;
    .popup {
      width: 300px;
      height: 300px;
      background-color: #fff;
      position: absolute;
      top: 200px;
      left: 400px;
      padding: 30px;
      border: 1px solid #ccc;

      h1 {
        padding-bottom: 10px;
      }

      div {
        font-size: 14px;
        div {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid #000;
          cursor: pointer;

          &:first-child {
            margin-right: 20px;
            color: #fff;
            background-color: #77b79f;
            border: none;
          }
          &:hover {
            background-color: blue;
          }
        }
      }
      input {
        margin-top: 30px;
      }
      .canel {
        position: absolute;
        bottom: 20px;
      }
    }
  }

  .bread {
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 30px;
  }
  .container {
    font-size: 16px;

    .admin {
      display: flex;
      // background-color: #e6e;
      width: 100%;
      height: 280px;
      border: 1px solid #ccc;

      .box1 {
        flex: 2;
        border-right: 1px solid #ccc;
        // background-color: aqua;
        .head {
          height: 140px;
          width: 140px;
          background-color: aqua;
          margin: 40px auto 30px;
          border-radius: 70px;
        }
        .change {
          text-align: center;
          font-size: 16px;

          &:last-child {
            color: blue;
            cursor: pointer;
            text-decoration: underline;
            padding-top: 10px;
          }
        }
      }
      .box2 {
        font-size: 16px;
        flex: 3;
        display: flex;
        flex-direction: column;
        div {
          flex: 1;
          display: flex;
          // justify-content: center;
          // align-items: center;
          &:not(:last-child) {
            border-bottom: 1px solid #ccc;
          }
          span {
            flex: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            &:first-child {
              flex: 1;
              width: 110px;
              border-right: 1px solid #ccc;
            }
          }
        }
        &:last-child {
          border-left: 1px solid #ccc;
        }
      }
    }
    .save {
      margin: 60px;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #77b79f;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
