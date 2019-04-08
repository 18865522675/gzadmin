<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem" style="flex-wrap: wrap;">
			 
			 
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
								v-for="(item,index) in majorList"
								:key="index"
								:label="item.name"
								:value="item.id"/>
					</el-select>
				</div>
			</div>
			
				<div class="headTopItem">
				<span class='label'>函授站</span>
				<div class="marL10">
					<el-select v-model="tableForm.stationId" class="kf-select" placeholder="请选择函授站" filterable  @change="searchChange">
						<el-option label="所有" value=""/>
						<el-option
								v-for="(item,index) in stationList"
								:key="index"
								:label="item.name"
								:value="item.id"/>
					</el-select>
				</div>
			</div>
			
			<div class="headTopItem">
				<span class='label'>课程</span>
				<div class="marL10">
					<el-select v-model="tableForm.planId" class="kf-select" placeholder="请选择课程" filterable  @change="searchChange">
						<el-option label="所有" value=""/>
						<el-option
								v-for="(item,index) in courseList"
								:key="index"
								:label="item.siteCourseName"
								:value="item.planId"/>
					</el-select>
				</div>
			</div>
			
			
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
		 	
			 <div class="comTopResetBtn comTopBlueBtn topBtn  marL10 marT20" @click='$router.go(-1)'>
				返回
			</div>
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
		          prop="cardNo"
		          label="证件号码">
		        </el-table-column>
		        <el-table-column
		          prop="level"
		          label="层次">
					<template slot-scope="scope">
						{{scope.row.level==1?'高起专':scope.row.level==2?'专升本':'高起本'}}
					</template>
		        </el-table-column>
		        <el-table-column
		          prop="siteCourseName"
		          label="课程">
		        </el-table-column>
		        <el-table-column
		          prop="stationName"
		          label="函授站">
		        </el-table-column>
		        <el-table-column
		          prop="createTime"
		          label="提交时间" :formatter="$fun.table.time">
		        </el-table-column>
		        <el-table-column
		          prop="content"
		          label="成绩">
		        </el-table-column>

		        <!--<el-table-column
		          fixed="right"
		          label="操作" width="200">
		          <template slot-scope="scope">
					  <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
		            <baseDelBtn delUrl="/teaching/discuss/removeContent" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
		          </template>
		        </el-table-column>-->
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
      	<el-form-item label="标题" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入标题"></el-input>
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
  	</el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        batchId:"",
        level:"",
        majorId:"",
        stationId:"",
        planId:"",
        name:"",
        cardNo:""
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
        ableStatus:1,
        remark:"",
        name:""
      },
      rulesForm: {
        name: [
          { required: true, message: "请输入标题", trigger: "blur" },
		],
		  remark: [
                        {
                            min: 1,
                            max: 20,
                            message: "最长 20 个字符",
                            trigger: "blur"
                        }
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
     courseList:[]
    };
  },
  components: {},
  mounted() {
  	this.studyWorkManagerList_stations();
  	this.studyWorkManagerList_courses();
  	this.studyWorkManagerList_majors()
  	this.getBatchList()
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
    getBatchList(){
          this.$api.essentialInformation.SimpleBatch_get_list().then((res)=>{
              this.batchList=res.data;
          })
      },
    studyWorkManagerList_majors(){
    	this.$api.teachManage.studyWorkManagerList_majors().then((res)=>{
              this.majorList=res.data;
          })
    },
    studyWorkManagerList_courses(){
    	this.$api.teachManage.studyWorkManagerList_courses().then((res)=>{
              this.courseList=res.data;
          })
    	
    },
     studyWorkManagerList_stations(){
    	this.$api.teachManage.studyWorkManagerList_stations().then((res)=>{
              this.stationList=res.data;
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
        .studyWorkManagerList_detail(this.$route.params.id,{
          pageNum: this.pageNum,
          pageSize: this.pageSize,
         ...this.tableForm,
         workId:this.$route.params.id
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
          ableStatus:1,
          remark:"",
          name:"",
          planId:this.$route.params.planId
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
        content:row.content
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.teachManage
          .discuss_addContent({
              courseDiscussId:this.$route.params.id,
			  ...this.form
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
        this.$api.teachManage
          .discuss_editContent(this.form.id,this.form)
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
    get_TeachPlanDisciplineList(){
    	this.$api.teachManage.get_TeachPlanDisciplineList().then((res)=>{
    		this.disciplineList=res.data.pageList
    	})
    },
    get_TeachPlanMajorList(){
    	this.$api.teachManage.get_TeachPlanMajorList().then((res)=>{
    		this.majorList=res.data.pageList
    	})
    }
    //分页end
  }
};
</script>
