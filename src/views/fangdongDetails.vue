<!-- 房东详情 -->
<template>
  <div class="zukeDetails">
    <div class="head">
      <!-- 面包屑 -->
      <div class="bread">
        房东详情{{userInfo.status}}
      </div>
      <!-- <div class="right-btn" @click="handleUse(1)" v-if="isUse ==1">
        启用账户
      </div>
      <div class="right-btn" @click="handleUse(0)" v-if="isUse ==0">
        停用账户
      </div> -->
    </div>
    <div class="container">
      <div class="admin">
        <div class="box1">
          <div class="head">
            <img :src="userInfo.avatar" alt="" />
          </div>
          <div class="change">
            {{ userInfo.nickname }}
          </div>
          <div class="change check" v-if="userInfo.certification=='已认证'">
            已实名认证
          </div>
          <div class="change check" style="background-color:red" v-if="userInfo.certification=='未认证'">
            未实名认证
          </div>
        </div>
        <div class="box2">
          <div>
            <span>昵称</span>
            <span>{{ userInfo.nickname }}</span>
          </div>
          <div>
            <span>生日</span>
            <span>{{ userInfo.birthday }}</span>
          </div>
          <div>
            <span>性别</span>
            <span>{{ userInfo.sex }}</span>
          </div>
          <div>
            <span>身份证号码</span>
            <span>{{ userInfo.id_card }}</span>
          </div>
        </div>
        <div class="box2">
          <div>
            <span>手机号</span>
            <span>{{ userInfo.phone }}</span>
          </div>
          <div>
            <span>年龄</span>
            <span>{{ userInfo.age }}岁</span>
          </div>
          <div>
            <span>注册时间</span>
            <span>{{ userInfo.create_time }}</span>
          </div>
          <div>
            <span>合伙人有效期</span>
            <span>{{ userInfo.partner_expire_time }}</span>
          </div>
        </div>
      </div>
      <div class="middle">
        <div>
          <span class="rise">账户余额</span>
          <span>{{ userInfo.balance }}</span>
          <span class="rise">共惠金币</span>
          <span>{{ userInfo.gold }}</span>
        </div>
        <div>
          <span class="rise">物业数量</span>
          <span>{{ userData.total&&userData.total.property_count }}</span>
          <span class="rise">房间数量</span>
          <span>{{ userData.total&&userData.total.room_count }}</span>
        </div>
      </div>
      <el-table :data="userData.list" type="index" border style="width: 1299px">
        <el-table-column label="物业信息">
          <el-table-column type="index" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column prop="title" label="物业名字" width="180" align="center">
          </el-table-column>
          <el-table-column prop="type" label="物业类型" width="120" align="center">
          </el-table-column>
          <el-table-column prop="map.address" label="地理位置" width="120" align="center">
          </el-table-column>
          <el-table-column prop="address" label="详细地址" width="160" align="center">
          </el-table-column>
          <el-table-column prop="construction_area" label="建筑面积" width="130" align="center">
          </el-table-column>
          <el-table-column prop="floor_area" label="占地面积" width="120" align="center">
          </el-table-column>
          <el-table-column prop="room_num" label="房间数" width="110" align="center">
          </el-table-column>
          <el-table-column prop="is_insured" label="租客是否投保" width="150" align="center">
          </el-table-column>
          <el-table-column prop="name" label="操作" width="159" align="center">
            <template slot-scope="scope">
              <el-button @click="check(scope.row)" type="text" size="small">
                查看详情
              </el-button>
            </template>
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
      userInfo: {},
      userData: {},
      isUse: ''
    };
  },
  methods: {
    //查看物业详情
    check(row) {
      console.log(row);
      this.$router.push({
        path: 'homeDetails',
        query: {
          type: JSON.stringify(row)
        }
      })
    },
    handleUse(type) {
      this.$axios({
        url: "/api/admin/landlord",
        method: "post",
        data: {
          uid: this.userInfo.id,
          type: type
        }
      }).then(res => {
        console.log(res);
        if(res.data.code ==200){
          console.log(123);
          
          this.$message({
            type: 'success',
            message: res.data.message
          })
          this.isUse =!this.isUse
        }
      });
    }
  },
  mounted() {
    this.userInfo = JSON.parse(this.$route.query.data);
    console.log(this.userInfo);
    // if(this.userInfo.status =='激活'){
    //   this.isUse ==0
    // }else{
    //   this.isUse ==1
    // }
    this.isUse = this.userInfo.status === "激活" ? false : true;
    this.$axios({
      url: "/api/admin/landlord",
      methods: "get",
      params: {
        landlord_id: this.userInfo.landlord_id
      }
    }).then(res => {
      console.log(res);
      this.userData = res.data.data;
      this.userData.list
      for (var i = 0; i < this.userData.list.length; i++) {
        this.userData.list[i].is_insured = this.userData.list[i].is_insured == 1 ? '是' : '否'
      }
    });
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
          background-color: aqua;
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
    .middle {
      border: 1px solid #ccc;
      margin-bottom: 50px;
      div {
        height: 50px;
        line-height: 50px;
        display: flex;
        &:first-child {
          border-bottom: 1px solid #ccc;
        }
        span {
          flex: 3;
          text-align: center;
          border-right: 1px solid #ccc;
        }
        .rise {
          flex: 1;
          width: 200px;
          background-color: #f7f7f7;
        }
      }
    }
  }
}
</style>
