<template>
  <div class="loan-detail">
    <div class="top-bg" />
    <div class="order-box">
        <div class="order-title">借款金额(元)</div>
        <div class="order-num">{{price}}</div>
        <div class="order-tips">日利率 {{daily_rate}}%</div>
    </div>
    <div class="loan-block" @click="openPlan">
        <div class="loan-title">
            <div class="left-box">还款计划</div>
            <div class="plan-box">
                <div class="plan-txt">共{{planLen}}期</div>
                <div class="arraw-icon" />
            </div>
        </div>
        <div class="det-line">
            首期<span class="det-grey">{{firstDay}}</span><span class="det-yellow">应还{{firstPrice}}元</span>
        </div>
    </div>
    <div class="loan-block">
        <div class="loan-title">
            <div class="left-box">资金明细</div>
        </div>
        <div class="det-line">
            实际到账：<span class="det-deep">{{actual_arrival}}元</span>
            <span class="det-right">服务费用：<span class="det-deep">{{fee}}元</span></span>
        </div>
    </div>
    <div class="loan-block">
        <div class="loan-title option">
            <div class="left-box">还款方式</div>
            <div class="plan-box">
                {{desc}}
            </div>
        </div>
        <div @click="openBank">
            <div class="bank-line">
                <div class="bank-link">
                    <div class="bank-title">收款银行</div>
                    <div class="arraw-icon" />
                </div>
            </div>
            <div class="bank-info">
                <img class="bank-icon" :src="bank_img" />
                <div class="bank-name">{{bank_name}} (尾号{{bankTail}})</div>
            </div>
        </div>
    </div>
    <BotBtn v-if="!loanLoading" :title="orderBtnTxt" @click="submitOrder" />
    <div class="loan-footer" v-if="loanLoading">
        <div class="bot-btn">
            <span class="pay-loading" />
            <span>提交申请中</span>
        </div>
    </div>
    <SlidePanel :visible="planStatus" @close="closePlan">
        <div>
            <div class="panel-header">
                <div class="close-box" @click="closePlan">
                    <div class="close-icon" />
                </div>
                <div class="head-title">
                    共{{planLen}}期
                </div>
            </div>
            <div class="panel-content">
                <div class="plan-line" v-for="item in plan" :key="item.returnTime">
                    <div class="title-box">
                        <div class="finance">¥ {{item.price}}</div>
                        <div class="tips">{{item.title}}</div>
                    </div>
                    <div class="plan-time">还款日：{{item.returnTime}}</div>
                </div>
            </div>
        </div>
    </SlidePanel>
    <SlidePanel :visible="bankStatus" @close="closeBank">
        <div>
            <div class="panel-header">
                <div class="close-box" @click="closeBank">
                    <div class="close-icon" />
                </div>
                <div class="head-title">
                    选择银行卡
                </div>
            </div>
            <div class="panel-content bank">
                <div class="pay-list">
                    <div class="pay-line" v-for="item in bank" :key="item.id" @click="selectBank(item.id)">
                        <div class="pay-icon">
                            <img class="bank-pic" :src="item.img" />
                        </div>
                        <div class="pay-info">
                            <div class="select-bank">
                                <span>{{item.bank_name}}({{getBankTail(item.bank_card_no)}})</span>
                                <span v-if="item.id === bank_id" class="select-success" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <div class="bot-btn">添加新银行卡</div>
            </div>
        </div>
    </SlidePanel>
  </div>
</template>

<script>
// @ is an alias to /src
// 借款首页
import BotBtn from '@/components/public/BotBtn.vue'
import SlidePanel from '@/components/public/SlidePanel.vue'
import { getLocal } from '../utils/util'

