<template>
  <div class="g-module">
    <!--筛选-->
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form ref="screenForm"  class="kf-form">

        <!--搜索-->
        <div class="kf-row">
          <el-form-item label="测评批次" class="kf-form-item form-sel mr60">
            <el-select v-model="topForm.timeId" placeholder="请选择测评批次" @change="selectChange(true)" filterable>
              <el-option label="全部" value=""/>
              <el-option
                      v-for="item in batchList"
                      :key="item.id"
                      :label="`${item.year}-${item.batch==0?'上半年':'下半年'}`"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="课程名称" class="kf-form-item form-sel mr60">
            <el-select v-model="topForm.courseId" placeholder="请选择层次" @change="selectChange(true)" filterable>
              <el-option label="全部" value=""/>
              <el-option
                      v-for="item in courseList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="助学机构" class="kf-form-item form-sel mr60"  v-if="$store.getters.getUserInfo.type==2">
            <el-select v-model="topForm.stationId" placeholder="请选择助学机构" @change="selectChange(true)">
              <el-option label="全部" value=""/>
              <el-option
                      v-for="item in stationList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发布状态" class="kf-form-item form-sel mr60">
            <el-select v-model="topForm.publishStatus" placeholder="请选择发布状态" @change="selectChange(true)" filterable>
              <el-option label="全部" value=""/>
              <el-option label="未开始测评" :value="0"></el-option>
              <el-option label="待发布" :value="1"/>
              <el-option label="已发布" :value="2"/>

            </el-select>
          </el-form-item>

          <el-form-item label="显示状态" class="kf-form-item form-sel mr60">
            <el-select v-model="topForm.displayStatus" placeholder="请选择显示状态" @change="selectChange(true)" filterable>
              <el-option label="全部" value=""/>
              <el-option label="是" :value="1"/>
              <el-option label="否" :value="0"/>
            </el-select>
          </el-form-item>

          <el-form-item  class="kf-form-item form-search">
            <el-input placeholder="请输入手机号/姓名" v-model="topForm.keyword" style="width: 296px;">
              <el-button slot="append" class="form-search-ico" @click="selectChange(true)">搜索</el-button>
            </el-input>
          </el-form-item>

        </div>
      </el-form>
    </div>
    <div class="kf-bd">

      <!--表格导航-->
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">评价列表</div>
        </div>
        <div class="kf-table-nave-right">
          <!--下载模板-->
          <download url="/student/assessment/result/export" class="mr30" text="批量下载" v-if="extra.indexOf('批量下载')>-1"/>
          <!--导入模板-->
          <div class="sendEvaluation" @click="sendEvaluation"  v-if="extra.indexOf('发布测评')>-1">发布测评</div>
        </div>
      </div>

      <!--表格-->
      <el-table
              ref="multipleTable"
              v-loading="loading"
              :data="tableData"
              border
              class="kf-table"
              style="width: 100%"    @selection-change="handleSelectionChange">
        <el-table-column
                type="selection"
                width="55" :selectable="checkboxT"  v-if="$store.getters.getUserInfo.type==2">
        </el-table-column>
        <el-table-column
                type="index"
                :index="(index) => (pageNum - 1) * pageSize + index + 1"
                label="序号"
                width="50"
        >
        </el-table-column>
        <el-table-column
                prop="phone"
                label="手机号" width="120">
        </el-table-column>
        <el-table-column
                prop="idCardType"
                label="证件类型" :formatter="formats">
        </el-table-column>
        <el-table-column
                prop="idCardNo"
                label="证件号码">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名">
        </el-table-column>
        <el-table-column
                prop="ticketNo"
                label="准考证">
        </el-table-column>
        <el-table-column
                prop="courseCode"
                label="课程代码">
        </el-table-column>
        <el-table-column
                prop="courseName"
                label="课程名称">
        </el-table-column>
        <el-table-column
                prop="siteCode"
                label="主考院校(代码)">
        </el-table-column>
        <el-table-column
                prop="siteName"
                label="主考院校" width="120">
        </el-table-column>
        <el-table-column
                prop="stationCode"
                label="助学机构(代码)">
        </el-table-column>
        <el-table-column
                prop="stationName"
                label="助学机构">
        </el-table-column>
        <el-table-column
                prop="majorCode"
                label="专业代码">
        </el-table-column>
        <el-table-column
                prop="majorName"
                label="专业名称">
        </el-table-column>
        <el-table-column
                prop="courseScore"
                label="课程学习成绩">
        </el-table-column>
        <el-table-column
                prop="workScore"
                label="平时作业成绩">
        </el-table-column>
        <el-table-column
                prop="examScore"
                label="综合测验成绩">
        </el-table-column>
        <el-table-column
                prop="stdyScore"
                label="学习表现成绩(网络)">
        </el-table-column>
        <el-table-column
                prop="totalScore"
                label="总成绩">
        </el-table-column>
        <el-table-column
                prop="publishStatusName"
                label="发布状态">
        </el-table-column>
        <el-table-column
                prop="assessment"
                label="测评时间"  :formatter="$fun.table.time" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="customSiteCode"
          label="自拟主考院校代码"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="customSite"
          label="自拟主考院校"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="customStationCode"
          label="自拟助学机构代码"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="customStation"
          label="自拟助学机构(单位)"
          min-width="120">
        </el-table-column>
      </el-table>

      <!--分页pageNum-->
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-size="pageSize"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              class="kf-pagination">
      </el-pagination>
      <!--分页end-->
    </div>

    <!--弹窗-->
    <!--<el-dialog
       :title="actionType?'添加':'编辑'"
       :visible.sync="dialogVisible"
       width="760px"
       center
       :append-to-body="true"
       class="kf-dialog-add" @close="close">
       <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="kf-form-add">
         <el-form-item label="课件名称" prop="name">
           <el-input v-model.trim="form.name" placeholder="请输入课件名称 "></el-input>
         </el-form-item>
         <el-form-item label="层次" prop="level">
           <el-select v-model="form.level" placeholder="请选择层次" class="kf-form-item form-sel" style="width: 100%" @change="changeLevel">
               <el-option
                 v-for="item in levelList"
                 :key="item"
                 :label="item"
                 :value="item">
               </el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="课程" prop="level">
           <el-select v-model="form.courseId" placeholder="请选择课程" class="kf-form-item form-sel" style="width: 100%" :disabled="!form.level">
               <el-option
                 v-for="item in addCourseList"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
               </el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="播放地址" prop="playUrl">
           <el-input v-model.trim="form.playUrl" placeholder="请输入播放地址"></el-input>
         </el-form-item>
         <el-form-item label="封面地址" prop="coverUrl">
           <el-input v-model.trim="form.coverUrl" placeholder="请输入封面地址"></el-input>
         </el-form-item>
         <el-form-item label="顺序号" prop="sort">
           <el-input v-model.trim="form.sort" placeholder="请输入顺序号(必须为数字)"></el-input>
         </el-form-item>
         <el-form-item label="状态" prop="status">
           <el-radio-group v-model="form.status">
              <el-radio :label="0">启用</el-radio>
             <el-radio  :label="1">禁用</el-radio>
           </el-radio-group>
         </el-form-item>
         <el-form-item label="备注" prop="remark">
           <el-input type="textarea" v-model.trim="form.remark" maxpageSize="100" :rows="6" placeholder="输入不超过255个字"></el-input>
         </el-form-item>

       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm('form')">保 存</el-button>
       </div>
     </el-dialog>
     -->

  </div>
