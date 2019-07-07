<template>
  <div class="repay-divide">
    <div class="top-bg" />
    <div class="order-box">
        <div class="out-title">分期还款（共{{planLen}}期）</div>
        <div class="time-icon" />
        <div class="tips-title">当前需还金额（元）</div>
        <div class="amount">
            <div class="unit">¥</div>
            <div class="num">{{price}}</div>
            <!-- <div class="float">.00</div> -->
        </div>
        <div class="bank-line">
            <div class="bank-left">扣款银行卡</div>
            <div class="bank-id" v-if="bank_card_no !== ''">{{bank_card_no}}（{{bank_name}}）</div>
            <div class="bank-id" v-if="bank_card_no === ''">无</div>
        </div>
    </div>
    <div class="select-box" v-if="plan.length > 0">
        <div class="all-select" @click="allSelect">
            <div class="select-icon" :class="allChecked ? 'active' : ''" />
            <div class="select-txt">全选</div>
            <div class="bot-line" />
        </div>
        <div class="select-list" v-for="(item, index) in plan" :key="item.id" @click="selectSingle(index)">
            <div class="first-line">
                <div class="select-icon" :class="getCheckClass(item.checked, item.status)" />
                <div class="select-txt">{{item.price}}</div>
            </div>
            <div class="select-tips">还款日：{{item.return_time}}</div>
            <div class="bot-line" />
            <div v-if="item.status === 1" class="has-repay" />
        </div>
    </div>
    <BotBtn title="立即还款" @click="openPanel" />
    <SlidePanel :visible="panelStatus" @close="closePanel">
        <div>
            <div class="pay-info" v-if="!isSelectBank">
                <div class="panel-header">
                    <div class="close-box" @click="closePanel">
                        <div class="close-icon" />
                    </div>
                    <div class="head-title">
                        {{titleTxt}}
                    </div>
                </div>
                <div class="panel-content">
                    <div class="top-tips">还款金额</div>
                    <div class="finance-num">
                        <span class="unit">¥</span>
                        <span>{{repaySum}}</span>
                    </div>
                    <div class="pay-list">
                        <div class="pay-line">
                            <div class="pay-icon">
                                <div class="bank-icon" />
                            </div>
                            <div class="pay-info" @click="bankSelect">
                                <div class="title-line">
                                    <div class="title-txt">银行卡支付</div>
                                    <div class="select-icon" />
                                </div>
                                <div class="bank-info">
                                    <span>{{bank_name}}({{getBankTail(bank_card_no)}})</span>
                                    <span class="bank-arrow" />
                                </div>
                                <div class="limit-info">
                                    单笔限额：{{limit_money}} 单日限额：{{day_limit}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer" v-if="!repayLoading" @click="confirmRepay">
                    <div class="bot-btn">确认还款</div>
                </div>
                <div class="panel-footer" v-if="repayLoading">
                    <div class="bot-btn">
                        <span class="pay-loading" />
                        <span>还款支付中</span>
                    </div>
                </div>
            </div>
            <div class="bank-select" v-if="isSelectBank">
                <div class="panel-header">
                    <div class="close-box" @click="backChose">
                        <div class="back-icon" />
                    </div>
                    <div class="head-title">
                        选择银行卡
                    </div>
                </div>
                <div class="panel-content">
                    <div class="pay-list">
                        <div class="pay-line" v-for="bank in bank_info" :key="bank.id">
                            <div class="pay-icon">
                                <img class="bank-pic" :src="bank.img" />
                            </div>
                            <div class="pay-info">
                                <div class="select-bank">
                                    <span>{{bank.bank_name}}({{getBankTail(bank.bank_card_no)}})</span>
                                    <span v-if="bank.is_default === 1" class="select-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="bot-btn">添加新银行卡</div>
                </div>
            </div>
        </div>
    </SlidePanel>
  </div>
</template>

<script>
// 借款首页
import BotBtn from '@/components/public/BotBtn.vue'
import SlidePanel from '@/components/public/SlidePanel.vue'
const transList = (list) => {
    const result = []
    list.forEach((item, index) => {
        result.push({
            ...item,
            checked: false,
        })
    })
    return result
}

export default {
  name: 'home',
  data() {
        return {
            some: '123',
            price: '',
            planInfo: {},
            bank_card_no: '',
            bank_name: '',
            plan: [],
            allChecked: false,
            panelStatus: false,
            titleTxt: '确认还款',
            repaySum: 2000,
            sumIdList: [],
            bank_id: '',
            bank_info: [],
            day_limit: '',
            limit_money: '',
            isSelectBank: false,
            repayLoading: false
        }
  },
  components: {
      BotBtn,
      SlidePanel
  },
  mounted() {
      this.initData()
  },
  computed: {
      planLen() {
          return this.plan.length
      }
  },
  methods: {
      getBankTail(number) {
          const len = String(number).length
          return number.substr(len - 4, 4)
      },
      openPanel() {
          let sumNum = 0
          let idsList = []
          this.plan.forEach(item => {
              if (item.status === 0 && item.checked) {
                  sumNum += item.price
                  idsList.push(item.id)
              }
          })
          if (sumNum === 0) {
              this.showAlert('当前还未选择还款订单')
              return
          }
          this.repaySum = sumNum
          this.sumIdList = idsList
          this.panelStatus = true
      },
      closePanel() {
          this.panelStatus = false
      },
      backChose() {
          this.isSelectBank = false
      },
      bankSelect() {
          this.isSelectBank = true
      },
      showAlert(txt) {
        this.$createDialog({
            type: 'alert',
            title: '提示',
            content: txt,
        }).show()
      },
      initData() {
        this.axios.get(`/api/loan/pay-info`).then(res=>{
            if (res) {
                if (res.status === 0) {
                    this.planInfo = res.data
                    this.price = this.planInfo.price
                    this.initPayList(this.planInfo.order_id)
                } else {
                    this.plan = []
                    this.price = 0
                    this.showAlert(res.message)
                }
            }
        })
      },
      initPayList(order_id) {
        this.axios.post(`/api/loan/normal-pay-info`, {
            order_id
        }).then(res=>{
            if (res) {
                if (res.status === 0) {
                    const result = res.data
                    this.bank_card_no = result.bank_card_no
                    this.bank_name = result.bank_name
                    this.bank_id = result.bank_id
                    this.plan = transList(result.plan)
                    this.initBankList(this.bank_id)
                } else {
                    this.showAlert(res.message)
                }
            }
        })
      },
      initBankList(bank_id) {
          this.axios.post('/api/loan/get-bind-bank-info').then(res => {
              if (res) {
                if (res.status === 0) {
                    this.bank_info = res.bank_info
                    if (this.bank_info.length > 0) {
                        this.bank_info.forEach(item => {
                            if (item.id === bank_id) {
                                this.day_limit = item.day_limit
                                this.limit_money = item.limit_money
                            }
                        })
                    }
                } else {
                    this.showAlert(res.message)
                }
            }
          })
      },
      allSelect() {
        this.allChecked = !this.allChecked
        this.plan = this.plan.map(item => {
            return {
                ...item,
                checked: this.allChecked
            }
        })
      },
      selectSingle(index) {
            if (this.plan[index].status === 1) {
                return
            }
            let checkNum = 0
            let allNotRepay = 0
            this.plan = this.plan.map((item, i) => {
                if (item.status === 0) {
                    allNotRepay += 1
                }
                const checked = i === index ? !item.checked : item.checked
                if (checked) {
                    checkNum += 1
                }
                return {
                    ...item,
                    checked
                }
            })
            if (checkNum === 0) {
                this.allChecked = false
            } else if (checkNum === allNotRepay) {
                this.allChecked = true
            }
      },
      confirmRepay() {
            const repayParams = {
                ids: this.sumIdList.join(','),
                pay_type: 1,
                bank_id: this.bank_id,
                price: this.repaySum
            }
            this.repayLoading = true
            this.axios.post('/api/loan/revert-order-plan', repayParams).then((res) => {
                if (res.status === 0) {
                    this.showAlert(res.message)
                    this.initData()
                    this.panelStatus = false
                } else {
                    this.showAlert(res.message)
                }
                this.repayLoading = false
            })
      },
      getCheckClass(checked, status) {
          if (status === 1) {
              return 'disabled'
          } else {
              return checked ? 'active' : ''
          }
      }
  },
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
.repay-divide .select-icon.disabled {
    background: url('../assets/select3.png') no-repeat center;
    background-size: contain;
}
.repay-divide .select-icon.active {
    background: url('../assets/select2.png') no-repeat center;
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
.repay-divide .select-list .has-repay {
    position: absolute;
    top: .25rem;
    right: .3rem;
    width: 1.2rem;
    height: .98rem;
    background: url('../assets/has_repay.png') no-repeat center;
    background-size: contain;
}
.repay-divide .select-tips {
    font-size:.28rem;
    color:rgba(153,153,153,1);
    margin-left: .55rem;
    margin-top: .2rem;
}
.panel-header {
    position: relative;
    width: 100%;
    height: 1.1rem;
    border-bottom: 1px solid rgba(227,227,227,1);
    font-size: .36rem;
    text-align: center;
    color: #333;
    line-height: 1.1rem;
}
.panel-header .close-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.1rem;
    height: 1.1rem;
}
.panel-header .close-box .close-icon {
    margin: .4rem 0 0 .4rem;
    width: .32rem;
    height: .32rem;
    background: url('../assets/close-icon.png') no-repeat center;
    background-size: contain;
}
.panel-header .close-box .back-icon {
    margin: .4rem 0 0 .4rem;
    width: .22rem;
    height: .42rem;
    background: url('../assets/back-icon.png') no-repeat center;
    background-size: contain;
}
.panel-content {
    margin-top: .4rem;
}
.panel-content .top-tips {
    color: #B8B8B8;
    text-align: center;
    font-size: .28rem;
}
.panel-content .finance-num {
    margin-top: .25rem;
    color: #030303;
    text-align: center;
    font-size: .7rem;
    font-weight: 500;
    font-family: Bahnschrift;
}
.panel-content .finance-num .unit {
    font-weight: normal;
    font-size: .38rem;
    margin-right: .1rem;
}
.panel-content .pay-list {
    width: 100%;
    margin-top: .4rem;
}
.panel-content .pay-list .pay-line {
    display: flex;
    flex-flow: row nowrap;
    font-size: .24rem;
    margin-top: .3rem;
}
.panel-content .pay-line .pay-icon {
    width: 1.14rem;
    text-align: right;
    box-sizing: border-box;
    padding-right: .2rem;
    padding-top: .05rem;
}
.panel-content .bank-pic {
    display: inline-block;
    width: .52rem;
    height: .52rem;
    object-fit: contain;
}
.panel-content .pay-line .pay-info {
    width: 6.36rem;
    padding-bottom: .3rem;
    border-bottom: 1px solid #EAEAEA;
}
.panel-content .pay-info .title-line {
    width: 100%;
    box-sizing: border-box;
    padding-right: .35rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}
.panel-content .pay-info .title-line .title-txt {
    color: #343434;
    font-size: .32rem;
}
.panel-content .pay-info .title-line .select-icon {
    width: .44rem;
    height: .44rem;
    background: url('../assets/pay-select2.png') no-repeat center;
    background-size: contain;
}
.panel-content .pay-icon .bank-icon {
    display: inline-block;
    width: .54rem;
    height: .34rem;
    background: url('../assets/pay-bank.png') no-repeat center;
    background-size: contain;
}
.panel-content .select-bank {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding-right: .3rem;
    margin-top: .2rem;
    padding-bottom: .2rem;
}
.panel-content .select-bank .select-success {
    display: inline-block;
    width: .34rem;
    height: .27rem;
    background: url('../assets/bank-ok.png') no-repeat center;
    background-size: contain;
}
.panel-content .bank-info {
    margin-top: .25rem;
    font-size: .26rem;
    color: #333;
}
.panel-content .bank-info.select {
    margin-top: .2rem;
    padding-bottom: .2rem;
}
.panel-content .bank-info .bank-arrow {
    display: inline-block;
    margin-left: .2rem;
    width: .1rem;
    height: .18rem;
    background: url('../assets/bank-arrow.png') no-repeat center;
    background-size: contain;
}
.panel-content .limit-info {
    display: inline-block;
    margin-top: .2rem;
    padding: .1rem;
    border: 1px solid #FF971E;
    color: #FF971E;
    font-size: .24rem;
}
.panel-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 1.6rem;
}
.panel-footer .bot-btn {
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
.panel-footer .bot-btn .pay-loading {
    display: inline-block;
    width: .5rem;
    height: .5rem;
    background: url('../assets/pay-loading.png') no-repeat center;
    background-size: contain;
    margin-right: .2rem;
    animation: rotate .8s infinite;
    animation-timing-function: linear;
}
@keyframes rotate {
    0% {
        transform: rotate(0deg)
    }
    33% {
        transform: rotate(120deg)
    }
    66% {
        transform: rotate(240deg)
    }
    100% {
        transform: rotate(360deg)
    }
}
</style>