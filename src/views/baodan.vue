<!-- 保单管理 -->
<template>
  <div class="baodan">
    <!-- 面包屑 -->
    <div class="bread">
      保单管理
    </div>
    <div class="content">
      <div class="money">
        <span>租客保费金额 : </span>
        <i>5元</i>
        <span>修改</span>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <div class="box" @click="insured(0)">待投保</div>
        <div class="box" @click="insured(1)">已投保</div>
        <div class="box" @click="insured(2)">全部</div>
        <span>
          <i>关键字搜索: </i>
          <input type="text" placeholder="请输入" v-model="value1" />
        </span>
        <span>搜索</span>
        <span class="">
          <i>到期时间: </i>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </span>
      </div>

      <div class="derive">导出Excel</div>
    </div>
    <div class="forms">
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="room"
          label="签约房间"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="t_name"
          label="承租姓名"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="t_phone" label="租客手机号" width="110">
        </el-table-column>
        <el-table-column prop="t_sex" label="性别" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="t_id_card"
          label="租客身份证号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="起租时间"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="到租时间"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="is_insured"
          label="是否投保"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ri_number"
          label="保单信息"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="do" label="操作" width="159" align="center">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">
              编辑保单
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
          :total="total - 0"
        >
        </el-pagination>
      </div>
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
      show:false,
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
      is_insured: 1,
      //列表
      tableList: [],
      //分页器
      total: "",
      pagesize: "",
      pagenum: 1,
      page: "",
      tableData: [
        {
          room: "物业名称-楼层-房间名称",
          nameZ: "王小虎",
          telZ: 12345678901,
          sex: "男",
          numZ: 123456789012345678,
          nameF: "王小虎",
          telF: 12345678900,
          numF: 123456789012345678,
          star: "2019-10-10",
          end: "2019-10-10",
          report: "是",
          note: "一二三",
          do: "完成报备,备注说明"
        },
        {
          room: "物业名称-楼层-房间名称",
          nameZ: "王小虎",
          telZ: 12345678901,
          sex: "男",
          numZ: 123456789012345678,
          nameF: "王小虎",
          telF: 12345678900,
          numF: 123456789012345678,
          star: "2019-10-10",
          end: "2019-10-10",
          report: "是",
          note: "一二三",
          do: "完成报备,备注说明"
        },
        {
          room: "物业名称-楼层-房间名称",
          nameZ: "王小虎",
          telZ: 12345678901,
          sex: "男",
          numZ: 123456789012345678,
          nameF: "王小虎",
          telF: 12345678900,
          numF: 123456789012345678,
          star: "2019-10-10",
          end: "2019-10-10",
          report: "是",
          note: "一二三",
          do: "完成报备,备注说明"
        },
        {
          room: "物业名称-楼层-房间名称",
          nameZ: "王小虎",
          telZ: 12345678901,
          sex: "男",
          numZ: 123456789012345678,
          nameF: "王小虎",
          telF: 12345678900,
          numF: 123456789012345678,
          star: "2019-10-10",
          end: "2019-10-10",
          report: "是",
          note: "一二三",
          do: "完成报备,备注说明"
        }
      ]
    };
  },
  methods: {
    //编辑保单
    edit(data) {
        console.log(data);
        this.show = true;
    },
    // 弹框操作
    handleEdit(btn) {
        if(btn === 1) {
            // 保存
            // 调用相关接口保存编辑信息
        }
        if(btn === 2) {
            this.show = false;
        }
    },
    // 查询数据
    search() {
        this.$axios({
            url:'/api/admin/insurances',
            method: 'get',
            params: {
                page: this.pagenum,
                page_rows: this.pagesize,
                search: this.value1,
                is_insured: this.is_insured
            }
        }).then(res=>{
            console.log(res)
        })
    },
    //是否投保
    insured(key) {
      this.is_insured = key;
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
    }
  },
  mounted() {
      this.search();
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
  width: 1100px;
  padding: 20px;

  .edit{
    width: 300px;
    height:300px;
    background-color: #fff;
    position: absolute;
    top: 100px;
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
