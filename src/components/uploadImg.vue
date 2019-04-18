<template>
	<div class="uploadImgWrap">
		<el-upload
		  class="avatar-uploader"
		  :action="hostApi+'Hide/upload'"
		  :show-file-list="false"
		  name="imageFile"
		  :with-credentials="true"
		  :on-success="handleAvatarSuccess"
		  :before-upload="beforeAvatarUpload">
		  <img v-if="msg" :src="msg" class="avatar">
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>

<script>
	export default{
		name:"uploadImg",
		data(){
			return {
				hostApi:"",
				picUrl:"",
			}
		},
		model: {    // 使用model， 这儿2个属性，prop属性说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
	      prop: 'msg',
	      event: 'setImg'
	    },	    
	    props: {
		    msg: ''
		},
		mounted(){
			if(window.location.href.indexOf("localhost")<0){
				 if(window.location.host.indexOf('test')>-1){
				 	this.hostApi = this.$config.HOST_API;
		  		}else{
		  			this.hostApi="http://"+window.location.host.split(":")[0]+":81/manager-api/";	
		  		}
			}else{
				 this.hostApi = this.$config.HOST_API;
			}
		},
		methods:{
			beforeAvatarUpload(file) {
				let typeArr=['image/jpeg','image/png','image/gif'];
		        const isJPG = file.type === 'image/jpeg';
//		        const isLt2M = file.size / 1024 / 1024 < 2;
		
		        if (typeArr.indexOf(file.type)<-1) {
		          this.$message.error('只允许上传图片');
		        }
//		        if (!isLt2M) {
//		          this.$message.error('上传头像图片大小不能超过 2MB!');
//		        }
		        return file.type;
		     },
		     handleAvatarSuccess(res){
//		     	console.log(res)	
				 this.$emit('setImg', res.data);
				 console.log(this.msg)
		     }
		},
		watch:{
		}
	}
</script>

<style>
	.avatar-uploader {
		height: 48px;
		width: 48px;
		float: right;			
	}
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
    font-size: 14px;
    color: #8c939d;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
  }
  .avatar {
    width: 48px;
    height: 48px;
    display: block;
  }
</style>