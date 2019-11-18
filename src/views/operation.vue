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
        <input v-model="input1" type="text" :placeholder="one" />元
      </div>
      <div>
        <span>二级分销</span>
        <span>奖励</span>
        <input v-model="input2" type="text" :placeholder="two" />元
      </div>
      <div @click="setMoney">保存</div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            one: '',
            two: '',
            input1: '',
            input2: ''
        }
    },
    mounted() {
        this.$axios({
            url: '/api/admin/distribution-ratio'
        }).then(res=>{
            console.log(res);
            this.one = res.data.data.distribution_one_ratio;
            this.two = res.data.data.distribution_two_ratio;
        })
    },
    methods: {
        setMoney() {
            this.$axios({
                url: '/api/admin/distribution-ratio',
                method: 'post',
                data: {
                    distribution_one_ratio: this.input1,
                    distribution_two_ratio: this.input2
                }
            }).then(res=>{
                console.log(res);
                this.input1 = '';
                this.input2 = ''
            })
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
