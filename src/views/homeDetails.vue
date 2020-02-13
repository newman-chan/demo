<!-- 物业详情 -->
<template>
  <div class="homeDetails">
    <!-- 面包屑 -->
    <div class="bread">
      物业详情
    </div>
    <div class="picture">
      <div v-for="(item,index) in type.images" :key="index">
        <img style="width:100%;height:100%" :src="item" alt="">
      </div>
    </div>
    <ul class="list">
      <li>{{type.type}}</li>
      <li>建筑面积: {{type.construction_area}}</li>
      <li>占地面积:{{type.floor_area}}</li>
      <li v-if="type.is_insured=='是'">房间保险:租户需投保</li>
      <li v-if="type.is_insured=='否'">房间保险:租户无需投保</li>
      <li>房间数量:{{type.room_num}}个</li>
      <li> 地理位置:{{type.map.area + type.map.address}}</li>
      <li>详细地址:{{type.address}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: {}
    }
  },
  mounted() {
    this.type = JSON.parse(this.$route.query.type)
    console.log(this.type);

  }
}
</script>

<style lang="less" scoped>
.homeDetails {
  padding: 20px;
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .picture {
    padding-top: 20px;
    margin-bottom: 60px;
    div {
      display: inline-block;
      background-color: coral;
      width: 260px;
      height: 200px;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
  .list {
    font-size: 20px;
    li {
    }
  }
}
</style>
