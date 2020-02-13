<template>
  <div class="tixian">
    <!-- 面包屑 -->
    <div class="bread">
      提现管理
    </div>
    <!-- 温馨提示框 -->
    <h2 style="font-weight:bold;padding-top:20px">温馨提示:</h2>
    <div style="display:flex;align-items: center">
      <div style="margin-right: 20px">
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea" style="width:400px;resize: none;">
        </el-input>
      </div>
      <div>
        <el-button type="primary" plain @click="saveText">保存</el-button>
      </div>
    </div>
    <h2 style="font-weight:bold;padding-top:20px">提现记录:</h2>
    <!-- 搜索 -->
    <div style="margin-top: 15px;">
      <span style="padding-right:10px">姓名搜索:</span>
      <el-input placeholder="请输入内容" v-model="userKey" class="input-with-select" style="width:200px; margin-right:25px">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <span style="padding-right:10px">申请时间:</span>
      <el-date-picker style="width:220px;margin-right:10px" v-model="applyTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button plain @click="appylBtn">搜索</el-button>
      <span style="padding-right:10px;padding-left:20px">转账时间:</span>
      <el-date-picker style="width:220px;margin-right:10px" v-model="transfer" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button plain @click="transferBtn">搜索</el-button>
    </div>
    <!-- <div style="margin-top:15px">
      <el-button size="small" round>待转账</el-button>
      <el-button size="small" round>已转账</el-button>
    </div> -->
    <!-- 表格 -->
    <el-table :data="userList" border style="width: 100%;margin-top:15px">
      <!-- <el-table-column type="id" width="50"></el-table-column> -->
      <el-table-column type="index" width="50" align='center' label="序号">
      </el-table-column>
      <el-table-column prop="name" align='center' label="姓名" width="70"></el-table-column>
      <el-table-column prop="uid_type" label="角色" align='center' width="50"></el-table-column>
      <el-table-column prop="phone" label="注册手机号" align='center' width="110"></el-table-column>
      <el-table-column align='center' prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column align='center' prop="id_card" label="身份证号" width="160"></el-table-column>
      <el-table-column align='center' prop="bank_card_number" label="银行卡号" width="160"></el-table-column>
      <el-table-column align='center' prop="apply_time" label="申请时间" width="160"></el-table-column>
      <el-table-column align='center' prop="status" label="转账状态" width="80"></el-table-column>
      <el-table-column align='center' prop="failure_reason" label="转账失败原因" width="120"></el-table-column>
      <el-table-column align='center' label="转账凭证" width="100">
        <template width="90" slot-scope="scope">
          <img style="width:80px;height:80px;border:none;" :src="scope.row.evidence" v-if="scope.row.evidence">
        </template>
      </el-table-column>
      <el-table-column align='center' prop="transfer_time" label="转账时间" width="160"></el-table-column>
      <el-table-column label="操作" width="240">
        <!-- 插槽:  匿名插槽,具名插槽,数据插槽  -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑凭证" placement="top" v-if="scope.row.status=='已转账'">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="确认转账" placement="top" v-if="scope.row.status=='申请中'">
            <el-button type="success" icon="el-icon-success" @click="yesBtn(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="转账失败" placement="top" v-if="scope.row.status=='申请中'">
            <el-button type="warning" icon="el-icon-error" @click="failBtn(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pages" style="margin-top:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[3, 5, 7, 10]" :page-size="pagesize - 0" layout="total, sizes, prev, pager, next, jumper" :total="total - 0">
      </el-pagination>
    </div>
    <!-- 确认转账对话框 -->
    <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
    <el-dialog title="确认转账" :visible.sync="addDialogFormVisible">
      <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
      <el-form ref="confirmFrom" :model="confirmFrom" :label-width="'120px'">
        <el-form-item label="上传转账凭证" prop="file" class="upload-img-form" ref="uploadElement">
          <div class="add">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadHttp">
              <img v-if="confirmFrom.evidence" :src="confirmFrom.evidence" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑凭证对话框 -->
    <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
    <el-dialog title="编辑凭证" :visible.sync="editDialogFormVisible">
      <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
      <el-form ref="editFrom" :model="editFrom" :label-width="'120px'">
        <el-form-item label="上传转账凭证" prop="file" class="upload-img-form" ref="uploadElement">
          <div class="add">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadHttp">
              <img v-if="editFrom.evidence" :src="editFrom.evidence" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 转账失败对话框 -->
    <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
    <el-dialog title="转账失败" :visible.sync="failDialogFormVisible">
      <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
      <el-form ref="failFrom" :model="failFrom" :label-width="'120px'">
        <el-form-item label="转账失败原因" prop="phone">
          <el-input v-model="failFrom.failure_reason" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="fail">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //上传
      fileName: "",
      fileLast: "",
      // 确认转账数据绑定对象
      confirmFrom: {
        id: '',
        evidence: ''
      },
      // 转账失败数据绑定对象
      failFrom: {
        id: '',
        failure_reason: ''
      },
      // 控制确认转账对话框的显示和隐藏
      addDialogFormVisible: false,
      // 控制转账失败对话框的显示和隐藏
      failDialogFormVisible: false,
      // 控制编辑凭证对话框的显示和隐藏
      editDialogFormVisible: false,
      // 编辑凭证数据绑定对象
      editFrom: {
        id: '',
        evidence: ''
      },
      //转账时间
      transfer_start: '',
      transfer_end: '',
      //申请时间
      apply_start: '',
      allpy_end: '',
      textarea: '',
      //关键字搜索框
      userKey: '',
      //申请时间选择
      applyTime: '',
      //转账时间
      transfer: '',
      //表格数组
      userList: [],
      //分页器
      total: "",
      pagesize: 10,
      pagenum: 1,
    }
  },
  methods: {
    //提现说明提交
    saveText() {
      this.$axios({
        url: '/api/admin/config',
        method: 'post',
        data: {
          withdrawal_text: this.textarea
        }
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          // 数据刷新
          this.withdrawal()
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    withdrawal() {
      this.$axios({
        url: '/api/admin/config',
        params: {
          code: 'withdrawal_text'
        }
      }).then(res => {
        console.log(res);
        this.textarea = res.data.data.withdrawal_text
      })
    },
    //转账失败发送按钮
    fail() {
      if (this.failFrom.failure_reason) {
        // 发起确认转账请求
        this.$axios({
          url: '/api/admin/withdrawal/fail',
          method: 'post',
          data: this.failFrom
        }).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            // 隐藏新增用户表单窗口
            this.failDialogFormVisible = false
            // 数据刷新
            this.init()
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      } else {
        // 中止本次请求
        this.$message({
          type: 'error',
          message: '请先上填写原因'
        })
        return false
      }
    },
    //转账失败按钮
    failBtn(id) {
      console.log(id);
      this.failDialogFormVisible = true
      this.failFrom.id = id
    },
    //编辑发送请求确认按钮
    edit() {
      this.$axios({
        url: '/api/admin/withdrawal/confirm',
        method: 'post',
        data: this.editFrom
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
          this.init()
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    //编辑凭证按钮
    handleEdit(row) {
      console.log(row);
      this.editDialogFormVisible = true
      this.editFrom.id = row.id
      this.editFrom.evidence = row.evidence
      console.log(this.editFrom);

    },
    //确认转账按钮
    yesBtn(row) {
      console.log(row);
      this.addDialogFormVisible = true
      this.confirmFrom.id = row.id
    },
    //确认转账请求
    confirm() {
      if (this.confirmFrom.evidence) {
        // 发起确认转账请求
        this.$axios({
          url: '/api/admin/withdrawal/confirm',
          method: 'post',
          data: this.confirmFrom
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
            this.$refs.confirmFrom.resetFields()
            // 数据刷新
            this.init()
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      } else {
        // 中止本次请求
        this.$message({
          type: 'error',
          message: '请先上传转账凭证'
        })
        return false
      }
    },
    // 取消按钮
    cancel() {
      // 隐藏新增用户表单窗口
      this.addDialogFormVisible = false
      this.editDialogFormVisible = false
      this.failDialogFormVisible = false
      // 表单元素的数据重置
      this.$refs.confirmFrom.resetFields()
    },
    //上传图片
    uploadHttp(e) {
      console.log(e);
      this.$axios({
        url: "api/common/oss-upload-init"
      }).then(res => {
        console.log(res);
        let temp = Object.assign(e.file);
        this.fileLast = temp.name.slice(temp.name.lastIndexOf("."));
        this.fileName = this.getRandom() + this.fileLast;
        var xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("OSSAccessKeyId", res.data.data.accessid);
        formData.append("policy", res.data.data.policy);
        formData.append("Signature", res.data.data.signature);
        formData.append("success_action_status", 200);
        formData.append("key", res.data.data.dir + this.fileName);
        formData.append("file", e.file);
        // console.log(res.data.data.host);

        console.log(formData);
        xhr.open("POST", res.data.data.host, true);
        xhr.send(formData);
        // this.imgList.push(e.content);
        console.log(res.data.data.host);
        console.log(res.data.data.dir);
        console.log(this.fileName);
        setTimeout(() => {
          this.confirmFrom.evidence = res.data.data.host + "/" + res.data.data.dir + this.fileName
          this.editFrom.evidence = res.data.data.host + "/" + res.data.data.dir + this.fileName
        }, 1000);
        console.log(this.editForm);

        // console.log(this.confirmFrom.evidence);

      })
    },
    getRandom() {
      //获取随机ID
      var randomNum = "";
      for (var i = 0; i < 6; i++) {
        randomNum += Math.floor(Math.random() * 10);
      }
      return randomNum + (new Date().getTime() + 1).toString();
    },
    //转账时间搜索
    transferBtn() {
      this.userKey = ''
      this.applyTime = ''
      this.apply_start = ''
      this.apply_end = ''
      this.transfer_start = this.formatDate(new Date(this.transfer[0]))
      this.transfer_end = this.formatDate(new Date(this.transfer[1]))
      this.init()
    },
    //申请搜索
    appylBtn() {
      this.userKey = ''
      this.transfer = ''
      this.transfer_start = ''
      this.transfer_end = ''
      console.log(this.applyTime);
      this.apply_start = this.formatDate(new Date(this.applyTime[0]))
      this.apply_end = this.formatDate(new Date(this.applyTime[1]))
      console.log(this.apply_start);
      console.log(this.apply_end);
      this.init()
    },
    //关键字搜索
    search() {
      this.applyTime = ''
      this.apply_start = ''
      this.apply_end = ''
      this.transfer = ''
      this.transfer_start = ''
      this.transfer_end = ''
      this.init()
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
      this.init();
    },
    //切换当前页码时触发
    handleCurrentChange(val) {
      // console.log(val);
      this.pagenum = val;
      this.init()
    },
    //提现列表请求
    init() {
      this.$axios({
        url: '/api/admin/withdrawals',
        method: 'get',
        params: {
          page: this.pagenum,
          page_rows: this.pagesize,
          search: this.userKey || '',
          apply_start_time: this.apply_start || '',
          apply_end_time: this.apply_end || '',
          transfer_start_time: this.transfer_start || '',
          transfer_end_time: this.transfer_end || ''
        }
      }).then(res => {
        console.log(res);
        this.total = res.data.data.total
        this.userList = res.data.data.list
        for (var i = 0; i < this.userList.length; i++) {
          this.userList[i].uid_type = this.userList[i].uid_type == 1 ? '房东' : '租客'
          this.userList[i].sex =
            this.userList[i].sex == 1
              ? "男"
              : this.userList[i].sex == 2
                ? "女"
                : "未知";
          this.userList[i].status = this.userList[i].status == 1 ? '申请中' : this.userList[i].status == 2 ? '已转账' : this.userList[i].status == 3 ? '转账失败' : '已撤销'
        }
        console.log(this.userList);

      })
    }
  },
  mounted() {
    this.init()
    this.withdrawal()
  }
}
</script>

<style lang="less" scoped>
.tixian /deep/ .el-textarea .el-textarea__inner {
  resize: none;
}
.tixian /deep/ .el-date-editor .el-range__close-icon {
  width: 0;
}
.tixian {
  .add {
    width: 100px;
    height: 100px;
    border: 1px dashed #000;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>