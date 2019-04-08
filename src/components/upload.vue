<template>
 <div>
   <el-upload
     class="xf-upload-temp"
     name="excelFile"
     :action="$api.global.url + url"
     :show-file-list="false"
     :with-credentials="true"
     :on-success="upSuccess"
     :on-error="upError"
     :on-progress="upProgress"
   >
     <div class="kf-btn kf-btn-table"  style="margin-top: -4px;font-size: 14px;color:rgb(255, 187, 81)">{{text?text:'批量导入'}}</div>
   </el-upload>
 </div>
</template>

<script>
export default {
  data() {
    return {
      message: null
    };
  },
  props: ["url", "ok", "isMultiPay","text"],
  mounted() {},

  methods: {
    upSuccess(res) {
      if (res.code === 0) {
        try {
//      	this.$message.success("导入成功")
//        if (this.isMultiPay) {
//          let mesArr = [];
//          let idsArr = [];
//          let {
//            courseExist,
//            courseNotExist,
//            studentNotExist,
//            other
//          } = res.data;
//          if (
//            !studentNotExist.length &&
//            !courseExist.length &&
//            !courseNotExist.length &&
//            !other.length
//          ) {
//            return this.$message.success("导入成功");
//          }
//          if (studentNotExist.length) {
//            studentNotExist.map(item => {
//              idsArr.push(item);
//            });
//            mesArr.push(`第${idsArr.join(",")}条学生不存在`);
//            idsArr = [];
//          }
//          if (courseExist.length) {
//            courseExist.map(item => {
//              idsArr.push(item);
//            });
//            mesArr.push(`第${idsArr.join(",")}条课程已缴费`);
//            idsArr = [];
//          }
//          if (courseNotExist.length) {
//            courseNotExist.map(item => {
//              idsArr.push(item);
//            });
//            mesArr.push(`第${idsArr.join(",")}条课程不存在`);
//            idsArr = [];
//          }
//          if (other.length) {
//            other.map(item => {
//              idsArr.push(item);
//            });
//            mesArr.push(`其它信息 : ${idsArr.join(",")}`);
//            idsArr = [];
//          }
//          this.$message({
//            message: mesArr.join("；"),
//            type: "warning"
//          });
//        } else {
//          let msgStr = [];
//          let {
//            readCount,
//            importCount,
//            firstErrorIndex,
//            errorMsg
//          } = res.data;
//
//          msgStr.push("读取条数：" + readCount);
//          msgStr.push("正确导入条数：" + importCount);
//          if (readCount !== 0 && readCount === importCount) {
//            this.$message({
//              message: msgStr.join("；"),
//              type: "success"
//            });
//          } else {
//            if (firstErrorIndex)
//              msgStr.push("第一次错误位置：" + firstErrorIndex);
//            if (errorMsg) msgStr.push("错误原因: " + errorMsg);
//            this.$message({
//              showClose: true,
//              message: msgStr.join("；"),
//              type: "warning",
//              duration: 0
//            });
//          }
//        }
//			if(res.data.successCount==res.data.uploadCount){
//				return this.$message.success("导入成功")
//			}
			let msgStr = [];
            let {
              successCount,
              uploadCount,
              uploadErrorMessages,
            } = res.data;

            msgStr.push("读取条数：" + uploadCount);
            msgStr.push("正确导入条数：" + successCount);
            if (uploadCount !== 0 && successCount === uploadCount) {
              this.$message({
                message: msgStr.join("；"),
                type: "success"
              });
            } else {
            	let msg='';
            	uploadErrorMessages.map((item)=>{
            		msg+=item.errorMessage+","
            	})
            	this.$message({
                showClose: true,
                dangerouslyUseHTMLString: true,
                message: '<div>'+msgStr.join(',')+'!!<br/>错误信息:'+msg+'<div>',
                type: "warning",            
                duration: 0
              });
//            if (firstErrorIndex)
//              msgStr.push("第一次错误位置：" + firstErrorIndex);
//            if (errorMsg) msgStr.push("错误原因: " + errorMsg);
//            this.$message({
//              showClose: true,
//              message: msgStr.join("；"),
//              type: "warning",
//              duration: 0
//            });
            }
        } catch (e) {}
        if (this.ok) this.ok();
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
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
    }
  }
};
</script>

<style lang="less">
</style>
