<template>
  <div class="passMain">
    <div class="passHandel">
      <handelIcon :channelmsg="passChannelMsg"></handelIcon>
      <div class="passMini" @click="passMini()"></div>
      <div class="passClose" @click="passClose()"></div>
    </div>
    <div class="passIndex">
      <el-form :model="user" status-icon :rules="rules" ref="user" label-width="80px">
        <el-form-item label="用户名:"  prop="name">
          <el-input v-model="user.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="旧密码:">
          <el-input type="password" placeholder="旧密码，第一次登陆可以为空"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newUserPass">
          <el-input v-model="user.newUserPass" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="twoUserPass">
          <el-input
            v-model="user.twoUserPass"
            type="password"
            placeholder="请确认新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="postBtn">
        <el-button type="success" plain @click="sendNewUserPass('user')">确认修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import handelIcon from "../components/handelIcon";
export default {
  name: "modifypass",
  components: {
    handelIcon: handelIcon
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.newUserPass !== "") {
          this.$refs.user.validateField("twoUserPass");

        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.newUserPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passChannelMsg: "",
      user: {
        name: "",
        oldUserPass: "",
        newUserPass: "",
        twoUserPass: ""
      },
      rules: {
          name:[{ required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        newUserPass: [{required: true, validator: validatePass, trigger: "blur" }],
        twoUserPass: [{required: true, validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    passMini() {
      this.passChannelMsg = "passMini";
    },
    passClose() {
      this.passChannelMsg = "passClose";
    },
    //给服务器发送修改密码的表单
    sendNewUserPass(formName) {
      //todo
      //发送json
      //获取服务返回信息
      //弹出是否修改成功
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  updated() {
    this.passChannelMsg = "";
  }
};
</script>
<style lang="scss">
.passMain {
  height: 330px;
  .passHandel {
    height: 32px;
    background-color: rgb(72, 199, 154);
    border: solid 1px rgb(72, 199, 154);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .passMini {
      width: 32px;
      height: 16px;
      position: absolute;
      top: 0px;
      right: 32px;
    }
    .passClose {
      width: 32px;
      height: 16px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }
  .passIndex {
    padding: 15px;
    position: absolute;
    left: 30px;
    top: 30px;
    .el-form {
      width: 300px;
      .el-input.is-active .el-input__inner,
      .el-input__inner:focus {
        border-color: rgb(72, 199, 154);
      }
      .el-form-item {
        .el-form-item__label{
          padding: 0 10px 0 0;
        }

      }
    }
    .postBtn {
      position: absolute;
      top: 259px;
      .el-button {
        position: absolute;
        left: 79px;
        width: 223px;
        height: 40px;
      }
    }
  }
}
</style>