export default {
  name: 'home',
  data() {
        return {
            actual_arrival: '',
            bank: [],
            daily_rate: '',
            desc: '',
            fee: '',
            interest: 0,
            plan: [],
            price: '',
            bank_id: '',
            bank_img: '',
            bank_name: '',
            bank_card_no: '',
            planStatus: false,
            bankStatus: false,
            loanLoading: false,
            order_status: 3
        }
  },
  mounted() {
      document.title = '我要借款'
      this.initData()
      const order_status = getLocal('order_status')
      if (order_status) {
          this.order_status = parseInt(order_status)
      }
  },
  components: {
    BotBtn,
    SlidePanel
  },
  computed: {
      orderBtnTxt() {
          const order_status = this.order_status
          if (order_status === 1) {
              return '借款审核中'
          }
          return '提交借款申请'
      },
      planLen() {
          return this.plan.length
      },
      firstDay() {
          const info = this.plan[0]
          if (info) {
              const time = info.returnTime.split(' ')[0]
              return time
          }
          return ''
      },
      firstPrice() {
          const info = this.plan[0]
          if (info) {
              return info.price
          }
          return ''
      },
      bankTail() {
          const bank_card_no = this.bank_card_no
          if (bank_card_no) {
              const len = String(bank_card_no).length
              return bank_card_no.substr(len - 4, 4)
          }
          return bank_card_no
      }
  },
  methods: {
      getBankTail(number) {
          const len = String(number).length
          return number.substr(len - 4, 4)
      },
      openPlan() {
          this.planStatus = true
      },
      openBank() {
          if (this.order_status === 1) {
            return
          }
          this.bankStatus = true
      },
      closePlan() {
          this.planStatus = false
      },
      closeBank() {
          this.bankStatus = false
      },
      showAlert(txt) {
          this.$createDialog({
              type: 'alert',
              title: '提示',
              content: txt
          }).show()
      },
      showToastTime(text, type = 'error') {
        const toast = this.$createToast({
            type,
            time: 1000,
            txt: text
        })
        toast.show()
      },
      initData() {
        this.axios.get(`/api/loan/loan-info`).then(res=>{
            if (res) {
                if (res.status === 0) {
                    const { actual_arrival, bank, daily_rate, desc, fee, interest, plan, price } = res
                    this.actual_arrival = actual_arrival
                    this.bank = bank
                    this.daily_rate = daily_rate
                    this.desc = desc
                    this.fee = fee
                    this.interest = interest
                    this.plan = plan
                    this.price = price
                    this.initBank(bank)
                } else {
                    this.showAlert(res.message)
                }
            }
        })
      },
      initBank(bank) {
          bank.forEach(item => {
              if (item.is_default === 1) {
                  this.bank_id = item.id
                  this.bank_img = item.img
                  this.bank_name = item.bank_name
                  this.bank_card_no = item.bank_card_no
              }
          })
      },
      selectBank(id) {
          if (this.bank_id === id) {
              return
          }
          this.bank.forEach(item => {
              if (item.id === id) {
                  this.bank_id = item.id
                  this.bank_img = item.img
                  this.bank_name = item.bank_name
                  this.bank_card_no = item.bank_card_no
              }
          })
          this.closeBank()
      },
      submitOrder() {
        if (this.order_status === 1) {
            return
        }
        this.loanLoading = true
        this.axios.post('/api/loan/loan-order', {
            bank_id: this.bank_id
        }).then(res=>{
            if (res) {
                if (res.status === 0) {
                    this.showToastTime(res.message, 'correct')
                    this.$router.go(-1)
                } else {
                    this.showAlert(res.message)
                }
            }
            this.loanLoading = false
        })
      }
  },
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
    display: inline-block;
    width: .43rem;
    height: .43rem;
    object-fit: contain;
}
.loan-detail .bank-name {
    margin-left: .2rem;
    font-size:.32rem;
    color:rgba(163,161,169,1);
}
.loan-detail .panel-header {
    position: relative;
    width: 100%;
    height: 1.1rem;
    border-bottom: 1px solid rgba(227,227,227,1);
    font-size: .36rem;
    text-align: center;
    color: #333;
    line-height: 1.1rem;
}
.loan-detail .panel-header .close-box {
    position: absolute;
    top: 0;
    right: 0;
    left: unset;
    width: 1.1rem;
    height: 1.1rem;
}
.loan-detail .panel-header .close-box .close-icon {
    margin: .4rem 0 0 .4rem;
    width: .32rem;
    height: .32rem;
    background: url('../assets/close-icon.png') no-repeat center;
    background-size: contain;
}
.loan-detail .panel-header .close-box .back-icon {
    margin: .4rem 0 0 .4rem;
    width: .22rem;
    height: .42rem;
    background: url('../assets/back-icon.png') no-repeat center;
    background-size: contain;
}
.loan-detail .panel-content {
    width: 100%;
    height: 8.2rem;
    padding: .3rem .4rem;
    box-sizing: border-box;
    margin: 0;
    overflow: auto;
}
.loan-detail .panel-content.bank {
    padding: 0;
    height: 6.6rem;
}
.loan-detail .panel-content .plan-line {
    width: 100%;
    border-bottom: 1px solid rgba(227,227,227,1);
    padding: .3rem 0;
}
.loan-detail .panel-content .plan-line .title-box {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: .3rem;
}
.loan-detail .panel-content .plan-line .title-box .finance {
    font-weight: bold;
    font-size: .36rem;
}
.loan-detail .panel-content .plan-line .title-box .tips {
    color: #bbb;
}
.loan-detail .panel-content .plan-time {
    color: #bbb;
    margin-top: .2rem;
}
.loan-detail .panel-content .pay-list {
    width: 100%;
    margin-top: .4rem;
}
.loan-detail .panel-content .pay-list .pay-line {
    display: flex;
    flex-flow: row nowrap;
    font-size: .24rem;
    margin-top: .3rem;
}
.loan-detail .panel-content .pay-line .pay-icon {
    width: 1.14rem;
    text-align: right;
    box-sizing: border-box;
    padding-right: .2rem;
    padding-top: .05rem;
}
.loan-detail .panel-content .pay-line .pay-info {
    width: 6.36rem;
    padding-bottom: .3rem;
    border-bottom: 1px solid #EAEAEA;
}
.loan-detail .panel-content .select-bank {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding-right: .3rem;
    margin-top: .2rem;
    padding-bottom: .2rem;
    font-size: .3rem;
}
.loan-detail .panel-content .select-bank .select-success {
    display: inline-block;
    width: .34rem;
    height: .27rem;
    background: url('../assets/bank-ok.png') no-repeat center;
    background-size: contain;
}
.loan-detail .panel-content .bank-pic {
    display: inline-block;
    width: .52rem;
    height: .52rem;
    object-fit: contain;
}
.loan-detail .panel-footer, .loan-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 1.6rem;
}
.loan-detail .panel-footer .bot-btn, .loan-footer .bot-btn {
    margin: 0 auto;
    margin-top: .28rem;
    width:6.4rem;
    height:1.04rem;
    background:linear-gradient(207deg,rgba(255,178,43,1),rgba(255,151,30,1));
    box-shadow:0px .2rem .81rem 0px rgba(255,160,32,0.3);
    border-radius: .1rem;
    line-height: 1.04rem;
    font-size:.34rem;
    font-family:PingFang-SC-Medium;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.loan-footer .pay-loading {
    display: inline-block;
    width: .5rem;
    height: .5rem;
    background: url('../assets/pay-loading.png') no-repeat center;
    background-size: contain;
    margin-right: .2rem;
    animation: rotate .8s infinite;
    animation-timing-function: linear;
}
</style>