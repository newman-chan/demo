<!-- 消息通知 -->
<template>
  <div class="message">
      <div class="mask" v-show="isShow">
        <div class="popup" v-if="edit">
            <h1>填写消息内容</h1>
            <textarea name="请填写保单信息" id="" cols="30" rows="6" placeholder="请描述本次发送内容" v-model="texts"></textarea>
            <div>
                <div @click="handleSave(1)">发布</div>
                <div @click="handleSave(2)">取消</div>
            </div>
        </div>
        <div class="popup" v-else>
            <h1>消息内容</h1>
            <span>
                {{texts}}
            </span>
            <div>
                <div @click="handleSave(2)">关闭</div>
            </div>
        </div>
    </div>
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
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </span>
        <span>搜 索</span>
      </div>
      <div class="derive" @click="handleMessage">发送通知</div>
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
              @click="handleBtn(scope.row,1)"
              type="text"
              size="small"
            >
              查看详情
            </el-button>
            <el-button
              @click="handleBtn(scope.row,2)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
            <el-button
              @click="handleBtn(scope.row,3)"
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
      value:[],
      value1:'', 
      //列表
      tableList: [],
      //分页器
      total: "",
      pagesize: "",
      pagenum:1,
      page: "",
      isShow: false,
      edit: true,
      texts: ''
    };
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
            url:'/api/admin/notices',
            method: 'get',
            params: {
                page: this.pagenum,
                  page_rows: this.pagesize,
                  search: this.value1,
                  start_time: this.value[0],
                  end_time: this.value[1]
            }
        }).then(res=>{
            console.log(res);
            this.tableData = res.data.data.list;
        })
    },
    // 按钮操作
    handleBtn(data,index) {
        if(index === 1) {
            console.log(data);
            this.edit = false;
            this.texts = data.body;
            this.isShow = true;
        }
        if(index === 2) {
            console.log(data);
            this.edit = true;
            this.texts = data.body;
            this.isShow = true;
        }
        if(index === 3) {
            console.log(data);
            this.$axios({
                url: '/api/admin/notice-up',
                method: 'post',
                data: {
                    id: data.id,
                    is_open: 0
                }
            }).then(res=>{
                console.log(res)
            })
        }
    },
    // 发布消息弹框
    handleMessage() {
        this.edit = true;
        this.isShow = true;
    },
    // 发布消息
    handleSave(index) {
        if(index == 1) {
            this.$axios({
                url: '/api/admin/notice',
                method: 'post',
                data: {
                    body: this.texts
                }
            }).then(res=>{
                this.isShow = false;
                this.texts = '';
                console.log(res)
            })
        }
        if(index == 2) {
            this.isShow = false;
            this.texts = '';
        }
    }
  },
  mounted() {
      this.search()
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

    textarea{
        font-size: 14px;
        margin-bottom: 20px;
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