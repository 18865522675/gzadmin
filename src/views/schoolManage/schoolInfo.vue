<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
  			<span class='label'>基本信息</span>
  		</div>
  		<div style="width: 95%;margin: 0 auto;">
  			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="学校名称" prop="name">
			    <el-input v-model.trim="ruleForm.name" :disabled="true"  autocomplete="off" placeholder="请输入全称"></el-input>
			  </el-form-item>
			  <el-form-item label="详细地址" prop="address">
			    <el-input v-model.trim="ruleForm.address" :disabled="!isEdit" autocomplete="off"  placeholder="请输入详细地址"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱" prop="email">
			    <el-input v-model.trim="ruleForm.email"   :disabled="!isEdit" placeholder="请输入邮箱"></el-input>
			  </el-form-item>
			  <el-form-item label="学校LOGO">
			    <el-upload
				  class="avatar-uploader"	
				  :action="hostApi+'Hide/upload'"
         		  name="imageFile"
				  :show-file-list="false"
				  :on-success="upSuccess"
				  :disabled="!isEdit"
		          :on-error="upError"
		          :with-credentials="true"
		          :before-upload="beforeAvatarUpload"
		          :on-progress="upProgress">
				  <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			  </el-form-item>
			  <el-form-item label="网站域名" prop="domain">
			    <el-input v-model.trim="ruleForm.domain" :disabled="true"  placeholder="请输入网站域名"></el-input>
			  </el-form-item>
			  <el-form-item label="ICP信息" prop="icp">
			    <el-input v-model.trim="ruleForm.icp"  :disabled="!isEdit"  placeholder="请输入ICP信息"></el-input>
			  </el-form-item>
			  <el-form-item label="版权信息" prop="copyright">
			    <el-input v-model.trim="ruleForm.copyright" :disabled="!isEdit"  placeholder="请输入版权信息"></el-input>
			  </el-form-item>
			</el-form>
  		</div>
  		<div class="pageHead flexItem">
  			<span class='label'>焦点图</span>
  		</div>
  		<div>
  			<div  style="width: 95%;margin: 0 auto;">
  				<el-upload
			  class="avatar-uploader el-upload-ap"
			  :action="hostApi+'Hide/upload'"
         	   name="imageFile"
			  :show-file-list="false"
			  :disabled="!isEdit"
			  :on-success="upSuccess2"
		          :on-error="upError"
		          :with-credentials="true"
		          :before-upload="beforeAvatarUpload"
		          :on-progress="upProgress">
			  <img v-if="ruleForm.adminBgImg" style="width: 100%" :src="ruleForm.adminBgImg" class="avatar">
			  <i v-else class="el-icon-plus aplusIcon avatar-uploader-icon"></i>
			</el-upload>
  			</div>
  			<div class="tip">
  				注：上传图片最佳尺寸为1920px*1080px
  			</div>
  		</div>
  		<div style="text-align: center;margin-top: 50px;">
  			  <el-button type="primary" @click='EditAction'>{{isEdit?'保存':'编辑'}}</el-button>
  		</div>
  	</el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        name: ""
      },
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
      dialogAddVisible: false,
      dialogType: 0,
      form: {
        name: "", //课件名称
        code: "", //课件编码
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      },
      isEdit:false,
      rules: {
        name: [
          { required: true, message: "请输入全称", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入email", trigger: "blur" },
        ],
        logo: [
          { required: true, message: "请输入学校LOGO", trigger: "blur" },
        ],
        domain: [
          { required: true, message: "请输入网站域名", trigger: "blur" },
        ],
        icp: [
          { required: true, message: "请输入icp信息", trigger: "blur" },
        ],
        copyright: [
          { required: true, message: "请输入版权信息", trigger: "blur" },
        ],
//      code: [
//        { required: true, message: "请输入院校编码", trigger: "blur" },
//        {
//          min: 1,
//          max: 8,
//          message: "最长 8 个字符",
//          trigger: "change"
//        }
//      ],
//      remark: [
//        {
//          min: 1,
//          max: 255,
//          message: "最长 50 个字符",
//          trigger: "change"
//        }
//      ]
     },
     ruleForm:{
     	bgImg:""
     },
     hostApi:""
    };
  },
  components: {},
  mounted() {
  	if(window.location.href.indexOf("localhost")<0){
  		if(window.location.host.indexOf('test')>-1){
  			this.hostApi = this.$config.HOST_API;
  		}else{
  			this.hostApi="http://"+window.location.host.split(":")[0]+":81/manager-api/";	
  		}
	//	 PREFIX_URL="http://hlh.gzsqwhcm.com:81/manager-api/"
	}else{
		 this.hostApi = this.$config.HOST_API;
	}
    this.get_ajax();
  },
  watch:{
  	"tableForm.name":function(n,o){
  			if(!n){
  				this.get_ajax()
  			}
  	}
  },
  methods: {
    //获取数据
    EditAction(){
    	if(this.isEdit){
    		this.saveAjax('ruleForm')
    		return 
    	}
    	this.isEdit=!this.isEdit;
//  	this.get_ajax()
    	
    },
    saveAjax(formName){
    	this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.schoolManage.editSchoolInfo(this.ruleForm).then((res)=>{
            	this.isEdit=!this.isEdit
            	this.$message.success("保存成功")
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    get_ajax() {
      this.tableLoading = true;
      this.$api.schoolManage.getSchoolInfo({
          pageNum: this.pageNum,
          pageSize: this.pageSize,	
        })
        .then(res => {
          this.ruleForm=res.data;
          this.tableLoading = false;
        });
    },
    ready_ajax() {
      this.pageNum = 1;
      this.get_ajax();
    },
    searchChange() {
      this.ready_ajax();
    },
    //显示添加框
    dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
      this.form = {
        name: "", //课件名称
//      code: "", //课件编码
//      remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //显示编辑框
    dialogEdit_show(row) {
      this.dialogType = 1;
      this.dialogAddVisible = true;
      this.form = {
        id: row.id,
        name: row.name, //课件名称
//      code: row.code, //课件编码
//      remark: row.remark, //备注
        ableStatus: row.ableStatus //启用状态(1启用0禁用)
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.message
          .messageType_add(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
          console.log(this.$api.message.messageType_edit)
        this.$api.message
          .messageType_edit(this.form.id,this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      }
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.add_ajax();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //分页start
    handleSizeChange(val) {
      this.pageSize = val;
      this.get_ajax();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.get_ajax();
    },
    
    upSuccess(res) {
      if (res.code === 0) {
        this.ruleForm.logo=res.data;
//      this.$api.systemManagement.myMessage_edit_info(this.form).then(() => {
//    });
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
    upSuccess2(res){
    	  if (res.code === 0) {
        this.ruleForm.adminBgImg=res.data;
//      this.$api.systemManagement.myMessage_edit_info(this.form).then(() => {
//    });
      } else {
        this.$message.error(res.msg);
      }
      this.message.close();
      this.message = null;
    },
    upError(res) {
      this.$message({
        message: res.message,
        type: "error"
      });
      this.message.close();
      this.message = null;
    }
    //分页end
  }
};
</script>
<style type="text/css">
	  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .aplusIcon{
  	width: 100%!important;
  	display: block;
  }
  .el-upload-ap{
  	width: 100%!important;
  }
   .el-upload-ap .el-upload{
   	width: 100%;
   }
   .tip{
   	color:gray;
   	/*padding-left:5%;*/
   	margin-top: 30px;
   }
</style>