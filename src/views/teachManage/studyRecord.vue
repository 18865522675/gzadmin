<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem" style="flex-wrap: wrap">

  			<div class="headTopItem">
				<span class='label'>年级</span>
				<div class="marL10">
					<el-select v-model="tableForm.batchId" class="kf-select" placeholder="请选择年级" filterable  @change="searchChange">
						<el-option label="所有" value=""/>
						<el-option
								v-for="(item,index) in batchList"
								:key="index"
								:label="item.name"
								:value="item.id"/>
					</el-select>
				</div>
			</div>

			<div class="headTopItem">
				<span class='label'>层次</span>
				<div class="marL10">
					<el-select v-model="tableForm.level" class="kf-select" placeholder="请选择层次" filterable  @change="searchChange">
						<el-option label="所有" value=""/>
						<el-option value="1" label="高起专"></el-option>
						<el-option value="2" label="专升本"></el-option>
						<el-option value="3" label="高起本"></el-option>
					</el-select>
				</div>
			</div>

			<div class="headTopItem">
				<span class='label'>专业</span>
				<div class="marL10">
					<el-select v-model="tableForm.majorId" class="kf-select" placeholder="请选择专业" filterable  @change="searchChange">
						<el-option label="所有" value=""/>
						<el-option
								v-for="(item, index) in majorList"
								:key="index"
								:label="item.name"
								:value="item.id"/>
					</el-select>
				</div>
			</div>
			
			<div class="headTopItem"  v-if="!userInfo.stationId">
				<span class='label'>函授站</span>
					<div class="marL10">
					<el-select v-model="tableForm.stationId" class="kf-select" placeholder="请选择函授站" filterable  @change="searchChange">
						<el-option label="所有" value=""/>
						<el-option
								v-for="(item, index) in stationList"
								:key="index"
								:label="item.name"
								:value="item.id"/>
					</el-select>
				</div>
			</div>
			
			<!--<div class="headTopItem">
				<span class='label'>学期</span>
				<div class="marL10">
					<el-select v-model="tableForm.term" class="kf-select" placeholder="请选择学期" filterable  @change="searchChange">
				
						<el-option label="所有" value=""/>
						<el-option
								v-for="(item, index) in termList"
								:key="index"
								:label="item.name"
								:value="item.id"/>
					</el-select>
				</div>
			</div>-->


			<div class="headTopItem" >
                  <span class='label'>姓名</span>
                <div class="marL10">
                    <!--searchInp-->

                    <el-input v-model="tableForm.name" class='searchInp' placeholder="请输入姓名">
                    </el-input>

                </div>
            </div>
                
            <div class="headTopItem"  style="width: 360px">
                  <span class='label'>证件号</span>
                <div class="marL10">
                    <!--searchInp-->

                    <el-input v-model="tableForm.cardNo" class='searchInp' placeholder="请输入证件号">
                        <el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
                    </el-input>

                </div>
            </div>
			<!--<div class="headTopItem">
				<span class='label'>科类</span>
				<div class="marL10">
					<el-select v-model="tableForm.majorId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
						<el-option label="所有" value=""/>
						<el-option
								v-for="(item, index) in disciplineList"
								:key="index"
								:label="item.name"
								:value="item.id"/>
					</el-select>
				</div>
			</div>-->

			<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10 marT20" @click='dialogAdd_show' v-if="extra.indexOf('添加')>-1">
				添加
			</div>
			<download url="teaching/plan/downloadMould" class="marL10 marT20"  v-if="extra.indexOf('下载模板')>-1"/>
			<upload class="mr10 marT20" url="/teaching/plan/upload"  :ok="get_ajax" v-if="extra.indexOf('批量上传')>-1" ></upload>


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
		          prop="code"
		          label="学号">
		        </el-table-column>
		        <el-table-column
		          prop="batchName"
		          label="年级">
		        </el-table-column>
		        <el-table-column
		          prop="userName"
		          label="姓名">
		        </el-table-column>
		         <el-table-column
		          prop="cardType"
		          label="证件类型">
		          <template slot-scope="scope">
						{{scope.row.cardType==1?'身份证':scope.row.cardType==2?'军官证/士兵证':'港澳通行证'}}
					</template>
		        </el-table-column>
		        <el-table-column
		          prop="level"
		          label="层次">
					<template slot-scope="scope">
						{{scope.row.level==1?'高起专':scope.row.level==2?'专升本':'高起本'}}
					</template>
		        </el-table-column>
		         <el-table-column
		          prop="majorName"
		          label="专业">
		        </el-table-column>
		         <el-table-column
		          prop="stationName"
		          label="函授站"  v-if="!userInfo.stationId">
		        </el-table-column>
		         <!--<el-table-column
		          prop="term"
		          label="学期">
		          <template slot-scope="scope">
						第{{scope.row.term}}学期
					</template>
		        </el-table-column>
		         <el-table-column
		          prop="courseName"
		          label="课程">
		        </el-table-column>
		         <el-table-column
		          prop="courseClassHour"
		          label="登录次数">
		        </el-table-column>
		        <el-table-column
		          prop="courseClassHour"
		          label="问答次数">
		        </el-table-column>
		        <el-table-column
		          prop="courseClassHour"
		          label="作业提交次数">
		        </el-table-column>
		         <el-table-column
		          prop="courseClassHour"
		          label="图书进度">
		        </el-table-column>
		         <el-table-column
		          prop="courseClassHour"
		          label="课件进度">
		        </el-table-column>
		         <el-table-column
		          prop="courseClassHour"
		          label="参与讨论">
		        </el-table-column>-->

		        <el-table-column
		          fixed="right"
		          label="操作" width="200">
		          <template slot-scope="scope">
		          	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showDetail(scope.row.id)">查看</el-button>
		            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>-->
		            <baseDelBtn delUrl="/teaching/plan" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
      title="查看记录"
      :visible.sync="dialogAddVisible"
      width="800px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
     <div class="pageHead" style="padding:0;">
     	<div class="headTopItem">
				<span class='label'>学期</span>
				<div class="marL10">
					<el-select v-model="term2" class="kf-select" placeholder="请选择学期" filterable  @change="changeDetail">
				
						<el-option label="所有" value=""/>
						<el-option
								v-for="(item, index) in termList"
								:key="index"
								:label="item.name"
								:value="item.id"/>
					</el-select>
				</div>
			</div>
     </div>
	<div class="pageCon">
		
  			 <el-table
		        v-loading="tableLoading"
		        :data="detailTable"
		        border
		        @close="closeDialog"
		        class="kf-table"
		        style="width: 100%;margin-top: 20px;">
		         <el-table-column
		          prop="term"
		          label="学期">
		          <template slot-scope="scope">
						第{{scope.row.term}}学期
					</template>
		        </el-table-column>
		         <el-table-column
		          prop="siteCourseName"
		          label="课程">
		        </el-table-column>
		         <el-table-column
		          prop="openTimes"
		          label="学习次数">
		        </el-table-column>
		        <el-table-column
		          prop="qaTimes"
		          label="问答次数">
		        </el-table-column>
		        <el-table-column
		          prop="workTimes"
		          label="作业提交次数">
		        </el-table-column>
		         <el-table-column
		          prop="bookFinishedPercent"
		          label="图书进度">
		        </el-table-column>
		         <el-table-column
		          prop="wareFinishedPercent"
		          label="课件进度">
		        </el-table-column>
		         <el-table-column
		          prop="discussTimes"
		          label="参与讨论">
		        </el-table-column>
		      </el-table>
		        <el-pagination
			        @size-change="handleSizeChange2"
			        @current-change="handleCurrentChange2"
			        :current-page="pageNum2"
			        :page-size="pageSize2"
			        :page-sizes="[10, 20, 30, 40, 50, 100]"
			        layout="total, sizes, prev, pager, next, jumper"
			        :total="total2"
			        class="kf-pagination">
			      </el-pagination>
  		</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogAddVisible=false">关 闭</el-button>
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
    	term2:"",
      extra: [],
      tableLoading: true,
      tableForm: {
        batchId:"",
        level:"",
        majorId:"",
        stationId:"",
        cardNo:"",
        name:""
//      disciplineId:""
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
        batchId: "", //课件名称
        disciplineId: "", //课件编码
        level: "", //备注
        majorId: "",
        courseId: "",
        siteCourseName: "",
        courseType: "",
        courseCredit: "",
          studyYears:"",
        courseClassHour: "",
        examKind: "",
        examNature: "",
        term: "",
        remark: "",
          ableStatus:1,
      },
      termList:[{
                	name:'第一学期',
                	id:1
                },{
                	name:'第二学期',
                	id:2
                },{
                	name:'第三学期',
                	id:3
                },{
                	name:'第四学期',
                	id:4
                },{
                	name:'第五学期',
                	id:5
                },{
                	name:'第六学期',
                	id:6
                }],
      rulesForm: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "最长 20 个字符",
            trigger: "change"
          }
        ],
        batchId: [
          { required: true, message: "请选择年级", trigger: "blur" },
        ],
        disciplineId: [
          { required: true, message: "请选择科类", trigger: "blur" },
        ],
          studyYears: [
              { required: true, message: "请输入学制", trigger: "blur" },
          ],
        level: [
          { required: true, message: "请选择层次", trigger: "blur" },
        ],
        majorId: [
          { required: true, message: "请选择专业", trigger: "blur" },
        ],
        // courseId: [
        //   { required: true, message: "请选择资源课程", trigger: "blur" },
        // ],
        siteCourseName: [
          { required: true, message: "请输入课程名", trigger: "blur" },
        ],
        courseType: [
          { required: true, message: "请输入课程类别", trigger: "blur" },
        ],
         courseCredit: [
          { required: true, message: "请输入学分", trigger: "blur" },
        ],
         courseClassHour: [
          { required: true, message: "请输入课时", trigger: "blur" },
        ],
        examKind: [
          { required: true, message: "请选择考试形式", trigger: "blur" },
        ],
        examNature: [
          { required: true, message: "请选择考试性质", trigger: "blur" },
        ],
        term: [
          { required: true, message: "请输入学期数", trigger: "blur" },
        ],
