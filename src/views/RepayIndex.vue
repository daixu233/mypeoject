<template>
  <div class="repay-index">
    <div class="repay-info">
        <div class="tips">当前未还金额</div>
        <div class="num-box">
            <div class="amount">
                <div class="unit">¥</div>
                <div class="num">30,000</div>
                <div class="float">.00</div>
            </div>
            <div class="delay-btn">延期一天</div>
        </div>
        <div class="detail-line">
            <div class="detail-block">
                <div class="det-tit">已还金额</div>
                <div class="det-value">1,000.00</div>
            </div>
            <div class="detail-block">
                <div class="det-tit">应还日期</div>
                <div class="det-value">19.05.30</div>
            </div>
            <div class="detail-block">
                <div class="det-tit">借款状态</div>
                <div class="det-value">已逾期3天</div>
            </div>
        </div>
    </div>
    <div class="btn-yellow">立即还款</div>
    <div class="btn-normal">办理延期</div>
    <div class="small-tips">您的借款已逾期5天，请立即办理还款或延期(您的逾期信息我们会上报行业征信部门，请抓紧还款消除不良影响)</div>
    <NavBar />
  </div>
</template>

<script>
// @ is an alias to /src
// 还款入口
import NavBar from '@/components/public/NavBar.vue'

export default {
  name: 'home',
  data() {
      return {
          some: '123'
      }
  },
  mounted() {
      document.title = '无界还款'
  },
  components: {
    NavBar
  }
}
</script>

<style>
body {
    background: #f4f7f6;
}
.repay-index {
    font-family:PingFangSC-Regular;
}
.repay-index .repay-info {
    width: 100%;
    height: 4.6rem;
    background: #fff;
    overflow: hidden;
}
.repay-index .repay-info .tips {
    margin-top: .5rem;
    margin-left: .4rem;
    font-size:.3rem;
    color:rgba(131,136,143,1);
}
.repay-index .repay-info .num-box {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: .4rem;
}
.repay-index .num-box .amount {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.repay-index .num-box .amount .unit {
    font-size: .36rem;
    align-self: flex-start;
    margin-top: .1rem;
}
.repay-index .num-box .amount .num {
    font-size: .84rem;
    margin-left: .2rem;
}
.repay-index .num-box .amount .float {
    align-self: flex-end;
    font-size: .54rem;
    margin-bottom: .05rem;
}
.repay-index .delay-btn {
    width: 2.28rem;
    height:.90rem;
    background:linear-gradient(207deg,rgba(255,178,43,1),rgba(255,151,30,1));
    box-shadow:0px .2rem .81rem 0px rgba(255,160,32,0.3);
    border-radius:.45rem;
    text-align: center;
    color: #fff;
    font-size: .32rem;
    line-height: .9rem;
}
.repay-index .detail-line {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-top: .8rem;
}
.repay-index .detail-line .detail-block {
    flex-grow: 1;
    font-size: .32rem;
    text-align: center;
}
.repay-index .detail-line .detail-block .det-tit {
    color: #83888F;
    font-size: .27rem;
}
.repay-index .detail-line .detail-block .det-value {
    font-size:.32rem;
    color:rgba(24,35,67,1);
    margin-top: .3rem;
}
.repay-index .btn-yellow {
    margin: 0 auto;
    margin-top: .6rem;
    width:6.40rem;
    height:1.04rem;
    background:rgba(253,161,17,1);
    border-radius:.10rem;
    font-size:.34rem;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 1.04rem;
}
.repay-index .btn-normal {
    margin: 0 auto;
    margin-top: .3rem;
    width:6.40rem;
    height:1.04rem;
    background:#fff;
    border-radius:.10rem;
    font-size:.34rem;
    color:#333;
    text-align: center;
    line-height: 1.04rem;
}
.repay-index .small-tips {
    margin-top: .6rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 .3rem;
    font-size: .24rem;
    color:rgba(132,138,145,1);
    text-align: center;
    font-weight: lighter;
    line-height: .4rem;
}
</style>