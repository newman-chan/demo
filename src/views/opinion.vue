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
      <div @click="search">查询结果</div>
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
              @click="handleBtn(scope.row)"
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
    <div class="mask" v-show="isShow">
        <div class="popup">
            <h1>意见建议</h1>
            <span>
                {{message}}
            </span>
            <div>
                <div @click="cancel">关闭</div>
            </div>
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
      page: "",
      isShow: false
    }
  },
  methods: {
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
      this.search()
    },
    search() {
        this.$axios({
            url: '/api/admin/feedback',
            method: 'get',
            params: {
                page: this.pagenum,
                page_rows: this.pagesize,
                nickname: this.value1,
                phone: this.value
            }
        }).then(res=>{
            console.log(res);
            this.tableData = res.data.data.list
        })
    },
    handleBtn(data) {
        console.log(data);
        this.isShow = true;
        this.message = data.body;
    },
    cancel() {
        this.isShow = false;
        this.message = '';
    }
  },
  mounted() {
      this.search()
  }
}
</script>

<style lang="less" scoped>
.opinion{
  padding: 20px;
  .mask {
      position: fixed;
      width: 100%;
      top:0;
      bottom: 0;
      z-index: 100;
      .popup{
    width: 300px;
    height:300px;
    background-color: #fff;
    position: absolute;
    top: 200px;
    left: 400px;
    padding: 30px;
    border: 1px solid #ccc;

    h1{
      padding-bottom: 10px;
    }

    div{
      font-size: 14px;
      div{
        display: inline-block;
        padding: 4px 10px;
        border-radius: 4px;
        border: 1px solid #000;
        cursor: pointer;

        &:first-child{
          margin-right:20px;
          color:#fff;
          background-color: #77b79f;
          border: none;
        }
        &:hover{
          background-color: blue;
        }
      }
    }
  }
  }
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