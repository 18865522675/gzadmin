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
                    <el-form-item label="课程名称" class="kf-form-item form-sel mr60">
                        <el-select v-model="courseId" placeholder="请选择层次" @change="selectChange(true)" filterable>
                            <el-option label="全部" value=""/>
                            <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="主考院校" class="kf-form-item form-sel mr60" v-if="this.$store.getters.getUserInfo.type==3">
                        <el-select v-model="siteId" placeholder="请选择主考院校" @change="changes" filterable>
                            <el-option label="全部" value=""/>
                            <el-option v-for="item in siteList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="助学机构" class="kf-form-item form-sel mr60" v-if="this.$store.getters.getUserInfo.type == 3||this.$store.getters.getUserInfo.type == 2">
                        <el-select v-model="stationId" placeholder="请选择助学机构" @change="selectChange(true)">
                            <el-option label="全部" value=""/>
                            <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="是/否回复" class="kf-form-item form-sel mr60">
                        <el-select v-model="answerStatus" placeholder="请选择是否回复" @change="selectChange(true)">
                            <el-option label="全部" value=""/>
                            <el-option label="是" :value="1"/>
                            <el-option label="否" :value="0"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="日期范围" class="kf-form-item form-date-range mr40">
                        <el-date-picker
                                v-model="dateRangeValue"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期" @change="selectChange(true)">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item class="kf-form-item form-search mr40">
                        <el-input placeholder="请输入手机号" v-model="phone" style="width: 250px;">
                            <!--<el-button slot="append" class="form-search-ico" @click="search">搜索</el-button>-->
                        </el-input>
                    </el-form-item>
                    
                    <el-form-item class="kf-form-item form-search">
                        <el-input placeholder="请输入内容" v-model="content" style="width: 296px;">
                            <el-button slot="append" class="form-search-ico" @click="search">搜索</el-button>
                        </el-input>
                    </el-form-item>

                </div>
            </el-form>
        </div>
        <div class="kf-bd">

            <!--表格导航-->
            <div class="kf-table-nave">
                <div class="kf-btn">问答列表</div>
            </div>

            <!--表格-->
            <el-table v-loading="loading" :data="tableData" border class="kf-table" style="width: 100%">
                <el-table-column type="index" :index="(index) => (pageNum - 1) * pageSize + index + 1" label="序号"
                                 width="50">
                </el-table-column>
                <el-table-column prop="phone" label="手机号">
                </el-table-column>
                <el-table-column prop="nick" label="昵称">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="askContent" label="留言" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="course" label="所属课程">
                </el-table-column>
                <el-table-column prop="site" label="主考院校">
                </el-table-column>
                <el-table-column prop="station" label="助学机构">
                </el-table-column>
                <el-table-column prop="answerStatus" label="是否回复" :formatter="formats">
                </el-table-column>
                <el-table-column prop="askTime" label="留言时间" :formatter="$fun.table.time">
                </el-table-column>
                <el-table-column prop="answerTime" label="回复时间" :formatter="$fun.table.time">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="displayStatus" label="状态"  :formatter="formats">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="kf-table-scopeBtn" @click="show(scope.row,true)"  v-if="extra.indexOf('详情')>-1">查看</el-button>
                        <!--<el-button size="small" type="text" class="kf-table-scopeBtn"   @click="show(scope.row,false,true)">回复</el-button>-->
                        <el-button size="small" type="text" class="kf-table-scopeBtn"  @click="show(scope.row,false,true)"  v-if="extra.indexOf('编辑')>-1">编辑</el-button>
                        <baseDelBtn :delId="scope.row.id" delUrl="/study/studentQuiz" :delOk="selectChange"  v-if="extra.indexOf('删除')>-1"></baseDelBtn>
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
                :title="isSee?'查看':isReply?'回复':'编辑'"
                :visible.sync="dialogVisible"
                width="760px"
                center
                :append-to-body="true"
                class="kf-dialog-add" @close="close">
            <el-form ref="formData" :rules="rules" :model="formData" label-width="120px" class="kf-form-add">
                <el-form-item label="内容" prop="askContent">
                    <el-input type="textarea" v-model.trim="formData.askContent" maxlength="100"  :disabled="isSee||isEdit"   :rows="6" placeholder="输入不超过255个字"></el-input>
                </el-form-item>
                <el-form-item label="回复" prop="reply">
                    <el-input type="textarea" v-model.trim="formData.answerContent" maxlength="100"    :disabled="isSee||isEdit"  :rows="6" placeholder="输入不超过255个字"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="ableStatus">
                    <el-radio-group v-model="formData.displayStatus" :disabled="isSee">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio  :label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model.trim="formData.remark" maxlength="100"    :disabled="isSee" :rows="6" placeholder="输入不超过100个字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('formData')" v-if='!isSee'>保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import studyManage from "@/mixin/studyManage";
