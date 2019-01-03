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
          <el-form-item label="助学机构" class="kf-form-item form-sel mr40" v-if="$store.getters.getUserInfo.type == 2">
            <el-select v-model="tableForm.stationId" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in stationList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.usualScoreStatus" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option label="通过" :value="3"/>
              <el-option label="拒绝" :value="4"/>
              <el-option label="待申请" :value="1"/>
              <el-option label="待审核" :value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item label="显示状态" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.displayStatus" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option label="显示" :value="1"/>
              <el-option label="隐藏" :value="0"/>
            </el-select>
          </el-form-item>
          <el-form-item class="kf-form-item form-search">
            <el-input placeholder="请输入手机号/姓名" v-model="tableForm.name">
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
          <div class="kf-btn">平时成绩</div>
          <template  v-if="extra.indexOf('审核')>-1">
            <div class="kf-btn kf-btn-table ml20" @click="doCheck(null, 3)">通过</div>
            <div class="kf-btn kf-btn-table ml20" @click="doCheck(null, 4)">拒绝</div>
          </template>
          <template    v-if="extra.indexOf('申请')>-1">
            <div class="kf-btn kf-btn-table ml20" @click="doApply(true)">申请</div>
          </template>
        </div>
        <div class="kf-table-nave-right">
          <!--下载模板-->
          <download url="/student/usualScore/downloadMould" v-if="extra.indexOf('下载模板')>-1"/>
          <!--导入模板-->
          <upload url="/student/usualScore/upload" class="ml20" :ok="ready_ajax" v-if="extra.indexOf('批量导入')>-1"/>
        </div>
      </div>

      <!--表格-->
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        class="kf-table"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"  :selectable="checkboxT">
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
          width="120">
        </el-table-column>
        <el-table-column
          prop="studentName"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          label="证件类型">
          <template slot-scope="scope">
            {{scope.row.idCardType===1?"身份证":scope.row.idCardType===2?"港澳通行证":"军官证"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="idCardNo"
          :show-overflow-tooltip="true"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="stationName"
          label="助学机构"
          width="100">
        </el-table-column>
        <el-table-column
          label="平时成绩"
          width="80">
          <template slot-scope="scope">
            <input type="number" v-model="scope.row.inScore" style="width: 100%;text-align: center" v-if="scope.row.inShow">
            <span v-else>{{scope.row.usualScore}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          :formatter="$fun.table.time"
          width="160">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.usualScoreStatus===3?"通过":scope.row.usualScoreStatus===4?"拒绝":scope.row.usualScoreStatus===1?"待申请":"待审核"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160">
          <template slot-scope="scope">
            <template   v-if="extra.indexOf('申请')>-1">
              <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10"  @click="doApply(false,scope.row)" :disabled="scope.row.usualScoreStatus==2||scope.row.usualScoreStatus==3">申请</el-button>
            </template>
            <tamplate   v-if="extra.indexOf('审核')>-1">
              <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="doCheck(scope.row.id, 3)" :disabled="scope.row.usualScoreStatus==3" v-if="$store.getters.getUserInfo.type==2">通过</el-button>
              <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="doCheck(scope.row.id, 4)" :disabled="scope.row.usualScoreStatus==4"  v-if="$store.getters.getUserInfo.type==2">拒绝</el-button>
            </tamplate>
            <template   v-if="extra.indexOf('编辑')>-1">
              <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="rowEdit(scope.$index, scope.row.id, 1)" v-if="!scope.row.inShow">编辑</el-button>
              <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="rowEdit(scope.$index, scope.row.id, 2)" v-else>保存</el-button>
            </template>

            <baseDelBtn delUrl="/student/usualScore/remove" :delId="scope.row.id" :delOk="ready_ajax"   v-if="extra.indexOf('删除')>-1"/>
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        courseId: "",
        stationId: "",
        usualScoreStatus: "",
        displayStatus: "",
        name: ""
      },
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
      courseList: [],
      stationList: [],
      selList: []
    };
  },
  components: {},
  mounted() {
    this.get_list();
    this.get_ajax();
  },
  watch: {
    "tableForm.name": function(n) {
      if (!n) this.get_ajax();
    }
  },
  methods: {
    get_list() {
      this.$api.studentManagement
        .ordinaryPerformance_get_listCourse()
        .then(res => {
          this.courseList = res.data;
        });
      if (this.$store.state.userInfo.type === 2) {
        this.$api.studentManagement
          .ordinaryPerformance_get_listSimpleStation({
            siteId: this.$store.state.userInfo.siteId
          })
          .then(res => {
            this.stationList = res.data;
          });
      }
    },
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.studentManagement
        .ordinaryPerformance_get_list({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.tableForm
        })
        .then(res => {
          res.data.pageList.map(item => {
            item.inShow = false;
            item.inScore = "";
          });
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
    score_update(id, sign) {
      console.log(sign);
      this.$api.studentManagement
        .ordinaryPerformance_update(id, sign)
        .then(() => {
          this.get_ajax();
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        });
    },
    searchChange() {
      this.ready_ajax();
    },
    doCheck(id, type) {
      let ids = "";

      if (id) {
        ids = id;
      } else {
        ids = this.selList.join(",");
      }
      if (ids) {
        this.$api.studentManagement
          .ordinaryPerformance_doCheck({
            ids,
            type
          })
          .then(() => {
            this.get_ajax();
            // this.$message({
            //   type: "success",
            //   message: "申请成功!"
            // });
            let mes = type == 3 ? "通过成功" : "拒绝成功";
            this.$message({
              type: "success",
              message: mes
            });
          });
      }
    },
    rowEdit(ind, id, t) {
      let rowItem = this.tableData[ind];

      if (t === 1) {
        this.tableData.map((item, index) => {
          if (index === ind) {
            item.inShow = true;
            item.inScore = "";
          } else {
            item.inShow = false;
          }
        });
      }
      if (t === 2) {
        rowItem.inShow = false;
        if (rowItem.inScore) this.score_update(id, { score: rowItem.inScore });
      }
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
    handleSelectionChange(val) {
      let selList = [];

      val.map(item => selList.push(item.id));
      this.selList = selList;
    },
    doApply(type, row) {
      if (type) {
        if (!this.selList.length) {
          return this.$message({
            type: "warning",
            message: "请选择学生"
          });
        }
        let arr = [];
        for (let i of this.selList) {
          arr.push(i);
        }
        this.$api.studentManagement
          .ordinaryPerformance_doApply({ ids: arr.join(",") })
          .then(() => {
            this.$message.success("申请成功");
            this.get_ajax();
          });
        return;
      }
      this.$api.studentManagement
        .ordinaryPerformance_doApply({ ids: row.id })
        .then(() => {
          this.$message.success("申请成功");
          this.get_ajax();
        });
    },
    checkboxT(row) {
      if (this.$store.getters.getUserInfo.type == 1) {
        return row.usualScoreStatus == 4 || row.usualScoreStatus == 1;
      }
      if (this.$store.getters.getUserInfo.type == 2) {
        return row.usualScoreStatus != 3;
      }
    }
  }
};
</script>
