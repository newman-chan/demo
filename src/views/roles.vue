<template>
  <div class="roles">
    <!-- 面包屑 -->
    <div class="bread">
      <span style="font-weight:400">权限管理></span>角色管理
    </div>
    <div style="margin-top: 15px;">
      <el-button type="success" plain @click="addDialogFormVisible=true">添加角色</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="roleList" border style="width: 100%;margin-top:15px">
      <!-- <el-table-column type="id" width="50"></el-table-column> -->
      <el-table-column prop="id" align='center' label="角色ID" width="100"></el-table-column>
      <el-table-column prop="name" label="角色名称" align='center' width="200"></el-table-column>
      <el-table-column align='center' prop="description" label="角色描述" width="300"></el-table-column>
      <el-table-column label="管理操作">
        <!-- 插槽:  匿名插槽,具名插槽,数据插槽  -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改信息" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="修改权限" placement="top">
            <el-button type="success" icon="el-icon-setting" @click="grantuserrole(scope.row)"></el-button>
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
    <!-- 新增角色对话框 -->
    <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
    <el-dialog title="新增角色" :visible.sync="addDialogFormVisible">
      <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
      <el-form ref="addForm" :model="addForm" :label-width="'120px'" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <!-- v-model  单个表单元素的数据绑定 -->
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <!-- prop的名称必须和规则的名称对应 -->
        <el-form-item label="角色描述">
          <!-- v-model  单个表单元素的数据绑定 -->
          <el-input v-model="addForm.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色信息对话框 -->
    <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
    <el-dialog title="修改角色" :visible.sync="editDialogFormVisible">
      <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
      <el-form ref="editForm" :model="editForm" :label-width="'120px'" :rules="rules">
        <el-form-item label="id">
          <!-- v-model  单个表单元素的数据绑定 -->
          <el-input v-model="editForm.role_id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <!-- v-model  单个表单元素的数据绑定 -->
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <!-- prop的名称必须和规则的名称对应 -->
        <el-form-item label="角色描述">
          <!-- v-model  单个表单元素的数据绑定 -->
          <el-input v-model="editForm.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色权限信息对话框 -->
    <!-- :visible.sync  控制当前对话框的显示和隐藏,如果值为true,则显示 -->
    <el-dialog title="修改权限" :visible.sync="rolesDialogFormVisible" :before-close="handleClose">
      <!-- :model 表单的数据源绑定,   label-width:  label宽度 -->
      <el-tree :data="data2" show-checkbox node-key="code" :default-checked-keys="list" :props="defaultProps" @node-click="handleNodeClick" @check-change="handleCheckChange">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="role">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theList: [],
      id: '',
      list: [],
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      //分页器
      total: "",
      pagesize: 10,
      pagenum: 1,
      page: "",
      // 角色列表
      roleList: [],
      // 控制修改角色权限对话框的显示和隐藏
      rolesDialogFormVisible: false,
      // 控制修改角色对话框的显示和隐藏
      editDialogFormVisible: false,
      // 修改数据的表单数据绑定对象
      editForm: {
        role_id: '',
        name: '',
        description: ''
      },
      // 控制新增角色对话框的显示和隐藏
      addDialogFormVisible: false,
      // 新增数据的表单数据绑定对象
      addForm: {
        name: '',
        description: ''
      },
      // 新增角色和编辑角色数据验证规则
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    //修改角色权限弹框关闭
    handleClose() {
      this.rolesDialogFormVisible = false
      this.theList = []
      this.list = []
    },
    //提交修改角色权限按钮
    role() {
      this.$axios({
        url: '/api/admin/rbac/role/change-permission-group',
        method: 'post',
        data: {
          role_id: this.id,
          group_code: this.list.toString()
        }
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          // 隐藏新增用户表单窗口
          this.rolesDialogFormVisible = false
          // 表单元素的数据重置
          //   this.$refs.addForm.resetFields()
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
    //修改角色权限点击选中和移除
    handleCheckChange(data, checked) {
      console.log(data, checked);
      if (checked == true) {
        console.log('添加');
        //设置一个flag标记
        var flag = false;
        for (var b = 0; b < this.list.length; b++) {
          if (data.code == this.list[b]) {
            flag = true
          }
        }
        if (flag == false) {
          this.list.push(data.code)
        }

        console.log(this.list);
      } else if (checked == false) {
        console.log('移除');
        for (var i = 0; i < this.list.length; i++) {
          if (data.code == this.list[i]) {
            this.list.splice(i, 1)
          }
        }
        console.log(this.list);

      }
    },
    handleNodeClick(node, data) {
      console.log(node, data);

    },
    //修改权限弹框
    grantuserrole(row) {
      this.id = row.id
      this.rolesDialogFormVisible = true
      console.log(row);
      this.$axios({
        url: 'api/admin/rbac/role/permission-group',
        params: {
          role_id: row.id
        }
      }).then(res => {
        console.log(res);
        this.data2 = res.data.data
        for (var j = 0; j < this.data2.length; j++) {
          //   console.log(this.data[j]);

          if (this.data2[j].hold == 1) {
            this.list.push(this.data2[j].code)
          }
        }
        console.log(this.list);

      })
    },
    //修改信息确认按钮
    edit() {
      this.$axios({
        url: '/api/admin/rbac/role',
        method: 'put',
        data: this.editForm
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          // 隐藏新增用户表单窗口
          this.editDialogFormVisible = false
          // 表单元素的数据重置
          //   this.$refs.addForm.resetFields()
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
    //修改信息
    handleEdit(row) {
      console.log(row);
      this.editDialogFormVisible = true
      this.editForm.role_id = row.id
      this.editForm.name = row.name
      this.editForm.description = row.description
    },
    //删除用户
    del(id) {
      this.$confirm(`此操作将永久删除id号为${id}的角色, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发起删除请求
        this.$axios({
          url: '/api/admin/rbac/role',
          method: 'DELETE',
          data: {
            role_id: id,
          }
        }).then(res => {
          console.log(res);

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
    // 新增用户
    add() {
      this.$axios({
        url: '/api/admin/rbac/role',
        method: 'post',
        data: this.addForm
      }).then(res => {
        console.log(res);
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
    },
    // 取消按钮
    cancel() {
      // 隐藏新增用户表单窗口
      this.addDialogFormVisible = false
      this.editDialogFormVisible = false
      this.rolesDialogFormVisible = false,
        this.list = []
      //   this.editDialogFormVisible = false
      // 表单元素的数据重置
      this.$refs.addForm.resetFields()
    },
    // 获取角色列表
    init() {
      this.$axios({
        url: '/api/admin/rbac/roles',
        method: 'get',
        params: {
          page: this.pagenum,
          page_rows: this.pagesize,
        }
      }).then(res => {
        console.log(res);
        this.total = res.data.data.total
        this.roleList = res.data.data.list
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.roles {
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>