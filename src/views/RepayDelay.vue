<template>
  <div class="repay-delay">
    <div class="top-bg" />
    <div class="order-box">
        <div class="out-title">
            <span>展期还款</span>
            <span class="title-sub">(“延期还款，减轻您的压力”)</span>
        </div>
        <div class="time-icon" />
        <div class="time-line">
            <div class="time-block">
                <div class="first-line">12月12日</div>
                <div class="second-line">原还款日</div>
            </div>
            <div class="time-arrow">
                <div class="center-arrow" />
                <div class="arrow-txt">延期至</div>
            </div>
            <div class="time-block">
                <div class="first-line">02月05日</div>
                <div class="second-line">新还款日</div>
            </div>
        </div>
        <div class="bank-line">
            <div class="bank-left">延期还款手续费</div>
            <div class="bank-id">30.00(元)</div>
        </div>
    </div>
    <div class="tips-txt1">本次应还3000元可延期至2019年2月5日还款</div>
    <div class="tips-txt2">延期后本次将无需还款</div>
    <BotBtn title="立即展期" />
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
.repay-delay .top-bg {
    width: 7.5rem;
    height: 2.95rem;
    background: url('../assets/loan_bg.png') no-repeat center center;
    background-size: 7.5rem 2.95rem;
}
.repay-delay .order-box {
    position: relative;
    margin: 0 auto;
    margin-top: -1.6rem;
    width: 6.9rem;
    background: rgba(255,255,255,1);
    border-radius: .1rem;
    display: flex;
    flex-direction: column;
}
.repay-delay .order-box .out-title {
    position: absolute;
    top: -.7rem;
    left: 0;
    color: #fff;
    font-size:.36rem;
    text-shadow:0px 1px 1px rgba(0, 0, 0, 0.07);
}
.repay-delay .order-box .out-title .title-sub {
    font-size: .26rem;
}
.repay-delay .order-box .time-icon {
    position: absolute;
    right: 0;
    top: -1.3rem;
    width: 1.71rem;
    height: 1.71rem;
    background: url('../assets/time.png') no-repeat center;
    background-size: contain;
}
.repay-delay .order-box .time-line {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    margin-top: .6rem;
    padding-bottom: .25rem;
}
.repay-delay .time-line .time-block {
    flex-grow: 1;
    text-align: center;
}
.repay-delay .time-line .time-block .first-line {
    font-size:.36rem;
    font-weight:bold;
    color:rgba(24,35,67,1);
}
.repay-delay .time-line .time-block .second-line {
    margin-top: .2rem;
    font-size:.28rem;
    color:rgba(183,186,196,1);
}
.repay-delay .time-line .time-arrow {
    flex-grow: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .22rem;
}
.repay-delay .time-line .time-arrow .center-arrow {
    width: 1.33rem;
    height: .09rem;
    background: url('../assets/center-arrow.png') no-repeat center;
    background-size: contain;
}
.repay-delay .time-line .time-arrow .arrow-txt {
    margin-top: .2rem;
    font-size:.28rem;
    color:rgba(102,102,102,1);
}

.repay-delay .bank-line {
    width: 6.2rem;
    margin: 0 auto;
    margin-top: .3rem;
    border-top: 1px solid rgba(234,234,234,1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: .3rem;
    padding-bottom: .35rem;
}
.repay-delay .bank-line .bank-left {
    font-size:.26rem;
    color:rgba(131,136,143,1);
}
.repay-delay .bank-line .bank-id {
    font-size:.26rem;
    color:rgba(51,51,51,1);
}
.repay-delay .tips-txt1 {
    width: 100%;
    text-align: center;
    font-size:.28rem;
    color:rgba(51,51,51,1);
    margin-top: .8rem;
}
.repay-delay .tips-txt2 {
    width: 100%;
    text-align: center;
    font-size:.26rem;
    color:rgba(183,186,196,1);
    margin-top: .18rem;
}
</style>