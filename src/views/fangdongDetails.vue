<!-- 房东详情 -->
<template>
  <div class="zukeDetails">
    <div class="head">
      <!-- 面包屑 -->
      <div class="bread">
        房东详情
      </div>
      <div class="right-btn">
        停用账户
      </div>
    </div>
    <div class="container">
      <div class="admin">
        <div class="box1">
          <div class="head"></div>
          <div class="change">
            管理员1
          </div>
          <div class="change check">
            已实名认证
          </div>
        </div>
        <div class="box2">
          <div>
            <span>昵称</span>
            <span>张三</span>
          </div>
          <div>
            <span>生日</span>
            <span>1990年3月22日</span>
          </div>
          <div>
            <span>性别</span>
            <span>男</span>
          </div>
          <div>
            <span>身份证号码</span>
            <span>123456789098765432</span>
          </div>
        </div>
        <div class="box2">
          <div>
            <span>手机号</span>
            <span>12345678909</span>
          </div>
          <div>
            <span>年龄</span>
            <span>22岁</span>
          </div>
          <div>
            <span>注册时间</span>
            <span>2019-01-01 11:11:11</span>
          </div>
          <div>
            <span>合伙人有效期</span>
            <span>100</span>
          </div>
        </div>
      </div>
      <div class="middle">
        <div>
          <span class="rise">账户余额</span>
          <span>10</span>
          <span class="rise">共惠金币</span>
          <span>100</span>
        </div>
        <div>
          <span class="rise">物业数量</span>
          <span>100</span>
          <span class="rise">房间数量</span>
          <span>200</span>
        </div>
      </div>
      <el-table :data="tableData" type="index" border style="width: 100%">
        <el-table-column label="物业信息">
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="date"
            label="物业名字"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="物业类型"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="地理位置"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="详细地址"
            width="160"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="建筑面积"
            width="130"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="占地面积"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="房间数"
            width="110"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="租客是否投保"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="name" label="操作" width="159" align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {};
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
