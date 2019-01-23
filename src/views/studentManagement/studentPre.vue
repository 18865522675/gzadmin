<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem" style="flex-wrap:wrap">

              <div class="headTopItem">
                  <span class='label marL10'>报考年份</span>
                  <div class="marL10">
                      <el-select v-model="tableForm.enrollYear" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                          <el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>
                      </el-select>
                  </div>
              </div>

             <div class="headTopItem">
                 <span class='label marL10'>层次</span>
                 <div class="marL10">
                     <el-select v-model="tableForm.level" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                         <el-option label="所有" value=""/>
                         <el-option label="高起专" :value="1"></el-option>
                         <el-option label="专升本" :value="2"></el-option>
                         <el-option label="高起本" :value="3"></el-option>
                     </el-select>
                 </div>
             </div>

            <div class="headTopItem">
                <span class='label marL10'>科类</span>
                <div class="marL10">
                    <el-select v-model="tableForm.disciplineId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                        <el-option label="所有" value=""/>
                        <el-option
                                v-for="(item,index) in disciplineList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"/>
                    </el-select>
                </div>
            </div>


            <div class="headTopItem">
                <span class='label marL10' style="word-spacing:1.7em">专 业</span>
                <div class="marL10">
                    <el-select v-model="tableForm.majorId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                        <el-option label="所有" value=""/>
                        <el-option
                                v-for="(item,index) in majorList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"/>
                    </el-select>
                </div>
            </div>

            <div class="headTopItem" v-if="!userInfo.stationId">
                <span class='label marL10'>函授站</span>
                <div class="marL10">
                    <el-select v-model="tableForm.stationId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                        <el-option label="所有" value=""/>
                        <el-option
                                v-for="(item, index) in stationList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"/>
                    </el-select>
                </div>
            </div>

            <div class="headTopItem" style="width: 400px">
                <div class="flexItem" style="width:350px">
                    <span class='label marL10'>学生</span>
                    <div class="marL10">
                        <!--searchInp-->
                        <el-input v-model="tableForm.name" class='searchInp' placeholder="请输入姓名，证件号码">
                            <el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
                        </el-input>
                    </div>
                </div>
            </div>


            <div class="comTopSaveBtn comTopOrangeBtn topBtn marL10 marT20" @click='dialogAdd_show' v-if="extra.indexOf('添加')>-1">
                添加
            </div>
            <download url="student/enrolled/downloadMould" class="marL10 marT20"  v-if="extra.indexOf('下载模板')>-1" />
            <upload class="marL10 marT20" url="/student/enrolled/upload"    :ok="get_ajax"  v-if="extra.indexOf('批量导入')>-1"  ></upload>

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
		          prop="enrollYear"
		          label="报名年份">
		        </el-table-column>
		        <el-table-column
		          prop="userName"
		          label="姓名" width="150" :show-overflow-tooltip="true">
		        </el-table-column>
		         <el-table-column
		          label="证件类型" width="150" >
		          <template slot-scope="scope">
		            {{scope.row.cardType==1?'身份证':scope.row.cardType==2?'军官证/士兵证':'港澳通行证'}}
		          </template>
		        </el-table-column>
		         <el-table-column
		          prop="cardNo"
		          label="证件号码" :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="level"
		          label="层次" :formatter="forLevel">
		        </el-table-column>
		        <el-table-column
		          prop="disciplineName"
		          label="科类" :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="majorName"
		          label="专业" :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="stationName"
		          label="函授站" :show-overflow-tooltip="true" v-if="!userInfo.stationId">
		        </el-table-column>
		        <el-table-column
		          label="状态"
		          width="80" :show-overflow-tooltip="true">
		          <template slot-scope="scope">
		            {{scope.row.ableStatus?"启用":"禁用"}}
		          </template>
		        </el-table-column>
		        <el-table-column
		          fixed="right"
		          label="操作" width="350">
		          <template slot-scope="scope">
					  <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showSaveOut(scope.row.id)" v-if="extra.indexOf('添加转出')>-1">转出</el-button>
		          	<!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showSaveAppend(scope.row.id)" v-if="extra.indexOf('添加补录')>-1">补录</el-button>-->
					  <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="$router.push(`/studentManagement/studentDetailPre/${scope.row.id}/${scope.row.userName}`)"  v-if="extra.indexOf('学生详情')>-1">查看</el-button>
		            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
		            <baseDelBtn delUrl="/student/before" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
      width="660px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="学生名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入学生姓名（不超过20个字）"></el-input>
        </el-form-item>
         <el-form-item label="证件类型" prop="cardType">
          <el-select  style="width:100%" v-model="form.cardType" placeholder="请选择证件类型">
          	<el-option label="身份证" :value="1"></el-option>
          	<el-option label="军官证/士兵证" :value="2"></el-option>
          	<el-option label="港澳通行证" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="cardNo">
          <el-input v-model.trim="form.cardNo" placeholder="请输入证件号码"></el-input>
        </el-form-item>
         <el-form-item label="科类" prop="disciplineId">
          <el-select  style="width:100%" v-model="form.disciplineId" placeholder="请选择科类">
		       	<el-option v-for="(item,index) in disciplineList" :key="index"  :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="专业" prop="majorId">
          <el-select  style="width:100%" v-model="form.majorId" placeholder="请选择专业">
		       	<el-option v-for="(item,index) in majorList" :key="index"  :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="层次" prop="level">
          <el-select  style="width:100%" v-model="form.level" placeholder="请选择层次">
		       	<el-option label="高起专" :value="1"></el-option>
			    <el-option label="专升本" :value="2"></el-option>
			    <el-option label="高起本" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报考年份" prop="enrollYear">
        	<el-select v-model="form.enrollYear" class="kf-select" style="width:100%" placeholder="请选择报考年份">
                          <el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>
                      </el-select>
          <!--el-input v-model.trim="form.enrollYear" placeholder="请输入报考年份"></el-input>-->
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" placeholder="请输入备注" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>


		<el-dialog
				title="转出"
				:visible.sync="saveOutDialogVisible"
				width="660px"
				center
				:append-to-body="true"
				class="kf-dialog-add">
			<el-form ref="saveOutForm" :rules="saveOutRules" :model="saveOutForm" label-width="120px" class="kf-form-add">
				<el-form-item label="转出信息" prop="content">
					<el-input v-model.trim="saveOutForm.content" placeholder="请输入转出信息（不超过20个字）"></el-input>
				</el-form-item>
				<!--<el-form-item label="状态">-->
					<!--<el-radio-group v-model.trim="form.ableStatus">-->
						<!--<el-radio :label="1">启用</el-radio>-->
						<!--<el-radio :label="0">禁用</el-radio>-->
					<!--</el-radio-group>-->
				<!--</el-form-item>-->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sureSaveOut('saveOutForm')">保 存</el-button>
			</div>
		</el-dialog>


		<el-dialog
				title="补录"
				:visible.sync="saveAppendDialogVisible"
				width="660px"
				center

				:append-to-body="true"
				class="kf-dialog-add">
			<el-form ref="saveAppendForm" :rules="saveAppendRules" :model="saveAppendForm" label-width="120px" class="kf-form-add">
				<el-form-item label="补录信息" prop="content">
					<el-input v-model.trim="saveAppendForm.content" placeholder="请输入学生姓名（不超过20个字）"></el-input>
				</el-form-item>
				<!--<el-form-item label="状态">-->
				<!--<el-radio-group v-model.trim="form.ableStatus">-->
				<!--<el-radio :label="1">启用</el-radio>-->
				<!--<el-radio :label="0">禁用</el-radio>-->
				<!--</el-radio-group>-->
				<!--</el-form-item>-->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sureSaveAppend('saveAppendForm')">保 存</el-button>
			</div>
		</el-dialog>


  	</el-card>
  </div>
