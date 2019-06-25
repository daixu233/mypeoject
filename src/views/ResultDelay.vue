<template>
  <div class="result-box">
    <div class="success-pic" />
    <div class="sub-info">
        <div class="info-title">展期成功</div>
        <div class="info-content">您的展期申请已通过！</div>
    </div>
    <div class="bot-btn">回到首页</div>
  </div>
</template>

<script>
// 展期成功
export default {
  name: 'ResultDelay',
  data() {
      return {
          some: '123'
      }
  },
  mounted() {
      document.title = '展期还款'
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
</style>