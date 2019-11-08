<!-- 消息通知 -->
<template>
  <div class="message">
    <!-- 面包屑 -->
    <div class="bread">
      消息通知
    </div>
    <div class="content">
      <!-- 搜索框 -->
      <div class="search">
        <span>
          <i>关键字: </i>
          <input type="text" placeholder="请输入" v-model="value1" />
        </span>
        <span>
          <i>发布时间 : </i>
          <div class="block">
            <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </span>
        <span>搜 索</span>
      </div>
      <div class="derive">发送通知</div>
    </div>
    <div class="forms">
      <!-- 表格 -->
      <el-table :data="tableData"  border style="width: 100%">
        <el-table-column
          label="序号"
          width="50"
          align=center
        >
        </el-table-column >
        <el-table-column  prop="create_time" label="注册时间" width="180"  align=center>
        </el-table-column>
        <el-table-column prop="body" label="消息内容" width="450" align=center >
        </el-table-column>
        <el-table-column prop="status" label="发送状态" width="140" align=center>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="239" align=center>
           <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData4)"
              type="text"
              size="small"
            >
              查看详情
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData4)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData4)"
              type="text"
              size="small"
            >
              下架
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
          :total="total - 0">
    </el-pagination>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "全部"
        }
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上上海上海上海上海上海上海上海上海上海上海上海上海上海上海上海上海上海上海上海上海海",
          city: "普陀区",
          address: "13245678909",
          zip: 200333,
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "13245678909",
          zip: 200333,
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "13245678909",
          zip: 200333,
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "13245678909",
          zip: 200333,
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "13245678909",
          zip: 200333,
          tag: "家"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "13245678909",
          zip: 200333,
          tag: "公司"
        }
      ],
      value:'',
      value1:'', 
      //列表
      tableList: [],
      //分页器
      total: "",
      pagesize: "",
      pagenum:1,
      page: ""
    };
  },
  methods: {
    //切换每页显示记录数时触发
    handleSizeChange(val) {
      // console.log(val);
      this.pagesize = val;
      this.getAllList();
    },
    //切换当前页码时触发
    handleCurrentChange(val) {
      // console.log(val);
      this.pagenum = val;
      this.getAllList()
    },
  }
};
</script>

<style lang="less" scoped>
.forms /deep/ tr{
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
.message {
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
        width: 140px;
        height: 30px;
      }
      input::-ms-input-placeholder{
            text-align: center;
    }
    input::-webkit-input-placeholder{
            text-align: center;
    }
    }

    .derive {
      padding: 7px 14px;
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
    .pages{
      padding: 20px
    }
  }
}
</style>