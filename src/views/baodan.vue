<!-- 保单管理 -->
<template>
  <div class="baodan">
    <!-- 面包屑 -->
    <div class="bread">
      保单管理
    </div>
    <div class="content" style="width:1270px">
      <div class="money">
        <span>租客保费金额 : </span>
        <i>{{pay}}元</i>
        <span @click="premium">修改</span>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <el-button size="small" round @click="insured(0)">待投保</el-button>
        <el-button size="small" round @click="insured(1)">已投保</el-button>
        <el-button size="small" round @click="insured(2)">全部</el-button>
        <span style="padding-right:10px;padding-left:40px">
          <i>签约房间搜索: </i>
          <input type="text" placeholder="请输入" v-model="value1" />
        </span>
        <el-button type="primary" icon="el-icon-search" size="small" @click="sear">搜索</el-button>
        <!-- <span class="">
          <i>到期时间: </i>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span> -->
      </div>

      <div class="derive">导出Excel</div>
    </div>
    <div class="forms">
      <!-- 表格 -->
      <el-table :data="tableData" border style="width:1270px">
        <el-table-column label="序号" width="50" align="center" type="index">
        </el-table-column>
        <el-table-column prop="room" label="签约房间" width="180" align="center">
        </el-table-column>
        <el-table-column prop="t_name" label="承租姓名" width="80" align="center">
        </el-table-column>
        <el-table-column prop="t_phone" label="租客手机号" width="110">
        </el-table-column>
        <el-table-column prop="t_sex" label="性别" width="50" align="center">
        </el-table-column>
        <el-table-column prop="t_id_card" label="租客身份证号" width="180" align="center">
        </el-table-column>
        <el-table-column prop="start_time" label="起租时间" width="100" align="center">
        </el-table-column>
        <el-table-column prop="end_time" label="到租时间" width="100" align="center">
        </el-table-column>
        <el-table-column prop="is_insured" label="是否投保" width="80" align="center">
        </el-table-column>
        <el-table-column prop="ri_number" label="保单信息" width="180" align="center">
        </el-table-column>
        <el-table-column prop="do" label="操作" width="159" align="center">
          <template slot-scope="scope">
            <el-button @click="addBtn(scope.row)" type="text" size="small" v-if="scope.row.is_insured=='否'">
              新增保单
            </el-button>
            <el-button @click="editBtn(scope.row)" type="text" size="small" v-if="scope.row.is_insured=='是'">
              编辑保单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pages">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[3, 5, 7, 10]" :page-size="pagesize - 0" layout="total, sizes, prev, pager, next, jumper" :total="total - 0">
        </el-pagination>
      </div>
      <!-- 设置保险费对话框 -->
      <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
      <el-dialog title="设置保费" :visible.sync="payDialogFormVisible">
        <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
        <el-form ref="payForm" :model="payForm" :label-width="'120px'" :rules="rules">
          <el-form-item label="保险费">
            <el-input v-model="payForm.insurance_fee" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="payBtn">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增保单对话框 -->
      <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
      <el-dialog title="保单信息" :visible.sync="addDialogFormVisible">
        <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
        <el-form ref="addForm" :model="addForm" :label-width="'120px'" :rules="rules">
          <el-form-item label="保险名称" prop="title">
            <el-input v-model="addForm.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="保单号" prop="number">
            <el-input v-model="addForm.number" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑保单对话框 -->
      <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
      <el-dialog title="编辑保单信息" :visible.sync="editDialogFormVisible">
        <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
        <el-form ref="editForm" :model="editForm" :label-width="'120px'" :rules="rules">
          <el-form-item label="保险名称" prop="title">
            <el-input v-model="editForm.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="保单号" prop="number">
            <el-input v-model="editForm.number" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑保单 -->
      <div class="edit" v-if="show">
        <h1>保单信息</h1>
        <textarea name="请填写保单信息" id="" cols="30" rows="6" placeholder="请填写保单信息"></textarea>
        <div>
          <div @click="handleEdit(1)">保存</div>
          <div @click="handleEdit(2)">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //保费
      pay: '',
      // 新增用户和编辑用户数据验证规则
      rules: {
        title: [
          { required: true, message: '请输入保单名称', trigger: 'blur' }
        ],
        paypay: [
          // { required: true, message: '请输入保费价格', trigger: 'blur' },
          // { pattern: /^[0-9]*$/, message: '请输入数字的保费价格', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入保单号', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字的保单号', trigger: 'blur' }
        ],
      },
      //保费数据绑定对象
      payForm: {
        insurance_fee: ""
      },
      //新增保单数据绑定对象
      addForm: {
        title: '',
        number: '',
        bill_id: ''
      },
      //编辑保单数据绑定对象
      editForm: {
        title: '',
        number: '',
        insurance_id: ''
      },
      // 控制编辑保费对话框的显示和隐藏
      payDialogFormVisible: false,
      // 控制编辑保单对话框的显示和隐藏
      editDialogFormVisible: false,
      // 控制新增保单对话框的显示和隐藏
      addDialogFormVisible: false,
      show: false,
      options: [
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "30天到期"
        },
        {
          value: "选项3",
          label: "15天到期"
        },
        {
          value: "选项4",
          label: "7天到期"
        }
      ],
      value: "全部",
      value1: "",
      is_insured: '',
      //列表
      tableList: [],
      //分页器
      total: "",
      pagesize: 10,
      pagenum: 1,
      page: "",
      tableData: []
    };
  },
  methods: {
    //搜索
    sear(){
      this.is_insured=''
      this.search()
    },
    payBtn() {
      this.payForm.insurance_fee = parseInt(this.payForm.insurance_fee)
      console.log(this.payForm.insurance_fee);
      this.$axios({
        url: '/api/admin/insurance-fee',
        method: 'post',
        data: this.payForm
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          // 隐藏新增用户表单窗口
          this.payDialogFormVisible = false
          // 数据刷新
          this.premiumBtn()
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    //保费
    premium() {
      this.payDialogFormVisible = true
      this.payForm.insurance_fee = this.pay

    },
    //编辑保单发送请求按钮
    edit() {


      // 再次进行用户数据的验证
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 发起新增用户请求
          this.$axios({
            url: '/api/admin/insurance',
            method: 'put',
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
            message: '请填写信息'
          })
          // 中止本次请求
          return false
        }
      })
    },
    //编辑保单对话框按钮
    editBtn(row) {
      console.log(row);
      this.editDialogFormVisible = true
      this.editForm.title = row.ri_title
      this.editForm.number = row.ri_number
      this.editForm.insurance_id = row.insurance_id
    },
    //新增保单发送请求按钮
    add() {

      // 再次进行用户数据的验证
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 发起新增用户请求
          this.$axios({
            url: '/api/admin/insurance',
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
            message: '请填写信息'
          })
          // 中止本次请求
          return false
        }
      })
    },
    //取消按钮
    cancel() {
      // 隐藏新增用户表单窗口
      this.addDialogFormVisible = false
      this.editDialogFormVisible = false
      this.payDialogFormVisible = false
      // 表单元素的数据重置
      this.$refs.addForm.resetFields()
    },
    //新增保单对话框按钮
    addBtn(data) {
      console.log(data);
      this.addDialogFormVisible = true
      this.addForm.bill_id = data.id
    },
    // 弹框操作
    handleEdit(btn) {
      if (btn === 1) {
        // 保存
        // 调用相关接口保存编辑信息
      }
      if (btn === 2) {
        this.show = false;
      }
    },
    // 查询数据
    search() {
      this.$axios({
        url: '/api/admin/insurances',
        method: 'get',
        params: {
          page: this.pagenum,
          page_rows: this.pagesize,
          search: this.value1,
          is_insured: this.is_insured
        }
      }).then(res => {
        console.log(res)
        this.total = res.data.data.total
        this.tableData = res.data.data.list
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].room = this.tableData[i].p_title + '-' + this.tableData[i].floor + '-' + this.tableData[i].r_title
          this.tableData[i].t_sex =
            this.tableData[i].t_sex == 1
              ? "男"
              : this.tableData[i].t_sex == 2
                ? "女"
                : "未知";
          this.tableData[i].start_time = this.tableData[i].start_time.split(' ')[0]
          this.tableData[i].end_time = this.tableData[i].end_time.split(' ')[0]
          this.tableData[i].is_insured = this.tableData[i].is_insured == 0 ? '否' : '是'
        }
      })
    },
    //是否投保
    insured(key) {
      if (key == 2) {
        this.is_insured = ''
      } else {
        this.is_insured = key;

      }
      this.value1 = ''
      this.search();
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
    //获取保费
    premiumBtn() {
      this.$axios({
        url: '/api/admin/insurance-fee'
      }).then(res => {
        console.log(res);
        this.pay = res.data.data
      })
    }
  },
  mounted() {
    this.search();
    this.premiumBtn()
  }
};
</script>

