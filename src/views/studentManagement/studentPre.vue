<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem" style="flex-wrap:pre-wrap">
		 	
		 	<span class='label marL10'>报考年份</span>
  		<div class="marL10">
				 <el-select v-model="tableForm.enrollYear" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
				 		<el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>
	        </el-select>
		 	</div>
		 	
		 	<span class='label marL10'>层次</span>
  		<div class="marL10">
				 <el-select v-model="tableForm.level" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
				 	  <el-option label="所有" value=""/>
		        <el-option label="高起专" :value="1"></el-option>
          	<el-option label="专升本" :value="2"></el-option>
          	<el-option label="高起本" :value="3"></el-option>
	        </el-select>
		 	</div>
		 	
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

		 	
 				
 				<!--<div  class="comTopResetBtn comTopBlueBtn topBtn  marL10">
 					重置
 				</div>-->
 				<!--<div  class="comTopReleteBtn  comTopOrangeBtn topBtn marL10">
 					关联函授站
 				</div>-->
  		</div>
  		
  		<div class="flexItem pageHead">

			<span class='label marL10'>专业</span>
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
			 	<span class='label marL10'>学生</span>
			 	<div class="marL10">
	 					<!--searchInp-->
					<el-input v-model="tableForm.name" class='searchInp' placeholder="请输入姓名，证件号码">
					 	<el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
					</el-input>
	 			</div>
				<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show' v-if="extra.indexOf('添加')>-1">
					添加
				</div>
				 <download url="student/before/downloadMould" class="marL10"  v-if="extra.indexOf('下载模板')>-1" />
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
		          label="姓名">
		        </el-table-column>
		         <el-table-column
		          label="证件类型">
		          <template slot-scope="scope">
		            {{scope.row.cardType==0?'身份证':scope.row.cardType==1?'军官证/士兵证':'港澳通行证'}}
		          </template>
		        </el-table-column>
		         <el-table-column
		          prop="cardNo"
		          label="证件号码">
		        </el-table-column>
		        <el-table-column
		          prop="majorName"
		          label="层次"
		          width="200">
		        </el-table-column>
		        <el-table-column
		          prop="publishTime"
		          label="科类"
		          :formatter="$fun.table.time">
		        </el-table-column>
		        <el-table-column
		          prop="publishTime"
		          label="专业"
		          :formatter="$fun.table.time">
		        </el-table-column>
		        <el-table-column
		          prop="disciplineName"
		          label="函授站"
		          :formatter="$fun.table.time">
		        </el-table-column>
		        <el-table-column
		          label="状态"
		          width="80">
		          <template slot-scope="scope">
		            {{scope.row.ableStatus?"启用":"禁用"}}
		          </template>
		        </el-table-column>
		        <el-table-column
		          fixed="right"
		          label="操作">
		          <template slot-scope="scope">
		          	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="publish(scope.row.id)" v-if="extra.indexOf('发布')>-1">发布</el-button>
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
          	<el-option label="身份证" :value="0"></el-option>
          	<el-option label="军官证/士兵证" :value="1"></el-option>
          	<el-option label="港澳通行证" :value="2"></el-option>
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
		       	<el-option label="军官证/士兵证" :value="1"></el-option>
          	<el-option label="港澳通行证" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报考年份" prop="enrollYear">
          <el-input v-model.trim="form.enrollYear" placeholder="请输入证件号码"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
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
        name: "",
        stationId:"",
        majorId:"",
        level:"",
        disciplineId:"",
        enrollYear:"",
        ableStatus:1,
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
      	name:"",
      	cardType:0,
      	cardNo:"",
      	disciplineId:"",
      	majorId:"",
      	level:"",
      	enrollYear:"",
      	remark:"",
      },
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
        kindId: [
          { required: true, message: "请选择类别", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
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
     disciplineList:[],
     majorList:[],
     stationList:[],
     yearList:[]
    };
  },
  components: {},
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
   getStudentPreSimpleDisplines(){
   	this.$api.studentManagement.getStudentPreSimpleDisplines().then((res)=>{
   		this.disciplineList=res.data.pageList
   	})
   },
    getStudentPreSimpleMajors(){
   	this.$api.studentManagement.getStudentPreSimpleMajors().then((res)=>{
   		this.majorList=res.data.pageList
   	})
   },
   getStudentPreSimpleStations(){
   	this.$api.studentManagement.getStudentPreSimpleStations().then((res)=>{
   		this.stationList=res.data.pageList
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
          this.total = res.data.total;
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
      	cardType:0,
      	cardNo:"",
      	disciplineId:"",
      	majorId:"",
      	level:"",
      	enrollYear:"",
      	remark:"",
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
        name:row.name,
      	cardType:row.cardType,
      	cardNo:row.cardNo,
      	disciplineId:row.disciplineId,
      	majorId:row.majorId,
      	level:row.level,
      	enrollYear:row.enrollYear,
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
    }
    //分页end
  }
};
</script>