//      code: [
//        { required: true, message: "请输入院校编码", trigger: "blur" },
//        {
//          min: 1,
//          max: 8,
//          message: "最长 8 个字符",
//          trigger: "change"
//        }
//      ],
//      remark: [
//        {
//          min: 1,
//          max: 255,
//          message: "最长 50 个字符",
//          trigger: "change"
//        }
//      ]
     },
     kindList:[],
     stationList:[],
     yearList:[],
     disciplineList:[],
     majorList:[],
		batchList:[],
		courseList:[],
		detailTable:[],
		
		
		pageNum2: 1,
      pageSize2: 10,
      total2: 0,
      detailId:0,
   };
  },
  components: {},
  computed: mapState(["userInfo"]),
  mounted() {
		
	// this.tableForm.batchId=+now;
	  this.getBatchList();
	this.get_TeachPlanDisciplineList();
	this.get_TeachPlanMajorList();
	this.studyRecordList_stations()
//	this.get_TeachPlanCourseList()
    // this.get_ajax();
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
    closeDialog(){
    	this.pageSize2=10;
    	this.pageNum2=1;
    },
    showDetail(id){
    	this.dialogAddVisible=true;
    	this.detailId=id;
    	this.getDetailTable(id)
    },
    getDetailTable(id){
    	this.$api.teachManage.studyRecordList_getDetailTable(id,{
    		pageNum:this.pageNum2,
    		pageSize:this.pageSize2,
    		term:this.term2
    	}).then((res)=>{
//  		if(res.data.pageList.length){
    				this.detailTable=res.data.pageList;
    				this.total2=+res.data.total;
//  		}
    	})
    },
    changeDetail(){
    	this.pageSize2=10;
    	this.pageNum2=1;
    	this.getDetailTable(this.detailId)
    },
    studyRecordList_stations(){
    	this.$api.teachManage.studyRecordList_stations().then((res)=>{
              this.stationList=res.data;

          })
    },
      getBatchList(){
          this.$api.essentialInformation.SimpleBatch_get_list().then((res)=>{
              this.batchList=res.data;
              this.tableForm.batchId=res.data[0].id;
              this.get_ajax();
          })
      },
    publish(id){
    	this.$alert('确认发布此公告？', '发布', {
          confirmButtonText: '确定',
          callback: action => {
							this.$api.message.notice_publish(id).then((res)=>{
								this.$message.success("发布成功");
								this.get_ajax()
							}).catch((e)=>{
								this.$message.error("发布失败")
							})
          }
        });
    },
    get_ajax() {
      this.tableLoading = true;
      this.$api.teachManage
        .studyRecordList({
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
         batchId: "", //课件名称
        disciplineId: "", //课件编码
        level: "", //备注
        majorId: "",
//      courseId: "",
        siteCourseName: "",
        courseType: "",
        courseCredit: "",
        courseClassHour: "",
        examKind: "",
        examNature: "",
        term: "",
        remark: "",
          ableStatus:1,
          studyYears:""
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
          id:row.id,
         batchId: row.batchId, //课件名称
        disciplineId: row.disciplineId, //课件编码
        level:  String(row.level), //备注
        majorId: row.majorId,
//      courseId: row.courseId,
        siteCourseName: row.siteCourseName,
        courseType:  row.courseType,
        courseCredit:  row.courseCredit,
        courseClassHour:  row.courseClassHour,
        examKind:  row.examKind,
        examNature:   row.examNature,
        term:   row.term,
        remark:  row.remark,
          ableStatus:row.ableStatus,
          studyYears:row.studyYears
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.teachManage
          .teachPlan_add(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
        this.$api.teachManage
          .teachPlan_edit(this.form.id,this.form)
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
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.getDetailTable(this.detailId);
    },
    handleCurrentChange2(val) {
      this.pageNum2 = val;
      this.getDetailTable(this.detailId);
    },
    get_TeachPlanDisciplineList(){
    	this.$api.teachManage.get_TeachPlanDisciplineList().then((res)=>{
    		this.disciplineList=res.data
    	})
    },
    get_TeachPlanMajorList(){
    	this.$api.teachManage.studyRecordList_majors().then((res)=>{
    		this.majorList=res.data
    	})
    },
	  get_TeachPlanCourseList(){
          this.$api.teachManage.get_TeachPlanCourses().then((res)=>{
              this.courseList=res.data
          })
	  }
    //分页end
  }
};
</script>
