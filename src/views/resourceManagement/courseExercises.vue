<template>
  <!--<div class="g-module">
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="课程名称" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.courseId" placeholder="请选择" filterable @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in listCourse"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">习题列表</div>
          <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="dialogAdd_show" v-if="extra.indexOf('添加')>-1"></div>
        </div>
        <div class="kf-table-nave-right">
          <download url="/xiti.doc" :localDown="true" v-if="extra.indexOf('下载模版')>-1"/>
          <upload url="resource/exercise/upload" class="ml20" :ok="ready_ajax" v-if="extra.indexOf('批量上传')>-1"/>
        </div>
      </div>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        class="kf-table"
        style="width: 100%">
        <el-table-column
          type="index"
          :index="(index) => (pageNum - 1) * pageSize + index + 1"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="content"
          label="题目">
        </el-table-column>
        <el-table-column
          prop="version"
          label="习题类型"
          width="100">
          <template slot-scope="scope">
            {{scope.row.type===1?"判断":scope.row.type===2?"单选":"多选"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="所属于课程">
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="$fun.table.time"
          label="创建时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :formatter="$fun.table.time"
          label="更新时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="备注">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.ableStatus?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <exercisesInfo :id="scope.row.id" :courseName="scope.row.courseName" :type="'resourceManagement_courseExercises'" v-if="extra.indexOf('详情')>-1"/>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="resource/exercise" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
          </template>
        </el-table-column>
      </el-table>

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


    </div>

    <el-dialog
      :title="dialogType===0?'添加':'编辑'"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="类型名称" prop="type">
          <el-select v-model.trim="form.type" placeholder="请选择" class="kf-form-item form-sel" @change="type_change" style="width: 100%">
            <el-option label="判断" :value="1"/>
            <el-option label="单选" :value="2"/>
            <el-option label="多选" :value="3"/>
          </el-select>
        </el-form-item>
        <el-form-item label="所属课程" prop="courseId">
          <el-select v-model.trim="form.courseId" placeholder="请选择" class="kf-form-item form-sel" style="width: 100%">
            <el-option
              v-for="(item, index) in listCourse"
              :key="index"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="题目名称" prop="content">
          <el-input v-model.trim="form.content" placeholder="请输入题目名称（不超过200个字）"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer" v-if="form.type>1">
          <el-input
            placeholder="请输入答案"
            v-model.trim="item.value"
            class="answerItem"
            v-for="(item, index) in form.options" :key="index"
            v-if="form.type===2&&index<4||form.type===3">
            <label slot="prepend" class="kf-checkbox">
              <input type="checkbox" name="options" v-model="item.check" @change="optionsChange(index)">
              <i></i>
              {{item.label}}.
            </label>
          </el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer" v-if="form.type===1">
          <el-radio-group v-model.trim="form.answer">
            <el-radio label="RIGHT">正确</el-radio>
            <el-radio label="WRONG">错误</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="输入不超过255个字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>

  </div>-->


  	 <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
  			<span class='label'>课程 </span>
 				<div class="marL10">
 					<!--<el-input v-model="input" class='searchInp' placeholder="请输入内容">
 					 <el-button slot="append" icon="el-icon-search"></el-button>
 					</el-input>-->
 					 <el-select v-model="tableForm.courseId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in listCourse"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
 				</div>
 				<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show'  v-if="extra.indexOf('添加')>-1">
 					添加
 				</div>
 	    	  <download url="resource/exercise/downloadMould"  v-if="extra.indexOf('下载模板')>-1"/>
          <upload url="resource/exercise/upload" class="ml20" :ok="ready_ajax" v-if="extra.indexOf('批量上传')>-1"/>
  		</div>


  		<div class="pageCon">
  			<el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        class="kf-table"
        style="width: 100%">
        <el-table-column
          type="index"
          :index="(index) => (pageNum - 1) * pageSize + index + 1"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="content" width="450"
          label="题目" :show-overflow-tooltip="true">
          <template slot-scope="scope">
             <tableCover v-if="scope.row.content.indexOf('http')==0" :url="scope.row.content"/>
             <div v-else> 
             	{{scope.row.content}}
             </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="version"
          label="习题类型"
          width="100">
          <template slot-scope="scope">
            {{scope.row.type===1?"判断":scope.row.type===2?"单选":"多选"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="所属于课程">
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="$fun.table.time"
          label="创建时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :formatter="$fun.table.time"
          label="更新时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="备注">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.ableStatus?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <exercisesInfo :id="scope.row.id" :courseName="scope.row.courseName" :type="'resourceManagement_courseExercises'" v-if="extra.indexOf('详情')>-1"/>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10 kf-orange-btn" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="resource/exercise" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
              <el-button type="text" size="small" class="kf-btn kf-btn-table small kf-orange-btn" style="margin-left: 10px;" @click="ableAction(scope.row.id,true)" v-if="scope.row.ableStatus==0">启用</el-button>
              <el-button type="text" size="small" class="kf-btn kf-btn-table small kf-orange-btn" style="margin-left: 10px;" @click="ableAction(scope.row.id,false)" v-else>禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  		</div>



    <el-dialog
      :title="dialogType===0?'添加':'编辑'"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="类型名称" prop="type">
          <el-select v-model.trim="form.type" placeholder="请选择" class="kf-form-item form-sel" @change="type_change" style="width: 100%">
            <el-option label="判断" :value="1"/>
            <el-option label="单选" :value="2"/>
            <el-option label="多选" :value="3"/>
          </el-select>
        </el-form-item>
        <el-form-item label="所属课程" prop="courseId">
          <el-select v-model.trim="form.courseId" placeholder="请选择" class="kf-form-item form-sel" style="width: 100%">
            <el-option
              v-for="(item, index) in listCourse"
              :key="index"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="题目名称" prop="content">
          <el-input v-model.trim="form.content" placeholder="请输入题目名称（不超过200个字）" style="width: 500px!important;"></el-input>
          <div style="width: 100px;float: right;">
          	<uploadImg v-model="form.content"></uploadImg>
          </div>
        </el-form-item>
        <el-form-item label="答案" prop="answer" v-if="form.type>1">
          <div  v-for="(item, index) in form.options" :key="index">
          	<el-input
	            placeholder="请输入答案"
	            v-model.trim="item.value"
	            class="answerItem"
	            style="width:500px!important;"
	            v-if="form.type===2&&index<4||form.type===3">
	            <label slot="prepend" class="kf-checkbox">
	              <input  type="checkbox" name="options" v-model="item.check" @change="optionsChange(index)">
	              <i></i>
	              {{item.label}}.
	            </label>
	          </el-input>
	          <div style="width: 100px;float: right;"  v-if="form.type===2&&index<4||form.type===3">
	          	<uploadImg v-model.trim="item.value"></uploadImg>
	          </div>
          </div>
        </el-form-item>
        <el-form-item label="答案" prop="answer" v-if="form.type===1">
          <el-radio-group v-model.trim="form.answer">
            <el-radio label="正确">正确</el-radio>
            <el-radio label="错误">错误</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="输入不超过255个字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>

  	</el-card>
  </div>


</template>

<script>
import exercisesInfo from "../../components/exercisesInfo";
import uploadImg from "../../components/uploadImg";
export default {
  data() {
    const checkAnswer = (rule, value, callback) => {
      let { type, answer, options } = this.form;
      let valT = false;
      let valInd = -1;
      let valIndT = true;

      switch (type) {
        case 1:
          if (answer) {
            callback();
          } else {
            callback(new Error("请选择答案"));
          }
          break;
        case 2:
        case 3:
          options.map(item => {
            if (item.value) valT = true;
          });
          if (valT) {
            //判断答案是否连续
            options.map((item, index) => {
              if (item.value) {
                valT = true;
                if (index - valInd !== 1) {
                  valIndT = false;
                }
                valInd = index;
              }
            });
            if (valIndT) {
              callback();
            } else {
              callback(new Error("请连续填写答案"));
            }
          } else {
            callback(new Error("请填写答案"));
          }
          break;
      }
    };
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        courseId: ""
      },
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
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
      rulesForm: {
        type: [
          { required: true, message: "请选择类型名称", trigger: "change" }
        ],
        courseId: [
          { required: true, message: "请选择所属课程", trigger: "change" }
        ],
        content: [
          { required: true, message: "请输入题目名称", trigger: "change" },
          {
            min: 1,
            max: 200,
            message: "最长 200 个字符",
            trigger: "change"
          }
        ],
        answer: [{ required: true, validator: checkAnswer, trigger: "change" }]
      },
      listCourse: [],
      hostApi:""
    };
  },
  components: { exercisesInfo,uploadImg },
  mounted() {
  	if(window.location.href.indexOf("localhost")<0){
		 if(window.location.host.indexOf('test')>-1){
		 	this.hostApi = this.$config.HOST_API;
  		}else{
  			this.hostApi="http://"+window.location.host.split(":")[0]+":81/manager-api/";	
  		}
	}else{
		 this.hostApi = this.$config.HOST_API;
	}
	
    this.get_listCourse();
    this.get_ajax();
  },
  methods: {
      ableAction(id,type){
          if(type){
              console.log(id)
              this.$api.resourceManagement.courseCourseExercise_enable({
                  exerciseId:id
              }).then((res)=>{
                  this.$message.success("启用成功");
                  this.ready_ajax()
              }).catch(()=>{
                  this.$message.error("启用失败")
              })
              return
          }

          this.$api.resourceManagement.courseCourseExercise_disable({
              exerciseId:id
          }).then((res)=>{
              this.$message.success("禁用成功");
              this.ready_ajax()
          }).catch(()=>{
              this.$message.error("禁用失败")
          })
      },
    //课程列表
    get_listCourse() {
      this.$api.resourceManagement
        .courseExercises_get_listCourse()
        .then(res => {
          this.listCourse = res.data;
        });
    },
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.resourceManagement
        .courseExercises_get_list({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.tableForm
        })
        .then(res => {
          this.extra = res.data.extra;
          this.tableData = res.data.pageList;
          this.total = +res.data.total;
          this.tableLoading = false;
        });
    },
    ready_ajax() {
      this.pageNum = 1;
      this.get_ajax();
    },
    //显示添加框
    dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
      this.form = {
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
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //显示编辑框
    dialogEdit_show(row) {
      this.$api.resourceManagement
        .courseExercises_info({
          id: row.id
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
    },
    //添加编辑数据
    add_ajax() {
      let upForm = {
        type: this.form.type,
        courseId: this.form.courseId,
        content: this.form.content,
        remark: this.form.remark,
        ableStatus: this.form.ableStatus
      };
      let checkNum = 0;
      let valueNum = 0;

      switch (this.form.type) {
        case 1:
          upForm.answer = this.form.answer;
          break;
        case 2:
        case 3:
          upForm.answer = [];
          this.form.options.map(item => {
            if (item.check) {
              checkNum++;
              upForm.answer.push(item.label);
            }
            if (item.value) {
              valueNum++;
              upForm["option" + item.label] = item.value;
            }
          });
          upForm.answer = upForm.answer.join("|");

          if (valueNum < 2) {
            this.$message({
              type: "warning",
              message: "请填写最少两个答案"
            });
            return;
          }
          if (!checkNum) {
            this.$message({
              type: "warning",
              message: "请勾选正确答案"
            });
            return;
          }
          console.log(upForm);
      }

      if (this.dialogType === 0) {
        this.$api.resourceManagement
          .courseExercises_add({
            ...upForm
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
        upForm.id = this.form.id;
        this.$api.resourceManagement
          .courseExercises_edit({
            ...upForm
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      }

      console.log(upForm, this.form);
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.add_ajax();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //搜索选择框
    searchChange() {
      this.ready_ajax();
    },
    optionsChange(ind) {
      let { options, type } = this.form;
      if (type === 2) {
        options.map((item, index) => {
          if (index === ind) {
            item.check = true;
          } else {
            item.check = false;
          }
        });
      }
    },
    //分页start
    handleSizeChange(val) {
      this.pageSize = val;
      this.get_ajax();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.get_ajax();
    },
    //分页end
    type_change() {
      switch (this.form.type) {
        case 1:
          this.form.answer = "正确";
          break;
        case 2:
          this.form.answer = "";
          this.form.options.map(item => (item.check = false));
          break;
        case 3:
          this.form.answer = "";
          this.form.options.map(item => (item.check = false));
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.answerItem {
  & + .answerItem {
    margin-top: 15px;
  }
}
</style>
