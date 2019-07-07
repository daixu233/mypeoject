<template>
  <div class="bank-list">
    <div v-if="bankEmpty" class="empty-box">
        <div class="empty-icon" />
        <div class="empty-txt">您尚未绑定银行卡</div>
    </div>
    <div class="bank-info" v-for="item in bank_info" :key="item.id" :style="{ background: item.color }" @click="setDefault(item)">
        <img class="bank-icon" :src="item.img" />
        <div class="bank-title">
            <div class="bank-name">{{item.bank_name}}</div>
            <div class="bank-select" v-if="item.is_default === 1">
                <span class="select-icon active" />
                <span class="select-txt">当前默认</span>
            </div>
            <div class="bank-select" v-if="item.is_default === 0">
                <span class="select-icon" />
                <span class="select-txt">设为默认</span>
            </div>
        </div>
        <div class="bank-sub">
            <div class="bank-type">{{item.bank_type}}</div>
            <div class="bank-limit">单笔限额:{{parseInt(item.limit_money)}} 单日限额:{{parseInt(item.day_limit)}}</div>
        </div>
        <div class="bank-num">{{item.bank_card_no}}</div>
    </div>
    <div class="add-box" @click="linkToBind">
        <div class="add-icon" />
        <div class="add-text">绑定银行卡</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'bank',
  data() {
      return {
          some: '123',
          bank_info: []
      }
  },
  mounted() {
      document.title = '我的银行卡'
      this.initData()
  },
  computed: {
      bankEmpty: function () {
          return this.bank_info.length === 0
      }
  },
  methods: {
      linkToBind() {
          this.$router.push('/bank/bind')
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
        this.axios.post(`/api/loan/get-bind-bank-info`).then(res=>{
            if (res) {
                this.bank_info = res.bank_info
            }
        })
      },
      setDefault(item) {
          if (item.is_default === 1) {
              this.showToastTime('当前已是默认银行卡')
              return false
          }
          this.$createDialog({
            type: 'confirm',
            showClose: true,
            title: '提示',
            content: '确认设置当前为默认银行卡',
            confirmBtn: {
                text: '确定',
                active: true,
                disabled: false,
                href: 'javascript:;'
            },
            cancelBtn: {
                text: '取消',
                active: false,
                disabled: false,
                href: 'javascript:;'
            },
            onConfirm: () => {
                this.axios.post(`/api/loan/set-default`, {
                    id: item.id
                }).then(res=>{
                    if (res) {
                        if (res.status === 0) {
                            this.showToastTime(res.message, 'correct')
                        } else {
                            this.showToastTime(res.message)
                        }
                    }
                })
            }
        }).show()
      }
  },
}
</script>

<style>
body {
    background: #f4f7f6;
}
.bank-list .empty-box {
    margin-top: 1.2rem;
}
.bank-list .empty-box .empty-icon {
    width: 3.3rem;
    height: 3rem;
    background: url('../assets/bank_empty.png') no-repeat center;
    background-size: contain;
    margin: 0 auto;
}
.bank-list .empty-box .empty-txt {
    width: 100%;
    margin-top: .8rem;
    text-align: center;
    font-size:.3rem;
    color:rgba(183,186,196,1);
}
.bank-list .add-box {
    width:6.9rem;
    height:.94rem;
    background:rgba(255,255,255,1);
    border:1px solid rgba(234,234,234,1);
    border-radius: .08rem;
    margin: 3rem auto 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.bank-list .add-box .add-icon {
    width: .28rem;
    height: .28rem;
    background: url('../assets/icon_add.png') no-repeat center;
    background-size: contain;
}
.bank-list .add-box .add-text {
    font-size:.3rem;
    color:rgba(35,143,255,1);
    margin-left: .2rem;
}
.bank-list .bank-info {
    position: relative;
    width: 6.90rem;
    height: 2.32rem;
    margin: 0 auto;
    margin-top: .3rem;
    border-radius: .1rem;
    background: #f00;
}
.bank-list .bank-icon {
    position: absolute;
    display: block;
    top: .3rem;
    left: .3rem;
    width: .7rem;
    height: .7rem;
    object-fit: contain;
}
.bank-list .bank-title {
    position: absolute;
    top: .34rem;
    left: 1.3rem;
    width: 5.2rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    color: #fff;
}
.bank-list .bank-title .bank-name {
    font-size: .3rem;
}
.bank-list .bank-title .bank-select {
    display: flex;
    align-items: center;
}
.bank-list .bank-title .select-icon {
    display: inline-block;
    width: .3rem;
    height: .3rem;
    background: url('../assets/bank-select1.png') no-repeat center;
    background-size: contain;
    margin-right: .1rem;
}
.bank-list .bank-title .select-icon.active {
    background: url('../assets/bank-select2.png') no-repeat center;
    background-size: contain;
}
.bank-list .bank-title .select-txt {
    font-size: .26rem;
}
.bank-list .bank-sub {
    position: absolute;
    top: .8rem;
    left: 1.3rem;
    width: 5.2rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    font-size: .24rem;
    color: #D5E4F2;
}
.bank-list .bank-num {
    font-size: .3rem;
    position: absolute;
    right: .38rem;
    bottom: .38rem;
    color: #fff;
}
</style>