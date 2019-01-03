<template>
    <div class="g-module">
        <!--筛选-->
        <div class="kf-screen">
            <div class="kf-screen-head">
                <div class="kf-screen-head-cap">筛选</div>
            </div>
            <el-form ref="screenForm" class="kf-form">

                <!--搜索-->
                <div class="kf-row">

                    <el-form-item label="主考院校" class="kf-form-item form-sel mr60">
                        <el-select v-model="siteId" placeholder="请选择主考院校" @change="change(true)" filterable>
                            <el-option label="全部" value=""/>
                            <el-option v-for="item in siteList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="助学机构" class="kf-form-item form-sel mr60">
                        <el-select v-model="stationId" placeholder="请选择助学机构" @change="selectChange(true)">
                            <el-option label="全部" value=""/>
                            <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <!--<el-form-item label="显示状态" class="kf-form-item form-sel mr60">-->
                        <!--<el-select v-model="importStatus" placeholder="请选择状态" @change="selectChange(true)" filterable>-->
                            <!--<el-option label="全部" value=""/>-->
                            <!--<el-option label="是" :value="1"/>-->
                            <!--<el-option label="0" :value="0"/>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->

                    <!--<el-form-item label="显示状态" class="kf-form-item form-sel mr60">-->
                        <!--<el-select v-model="displayStatus" placeholder="请选择状态" @change="selectChange(true)" filterable>-->
                            <!--<el-option label="全部" value=""/>-->
                            <!--<el-option label="显示" :value="1"/>-->
                            <!--<el-option label="隐藏" :value="0"/>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->


                    <el-form-item class="kf-form-item form-search">
                        <el-input placeholder="请输入准考证号/姓名/手机号" v-model="account" style="width: 296px;">
                            <el-button slot="append" class="form-search-ico" @click="select">搜索</el-button>
                        </el-input>
                    </el-form-item>

                </div>
            </el-form>
        </div>
        <div class="kf-bd">

            <!--表格导航-->
            <div class="kf-table-nave">
                <div class="kf-table-nave-left">
                    <div class="kf-btn">缴费列表</div>
                    <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="show(true)"></div>
                </div>
                <div class="kf-table-nave-right">
                    <download class="mr10" url="/order/payment/downloadMould"></download>
                    <upload class="mr10" url="/order/payment/upload" :isMultiPay="true" :ok="selectChange"></upload>
                    <download text="数据导出" url="/order/payment/export"></download>
                </div>
            </div>

            <!--表格-->
            <el-table v-loading="loading" :data="tableData" border class="kf-table" style="width: 100%">
                <el-table-column type="index" :index="(index) => (pageNum - 1) * pageSize + index + 1" label="序号"
                                 width="50">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="idCardType" label="证件类型" :formatter="formats">
                </el-table-column>
                <el-table-column prop="idCardNo" label="证件号">
                </el-table-column>
                <el-table-column prop="sexText" label="性别">
                </el-table-column>
                <el-table-column prop="levelText" label="层次">
                </el-table-column>
                <el-table-column prop="major" label="报考专业">
                </el-table-column>
                <el-table-column prop="majorCode" label="报考专业代码">
                </el-table-column>
                <el-table-column prop="course" label="课程">
                </el-table-column>
                <el-table-column prop="site" label="主考学校">
                </el-table-column>
                <el-table-column prop="station" label="助学机构(单位)">
                </el-table-column>
                <el-table-column prop="phone" label="手机号">
                </el-table-column>
                <el-table-column prop="importTime" label="缴费时间" :formatter="$fun.table.time" width="180">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="kf-table-scopeBtn" @click="show(false,scope.row)">编辑</el-button>
                        <baseDelBtn delUrl="/order/payment" :delId="scope.row.id" :delOk="selectChange"></baseDelBtn>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页start-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                           :page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                           layout="total, sizes, prev, pager, next, jumper" :total="total" class="kf-pagination">
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
                @close="closeDialog"
                class="kf-dialog-add">
            <el-form ref="formData" :rules="rules" :model="formData" label-width="120px" class="kf-form-add">
                <el-form-item label="证件类别" prop="idCardType">
                    <el-select v-model="formData.idCardType" placeholder="请选择证件类型" class="kf-form-item form-sel" :disabled="!actionType" style="width: 100%">
                        <el-option label="身份证" :value="1"></el-option>
                        <el-option label="港澳通行证" :value="2"></el-option>
                        <el-option label="军官证" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="idCardNo">
                    <el-input type="name"  v-model.trim="formData.idCardNo" placeholder="请输入证件号码"  :disabled="!actionType" style="width: 80%;float: left;"></el-input>
                    <div class="kf-multi-btn" @click="searchForm">搜索</div>
                </el-form-item>
                <div v-loading="searchLoading" v-if="Object.keys(multiForm).length">
                    <el-form-item label="姓名">
                        <el-input type="name"  v-model.trim="multiForm.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input type="name"  v-model.trim="multiForm.phone" :disabled="true"></el-input>
                    </el-form-item>
                    <label>缴费课程 | 缴费时间：</label>
                    <div>
                        <el-checkbox-group v-model="courseIds" style="width:100%" class="kf-multi-flex">
                            <div v-for="(item,index) in multiForm.courses" :key="index">
                                <el-checkbox :label="item.courseId" class="kf-multi-check">
                                    {{item.name}} | {{item.importTime?$fun.table.time(null,null,item.importTime):'未缴费'}}
                                </el-checkbox>
                            </div>
                        </el-checkbox-group>

                    </div>
                    <div slot="footer" class="dialog-footer" style="text-align: center;margin-top: 20px">
                        <el-button type="primary" @click="submitForm">保 存</el-button>
                    </div>
                </div>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
