<!-- 物业详情 -->
<template>
  <div class="homeDetails">
       <!-- 面包屑 -->
    <div class="bread">
      物业详情
    </div>
    <div class="picture">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <ul class="list">
        <li >商铺</li>
        <li>建筑面积: 100.12</li>
        <li>占地面积:100.12</li>
        <li>房间保险:租户需投保</li>
        <li>房间数量:12个</li>
        <li> 地理位置:汇一城</li>
        <li>详细地址:汇一城</li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.homeDetails{
  padding: 20px;
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .picture{
      padding-top: 20px;
      margin-bottom: 60px;
      div{
          display: inline-block;
          background-color:coral;
          width: 200px;
          height: 150px;
          margin-right: 20px;
      }
      .list{
          li{
              list-style-type: disc;
          }
      }
  }
}
</style>
