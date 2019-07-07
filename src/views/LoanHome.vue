<template>
  <div class="loan-home">
    <div class="top-bg" />
    <div class="order-box">
        <div class="out-title" />
        <div class="order-tips">最高可用额度(元)</div>
        <div class="order-num" />
        <div class="icon-line">
            <div class="icon-side">
                <div class="icon-pic icon1" />
                <div class="icon-txt">门槛超低</div>
            </div>
            <div class="icon-side center-side">
                <div class="icon-pic icon2" />
                <div class="icon-txt">到账迅速</div>
            </div>
            <div class="icon-side">
                <div class="icon-pic icon3" />
                <div class="icon-txt">还款方便</div>
            </div>
        </div>
        <div class="order-btn" @click="orderOperation">{{orderTxt}}</div>
    </div>
    <div class="ad-banner" />
    <div class="explain-box">
        <div class="explain-line">
            <div class="ex-icon ex1" />
            <div class="ex-text">
                <h1 class="ex-title">审核方式</h1>
                <p class="ex-line">线上审核，便捷高效</p>
            </div>
        </div>
        <div class="explain-line">
            <div class="ex-icon ex2" />
            <div class="ex-text">
                <h1 class="ex-title">申请条件</h1>
                <p class="ex-line">18-60周岁，不向学生借款</p>
            </div>
        </div>
        <div class="explain-line">
            <div class="ex-icon ex3" />
            <div class="ex-text">
                <h1 class="ex-title">所需材料</h1>
                <p class="ex-line">身份证、银行卡、手机号</p>
            </div>
        </div>
    </div>
    <NavBar />
  </div>
</template>

<script>
// @ is an alias to /src
// 借款首页
import NavBar from '@/components/public/NavBar.vue'
import { saveLocal } from '../utils/util'

export default {
  name: 'home',
  data() {
      return {
          some: '1233',
          loanData: {},
          orderTxt: '',
      }
  },
  components: {
    NavBar
  },
  mounted() {
    this.axios.post(`/api/loan/loan-index`).then(res=>{
        if (res) {
            if (res.status === 0) {
                this.loanData = res.loan_data
                saveLocal('order_status', this.loanData.order_status)
                this.judgeOrderText()
            } else {
                this.$createDialog({
                    type: 'alert',
                    title: '提示',
                    content: res.message
                }).show()
            }
        }
    })
  },
  methods: {
      judgeOrderText() {
          const order_status = this.loanData.order_status
          // 未借款或者已借已还
          if (order_status === 0 || order_status === 3) {
              this.orderTxt = '立即申请'
          } else if (order_status === 1) { // 借款审核中
              this.orderTxt = '借款审核中'
          } else if (order_status === 2) { // 已借未还
              this.orderTxt = '去还款'
          } else if (order_status === 4) { // 还款中
              this.orderTxt = '还款中'
          } else if (order_status === 5) { // 展期中
              this.orderTxt = '展期中'
          }
      },
      orderOperation() {
          const order_status = this.loanData.order_status
          if (order_status === 0) {
              this.showAlert('请先去客户端完成借款')
          } else if (order_status === 2) {
              const is_period = this.loanData.is_period
              if (is_period === 1) {
                  this.$router.push('/repay/divide')
              } else if (is_period === 0) {
                  this.$router.push('/repay/std')
              }
          } else if (order_status === 1 || order_status === 3) {
              this.$router.push('/loan/detail')
          }
      },
      showAlert(txt) {
          this.$createDialog({
              type: 'alert',
              title: '提示',
              content: txt
          }).show()
      }
  },
}
</script>

<style>
body {
    background: #f4f7f6;
}
.loan-home {
    font-size: .3rem;
}
.loan-home .top-bg {
    width: 7.5rem;
    height: 2.95rem;
    background: url('../assets/loan_bg.png') no-repeat center center;
    background-size: 7.5rem 2.95rem;
}
.loan-home .order-box {
    position: relative;
    margin-top: -1.3rem;
    margin-left: .3rem;
    width: 6.9rem;
    height: 4rem;
    background: rgba(255,255,255,1);
    border-radius: .1rem;
    display: inline-block;
}
.loan-home .order-box .out-title {
    position: absolute;
    top: -.7rem;
    left: 0;
    width: 1.85rem;
    height: .49rem;
    background: url('../assets/loan_title.png') no-repeat center center;
    background-size: contain;
}
.loan-home .order-tips {
    text-align: center;
    font-size: .28rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:19px;
    margin-top: .4rem;
}
.loan-home .order-num {
    margin: 0 auto;
    margin-top: .3rem;
    width: 3.46rem;
    height: .67rem;
    background: url('../assets/loan_num.png') no-repeat center;
    background-size: contain;
}
.loan-home .icon-line {
    margin-top: .3rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}
.loan-home .icon-side {
    flex-grow: 1;
    font-size: .26rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(168,172,178,1);
    line-height: .19rem;
}
.loan-home .icon-side.center-side {
    flex-grow: .7;
}
.loan-home .icon-pic {
    width: .34rem;
    height: .34rem;
    margin-right: .12rem;
}
.loan-home .icon1 {
    background: url('../assets/loan_icon1.png') no-repeat center;
    background-size: contain;
}
.loan-home .icon2 {
    background: url('../assets/loan_icon2.png') no-repeat center;
    background-size: contain;
}
.loan-home .icon3 {
    background: url('../assets/loan_icon3.png') no-repeat center;
    background-size: contain;
}
.loan-home .order-btn {
    margin: 0 auto;
    margin-top: .4rem;
    width:3.08rem;
    height: .8rem;
    background:linear-gradient(207deg,rgba(255,178,43,1),rgba(255,151,30,1));
    box-shadow:0px .2rem .81rem 0px rgba(255,160,32,0.3);
    border-radius: .4rem;
    line-height: .8rem;
    color: #fff;
    text-align: center;
    font-size: .32rem;
    font-family:PingFang-SC-Medium;
    font-weight:bold;
}
.loan-home .ad-banner {
    margin: 0 auto;
    margin-top: .28rem;
    width: 6.9rem;
    height: 2.2rem;
    background: url('../assets/banner.png') no-repeat center;
    background-size: contain;
}
.loan-home .explain-box {
    margin: 0 auto;
    margin-top: .28rem;
    padding: 0 .33rem;
    width: 6.9rem;
    box-sizing: border-box;
    background: #fff;
    border-radius: .1rem;
}
.loan-home .explain-line {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: .3rem 0;
    border-bottom: 1px solid rgba(234,234,234,1);
}
.loan-home .explain-line:nth-last-child(1) {
    border: none;
}
.loan-home .ex-icon {
    width: .64rem;
    height: .64rem;
}
.loan-home .ex1 {
    background: url('../assets/loan_pic1.png') no-repeat center;
    background-size: contain;
}
.loan-home .ex2 {
    background: url('../assets/loan_pic2.png') no-repeat center;
    background-size: contain;
}
.loan-home .ex3 {
    background: url('../assets/loan_pic3.png') no-repeat center;
    background-size: contain;
}
.loan-home .ex-text {
    margin-left: .3rem;
}
.loan-home .ex-title {
    margin: 0 0 .18rem;
    font-size:.3rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color:rgba(51,51,51,1);
}
.loan-home .ex-line {
    font-size: .24rem;
    font-family:PingFang-SC-Medium;
    color:rgba(183,186,196,1);
    line-height:.19rem;
}
</style>