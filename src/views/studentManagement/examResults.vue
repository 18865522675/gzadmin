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
            <el-select v-model="tableForm.courseId" placeholder="请选择" filterable @change="selectChange(true)">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in courseList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="助学机构" class="kf-form-item form-sel mr40" v-if="$store.getters.getUserInfo.type == 3||$store.getters.getUserInfo.type == 2">
            <el-select v-model="tableForm.stationId" placeholder="请选择" filterable @change="selectChange(true)">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in stationList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="是否具有助学资格" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.rightStatus" placeholder="请选择" filterable @change="selectChange(true)">
              <el-option label="所有" value=""/>
              <el-option label="是" :value="1"/>
              <el-option label="否" :value="2"/>
              <el-option label="待审核" :value="0"/>
            </el-select>
          </el-form-item>
          <el-form-item label="显示状态" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.displayStatus" placeholder="请选择" filterable @change="selectChange(true)">
              <el-option label="所有" value=""/>
              <el-option label="显示" :value="1"/>
              <el-option label="隐藏" :value="0"/>
            </el-select>
          </el-form-item>
          <el-form-item class="kf-form-item form-search">
            <el-input placeholder="请输入手机号/姓名" v-model="tableForm.name">
              <el-button slot="append" class="form-search-ico" @click="search">搜索</el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">
      <!--表格导航-->
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">考试成绩</div>
          <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="show(true)" v-if="extra.indexOf('添加')>-1"></div>
        </div>
        <div class="kf-table-nave-right">
          <!--下载模板-->
          <download url="/student/examScore/downloadMould"  v-if="extra.indexOf('下载模板')>-1"/>
          <!--导入模板-->
          <upload url="/student/examScore/upload" class="ml20" :ok="selectChange"  v-if="extra.indexOf('批量导入')>-1"/>
        </div>
      </div>

      <!--表格-->
      <el-table
              v-loading="tableLoading"
              :data="tableData"
              border
              class="kf-table"
              style="width: 100%">
        <!--<el-table-column-->
                <!--type="selection"-->
                <!--width="55">-->
        <!--</el-table-column>-->
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
                prop="score"
                label="考试成绩"
                width="80">
        </el-table-column>
        <el-table-column
                prop="updateTime"
                label="更新时间"
                :formatter="$fun.table.time"
                width="160">
        </el-table-column>
        <el-table-column
                prop="rightStatus"
                label="是否具有助学资格" :formatter="formats">
          <!--<template slot-scope="scope">-->
            <!--{{scope.row.rightStatus===3?"通过":scope.row.rightStatus===4?"拒绝":scope.row.usualScoreStatus===1?"待申请":"待审核"}}-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
                prop="remark"
                :show-overflow-tooltip="true"
                label="备注">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="160"  v-if="$store.getters.getUserInfo.type==2">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="show(false,scope.row)"  v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="/student/examScore/remove" :delId="scope.row.id" :delOk="selectChange"  v-if="extra.indexOf('删除')>-1"/>
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

      <!--13456466702-->
    <!--弹窗-->
    <el-dialog
            :title="actionType?'添加':'编辑'"
            :visible.sync="dialogVisible"
            width="760px"
            center
            :append-to-body="true"
            class="kf-dialog-add" @close="closeDialog">
      <el-form ref="formData" :rules="rulesForm" v-loading="infoLoading" :model="formData" label-width="120px" class="kf-form-add">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim.number="formData.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <div v-if="Object.keys(userInfo).length">
          <el-form-item label="姓名">
            <el-input v-model.trim.number="userInfo.name" placeholder="请输入手机号" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-select v-model.trim="userInfo.idCardType" placeholder="请选择证件类型" class="kf-form-item form-sel" style="width: 100%" :disabled="true">
              <el-option
                      v-for="(item, index) in cardTypeList"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model.trim="userInfo.idCardNo" placeholder="请输入证件号码" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="课程" prop="courseId">
          <el-select v-model.trim="formData.courseId" placeholder="请选择课程" class="kf-form-item form-sel" style="width: 100%" :disabled="!actionType">
            <el-option
                    v-for="(item, index) in courseList"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成绩" prop="score">
          <el-input v-model.trim="formData.score" placeholder="请输入成绩"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="formData.remark" type="textarea" :rows="6" placeholder="输入不超过255个字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import studyManage from "@/mixin/studyManage";
