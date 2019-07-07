<template>
  <div class="bot-btn">
    <div class="center-btn" @click="$emit('click')">{{title}}</div>
  </div>
</template>

<script>

export default {
  name: 'BotBtn',
  props: {
      title: String
  }
}

</script>

<style scoped>
.bot-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 1.6rem;
    box-shadow: 0 -2px 12px #eee;
}
.center-btn {
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
    text-align: center;
    color: #fff;
}
</style>