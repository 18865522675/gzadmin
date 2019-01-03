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
                    <el-form-item label="课程名称" class="kf-form-item form-sel mr60">
                        <el-select v-model="courseId" placeholder="请选择层次" @change="selectChange(true)" filterable>
                            <el-option label="全部" value=""/>
                            <el-option
                                    v-for="item in courseList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="助学机构" class="kf-form-item form-sel mr60" v-if="this.$store.getters.getUserInfo.type == 3||this.$store.getters.getUserInfo.type == 2">
                        <el-select v-model="stationId" placeholder="请选择助学机构" @change="selectChange(true)">
                            <el-option label="全部" value=""/>
                            <el-option
                                    v-for="item in stationList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item  class="kf-form-item form-search">
                        <el-input placeholder="请输入手机号/姓名" v-model="account" style="width: 296px;">
                            <el-button slot="append" class="form-search-ico" @click="search">搜索</el-button>
                        </el-input>
                    </el-form-item>

                </div>
            </el-form>
        </div>
        <div class="kf-bd">

            <!--表格导航-->
            <div class="kf-table-nave">
                <div class="kf-btn">记录列表</div>
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
                        width="50"
                >
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="手机号">
                </el-table-column>
                <el-table-column
                        prop="nick"
                        label="昵称">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="station"
                        label="助学机构">
                </el-table-column>
                <el-table-column
                        prop="course"
                        label="课程">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="缴费时间" :formatter="$fun.table.time">
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="缴费金额">
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注">
                </el-table-column>
                <!--<el-table-column
                        fixed="right"
                        label="课件学习进度">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="kf-table-scopeBtn" @click="show(scope.row)" v-if="extra.indexOf('编辑')>-1" >编辑</el-button>
                    </template>
                </el-table-column>-->
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
        <el-dialog
           :title="actionType?'添加':'编辑'"
           :visible.sync="dialogVisible"
           width="760px"
           center
           :append-to-body="true"
           class="kf-dialog-add" @close="closeDialog">
           <el-form ref="formData" :rules="rules" :model="formData" label-width="120px" class="kf-form-add">
             <el-form-item label="备注" prop="remark">
               <el-input type="textarea" v-model.trim="formData.remark" maxpageSize="100" :rows="6" placeholder="输入不超过255个字"></el-input>
             </el-form-item>

           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="submitForm('formData')">保 存</el-button>
           </div>
         </el-dialog>
         <!--&ndash;&gt;-->

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
      stationList: [],
      courseList: [],
      stationId: "",
      courseId: "",
      account: "",
      loading: false,
      extra: [],
      formData: {},
      rules: {
        remark: [{ trigger: blur, max: 100, message: "备注最多为100字" }]
      }
    };
  },
  components: {},
  mixins: [studyMixin],
  mounted() {
    if (
      this.$store.getters.getUserInfo.type == 3 ||
      this.$store.getters.getUserInfo.type == 2
    ) {
      this.getStationList();
    }
    this.getCourseList();
    this.getDataList();
  },
  watch: {
    account: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    getStationList() {
      this.$api.payment.getPaymentStations().then(res => {
        this.stationList = res.data;
      });
    },
    getDataList() {
      this.loading = true;
      this.$api.payment
        .getPaymentList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          stationId: this.stationId,
          account: this.account,
          courseId: this.courseId
        })
        .then(res => {
          this.extra = res.data.extra;
          this.loading = false;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
        });
    },
    getCourseList() {
      this.$api.payment.getPaymentCourses().then(res => {
        this.courseList = res.data;
      });
    },
    show(row) {
      this.dialogVisible = true;
      this.formData = Object.assign({}, row);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.payment
            .editPayment(this.formData.id, this.formData)
            .then(() => {
              this.actionMes("编辑成功");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    search() {
      if (!this.account) return;
      this.selectChange(true);
    },
    closeDialog() {
      this.$refs.formData.resetFields();
    }
  }
};
</script>
