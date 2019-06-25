<template>
  <div class="bank-bind">
      <div class="tips-info">
          <div class="icon-info" />
          <div class="tips-txt">为保障账户安全，银行卡需使用本人银行卡预留手机号</div>
      </div>
      <div class="info-block">
          <div class="info-line">
              <span class="info-label">持卡人姓名</span>
              <span class="info-txt">猪刚鬣</span>
          </div>
          <div class="info-line">
              <span class="info-label">身份证号</span>
              <span class="info-txt">330206**********19</span>
          </div>
      </div>
      <div class="info-block distance">
          <div class="info-line input">
              <span class="info-label">银行卡号</span>
              <div class="info-ipt">
                  <cube-input v-model="bankId" placeholder="请输入储蓄卡账号" ></cube-input>
              </div>
          </div>
          <div class="info-line input">
              <span class="info-label">所属银行</span>
              <div class="info-ipt">
                  <cube-select
                    v-model="type"
                    placeholder="选择你的银行账户"
                    :options="options"/>
              </div>
          </div>
      </div>
      <div class="info-block distance">
          <div class="info-line input">
              <span class="info-label">手机号码</span>
              <div class="info-ipt">
                  <cube-input v-model="bankId" placeholder="请输入持卡人手机号码" ></cube-input>
              </div>
          </div>
          <div class="info-line input">
              <span class="info-label">验证码</span>
              <div class="info-ipt short">
                    <cube-input v-model="bankId" placeholder="请输入短信验证码" ></cube-input>
              </div>
              <div class="valid-btn">获取验证码</div>
          </div>
      </div>
      <div class="bot-btn">确认绑定</div>
  </div>
</template>

<script>

export default {
  name: 'bank',
  data() {
      return {
          some: '123',
          bankId: '',
          type: '',
          options: [1,2,3]
      }
  },
  mounted() {
      document.title = '绑定银行卡'
  },
}
</script>

<style>
body {
    background: #f4f7f6;
}
.bank-bind .bot-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: .32rem;
    height: 1.06rem;
    line-height: 1.06rem;
    color: #fff;
    background: #FF971E;
    text-align: center;
}
.bank-bind .tips-info {
    margin-left: .3rem;
    padding: .4rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.bank-bind .tips-info .icon-info {
    width: .28rem;
    height: .28rem;
    background: url('../assets/info.png') no-repeat center;
    background-size: contain;
}
.bank-bind .tips-info .tips-txt {
    font-size:.25rem;
    color:rgba(168,172,178,1);
    margin-left: .1rem;
}
.bank-bind .info-block {
    width: 100%;
    box-sizing: border-box;
    padding-left: .3rem;
    font-size: .32rem;
    border-top: 1px solid rgba(234,234,234,1);
    border-bottom: 1px solid rgba(234,234,234,1);
    background-color: #fff;
    color: #333333;
}
.bank-bind .info-block.distance {
    margin-top: .2rem;
    border-top: none;
}
.bank-bind .info-block .info-line {
    padding: .3rem;
    padding-left: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    border-bottom: 1px solid rgba(234,234,234,1);
}
.bank-bind .info-block .info-line.input {
    padding: .1rem 0;
    align-items: center;
    justify-content: flex-start;
}
.bank-bind .info-block .info-line:nth-last-child(1) {
    border: none;
}
.bank-bind .cube-input:after, .bank-bind .cube-select:after {
    border: none!important;
}
.bank-bind .cube-input, .bank-bind .cube-select {
    font-size: .32rem;
}
.bank-bind .info-block .info-label {
    width: 1.8rem;
}
.bank-bind .info-block .info-ipt {
    width: 5.1rem;
}
.bank-bind .info-block .info-ipt.short {
    width: 3rem;
}
.bank-bind .valid-btn {
    width: 2rem;
    color: #fff;
    background: #FF971E;
    border-radius: .6rem;
    padding: .15rem 0;
    font-size: 13px;
    text-align: center;
    margin-left: .08rem;
}
</style>