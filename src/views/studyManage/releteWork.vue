<template>
    <div class="g-module">
        <!--筛选-->
        <div class="kf-screen">
            <div class="kf-screen-head kf-relete-topHead">
                <div class="kf-screen-head-cap">设置</div>
                <div>
                    习题总数 {{Number($route.params.judgementCount)+Number($route.params.singleCount)+Number($route.params.multiCount)}}
                </div>
                <div>
                    判断 {{$route.params.judgementCount}}
                </div>
                <div>
                    单选 {{$route.params.singleCount}}
                </div>
                <div>
                    多选 {{$route.params.multiCount}}
                </div>
            </div>
            <el-form ref="screenForm"  class="kf-form">

                <!--搜索-->
                <div class="kf-row releteRow">
                    <el-form-item label="习题数量" class="kf-form-item form-sel mr30">
                        <el-input v-model="allCount" :disabled="Boolean(exerciseCount)"></el-input>
                        <!--||!canSel-->
                    </el-form-item>
                    <el-checkbox v-model="judgeSel" class="mr10" :disabled="Boolean(exerciseCount)">判断</el-checkbox>
                    <el-form-item  class="kf-form-item form-sel mr30">
                        <el-input v-model.number="judgeCount" :disabled="Boolean(exerciseCount)"></el-input>
                    </el-form-item>
                    <el-checkbox v-model="singleSel"  class="mr10" :disabled="Boolean(exerciseCount)">单选</el-checkbox>
                    <el-form-item  class="kf-form-item form-sel mr30">
                        <el-input v-model.number="singleCount" :disabled="Boolean(exerciseCount)"></el-input>
                    </el-form-item>
                    <el-checkbox v-model="multiSel"  class="mr10" :disabled="Boolean(exerciseCount)">多选</el-checkbox>
                    <el-form-item  class="kf-form-item form-sel mr30">
                        <el-input v-model.number="multiCount" :disabled="Boolean(exerciseCount)"></el-input>
                    </el-form-item>


                </div>
            </el-form>
        </div>
        <div class="kf-bd">
   
            <!--表格导航-->
            <div class="kf-table-nave relete-table-head" style="justify-content:space-between">
                <div style="display: flex">
                    <div class="kf-btn">列表</div>
                    <el-button class="relete-table-leftBtn" v-if="!exerciseCount&&extra.indexOf('生成随机习题')" @click="listRandom">随机抽提</el-button>
                    <el-button class="relete-table-leftBtn" v-if="!exerciseCount&&extra.indexOf('手动选题')" @click="showHandSel">手动选题</el-button>
                </div>
                <!--&&canSel-->
                <el-button  v-if="!exerciseCount&&extra.indexOf('生成试卷')" @click="generatePaper">生成试卷</el-button>
            </div>
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
                        width="50"
                >
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="题型" :formatter="formats">
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="题目" width="1000" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200" v-if="!exerciseCount&&canSel">
                    <!--&&canSel-->
                    <template slot-scope="scope">
                        <el-button class="kf-table-scopeBtn" type="text" size="small" @click="dels(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页pageNum-->
            <!--<el-pagination-->
                    <!--@size-change="handleSizeChange"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="pageNum"-->
                    <!--:page-size="pageSize"-->
                    <!--:page-sizes="[10, 20, 30, 40]"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="total"-->
                    <!--class="kf-pagination">-->
            <!--</el-pagination>-->
            <!--分页end-->
        </div>

        <!--弹窗-->
        <el-dialog
           title="选择习题"
           :visible.sync="dialogVisible"
           width="760px"
           center
           :append-to-body="true"
           class="kf-dialog-add">
            <el-table
                    :data="tableData2"
                    border
                    style="width: 100%" v-loading="loading2">
                <el-table-column type="index" :index="(index) => (pageNum2 - 1) * pageSize2 + index + 1" label="序号"
                                 width="50">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="题型" :formatter="formats"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="题目" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button class="kf-table-scopeBtn" type="text" size="small" @click="selAction(scope.row)" v-show="!scope.row.isSel">选择</el-button>
                        <el-button class="kf-table-scopeBtn" type="text" size="small" @click="delAction(scope.row)"  v-show="scope.row.isSel">取消</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页pageNum-->
            <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="pageNum2"
                    :page-size="pageSize2"
                    :page-sizes="[5, 10, 15, 20]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total2"
                    class="kf-pagination">
            </el-pagination>
            <!--分页end-->
           <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="savePaper">保 存</el-button>
           </div>
         </el-dialog>


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
      siteList: [],
      stationList: [],
      courseList: [],
      siteId: "",
      stationId: "",
      courseId: "",
      account: "",
      loading: false,
      judgeSel: false,
      singleSel: false,
      multiSel: false,
      judgeCount: 0,
      singleCount: 0,
      multiCount: 0,
      dialogVisible: false,
      pageSize2: 5,
      pageNum2: 1,
      total2: 0,
      tableData2: [],
      isSelList: [],
      extra: [],
      // exerciseCount: 0,
      canSel: true,
      loading2: false
    };
  },
  components: {},
  mixins: [studyMixin],
  created() {
    // this.exerciseCount = Number(this.$route.params.exerciseCount);
    // this.judgeCount = this.$route.params.judgementCount;
    // this.singleCount = this.$route.params.singleCount;
    // this.multiCount = this.$route.params.multiCount;
  },
  mounted() {
    let { taskId } = this.$route.params;
    this.getDataList();
    if (this.exerciseCount) {
      this.judgeSel = true;
      this.singleSel = true;
      this.multiSel = true;
    }
  },
  computed: {
    allCount: function() {
      let count = 0;
      if (this.judgeSel) {
        count += this.judgeCount;
      }
      if (this.singleSel) {
        count += this.singleCount;
      }
      if (this.multiSel) {
        count += this.multiCount;
      }
      return count;
    },
    exerciseCount: function() {
      return Number(this.$route.params.exerciseCount);
    },
    taskId: function() {
      return Number(this.$route.params.taskId);
    }
  },
  methods: {
  	showHandSel(){
  		this.getAllExercises();
  		this.dialogVisible=true;
  	},
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.getAllExercises();
    },
    handleCurrentChange2(val) {
      this.pageNum2 = val;
      console.log(this.isSelList);
      this.getAllExercises();
    },
    getAllExercises() {
      this.loading2 = true;
      this.$api.studyManage
        .getCourseAllExercises({
          pageNum: this.pageNum2,
          pageSize: this.pageSize2,
          courseId: this.$route.params.courseId
        })
        .then(res => {
          this.loading2 = false;
          this.tableData2 = res.data.pageList;
          this.total2 = res.data.total;
          this.tableData2.map(item => {
            item.isSel = false;
          });
          for (let i of this.tableData2) {
            for (let j of this.isSelList) {
              if (i.id == j.id) {
                i.isSel = true;
              }
            }
          }
        });
    },
    getSiteList() {
      this.$api.studyManage.getRecordSites().then(res => {
        this.siteList = res.data;
      });
    },
    getStationList() {
      this.$api.studyManage
        .getRecordStations({
          siteId: this.siteId
        })
        .then(res => {
          this.stationList = res.data;
        });
    },
    getDataList() {
      this.loading = true;
      this.$api.studyManage
        .getWorkExercises({
          taskId: this.taskId
        })
        .then(res => {
          this.loading = false;
          if (res.data.exercises.length) {
            this.canSel = false;
            this.tableData = res.data.exercises;
            this.judgeCount = res.data.judgmentCount;
            this.singleCount = res.data.singleCount;
            this.multiCount = res.data.multipleCount;
          }
          // this.total = res.data.total;
        });
    },
    listRandom() {
      if (!this.allCount)
        return this.$message({
          type: "warning",
          message: "请先选择题目"
        });
      this.loading = true;
      this.$api.studyManage
        .listRandom({
          courseId: this.$route.params.courseId,
          judgmentCount: this.judgeCount,
          singleCount: this.singleCount,
          multipleCount: this.multiCount
        })
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
        })
        .catch(err => {
          this.$message.error(err.msg);
          this.loading = false;
        });
    },
    formats(row, col) {
      switch (row.type) {
        case 1:
          return "判断";
        case 2:
          return "单选";
        case 3:
          return "多选";
      }
    },
    generatePaper() {
      if (!this.tableData.length)
        return this.$message({
          type: "warning",
          message: "请先进行抽题！"
        });
      let filArr = [];
      this.tableData.map(item => {
        filArr.push(item.id);
      });
      console.log(filArr);
      this.$api.studyManage
        .generatePaper({
          taskId: this.$route.params.taskId,
          exerciseIds: filArr.join(",")
        })
        .then(() => {
          this.selectChange(true);
          this.$message.success("试卷生成成功");
          this.$router.go(-1);
        });
    },
    selAction(item) {
      this.$set(item, "isSel", true);
      this.isSelList.push(item);
    },
    delAction(row) {
      for (let i of this.isSelList) {
        if (i.id == row.id) {
          // this.$nextTick(() => {
          //   row.isSel = false;
          this.$set(row, "isSel", false);
          this.isSelList.splice(this.isSelList.indexOf(row), 1);
          // });
        }
      }
    },
    savePaper() {
      if (!this.isSelList.length)
        return this.$message({
          type: "warning",
          message: "请先选择题目"
        });
      let filArr = [];
      this.isSelList.map(item => {
        filArr.push(item.id);
      });
      console.log(filArr);
      this.$api.studyManage
        .generatePaper({
          taskId: this.$route.params.taskId,
          exerciseIds: filArr.join(",")
        })
        .then(() => {
          this.$message.success("试卷生成成功");
          this.dialogVisible = false;
          this.$router.go(-1);
        });
    },
    dels(row) {
      for (let i of this.tableData)
        if (i.id == row.id) {
          this.tableData.splice(this.tableData.indexOf(row), 1);
        }
    }
  }
};
</script>
<style lang="less">
.releteRow {
  line-height: 40px;
  .el-input {
    width: 100px;
  }
}
.relete-table-head {
  .el-button {
    height: 30px;
    padding: 0;
    margin-top: -6px;
    width: auto;
    color: white;
    padding: 5px 10px;
    background: #5e4faa;
  }
  .relete-table-leftBtn {
    margin-left: 40px;
  }
  .el-button:hover {
    opacity: 0.9;
  }
}
.kf-relete-topHead {
  display: flex;
  justify-content: flex-start;
  div {
    color: #333333;
    font-size: 16px;
  }
  div:not(:first-child) {
    margin-left: 40px;
  }
}
</style>
