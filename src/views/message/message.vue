<template>
    <div class="g-module messageWrap">
        <!--筛选-->
        <div class="kf-screen">
            <div class="kf-screen-head">
                <div class="kf-screen-head-cap">筛选</div>
            </div>
            <el-form class="kf-form">
                <div class="kf-row">
                    <el-form-item  class="kf-form-item form-search">
                        <el-input placeholder="请输入消息标题" v-model="title">
                            <el-button slot="append" class="form-search-ico" @click="search">搜索</el-button>
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <div class="kf-bd">
            <!--表格导航-->
            <div class="kf-table-nave">
                <div class="kf-table-nave-left">
                    <div class="kf-btn">消息列表</div>
                    <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="show(true)" v-if="extra.indexOf('添加')>-1"></div>
                </div>
            </div>

            <!--表格-->
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    class="kf-table"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        :index="(index) => (pageNum - 1) * pageSize + index + 1"
                        label="序号"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="消息标题"
                        width="200"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="内容"
                        width="340"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="sendName"
                        label="发件人">
                </el-table-column>
                <el-table-column
                        prop="sendType"
                        label="收件人" :formatter="formats">
                </el-table-column>
                <el-table-column
                        prop="siteId"
                        label="类型"  :formatter="formats">
                </el-table-column>
                <el-table-column
                        prop="publishTime"
                        :show-overflow-tooltip="true"
                        label="发布时间" :formatter="$fun.table.time">
                </el-table-column>
                <el-table-column
                        prop="updateTime"  :show-overflow-tooltip="true"
                        label="更新时间" :formatter="$fun.table.time">
                </el-table-column>
                <el-table-column
                        prop="remark" width="250"
                        label="备注" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="publishStatus"
                        label="状态"
                        width="100" :formatter="formats">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="160">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="kf-table-scopeBtn" @click="publishMessage(scope.row.id)" v-if="scope.row.canChange==1&&extra.indexOf('发布')>-1" :disabled="scope.row.publishStatus==1">发布</el-button>
                        <el-button type="text" size="small" class="kf-table-scopeBtn"  @click="show(false,scope.row,true)"  v-if="extra.indexOf('详情')>-1">查看</el-button>
                        <el-button type="text" size="small" class="kf-table-scopeBtn"  @click="show(false,scope.row)" v-if="scope.row.canChange==1&&extra.indexOf('编辑')>-1" :disabled="scope.row.publishStatus==1">编辑</el-button>
                        <baseDelBtn delUrl="/message/notice" :delId="scope.row.id" :delOk="selectChange"  v-if="scope.row.canChange==1&&extra.indexOf('删除')>-1"></baseDelBtn>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页start-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40, 50, 100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    class="kf-pagination">
            </el-pagination>
            <!--分页end-->

        </div>

        <!--添加编辑弹窗-->
        <!--添加编辑弹窗-->
        <el-dialog
                :title="isRight?'选择学生/已选学生':isSee?'查看':actionType?'添加':'编辑'"
                :visible.sync="dialogVisible"
                width="760px"
                center
                :append-to-body="true"
                @close="close"
                class="kf-dialog-add" ref="kf-mes-dialog">
            <div class="overflow_wrap">
                <div class="slide_wrap" ref="slide_wrap">
                    <div class="slide_left">
                        <el-form ref="formData" :rules="rules" :model="formData" label-width="120px" class="kf-form-add">
                            <el-form-item label="消息标题" prop="title">
                                <el-input   v-model.trim="formData.title" placeholder="请输入消息标题" :disabled="isSee"></el-input>
                            </el-form-item>
                            <el-form-item label="发件人" prop="sender">
                                <el-input   value="我" placeholder="请输入发件人" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="收件人" prop="sendType">
                                <el-select v-model="formData.sendType" placeholder="请选择收件人" class="kf-form-item form-sel" style="width: 100%">
                                    <el-option label="所有人" :value="1"></el-option>
                                    <el-option label="指定" :value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学生" class="guideCourseList" prop="courseIdList" v-if="formData.sendType==2">
                                <div style="line-height: 40px;padding-right: 25px">
									{{studentStr}}
                                </div>
                                <img :src="arrow_Btn" alt="" class="arrow_Btn arrow_Btn_Left" @click="slideAction">
                            </el-form-item>
                            <el-form-item label="内容" prop="content">
                                <el-input type="textarea" :rows="6" v-model="formData.content" placeholder="请输入内容" :disabled="isSee"></el-input>
                            </el-form-item>
                            <el-form-item label="备注" prop="remark">
                                <el-input type="textarea" :rows="6" v-model="formData.remark" placeholder="请输入备注" :disabled="isSee"></el-input>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer" style="text-align: center"  v-if="!isSee">
                            <el-button type="primary" @click="submitForm('formData')">保 存</el-button>
                        </div>
                    </div>


                    <div  class="slide_right"   >
                        <div style="display: flex;justify-content: space-between">
                            <img :src="arrBtnLeft"  class="arrow_Btn" alt="" @click="slideAction">
                            <!--<span>选择学生/已选学生</span>-->
                            <div  class="kf-searchBox">
                                <el-input placeholder="请输入手机号/姓名" v-model="account" ></el-input>
                                <el-button style="float: left;" @click="getStudentList">搜索</el-button>

                            </div>

                        </div>
                        <div class="rightTable">
                        	<el-table
                                ref="multipleTable"
                                tooltip-effect="dark"
                                :data="studentList"
                                border
                                center
                                @selection-change="handleSelectionChange"
                                style="width: 100%;margin-top:20px">
                            <el-table-column
                                    type="selection"
                                    width="30"  v-if="!isSee">
                            </el-table-column>
                            <el-table-column
                                    type="index"
                                    label="序号" width="50" :index="(index) => (pageNum2 - 1) * pageSize2 + index + 1">
                            </el-table-column>
                            <el-table-column
                                    prop="site"
                                    label="主考院校" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column
                                    prop="station"
                                    label="助学机构" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column
                                    prop="level"
                                    label="层次" :show-overflow-tooltip="true" :formatter="addTableFormats">
                            </el-table-column>
                            <el-table-column
                                    prop="major"
                                    label="专业" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column
                                    prop="phone"
                                    label="手机号" width="115" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="学生" :show-overflow-tooltip="true">
                            </el-table-column>
                        </el-table>
                        </div>
                        <div slot="footer" class="dialog-footer" style="text-align: center;padding-top: 20px" v-if="!isSee">
                            <el-button type="primary" @click="saveSelCourse">保 存</el-button>
                        </div>
                        <!--分页-->
                        <el-pagination
                                @size-change="handleSizeChange2"
                                @current-change="handleCurrentChange2"
                                :current-page="pageNum2"
                                :page-sizes="[8, 16, 24,32]"
                                :page-size="pageSize2"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total2"
                                class="kf-pagination">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import arrBtnLeft from "@/assets/img/arrBtnLeft.png";
