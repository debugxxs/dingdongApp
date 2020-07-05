<template>
  <div>
    <div class="handelClose">
      <img src="../assets/close1.png" />
    </div>
    <div>{{channelmsg}}</div>
    <div class="handelWindMini">
      <img src="../assets/min1.png" />
    </div>
  </div>
</template>
<script>
export default {
  props:['channelmsg'],
  name: "handelicon",
  methods: {
    sendCloseWind(msg){
      this.$electron.ipcRenderer.send(msg)
    },
    sendMiniWind(msg){
      this.$electron.ipcRenderer.send(msg)
    }
  },
  // 给主进程发送消息，通知关闭或者最小化窗口
  updated(){
    this.sendCloseWind(this.channelmsg)
    this.sendMiniWind(this.channelmsg)
  }
};
</script>
<style lang="scss">
  .handelClose {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 0px;
    right: 0px;
    img {
      margin: 8px;
    }
  }
  .handelWindMini {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 0px;
    right: 32px;
    img {
      margin: 8px;
    }
  }
  .handelClose:hover img {
    transform: translateY(-50px);
    filter: drop-shadow(red 0 50px) !important;;
    
  
  }
  .handelWindMini:hover img {
    transform: translateY(-50px);
    filter: drop-shadow(#0072e3 0 50px);
  }
</style>
