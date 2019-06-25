<template>
  <div class="loan-detail">
    <div class="top-bg" />
    <div class="order-box">
        <div class="order-title">借款金额(元)</div>
        <div class="order-num">30,000.00</div>
        <div class="order-tips">日利率 0.06%</div>
    </div>
    <div class="loan-block">
        <div class="loan-title">
            <div class="left-box">还款计划</div>
            <div class="plan-box">
                <div class="plan-txt">共7期</div>
                <div class="arraw-icon" />
            </div>
        </div>
        <div class="det-line">
            首期<span class="det-grey">6月28日</span><span class="det-yellow">应还300.28元</span>
        </div>
    </div>
    <div class="loan-block">
        <div class="loan-title">
            <div class="left-box">资金明细</div>
        </div>
        <div class="det-line">
            实际到账：<span class="det-deep">700元</span>
            <span class="det-right">服务费用：<span class="det-deep">300元</span></span>
        </div>
    </div>
    <div class="loan-block">
        <div class="loan-title option">
            <div class="left-box">还款方式</div>
            <div class="plan-box">
                借款后每隔一天还款
            </div>
        </div>
        <div class="bank-line">
            <div class="bank-link">
                <div class="bank-title">收款银行</div>
                <div class="arraw-icon" />
            </div>
        </div>
        <div class="bank-info">
            <div class="bank-icon" />
            <div class="bank-name">中国建设银行 (尾号3126)</div>
        </div>
    </div>
    <BotBtn title="提交借款申请" />
  </div>
</template>

<script>
// @ is an alias to /src
// 借款首页
import BotBtn from '@/components/public/BotBtn.vue'

export default {
  name: 'home',
  data() {
      return {
          some: '1233'
      }
  },
  mounted() {
      document.title = '我要借款'
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
.loan-detail {
    font-size: .3rem;
    font-family:PingFangSC-Regular;
}
.loan-detail .top-bg {
    width: 7.5rem;
    height: 2.95rem;
    background: url('../assets/loan_bg.png') no-repeat center center;
    background-size: 7.5rem 2.95rem;
}
.loan-detail .order-box {
    margin: 0 auto;
    margin-top: -2rem;
    width: 6.9rem;
    height: 3.1rem;
    background: rgba(255,255,255,1);
    border-radius: .1rem;
    overflow: hidden;
}
.loan-detail .order-title {
    font-size:.28rem;
    color:rgba(175,174,177,1);
    margin-top: .4rem;
    margin-left: .5rem;
}
.loan-detail .order-num {
    font-size:.90rem;
    font-family:Bahnschrift;
    font-weight:bold;
    color:rgba(24,35,67,1);
    margin-left: .5rem;
    margin-top: .3rem;
}
.loan-detail .order-tips {
    font-size:.27rem;
    color:rgba(53,53,53,1);
    opacity:0.8;
    margin-top: .4rem;
    margin-left: .8rem;
}
.loan-detail .loan-block {
    width: 6.9rem;
    box-sizing: border-box;
    padding: .3rem;
    background:rgba(255,255,255,1);
    border-radius: .1rem;
    margin: 0 auto;
    margin-top: .25rem;
}
.loan-detail .loan-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.loan-detail .loan-title.option {
    padding-bottom: .3rem;
    border-bottom: 1px solid #EAEAEA;
}
.loan-detail .loan-title .left-box {
    font-size: .32rem;
    color:rgba(42,50,55,1);
    line-height:.19rem;
}
.loan-detail .plan-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    color:rgba(163,161,169,1);
    font-size:.3rem;
}
.loan-detail .plan-txt {
    margin-right: .4rem;
}
.loan-detail .arraw-icon {
    width: .14rem;
    height: .26rem;
    background: url('../assets/left-arrow.png') no-repeat center;
    background-size: contain;
}
.loan-detail .det-line {
    margin-top: .4rem;
    color:rgba(102,102,102,1);
    font-size: .28rem;
}
.loan-detail .det-grey {
    margin-left: .1rem;
    color: #A3A1A9;
}
.loan-detail .det-yellow {
    color: #FF8900;
    margin-left: .2rem;
}
.loan-detail .det-deep {
    color: #666666;
}
.loan-detail .det-right {
    margin-left: .3rem;
}
.loan-detail .bank-line {
    margin-top: .3rem;
}
.loan-detail .bank-link {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.loan-detail .bank-title {
    font-size: .32rem;
    color: #2A3237;
}
.loan-detail .bank-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: .3rem;
}
.loan-detail .bank-icon {
    width: .43rem;
    height: .43rem;
    background: url('../assets/bank1.png') no-repeat center;
    background-size: contain;
}
.loan-detail .bank-name {
    margin-left: .2rem;
    font-size:.32rem;
    color:rgba(163,161,169,1);
}
</style>