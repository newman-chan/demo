<!-- 产品充值 -->
<template>

  <div class="pay">
    <!-- 面包屑 -->
    <div class="bread">
      接口管理 > 产品充值
    </div>
    <h2>本次充值金额可用于数据中心所有产品，意向产品仅作为数量参考</h2>
    <div class="first">
      <div class="left">意向产品</div>
      <div @click='btn(item,index)' v-for="(item,index) in list" :key="index" :class="activeIndex == index ? 'right bg' : 'right'" style='cursor: pointer'>{{item.title}}</div>
    </div>
    <div class="first">
      <div class="left">产品单价</div>
      <div class="right1">{{price}}{{unit}}</div>
    </div>
    <div class="first">
      <div class="left">充值金额</div>
      <div :class="payIndex == index1 ? 'right bg' : 'right'" v-for="(item1,index1) in pay" :key="index1" style='cursor: pointer' @click='payBtn(item1,index1)'>
        {{item1}}元
      </div>
    </div>
    <div class="first">
      <div class="left" style="padding-right:40px">可使用数量</div>
      <div style="font-weight:bold">{{ parseInt(use/price)}}条</div>
    </div>
    <div class="first">
      <div class="left">支付方式</div>
      <div>支付宝/微信扫码支付</div>
    </div>
    <div class="bottom" @click="cost">立即支付</div>
    <div class="box" v-if="show">
      <div class="black">
        <div class="top">
          <div class="left">支付</div>
          <div class="right" @click="close">X</div>
        </div>
        <div class="content">
          <h3>支付:请使用手机支付宝或者微信扫一扫支付</h3>
          <div id="qrcode" style="margin-left:120px;width:180px;height:180px"></div>
          <div class="price">充值金额:<span>{{use}}</span></div>
        </div>
        <div class="bottom1">
          <span @click="close">取消支付</span>
        </div>
      </div>
    </div>
    <div class="box" v-if="success">
      <div class="black">
        <div class="top">
          <div class="left">支付</div>
          <div class="right" @click="close">X</div>
        </div>
        <div class="content1">支付成功</div>
        <div class="bottom1">
          <span @click="close">返回</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入转二维码
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      list: [
        { title: '身份证实名验证', price: 0.4, unit: '元/次', type: 'data_service_two_elements_of_identity_card_real_name_authentication' },
        { title: '银行卡"三要素"核验', price: 0.35, unit: '元/次', type: 'data_service_three_elements_query_of_bank_card' },
        { title: '身份证OCR识别', price: 0.06, unit: '元/次', type: 'data_service_ocr_identity_card_recognition' },
        { title: '短信验证码', price: 0.08, unit: '元/条', type: 'data_service_sms_verification_code' }
      ],
      price: 0.4,
      unit: '元/次',
      pay: [1000, 3000, 5000, 10000, 30000, 50000],
      activeIndex: 0,
      payIndex: 0,
      use: 1000,
      show: false,
      link: '',
      type: 'data_service_two_elements_of_identity_card_real_name_authentication',
      send: {},
      success: false
    }
  },
  methods: {

    //取消支付
    close() {
      this.show = false
      this.success = false
    },
    //支付
    cost() {
      // this.show = true
      this.$axios({
        url: '/api/admin/service/qr-pay',
        method: 'post',
        data: {
          money: this.use,
          api_market_code: this.type
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.link = res.data.data.codeUrl
          var order = res.data.data.lowOrderId
          this.send = { type: "qrPayQuery", lowOrderId: order }
          this.show = true
          this.$nextTick(function () {
            this.qrcode();
          })
          this.initWebSocket()
        }
      })

    },
    initWebSocket() {//初始化weosocket(必须)
      const wsuri = "ws://picc-backend.dev.kcbigdata.cn/websocket";    //请根据实际项目需要进行修改
      this.websock = new WebSocket(wsuri);      //新建一个webstock对象
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {//websocket连接后发送数据(send发送)
      let actions = this.send;     //请根据实际项目需要进行修改
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) { //数据接收
      this.redata = JSON.parse(e.data).data;
      console.log(this.redata);
      console.log(e);
      if (e.data == '{"message":"success","code":200,"data":[]}') {
        console.log('成功');
        this.show = false
        this.success = true
      }
    },
    websocketsend(Data) {//数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {  //关闭
      console.log('断开连接', e);
    },
    //产品选择
    btn(item, index) {
      this.activeIndex = index
      this.price = item.price
      this.unit = item.unit
      this.type = item.type
    },
    //金额选择
    payBtn(item, index) {
      this.payIndex = index
      this.use = item
    },
    qrcode() {
      new QRCode('qrcode', {
        width: 180,
        height: 180,        // 高度
        text: this.link,   // 二维码内容
        // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        background: '#f0f',   // 背景色
        foreground: '#ff0'    // 前景色
      })
    }
  },
  created() {
    // this.initWebSocket();
  },
  destroyed() {
    this.websock.close();//离开路由之后断开websocket连接
  },
  mounted() {
    // this.initWebSocket();
  }
}
</script>

<style lang="less" scoped>
.pay {
  padding: 20px;
  position: relative;
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  h2 {
    padding: 40px 0 30px 0;
    color: red;
    font-weight: bold;
  }
  .first {
    font-size: 16px;
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    .left {
      padding-right: 60px;
    }
    .right {
      border: 1px solid #b1b1b1;
      padding: 4px 8px;
      margin-right: 20px;
    }
    .bg {
      background-color: #4397f8;
      color: #fff;
      border: none;
    }
  }
  .bottom {
    color: #fff;
    background-color: #4397f8;
    width: 160px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 20px;
    cursor: pointer;
  }
  .box {
    z-index: 100;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    .black {
      // padding: 10px;
      position: absolute;
      top: 88px;
      left: 400px;
      width: 400px;
      height: 500px;
      background-color: #fff;
      // border: 1px solid #000;
      border-radius: 6px;
      .top {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #b1b1b1;
        .left {
          font-weight: bold;
          padding-left: 10px;
        }
        .right {
          cursor: pointer;
          font-size: 16px;
          font-weight: 400;
          padding-right: 10px;
        }
      }
      .content {
        width: 100%;
        font-size: 16px;
        h3 {
          font-size: 16px;
          margin: 20px auto;
          text-align: center;
        }
        .price {
          padding-top: 20px;
          text-align: center;
          span {
            padding-left: 20px;
          }
        }
      }
      .content1{
        text-align: center;
        font-size: 24px;
        padding-top: 140px;
      }
      .bottom1 {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        border-top: 1px solid #b1b1b1;
        height: 60px;
        // line-height: 40px;
        text-align: end;
        // padding-bottom: 10px;
        span {
          margin-right: 20px;
          display: inline-block;
          border: 1px solid #b1b1b1;
          font-size: 16px;
          padding: 4px 6px;
          margin-top: 10px;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>