export default {
  data() {
    var checkInfo = (rule, value, callback) => {
      if (!value) {
        // console.log(value)
        return callback(new Error("请填写手机号"));
      } else {
        this.getInfo()
          .then(() => {
            callback();
          })
          .catch(e => {
            return callback(new Error("学生不存在"));
          });
        return;
      }
      callback();
    };

    var checkScore = (rule, value, callback) => {
      if (!value) {
        return new callback("请填写分数");
      }
      if (isNaN(value)) {
        return new callback("分数必须为纯数字");
      }
      if (Number(value) < 0 || Number(value) > 100) {
        return new callback("分数必须大于0且小于100");
      }
      callback();
    };
    return {
      extra: [],
      tableLoading: false,
      tableForm: {
        courseId: "",
        stationId: "",
        rightStatus: "",
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
      formData: {
        idCardType: 1
      },
      dialogVisible: false,
      actionType: true,
      // checkInfo
      rulesForm: {
        phone: [{ required: true, validator: checkInfo, trigger: "blur" }],
        courseId: [{ required: true, message: "请选择课程", trigger: "blur" }],
        idCardNo: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ],
        score: [{ required: true, validator: checkScore, trigger: "blur" }],
        remark: [{ max: 255, message: "备注最多为255个字", trigger: "blur" }]
      },
      cardTypeList: [
        {
          name: "身份证",
          id: 1
        },
        {
          name: "港澳通行证",
          id: 2
        },
        {
          name: "军官证",
          id: 3
        }
      ],
      infoLoading: false,
      userInfo: {},
      extra: []
    };
  },
  mixins: [studyManage],
  components: {},
  mounted() {
    this.getCourseList();
    if (
      this.$store.getters.getUserInfo.type == 3 ||
      this.$store.getters.getUserInfo.type == 2
    ) {
      this.getStationList();
    }
    // this.getStationList();
    this.getDataList();
  },
  watch: {
    "tableForm.name": function(n) {
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    // 获取table数据
    getDataList() {
      this.$api.studentManagement
        .examResult_get_list({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.tableForm
        })
        .then(res => {
          this.tableData = res.data.pageList;
          this.total = res.data.total;
          this.extra = res.data.extra;
        });
    },
    getCourseList() {
      this.$api.studentManagement.examResult_get_listCourse().then(res => {
        // this.courseList = res.data;
        for (let i of res.data) {
          if (i.ableStatus == 1) {
            this.courseList.push(i);
          }
        }
      });
    },
    getStationList() {
      this.$api.studentManagement
        .examResult_get_listStation({
          siteId: this.$store.getters.getUserInfo.siteId
        })
        .then(res => {
          this.stationList = res.data;
        });
    },
    // actionType  true:添加   false:编辑
    show(actionType, row) {
      if (actionType === undefined || actionType === null) return;
      this.actionType = actionType;
      if (!actionType) {
        this.formData = Object.assign({}, row);
        // this.formData.courseId = Number(this.formData.courseId);
        this.getInfo().then(res => {
          this.formData.idCardType = res.idCardType;
          this.formData.idCardNo = res.idCardNo;
        });
      }
      this.dialogVisible = true;
    },
    closeDialog() {
      this.$nextTick(() => {
        this.userInfo = {};
        this.$refs.formData.resetFields();
      });
      // this.$refs.formData.resetFields();
    },
    submitForm() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          // alert('submit!');
          if (this.actionType) {
            this.$api.studentManagement
              .add_examResult(
                Object.assign({}, this.formData, {
                  idCardType: this.userInfo.idCardType,
                  idCardNo: this.userInfo.idCardNo
                })
              )
              .then(() => {
                this.actionMes("新增成功");
              });
            return;
          }
          this.$api.studentManagement
            .edit_examResult(this.formData.id, this.formData)
            .then(() => {
              this.actionMes("编辑成功");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getInfo() {
      // this.loading=true;
      return new Promise((resolve, reject) => {
        this.infoLoading = true;
        this.$api.studentManagement
          .studentManagement_get_list({
            pageNum: 1,
            pageSize: 1000,
            keyword: this.formData.phone
          })
          .then(res => {
            this.infoLoading = false;
            if (res.data.pageList.length) {
              this.userInfo = res.data.pageList[0];
              resolve(res.data.pageList[0]);
            } else {
              this.infoLoading = false;
              reject();
            }
          });
      });
    },
    search() {
      if (!this.tableForm.name) {
        retrun;
      }
      this.selectChange(true);
    },
    formats(row) {
      switch (row.rightStatus) {
        case 0:
          return "待审核";
        case 1:
          return "是";
        case 2:
          return "否";
      }
    }
  }
};
</script>