export default {
  data() {
    return {
      tableData: [],
      siteList: [],
      stationList: [],
      courseList: [],
      courseId: "",
      siteId: "",
      stationId: "",
      answerStatus: "",
      dateRangeValue: "",
      phone: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      formData: {
        ableStatus: 1
      },
      isEdit: false,
      // true回复 false编辑
      // actionType: true,
      // isSee: false,
      dialogVisible: false,
      isReply: false,
      isSee: false,
      content:"",
      rules: {
        askContent: [
          { required: true, message: "请输入留言内容", trigger: "blur" }
        ],
        remark: [{ message: "备注不超过100个字", max: 100, trigger: "blur" }]
      },
      extra: [],
    };
  },
  mixins: [studyManage],
  components: {},
  mounted() {
    this.getCourseList();
    if (this.$store.getters.getUserInfo.type == 3) {
      this.getSiteList();
    }
    if (
      this.$store.getters.getUserInfo.type == 3 ||
      this.$store.getters.getUserInfo.type == 2
    ) {
      this.getStationList();
    }
    this.getDataList();
  },
  watch: {
    phone: function(n) {
      if (!n) this.selectChange(true);
    },
    content:function(n){
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    changes() {
      this.stationList = [];
      this.getStationList();
      this.selectChange(true);
    },
    getSiteList() {
      this.$api.studyManage.getQuesSites().then(res => {
        this.siteList = res.data;
      });
    },
    getStationList() {
      this.$api.studyManage
        .getQuesStations({
          siteId: this.siteId
        })
        .then(res => {
          this.stationList = res.data;
        });
    },
    getDataList() {
      this.loading = true;

      let arr = [];
      if (this.dateRangeValue != null && this.dateRangeValue.length) {
        arr = this.dateRangeValue.map(item => {
          return this.$fun.table.time(null, null, item);
        });
      }
      this.$api.studyManage
        .getQuesList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          siteId: this.siteId,
          stationId: this.stationId,
          courseId: this.courseId,
          answerStatus: this.answerStatus,
          phone: this.phone,
          start: arr[0],
          end: arr[1],
          content:this.content
        })
        .then(res => {
          this.extra = res.data.extra;
          this.loading = false;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
        });
    },
    seeQuesDetail(id) {
      this.$api.studyManage.seeQuesDetail(id).then(res => {
        this.formData = Object.assign({}, res.data);
      });
    },
    getCourseList() {
      this.$api.studyManage.getQuesCourses().then(res => {
        this.courseList = res.data;
      });
    },
    show(row, isSee, isEdit) {
      // this.actionType = actionType;
      this.formData = Object.assign({}, row);
      this.formData.ableStatus = row.displayStatus;
      this.isSee = isSee;
      this.isEdit = isEdit;
      this.seeQuesDetail(row.id);
      this.dialogVisible = true;
    },
    close() {},
    formats(row, col) {
      if (col.property === "answerStatus") {
        switch (row.answerStatus) {
          case 0:
            return "未回答";
          case 1:
            return "已回答";
        }
      }

      if (col.property === "displayStatus") {
        switch (row.displayStatus) {
          case 0:
            return "禁用";
          case 1:
            return "启用";
        }
      }
    },
    search() {
      if (!this.phone&&!this.content) return;
      this.selectChange(true);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formData.ableStatus = this.formData.displayStatus;
          this.$api.studyManage
            .editQues(this.formData.id, this.formData)
            .then(() => {
              this.actionMes("编辑成功");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
</style>
