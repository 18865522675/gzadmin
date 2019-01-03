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
                    <el-form-item label="审核状态" class="kf-form-item form-sel mr60">
                        <el-select v-model="auditStatus" placeholder="请选择课程" @change="selectChange(true)" filterable>
                            <el-option label="全部" value=""/>
                            <el-option
                                    v-for="item in statusList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item  class="kf-form-item form-sel mr60">-->

                    <!--</el-form-item>-->

                    <el-form-item  class="kf-form-item form-search">
                        <el-input placeholder="请输入原手机号/证件号码" v-model="account" style="width: 296px;">
                            <el-button slot="append" class="form-search-ico" @click="search">搜索</el-button>
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="kf-bd">
            <!--表格导航-->
            <div class="kf-table-nave" style="justify-content: flex-start">
                <div class="kf-btn">账号申述</div>
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
                        prop="oldPhone"
                        label="原手机号">
                </el-table-column>
                <el-table-column
                        prop="newPhone"
                        label="新手机号">
                </el-table-column>
                <el-table-column
                        prop="nick"
                        label="昵称">
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
                        prop="sex"
                        label="性别" :formatter="formats">
                </el-table-column>
                <el-table-column
                        prop="applyTime"
                        label="提交时间" :formatter="$fun.table.time">
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注">
                </el-table-column>
                <el-table-column
                        prop="auditStatus"
                        label="审核状态"  :formatter="formats">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small" class="kf-table-scopeBtn"  @click="show(scope.row)">查看</el-button>
                        <el-button  type="text" size="small" class="kf-table-scopeBtn"  @click="editAction(scope.row,1)" :disabled="scope.row.auditStatus!=1">通过</el-button>
                        <el-button  type="text" size="small" class="kf-table-scopeBtn"  @click="editAction(scope.row,2)" :disabled="scope.row.auditStatus!=1">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页start-->
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
                title="查看"
                :visible.sync="dialogVisible"
                width="760px"
                center
                :append-to-body="true"
                class="kf-dialog-add" @close="close">
            <el-form label-width="98px" class="kf-form-add kf-appeal-form" v-if="Object.keys(editRow).length" v-loading="formLoading">
                <div class="kf-see-formCon flex-label">
                    <el-form-item label="姓名 :" prop="handleStatus" class="kf-seeForm-item">
                        {{editRow.name}}
                    </el-form-item>
                    <el-form-item label="性别 : " prop="remark"  class="kf-seeForm-item">
                        {{editRow.sex|filSex}}
                    </el-form-item>
                    <el-form-item label="证件类型 : " prop="remark"  class="kf-seeForm-item">
                        {{editRow.idCardType|filCard}}
                    </el-form-item>
                </div>
                <el-form-item label="证件号码 : " prop="remark"  class="kf-seeForm-item w50">
                    {{editRow.idCardNo}}
                </el-form-item>
                <div  class="kf-see-formCon flex-label">
                    <el-form-item label="主考院校 : " prop="remark"  class="kf-seeForm-itemW50">
                        {{editRow.site}}
                    </el-form-item>
                    <el-form-item label="助学中心 : " prop="remark"  class="kf-seeForm-itemW50">
                        {{editRow.station}}
                    </el-form-item>
                </div>
                <div class="kf-see-formCon flex-label">
                    <el-form-item label="原手机号 : " prop="remark"  class="kf-seeForm-itemW50">
                        {{editRow.oldPhone}}
                    </el-form-item>
                    <el-form-item label="新手机号 : " prop="remark"  class="kf-seeForm-itemW50">
                        {{editRow.newPhone}}
                    </el-form-item>
                </div>
                <label class="kf-form-label">学习的课程</label>
                <div>
                    <div  class="kf-form-learnCourses flex-label" v-if="editRow.courses.length">
                        <div v-for="(item,index) in editRow.courses" :key="index" class="kf-form-course">
                        {{item}}
                        </div>
                    </div>
                    <div class="kf-form-noTip" v-else>
                        暂无学习的课程
                    </div>
                </div>
                <label class="kf-form-label">签到头像</label>
               <div >
                   <el-carousel height="150px" type="card" v-if="editRow.avatars.length">
                       <el-carousel-item v-for="(item,index) in editRow.avatars" :key="index">
                           <div style="height: 100%" :key="index" :style="{backgroundImage: 'url(\''+$config.HOST_IMG+item+'\')'}">

                           </div>
                       </el-carousel-item>
                   </el-carousel>
                   <div  class="kf-form-noTip" v-else>
                       暂无头像
                   </div>
               </div>


            </el-form>
        </el-dialog>

    </div>
