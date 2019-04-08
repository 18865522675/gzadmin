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
			
			<div class="headTopItem">
				<span class='label'>是否回复</span>
					<div class="marL10">
					<el-select v-model="tableForm.answered" class="kf-select" placeholder="请选择是否回复" filterable  @change="searchChange">
						<el-option label="所有" value=""/>
						<el-option label="是" :value="1"/>
						<el-option label="否" :value="0"/>
					</el-select>
				</div>
			</div>
			
			<div class="headTopItem">
				<span class='label'>课程</span>
					<div class="marL10">
					<el-select v-model="tableForm.planId" class="kf-select" placeholder="请选择课程" filterable  @change="searchChange">
						<el-option label="所有" value=""/>
						<el-option
								v-for="(item, index) in courseList"
								:key="index"
								:label="item.siteCourseName"
								:value="item.planId"/>
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
		          label="学号" :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="batchName"
		          label="年级" :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="userName"
		          label="姓名" :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="cardNo"
		          label="证件号码" :show-overflow-tooltip="true">
		        </el-table-column>
		         <el-table-column
		          prop="askContent"
		          label="留言" width='200'  :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="siteCourseName"
		          label="所属课程" :show-overflow-tooltip="true">
		        </el-table-column>
		         <el-table-column
		          prop="answerStatus"
		          label="是/否回复" :show-overflow-tooltip="true">
		          <template slot-scope="scope">
		          	{{scope.row.answerStatus==1?'已回答':'未回答'}}
		          </template>
		        </el-table-column>
		         <el-table-column
		          prop="askTime"
		          label="留言时间" :show-overflow-tooltip="true" :formatter="$fun.table.time">
		        </el-table-column>
		         <el-table-column
		          prop="answerTime"
		          label="回复时间" :show-overflow-tooltip="true" :formatter="$fun.table.time">
		        </el-table-column>
		        <el-table-column
		          prop="answerContent"
		          label="回复内容" :show-overflow-tooltip="true" width="200">
		        </el-table-column>
		        <el-table-column
		          prop="remark"
		          label="备注" :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="displayStatus"
		          label="状态">
		           <template slot-scope="scope">
		          	{{scope.row.displayStatus==1?'显示':'隐藏'}}
		          </template>
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
		          label="操作" width="300">
		          <template slot-scope="scope">
		          	<!--v-if="scope.row.answerStatus!=1"-->
		          	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showDetail(scope.row,false,true)">查看</el-button>
		          	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showDetail(scope.row,false)" v-if="scope.row.answerStatus!=1">回复</el-button>
		          	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showDetail(scope.row,true)" v-if="scope.row.answerStatus==1">编辑</el-button>
		            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>-->
		            <baseDelBtn delUrl="/teaching/qa" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
      :title="isSee?'查看':isEdit?'编辑':'回复'"
      :visible.sync="dialogAddVisible"
      width="660px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="内容">
          <el-input :value="form.askContent" :disabled="!isEdit" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="回复" prop="content">
          <el-input v-model.trim="form.content"  type="textarea" :disabled="isSee"  :rows="3"  placeholder="请输入回复。。"></el-input>
        </el-form-item>
        
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark"  type="textarea" :disabled="isSee"  :rows="3"  placeholder="请输入备注。。"></el-input>
        </el-form-item>
         <!--<el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" v-if="!isSee">保 存</el-button>
      </div>
    </el-dialog>
    
    
  	</el-card>
  </div>
</template>

<script>
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
        planId:"",
//      stationId:"",
        cardNo:"",
        name:"",
        answered:""
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
        remark:"",
        content:""
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
        content: [
          { required: true, message: "请输入回复内容", trigger: "blur" },
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
        remark: [
          {
            min: 1,
            max: 255,
            message: "最长 50 个字符",
            trigger: "change"
          }
        ]
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
      actionRow:{},
     isSee:false,
     isEdit:false
    };
  },
  components: {},
  mounted() {
		
	// this.tableForm.batchId=+now;
	  this.getBatchList();
	this.get_TeachPlanDisciplineList();
	this.get_TeachPlanMajorList();
	this.studyRecordList_stations()
	this.get_TeachPlanCourseList()
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
    showDetail(row,isEdit,isSee){
    	this.dialogAddVisible=true;
    	this.isSee=isSee;
    	this.actionRow={...row}
    	this.isEdit=isEdit;
    	this.form={...row};
    	if(isSee||isEdit){
    		this.form.content=row.answerContent;
    	}
    	
    },
    getDetailTable(id){
    	this.$api.teachManage.studyRecordList_getDetailTable(id,{
    		pageNum:this.pageNum2,
    		pageSize:this.pageSize2,
    		term:this.term2
    	}).then((res)=>{
    		this.detailTable=res.data.pageList;
    		this.total2=res.data.total;
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
        .getQa_list({
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
        remark:"",
        content:""
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //显示编辑框
    dialogEdit_show(row) {
      this.dialogType = 1;
      this.dialogAddVisible = true;
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (!this.isEdit) {
        this.$api.teachManage
          .qsAnswer(this.actionRow.id,this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "回复成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
        this.$api.teachManage
          .qsEdit(this.form.id,this.form)
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
      this.get_ajax();
    },
    handleCurrentChange2(val) {
      this.pageNum2 = val;
      this.get_ajax();
    },
    get_TeachPlanDisciplineList(){
    	this.$api.teachManage.get_TeachPlanDisciplineList().then((res)=>{
    		this.disciplineList=res.data
    	})
    },
    get_TeachPlanMajorList(){
    	this.$api.teachManage.getQa_majors().then((res)=>{
    		this.majorList=res.data
    	})
    },
	  get_TeachPlanCourseList(){
          this.$api.teachManage.getQa_courses().then((res)=>{
              this.courseList=res.data
          })
	  }
    //分页end
  }
};
</script>
