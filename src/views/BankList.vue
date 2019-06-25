<template>
  <div class="bank-list">
    <div v-if="bankEmpty" class="empty-box">
        <div class="empty-icon" />
        <div class="empty-txt">您尚未绑定银行卡</div>
    </div>
    <div class="add-box">
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
          bank: []
      }
  },
  mounted() {
      document.title = '我的银行卡'
  },
  computed: {
      bankEmpty: function () {
          return this.bank.length === 0
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
</style>