</template>

<script>
import studyMixin from "@/mixin/studyManage";
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      handleStatus: "",
      account: "",
      auditStatus: "",
      dialogVisible: false,
      statusList: [
        {
          name: "待审核",
          id: 1
        },
        {
          name: "通过",
          id: 2
        },
        {
          name: "拒绝",
          id: 3
        }
      ],
      editRow: {},
      formLoading: false
    };
  },
  mixins: [studyMixin],
  components: {},
  mounted() {
    // this.getSiteList();
    // this.getStationList();
    this.getDataList();
  },
  watch: {
    account: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    show(row) {
      // this.editRow = Object.assign({}, row);
      this.dialogVisible = true;
      this.formLoading = true;
      this.$api.accountManagement.account_appealSee(row.id).then(res => {
        this.editRow = Object.assign({}, res.data);
        console.log(this.editRow);
        this.formLoading = false;
      });
    },
    // changeSite(){
    //     this.stationList=[];
    //     this.getStationList()
    // },
    getDataList() {
      this.loading = true;
      this.$api.accountManagement
        .account_appealList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          auditStatus: this.auditStatus,
          account: this.account
        })
        .then(res => {
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
          default:
            return "未知";
        }
      }

      if (col.property === "sex") {
        switch (row.sex) {
          case 1:
            return "男";
          case 2:
            return "女";
          case 0:
            return "未知";
        }
      }

      if (col.property === "auditStatus") {
        switch (row.auditStatus) {
          case 1:
            return "待审核";
          case 2:
            return "通过";
          case 3:
            return "拒绝";
        }
      }
    },
    search() {
      if (!this.account) return;
      this.selectChange(true);
    },
    editAction(row, type = 1) {
      let ajaxName = type == 1 ? "account_appealPass" : "account_appealDeny";
      this.$api.accountManagement[ajaxName](row.id).then(res => {
        let mes = type == 1 ? "通过成功" : "拒绝成功";
        this.$message({
          type: "success",
          message: mes,
          duration: 1200
        });
        this.selectChange(false);
      });
    }
    // submitForm() {
    //   this.$refs.formData.validate(valid => {
    //     if (valid) {
    //       if (valid) {
    //         this.$api.message
    //           .editFeedBack(this.formData.id, this.formData)
    //           .then(() => {
    //             // this.actionMes("编辑成功")
    //             this.selectChange();
    //             this.dialogVisible = false;
    //           });
    //       } else {
    //         console.log("error");
    //       }
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // }
  },
  filters: {
    filSex: function(val) {
      switch (val) {
        case 1:
          return "男";
        case 2:
          return "女";
        default:
          return "未知";
      }
    },
    filCard: function(val) {
      switch (val) {
        case 1:
          return "身份证";
        case 2:
          return "港澳通行证";
        case 3:
          return "军官证";
        default:
          return "未知";
      }
    }
  }
};
</script>
<style lang="less">
.kf-appeal-form {
  .flex-label {
    flex-wrap: wrap;
    display: flex;
  }
  .kf-see-formCon {
    width: 100%;
    & > .kf-seeForm-item {
      width: 33%;
      .el-form-item__label {
        text-align: left;
      }
    }
    & > .kf-seeForm-itemW50 {
      width: 50%;
    }
  }
  .kf-form-label {
    line-height: 30px;
    font-size: 16px;
  }
  .kf-form-learnCourses {
    max-height: 120px;
    overflow: auto;
    /*height: 100px;*/
    /*background: red;*/
    & > .kf-form-course {
      text-align: center;
      width: 25%;
      line-height: 30px;
    }
  }
  .kf-form-noTip {
    line-height: 40px;
    text-indent: 1em;
  }
}
</style>
