<template>
  <div class="g-module">
    <!--筛选-->
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="课程名称" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.courseId" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in courseList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">
      <!--tab切换-->
      <div class="kf-table-tab">
        <div class="kf-table-tab-box">
          <div class="kf-table-tab-item" :class="{on: table_tab_ind === 0}" data-ind="0" @click="change_table_tab">测评记录</div>
          <div class="kf-table-tab-item" :class="{on: table_tab_ind === 1}" data-ind="1" @click="change_table_tab">学习笔记</div>
          <div class="kf-table-tab-item" :class="{on: table_tab_ind === 2}" data-ind="2" @click="change_table_tab">学生作业</div>
        </div>
      </div>

      <!--表格-->
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        class="kf-table"
        v-show="table_tab_ind===0"
        style="width: 100%">
        <el-table-column
          type="index"
          :index="(index) => (pageNum - 1) * pageSize + index + 1"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程">
        </el-table-column>
        <el-table-column
          prop="assessmentTime"
          :formatter="$fun.table.time"
          label="测评时间"
          width="160">
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
          label="学习表现成绩">
        </el-table-column>
        <el-table-column
          prop="totalScore"
          label="总成绩">
        </el-table-column>
      </el-table>

      <!--表格-->
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        class="kf-table"
        v-show="table_tab_ind===1"
        style="width: 100%">
        <el-table-column
          type="index"
          :index="(index) => (pageNum - 1) * pageSize + index + 1"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="title"
          label="笔记名称">
        </el-table-column>
        <el-table-column
          prop="content"
          :show-overflow-tooltip="true"
          label="内容">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="所属课程">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="lookNote(scope.row)">查看</el-button>
            <baseDelBtn delUrl="student/studentInfo/note/remove" :delId="scope.row.id" :delOk="ready_ajax"/>
          </template>
        </el-table-column>
      </el-table>

      <!--表格-->
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        class="kf-table"
        v-show="table_tab_ind===2"
        style="width: 100%">
        <el-table-column
          type="index"
          :index="(index) => (pageNum - 1) * pageSize + index + 1"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="作业名称">
        </el-table-column>
        <el-table-column
          prop="rightRate"
          label="正确率">
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="$fun.table.time"
          label="提交时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="所属课程">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="taskLook(scope.row)">查看</el-button>
            <baseDelBtn delUrl="student/studentInfo/task/remove" :delId="scope.row.id" :delOk="ready_ajax"/>
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

    <!--查看笔记-->
    <el-dialog
      title="笔记详情"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add"
      v-if="table_tab_ind===1">
      <div class="dialog-note">
        <div class="dialog-note-head">
          <div class="dialog-note-head-item">手机号：{{dialogContent.phone}}</div>
          <div class="dialog-note-head-item">姓名：{{dialogContent.name}}</div>
          <div class="dialog-note-head-item">所属课程：{{dialogContent.courseName}}</div>
          <div class="dialog-note-head-item">助学机构：{{dialogContent.stationName}}</div>
          <div class="dialog-note-head-item">状态：{{dialogContent.displayStatus?'显示':'隐藏'}}</div>
          <div class="dialog-note-head-item"></div>
          <div class="dialog-note-head-item" style="width: 100%">笔记名称：{{dialogContent.title}}</div>
        </div>
        <div class="dialog-note-cont">内容：{{dialogContent.content}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogAddVisible=false">关闭</el-button>
      </div>
    </el-dialog>

    <!--查看作业-->
    <el-dialog
      :title="'作业名称：'+dialogContent.taskName"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add"
      v-if="table_tab_ind===2">
      <div class="dialog-task">
        <div class="dialog-task-head">
          <div class="dialog-task-head-item">手机号：{{dialogContent.phone}}</div>
          <div class="dialog-task-head-item">姓名：{{dialogContent.name}}</div>
          <div class="dialog-task-head-item">所属课程：{{dialogContent.course}}</div>
          <div class="dialog-task-head-item">正确率：{{dialogContent.rightPercent}}%</div>
        </div>
        <div class="dialog-bd">
          <template v-if="singleElection.length">
            <div class="dialog-cap">【单选题】</div>
            <div class="dialog-group" v-for="(item, index) in singleElection" :key="index">
              <div class="dialog-title"><span class="dialog-title-sel">【{{item.studentAnswer}}】</span>{{index+1}}：{{item.content}}</div>
              <div class="dialog-ans">
                <div class="dialog-ans-item" :class="{on: optItem.check}" v-for="(optItem, optIndex) in item.options" :key="optIndex"><i>{{optItem.dName}}</i>{{optItem.label}}</div>
              </div>
            </div>
          </template>
          <template v-if="multiSelection.length">
            <div class="dialog-cap">【多选题】</div>
            <div class="dialog-group" v-for="(item, index) in multiSelection" :key="index">
              <div class="dialog-title"><span class="dialog-title-sel">【{{item.studentAnswer}}】</span>{{index+1}}：{{item.content}}</div>
              <div class="dialog-ans">
                <div class="dialog-ans-item" :class="{on: optItem.check}" v-for="(optItem, optIndex) in item.options" :key="optIndex"><i>{{optItem.dName}}</i>{{optItem.label}}</div>
              </div>
            </div>
          </template>
          <template v-if="judge.length">
            <div class="dialog-cap">【判断题】</div>
            <div class="dialog-group" v-for="(item, index) in judge" :key="index">
              <div class="dialog-title"><span class="dialog-title-sel">【{{item.studentAnswer}}】</span>{{index+1}}：{{item.content}}</div>
              <div class="dialog-ans">
                <div class="dialog-ans-item" :class="{on: optItem.check}" v-for="(optItem, optIndex) in item.options" :key="optIndex"><i></i>{{optItem.label}}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogAddVisible=false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: true,
      tableForm: {
        courseId: ""
      },
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
      dialogAddVisible: false,
      dialogContent: {},
      singleElection: [],
      multiSelection: [],
      judge: [],
      //表格table--start
      table_tab_ind: 0,
      //表格table--end
      courseList: [],
      sign: {}
    };
  },
  components: {},
  mounted() {
    this.sign = this.$route.params;
    this.get_ajax();
    this.get_list();
  },
  methods: {
    get_list() {
      this.$api.studentManagement.studentManagement_course_list().then(res => {
        this.courseList = res.data;
      });
    },
    //获取数据
    get_ajax() {
      let url = "";

      switch (this.table_tab_ind) {
        case 0:
          url = "studentManagement_get_assessment";
          break;
        case 1:
          url = "studentManagement_get_note";
          break;
        case 2:
          url = "studentManagement_get_task";
          break;
      }
      this.tableLoading = true;
      this.$api.studentManagement[url]({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        id: this.sign.id,
        ...this.tableForm
      }).then(res => {
        this.tableData = res.data.pageList;
        this.total = res.data.total;
        this.tableLoading = false;
      });
    },
    ready_ajax() {
      this.pageNum = 1;
      this.get_ajax();
    },
    taskLook(row) {
      this.$api.studentManagement
        .studentManagement_get_detail({
          id: row.id
        })
        .then(res => {
          let singleElection = []; // 单选
          let multiSelection = []; // 多选
          let judge = []; // 判断

          //整理作业数据
          let optLabel = ["A", "B", "C", "D", "E", "F", "G"];
          res.data.exercises.map(item => {
            let options = [];

            if (item.type === 1) {
              //判断
              if (item.answer === "RIGHT") {
                options.push({
                  label: "正确",
                  check: true
                });
                options.push({
                  label: "错误",
                  check: false
                });
              }
              if (item.answer === "WRONG") {
                options.push({
                  label: "正确",
                  check: false
                });
                options.push({
                  label: "错误",
                  check: true
                });
              }
              judge.push({
                studentAnswer: item.studentAnswer === "RIGHT" ? "正确" : "错误",
                content: item.content,
                options
              });
            } else {
              //单选，多选
              optLabel.map((labelItem, labelIndex) => {
                let dName = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let optionItem = item["option" + labelItem];
                if (optionItem) {
                  options.push({
                    label: optionItem,
                    check: item.answer.indexOf(labelItem) > -1 ? true : false,
                    dName: dName[labelIndex]
                  });
                }
              });
              if (item.type === 2) {
                //单选
                singleElection.push({
                  studentAnswer: item.studentAnswer,
                  content: item.content,
                  options
                });
              }
              if (item.type === 3) {
                //多选
                multiSelection.push({
                  studentAnswer: item.studentAnswer,
                  content: item.content,
                  options
                });
              }
            }
          });
          console.log(singleElection, multiSelection, judge);
          this.singleElection = singleElection;
          this.multiSelection = multiSelection;
          this.judge = judge;
          this.dialogContent = res.data;
          this.dialogAddVisible = true;
        });
    },
    //搜索选择框
    searchChange() {
      this.ready_ajax();
    },
    //切换表格tab
    change_table_tab(e) {
      this.table_tab_ind = parseInt(e.target.dataset.ind);
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
    //分页end
    lookNote(row) {
      this.$api.studentManagement
        .studentManagement_get_noteInfo({
          id: row.id
        })
        .then(res => {
          this.dialogContent = res.data;
          this.dialogAddVisible = true;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.dialog-note {
  font-size: 16px;
  line-height: 1.4;
}
.dialog-note-head,
.dialog-task-head {
  display: flex;
  flex-wrap: wrap;
}
.dialog-task-head-item,
.dialog-note-head-item {
  width: 33.33%;
  padding-bottom: 15px;
  line-height: 1.4;
}
.dialog-note-cont {
  font-size: 16px;
  line-height: 1.6;
  margin-top: 10px;
}
.dialog-group {
  padding-left: 10px;
  font-size: 16px;
  padding-bottom: 15px;
}
.dialog-task-head {
  padding-bottom: 10px;
}
.dialog-cap {
  padding: 10px 0;
  font-size: 18px;
  font-weight: bold;
}
.dialog-title {
  line-height: 1.4;
}
.dialog-title-sel {
  color: #5e4faa;
}
.dialog-ans {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.dialog-ans-item {
  width: 50%;
  box-sizing: border-box;
  position: relative;
  padding: 5px 0;
  padding-left: 30px;
  padding-right: 5px;
  & > i {
    content: "";
    position: absolute;
    left: 0;
    top: 4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }
  &.on {
    & > i {
      background: url("../../assets/img/ico_11.png") no-repeat left center;
      border-color: #fff;
      color: #fff;
    }
  }
}
</style>
