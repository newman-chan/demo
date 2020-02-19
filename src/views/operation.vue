<!-- 运营设置 -->
<template>
  <div class="operation">
    <!-- 面包屑 -->
    <div class="bread">
      分销设置
    </div>
    <div class="conter">
      <div>
        <span>一级分销</span>
        <span>奖励</span>
        <input v-model="input1" type="text" :placeholder="one" />元
      </div>
      <div>
        <span>二级分销</span>
        <span>奖励</span>
        <input v-model="input2" type="text" :placeholder="two" />元
      </div>
    </div>
    <h2>合伙人费用</h2>
    <div class="conter">
      <div>
        <span>首次升级</span>
        <span>费用</span>
        <input v-model="input3" type="text" :placeholder="one" />元
      </div>
      <div>
        <span>续费1 年</span>
        <span>费用</span>
        <input v-model="input4" type="text" :placeholder="two" />元
      </div>
      <div>
        <span>续费2 年</span>
        <span>费用</span>
        <input v-model="input5" type="text" :placeholder="two" />元
      </div>
      <div>
        <span>续费3 年</span>
        <span>费用</span>
        <input v-model="input6" type="text" :placeholder="two" />元
      </div>
    </div>
    <h2>共惠金币奖励设置</h2>
    <div class="conter">
      <div>
        <span style="padding-right:210px">实名认证</span>
        <span>奖励</span>
        <input v-model="input7" type="text" :placeholder="one" />金币
      </div>
      <div>
        <span style="padding-right:210px">每日登陆</span>
        <span>奖励</span>
        <input v-model="input8" type="text" :placeholder="two" />金币
      </div>
      <div>
        <span style="padding-right:120px">每次成功入住1个房间</span>
        <span>奖励</span>
        <input v-model="input9" type="text" :placeholder="two" />金币
      </div>
      <div>
        <span style="padding-right:50px">每次完成账单支付且未购买保险</span>
        <span>奖励</span>
        <input v-model="input10" type="text" :placeholder="two" />金币
      </div>
      <div>
        <span style="padding-right:66px">每次完成账单支付且购买保险</span>
        <span>奖励</span>
        <input v-model="input11" type="text" :placeholder="two" />金币
      </div>
    </div>
    <div class="save" @click="setMoney">保存</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      one: "",
      two: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      input9: "",
      input10: "",
      input11: "",
    };
  },
  mounted() {
    this.$axios({
      url: "/api/admin/config"
    }).then(res => {
      console.log(res);
      this.input1 = res.data.data.distribution_one_ratio;
      this.input2 = res.data.data.distribution_two_ratio;
      this.input3 = res.data.data.partner_first_upgrade;
      this.input4 = res.data.data.partner_renew_one_year;
      this.input5 = res.data.data.partner_renew_two_year;
      this.input6 = res.data.data.partner_renew_three_year;
      this.input7 = res.data.data.gold_real_name_auth;
      this.input8 = res.data.data.gold_daily_login;
      this.input9 = res.data.data.gold_check_in;
      this.input10 = res.data.data.gold_bill_payment;
      this.input11 = res.data.data.gold_bill_payment_and_insured;
    });
  },
  methods: {
    setMoney() {
      this.$axios({
        url: "/api/admin/config",
        method: "post",
        data: {
          distribution_one_ratio: this.input1,
          distribution_two_ratio: this.input2,
          partner_first_upgrade: this.input3,
          partner_renew_one_year: this.input4,
          partner_renew_two_year: this.input5,
          partner_renew_three_year: this.input6,
          gold_real_name_auth: this.input7,
          gold_daily_login: this.input8,
          gold_check_in: this.input9,
          gold_bill_payment: this.input10,
          gold_bill_payment_and_insured: this.input11
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: res.data.message,
            type: 'success'
          });
        }
        // this.input1 = "";
        // this.input2 = "";
      });
    }
  }
};
</script>

<style lang="less" scoped>
.operation {
  padding: 20px;
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .conter {
    font-size: 16px;
    div {
      padding-top: 20px;

      span:first-child {
        padding-right: 60px;
      }
      span:nth-child(2) {
        padding-right: 30px;
      }
      input {
        width: 120px;
        height: 30px;
        border: 1px solid #d2d2d2 !important;

      }
    }
  }
  h2 {
    font-weight: bold;
    font-size: 18px;
    padding: 50px 0 10px;
  }
  .save {
    height: 30px;
    width: 72px;
    text-align: center;
    line-height: 30px;
    background-color: #77b79f;
    margin-top: 40px;
    padding-top: 0;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }
}
</style>
