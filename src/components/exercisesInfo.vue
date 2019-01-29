<template>
  <div class="exIn-btn">
    <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show">查看</el-button>
    <!--弹窗-->
    <el-dialog
      title="查看"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add look">
        <el-form-item label="类型名称" prop="type">
          <el-select v-model.trim="form.type" placeholder="请选择" class="kf-form-item form-sel" disabled style="width: 100%">
            <el-option label="判断" :value="1"/>
            <el-option label="单选" :value="2"/>
            <el-option label="多选" :value="3"/>
          </el-select>
        </el-form-item>
        <el-form-item label="所属课程" prop="content">
          <el-input v-model.trim="courseName" disabled></el-input>
        </el-form-item>
        <el-form-item label="题目名称" prop="content">
          <el-input v-model.trim="form.content" placeholder="请输入题目名称（不超过200个字）" disabled></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer" v-if="form.type>1">
          <el-input
            placeholder="请输入答案"
            v-model.trim="item.value"
            class="answerItem"
            v-for="(item, index) in form.options" :key="index"
            v-if="form.type===2&&index<4||form.type===3"
            disabled>
            <label slot="prepend" class="kf-checkbox">
              <input type="checkbox" name="options" v-model="item.check" @change="optionsChange(index)" disabled>
              <i></i>
              {{item.label}}.
            </label>
          </el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer" v-if="form.type===1">
          <el-radio-group v-model.trim="form.answer" disabled>
            <el-radio label="正确">正确</el-radio>
            <el-radio label="错误">错误</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus" disabled>
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="输入不超过255个字" disabled></el-input>
        </el-form-item>
      </el-form>
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button type="primary" @click="dialogAddVisible = false">关 闭</el-button>-->
      <!--</div>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogAddVisible: false,
      dialogType: 0,
      form: {
        type: "", //类型 1判断 2单选 3多选
        courseId: "", //课程id
        content: "", //题目
        options: [
          {
            label: "A",
            check: false,
            value: ""
          },
          {
            label: "B",
            check: false,
            value: ""
          },
          {
            label: "C",
            check: false,
            value: ""
          },
          {
            label: "D",
            check: false,
            value: ""
          },
          {
            label: "E",
            check: false,
            value: ""
          },
          {
            label: "F",
            check: false,
            value: ""
          },
          {
            label: "G",
            check: false,
            value: ""
          }
        ],
        answer: "", //答案，判断 RIGHT正确 WRONG错误，选择题直接ABCD
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      },
      rulesForm: {},
      listCourse: [],
      apiArr: {
        // 资源管理——课程习题
        resourceManagement_courseExercises: {
          info: {
            model: "resourceManagement",
            page: "courseExercises_info"
          }
        },
        // 资源管理——课程管理
        resourceManagement_courseManagement_look: {
          info: {
            model: "resourceManagement",
            page: "courseManagement_info"
          }
        },
        home_resourceManagement_look: {
          info: {
            model: "resourceManagement",
            page: "courseManagement_info"
          }
        },
        // 资源管理——专业管理
        resourceManagement_professionalManagement_look_list: {
          info: {
            model: "resourceManagement",
            page: "professionalManagement_info"
          }
        },
        // 基本信息——专业管理
        essentialInformation_professionalManagement_look_list: {
          info: {
            model: "essentialInformation",
            page: "essentialInformation_info"
          }
        },
        // 基本信息——课程管理
        essentialInformation_courseManagement_look: {
          info: {
            model: "essentialInformation",
            page: "essentialInformation_info"
          }
        },
        home_essentialInformation_look: {
          info: {
            model: "essentialInformation",
            page: "essentialInformation_info"
          }
        }
      },
      apiUrl: {}
    };
  },
  props: ["id", "courseName"],
  mounted() {
    let pathArr = this.$route.path.split("/");
    this.apiUrl = this.apiArr[pathArr[1] + "_" + pathArr[2]];
  },
  methods: {
    //显示编辑框
    dialogEdit_show() {
      this.$api[this.apiUrl.info.model]
        [this.apiUrl.info.page]({
          id: this.id
        })
        .then(res => {
          let {
            id,
            type,
            courseId,
            content,
            remark,
            ableStatus,
            answer
          } = res.data;
          let options = [
            {
              label: "A",
              check: false,
              value: ""
            },
            {
              label: "B",
              check: false,
              value: ""
            },
            {
              label: "C",
              check: false,
              value: ""
            },
            {
              label: "D",
              check: false,
              value: ""
            },
            {
              label: "E",
              check: false,
              value: ""
            },
            {
              label: "F",
              check: false,
              value: ""
            },
            {
              label: "G",
              check: false,
              value: ""
            }
          ];

          switch (type) {
            case 1:
              break;
            case 2:
            case 3:
              options.map(item => {
                let optLabel = "option" + item.label;
                if (res.data[optLabel]) item.value = res.data[optLabel];
                if (answer.indexOf(item.label) > -1) item.check = true;
              });
              answer = "";
              break;
          }

          this.dialogType = 1;
          this.dialogAddVisible = true;
          this.form = {
            id,
            type, //类型 1判断 2单选 3多选
            courseId, //课程id
            content, //题目
            options,
            answer, //答案，判断 RIGHT正确 WRONG错误，选择题直接ABCD
            remark, //备注
            ableStatus //启用状态(1启用0禁用)
          };
          this.$nextTick(() => {
            this.$refs["form"].clearValidate();
          });
        });
    }
  }
};
</script>
<style lang="less">
.kf-form-add {
  &.look {
    .el-input__inner {
      background-color: #fff;
      color: #606266;
    }
    .el-textarea__inner {
      background-color: #fff;
      color: #606266;
      border-color: #e4e7ed;
    }
  }
}
</style>
<style lang="less" scoped>
.answerItem {
  & + .answerItem {
    margin-top: 15px;
  }
}
.exIn-btn {
  display: inline-block;
}
</style>
