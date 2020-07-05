<template>
  <div class="login">
    <div class="handel">
      <div class="logo">
        <img src="../assets/dingdong.png" />
      </div>
      <handelIcon :channelmsg="channelName"></handelIcon>
      <div class="close" @click.self="closeWind()"></div>
      <div class="mini" @click.self="miniWind()"></div>
      <div class="setting" @click.self="settingWind()">
        <img src="../assets/settin1.png" />
      </div>
    </div>
    <div class="loginMain">
      <div class="avatarIcon">
        <el-avatar
          shape="circle"
          :size="80"
          fit="cover"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <div class="loginInput">
        <el-form ref="users" :model="users" :rules="rules" :show-message='false'>
          <el-form-item prop="userName">
            <el-input v-model="users.userName" prefix-icon="iconfont el-icon-user" autofocus="true" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input v-model="users.userPass" prefix-icon="iconfont el-icon-lock" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="seleceBox">
        <el-checkbox-group v-model="checkList" @change="getselectBoxValue()">
          <el-checkbox v-for="(item,i) in checkListItem" :key="i" :label="item.content"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="modifyPassBtn">
        <el-link type="primary" @click="modifyPassWind()">忘记密码</el-link>
      </div>
      <div class="loginBtn">
        <el-button type="success" plain @click="login('users')">登 陆</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import handelIcon from "../components/handelIcon";
export default {
  name: "login",
  components: {
    handelIcon: handelIcon
  },
  data() {
    return {
      channelName: "",
      users: {
        userName: "",
        userPass: ""
      },
      checkList: [],
      checkListItem: [
        { id: 0, content: "记住密码", disabled: false, checked: true }
      ],
      rules:{
        userName:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    settingWind() {
      //给主进程发送信息创建新窗口
      this.$electron.ipcRenderer.send("createSetWind");
    },
    closeWind() {
      this.channelName = "handelClose";
    },
    miniWind() {
      this.channelName = "handelMini";
    },
    getselectBoxValue() {
      var checkStr = this.checkList[0];
      if (checkStr == "记住密码") {
        localStorage.setItem("userName", this.users.userName);
        localStorage.setItem("userPass", this.users.userPass);
      }
    },
    login(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //通知主线程创建修改密码窗口
    modifyPassWind() {
      this.$electron.ipcRenderer.send("createModifyWind");
    }
  },
  //点击过后刷新页面重置标识
  created() {
    var userName = localStorage.getItem("userName");
    if (userName == null) {
      this.users.userName = "";
    } else {
      this.users.userName = userName;
    }
  },
  updated() {
    this.channelName = "";
  },
  beforeDestroy() {
    localStorage.setItem("userName", this.users.userName);
  }
};
</script>
<style lang="scss">
.login {
  background-color: rgb(72, 199, 154);
  height: 120px;
  border-bottom: solid 1px rgb(72, 199, 154);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .handel {
    height: 32px;
    width: 330px;
    -webkit-app-region: drag;
    .logo {
      width: 200px;
    }
    .setting {
      width: 32px;
      height: 32px;
      position: absolute;
      top: 0px;
      right: 64px;
      img {
        margin: 8px;
      }
    }
    .setting:hover img {
      transform: translateY(-50px);
      filter: drop-shadow(#0072e3 0 50px);
    }

    .mini {
      width: 32px;
      height: 16px;
      position: absolute;
      top: 0px;
      right: 32px;
    }
    .close {
      width: 32px;
      height: 15px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }
  .loginMain {
    height: 128px;
    width: 100%;
    position: absolute;
    top: 120px;
    .avatarIcon {
      height: 80px;
      width: 80px;
      position: absolute;
      right: 175px;
      top: -40px;
      .el-avatar {
        border: solid 5px #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
    }
    .loginInput {
      position: absolute;
      left: 100px;
      top: 45px;
      .el-form {
        width: 230px;
        margin: 0;
        .el-form-item {
          margin: 6px;
          .el-input.is-active .el-input__inner, .el-input__inner:focus{
            border-color:rgb(72, 199, 154);
          }
        }
      }
    }
    .loginBtn {
      position: absolute;
      top: 160px;
      left: 105px;
      .el-button {
        width: 223px;
        height: 40px;
      }
    }
    .seleceBox {
      position: absolute;
      top: 140px;
      left: 108px;
    }
    .modifyPassBtn {
      position: absolute;
      top: 138px;
      right: 108px;
    }
  }
}
</style>