</template>

<script>
    import { mapState } from "vuex";
export default {
  data() {
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        name: "",
        stationId:"",
        majorId:"",
        level:"",
        disciplineId:"",
        enrollYear:"",
      },
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
      dialogAddVisible: false,

		// 转出visible
		saveOutDialogVisible:false,
		saveAppendDialogVisible:false,
      dialogType: 0,
      form: {
      	name:"",
      	cardType:1,
      	cardNo:"",
      	disciplineId:"",
      	majorId:"",
      	level:"",
      	enrollYear:"",
      	remark:"",
		  ableStatus:1,
      },
      rulesForm: {
        name: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "最长 20 个字符",
            trigger: "change"
          }
        ],
          cardType: [
          { required: true, message: "请选择证件类型", trigger: "blur" },
        ],
          cardNo: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
        ],
          disciplineId: [
              { required: true, message: "请选择科类", trigger: "blur" },
          ],
          level: [
              { required: true, message: "请选择层次", trigger: "blur" },
          ],
          majorId: [
              { required: true, message: "请选择专业", trigger: "blur" },
          ],
          enrollYear: [
              { required: true, message: "请选择年份", trigger: "blur" },
          ]
     },


        saveOutRules: {
            content: [
                { required: true, message: "请输入转出信息 ", trigger: "blur" },
            ],
        },

        saveAppendRules: {
            content: [
                { required: true, message: "请输入补录信息 ", trigger: "blur" },
            ],
        },
        saveOutForm:{
          content:""
		},

        saveAppendForm:{
            content:""
		},


     disciplineList:[],
     majorList:[],
     stationList:[],
     yearList:[],
		actionId:""
    };
  },
  components: {},
    computed: mapState(["userInfo"]),
  mounted() {
//	this.getKindList();
//	this.getStationList();
		console.log(new Date().getFullYear())
		let now=new Date().getFullYear()
		for(let i=now;i<now+5;i++){
			this.yearList.push(i)
		}
		this.getStudentPreSimpleDisplines();
		this.getStudentPreSimpleMajors();
		this.getStudentPreSimpleStations();
    this.get_ajax();
  },
  watch:{
  	"tableForm.name":function(n,o){
  			if(!n){
  				this.get_ajax()
  			}
  	}
  },
  methods: {
    //获取数据
      sureSaveOut(formName){
          this.$refs[formName].validate(valid => {
              if (valid) {
                	this.$api.studentManagement.studentPre_saveOut({
                        studentId:this.actionId,
						...this.saveOutForm
					}).then((res)=>{
						this.$message.success("转出成功");
						this.saveOutDialogVisible=false;
						this.ready_ajax()
					}).catch((e)=>{
                        this.$message.success("转出失败")
					})
              } else {
                  console.log("error submit!!");
                  return false;
              }
          });
	  },
      sureSaveAppend(formName){
          this.$refs[formName].validate(valid => {
              if (valid) {
                  this.$api.studentManagement.studentPre_saveAppend({
                      studentId:this.actionId,
					  ...this.saveAppendForm
                  }).then((res)=>{
                      this.$message.success("补录成功");
                      this.saveAppendDialogVisible=false;
                      this.ready_ajax()
                  }).catch((e)=>{
                      this.$message.success("失败")
				  })
              } else {
                  console.log("error submit!!");
                  return false;
              }
          });
      },
      showSaveOut(id){
		  this.actionId=id;
		  this.saveOutDialogVisible=true;
	  },
      showSaveAppend(id){
          this.actionId=id;
          this.saveAppendDialogVisible=true;
      },
   getStudentPreSimpleDisplines(){
   	this.$api.studentManagement.getStudentPreSimpleDisplines().then((res)=>{
   		this.disciplineList=res.data
   	})
   },
    getStudentPreSimpleMajors(){
   	this.$api.studentManagement.getStudentPreSimpleMajors().then((res)=>{
   		this.majorList=res.data
   	})
   },
   getStudentPreSimpleStations(){
   	this.$api.studentManagement.getStudentPreSimpleStations().then((res)=>{
   		this.stationList=res.data
   	})
   },
    get_ajax() {
      this.tableLoading = true;
      this.$api.studentManagement
        .getStudentPreList({
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
    searchChange() {
      this.ready_ajax();
    },
    //显示添加框
    dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
      this.form = {
        name:"",
      	cardType:1,
      	cardNo:"",
      	disciplineId:"",
      	majorId:"",
      	level:"",
      	enrollYear:"",
      	remark:"",
		  ableStatus:1
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //显示编辑框
    dialogEdit_show(row) {
      this.dialogType = 1;
      this.dialogAddVisible = true;
      this.form = {
//      id: row.id,
//      kindId: row.kindId, //课件名称
//      content: row.content, //课件编码
//      remark: row.remark, //备注
//      ableStatus: row.ableStatus //启用状态(1启用0禁用)
        id:row.id,
        name:row.userName,
          cardType:row.cardType,
      	cardNo:row.cardNo,
      	disciplineId:row.disciplineId,
      	majorId:row.majorId,
      	level:+row.level,
      	enrollYear:row.enrollYear,
          ableStatus:row.ableStatus,
      	remark:row.remark,
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.studentManagement
          .studentPre_add(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
        this.$api.studentManagement
          .studentPre_edit(this.form.id,this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      }
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
    //分页start
    handleSizeChange(val) {
      this.pageSize = val;
      this.get_ajax();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.get_ajax();
    },
    getKindList(){
    	this.$api.message.getNoticeKindsList().then((res)=>{
    		this.kindList=res.data.list
    	})
    },
    getStationsList(){
    	this.$api.message.getNoticeStationsList().then((res)=>{
    		this.stationList=res.data.list
    	})
    },
      forLevel(row){
          switch(row.level){
			  case "1":return "高起专";break;
              case "2":return "专升本";break;
              case "3":return "高起本";break;
			  default:return "未知"
		  }
	  }
    //分页end
  }
};
</script>
<style>
</style>
