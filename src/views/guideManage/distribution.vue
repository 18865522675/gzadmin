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

                    <el-form-item label="主考院校" class="kf-form-item form-sel mr60">
                        <el-select v-model="siteId" placeholder="请选择主考院校" @change="change(true)" filterable>
                            <el-option label="全部" value=""/>
                            <el-option
                                    v-for="item in siteList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="助学机构" class="kf-form-item form-sel mr60">
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

                    <el-form-item label="课程名称" class="kf-form-item form-sel mr60">
                        <el-select v-model="courseId" placeholder="请选择课程" @change="selectChange(true)" filterable>
                            <!--<el-option label="全部" value=""/>-->
                            <el-option
                                    v-for="item in courseList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="状态" class="kf-form-item form-sel mr60" v-if="type==2">
                        <el-select v-model="selectStatus" placeholder="请选择状态" @change="selectChange(true)" filterable>
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已分配" :value="1"></el-option>
                            <el-option label="待分配" :value="0"></el-option>
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
            <div class="kf-table-nave relete-table-head" style="justify-content: flex-start">
                <div class="kf-btn mr40">学生列表</div>
                <el-button @click="releteTeacher" v-if="type==2">保存</el-button>
                <el-button @click="releteTeacher" v-if="type==1">取消</el-button>
            </div>

            <!--表格-->
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    class="kf-table"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    tooltip-effect="dark"
                    ref="multipleTable"
            >
                <el-table-column
                        type="selection"
                        width="55">
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
                        prop="sex"
                        label="性别" :formatter="formats">
                </el-table-column>
                <el-table-column
                        prop="site"
                        label="主考院校">
                </el-table-column>
                <el-table-column
                        prop="station"
                        label="助学机构(单位)">
                </el-table-column>
                <el-table-column
                        prop="course"
                        label="课程">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态">
                    <template slot-scope="scope">
                        {{scope.row.teacherId?'已分配':'未分配'}}
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

    </div>
</template>

<script>
export default {
  data() {
    return {
      siteId: "",
      stationId: "",
      courseId: "",
      status: 1,
      stationList: [],
      siteList: [],
      courseList: [],
      total: 0,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      selectStatus: "",
      multipleSelection: []
    };
  },
  components: {},
  mounted() {
    this.getSiteList();
    this.getStationList();
    this.getCourseList().then(() => {
      this.getDataList();
    });
  },
  computed: {
    type: function() {
      return this.$route.params.type;
    },
    id: function() {
      return this.$route.params.id;
    }
  },
  watch: {
    account: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    getSiteList() {
      this.$api.guideManage.getReleteSites().then(res => {
        this.siteList = res.data;
      });
    },
    getStationList() {
      this.$api.guideManage
        .getReleteStations({
          siteId: this.siteId
        })
        .then(res => {
          this.stationList = res.data;
        });
    },
    getDataList() {
      this.loading = true;
      if (this.type == 2) {
        this.$api.guideManage
          .getStudentList({
            courseId: this.courseId,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            account: this.account,
            siteId: this.siteId,
            stationId: this.stationId,
            selectStatus: this.selectStatus
          })
          .then(res => {
            this.tableData = res.data.pageList;
            this.total = res.data.total;
            this.loading = false;
          });
        return;
      }
      this.$api.guideManage
        .getSeeStudentList( this.id,{
          courseId: this.courseId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          account: this.account,
          siteId: this.siteId,
          stationId: this.stationId
          // selectStatus: this.selectStatus
        })
        .then(res => {
          this.loading = false;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
        });
    },
    getCourseList() {
      return new Promise((resolve, reject) => {
        this.$api.guideManage
          .getCourseList({
            pageNum: 1,
            pageSize: 10000,
            status: 2,
            teacherId: this.id
          })
          .then(res => {
            this.courseList = res.data.pageList;
            if (this.type == 2) {
              this.courseId = this.courseList[0].id;
            }
            resolve();
          });
      });
    },
    change(type) {
      if (type) {
        this.stationList = [];
        this.getStationList();
      }
      this.selectChange(true);
    },
    selectChange(isSel) {
      if (isSel) {
        this.resetPage();
      }
      this.getDataList();
    },
    resetPage() {
      this.pageNum = 1;
      this.pageSize = 10;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.selectChange(false);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.selectChange(false);
    },
    search() {
      if (!this.account) {
        return;
      }
      this.selectChange(true);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // releteTeacher() {
    //   if (!this.multipleSelection.length)
    //     return this.$message({
    //       type: "warning",
    //       message: "请先选择学生"
    //     });
    //   let arr = [];
    //   this.multipleSelection.map(item => {
    //     arr.push(item.id);
    //   });
    //   this.$api.guideManage
    //     .releteTeacher({
    //       id: this.id,
    //       ids: arr.join(",")
    //     })
    //     .then(() => {});
    // },
    releteTeacher() {
      if (!this.multipleSelection.length)
        return this.$message({
          type: "warning",
          message: "请先选择学生"
        });
      let arr = [];
      this.multipleSelection.map(item => {
        arr.push(item.id);
      });

      if (this.type == 2) {
        this.$api.guideManage
          .releteTeacher({
            id: this.id,
            idList: arr.join(",")
          })
          .then(() => {
            this.$message.success("操作成功");
            this.selectChange(false);
          });
        return;
      }
      this.$api.guideManage
        .cancelReleteTeacher({
          idList: arr.join(",")
        })
        .then(() => {
          this.$message.success("操作成功");
          this.selectChange(false);
        });
    },
    formats(row, col) {
      if (col.property == "sex") {
        switch (row.sex) {
          case 1:
            return "男";
          case 2:
            return "女";
        }
      }
    },
    selectAble(row, index) {
      console.log(row);
    }
  }
};
</script>
<style lang="less">
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
</style>
