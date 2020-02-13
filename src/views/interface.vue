<!-- 接口管理 -->
<template>

  <div class="interface">
    <!-- 面包屑 -->
    <div class="bread">
      接口管理
    </div>
    <div class="pay">
      <div class="left">
        <span>账户余额</span>
        <span class="money">{{balance}}</span>
      </div>
      <div class="right" @click="pay">充值</div>
    </div>
    <h2>接口消耗统计</h2>
    <div class="search">
      <span>
        <i>使用时间: </i>
        <div class="block">
          <el-date-picker v-model="value1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp">
          </el-date-picker>
        </div>
      </span>
      <span @click="sear">搜 索</span>
    </div>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="使用时间" width="180">
        </el-table-column>
        <el-table-column prop="api_market.name" label="使用名称" width="220">
        </el-table-column>
        <el-table-column prop="use_num" label="调用数量">
        </el-table-column>
        <el-table-column prop="use_price" label="消费金额">
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[3, 5, 7, 10]" :page-size="pagesize - 0" layout="total, sizes, prev, pager, next, jumper" :total="total - 0">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      tableData: [],
      //分页器
      total: "",
      pagesize: 10,
      pagenum: 1,
      page: "",
      //余额
      balance: ''
    }
  },
  methods: {
    //充值
    pay(){
      this.$router.push({name:'Pay'})
    },
    //搜索功能
    sear() {
      console.log(this.value1);
      var start =this.formatDate(new Date(this.value1[0]))
      var end = this.formatDate(new Date(this.value1[1]))
      this.search(start,end)
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
    search(start, end) {
      this.$axios({
        url: '/api/admin/service/expenses-daily-log',
        method: 'get',
        params: {
          page: this.pagenum,
          page_rows: this.pagesize,
          start_time: start || '',
          end_time: end || ''
        }
      }).then(res => {
        console.log(res);
        this.total = res.data.data.total
        this.tableData = res.data.data.list
      })
    }
  },
  mounted() {
    this.$axios({
      url: "/api/admin/service/balance",
      method: 'get'
    }).then(res => {
      console.log(res);
      this.balance = res.data.data.balance
    })
    this.search()
  }
}
</script>

<style lang="less" scoped>
.search /deep/ .el-input {
  width: 80px !important;
  // height: 20px !important;
}

.search /deep/ .block {
  width: 41px !important;
  display: inline;
}
.search /deep/ .el-range-editor {
  width: 240px;
}
.search /deep/ .el-range-separator {
  width: 21px;
}
.interface {
  padding: 20px;
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .pay {
    position: relative;
    width: 800px;
    height: 200px;
    background-color: #72b7a0;
    display: inline-block;
    margin: 20px 20px 60px 20px;
    padding: 40px 60px 40px 40px;
    display: flex;
    justify-content: space-between;

    .left {
      flex: 4;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .money {
        font-size: 24px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 80px;
      // border: 1px solid #fff;
      background-color: #fff;
      border-radius: 4px;
      &:hover {
        background-color: #4397f8;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  h2 {
    font-size: 20px;
    font-weight: bold;
    width: 840px;
    border-bottom: 1px solid #000;
  }
  .search {
    padding: 20px 0;
    float: left;
    font-size: 16px;
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
  .pages {
    padding: 20px;
  }
}
</style>