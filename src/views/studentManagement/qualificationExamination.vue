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
          <el-form-item label="助学机构" class="kf-form-item form-sel mr40" v-if="$store.state.userInfo.type===2">
            <el-select v-model="tableForm.stationId" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in stationList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="是否具有助学资格" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.rightStatus" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option label="是" :value="1"/>
              <el-option label="否" :value="2"/>
              <el-option label="待审核" :value="0"/>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索" class="kf-form-item form-search">
            <el-input placeholder="请输入手机号" v-model="tableForm.phone">
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
          <div class="kf-btn">审核列表</div>
        </div>
      </div>

      <!--表格-->
      <el-table
        v-loading="tableLoading"
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
          prop="phone"
          label="手机号"
          width="160">
        </el-table-column>
        <el-table-column
          label="头像"
          width="120">
          <template slot-scope="scope">
            <tableCover :url="$config.HOST_IMG+scope.row.avatar"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="nick"
          label="昵称"
          width="160">
        </el-table-column>
        <el-table-column
          prop="sexName"
          label="性别"
          width="80">
        </el-table-column>
        <el-table-column
          prop="idCardTypeName"
          label="证件类型"
          width="200">
        </el-table-column>
        <el-table-column
          prop="idCardNo"
          label="证件号码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="stationName"
          label="助学中心">
        </el-table-column>
        <el-table-column
          prop="applyTime"
          :formatter="$fun.table.time"
          label="申请时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="rightStatusName"
          label="是否具有助学资格">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="adopt(scope.row, 1)" v-if="extra.indexOf('通过')>-1&&scope.row.rightStatus!==1">通过</el-button>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="adopt(scope.row, 2)" v-if="extra.indexOf('通过')>-1&&scope.row.rightStatus!==2">拒绝</el-button>
            <baseDelBtn delUrl="student/studyRight/remove" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
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

    <!--弹窗-->
    <el-dialog
      :title="dialogType===0?'通过':'拒绝'"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="80px" class="kf-form-add">
        <el-form-item label="备注">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="输入不超过255个字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        stationId: "",
        timeId: "",
        rightStatus: "",
        phone: ""
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
        remark: ""
      },
      rulesForm: {},
      timeList: [],
      stationList: [],
      row: {}
    };
  },
  components: {},
  mounted() {
    this.get_list();
    this.get_ajax();
    console.log(this.$store.state.userInfo)
  },
  methods: {
    get_list() {
      this.$api.studentManagement
        .applicationEvaluation_get_time_list()
        .then(res => {
          this.timeList = res.data;
        });
      if (this.$store.state.userInfo.type === 2) {
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
        .qualificationExamination_get_list({
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
    adopt(row, type) {
      this.row = row;
      if (type === 1) {
        this.dialogType = 0;
      } else {
        this.dialogType = 1;
      }
      this.dialogAddVisible = true;
    },
    submitForm() {
      this.$api.studentManagement
        .qualificationExamination_adopt({
          id: this.row.id,
          rightStatus: this.dialogType === 0 ? 1 : 2,
          remark: this.form.remark
        })
        .then(() => {
          this.$message({
            type: "success",
            message: this.dialogType === 0 ? "通过成功!" : "拒绝成功!"
          });
          this.get_ajax();
          this.dialogAddVisible = false;
        });
    }
  }
};
</script>
