<template>
  <div class="home">
    <div class="aside">
      <div class="logo"></div>
      <div
        :class="activeIndex == index ? 'touch menu' : 'menu'"
        v-for="(item, index) in list"
        :key="index"
        @click="btn(item.url, index)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="right">
      <div class="header">
        <div class="login">
          <div></div>
          <div>管理员</div>
          <div @click="loginout">退出登录</div>
        </div>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { title: "首页", url: "/index/home" },
        { title: "租客管理", url: "/index/zuke" },
        { title: "房东管理", url: "/index/fangdong" },
        { title: "保单管理", url: "/index/baodan" },
        { title: "公安报备", url: "/index/gongan" },
        { title: "消息通知", url: "/index/message" },
        { title: "运营设置", url: "/index/operation" },
        { title: "管理员", url: "/index/management" },
        { title: "账号管理", url: "/index/account" },
        { title: "意见反馈", url: "/index/opinion" },
        { title: "接口管理", url: "/index/interface" }
      ],
      activeIndex: 0
    };
  },
  methods: {
    btn(url, index) {
      this.activeIndex = index;
      // this.$router.push(url);
      this.$router.push(url);
    },
    loginout() {
      localStorage.removeItem("picc_token");
      this.$router.push({ name: "Login" });
    }
  },
  updated () {
    // console.log(this.$route.query);
    if(this.$route.query.index){
    this.activeIndex = this.$route.query.index

    }    
  }
};
</script>

<style lang="less" scoped>
.home {
  // overflow: hidden;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 60px;

  .aside {
    width: 200px;
    // height: 100vh;
    background-color: #f2f2f2;
    // float: left;
    display: inline-block;

    .logo {
      height: 60px;
      background-color: #666666;
    }

    .menu {
      height: 60px;
      line-height: 60px;
      background-color: #e9eaed;
      border-bottom: 1px solid #f2f2f2;
      padding-left: 30px;
      font-size: 16px;

      &:hover {
        background-color: #58b99e;
        color: #fff;
        font-weight: 500;
        cursor: pointer;
      }
    }
    .touch {
      font-weight: 700;
      color: #fff;
      background-color: #58b99e;
    }
  }
  .right {
    overflow: hidden;
    // width: 1180px;
    // float: left;
    font-size: 18px;
    position: absolute;
    left: 200px;
    right: 0;
    display: inline-block;

    .header {
      text-align: center;

      height: 60px;
      line-height: 60px;
      background-color: #595959;
      color: #fff;
      .login {
        float: right;
        font-weight: 400;
        font-size: 14px;
        margin-right: 50px;
        position: relative;
        div {
          display: inline-block;
          &:first-child {
            position: absolute;
            top: 14px;
            left: -20px;
            width: 30px;
            height: 30px;
            border-radius: 15px;
            background-color: coral;
          }
          &:nth-child(2) {
            margin: 0 40px 0 20px;
          }
          &:last-child {
            &:hover {
              cursor: pointer;
              color: blue;
              text-decoration: underline;
            }
          }
        }
      }
      // .top-one {
      //   width: 120px;
      //   float: left;
      //   font-weight: 700;
      //   &:hover {
      //     background-color: #58b99e;
      //     cursor: pointer;
      //   }
      // }
      // .top-two {
      //   width: 120px;
      //   float: left;
      //   font-weight: 500;
      //   &:hover {
      //     background-color: #58b99e;
      //     cursor: pointer;
      //   }
      // }
    }

    .main {
      width: 100%;
      padding: 10px 20px 0 20px;
    }
  }
}
</style>
