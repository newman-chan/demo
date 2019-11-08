<!-- 接口管理 -->
<template>

  <div class="interface">
        <!-- 面包屑 -->
    <div class="bread">
      接口管理
    </div>
    <div class="pay">
      <span>实名认证</span>
      <span>可用次数 &nbsp;&nbsp;(次)</span>
      <span>1200</span>
      <span>充值</span>
    </div>
    <div class="pay">
      <span>短信验证码</span>
      <span>可用条数 (条)</span>
      <span>12000</span>
      <span>充值</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.interface{
  padding: 20px;
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .pay{
    position: relative;
    width: 330px;
    height: 200px;
    background-color: greenyellow;
    display: inline-block;
    margin: 20px 20px 0 0;
    padding-left: 40px;

    span{
      display: block;
      padding-top: 30px;
      font-weight: 700;

      &:nth-child(3){
        font-size: 36px;
        font-weight: 400;
        padding-top: 10px;
      }
      &:last-child{
        position: absolute;
        right: 40px;
        bottom: 30px;
        font-weight: 400;
        font-size: 16px;
        background-color: #fff;
        padding: 6px 14px;
        border: 1px solid grey;
        border-radius: 6px;

        &:hover{
          cursor: pointer;
          background-color: blue;
          color: #fff
        }
      }
    }

  }
}
</style>