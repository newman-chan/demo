import Vue from "vue";
import App from "./App.vue";
//引入路由模块
import router from "@/router.js";
// import "@/axios.js";



import axios from "@/axios.js";
Vue.prototype.$axios = axios;

// axios.defaults.baseURL ='http://picc.api.dev.kcbigdata.cn/'

//引入重置样式
import "@/assets/css/reset.css";
//引入图标
import "@/assets/icons/iconfont.css";

//引入Element Ui组件和样式
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

//凡是路由请求请求都会经过这个前置导航守卫---中间件
router.beforeEach((to, from, next) => {
  //判断是否有token,如果有,则继续,否则重定向到登录
  var token = localStorage.getItem("picc_token");
  // console.log(to);
  if (token || to.path === "/login") {
    next();
  } else {
    next({
      name: "Login"
    });
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
