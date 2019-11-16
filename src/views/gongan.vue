<!-- 公安报备 -->
<template>
  <div class="gongan">
    <!-- 面包屑 -->
    <div class="bread">
      公安报备
    </div>
    <div class="content">
      <!-- 搜索框 -->
      <div class="search">
        <div class="box" @click="handleChoose(0)">待报备</div>
        <div class="box" @click="handleChoose(1)">已报备</div>
        <span>
          <i>关键字搜索: </i>
          <input type="text" placeholder="请输入" v-model="value" />
        </span>
        <span>搜索</span>
      </div>
      <div class="derive">导出Excel</div>
    </div>
    <div class="forms">
      <!-- 表格 -->
      <el-table :data="tableList"  border style="width: 100%">
        <el-table-column
          label="序号"
          width="50"
          align=center
        >
        </el-table-column >
        <el-table-column  prop="r-title" label="签约房间" width="180" align=center>
        </el-table-column>
        <el-table-column prop="t_name" label="承租姓名" width="80" align=center>
        </el-table-column>
        <el-table-column prop="t_phone" label="租客手机号" width="110">
        </el-table-column>
        <el-table-column prop="t_sex" label="性别" width="50" align=center>
        </el-table-column>
        <el-table-column prop="t_id_card" label="租客身份证号" width="180" align=center>
        </el-table-column>
        <el-table-column prop="l_name" label="房东姓名" width="80" align=center>
        </el-table-column>
        <el-table-column prop="l_phone" label="房东手机号" width="110" align=center>
        </el-table-column>
        <el-table-column prop="l_id_card" label="房东身份证" width="180" align=center>
        </el-table-column>
        <el-table-column prop="star_time" label="起租时间" width="100" align=center>
        </el-table-column>
        <el-table-column prop="end_time" label="到租时间" width="100" align=center>
        </el-table-column>
        <el-table-column prop="is_report" label="是否报备" width="80" align=center>
        </el-table-column>
        <el-table-column prop="report_remark" label="备注" width="100" align=center>
        </el-table-column>
        <el-table-column prop="do" label="操作" width="159" align=center>
          <template slot-scope="scope">
            <el-button
              @click="handleBtn(scope.row, 1)"
              type="text"
              size="small"
            >
              完成报备
            </el-button>
            <el-button
              @click="handleBtn(scope.row, 2)"
              type="text"
              size="small"
            >
              备注说明
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
    <!-- 编辑备注 -->
      <div class="edit" v-if="show">
        <h1>备注信息</h1>
        <textarea name="请填写保单信息" id="" cols="30" rows="6" placeholder="请填写备注信息" v-model="texts"></textarea>
        <div>
          <div @click="handleSave(1)">保存</div>
          <div @click="handleSave(2)">取消</div>
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
      value: "",
      is_report: 1,
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
          star:'2019-10-10',
          end:'2019-10-10',
          report:'是',
          note:'一二三',
          do:'完成报备,备注说明'
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
          star:'2019-10-10',
          end:'2019-10-10',
          report:'是',
          note:'一二三',
          do:'完成报备,备注说明'
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
          star:'2019-10-10',
          end:'2019-10-10',
          report:'是',
          note:'一二三',
          do:'完成报备,备注说明'
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
          star:'2019-10-10',
          end:'2019-10-10',
          report:'是',
          note:'一二三',
          do:'完成报备,备注说明'
        }
        
      ],
      //列表
      tableList: [],
      //分页器
      total: "",
      pagesize: "",
      pagenum: 1,
      page: "",
      id: '',
      texts: ''
    };
  },
  methods: {
      // 查询数据
      search() {
          this.$axios({
              url: '/api/admin/reports',
              method: 'get',
              params: {
                  page: this.pagenum,
                  page_rows: this.pagesize,
                  search: this.value,
                  is_report: this.is_report
              }
          }).then(res=>{
              console.log(res);
              this.tableList = res.data.data.list;
              for (var i = 0; i < this.tableList.length; i++) {
                this.tableList[i].sex =
                    this.tableList[i].t_sex == 1
                    ? "男"
                    : this.tableList[i].t_sex == 2
                    ? "女"
                    : "未知";
                this.tableList[i].is_report =
                    this.tableList[i].is_report == 1 ? "是" : "否";
              }
          })
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
    // 报备按钮
    handleChoose(index) {
        this.is_report = index;
        this.search();
    },
    // 列表操作
    handleBtn(data, index) {
        if(index == 1) {
            this.$axios({
                url: '/api/admin/report',
                method: 'put',
                data: {
                    id: data.id,
                    is_report: 1
                }
            }).then(res=>{
                console.log(res)
            })
        }
        if(index == 2) {
            console.log(index);
            this.id = data.id;
            this.show = true;
        }
    },
    // 提交备注
    handleSave(index) {
        if(index == 1) {
            this.$axios({
                url: '/api/admin/report',
                method: 'post',
                data: {
                    id: this.id,
                    report_remark: this.texts
                }
            }).then(res=>{
                this.show = false;
                this.texts = '';
                console.log(res)
            })
        }
        if(index == 2) {
            this.show = false;
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
.gongan {
  // width: 1100px;
  padding: 20px;

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

      .box{
        display: inline;
        background-color: #e4e4e4;
        padding: 6px 20px;
        border-radius: 22px;

        &:hover{
          cursor: pointer;
        }

        &:first-child{
          margin-right: 22px;
        }

        &:nth-child(2){
          margin-right: 100px
        }
      }

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
        width: 150px;
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

      .edit{
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
    .pages{
      padding: 20px
    }
  }
}
</style>