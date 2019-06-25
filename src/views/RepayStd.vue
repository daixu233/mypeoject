<template>
  <div class="repay-std">
    <div class="top-bg" />
    <div class="order-box">
        <div class="out-title">
            <span>立即还款</span>
            <span class="title-sub">(“好借好还，在借不难哦!”)</span>
        </div>
        <div class="time-icon" />
        <div class="tips-title">还款金额（元）</div>
        <div class="amount">
            <div class="unit">¥</div>
            <div class="num">3000.00</div>
            <div class="repay-btn">部分还款</div>
        </div>
        <div class="bank-line">
            <div class="bank-left">当前应还 3000.00元</div>
        </div>
    </div>
    <BotBtn title="立即还款" />
  </div>
</template>

<script>
// 借款首页
import BotBtn from '@/components/public/BotBtn.vue'

export default {
  name: 'RepayStd',
  data() {
      return {
          some: '123'
      }
  },
  components: {
      BotBtn
  }
}
</script>

<style>
body {
    background: #f4f7f6;
}
.repay-std .top-bg {
    width: 7.5rem;
    height: 2.95rem;
    background: url('../assets/loan_bg.png') no-repeat center center;
    background-size: 7.5rem 2.95rem;
}
.repay-std .order-box {
    position: relative;
    margin: 0 auto;
    margin-top: -1.6rem;
    width: 6.9rem;
    height: 3.1rem;
    background: rgba(255,255,255,1);
    border-radius: .1rem;
    display: flex;
    flex-direction: column;
}
.repay-std .order-box .out-title {
    position: absolute;
    top: -.7rem;
    left: 0;
    color: #fff;
    font-size:.36rem;
    text-shadow:0px 1px 1px rgba(0, 0, 0, 0.07);
}
.repay-std .order-box .out-title .title-sub {
    font-size: .26rem;
}
.repay-std .order-box .time-icon {
    position: absolute;
    right: 0;
    top: -1.3rem;
    width: 1.71rem;
    height: 1.71rem;
    background: url('../assets/time.png') no-repeat center;
    background-size: contain;
}
.repay-std .order-box .tips-title {
    font-size:.28rem;
    color:rgba(102,102,102,1);
    margin-top: .5rem;
    margin-left: .4rem;
}
.repay-std .amount {
    position: relative;
    display: flex;
    flex-direction: row;
    margin-top: .3rem;
    margin-left: .4rem;
}
.repay-std .amount .unit {
    font-size: .36rem;
    align-self: flex-start;
    margin-top: .1rem;
}
.repay-std .amount .num {
    font-size: .72rem;
    margin-left: .1rem;
}
.repay-std .amount .float {
    align-self: flex-end;
    font-size: .54rem;
    margin-bottom: .05rem;
}
.repay-std .amount .repay-btn {
    position: absolute;
    top: .08rem;
    right: .35rem;
    width:1.62rem;
    height:.56rem;
    border:1px solid rgba(255,164,0,1);
    border-radius:.1rem;
    font-size:.26rem;
    color: rgba(255,164,0,1);
    text-align: center;
    line-height: .56rem;
}
.repay-std .bank-line {
    width: 6.2rem;
    margin: 0 auto;
    margin-top: .3rem;
    border-top: 1px solid rgba(234,234,234,1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: .3rem;
}
.repay-std .bank-line .bank-left {
    font-size:.26rem;
    color:rgba(131,136,143,1);
}
.repay-std .bank-line .bank-id {
    font-size:.26rem;
    color:rgba(51,51,51,1);
}
</style>