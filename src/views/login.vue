<template>
  <div class="login" @keyup.enter="submitForm('ruleForm')">
    <div class="section">
      <div class="word">管理员登陆</div>
      <el-form class="loginform" :model="formData" :rules="rules" ref="ruleForm">
        <el-form-item prop="phone" class="login-item name">
          <el-input placeholder="账号登录" v-model.trim="formData.phone" class="logininp"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-item pass">
          <el-input type="password" placeholder="登录密码" v-model.trim="formData.password" class="logininp"></el-input>
        </el-form-item>
        <el-form-item class="switch" v-if="saveNameCheck">
          <el-checkbox v-model="saveNameSwitch" style="margin: 0 10px;color: #9b9b9b;" class="check">记住用户名</el-checkbox>
        </el-form-item>
        <el-form-item class="btnLogin" prop="remember">
          <el-button type="text" class="loginbtn" @click.prevent="submitForm" id="loginbtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-cent">
      <!--<img src="../assets/img/logo.png" alt="" class="login-logo">-->
      <div class="login-cap">Welcome back</div>
      <div class="login-text">
        Wether you are an expert or a beginner. Hust university<br> is going to become the first platform which will faster all<br> your needs in a simple, easy and intuotive way
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";

export default {
  name: "login",
  data() {
    return {
      saveNameCheck: true,
      formData: {
        phone: "",
        password: ""
      },
      rules: {
        phone: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [{ required: true, message: "请填写密码", trigger: "blur" }]
      },
      saveNameSwitch: true,
      query: {}
    };
  },
  created() {
    try {
      const remName = localStorage.getItem("remName");
      if (localStorage.getItem("remName")) {
        this.formData.phone = remName;
        this.saveNameSwitch = true;
      } else {
        this.saveNameSwitch = false;
      }
    } catch (e) {
      this.saveNameCheck = false;
      this.showmessage("warning", "当前浏览器不支持记住用户名操作");
    }
  },
  mounted() {
    this.query = this.$route.query;
    console.log(this.query);
  },
  methods: {
    showmessage(type, message) {
      this.$message({
        type: type,
        message: message
      });
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.formData.password = md5(this.formData.password);
          this.$api.main
            .signIn({
              phone: this.formData.phone,
              password: this.formData.password
            })
            .then(res => {
              this.$store.dispatch("save_userInfo", res.data);
              if (this.saveNameSwitch) {
                localStorage.setItem("remName", this.formData.phone);
              } else {
                localStorage.removeItem("remName");
              }
              this.$message({
                type: "success",
                message: "登录成功!",
                duration: 1000
              });
              setTimeout(() => {
                if (this.query.from) {
                  this.$router.replace(decodeURIComponent(this.query.from));
                } else {
                  this.$router.replace("/systemManagement/myMessage");
                }
              }, 500);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  watch: {
    saveNameSwitch: function(n) {
      if (!n) {
        localStorage.removeItem("remName");
      }
    }
  }
};
</script>
<style lang="less">
body {
  .login {
    background-image: url("../assets/img/background_2.png");
    background-repeat: no-repeat;
    /*background-position: right center;*/
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    min-height: 666px;
    position: relative;
    .el-form-item {
      margin-bottom: 0;
    }
    .section {
      background: rgba(255, 255, 255, 0);
      border-radius: 4px;
      width: 32%;
      box-sizing: border-box;
      position: absolute;
      left: 9.8%;
      top: 50%;
      margin-top: -209px;
      .word {
        font-size: 36px;
        color: #5e4faa;
        padding-bottom: 60px;
      }
      .loginform {
        width: 100%;
        box-sizing: border-box;
        .el-form-item {
          .el-form-item__content {
            #logininp {
              border: none !important;
            }
          }
        }
      }
      .switch {
        padding-top: 10px;
      }
      .btnLogin {
        box-sizing: border-box;
        padding-top: 30px;
        .loginbtn {
          width: 100%;
          height: 66px;
          line-height: 66px;
          background: #5e4faa;
          text-align: center;
          color: #fff;
          padding: 0 !important;
          font-size: 16px;
          border-radius: 4px;
          &:hover {
            opacity: 0.9;
          }
          &:active {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
.login-item {
  padding-left: 66px;
  background-repeat: no-repeat;
  background-position: 20px center;
  height: 66px;
  border: 1px solid #d4dee7;
  background-color: white;
  border-radius: 2px;
  margin-bottom: 0;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 66px;
    top: 8.5px;
    width: 2px;
    height: 49px;
    background: #d4dee7;
  }
  &.name {
    background-image: url("../assets/img/account1.png");
  }
  &.pass {
    background-image: url("../assets/img/padlock.png");
  }
  & + .login-item {
    margin-top: 40px;
  }
  .el-form-item__content {
    height: 100%;
    .el-input {
      height: 100%;
      .el-input__inner {
        height: 100%;
        border: 0 !important;
        font-size: 14px;
        padding-left: 32px;
      }
    }
  }
  .el-form-item__error{
    left: 32px;
    top: 41px;
  }
}
.login-cent {
  position: absolute;
  top: 10.9%;
  right: 8.6%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.login-cap {
  font-size: 60px;
  color: #ffffff;
  font-weight: bold;
  line-height: 80px;
  margin-top: 60px;
}
.login-text {
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 22px;
  margin-top: 50px;
}
</style>
