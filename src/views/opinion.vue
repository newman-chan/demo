<!-- 意见反馈 -->
<template>

  <div class="opinion">
     <!-- 面包屑 -->
    <div class="bread">
      意见反馈管理
    </div>
    <div class="search">
      <div>
        <span>用户手机号 :</span>
        <input type="text" placeholder="模糊查询" v-model="value">
      </div>
      <div>
        <span>用户昵称 :</span>
        <input type="text" placeholder="微信昵称" v-model="value1">
      </div>
      <div>查询结果</div>
    </div>
    <div class="content">
            <!-- 表格 -->
      <el-table :data="tableData"  border style="width: 100%">
        <el-table-column
          label="用户ID"
          width="80"
          align=center
        >
        </el-table-column >
        <el-table-column  prop="phone" label="用户手机号" width="150"  align=center>
        </el-table-column>
        <el-table-column prop="nickname" label="用户昵称" width="150" align=center >
        </el-table-column>
        <el-table-column prop="body" label="意见反馈" width="640" align=center>
        </el-table-column>
        <el-table-column prop="create_time" label="提交时间" width="144" align=center>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="139" align=center>
           <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData4)"
              type="text"
              size="small"
            >
              查看
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
  data () {
    return {
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
    }
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
}
</script>

<style lang="less" scoped>
.opinion{
  padding: 20px;
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .search{
    padding-top: 30px;
    font-size: 15px;
    div{
      display: inline-block;
      &:not(:first-child){
        margin-left: 50px;
      }

      &:last-child{
        // background-color: green;
        padding: 6px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;

        &:hover{
          cursor: pointer;
          background-color: #72b7a0;
          color: #fff;
        }
      }
      span{
        padding-right: 20px;
      }
      input{
        height: 30px;
      }
    }
  }
  .content{
    color: #000;
    
    .pages{
      padding: 30px;
    }
  }
}
</style>