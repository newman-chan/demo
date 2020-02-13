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
          <el-button style="margin-left:10px" type="primary" icon="el-icon-search" size="small" @click="keySear">搜索</el-button>
        </span>
        <span>
          <i style="padding-left:10px">发布时间 : </i>
          <div class="block">
            <el-date-picker v-model="value" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" style="width:240px">
            </el-date-picker>
          </div>
        </span>
        <el-button style="margin-left:10px" type="primary" icon="el-icon-search" size="small" @click="timeSear">搜索</el-button>
      </div>
      <div class="derive" @click="handleMessage">发送通知</div>
    </div>
    <div class="forms">
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" type="index" width="50" align=center>
        </el-table-column>
        <el-table-column prop="create_time" label="注册时间" width="180" align=center>
        </el-table-column>
        <el-table-column prop="body" label="消息内容" width="450" align=center>
        </el-table-column>
        <el-table-column prop="status" label="发送状态" width="140" align=center>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="239" align=center>
          <template slot-scope="scope">
            <el-button @click="handleBtn(scope.row,1)" type="text" size="small">
              查看详情
            </el-button>
            <el-button @click="handleBtn(scope.row,2)" type="text" size="small">
              编辑
            </el-button>
            <el-button @click="handleBtn(scope.row,3)" type="text" size="small" v-if="scope.row.is_open==1">
              下架
            </el-button>
            <el-button type="text" size="small" v-if="scope.row.is_open==0" style="color:#b1b1b1;text-decoration:underline;cursor:default">
              下架
            </el-button>
            <!-- <el-button @click="handleBtn(scope.row,3)" type="text" size="small" v-if="scope.row.is_open==0">
              上架
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pages">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[3, 5, 7, 10]" :page-size="pagesize - 0" layout="total, sizes, prev, pager, next, jumper" :total="total - 0">
        </el-pagination>
      </div>
      <!-- 新增消息通知对话框 -->
      <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
      <el-dialog title="填写消息内容" :visible.sync="addDialogFormVisible">
        <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
        <el-form ref="addForm" :model="addForm" :label-width="'120px'">
          <el-input placeholder="请描述本次发送内容" type="textarea" :rows="4" v-model="addForm.body" auto-complete="off"></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑消息通知对话框 -->
      <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
      <el-dialog title="填写消息内容" :visible.sync="editDialogFormVisible">
        <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
        <el-form ref="editForm" :model="editForm" :label-width="'120px'">
          <el-input placeholder="请描述本次发送内容" type="textarea" :rows="4" v-model="editForm.body" auto-complete="off"></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="editSave">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看消息通知对话框 -->
      <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
      <el-dialog title="消息内容" :visible.sync="lookDialogFormVisible">
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
      //搜索时间开始
      start_time: '',
      //搜索时间结束
      end_time: '',
      //编辑消息数据绑定对象
      lookForm: {
        body: ''
      },
      //编辑消息数据绑定对象
      editForm: {
        id: '',
        body: ''
      },
      // 控制查看消息对话框的显示和隐藏
      lookDialogFormVisible: false,
      // 控制编辑消息对话框的显示和隐藏
      editDialogFormVisible: false,
      // 控制新增消息对话框的显示和隐藏
      addDialogFormVisible: false,
      //新增消息数据绑定对象
      addForm: {
        body: ''
      },
      options: [
        {
          value: "选项1",
          label: "全部"
        }
      ],
      tableData: [],
      value: [],
      value1: '',
      //列表
      tableList: [],
      //分页器
      total: "",
      pagesize: 10,
      pagenum: 1,
      page: "",
      isShow: false,
      edit: true,
      texts: '',
      // edits:true,
      textes: '',
      Show: false,
      id: ''
    };
  },
  methods: {
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
    //发布时间搜索
    timeSear() {
      this.value1 = '',
        this.start_time = this.formatDate(new Date(this.value[0]))
      this.end_time = this.formatDate(new Date(this.value[1]))
      this.search()
    },
    //关键字搜索
    keySear() {
      this.value = []
      this.start_time ='',
      this.end_time = '',
      this.search()
    },
    //取消按钮
    cancel() {
      // 隐藏新增用户表单窗口
      this.addDialogFormVisible = false
      this.editDialogFormVisible = false
      this.lookDialogFormVisible = false
      // 表单元素的数据重置
      this.$refs.addForm.resetFields()
    },
    // 新增消息发送
    add() {
      if (this.addForm.body) {
        // 发起新增用户请求
        this.$axios({
          url: '/api/admin/notice',
          method: 'post',
          data: this.addForm
        }).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            // 隐藏新增用户表单窗口
            this.addDialogFormVisible = false
            // 表单元素的数据重置
            this.$refs.addForm.resetFields()
            // 数据刷新
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: '请填写发送内容'
        })

        // 中止本次请求
        return false
      }
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
        url: '/api/admin/notices',
        method: 'get',
        params: {
          page: this.pagenum,
          page_rows: this.pagesize,
          search: this.value1,
          start_time: this.start_time,
          end_time: this.end_time
        }
      }).then(res => {
        console.log(res);
        this.total = res.data.data.total
        this.tableData = res.data.data.list;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].status = this.tableData[i].status == 1 ? '已发送' : '发送失败'
        }
      })
    },
    //编辑
    editSave() {
      if (this.editForm.body) {
        // 发起新增用户请求
        this.$axios({
          url: '/api/admin/notice',
          method: 'PUT',
          data: this.editForm
        }).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            // 隐藏新增用户表单窗口
            this.editDialogFormVisible = false
            // 数据刷新
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: '请填写发送内容'
        })

        // 中止本次请求
        return false
      }
    },
    // 按钮操作
    handleBtn(data, index) {
      if (index === 1) {
        console.log(data);
        this.lookDialogFormVisible = true
        this.lookForm.body = data.body
      }
      if (index === 2) {
        console.log(data);
        this.editDialogFormVisible = true
        this.editForm.id = data.id
        this.editForm.body = data.body
      }
      if (index === 3) {
        console.log(data);
        // 发起新增用户请求
        this.$axios({
          url: '/api/admin/notice-up',
          method: 'post',
          data: {
            id: data.id,
            is_open: 0
          }
        }).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            // 数据刷新
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      }
      if (index === 4) {
        console.log(data);
        this.$axios({
          url: '/api/admin/notice-up',
          method: 'post',
          data: {
            id: data.id,
            is_open: 1
          }
        }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.search()
          }
        })
      }
    },
    // 发布消息弹框
    handleMessage() {
      this.addDialogFormVisible = true
    },
    // 发布消息
    handleSave(index) {
      if (index == 1) {
        this.$axios({
          url: '/api/admin/notice',
          method: 'post',
          data: {
            body: this.texts
          }
        }).then(res => {
          this.isShow = false;
          this.texts = '';
          console.log(res)
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.search()
          }
        })
      }
      if (index == 2) {
        this.isShow = false;
        this.texts = '';
      }
      if (index == 3) {
        this.Show = false
        this.textes = ''
      }
    }
  },
  mounted() {
    this.search()
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
.message /deep/ .el-textarea .el-textarea__inner {
  resize: none;
}
.message {
  width: 1100px;
  padding: 20px;
  .mask {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 100;
    .popup {
      width: 400px;
      height: 300px;
      background-color: #fff;
      position: absolute;
      top: 200px;
      left: 400px;
      padding: 30px;
      border: 1px solid #ccc;

      .close {
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
      h1 {
        padding-bottom: 10px;
      }

      textarea {
        font-size: 14px;
        margin-bottom: 20px;
        width: 300px;
        resize: none;
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
      input::-ms-input-placeholder {
        text-align: center;
      }
      input::-webkit-input-placeholder {
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
    .pages {
      padding: 20px;
    }
  }
}
</style>