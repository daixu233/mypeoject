<template>
  <div class="nav-bar">
    <div class="bar-side" @click="repayLink">
        <div class="bar-icon" :class="barActive1" />
        <div class="bar-text" :class="barActive1" >还款</div>
    </div>
    <div class="center-bar" @click="loanLink" />
    <div class="bar-side" @click="bankLink">
        <div class="bar-icon" />
        <div class="bar-text">银行卡</div>
    </div>
  </div>
</template>

<script>
import { getLocal } from '../../utils/util'

export default {
  name: 'NavBar',
  props: {
      active: Number
  },
  data() {
      return {
          order_status: 0
      }
  },
  mounted() {
      const order_status = getLocal('order_status')
      if (order_status) {
          this.order_status = parseInt(order_status)
      }
  },
  computed: {
      barActive1() {
          const active = this.active
          if (active === 1) {
              return 'active'
          }
      }
  },
  methods: {
      showToastTime(text, type = 'error') {
        const toast = this.$createToast({
            type,
            time: 1000,
            txt: text
        })
        toast.show()
      },
      loanLink() {
          this.$router.push('/loan/detail')
      },
      repayLink() {
          if (this.order_status === 1) {
              this.showToastTime('当前借款审核中')
              return
          }
          if (this.active !== 1) {
              this.$router.push('/repay/index')
          }
      },
      bankLink() {
          if (this.active !== 2) {
              this.$router.push('/bank/list')
          }
      }
  },
}

</script>

<style scoped>
.nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 1rem;
    display: flex;
    flex-flow: row nowrap;
    box-shadow: 0 -2px 12px #eee;
}
.bar-side {
    flex-grow: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bar-icon {
    margin-top: .13rem;
    width: .38rem;
    height: .38rem;
    background: url('../../assets/nav-icon1.png') no-repeat center center;
    background-size: contain;
}
.bar-icon.active {
    background: url('../../assets/nav-icon1-active.png') no-repeat center center;
    background-size: contain;
}
.bar-text {
    margin-top: .1rem;
    font-size: .21rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.bar-text.active {
    color: #FF971E
}
.center-bar {
    width: 1.1rem;
    height: 1.1rem;
    background: url('../../assets/loan-center.png') no-repeat center center;
    background-size: 1.1rem 1.1rem;
    margin-top: -.3rem;
}
</style>