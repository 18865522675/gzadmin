<template>
  <div class="g-module">
    <div class="kf-bd">
      <!--表格导航-->
      <div class="learn-cap">学习综合测评细则设置</div>
      <div class="learn-tit">综合测评采用100分制</div>

      <el-form ref="form" :rules="rulesForm" :model="form" label-width="80px" :inline="true" class="learn-form">
        <div class="learn-group">
          <div class="learn-label">1：课程学习：</div>
          <div class="learn-item">
            <el-form-item label="平时成绩" prop="usualScore">
              <el-input v-model="form.usualScore" :disabled="operates.indexOf('编辑')===-1||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <div class="learn-msg">助学机构根据学生参加课程面授，课程辅导的考勤，课程变现等情况给出成绩</div>
          </div>
          <div class="learn-item">
            <el-form-item label="学习笔记" prop="noteScore">
              <el-input v-model="form.noteScore" :disabled="operates.indexOf('编辑')===-1||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <el-form-item label="单次提交" prop="noteTimeScore">
              <el-input v-model="form.noteTimeScore" :disabled="operates.indexOf('编辑')===-1||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <div class="learn-msg">单门课程提交1次学习笔记{{form.noteTimeScore}}分（满分{{form.noteScore}}分）</div>
          </div>
        </div>
        <div class="learn-group">
          <div class="learn-label">2：网上学习：</div>
          <div class="learn-item">
            <el-form-item label="登录" prop="signScore">
              <el-input v-model="form.signScore" :disabled="operates.indexOf('编辑')===-1||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <el-form-item label="单次登录" prop="signTimeScore">
              <el-input v-model="form.signTimeScore" :disabled="operates.indexOf('编辑')===-1||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <div class="learn-msg">登录平台（点击单门课程）1次{{form.signTimeScore}}分（满分{{form.signScore}}分）</div>
          </div>
        </div>
        <div class="learn-group">
          <div class="learn-label">3：平时作业：</div>
          <div class="learn-item">
            <el-form-item label="作业成绩" prop="taskScore">
              <el-input v-model="form.taskScore" :disabled="operates.indexOf('编辑')===-1||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <el-form-item label="单次提交" prop="taskTimeScore">
              <el-input v-model="form.taskTimeScore" :disabled="operates.indexOf('编辑')===-1||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <div class="learn-msg">单门课程提交1次作业{{form.taskTimeScore}}分（满分{{form.taskScore}}分）</div>
          </div>
        </div>
        <div class="learn-group">
          <div class="learn-label">4：综合测试：</div>
          <div class="learn-item">
            <el-form-item label="测试成绩" prop="examScore">
              <el-input v-model="form.examScore" :disabled="operates.indexOf('编辑')===-1||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <div class="learn-msg">平台上完成综合测试的成绩{{form.examScore}}%</div>
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
        usualScore: "", //平时成绩
        noteScore: "", //学习笔记成绩
        noteTimeScore: "", //单次提交学习笔记成绩
        signScore: "", //登录成绩
        signTimeScore: "", //单次登录成绩
        taskScore: "", //作业成绩
        taskTimeScore: "", //单次提交作业成绩
        examScore: "" //测试成绩，百分制
      },
      rulesForm: {
        usualScore: [
          { validator: this.$fun.form.score, required: true, trigger: "blur" }
        ],
        noteScore: [
          { validator: this.$fun.form.score, required: true, trigger: "blur" }
        ],
        noteTimeScore: [
          { validator: this.$fun.form.score, required: true, trigger: "blur" }
        ],
        signScore: [
          { validator: this.$fun.form.score, required: true, trigger: "blur" }
        ],
        signTimeScore: [
          { validator: this.$fun.form.score, required: true, trigger: "blur" }
        ],
        taskScore: [
          { validator: this.$fun.form.score, required: true, trigger: "blur" }
        ],
        taskTimeScore: [
          { validator: this.$fun.form.score, required: true, trigger: "blur" }
        ],
        examScore: [
          { validator: this.$fun.form.score, required: true, trigger: "blur" }
        ]
      },
      operates: []
    };
  },
  components: {},
  mounted() {
    this.get_ajax();
  },
  methods: {
    get_ajax() {
      this.$api.systemManagement.learningSettings_get_info().then(res => {
        this.form = {
          usualScore: res.data.usualScore, //平时成绩
          noteScore: res.data.noteScore, //学习笔记成绩
          noteTimeScore: res.data.noteTimeScore, //单次提交学习笔记成绩
          signScore: res.data.signScore, //登录成绩
          signTimeScore: res.data.signTimeScore, //单次登录成绩
          taskScore: res.data.taskScore, //作业成绩
          taskTimeScore: res.data.taskTimeScore, //单次提交作业成绩
          examScore: res.data.examScore //测试成绩，百分制
        };
        this.operates = res.data.operates;
      });
    },
    add_ajax() {
      this.$api.systemManagement.learningSettings_save(this.form).then(() => {
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
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (
            parseFloat(this.form.usualScore) +
              parseFloat(this.form.noteScore) +
              parseFloat(this.form.signScore) +
              parseFloat(this.form.taskScore) +
              parseFloat(this.form.examScore) !==
            100
          ) {
            this.$message({
              type: "error",
              message: "成绩总和需要等于100分!"
            });
          } else {
            this.add_ajax();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
