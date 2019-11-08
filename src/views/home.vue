<!-- 主页 -->
<template>
  <div class="home">
    <!-- 面包屑 -->
    <div class="bread">
      首页
    </div>

    <!-- 内容 -->
    <!-- 模块一 -->
    <div class="content">
      <div class="demo">
        <div>房东人数（合伙人）</div>
        <div class="box">{{ landlord + "人" }}</div>
      </div>
      <div class="demo">
        <div>租客人数</div>
        <div class="box">{{ tenant + "人" }}</div>
      </div>
      <div class="demo">
        <div>房间数量</div>
        <div class="box">{{ room + "个" }}</div>
      </div>
    </div>
    <!-- 模块二 -->
    <div class="content">
      <div class=" demo">
        <div>已投保</div>
        <div class="box">{{ insured + "个" }}</div>
      </div>
      <div class=" demo">
        <div>待安排投保单</div>
        <div class="box">{{ unInsured + "个" }}</div>
      </div>
      <div class="go demo" @click="go">进入模块 &gt;</div>
    </div>
    <!-- 模块三 -->
    <div class="content">
      <div class=" demo">
        <div>已报备租约</div>
        <div class="box">{{ report + "个" }}</div>
      </div>
      <div class=" demo">
        <div>待报备租约</div>
        <div class="box">{{ unReport + "个" }}</div>
      </div>
      <div class="go demo" @click="come">进入模块 &gt;</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //房东
      landlord: "",
      //租客
      tenant: "",
      //房间
      room: "",
      //已投保
      insured: "",
      //待投保
      unInsured: "",
      //已备案
      report: "",
      //待备案
      unReport: ""
    };
  },
  created() {
    this.$axios({
      url: "api/admin/index",
      method: "get"
    }).then(res => {
      // console.log(res);
      this.landlord = res.data.data.landlord_count;
      this.tenant = res.data.data.tenant_count;
      this.room = res.data.data.Room_count;
      this.insured = res.data.data.insured_count;
      this.unInsured = res.data.data.unInsured_count;
      this.report = res.data.data.report_count;
      this.unReport = res.data.data.unReport_count;
    });
  },
  methods: {
    //  点击进入保单模块
    go() {
      this.$router.push({
        path:"/index/baodan",
        query: {
          index:3
        }
      });
    },
    //点击进入公安报备模块
    come() {
      this.$router.push({
        path:"/index/gongan",
        query:{
          index:4
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  // width: 1100px;
  padding: 20px;

  .bread {
    font-size: 18px;
    font-weight: 700;
  }

  .content {
    margin: 20px auto;
    border-radius: 10px;
    height: 175px;
    width: 100%;
    background-color: #f2f2f2;
    box-shadow: 0 0 8px 4px #ccc;
    padding: 30px 0;

    .demo {
      text-align: center;
      width: 33%;
      height: 100%;
      float: left;
      font-size: 18px;
      font-weight: 700;

      .box {
        margin-top: 30px;
        font-size: 30px;
      }
    }
    .go {
      margin-top: 72px;

      &:hover {
        cursor: pointer;
        color: blue;
      }
    }
  }
}
</style>