</template>

<script>
import studyMixin from "@/mixin/studyManage.js";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      topForm: {
        courseId: "",
        displayStatus: "",
        publishStatus: "",
        stationId: "",
        keyword: "",
        timeId: ""
      },
      stationList: [],
      courseList: [],
      batchList: [],
      siteId: "",
      stationId: "",
      courseId: "",
      account: "",
      loading: false,
      multipleSelection: [],
      extra: []
    };
  },
  components: {},
  mixins: [studyMixin],
  mounted() {
    this.getCourseList();
    this.getBatchList();
    if (this.$store.getters.getUserInfo.type == 2) {
      this.getStationList();
    }
    this.getDataList();
  },
  watch: {
    "topForm.keyword": function(n) {
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    getDataList() {
      this.loading = true;
      this.$api.studentManagement
        .comprehensive_get_list({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.topForm
        })
        .then(res => {
          this.tableData = res.data.pageList;
          this.total = res.data.total;
          this.extra = res.data.extra;
          this.loading = false;
        });
    },
    getCourseList() {
      this.$api.studentManagement.comprehensive_get_courses().then(res => {
        this.courseList = res.data;
      });
    },
    getBatchList() {
      this.$api.studentManagement.comprehensive_get_batchs().then(res => {
        this.batchList = res.data;
      });
    },
    getStationList() {
      this.$api.studentManagement.comprehensive_get_sites().then(res => {
        this.stationList = res.data;
      });
    },
    search() {
      if (!this.topForm.keyword) return;
      this.selectChange(true);
    },
    formats(row, col) {
      switch (row.idCardType) {
        case 1:
          return "身份证";
        case 2:
          return "港澳台通行证";
        case 3:
          return "士官证";
      }
    },
    sendEvaluation() {
      if (!this.multipleSelection.length) {
        return this.$message({
          type: "warning",
          message: "请选择发布测评的学生"
        });
      }
      let arr = [];
      for (let i of this.multipleSelection) {
        arr.push(i.id);
      }
      this.$api.studentManagement
        .comprehensive_sendEvaluation({
          ids: arr.join(",")
        })
        .then(() => {
          this.actionMes("发布成功");
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    checkboxT(row) {
      return row.publishStatus != 2;
    }
  }
};
</script>
<style lang="less">
.sendEvaluation {
  font-size: 16px;
  color: #5e4faa;
  cursor: pointer;
}
</style>
