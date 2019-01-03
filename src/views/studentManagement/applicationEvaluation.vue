<template>
  <div class="g-module">
    <!--筛选-->
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="年份" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.timeId" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in timeList"
                :key="index"
                :label="item.year+'—'+(item.batch?'下半年':'上半年')"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="课程" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.courseId" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in courseList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="助学机构" class="kf-form-item form-sel mr40"  v-if="$store.getters.getUserInfo.type==2">
            <el-select v-model="tableForm.stationId" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in stationList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="来源" class="kf-form-item form-sel mr40"  v-if="$store.getters.getUserInfo.type==2">
            <el-select v-model="tableForm.applyFrom" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option label="不限" value="0"/>
              <el-option label="学生端" value="1"/>
              <el-option label="助学中心" value="2"/>

            </el-select>
          </el-form-item>
          <el-form-item label="审核状态" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.auditStatus" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option label="待申请" :value="0"  v-if="$store.getters.getUserInfo.type==1"/>
              <el-option label="通过" :value="2"/>
              <el-option label="拒绝" :value="3"/>
              <el-option label="待审核" :value="1"/>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索" class="kf-form-item form-search">
            <el-input placeholder="请输入准考证/姓名/手机号" v-model="tableForm.keyword">
              <el-button slot="append" class="form-search-ico" @click="searchChange">搜索</el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">
      <!--表格导航-->
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">测评列表</div>
          <div  class="kf-btn kf-btn-table kf-btn-add ml20"  @click="dialogVisible = true"  v-if="extra.indexOf('添加')>-1"></div>
          <div class="kf-btn kf-btn-table ml20" @click="takeApply(false)"  v-if="extra.indexOf('申请')>-1">申请</div>
          <div class="kf-btn kf-btn-table ml20" @click="adopt(null, 2)" v-if="extra.indexOf('通过')>-1">通过</div>
          <!--<div class="kf-btn kf-btn-table ml20" @click="adopt(null, 2)" v-if="extra.indexOf('通过')>-1">通过</div>-->
        </div>
        <div class="kf-table-nave-right">
          <!--下载模板-->
          <download url="student/assessment/downloadMould"  v-if="extra.indexOf('下载模板')>-1"/>
          <!--导入模板-->
          <upload url="student/assessment/upload" class="ml20" :ok="ready_ajax"  v-if="extra.indexOf('批量导入')>-1" />
          <!--数据导出-->
          <download url="student/assessment/assessment/export" text="数据导出" v-if="extra.indexOf('数据导出')>-1"/>
        </div>
      </div>

      <!--表格-->
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        class="kf-table"
        @selection-change="tableHandleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55" :selectable="checkboxT">
        </el-table-column>
        <el-table-column
          type="index"
          :index="(index) => (pageNum - 1) * pageSize + index + 1"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="160">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width="160">
        </el-table-column>
        <el-table-column
          prop="idCardTypeName"
          label="证件类型"
          width="80">
        </el-table-column>
        <el-table-column
          prop="idCardNo"
          label="证件号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="stationName"
          label="助学机构"
          width="100">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="评测课程">
        </el-table-column>
        <el-table-column
          prop="applyTime"
          :formatter="$fun.table.time"
          label="申请时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="auditStatusName"
          label="审核状态">
        </el-table-column>
        <el-table-column
                prop="applyFrom"
                label="来源" :formatter="formats">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="adopt(scope.row, 2)" v-if="extra.indexOf('通过')>-1&&scope.row.auditStatus!==2">通过</el-button>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="adopt(scope.row, 3)" v-if="extra.indexOf('通过')>-1&&scope.row.auditStatus!==3">拒绝</el-button>
            <baseDelBtn delUrl="student/assessment/remove" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="takeApply(true,scope.row)" v-if="extra.indexOf('申请')>-1" :disabled="scope.row.auditStatus==1||scope.row.auditStatus==2">申请</el-button>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="showSeeDialog(scope.row)"  v-if="extra.indexOf('查看')>-1">查看</el-button>
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

      <!--弹窗-->
      <el-dialog
              title="添加"
              :visible.sync="dialogVisible"
              width="760px"
              center
              :append-to-body="true"
              @close="closeDialog"
              class="kf-dialog-add">
        <el-form ref="formData" :rules="rules" :model="formData" label-width="75px" class="kf-form-add">
          <el-form-item label="手机号" prop="phone">
            <el-input type="name"  v-model.trim="formData.phone" placeholder="请输入手机号"  style="width: 80%;float: left;"></el-input>
            <div class="kf-multi-btn" @click="searchForm">搜索</div>
          </el-form-item>
        </el-form>
        <div v-loading="searchLoading" v-if="Object.keys(searchInfo).length">
          <div class="kf-evalu-Con kf-flex">
            <div>
              手机号 : {{searchInfo.phone}}
            </div>
            <div>
              姓名 : {{searchInfo.name}}
            </div>
          </div>
          <div class="kf-evalu-Con kf-flex">
            <div>
              证件类型 : {{searchInfo.idCardType==1?'身份证':searchInfo.idCardType==2?'港澳通行证':'军官证'}}
            </div>
            <div>
              证件号 : {{searchInfo.idCardNo}}
            </div>
          </div>
          <el-table
                  :data="searchInfo.assessmentCourseVos"
                  border
                  ref="multipleTable2"
                  style="width: 100%"
                  @selection-change="SeehandleSelectionChange"
                  class="kf-table"
          >
            <el-table-column
                    type="selection"
                    width="40">
            </el-table-column>
            <el-table-column
                    type="index"
                    label="序号"
                    :index="(index) => (pageNum - 1) * pageSize + index + 1"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="course"
                    label="课程">
            </el-table-column>
            <el-table-column
                    prop="payStatus"
                    label="课程缴费状态" :formatter="formats">
            </el-table-column>
            <el-table-column
                    prop="studyTimes"
                    label="学习次数">
            </el-table-column>
            <el-table-column
                    prop="noteTimes"
                    label="笔记提交次数">
            </el-table-column>
            <el-table-column
                    prop="taskTimes"
                    label="作业提交次数">
            </el-table-column>
            <el-table-column
                    prop="assessmentTimes"
                    label="测评次数">
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer" style="text-align: center;margin-top: 20px;">
            <el-button type="primary" @click="submitForm">保 存</el-button>
          </div>
        </div>

      </el-dialog>


      <!--弹窗-->
      <el-dialog
              title="查看"
              :visible.sync="seeDialog"
              width="760px"
              center
              :append-to-body="true"
              class="kf-dialog-add">
        <el-table
                v-loading="seeLoading"
                :data="[seeCourses]"
                border
                class="kf-table"
                style="width: 100%"
        >
          <el-table-column
                  prop="course"
                  label="课程">
          </el-table-column>
          <el-table-column
                  prop="studyTimes"
                  label="学习次数">
          </el-table-column>
          <el-table-column
                  prop="noteTimes"
                  label="笔记提交次数">
          </el-table-column>
          <el-table-column
                  prop="taskTimes"
                  label="作业提交次数">
          </el-table-column>
          <el-table-column
                  prop="assessmentTimes"
                  label="测评次数">
          </el-table-column>

        </el-table>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { checkTel } from "@/public/validators.js";