import studyManage from "@/mixin/studyManage";
import download from "@/components/download";
import upload from "@/components/upload";
import { checkTel } from "../../public/validators";
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      loading: false,
      total: 0,
      account: "",
      importStatus: "",
      formData: {
        idCardType: 1
      },
      dialogVisible: false,
      isReply: false,
      stationList: [],
      stationId: "",
      siteList: [],
      siteId: "",
      noteDetail: null,
      zLoading: false,
      extra: [],
      actionType: true,
      rules: {
        idCardNo: [{ required: true, message: "请输入身份证", trigger: "blur" }]
      },
      multiForm: {},
      courseIds: [],
      searchLoading: false
    };
  },
  components: {
    download,
    upload
  },
  mounted() {
    this.getDataList();
    this.getStationList();
    this.getSiteList();
    // this.getCourseList();
  },
  watch: {
    account: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  mixins: [studyManage],
  methods: {
    getStationList() {
      this.$api.orderPay
        .getMudtipayStations({
          siteId: this.siteId
        })
        .then(res => {
          this.stationList = res.data;
        });
    },
    getSiteList() {
      this.$api.orderPay.getMudtipaySites().then(res => {
        this.siteList = res.data;
      });
    },
    getDataList() {
      this.loading = true;
      this.$api.orderPay
        .getMultipayList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          siteId: this.siteId,
          stationId: this.stationId,
          importStatus: this.importStatus,
          // courseId: this.courseId,
          // displayStatus: this.displayStatus,
          account: this.account
        })
        .then(res => {
          this.extra = res.data.extra;
          this.loading = false;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
        });
    },
    formats(row, col) {
      if (col.property === "idCardType") {
        switch (row.idCardType) {
          case 1:
            return "身份证";
          case 2:
            return "港澳通行证";
          case 3:
            return "军官证";
        }
      }
      if (col.property === "importStatus") {
        switch (row.importStatus) {
          case 0:
            return "失败";
          case 1:
            return "成功";
        }
      }
    },
    closeDialog() {
      this.$refs.formData.resetFields();
      this.multiForm = {};
    },
    change(type) {
      if (type) {
        this.getStationList();
      }
      this.selectChange(true);
    },
    select() {
      if (!this.account) return;
      this.selectChange(true);
    },
    show(actionType, row) {
      if (actionType === null || actionType === undefined) return;
      this.actionType = actionType;
      if (!actionType) {
        this.formData = {
          idCardType: row.idCardType,
          idCardNo: row.idCardNo
        };
        console.log(this.formData);
        this.$nextTick(() => {
          this.searchForm();
        });
      }
      this.dialogVisible = true;
    },
    searchForm() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.searchLoading = true;
          this.formData.idCardType = Number(this.formData.idCardType);
          this.$api.orderPay.searchMultiInfo(this.formData).then(res => {
            this.multiForm = res.data;
            // if (!this.actionType) {
            this.courseIds = [];
            res.data.courses.map(item => {
              if (item.importTime) {
                this.courseIds.push(item.courseId);
                console.log(this.courseIds);
              }
            });
            // }
            this.searchLoading = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm() {
      let params = {
        courseIds: this.courseIds.join(","),
        studentId: this.multiForm.studentId
      };
      this.$api.orderPay.addMultipay(params).then(() => {
        let mes = this.actionType ? "新增成功" : "编辑成功";
        this.$message({
          type: "success",
          message: mes
        });
        this.dialogVisible = false;
        this.selectChange(true);
      });
    },
    download() {
      window.location.href = "../../assets/xiti.doc";
      // console.log(123456)
    }
  }
};
</script>
<style lang="less">
.noteDetail {
  line-height: 25px;
  font-size: 16px;
}
.noteDelCon {
  line-height: 20px;
  max-height: 500px;
  overflow: auto;
}
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
</style>