<style lang="less" scoped>
.search /deep/ .el-input {
  width: 110px !important;
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
.baodan {
  position: relative;
  // width: 1100px;
  padding: 20px;

  .edit {
    width: 300px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    top: 100px;
    left: 400px;
    padding: 30px;
    border: 1px solid #ccc;

    h1 {
      padding-bottom: 10px;
    }

    textarea {
      font-size: 14px;
      margin-bottom: 20px;
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

  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .content {
    padding: 20px 0;

    .money {
      font-size: 14px;
      font-weight: 400;
      padding-bottom: 20px;

      i {
        padding: 20px;
      }

      span:last-child {
        &:hover {
          cursor: pointer;
          color: blue;
        }
      }
    }

    .search {
      float: left;
      font-size: 14px;
      // padding: 20px 0;

      .box {
        display: inline;
        background-color: #e4e4e4;
        padding: 6px 20px;
        border-radius: 22px;

        &:hover {
          cursor: pointer;
        }

        &:first-child {
          margin-right: 22px;
        }

        &:nth-child(2) {
          margin-right: 22px;
        }
      }

      span:not(:first-child) {
        padding-left: 10px;
      }

      span:last-child {
        padding-left: 70px;
        &:hover {
          cursor: pointer;
          color: blue;
        }
      }

      input {
        width: 150px;
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
