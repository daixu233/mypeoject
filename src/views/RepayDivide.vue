<template>
  <div class="repay-divide">
    <div class="top-bg" />
    <div class="order-box">
        <div class="out-title">分期还款（共4期）</div>
        <div class="time-icon" />
        <div class="tips-title">当前需还金额（元）</div>
        <div class="amount">
            <div class="unit">¥</div>
            <div class="num">30,000</div>
            <div class="float">.00</div>
        </div>
        <div class="bank-line">
            <div class="bank-left">扣款银行卡</div>
            <div class="bank-id">6212263****7778888（农业银行）</div>
        </div>
    </div>
    <div class="select-box">
        <div class="all-select">
            <div class="select-icon" />
            <div class="select-txt">全选</div>
            <div class="bot-line" />
        </div>
        <div class="select-list">
            <div class="first-line">
                <div class="select-icon" />
                <div class="select-txt">1,000.00</div>
            </div>
            <div class="select-tips">还款日：2019.01.01</div>
            <div class="bot-line" />
        </div>
        <div class="select-list">
            <div class="first-line">
                <div class="select-icon" />
                <div class="select-txt">1,000.00</div>
            </div>
            <div class="select-tips">还款日：2019.01.01</div>
            <div class="bot-line" />
        </div>
        <div class="select-list">
            <div class="first-line">
                <div class="select-icon" />
                <div class="select-txt">1,000.00</div>
            </div>
            <div class="select-tips">还款日：2019.01.01</div>
        </div>
    </div>
    <BotBtn title="立即还款" />
  </div>
</template>

<script>
// 借款首页
import BotBtn from '@/components/public/BotBtn.vue'

export default {
  name: 'home',
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
.repay-divide .top-bg {
    width: 7.5rem;
    height: 2.95rem;
    background: url('../assets/loan_bg.png') no-repeat center center;
    background-size: 7.5rem 2.95rem;
}
.repay-divide .order-box {
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
.repay-divide .order-box .out-title {
    position: absolute;
    top: -.7rem;
    left: 0;
    color: #fff;
    font-size:.36rem;
    text-shadow:0px 1px 1px rgba(0, 0, 0, 0.07);
}
.repay-divide .order-box .time-icon {
    position: absolute;
    right: 0;
    top: -1.3rem;
    width: 1.71rem;
    height: 1.71rem;
    background: url('../assets/time.png') no-repeat center;
    background-size: contain;
}
.repay-divide .order-box .tips-title {
    font-size:.28rem;
    color:rgba(102,102,102,1);
    margin-top: .5rem;
    margin-left: .4rem;
}
.repay-divide .amount {
    display: flex;
    flex-direction: row;
    margin-top: .3rem;
    margin-left: .4rem;
}
.repay-divide .amount .unit {
    font-size: .36rem;
    align-self: flex-start;
    margin-top: .1rem;
}
.repay-divide .amount .num {
    font-size: .84rem;
    margin-left: .1rem;
}
.repay-divide .amount .float {
    align-self: flex-end;
    font-size: .54rem;
    margin-bottom: .05rem;
}
.repay-divide .bank-line {
    width: 6.2rem;
    margin: 0 auto;
    margin-top: .3rem;
    border-top: 1px solid rgba(234,234,234,1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: .3rem;
}
.repay-divide .bank-line .bank-left {
    font-size:.26rem;
    color:rgba(131,136,143,1);
}
.repay-divide .bank-line .bank-id {
    font-size:.26rem;
    color:rgba(51,51,51,1);
}
.repay-divide .select-box {
    position: relative;
    width:6.90rem;
    background:rgba(255,255,255,1);
    border-radius:.10rem;
    margin: .3rem auto;
}
.repay-divide .select-box .all-select {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: .35rem;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.repay-divide .select-icon {
    width: .36rem;
    height: .36rem;
    background: url('../assets/select1.png') no-repeat center;
    background-size: contain;
}
.repay-divide .select-box .select-txt {
    font-size:.28rem;
    color:rgba(131,136,143,1);
    margin-left: .2rem;
}
.repay-divide .bot-line {
    position: absolute;
    left: .35rem;
    bottom: 0;
    width: 6.2rem;
    height: 1px;
    background: #EAEAEA;
}
.repay-divide .select-list {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: .35rem;
}
.repay-divide .select-list .first-line {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.repay-divide .select-list .first-line .select-txt {
    font-size:.36rem;
    font-weight:bold;
    color:rgba(24,35,67,1);
    margin-left: .2rem;
}
.repay-divide .select-list .bot-line {
    background: #F3F7F6;
}
.repay-divide .select-tips {
    font-size:.28rem;
    color:rgba(153,153,153,1);
    margin-left: .55rem;
    margin-top: .2rem;
}
</style>