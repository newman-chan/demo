import Vue from "vue";
import VueRouter from "vue-router";

//引入模块
//项目中引入资源,一般用绝对路径
//在配置文件中,已经进行了根目录的配置,@代表src目录
import Login from "@/views/login.vue";
import Index from "@/views/index.vue";
import Home from "@/views/home.vue";
import Zuke from "@/views/zuke.vue";
import ZukeDetails from "@/views/zukeDetails.vue";
import Fangdong from "@/views/fangdong.vue";
import FangdongDetails from "@/views/fangdongDetails.vue";
import HomeDetails from "@/views/homeDetails.vue";
import Baodan from "@/views/baodan.vue";
import Gongan from "@/views/gongan.vue";
import Message from "@/views/message.vue";
import Operation from "@/views/operation.vue";
import Management from "@/views/management.vue";
import Account from "@/views/account.vue";
import Opinion from "@/views/opinion.vue";
import Interface from "@/views/interface.vue";
import Pay from "@/views/pay.vue";

Vue.use(VueRouter);
//创建路由模块
var router = new VueRouter({
  routes: [
    // 添加重定向
    {path:'/', redirect: '/login'},
    // 登录页面
    {
      name: "Login",
      path: "/login",
      component: Login
    },
    // 主页面
    {
      name: "Index",
      path: "/index",
      component: Index,
      redirect: {name:"Home"},

      children: [
        // 主页
        {
          name: "Home",
          path: "home",
          component: Home
        },
        // 租客管理
        {
          name: "Zuke",
          path: "zuke",
          component: Zuke
        },
        // 租客详情
        {
          name: "ZukeDetails",
          path: "zukeDetails",
          component: ZukeDetails
        },
        // 房东详情
        {
          name: "Fangdong",
          path: "fangdong",
          component: Fangdong
        },
        //房东详情
        {
          name: "FangdongDetails",
          path: "fangdongDetails",
          component: FangdongDetails
        },
        //物业详情
        {
          name: "HomeDetails",
          path: "homeDetails",
          component: HomeDetails
        },
        // 保单管理
        {
          name: "Baodan",
          path: "baodan",
          component: Baodan
        },
        // 公安报备
        {
          name: "Gongan",
          path: "gongan",
          component: Gongan
        },
        // 消息通知
        {
          name: "Message",
          path: "message",
          component: Message
        },
        // 运营设置
        {
          name: "Operation",
          path: "operation",
          component: Operation
        },
        // 管理员
        {
          name: "Management",
          path: "management",
          component: Management
        },
        // 账号管理
        {
          name: "Account",
          path: "account",
          component: Account
        },
        // 意见反馈
        {
          name: "Opinion",
          path: "opinion",
          component: Opinion
        },
        // 接口管理
        {
          name: "Interface",
          path: "interface",
          component: Interface
        },
        //充值
        {
          name: "Pay",
          path: "pay",
          component: Pay
        }
      ]
    }
  ]
});

// module.exports = router
export default router;
