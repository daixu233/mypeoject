<template>
  <div class="result-box">
    <div class="wraning-pic" />
    <div class="sub-info">
        <div class="info-title">还款失败</div>
        <div class="info-content">失败原因：银行卡余额不足！</div>
    </div>
    <div class="bot-btn">回到首页</div>
  </div>
</template>

<script>
// 还款结果
export default {
  name: 'ResultDelay',
  data() {
      return {
          some: '123'
      }
  },
  mounted() {
      document.title = '还款结果'
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
.result-box .wraning-pic {
    width: 1.7rem;
    height: 1.94rem;
    margin: 1.2rem auto 0;
    background: url('../assets/icon-warning.png') no-repeat center;
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
</style>