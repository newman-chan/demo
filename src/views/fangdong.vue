<!-- 房东管理 -->
<template>
  <div class="fangdong">
    <!-- 面包屑 -->
    <div class="bread">
      房东管理
    </div>
    <div class="content">
      <!-- 搜索框 -->
      <div class="search">
        <span>
          <i>租客昵称: </i>
          <input type="text" placeholder="请输入" v-model="value1" />
        </span>
        <span>
          <i>真实姓名: </i>
          <input type="text" placeholder="请输入" v-model="value2" />
        </span>
        <span>
          <i>是否实名: </i>
          <el-select v-model="value3" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </span>
        <span>
          <i>注册时间: </i>
          <div class="block">
            <el-date-picker
              v-model="value4"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </span>
        <span>搜 索</span>
      </div>
      <div class="derive">导出Excel</div>
    </div>
    <div class="forms">
      <!-- 表格 -->
      <el-table :data="tableList" border style="width: 100%">
        <el-table-column label="序号" type="index" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="微信昵称"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="真实姓名"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="注册手机号"
          width="130"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="60" align="center">
        </el-table-column>
        <el-table-column
          prop="certification"
          label="实名认证"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="is_partner"
          label="是否合伙人"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="注册时间"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="账户状态"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="name" label="操作" width="159" align="center">
          <template slot-scope="scope">
            <el-button @click="check(scope.row)" type="text" size="small">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[3, 5, 7, 10]"
          :page-size="pagesize - 0"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total - 0"
        >
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
      options: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 2,
          label: "是"
        },
        {
          value: 1,
          label: "否"
        }
      ],
      value1: "",
      value2: "",
      value3: 0,
      value4: [],
      //列表
      tableList: [],
      //分页器
      total: "",
      pagesize: "",
      pagenum: 1,
      page: ""
    };
  },
  mounted() {
    //获取列表数据
    this.search();
  },
  methods: {
      check(data) {
      this.$router.push({
        path: "/index/fangdongDetails",
        query: {
          data
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
            url:'/api/admin/landlords',
            method: 'get',
            params: {
                page: this.pagenum,
                page_rows: this.pagesize,
                nickname: this.vaule1,
                name: this.vaule2,
                is_check: this.options.value,
                start_time: this.value4[0],
                end_time: this.value4[1]
            }
        }).then(res=>{
            console.log(res);
            this.tableList = res.data.data.list;
            this.total = res.data.data.total;
            this.page = res.data.data.page;
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
                this.tableList[i].is_partner=this.tableList[i].is_partner ==1 ? "是" :"否"
            }
        })
    },
    //获取列表是数据
    // getAllList() {
    //   this.$axios({
    //     url: "api/admin/landlords",
    //     method: "get"
    //   }).then(res => {
    //     console.log(res);
    //     this.tableList = res.data.data.list;
    //     this.total = res.data.data.total;
    //     this.page = res.data.data.page;
    //     for (var i = 0; i < this.tableList.length; i++) {
    //       this.tableList[i].sex =
    //         this.tableList[i].sex == 1
    //           ? "男"
    //           : this.tableList == 2
    //           ? "女"
    //           : "未知";
    //       this.tableList[i].id_card =
    //         this.tableList[i].id_card == "" ? "未认证" : "已认证";
    //       this.tableList[i].status =
    //         this.tableList[i].status == 1 ? "激活" : "停用";
    //         this.tableList[i].is_partner=this.tableList[i].is_partner ==1 ? "是" :"否"
    //     }
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
.forms /deep/ tr {
  height: 10px;
}
.search /deep/ .el-input {
  width: 80px !important;
  // height: 20px !important;
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
.fangdong {
  width: 1100px;
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
