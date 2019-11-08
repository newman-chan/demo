<!-- 运营设置 -->
<template>
  <div class="operation">
    <!-- 面包屑 -->
    <div class="bread">
      运营设置
    </div>
    <div class="conter">
      <div>
        <span>一级分销</span>
        <span>奖励</span>
        <input type="text" placeholder="    300        元" />
      </div>
      <div>
        <span>二级分销</span>
        <span>奖励</span>
        <input type="text" placeholder="    100        元" />
      </div>
      <div>保存</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.operation {
  padding: 20px;
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .conter{
    font-size: 16px;
    div{
      padding-top: 20px;

      span:first-child{
        padding-right: 60px;
      }
      span:nth-child(2){
        padding-right: 30px;
      }
      input{
        width: 120px;
        height: 30px;
      }
      &:last-child{
        height: 30px;
        width: 72px;
        text-align: center;
        line-height: 30px;
        background-color: #77b79f;
        margin-top: 20px;
        padding-top:0;
        color: #fff;
        cursor: pointer;
        border-radius: 4px;
      }
    }
    
  }
}
</style>
