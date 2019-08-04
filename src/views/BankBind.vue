<template>
  <div class="bank-bind">
    <div class="tips-info">
      <div class="icon-info" />
      <div class="tips-txt">为保障账户安全，银行卡需使用本人银行卡预留手机号</div>
    </div>
    <div class="info-block">
      <div class="info-line">
        <span class="info-label">持卡人姓名</span>
        <span class="info-txt">{{id_name}}</span>
      </div>
      <div class="info-line">
        <span class="info-label">身份证号</span>
        <span class="info-txt">{{id_number}}</span>
      </div>
    </div>
    <div class="info-block distance">
      <div class="info-line input">
        <span class="info-label">银行卡号</span>
        <div class="info-ipt">
          <cube-input
            type="number"
            v-model="bankId"
            @input="bankChange"
            :maxlength="18"
            placeholder="请输入银行卡号"
          ></cube-input>
        </div>
      </div>
      <div class="info-line input">
        <span class="info-label">所属银行</span>
        <div class="info-ipt">
          <cube-input
            :value="back_name"
            disabled
          ></cube-input>
          <!-- <cube-select
                    v-model="type"
                    placeholder="选择你的银行账户"
                    :options="options"/> -->
        </div>
      </div>
    </div>
    <div
      v-if="hasBankInfo"
      class="bank-tips"
    >
      <span class="limit-icon" />
      <span class="limit-txt">单笔限额:{{limit_money}} 单日限额:{{day_limit}}</span>
    </div>
    <div class="info-block distance">
      <div class="info-line input">
        <span class="info-label">手机号码</span>
        <div class="info-ipt">
          <cube-input
            type="number"
            v-model="phone"
            placeholder="请输入持卡人手机号码"
          ></cube-input>
        </div>
      </div>
      <div class="info-line input">
        <span class="info-label">验证码</span>
        <div class="info-ipt short">
          <cube-input
            v-model="validate_code"
            placeholder="请输入短信验证码"
          ></cube-input>
        </div>
        <span
          v-if="!hasSend"
          class="valid-btn"
          v-on:click="getValidCode"
        >获取验证码</span>
        <span
          v-if="hasSend"
          class="valid-btn disabled"
        >重新获取({{timeMark}}s)</span>
      </div>
    </div>
    <div
      class="bot-btn"
      @click="confirmBind"
    >确认绑定</div>
  </div>
</template>

