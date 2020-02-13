<!-- 意见反馈 -->
<template>

  <div class="opinion">
    <!-- 面包屑 -->
    <div class="bread">
      意见反馈管理
    </div>
    <div style="margin:20px 0 ">
      <span style="padding-right:10px">用户手机号:</span>
        <el-input placeholder="模糊查询" v-model="tel" class="input-with-select" style="width:180px; margin-right:15px;" size="small">
          <el-button slot="append" icon="el-icon-search" @click="telBtn"></el-button>
        </el-input>
               <span style="padding-right:10px;padding-left:20px">用户昵称:</span>
        <el-input placeholder="请输入昵称" v-model="userName" class="input-with-select" style="width:160px; margin-right:15px;" size="small">
          <el-button slot="append" icon="el-icon-search" @click="nameBtn"></el-button>
        </el-input>
    </div>
    <div class="content">
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="用户ID" width="80" align=center prop="id">
        </el-table-column>
        <el-table-column prop="phone" label="用户手机号" width="150" align=center>
        </el-table-column>
        <el-table-column prop="nickname" label="用户昵称" width="150" align=center>
        </el-table-column>
        <el-table-column prop="body" label="意见反馈" width="540" align=center>
        </el-table-column>
        <el-table-column prop="create_time" label="提交时间" width="174" align=center>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="139" align=center>
          <template slot-scope="scope">
            <el-button @click="handleBtn(scope.row)" type="text" size="small">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pages">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[3, 5, 7, 10]" :page-size="pagesize - 0" layout="total, sizes, prev, pager, next, jumper" :total="total - 0">
        </el-pagination>
      </div>
            <!-- 查看消息通知对话框 -->
      <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
      <el-dialog title="意见建议" :visible.sync="lookDialogFormVisible">
        <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
        <el-form ref="lookForm" :model="lookForm" :label-width="'120px'">
          <el-input disabled placeholder="请描述本次发送内容" type="textarea" :rows="8" v-model="lookForm.body" auto-complete="off"></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
            //编辑消息数据绑定对象
      lookForm: {
        body: ''
      },
            // 控制查看消息对话框的显示和隐藏
      lookDialogFormVisible: false,
      tel:'',
      userName:'',
      tableData: [],
      value: '',
      value1: '',
      //列表
      tableList: [],
      //分页器
      total: "",
      pagesize: 10,
      pagenum: 1,
      page: "",
      isShow: false,
      message: ''
    }
  },
  methods: {
    //手机搜索
    telBtn(){
      this.userName =''
      this.search()
    },
    //用户搜索
    nameBtn(){
      this.tel=''
      this.search()
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
      this.search()
    },
    search() {
      this.$axios({
        url: '/api/admin/feedback',
        method: 'get',
        params: {
          page: this.pagenum,
          page_rows: this.pagesize,
          nickname: this.userName,
          phone: this.tel
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    //查看
    handleBtn(data) {
      console.log(data);
      this.lookDialogFormVisible = true
      this.lookForm.body = data.body;
    },
    cancel() {
      this.lookDialogFormVisible = false
    }
  },
  mounted() {
    this.search()
  }
}
</script>

<style lang="less" scoped>
.opinion /deep/ .el-textarea .el-textarea__inner {
  resize: none;
}
.opinion {
  padding: 20px;
  .mask {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 100;
    .popup {
      width: 300px;
      height: 300px;
      background-color: #fff;
      position: absolute;
      top: 200px;
      left: 300px;
      padding: 30px;
      border: 1px solid #ccc;

      h1 {
        padding-bottom: 10px;
      }

      div {
        font-size: 14px;
        div {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid #000;
          cursor: pointer;

          &:first-child {
            margin-right: 20px;
            color: #fff;
            background-color: #77b79f;
            border: none;
          }
          &:hover {
            background-color: blue;
          }
        }
      }
      .canel{
        position: absolute;
        bottom: 20px;
        right:0;
      }
    }
  }
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .search {
    padding-top: 30px;
    font-size: 15px;
    margin-bottom: 20px;
    div {
      display: inline-block;
      &:not(:first-child) {
        margin-left: 50px;
      }

      &:last-child {
        // background-color: green;
        padding: 6px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;

        &:hover {
          cursor: pointer;
          background-color: #72b7a0;
          color: #fff;
        }
      }
      span {
        padding-right: 20px;
      }
      input {
        height: 30px;
      }
    }
  }
  .content {
    color: #000;

    .pages {
      padding: 30px;
    }
  }
}
</style>