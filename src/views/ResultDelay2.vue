<template>
  <div class="result-box">
    <div class="success-pic" />
    <div class="sub-info">
        <div class="info-title">延期还款</div>
        <div class="info-content">您的订单当前未逾期</div>
    </div>
    <div class="detail-box">
        <div class="det-line">
            <div class="det-txt">延期后还款日</div>
            <div class="det-txt">2019.06.04</div>
        </div>
        <div class="det-line second">
            <div class="det-txt">延期后还款金额</div>
            <div class="det-txt">30000元</div>
        </div>
    </div>
    <div class="bot-btn">回到首页</div>
  </div>
</template>

<script>
// 延期还款
export default {
  name: 'ResultDelay2',
  data() {
      return {
          some: '123'
      }
  },
  mounted() {
      document.title = '延期还款'
  },
}
</script>

<style scoped>
.result-box {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #fff;
    overflow: hidden;
}
.result-box .success-pic {
    width: 1.7rem;
    height: 1.94rem;
    margin: 1.2rem auto 0;
    background: url('../assets/icon-success.png') no-repeat center;
    background-size: contain;
}
.bot-btn {
    position: absolute;
    bottom: 1rem;
    left: 1.35rem;
    width:4.8rem;
    height:.88rem;
    background:linear-gradient(207deg,rgba(255,178,43,1),rgba(255,151,30,1));
    box-shadow:0px .2rem .81rem 0px rgba(255,160,32,0.3);
    border-radius:.1rem;
    color: #fff;
    text-align: center;
    line-height: .88rem;
    font-size: .32rem;
}
.sub-info {
    text-align: center;
    margin-top: 1.2rem;
}
.sub-info .info-title {
    font-size: .34rem;
    color: #333333;
}
.sub-info .info-content {
    margin-top: .5rem;
    color:rgba(136,141,151,1);
    font-size: .28rem;
}
.detail-box {
    margin-top: 1rem;
    padding: .4rem;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #E3E3E3;
    border-bottom: 1px solid #E3E3E3;
    font-size: .3rem;
    color: #888D97;
}
.detail-box .det-line {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.detail-box .det-line.second {
    margin-top: .4rem;
}
</style>