<script>
const validList = [
  {
    name: "bankId",
    required: "银行卡号不能为空"
  },
  {
    name: "phone",
    required: "手机号不能为空"
  },
  {
    name: "validate_code",
    required: "验证码不能为空"
  }
];
const timeCount = 59;
export default {
  name: "bank",
  data() {
    return {
      id_number: "",
      id_name: "",
      some: "123",
      bankId: "",
      back_name: "",
      phone: "",
      validate_code: "",
      options: [1, 2, 3],
      hasSend: false,
      timeMark: timeCount,
      hasBankInfo: false,
      day_limit: 1000,
      limit_money: 1000
    };
  },
  mounted() {
    document.title = "绑定银行卡";
    this.initData();
  },
  methods: {
    initData() {
      this.axios.post(`/api/user/get-user-info`).then(res => {
        if (res) {
          const info = res.user_info;
          this.id_number = info.id_number;
          this.id_name = info.id_name;
        }
      });
    },
    bankChange(event) {
      if (/^([1-9]{1})(\d{15}|\d{18})$/.test(this.bankId)) {
        this.axios
          .post("/api/loan/check-card", {
            card_num: this.bankId
          })
          .then(res => {
            if (res) {
              if (res.status === 0) {
                this.back_name = res.back_name;
                this.hasBankInfo = true;
                this.day_limit = parseInt(res.day_limit);
                this.limit_money = parseInt(res.limit_money);
              }
            }
          });
      }
    },
    showToastTime(text, type = "error") {
      const toast = this.$createToast({
        type,
        time: 1000,
        txt: text
      });
      toast.show();
    },
    showWarnning(txt) {
      this.$createDialog({
        type: "alert",
        title: "提示",
        content: txt
      }).show();
    },
    validSwitch() {
      this.hasSend = !this.hasSend;
      const timer = setInterval(() => {
        if (this.timeMark > 0) {
          this.timeMark -= 1;
        } else {
          clearInterval(timer);
          this.hasSend = !this.hasSend;
          this.timeMark = timeCount;
        }
      }, 1000);
    },
    getValidCode() {
      if (this.phone === "") {
        this.showToastTime("手机号不能为空");
        return;
      } else if (!/^[1][123456789][0-9]{9}$/.test(this.phone)) {
        this.showToastTime("手机格式不正确");
        return;
      }
      this.validSwitch();
      this.axios
        .post("/api/loan/send-bind-card-code", {
          phone: this.phone,
          card_num: this.bankId,
          bank_name: this.back_name
        })
        .then(res => {
          if (res) {
            if (res.message) {
              this.showToastTime(res.message, "txt");
            }
          }
        });
    },
    validForm() {
      let hasEmpty = false;
      validList.forEach(item => {
        if (this[item.name] === "") {
          hasEmpty = true;
          this.showToastTime(item.required);
        }
      });
      return hasEmpty;
    },
    confirmBind() {
      if (this.validForm()) return;
      const params = {
        phone: this.phone,
        card_num: this.bankId,
        bank_name: this.back_name,
        validate_code: this.validate_code
      };
      this.axios.post("/api/loan/bind-card", params).then(res => {
        if (res) {
          if (res.status === 0) {
            this.$router.go(-1);
            this.showToastTime(res.message, "txt");
          } else {
            this.showToastTime(res.message);
          }
        }
      });
    }
  }
};
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
  font-size: 0.32rem;
  height: 1.06rem;
  line-height: 1.06rem;
  color: #fff;
  background: #ff971e;
  text-align: center;
}
.bank-bind .tips-info {
  margin-left: 0.3rem;
  padding: 0.4rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.bank-bind .tips-info .icon-info {
  width: 0.28rem;
  height: 0.28rem;
  background: url("../assets/info.png") no-repeat center;
  background-size: contain;
}
.bank-bind .tips-info .tips-txt {
  font-size: 0.25rem;
  color: rgba(168, 172, 178, 1);
  margin-left: 0.1rem;
}
.bank-bind .info-block {
  width: 100%;
  box-sizing: border-box;
  padding-left: 0.3rem;
  font-size: 0.32rem;
  border-top: 1px solid rgba(234, 234, 234, 1);
  border-bottom: 1px solid rgba(234, 234, 234, 1);
  background-color: #fff;
  color: #333333;
}
.bank-bind .info-block.distance {
  margin-top: 0.2rem;
  border-top: none;
}
.bank-bind .info-block .info-line {
  padding: 0.3rem;
  padding-left: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 1px solid rgba(234, 234, 234, 1);
}
.bank-bind .info-block .info-line.input {
  padding: 0.1rem 0;
  align-items: center;
  justify-content: flex-start;
}
.bank-bind .info-block .info-line:nth-last-child(1) {
  border: none;
}
.bank-bind .cube-input:after,
.bank-bind .cube-select:after {
  border: none !important;
}
.bank-bind .cube-input,
.bank-bind .cube-select {
  font-size: 0.32rem;
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
  background: #ff971e;
  border-radius: 0.6rem;
  padding: 0.15rem 0;
  font-size: 13px;
  text-align: center;
  margin-left: 0.08rem;
}
.bank-bind .valid-btn.disabled {
  background: #bcbec4;
}
.bank-bind .bank-tips {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
}
.bank-bind .bank-tips .limit-icon {
  display: inline-block;
  width: 0.24rem;
  height: 0.24rem;
  background: url("../assets/limit-tips1.png") no-repeat center;
  background-size: contain;
}
.bank-bind .bank-tips .limit-txt {
  font-size: 0.24rem;
  margin-left: 0.1rem;
  color: #999daa;
}
</style>