export default {
  data() {
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        stationId: "",
        timeId: "",
        courseId: "",
        auditStatus: "",
        keyword: "",
        applyFrom: ""
      },
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
      timeList: [],
      courseList: [],
      stationList: [],
      selList: [],
      formData: {},
      dialogVisible: false,
      searchInfo: {},
      multipleSelection: [],
      rules: {
        phone: [{ trigger: "blur", validator: checkTel }]
      },
      // 查看弹窗
      seeDialog: false,
      // 查看的课程的记录
      seeCourses: [],
      // 查看loading
      seeLoading: false,
      // 查询loading
      searchLoading: false,

      seeMulti: [],
      listarr:'',
      List:''
    };
  },
  components: {},
  mounted() {
    this.get_list();
    this.get_ajax();
  },
  methods: {
    formats(row, col) {
      if (col.property == "payStatus") {
        switch (row.payStatus) {
          case 1:
            return "已缴费";
          case 0:
            return "未缴费";
        }
      }

      if (col.property == "applyFrom") {
        switch (row.applyFrom) {
          case 1:
            return "学生端";
          case 2:
            return "助学中心";
        }
      }
    },
    closeDialog() {
      this.formData.phone = "";
      this.searchInfo = {};
    },
    takeApply(isSingle, row) {
      let arr = [];
      if (isSingle) {
        arr.push(row.id);
      } else {
        if (!this.multipleSelection.length) {
          return this.$message.warning("请先选择申请课程");
        }
        this.multipleSelection.map(item => {
          arr.push(item.id);
        });
      }

      this.$api.studentManagement
        .applicationEvaluation_doApply({
          ids: arr.join(",")
        })
        .then(res => {
          this.$message.success("申请成功");
          this.get_ajax();
        });
    },
    submitForm() {
      if (!this.seeMulti.length) return this.$message.warning("请选择测评课程");
      let arr = [];
      this.seeMulti.map(item => {
        arr.push(item.courseId);
      });
      // console.log(arr);
      this.$api.studentManagement
        .applicationEvaluation_addApply({
          studentId: this.searchInfo.studentId,
          courseIds: arr.join(",")
        })
        .then(res => {
          this.dialogVisible = false;
          this.ready_ajax();
          this.$message.success("添加成功");
        });
    },
    showSeeDialog(row) {
      this.seeDialog = true;
      this.seeLoading = true;
      this.$api.studentManagement
        .applicationEvaluation_get_courseSee({
          phone: row.phone,
          studentId: row.studentId,
          courseId: row.courseId
        })
        .then(res => {
          this.seeLoading = false;
          this.seeCourses = res.data;
        });
    },
    SeehandleSelectionChange(val) {
      this.seeMulti = val;
      console.log(this.seeMulti);
    },
    tableHandleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
      let selList = [];

      val.map(item => {
        if (item.auditStatus !== 2) {
          selList.push({
            studentId: item.studentId,
            courseId: item.courseId
          });
        }
      });
      this.selList = selList;

    },
    searchForm() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.seeMulti = [];
          this.searchLoading = true;
          this.$api.studentManagement
            .applicationEvaluation_get_courses(this.formData.phone)
            .then(res => {
              this.searchLoading = false;
              this.searchInfo = res.data;
              // for (let i of res.data.assessmentCourseVos) {
              //     this.$refs.multipleTable2.toggleRowSelection(i);
              // }
              this.$nextTick(() => {
                res.data.assessmentCourseVos.map(item => {
                  if (item.auditStatus != null) {
                    this.$refs.multipleTable2.toggleRowSelection(item);
                  }
                });
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    get_list() {
      this.$api.studentManagement
        .applicationEvaluation_get_time_list()
        .then(res => {
          this.timeList = res.data;
        });
      this.$api.studentManagement
        .applicationEvaluation_get_course_list()
        .then(res => {
          this.courseList = res.data;
        });
      if (this.$store.getters.getUserInfo.type == 2) {
        this.$api.studentManagement
          .studentManagement_get_stationList()
          .then(res => {
            this.stationList = res.data;
          });
      }
    },
    //获取数据
    get_ajax() {
      let tableForm = { ...this.tableForm };

      this.tableLoading = true;
      this.$api.studentManagement
        .applicationEvaluation_get_list({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.$fun.signDel(tableForm)
        })
        .then(res => {
          this.extra = res.data.extra;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
          this.tableLoading = false;
        });
    },
    ready_ajax() {
      this.pageNum = 1;
      this.get_ajax();
    },
    //搜索选择框
    searchChange() {
      this.ready_ajax();
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
    handleSelectionChange(val) {
      let selList = [];

      val.map(item => {
        if (item.auditStatus !== 2) {
          selList.push({
            studentId: item.studentId,
            courseId: item.courseId
          });
        }
      });
      this.selList = selList;
    },
    adopt(row, type) {
      let ids = [];

      if (row) {
        ids.push({
          studentId: row.studentId,
          courseId: row.courseId
        });
      } else {
        ids = this.selList;
      }
      if (ids.length) {
        this.$api.studentManagement
          .applicationEvaluation_adopt({
            jsonStr: JSON.stringify(ids),
            auditStatus: type
          })
          .then(() => {
            this.$message({
              type: "success",
              message: type === 2 ? "通过成功!" : "拒绝成功!"
            });
            this.get_ajax();
          });
      }
    },
    checkboxT(row) {
      if (this.$store.getters.getUserInfo.type == 1) {
        return row.auditStatus == 0 || row.auditStatus == 3;
      } else {
        return row.auditStatus != 2;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.kf-multi-btn {
  float: right;
  background: #5e4faa;
  color: white;
  border-radius: 5px;
  width: 15%;
  line-height: 48px;
  text-align: center;
}
.kf-multi-flex {
  display: flex;
  flex-wrap: wrap;
}
.kf-multi-check {
  line-height: 50px;
  width: 33%;
  .el-checkbox__label {
    font-size: 14px !important;
  }
}
.kf-flex {
  display: flex;
  flex-wrap: wrap;
}
.kf-evalu-Con {
  & > div {
    line-height: 47px;
    width: 50%;
  }
}
</style>
