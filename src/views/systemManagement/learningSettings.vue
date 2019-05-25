<template>
  <div class="g-module">
    <div class="kf-bd">
      <!--表格导航-->
      <!--<div class="learn-cap">学习综合测评细则设置</div>
      <div class="learn-tit">综合测评采用100分制</div>-->

      <el-form ref="form" :rules="rulesForm" :model="form" label-width="140px" :inline="true" class="learn-form">
        <div class="learn-group">
          <div class="learn-label">1：学分设置：</div>
          <div class="learn-item">
            <el-form-item label="学生课程学分达到" prop="thesisCondition">
              <el-input v-model="form.thesisCondition" :disabled="userInfo.stationId||editType===0">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <div class="learn-msg">可开始论文</div>
          </div>
        </div>
        <div class="learn-group">
          <div class="learn-label">2：成绩设置：</div>
          <div class="learn-item">
            <el-form-item label="课程成绩满分 : " prop="courseFullGrade">
              <el-input v-model="form.courseFullGrade" :disabled="userInfo.stationId||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <div>
            	<el-form-item label="课程成绩及格分 : " prop="coursePassGrade">
              <el-input v-model="form.coursePassGrade" :disabled="userInfo.stationId||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <div class="learn-msg">注：成绩达到及格可获得课程学分</div>
            </div>
            <el-form-item label="卷面成绩占比 : " prop="examPer">
              <el-input v-model="form.examPer" :disabled="userInfo.stationId||editType===0">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <div>
            	<el-form-item label="平时成绩占比 : " prop="normalPer">
              <el-input v-model="form.normalPer" :disabled="userInfo.stationId||editType===0">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <div>
            	  <span style="color:#606266">补考成绩计算是否算平时成绩</span>
            	  <el-radio v-model="form.reExamPer" :label="1" style="margin-left:20px">开启</el-radio>
  							<el-radio v-model="form.reExamPer" :label="0">关闭</el-radio>
            </div>
            </div>

            
          </div>
        </div>
        <div class="learn-group" style="margin-top: 60px;">
          <div class="learn-label">3：平时成绩占比详情：<el-radio v-model="form.normalGradeDetailValid" :label="1" style="margin-left:20px">开启</el-radio>
  							<el-radio v-model="form.normalGradeDetailValid" :label="0">关闭</el-radio></div>
          <div class="learn-item">
            <el-form-item label="课件点播占比: " prop="wareValidPer">
              <el-input v-model="form.wareValidPer" :disabled="userInfo.stationId||editType===0">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="作业成绩占比: " prop="workPer">
              <el-input v-model="form.workPer" :disabled="userInfo.stationId||editType===0">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="问答占比: " prop="aqPer">
              <el-input v-model="form.aqPer" :disabled="userInfo.stationId||editType===0">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="视频满分时长: " prop="wareFullMarkTime">
              <el-input v-model="form.wareFullMarkTime" :disabled="userInfo.stationId||editType===0">
                <template slot="append">秒</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="learn-group"  style="margin-top: 60px;">
          <div class="learn-label">4：平时成绩设置： <el-radio v-model="form.normalGradeSetup" :label="1" style="margin-left:20px">开启</el-radio>
  							<el-radio v-model="form.normalGradeSetup" :label="0">关闭</el-radio></div>
          <div class="learn-item">
            <el-form-item label="课件点播：播放" prop="wareValidTime">
              <el-input v-model="form.wareValidTime" :disabled="userInfo.stationId||editType===0">
                <template slot="append">秒</template>
              </el-input>
            </el-form-item>
            <div class="learn-msg">记为有效视频；</div>
          </div>
          
          <div class="learn-item">
            <el-form-item label="作     业：达到" prop="workPassCount">
              <el-input v-model="form.workPassCount" :disabled="userInfo.stationId||editType===0">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
            <div class="learn-msg">记为满分；（提交作为即为有效作业）</div>
          </div>
          
          <div class="learn-item">
            <el-form-item label="问     答：达到" prop="aqPassCount">
              <el-input v-model="form.aqPassCount" :disabled="userInfo.stationId||editType===0">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
            <div class="learn-msg">问答项记为满分；（提问问答都记为有效个数）；</div>
          </div>
          
          
          <div class="learn-group" style="margin-top: 60px;">
          <div class="learn-label">5：论文设置</div>
          <div class="learn-item">
            <el-form-item label="学位资格: " prop="degressCondition">
              <el-input v-model="form.degressCondition" :disabled="userInfo.stationId||editType===0">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
          </div>
        </div>	
        </div>
        <div class="learn-ft">
          <div class="learn-btn" @click="onsubmit" v-if="!userInfo.stationId">{{editType===0?"编 辑":"保 存"}}</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
	import { mapState } from "vuex";
export default {
  data() {
    return {
      editType: 0,
      form: {
        reExamPer:1,
        normalGradeDetailValid:1,
        normalGradeSetup:1,
        thesisCondition:"",
        courseFullGrade:"",
        coursePassGrade:"",
        examPer:"",
        wareValidPer:"",
        workPer:"",
        normalPer:"",
        aqPer:"",
        wareValidTime:"",
        workPassCount:"",
        aqPassCount:"",
        degressCondition:""
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
        ],
        wareFullMarkTime: [
          { validator: this.$fun.form.score, required: true, trigger: "blur" }
        ]
      },
      operates: []
    };
  },
  components: {},
  computed: mapState(["userInfo"]),
  mounted() {
    this.get_ajax();
  },
  methods: {
    get_ajax() {
      this.$api.systemManagement.learningSettings_get_info().then(res => {
      	if(res.data&&Object.keys(res.data).length){
      			this.form=res.data
      	}
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
           this.add_ajax();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