import arrow_Btn from "@/assets/img/ico_4.png";
import studyMixin from "@/mixin/studyManage.js";
export default {
  data() {
    return {
      arrBtnLeft,
      arrow_Btn,
      tableData: [],
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      title: "",
      isRight: false,
      formData: {
        sendType: 1
        // sender: "zbj"
      },
      actionType: true,
      dialogVisible: false,
      studentList: [],
      // studentIds:[],
      pageNum2: 1,
      pageSize2: 8,
      total2: 0,
      account: "",
      rules: {
        title: [{ required: true, message: "请输入消息标题", trigger: "blur" }],
        // sender: [{ trigger: "blur", message: "请输入发件人" }],
        sendType: [
          { trigger: "blur", required: true, message: "请选择收件人" }
        ],
        // courseIdList: [{ trigger: "blur", validator: courseIdList }],
        content: [{ trigger: "blur", message: "内容最长为500字", max: 500 }],
        remark: [{ trigger: "blur", message: "备注最长为100字", max: 100 }]
      },
      // studentIds: [],
      multipleSelection: [],
      isRight: false,
      isSee: false,
      extra: []
    };
  },
  watch: {
    title: function(n) {
      if (!n) this.selectChange(true);
    },
    account: function(n) {
      if (!n);
      this.getStudentList();
    }
  },
  computed: {
    studentStr: function() {
      let str = "";
      for (let i of this.multipleSelection) {
        str += i.name;
      }
      return str;
    }
  },
  components: {},
  mounted() {
    this.getDataList();
  },
  mixins: [studyMixin],
  methods: {
    getDataList() {
      this.loading = true;
      this.$api.message
        .getMessageList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.title
        })
        .then(res => {
          this.tableData = res.data.pageList;
          this.total = res.data.total;
          this.loading = false;
          this.extra = res.data.extra;
        });
    },
    formats(row, col) {
      if (col.property === "publishStatus") {
        switch (row.publishStatus) {
          case 0:
            return "待发布";
          case 1:
            return "已发布";
        }
      }

      if (col.property === "sendType") {
        switch (row.sendType) {
          case 1:
            return "所有人";
          case 2:
            return "指定";
        }
      }

      if (col.property === "siteId") {
        if (row.siteId) {
          return "院校消息";
        }
        return "系统消息";
      }
    },
    search() {
      if (!this.title) {
        return;
      }
      this.selectChange(true);
    },
    publishMessage(id) {
      this.$api.message
        .publishMessage(id)
        .then(() => {
          this.actionMes("发布成功");
        })
        .catch(e => {
          console.log(e);
        });
    },
    show(actionType, row, isSee) {
      if (actionType === null || actionType === undefined) return;
      this.actionType = actionType;
      this.isSee = isSee;
      console.log(this.isSee);
      if (this.actionType) {
        this.getStudentList();
      }

      if (!actionType) {
        this.getStudentList(row.id);
        this.formData = Object.assign({}, row);
        //      if(!isSee){
        //      	this.editGetName(row.id)
        //      }
      }
      this.dialogVisible = true;
    },
    slideAction() {
      if (this.isRight) {
        this.$refs.slide_wrap.style.left = "0";
      } else {
        this.$refs.slide_wrap.style.left = "-100%";
      }
      this.isRight = !this.isRight;
    },
    close() {
      this.formData = {
        sendType: 1
      };
      this.sendType = 1;
      this.$refs.slide_wrap.style.left = "0";
      this.multipleSelection = [];
      this.pageNum2 = 1;
    },
    //  editGetName(noticeId){
    //  	let params = {
    //      pageNum: this.pageNum2,
    //      pageSize: this.pageSize2,
    //      account: this.account
    //   };
    //      params.selectNoticeId = noticeId;
    //    this.$api.message.getStudentList(params).then(res => {
    //		this.selStus=res.data.pageList
    //    });
    //  },
    getStudentList(noticeId) {
      let params = {
        pageNum: this.pageNum2,
        pageSize: this.pageSize2,
        account: this.account
      };
      if (this.isSee) {
        params.selectNoticeId = noticeId;
      } else {
        params.noticeId = noticeId;
      }
      this.$api.message.getStudentList(params).then(res => {
        this.studentList = res.data.pageList;
        this.total2 = res.data.total;
        if (!this.actionType) {
          for (let i of this.studentList) {
            if (i.selected) {
              this.multipleSelection.push(i);
              this.$nextTick(() => {
                this.$refs.multipleTable.toggleRowSelection(i);
              });
            }
          }
          // console.log(this.multipleSelection)
        }
      });
    },
    // 课程列表的分页
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.getStudentList();
    },
    handleCurrentChange2(val) {
      this.pageNum2 = val;
      this.getStudentList();
    },
    handleSelectionChange(val) {
      // for(let i of this)
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    saveSelCourse() {
      this.$refs.slide_wrap.style.left = "0";
    },
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          let arr = [];
          this.multipleSelection.map(item => {
            arr.push(item.id);
          });
          this.formData.studentIds = arr.join(",");
          if (this.actionType) {
            // this.formData.studentIds = this.multipleSelection.join(",");
            this.$api.message.addMessage(this.formData).then(() => {
              this.actionMes("新增成功");
            });
            return;
          }

          this.$api.message
            .editMessage(this.formData.id, this.formData)
            .then(() => {
              this.actionMes("编辑成功");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addTableFormats(row) {
      switch (row.level) {
        case 1:
          return "高起本";
        case 2:
          return "专升本";
      }
    }
  }
};
</script>
<style lang="less">
.search {
  border-color: #6c8bfa !important;
  background-color: #6c8bfa !important;
  color: #fff !important;
  height: 48px;
  border-radius: 0px !important;
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
}
.el-input-group__append {
  border: none !important;
}
.guideCourseList {
  min-height: 50px;
  line-height: 25px;
  max-height: 110px;
  overflow-y: auto;
  position: relative;
}
.arrow_Btn_Left {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  /*cursor: pointer;*/
}
.arrow_Btn {
  width: 30px;
  height: 30px;
  cursor: pointer;
  /*margin-bottom: 20px;*/
  /*padding-bottom: 30px;*/
}
.slide_left {
  float: left;
  width: 50%;
}
.slide_right {
  float: right;
  width: 50%;
  /*height: 500px;*/
  /*overflow-y: scroll;*/
}
.rightTable {
  height: 500px;
  overflow-y: auto;
}
.slide_wrap {
  width: 200%;
  position: absolute;
  left: 0px;
  transition: all 0.4s;
  /*height: 720px;*/
}
.overflow_wrap {
  width: 100%;
  position: relative;
  height: 720px;
  overflow: hidden;
}
.kf-searchBox {
  width: 60%;
  overflow: hidden;
  display: flex;
  .el-input {
    float: left;
    flex: 1;
    border: none;
  }
  .el-input .el-input__inner:focus {
    border-color: #5e4faa !important;
  }
  .el-button {
    float: right;
    background: #5e4faa;
    color: white;
  }
}
</style>
