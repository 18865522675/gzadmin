<template>
  <div style="display: inline-block;margin-left:10px" class="delBtnWrap">
     <el-button type="text"  size="small"   class="baseModifyBtn" @click="showDelDialog" :disabled="disabled">删除</el-button>
  </div>

</template> 

<script>
import { $ } from "@/api/axios";
export default {
  data() {
    return {
      disable: false
    };
  },

  props: {
    delUrl: {
      type: String,
      required: true
    },
    delId: {
      required: true,
      type: Number
    },
    delOk: {},
    disabled: {
      required: false,
      default: false
    },
    studentThesisIds:{
    	required:false,
    	default:0
    }
  },
  methods: {
    showDelDialog() {
      this.$alert("确定要删除此数据嘛", "删除", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
          distinguishCancelAndClose: false,
        // cancelButtonText: "取消",
        callback: action => {
          if (action == "confirm") {
          	var  params={};
          	if(this.studentThesisIds){
          		params={
          			studentThesisIds:this.studentThesisIds
          		}
          	}
          	
            $.delete(`${this.delUrl}/${this.delId}`,params).then(() => {
              this.$message.success("删除成功");
              this.delOk && this.delOk();
            });
          }
        }
      });
    }
  },
  mounted() {},
  created() {}
};
</script>

<style lang="less">
.delBtnWrap {
  .baseModifyBtn {
		padding: 4px 12px;
		background: #6DABFF ;
		color:white;
		border-radius: 12px;
  }
  .is-disabled {
    color: #c0c4cc;
  }
}
</style>
