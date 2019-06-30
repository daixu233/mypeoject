<template>
  <div class="nav-bar">
    <div class="bar-side">
        <div class="bar-icon" />
        <div class="bar-text">还款</div>
    </div>
    <div class="center-bar" />
    <div class="bar-side">
        <div class="bar-icon" />
        <div class="bar-text">银行卡</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavBar'
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
    background: url('../../assets/bar1.png') no-repeat center center;
    background-size: contain;
}
.bar-text {
    margin-top: .1rem;
    font-size: .21rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.center-bar {
    width: 1.1rem;
    height: 1.1rem;
    background: url('../../assets/loan-center.png') no-repeat center center;
    background-size: 1.1rem 1.1rem;
    margin-top: -.3rem;
}
</style>