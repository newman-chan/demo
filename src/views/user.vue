<template>
  <div class="user">
    <!-- 面包屑 -->
    <div class="bread">
      <span style="font-weight:400">权限管理></span>用户管理
    </div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="userKey" class="input-with-select" style="width:300px; margin-right:15px">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" plain @click="addDialogFormVisible=true">添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="userList" border style="width: 100%;margin-top:15px">
      <!-- <el-table-column type="id" width="50"></el-table-column> -->
      <el-table-column prop="id" align='center' label="ID" width="50"></el-table-column>
      <el-table-column prop="username" label="用户名" align='center' width="100"></el-table-column>
      <el-table-column align='center' label="头像" width="100">
        <template width="90" slot-scope="scope">
          <img style="width:80px;height:80px;border:none;" :src="scope.row.avatar">
        </template>
        <!-- <template scope="scope" style="height:100px">
            <div>{{scope.row}}</div>
          <image :src="scope.row.avatar" width="80" height="80" />
        </template> -->
      </el-table-column>
      <el-table-column align='center' prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column align='center' prop="phone" label="手机" width="180"></el-table-column>
      <el-table-column align='center' prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column align='center' prop="create_time" label="创建时间" width="180"></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" @change="updateStatus(scope.row.id,scope.row.status)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- 插槽:  匿名插槽,具名插槽,数据插槽  -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="success" icon="el-icon-share" @click="grantuserrole(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pages" style="margin-top:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[3, 5, 7, 10]" :page-size="pagesize - 0" layout="total, sizes, prev, pager, next, jumper" :total="total - 0">
      </el-pagination>
    </div>
    <!-- 新增用户对话框 -->
    <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
    <el-dialog title="新增用户" :visible.sync="addDialogFormVisible">
      <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
      <el-form ref="addForm" :model="addForm" :label-width="'120px'" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <!-- v-model  单个表单元素的数据绑定 -->
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <!-- prop的名称必须和规则的名称对应 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传头像" prop="file" class="upload-img-form" ref="uploadElement">
          <div class="add">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadHttp">
              <img v-if="addForm.avatar" :src="addForm.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div style="color:red;font-size:12px">只能上传jpg/png文件，大小2M内</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
      <el-form ref="editForm" :model="editForm" :label-width="'120px'" :rules="rules">
        <el-form-item label="id">
          <!-- v-model  单个表单元素的数据绑定 -->
          <el-input v-model="editForm.id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <!-- v-model  单个表单元素的数据绑定 -->
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <!-- prop的名称必须和规则的名称对应 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="editForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传头像" prop="file" class="upload-img-form" ref="uploadElement">
          <div class="add">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadHttp">
              <img v-if="editForm.avatar" :src="editForm.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div style="color:red;font-size:12px">只能上传jpg/png文件，大小2M内</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
    <el-dialog title="分配角色" :visible.sync="grantDialogFormVisible">
      <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
      <el-form ref="grantForm" :model="grantForm" :label-width="'120px'">
        <el-form-item label="ID">
          <!-- v-model  单个表单元素的数据绑定 -->
          <el-input v-model="grantForm.admin_user_id" auto-complete="off" disabled style="width:220px"></el-input>
        </el-form-item>
        <!-- 添加下拉列表 -->
        <!-- 当用户进行选择后,会自动将:value所对应的数据赋值给v-model所指定的属性 -->
        <el-form-item label="角色列表">
          <el-select v-model="myvalue" placeholder="请选择" multiple @change="rolechange" style="width:320px">
            <!-- v-for="item in roleList"   遍历数据源
             :key="item.value"         与v-for对应的:key
             :label="item.label"       用于展示的数据--给用户看
             :value="item.value"       这个展示数据背后的value值,它就是相当于背后的唯一标识id -->
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantDialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="grantrolesubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //分页器
      total: "",
      pagesize: 10,
      pagenum: 1,
      page: "",
      myvalue: [],
      // 分配角色对应数据
      grantForm: {
        admin_user_id: '',
        role_id: []
      },
      // 分配角色对话框的显示和隐藏
      grantDialogFormVisible: false,
      //角色列表
      roleList: [],
      fileName: "",
      fileLast: "",
      userKey: '',
      userList: [],
      // 控制编辑用户对话框的显示和隐藏
      editDialogFormVisible: false,
      // 编辑数据的表单数据绑定对象
      editForm: {
        id: '',
        name: '',
        password: '',
        sex: '',
        email: '',
        phone: '',
        avatar: ''
      },
      // 控制新增用户对话框的显示和隐藏
      addDialogFormVisible: false,
      // 新增数据的表单数据绑定对象
      addForm: {
        name: '',
        password: '',
        sex: '',
        email: '',
        phone: '',
        avatar: ''
      },
      // 新增用户和编辑用户数据验证规则
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /\w+[@]\w+[.]\w+/, message: '请输入合法的邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    //搜索
    search() {
      console.log(this.userKey);
      this.init(this.userKey)
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
    // 分配制定用户的角色
    grantuserrole(row) {
      this.grantForm.role_id = []
      this.myvalue = []
      console.log(row);
      this.grantDialogFormVisible = true
      this.grantForm.admin_user_id = row.id
      if (row.all_roles.length != 0) {
        for (var k = 0; k < row.all_roles.length; k++) {
          this.grantForm.role_id.push(row.all_roles[k].role_id)
          this.myvalue.push(row.all_roles[k].role_id)
        }
      }
      //   this.grantForm.role_id=row.all_roles
      console.log(this.grantForm);

    },
    // 分配角色提交
    grantrolesubmit() {
      if (this.grantForm.role_id) {
        this.$axios({
          url: '/api/admin/admin-user/sync-role',
          method: 'POST',
          data: this.grantForm
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            // 隐藏新增用户表单窗口
            this.grantDialogFormVisible = false
            this.init()
          } else {
            this.$message({
              type: 'warning',
              message: '请选择一个角色'
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一个角色'
        })
      }

    },
    // 下拉列表切换
    rolechange(value) {
      console.log(value)
      this.grantForm.role_id = value
    },
    //获取角色列表
    gainUser() {
      this.$axios({
        url: '/api/admin/rbac/roles',
        method: 'get',
        params: {
          page_rows: 100
        }
      }).then(res => {
        console.log(res);
        this.roleList = res.data.data.list
      })
    },
    //删除用户
    del(id) {
      this.$confirm(`此操作将永久删除id号为${id}的用户, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发起删除请求
        this.$axios({
          url: '/api/admin/admin-user/change-status',
          method: 'post',
          data: {
            id: id,
            status: 'del'
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init()
          }
        })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //编辑用户请求
    edit() {
      // 再次进行用户数据的验证
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 发起编辑用户请求
          this.$axios({
            url: '/api/admin/admin-user',
            method: 'PUT',
            data: this.editForm
          }).then(res => {
            console.log(res)
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              // 隐藏编辑用户表单窗口
              this.editDialogFormVisible = false
              // 表单元素的数据重置
              this.$refs.editForm.resetFields()
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
          return false
        }
      })
    },
    //编辑用户弹框
    handleEdit(obj) {
      console.log(obj);
      this.editDialogFormVisible = true
      // 表单元素实现的双向数据绑定,所以只需要为表单元素的双向绑定数据对象有数据就行
      this.editForm.id = obj.id
      this.editForm.name = obj.name
      this.editForm.password = obj.password
      this.editForm.sex = obj.sex
      this.editForm.email = obj.email
      this.editForm.phone = obj.phone
      this.editForm.avatar = obj.avatar
    },
    //   修改用户状态
    updateStatus(id, type) {
      console.log(id, type);
      var status = ''
      if (type == false) {
        status = 'close'
      } else if (type == true) {
        status = 'open'
      }
      this.$axios({
        url: '/api/admin/admin-user/change-status',
        method: 'post',
        data: {
          id: id,
          status: status
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          this.init()
        }

      })
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
          this.addForm.avatar = res.data.data.host + "/" + res.data.data.dir + this.fileName
          this.editForm.avatar = res.data.data.host + "/" + res.data.data.dir + this.fileName
        }, 1000);

        console.log(this.addForm.avatar);

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
    // 新增用户
    add() {
      // 再次进行用户数据的验证
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 发起新增用户请求
          this.$axios({
            url: '/api/admin/admin-user',
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
          return false
        }
      })
    },
    // 取消按钮
    cancel() {
      // 隐藏新增用户表单窗口
      this.addDialogFormVisible = false
      this.editDialogFormVisible = false
      // 表单元素的数据重置
      this.$refs.addForm.resetFields()
    },
    init(name) {
      this.$axios({
        url: '/api/admin/admin-users',
        method: 'get',
        params: {
          page: this.pagenum,
          page_rows: this.pagesize,
          name: name || ''
        }
      }).then(res => {
        console.log(res);
        this.total = res.data.data.total
        this.userList = res.data.data.list
        for (var i = 0; i < this.userList.length; i++) {
          this.userList[i].sex =
            this.userList[i].sex == 1
              ? "男"
              : this.userList[i].sex == 2
                ? "女"
                : "未知";
          this.userList[i].status = this.userList[i].status == 1 ? true : false
        }
      })
    }
  },
  mounted() {
    this.init()
    this.gainUser()
  }
}
</script>

<style lang="less" scoped>
.user {
  .add {
    width: 100px;
    height: 102px;
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
  .title {
    padding-top: 20px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      margin-right: 100px;
      padding: 8px 14px;
      background-color: #58b99e;
      color: #fff;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>