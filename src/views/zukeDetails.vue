<!-- 租客详情 -->
<template>
  <div class="zukeDetails">
    <div class="head">
      <!-- 面包屑 -->
      <div class="bread">
        租客详情
      </div>
      <div class="right-btn" @click="handleUse(1)" v-if="isUse">
        启用账户
      </div>
      <div class="right-btn" @click="handleUse(0)" v-else>
        停用账户
      </div>
    </div>
    <div class="container">
      <div class="admin">
        <div class="box1">
          <div class="head">
            <img :src="nameList.avatar" alt="">
          </div>
          <div class="change">
            {{nameList.nickname}}
          </div>
          <div class="change check" v-if="nameList.certification=='已认证'">
            已实名认证
          </div>
          <div class="change check" style="background-color:red" v-if="nameList.certification=='未认证'">
            未实名认证
          </div>
        </div>
        <div class="box2">
          <div>
            <span>昵称</span>
            <span>{{nameList.nickname}}</span>
          </div>
          <div>
            <span>生日</span>
            <span>{{nameList.birthday}}</span>
          </div>
          <div>
            <span>性别</span>
            <span>{{nameList.sex}}</span>
          </div>
          <div>
            <span>身份证号码</span>
            <span>{{nameList.id_card}}</span>
          </div>
        </div>
        <div class="box2">
          <div>
            <span>手机号</span>
            <span>{{nameList.phone}}</span>
          </div>
          <div>
            <span>年龄</span>
            <span></span>
          </div>
          <div>
            <span>注册时间</span>
            <span>{{nameList.create_time}}</span>
          </div>
          <div>
            <span>共惠金币</span>
            <span>{{nameList.gold}}</span>
          </div>
        </div>
      </div>
      <el-table :data="tableData" type="index" border style="width: 1299px">
        <el-table-column label="租房信息">
          <el-table-column type="index" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column prop="room_title" label="签约房间" width="180" align="center">
          </el-table-column>
          <el-table-column prop="name" label="房东姓名" width="90" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="房东手机号" width="120" align="center">
          </el-table-column>
          <el-table-column prop="id_card" label="房东身份证" width="160" align="center">
          </el-table-column>
          <el-table-column prop="start_time" label="起租时间" width="110" align="center">
          </el-table-column>
          <el-table-column prop="end_time" label="到租时间" width="110" align="center">
          </el-table-column>
          <el-table-column prop="is_report" label="是否报备" width="80" align="center">
          </el-table-column>
          <el-table-column prop="is_insured" label="是否投保" width="80" align="center">
          </el-table-column>
          <el-table-column prop="insured_remark" label="保单信息" width="159" align="center">
          </el-table-column>
          <el-table-column prop="status" label="入住状态" width="159" align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameList: {},
      tableData: [],
      isUse: false
    }
  },
  methods: {
    handleUse(type) {
      this.$axios({
        url: '/api/admin/tenant',
        method: 'post',
        data: {
          uid: this.nameList.id,
          type: type
        }
      }).then(res => {
        console.log(res);
        this.isUse = !this.isUse;
      })
    }
  },
  mounted() {
    // console.log(this.$route.query.data);
    this.nameList = JSON.parse(this.$route.query.data);
    console.log(this.nameList);
    
    this.isUse = this.nameList.status === '激活' ? false : true;
    this.$axios({
      url: '/api/admin/tenant',
      methods: 'get',
      params: {
        tenant_id: this.nameList.tenant_id,
        page_rows:200
      }
    }).then(res => {
      console.log(res)
      res.data.data.list.forEach((v, i) => {
        this.tableData.push(v);
        this.tableData[i].room_title = this.tableData[i].property_title +'-'+ this.tableData[i].floor +'-'+ this.tableData[i].room_title
        this.tableData[i].start_time =  this.tableData[i].start_time.split(' ')[0]
        this.tableData[i].end_time =  this.tableData[i].end_time.split(' ')[0]
        this.tableData[i].is_insured =
          this.tableData[i].is_insured == 1 ? '是' : '否';
        this.tableData[i].status =
          this.tableData[i].status == 1 ? '租房中' : this.tableData[i].status == 2 ? '申请中' : this.tableData[i].status == 3 ? '已退租' : '已拒绝'
          this.tableData[i].is_report = this.tableData[i].is_report==1 ? '是' : '否'
      })
      console.log(this.tableData);
      
    })
  }
};
</script>

<style lang="less" scoped>
.zukeDetails {
  padding: 20px;
  .head {
    overflow: hidden;

    .bread {
      font-size: 18px;
      float: left;
      font-weight: 700;
    }

    .right-btn {
      float: right;
      font-size: 14px;
      padding: 6px 12px;
      border: 1px solid #72b7a0;
      border-radius: 6px;

      &:hover {
        cursor: pointer;
        color: #fff;
        background-color: #72b7a0;
      }
    }
  }
  .container {
    padding-top: 30px;
    font-size: 16px;

    .admin {
      display: flex;
      // background-color: #e6e;
      width: 100%;
      height: 240px;
      border: 1px solid #ccc;
      margin-bottom: 40px;

      .box1 {
        flex: 2;
        border-right: 1px solid #ccc;
        // background-color: aqua;
        .head {
          height: 100px;
          width: 100px;
          // background-color: aqua;
          margin: 20px auto 20px;
          border-radius: 70px;
        }
        .change {
          text-align: center;
          font-size: 16px;
        }
        .check {
          font-size: 14px;
          width: 120px;
          margin: 10px auto;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          color: #fff;
          background-color: #77b79f;
        }
      }
      .box2 {
        font-size: 16px;
        flex: 3;
        display: flex;
        flex-direction: column;
        div {
          flex: 1;
          display: flex;
          // justify-content: center;
          // align-items: center;
          &:not(:last-child) {
            border-bottom: 1px solid #ccc;
          }
          span {
            flex: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            &:first-child {
              flex: 1;
              width: 110px;
              border-right: 1px solid #ccc;
            }
          }
        }
        &:last-child {
          border-left: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
