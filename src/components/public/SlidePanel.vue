<template>
  <div class="slide-panel" :class="activeClass">
    <div class="mask" v-on:click="$emit('close')" />
    <div class="panel-box">
        <div class="container">
            <slot></slot>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'slidePanel',
  data() {
      return {
          
      }
  },
  props: {
    visible: Boolean
  },
  computed: {
      activeClass() {
          return this.visible ? 'active' : ''
      }
  },
}
</script>

<style scoped>
    .slide-panel {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 100;
        overflow: hidden;
        display: none;
    }
    .slide-panel.active {
        display: block;
    }
    .slide-panel .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgb(37, 38, 45);
        opacity: 0;
        pointer-events: auto;
        z-index: 100;
        transition: opacity .3s linear;
    }
    .slide-panel.active .mask {
        opacity: 0.4;
        animation: fadeIn .3s cubic-bezier(.7, .3, .1, 1);
    }
    .slide-panel .panel-box {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 70vh;
        background: #fff;
        z-index: 101;
        transform: translate3d(0px, 100%, 0px)
    }
    .slide-panel.active .panel-box {
        transform: translate3d(0px, 0px, 0px);
        animation: slideUp .3s cubic-bezier(.7, .3, .1, 1);
        transition: transform .3s cubic-bezier(.9, 0, .3, .7);
    }
    .slide-panel .container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0
        }
        100% {
            opacity: .4
        }
    }
    @keyframes slideUp {
        0% {
            transform: translate3d(0px, 100%, 0px)
        }
        100% {
            transform: translate3d(0px, 0px, 0px)
        }
    }
</style>