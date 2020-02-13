<template>
  <div class="home">

    <el-container>
      <!-- 侧边栏导航 -->
      <!-- 超级管理员 -->
      <el-aside width="200px" v-if="admin_user.type==1">
        <div style="background-color:#fff;height:60px;line-height:60px;font-size:22px;padding-left:20px">共惠管家</div>
        <!-- <img src="../assets/logo.png" class="logo" alt=""> -->
        <!-- el-menu:整个导航菜单项 -->
        <el-menu :router="true" :unique-opened="true" default-active="/index/home" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="/index/home">
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/index/count">
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item index="/index/tenant">
            <span slot="title">租客管理</span>
          </el-menu-item>
          <el-menu-item index="/index/landlord">
            <span slot="title">房东管理</span>
          </el-menu-item>
          <el-menu-item index="/index/insurance">
            <span slot="title">保单管理</span>
          </el-menu-item>
          <el-menu-item index="/index/report">
            <span slot="title">公安报备</span>
          </el-menu-item>
          <el-menu-item index="/index/notice">
            <span slot="title">消息通知</span>
          </el-menu-item>
          <el-menu-item index="/index/withdrawal">
            <span slot="title">提现管理</span>
          </el-menu-item>
          <el-menu-item index="/index/config">
            <span slot="title">运营管理</span>
          </el-menu-item>
          <el-menu-item index="/index/account">
            <span slot="title">账号设置</span>
          </el-menu-item>
          <!-- el-submenu:一个菜单项 -->
          <el-submenu index="1">
            <template slot="title">
              <span>更多设置</span>
            </template>
            <!-- el-menu-item:这是子项 -->
            <el-menu-item index="/index/opinion">
              <template slot="title">
                <span>意见反馈</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/index/about">
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>关于我们</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- el-submenu:一个菜单项 -->
          <el-submenu index="2">
            <template slot="title">
              <span>权限管理</span>
            </template>
            <!-- el-menu-item:这是子项 -->
            <el-menu-item index="/index/user">
              <template slot="title">
                <span>用户管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/index/roles">
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>角色管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- el-submenu:一个菜单项 -->
          <el-submenu index="3">
            <template slot="title">
              <span>接口管理</span>
            </template>
            <!-- el-menu-item:这是子项 -->
            <el-menu-item index="/index/interface">
              <template slot="title">
                <span>产品管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/index/pay">
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>充值管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 侧边栏导航 -->
      <!-- 普通管理员 -->
      <el-aside width="200px" v-if="admin_user.type==0">
        <div style="background-color:#fff;height:60px;line-height:60px;font-size:22px;padding-left:20px">共惠管家</div>
        <!-- <img src="../assets/logo.png" class="logo" alt=""> -->
        <!-- el-menu:整个导航菜单项 -->
        <el-menu :router="true" :unique-opened="true" default-active="/index/home" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <!-- <el-menu-item index="/index/home">
            <span slot="title">首页</span>
          </el-menu-item> -->
          <el-menu-item index="/index/home">
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="(item,index) in admin_user.permission" :key="index">
            <div v-if="index<8 &&item.hold==1">
              <el-menu-item :index="item.code">
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </div>
            <div v-if="index ==8 &&item.hold==1">
              <el-submenu :index="item.id+''">
                <template slot="title">
                  <span>权限管理</span>
                </template>
                <!-- el-menu-item:这是子项 -->
                <el-menu-item index="/index/user">
                  <template slot="title">
                    <span>用户管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/index/roles">
                  <template slot="title">
                    <!-- <i class="el-icon-location"></i> -->
                    <span>角色管理</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </div>
            <div v-if="index ==9 &&item.hold==1">
              <!-- el-submenu:一个菜单项 -->
              <el-submenu :index="item.id+''">
                <template slot="title">
                  <span>更多设置</span>
                </template>
                <!-- el-menu-item:这是子项 -->
                <el-menu-item index="/index/opinion">
                  <template slot="title">
                    <span>意见反馈</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/index/about">
                  <template slot="title">
                    <!-- <i class="el-icon-location"></i> -->
                    <span>关于我们</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </div>
            <div v-if="index ==10 &&item.hold==1">
              <!-- el-submenu:一个菜单项 -->
              <el-submenu :index="item.id+''">
                <template slot="title">
                  <span>接口管理</span>
                </template>
                <!-- el-menu-item:这是子项 -->
                <el-menu-item index="/index/interface">
                  <template slot="title">
                    <span>产品管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/index/pay">
                  <template slot="title">
                    <!-- <i class="el-icon-location"></i> -->
                    <span>充值管理</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </div>
          </div>
          <el-menu-item index="/index/account">
            <span slot="title">账号设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部栏 -->
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <h1 class="system-title">后台管理系统</h1>
          <div class="welcome">
            <span style="padding-right:10px">您好:</span>
            <!-- <img src="" alt=""> -->
            <span> {{admin_user.username}}</span> &nbsp; &nbsp;
            <div @click="loginout" style="padding-left:10px;color:#5a9cf7;cursor: pointer;">退出</div>
            <!-- <a href="javascript:;">退出</a> -->
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin_user: {},
      activeIndex: 0,
      isShow: false
    };
  },
  methods: {
    btn(url, index) {
      this.activeIndex = index;
      // this.$router.push(url);
      this.$router.push(url);
    },
    loginout() {
      // this.isShow = true;
            this.$confirm(`是否确认退出登录?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('picc_token');
        this.$router.push({
          path: '/login'
        })
 
      })
    },
    handleBtn(index) {
      if (index === 1) {
        localStorage.removeItem('picc_token');
        this.$router.push({
          path: '/login'
        })
      }
      if (index === 2) {
        this.isShow = false;
      }
    }
  },
  created() {
    this.admin_user = JSON.parse(localStorage.getItem('admin_user'))
    console.log(this.admin_user);

  },
  updated() {
    // console.log(this.$route.query);
    if (this.$route.query.index) {
      this.activeIndex = this.$route.query.index

    }
  }
};
</script>

<style lang="less" scoped>
// .home {
//   // overflow: hidden;
//   position: relative;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   padding-bottom: 60px;
//   .mask {
//     position: fixed;
//     width: 100%;
//     top: 0;
//     bottom: 0;
//     z-index: 100;
//     background: rgba(0, 0, 0, 0.6);
//     .popup {
//       width: 300px;
//       height: 180px;
//       background: #fff;
//       box-shadow: 1px 1px 1px #000;
//       margin: 200px auto;
//       text-align: center;
//       font-weight: bold;
//       .message {
//         font-size: 24px;
//         height: 120px;
//         line-height: 120px;
//       }
//       .btn {
//         height: 40px;
//         padding: 10px;
//         div {
//           width: 100px;
//           height: 40px;
//           line-height: 40px;
//           border-radius: 20px;
//           background: #ccc;
//           color: #333;
//           font-size: 20px;
//           cursor: pointer;
//         }
//         &__left {
//           float: left;
//         }
//         &__right {
//           float: right;
//         }
//       }
//     }
//   }
//   .aside {
//     width: 200px;
//     // height: 100vh;
//     background-color: #f2f2f2;
//     // float: left;
//     display: inline-block;

//     .logo {
//       height: 60px;
//       background-color: #666666;
//     }

//     .menu {
//       height: 60px;
//       line-height: 60px;
//       background-color: #e9eaed;
//       border-bottom: 1px solid #f2f2f2;
//       padding-left: 30px;
//       font-size: 16px;

//       &:hover {
//         background-color: #58b99e;
//         color: #fff;
//         font-weight: 500;
//         cursor: pointer;
//       }
//     }
//     .touch {
//       font-weight: 700;
//       color: #fff;
//       background-color: #58b99e;
//     }
//   }
//   .right {
//     overflow: hidden;
//     // width: 1180px;
//     // float: left;
//     font-size: 18px;
//     position: absolute;
//     left: 236px;
//     right: 0;
//     display: inline-block;

//     .header {
//       text-align: center;

//       height: 60px;
//       line-height: 60px;
//       background-color: #595959;
//       color: #fff;
//       .login {
//         float: right;
//         font-weight: 400;
//         font-size: 14px;
//         margin-right: 50px;
//         position: relative;
//         div {
//           display: inline-block;
//           &:first-child {
//             position: absolute;
//             top: 14px;
//             left: -20px;
//             width: 30px;
//             height: 30px;
//             border-radius: 15px;
//             background-color: coral;
//           }
//           &:nth-child(2) {
//             margin: 0 40px 0 20px;
//           }
//           &:last-child {
//             &:hover {
//               cursor: pointer;
//               color: blue;
//               text-decoration: underline;
//             }
//           }
//         }
//       }
//       // .top-one {
//       //   width: 120px;
//       //   float: left;
//       //   font-weight: 700;
//       //   &:hover {
//       //     background-color: #58b99e;
//       //     cursor: pointer;
//       //   }
//       // }
//       // .top-two {
//       //   width: 120px;
//       //   float: left;
//       //   font-weight: 500;
//       //   &:hover {
//       //     background-color: #58b99e;
//       //     cursor: pointer;
//       //   }
//       // }
//     }

//     .main {
//       width: 100%;
//       padding: 10px 20px 0 20px;
//     }
//   }
// }
.home {
  height: 100%;
  .mask {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    .popup {
      width: 320px;
      height: 200px;
      background: #fff;
      // box-shadow: 1px 1px 1px #000;
      margin: 200px auto;
      text-align: center;
      font-weight: bold;
      border-radius: 4px;
      .message {
        font-size: 24px;
        height: 120px;
        line-height: 120px;
      }
      .btn {
        height: 40px;
        padding: 20px;
        div {
          width: 100px;
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          background: #ccc;
          color: #333;
          font-size: 20px;
          cursor: pointer;
        }
        &__left {
          float: left;
        }
        &__right {
          float: right;
        }
      }
    }
  }
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    display: flex;
    color: white;
  }
}
</style>
