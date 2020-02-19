<!-- 租客管理 -->
<template>
  <div class="zuke">
    <!-- 面包屑 -->
    <div class="bread">
      租客管理
    </div>
    <div class="content">
      <!-- 搜索框 -->
      <div>
        <span style="padding-right:10px">昵称:</span>
        <el-input placeholder="请输入内容" v-model="userKey" class="input-with-select" style="width:160px; margin-right:15px;" size="small">
          <el-button slot="append" icon="el-icon-search" @click="keyBtn"></el-button>
        </el-input>
        <span style="padding-right:10px;padding-left:20px">真实姓名:</span>
        <el-input placeholder="请输入内容" v-model="userName" class="input-with-select" style="width:160px; margin-right:15px;" size="small">
          <el-button slot="append" icon="el-icon-search" @click="nameBtn"></el-button>
        </el-input>
        <span style="padding-right:10px;padding-left:20px">是否实名:</span>
        <el-select v-model="select" slot="prepend" placeholder="请选择" size="small" style="width:100px;margin-right:10px">
          <el-option label="是" value="2"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" size="small" @click="realBtn"></el-button>
        <span style="padding-right:10px;padding-left:20px">注册时间:</span>
        <el-date-picker v-model="time" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" style="width:240px" size="small">
        </el-date-picker>
        <el-button slot="append" icon="el-icon-search" size="small" style="margin-bottom:3px;margin-left:10px" @click="timeBtn"></el-button>
        <el-button type="info" style="margin-left:50px" @click="exportBtn">导出Excel</el-button>
      </div>
    </div>
    <div class="forms">
      <!-- 表格 -->
      <el-table :data="tableList" border style="width: 1060px">
        <el-table-column label="序号" type="index" width="50" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="微信昵称" width="100" align="center">
        </el-table-column>
        <el-table-column prop="name" label="真实姓名" width="100" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="注册手机号" width="130" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="60" align="center">
        </el-table-column>
        <el-table-column prop="certification" label="实名认证" width="80" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="注册时间" width="180" align="center">
        </el-table-column>
        <el-table-column prop="status" label="账户状态" width="180" align="center">
        </el-table-column>
        <el-table-column label="操作" width="179" align="center">
          <template slot-scope="scope">
            <el-button @click="check(scope.row)" type="text" size="small">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pages">
        <!-- @size-change="handleSizeChange"  当切换每页显示记录数的时候粗发
             @current-change="handleCurrentChange"  切换当前页码,如从第一页到第二页
             :current-page="currentPage4"   当前页码
             :page-sizes="[100, 200, 300, 400]"  当前显示记录数的数组
             :page-size="100"  默认每页显示 的记录数
             layout="total, sizes, prev, pager, next, jumper"  布局结构
              :total="400" 总记录数-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[3, 5, 7, 10]" :page-size="pagesize - 0" layout="total, sizes, prev, pager, next, jumper" :total="total - 0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //搜索框值
      userKey: '',
      userName: '',
      select: '',
      time: [],
      start_time: '',
      end_time: '',
      choose: '',
      //列表
      tableList: [],
      //分页器
      total: "",
      pagesize: 10,
      pagenum: 1,
      page: ""
    };
  },
  mounted() {
    //获取列表数据
    this.search();
  },

  methods: {
    //导出
    exportBtn() {
      this.$axios({
        url: '/api/admin/export/init',
        params: {
          export_code: 'tenant'
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
           window.location.href = res.data.data.url
          this.$message({
            message: res.data.message,
            type: 'success'
          });
        }
      })
    },
    //时间戳转日期
    formatDate(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      // var hour = date.getHours();
      // var minute = date.getMinutes();
      // var second = date.getSeconds();
      //  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
      return year + '-' + (String(month).length > 1 ? month : '0' + month) + '-' +
        (String(day).length > 1 ? day : '0' + day)

    },
    //注册时间搜索
    timeBtn() {
      this.userKey = ''
      this.userName = ''
      this.select = ''
      this.choose = ''
      this.start_time = this.formatDate(new Date(this.time[0]))
      this.end_time = this.formatDate(new Date(this.time[1]))
      this.search()
    },
    //是否实名搜索
    realBtn() {
      this.choose = parseInt(this.select)
      console.log(this.choose);

      this.userKey = ''
      this.userName = ''
      this.time = []
      this.start_time = ''
      this.end_time = ''
      this.search()
    },
    //姓名搜索
    nameBtn() {
      this.choose = ''
      this.userKey = ''
      this.select = ''
      this.time = []
      this.start_time = ''
      this.end_time = ''
      this.search()
    },
    //昵称搜索
    keyBtn() {
      this.choose = ''
      // console.log(this.userKey);
      this.userName = ''
      // console.log(this.select-0);
      this.select = ''
      this.time = []
      this.start_time = ''
      this.end_time = ''
      this.search()
    },
    //查看详情
    check(data) {
      this.$router.push({
        path: "/index/zukeDetails",
        query: {
          data: JSON.stringify(data)
        }
      });
    },
    //切换每页显示记录数时触发
    handleSizeChange(val) {
      // console.log(val);
      this.pagesize = val;
      this.search();
    },
    //切换当前页码时触发
    handleCurrentChange(val) {
      // console.log(val);
      this.pagenum = val;
      this.search();
    },
    //搜索
    search() {
      this.$axios({
        url: "api/admin/tenants",
        method: "get",
        params: {
          page: this.pagenum,
          page_rows: this.pagesize,
          nickname: this.userKey,
          name: this.userName,
          is_check: this.choose,
          start_time: this.start_time,
          end_time: this.end_time
        }
      }).then(res => {
        console.log(res);
        this.tableList = res.data.data.list;
        this.total = res.data.data.total;
        this.page = res.data.data.page;
        // console.log(this.tableList[0]);
        // console.log(res.data.data.list);
        for (var i = 0; i < this.tableList.length; i++) {
          this.tableList[i].sex =
            this.tableList[i].sex == 1
              ? "男"
              : this.tableList[i].sex == 2
                ? "女"
                : "未知";
          this.tableList[i].certification =
            this.tableList[i].id_card == "" ? "未认证" : "已认证";
          this.tableList[i].status =
            this.tableList[i].status == 1 ? "激活" : "停用";
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
.search /deep/ .el-input {
  width: 80px !important;
  // height: 20px !important;
}

.search /deep/ .el-range-input {
  width: 66%;
}

.search /deep/ .block {
  width: 41px !important;
  display: inline;
}
.search /deep/ .el-range-editor {
  width: 184px;
}
.search /deep/ .el-range-separator {
  width: 21px;
}
.zuke {
  // width: 1100px;
  padding: 20px;

  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .content {
    padding: 20px 0;

    .search {
      float: left;
      font-size: 14px;
      // padding: 20px 0;

      span:not(:first-child) {
        padding-left: 30px;
      }

      span:last-child {
        &:hover {
          cursor: pointer;
          color: blue;
        }
      }

      input {
        width: 80px;
        height: 30px;
      }
      input::-ms-input-placeholder {
        text-align: center;
      }
      input::-webkit-input-placeholder {
        text-align: center;
      }
    }

    .derive {
      padding: 8px 10px;
      float: right;
      width: 94px;
      height: 36px;
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      background-color: #666666;

      &:hover {
        background-color: blue;
        cursor: pointer;
      }
    }
  }
  .forms {
    padding-top: 40px;
    .pages {
      padding: 20px;
    }
  }
}
</style>
