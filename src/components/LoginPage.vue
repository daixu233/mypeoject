<template>
  <div class="login-outer">
    <img class="logo-pic" src="../assets/login1.png" alt="">
    <div class="secend-line">
        <div class="logo-txt">
            <img class="center-logo" src="../assets/login2.png" alt="">
            <span class="version">
                v1.0
            </span>
        </div>
    </div>
    <div class="input-out">
        <input class="inner" v-model.number="phone" maxlength="11" placeholder="手机号" />
    </div>
    <div class="input-out second">
        <input class="inner short" v-model.number="valid" maxlength="4" placeholder="短信验证码" />
        <span v-if="!hasSend" class="valid-btn" v-on:click="getValidCode">获取验证码</span>
        <span v-if="hasSend" class="valid-btn disabled">重新获取({{timeMark}}s)</span>
    </div>
    <div class="submit-btn" @click="loginOperation">登录</div>
  </div>
</template>

<script>
import { saveLocal } from '../utils/util'

const timeCount = 59
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
      return {
          phone: '',
          valid: '',
          maxlength: 11,
          hasSend: false,
          timeMark: timeCount
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
      showWarnning(txt) {
          this.$createDialog({
              type: 'alert',
              title: '提示',
              content: txt
          }).show()
      },
      validSwitch() {
          this.hasSend = !this.hasSend
          const timer = setInterval(() => {
              if (this.timeMark > 0) {
                  this.timeMark -= 1
              } else {
                  clearInterval(timer)
                  this.hasSend = !this.hasSend
                  this.timeMark = timeCount
              }
          }, 1000);
      },
      getValidCode() {
        if (this.phone === '') {
            this.showToastTime('手机号不能为空')
            return
        } else if (!/^[1][123456789][0-9]{9}$/.test(this.phone)) {
            this.showToastTime('手机格式不正确')
            return
        }
        this.axios.get(`/user/send-code?phone=${this.phone}&type=1`).then(res=>{
            if (res) {
                if (res.message) {
                    this.showToastTime(res.message, 'txt')
                }
                if (res.status === 0) {
                    this.validSwitch()
                }
            }
        })
      },
      loginOperation() {
          if (this.valid === '') {
            this.showToastTime('验证码不能为空')
            return
          } else if (!/^[0-9]{4}$/.test(this.valid)) {
            this.showToastTime('验证码格式不正确')
            return
          }
          this.axios.post('/user/login', {
              phone: this.phone,
              code: this.valid
          }, {some: '123'}).then(res=>{
            if (res) {
                if (res.status === 0) {
                    const { token_id } = res.detail
                    saveLocal('token', token_id)
                    this.$router.push('/loan/home')
                } else {
                    this.showWarnning(res.message)
                }
            }
        })
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-outer {
    font-size: .35rem;
    height: 100vh;
    overflow: hidden;
    background: #fff;
}
.logo-pic {
    width: 1.6rem;
    height: 1rem;
    display: block;
    margin: 1.5rem auto 0;
}
.secend-line {
    text-align: center;
}
.logo-txt {
    position: relative;
    display: inline-block;
    margin: .2rem auto;
}
.logo-txt .center-logo {
    display: block;
    width: 2rem;
    height: .5rem;
}
.version {
    position: absolute;
    bottom: 0;
    right: -.6rem;
    font-size: 12px;
    color: #FF6633;
}
.input-out {
    position: relative;
    width: 6.5rem;
    margin: 1.5rem auto 0;
    border-bottom: 1px solid #E3E3E3;
}
.input-out.second {
    margin-top: .5rem;
    /* display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; */
}
.input-out .inner {
    display: block;
    background: transparent;
    border: none;
    color: #333;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    font-size: 16px;
    margin-bottom: .2rem;
    outline: none;
}
.input-out .inner.short {
    width: 60%;
}
.valid-btn {
    position: absolute;
    right: 0;
    bottom: .2rem;
    width: 2rem;
    color: #FF971E;
    border: 1px solid #FF971E;
    border-radius: .6rem;
    padding: .15rem 0;
    font-size: 13px;
    text-align: center;
}
.valid-btn.disabled {
    color: #BCBEC4;
    border-color: #BCBEC4;
}
.submit-btn {
    width: 6.5rem;
    margin: 1.5rem auto 0;
    background: #FF971E;
    text-align: center;
    color: #fff;
    border-radius: 3px;
    padding: .3rem 0;
}
.cube-input::after {
    border: none;
}
.cube-input-field {
    padding-left: 0!important;
    padding-right: 0!important;
    color: #333;
}
</style>
