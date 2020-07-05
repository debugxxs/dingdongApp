<template>
  <div class="setMain">
    <div class="topHandel">
      <handelIcon :channelmsg="setChannelMsg"></handelIcon>
      <div class="setMini" @click="setMini()"></div>
      <div class="setClose" @click="setClose()"></div>
    </div>
    <div class="setingSeletForm">
      <div class="setingLaber">
        服务器类型：
        <el-select v-model="serverType" slot="prepend" placeholder="服务器连接类型">
          <el-option label="TCP" value="TCP"></el-option>
          <el-option label="UDP" value="UDP"></el-option>
          <el-option label="HTTP" value="HTTP"></el-option>
        </el-select>
      </div>
      <div class="seradd">
        服务器地址：
        <el-select v-model="servIpAddr" slot="prepend" placeholder="服务器地址">
          <el-option :label="ipaddr" value="1"></el-option>
        </el-select>
      </div>
      <div class="portLabel">
        服务器端口：
       <el-input v-model="port" placeholder="请输入端口"></el-input>
      </div>
      <div class="submit">
         <el-button type="success" @click="saveSerInfo()">提交信息</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import handelIcon from "../components/handelIcon";
export default {
  name: "loginsetwind",
  components: {
    handelIcon: handelIcon
  },
  data() {
    return {
      setChannelMsg: "",
      serverType: "",
      servIpAddr: "",
      ipaddr: "192.168.1.1",
      port: ""
    };
  },
  methods: {
    setMini() {
      this.setChannelMsg = "setMini";
    },
    setClose() {
      this.setChannelMsg = "setClose";
    },
    //保存选择框里面的信息
    saveSerInfo(){
        localStorage.setItem("sertype",this.serverType);
        localStorage.setItem("seraddr",this.ipaddr);
        localStorage.setItem("port",this.port);
        this.$electron.ipcRenderer.send('setClose')
    }
  },
  updated() {
    this.setChannelMsg = "";
  }
};
</script>
<style lang="scss">
.setMain {
  height: 330px;
  .topHandel {
    height: 32px;
    background-color: rgb(72, 199, 154);
    .setMini {
      width: 32px;
      height: 16px;
      position: absolute;
      top: 0px;
      right: 32px;
    }
    .setClose {
      width: 32px;
      height: 16px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }
  .setingSeletForm {
    padding:15px;
    position: absolute;
    top: 90px;
    .el-select{
        width: 180px;
    }
    .portLabel {
      margin-top: 12px;
      .el-input {
        width: 180px;
        height: 30px;
      }
    }
  }
  .seradd {
    margin-top: 12px;
  }
  .submit{
      position: absolute;
      top: 170px;
      right: -90px;
  }
}
</style>