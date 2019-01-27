<template>
  <div class="mym-main">
    <div class="mym-bg" :style="{backgroundImage: 'url('+require('../../assets/img/ico_1.jpg')+')'}"></div>
    <div class="mym-bd">
      <div class="mym-head">
        <el-upload
          class="mym-head-img-uploader"
          :action="$config.HOST_API+'Hide/upload'"
          name="imageFile"
          :show-file-list="false"
          :on-success="upSuccess"
          :on-error="upError"
          :with-credentials="true"
          :before-upload="beforeAvatarUpload"
          :on-progress="upProgress">
          <div class="mym-head-img" :style="{backgroundImage: 'url('+info.avatar+')'}" v-if="info.avatar"></div>
          <div class="mym-head-img" v-else></div>
        </el-upload>
        <div class="mym-head-bd">
          <div class="mym-head-name">账号：{{info.name?info.name:$store.state.userInfo.userName}}</div>
        </div>
      </div>
      <div class="mym-form">
        <div class="mym-form-left">
          <div class="mym-form-item">
            <div class="mym-form-ico n1"></div>
            <input type="text" class="mym-form-in" v-model.trim="form.phone" placeholder="不超过20个字" maxlength="20" :disabled="info.operates.indexOf('编辑')===-1||editType===0">
          </div>
          <div class="mym-form-item">
            <div class="mym-form-ico n2"></div>
            <input type="text" class="mym-form-in" v-model.trim="form.email" placeholder="不超过20个字" maxlength="20" :disabled="info.operates.indexOf('编辑')===-1||editType===0">
          </div>
        </div>
        <div class="mym-form-center">修改账户密码</div>
        <div class="mym-form-right">
          <div class="mym-form-item">
            <div class="mym-form-ico n3"></div>
            <input type="password" class="mym-form-in" v-model="oldPassword" placeholder="请输入原密码" :disabled="editType===0">
          </div>
          <div class="mym-form-item">
            <div class="mym-form-ico n4"></div>
            <input type="password" class="mym-form-in" v-model="password" placeholder="请输入新密码" :disabled="editType===0">
          </div>
          <div class="mym-form-item">
            <div class="mym-form-ico n5"></div>
            <input type="password" class="mym-form-in" v-model="password2" placeholder="请确认新密码" :disabled="editType===0">
          </div>
        </div>
      </div>
      <div class="mym-form-footer">
        <div class="mym-form-btn" @click="onsubmit" v-if="info.operates.indexOf('编辑')>-1">{{editType===1?"保 存":"编 辑"}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";

export default {
  data() {
    return {
      info: {
        operates: []
      },
      form: {
        phone: "",
        email: "",
        avatar: ""
      },
      editType: 0,
      oldPassword: "",
      password: "",
      password2: "",
      message: null
    };
  },
  components: {},
  mounted() {
    this.get_ajax();
  },
  methods: {
    //获取数据
    get_ajax() {
      this.$api.systemManagement.myMessage_get_info().then(res => {
        this.info = res.data;
        this.form["avatar"] = res.data["avatar"];
        this.form["email"] = res.data["email"];
        this.form["phone"] = res.data["phone"];
      });
    },
    onsubmit() {
      if (this.editType === 0) {
        this.editType = 1;
        return;
      }
      let { phone, email, avatar } = this.form;

      if (!phone) {
        this.$message.error("请输入电话");
        return;
      }
      // if (!email) {
      //   this.$message.error("请输入邮箱");
      //   return;
      // }
      if (!avatar) {
//      this.$message.error("请上传头像");
//      return;
      }

      //是否修改密码
      if (this.oldPassword) {
//				if(!this.oldPassword){
//					return this.$message.warning("请先输入密码再保存")
//				}
        if (!this.password) {
          this.$message.error("请输入新密码");
          return;
        }
        if (this.password.length<6) {
          this.$message.warning("密码长度必须为6位");
          return;
        }
        if (!this.password2) {
          this.$message.error("请再次输入密码");
          return;
        }
        if (this.password2.length<6) {
          this.$message.warning("密码长度必须为6位");
          return;
        }
        if (this.password !== this.password2) {
          this.$message.error("两次密码输入不一致");
          return;
        }
        this.form.oldPassword = md5(this.oldPassword);
        this.form.password = md5(this.password);
      }
     	if(!this.oldPassword||!this.password||!this.password2){
    	 	return 	this.editType = 0;
     	}
      this.$api.systemManagement.myMessage_edit_info(this.form).then(() => {
        this.$message.success("修改成功");
        this.editType = 0;
        this.oldPassword="";
        this.password="";
        this.password2=""
      });
    },
    upSuccess(res) {
      if (res.code === 0) {
        this.info.avatar = this.form.avatar = res.data;
      } else {
        this.$message.error(res.msg);
      }
      this.message.close();
      this.message = null;
    },
    beforeAvatarUpload(file) {
      const imgTypes = ["image/jpeg", "image/png"];
      const isJPG = imgTypes.indexOf(file.type) > -1 ? true : false;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    upProgress(event) {
      let percent = parseInt(event.percent * 100) / 100;

      if (this.message) {
        this.message.message = "上传进度" + percent + "%";
      } else {
        this.message = this.$message({
          message: "上传进度" + percent + "%",
          duration: 0
        });
      }
    },
    upError(res) {
      this.$message({
        message: res.message,
        type: "error"
      });
      this.message.close();
      this.message = null;
    }
  }
};
</script>
<style lang="less">
.mym-bg {
  height: 420px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.mym-bd {
  width: 1200px;
  margin: -290px auto 0 auto;
  border-radius: 10px;
  position: relative;
  z-index: 1;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 305px;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 0 15px 2px rgba(94, 79, 170, 0.5);
    background-color: #fff;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 305px;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: #fff;
  }
}
.mym-head {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mym-head-bd {
  position: relative;
  margin-top: 10px;
}
.mym-head-name {
  font-size: 22px;
  color: #333333;
}
.mym-form {
  display: flex;
  padding: 0 110px;
  justify-content: space-between;
  margin-top: 100px;
  position: relative;
}
.mym-form-center {
  position: absolute;
  top: 40px;
  left: 50%;
  font-size: 16px;
  color: #5e4faa;
  width: 16px;
  margin-left: -18px;
  line-height: 24px;
  &:after,
  &:before {
    content: "";
    position: absolute;
    left: 50%;
    margin-left: -1px;
    width: 2px;
    height: 20px;
  }
  &:before {
    top: -26px;
    background-image: linear-gradient(to bottom, #fff, #5e4faa);
  }
  &:after {
    bottom: -26px;
    background-image: linear-gradient(to top, #fff, #5e4faa);
  }
}
.mym-form-item {
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  height: 62px;
  width: 400px;
  box-shadow: 0 0 10px 2px rgba(94, 79, 170, 0.4);
  position: relative;
  & + .mym-form-item {
    margin-top: 20px;
  }
}
.mym-form-ico {
  position: absolute;
  background-repeat: no-repeat;
  background-color: #fff;
  width: 48px;
  height: 48px;
  top: 7px;
  left: -24px;
  border-radius: 50%;
  &.n1 {
    background-image: url("../../assets/img/phone.png");
  }
  &.n2 {
    background-image: url("../../assets/img/email.png");
  }
  &.n3 {
    background-image: url("../../assets/img/password.png");
  }
  &.n4 {
    background-image: url("../../assets/img/password2.png");
  }
  &.n5 {
    background-image: url("../../assets/img/password3.png");
  }
}
.mym-form-in {
  border: 0;
  background: none;
  padding: 20px 20px 20px 61px;
  width: 100%;
  outline: none;
  border-radius: 5px;
  &:disabled {
    background-color: #f5f7fa;
  }
}
.mym-form-btn {
  background: #5e4faa;
  border-radius: 4px;
  width: 400px;
  height: 62px;
  line-height: 62px;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
}
.mym-form-footer {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 60px;
}
.mym-head-img-uploader {
  width: 240px;
  height: 240px;
  margin-top: -97px;
  border-radius: 50%;
  overflow: hidden;
}
.mym-head-img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 30px solid #fff;
  cursor: pointer;
  background-color: #ddd;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
    transition: all 0.3s;
  }
}
</style>
