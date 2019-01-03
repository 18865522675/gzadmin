<template>
  <div class="g-module">
    <div class="kf-bd">
      <!--表格导航-->
      <div class="learn-cap">时间设置</div>
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" :inline="true" class="learn-form">
        <div class="learn-head-time">
          <el-form-item prop="year">
            <el-date-picker
              v-model="form.year"
              type="year"
              placeholder="选择年"
              value-format="yyyy"
              @change="get_ajax">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="learn-group">
          <div class="learn-label">1：申请测评：</div>
          <div class="learn-item inline">
            <div class="learn-item-box">
              <div class="learn-item-label">上半年</div>
              <el-form-item label="开始截止日期" prop="firstHalfApplyTime">
                <el-date-picker
                  :disabled="operates.indexOf('编辑')===-1||editType===0"
                  v-model="form.firstHalfApplyTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="learn-item-box">
              <div class="learn-item-label">下半年</div>
              <el-form-item label="开始截止日期" prop="lastHalfApplyTime">
                <el-date-picker
                  :disabled="operates.indexOf('编辑')===-1||editType===0"
                  v-model="form.lastHalfApplyTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="learn-group">
          <div class="learn-label">2：综合测评数据统计截止时间：<a href="javascript:;" @click="assessment" v-if="operates.indexOf('开始测评')>-1">开始测评</a></div>
          <div class="learn-item inline">
            <div class="learn-item-box">
              <div class="learn-item-label">上半年</div>
              <el-form-item label="截止时间" prop="firstHalfAssessmentTime">
                <el-date-picker
                  :disabled="operates.indexOf('编辑')===-1||editType===0"
                  v-model="form.firstHalfAssessmentTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="learn-item-box">
              <div class="learn-item-label">下半年</div>
              <el-form-item label="截止时间" prop="lastHalfAssessmentTime">
                <el-date-picker
                  :disabled="operates.indexOf('编辑')===-1||editType===0"
                  v-model="form.lastHalfAssessmentTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="learn-ft">
          <div class="learn-btn" @click="onsubmit" v-if="operates.indexOf('编辑')>-1">{{editType===0?"编 辑":"保 存"}}</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editType: 0,
      form: {
        year: "", //年
        firstHalfApplyTime: [], //上半年申请时间
        lastHalfApplyTime: [], //下半年申请时间
        firstHalfAssessmentTime: "", //上半年测评时间
        lastHalfAssessmentTime: "" //下半年测评时间
      },
      rulesForm: {
        year: [{ required: true, message: "请选择年份", trigger: "change" }],
        firstHalfApplyTime: [
          {
            required: true,
            message: "请选择上半年申请时间",
            trigger: "change"
          }
        ],
        lastHalfApplyTime: [
          {
            required: true,
            message: "请选择下半年开始时间",
            trigger: "change"
          }
        ],
        firstHalfAssessmentTime: [
          { required: true, message: "请选择上半年测评时间", trigger: "change" }
        ],
        lastHalfAssessmentTime: [
          { required: true, message: "请选择下半年测评时间", trigger: "change" }
        ]
      },
      operates: []
    };
  },
  components: {},
  mounted() {
    let date = new Date();
    this.form.year = String(date.getFullYear());

    this.get_ajax();
  },
  methods: {
    get_ajax() {
      this.$api.systemManagement
        .timeSetting_get_info({ year: this.form.year })
        .then(res => {
          let firstHalfApplyTime = [];
          let lastHalfApplyTime = [];

          if (
            res.data.firstHalfApplyStartTime &&
            res.data.firstHalfApplyEndTime
          ) {
            firstHalfApplyTime = [
              this.$fun.time(res.data.firstHalfApplyStartTime),
              this.$fun.time(res.data.firstHalfApplyEndTime)
            ]; //上半年申请时间
          }

          if (
            res.data.lastHalfApplyStartTime &&
            res.data.lastHalfApplyEndTime
          ) {
            lastHalfApplyTime = [
              this.$fun.time(res.data.lastHalfApplyStartTime),
              this.$fun.time(res.data.lastHalfApplyEndTime)
            ]; //下半年申请时间
          }

          this.form = {
            year: this.form.year, //年
            firstHalfApplyTime, //上半年申请时间
            lastHalfApplyTime, //下半年申请时间
            firstHalfAssessmentTime: this.$fun.time(
              res.data.firstHalfAssessmentTime
            ), //上半年测评时间
            lastHalfAssessmentTime: this.$fun.time(
              res.data.lastHalfAssessmentTime
            ) //下半年测评时间
          };
          this.operates = res.data.operates;
        });
    },
    add_ajax() {
      this.$api.systemManagement
        .timeSetting_save({
          year: this.form.year,
          firstHalfApplyStartTime: this.form.firstHalfApplyTime[0],
          firstHalfApplyEndTime: this.form.firstHalfApplyTime[1],
          lastHalfApplyStartTime: this.form.lastHalfApplyTime[0],
          lastHalfApplyEndTime: this.form.lastHalfApplyTime[1],
          firstHalfAssessmentTime: this.form.firstHalfAssessmentTime,
          lastHalfAssessmentTime: this.form.lastHalfAssessmentTime
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          this.editType = 0;
          this.get_ajax();
        });
    },
    onsubmit() {
      if (this.editType === 0) {
        this.editType = 1;
        return;
      }
      console.log(this.form);
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.add_ajax();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    assessment() {
      this.$api.systemManagement.timeSetting_assessment().then(() => {
        this.$message({
          type: "success",
          message: "开启成功!"
        });
        this.editType = 0;
        this.get_ajax();
      });
    }
  }
};
</script>
