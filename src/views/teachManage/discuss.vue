<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
			<div class="headTopItem">
				<span class='label'>年级</span>
				<div class="marL10">
					<el-select v-model="tableForm.batchId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
						<el-option label="所有" value=""/>
						<el-option
								v-for="(item,index) in yearList"
								:key="index"
								:label="item"
								:value="item"/>
					</el-select>
				</div>
			</div>

			<div class="headTopItem" style="width: 370px">
				<span class='label marL10'>主题</span>
				<div class="marL10">
					<!--searchInp-->
					<el-input v-model="tableForm.name" class='searchInp' placeholder="请输入主题名称">
						<el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
					</el-input>
				</div>
			</div>


		 	 <div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show'>
				添加
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
		          label="主题">
		        </el-table-column>
		        <el-table-column
		          prop="level"
		          label="课程">
		        </el-table-column>
		         <el-table-column
		          prop="majorName"
		          label="创建时间">
		        </el-table-column>
		         <el-table-column
		          prop="term"
		          label="更新时间">
		        </el-table-column>
		        <el-table-column
		          prop="siteCourseName"
		          label="备注">
		        </el-table-column>
		        <el-table-column
		          label="状态">
		        </el-table-column>

		        <el-table-column
		          fixed="right"
		          label="操作">
		          <template slot-scope="scope">
		          	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="publish(scope.row.id)" v-if="extra.indexOf('发布')>-1">发布</el-button>
		            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
		            <baseDelBtn delUrl="teaching/discuss" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
        <el-form-item label="年级" prop="batchId">
          <el-select  style="width:100%" v-model="form.batchId" placeholder="请选择年级">
          	<el-option v-for="(item,index) in yearList" :key="index" :value="item" :label="item">

          	</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科类" prop="disciplineId">
          <el-select  style="width:100%" v-model="form.disciplineId" placeholder="请选择科类">
          	<el-option v-for="(item,index) in disciplineList" :key="index" :value="item.id" :label="item.name">

          	</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="层次" prop="level">
          <el-select  style="width:100%" v-model="form.level" placeholder="请选择层次">
          	<el-option label="所有" value=""/>
            <el-option value="1" label="高起专"></el-option>
            <el-option value="2" label="专升本"></el-option>
            <el-option value="3" label="高起本"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="专业" prop="majorId">
          <el-select  style="width:100%" v-model="form.majorId" placeholder="请选择专业">
          	<el-option v-for="(item,index) in majorList" :key="index" :value="item.id" :label="item.name">

          	</el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="课程" prop="courseId">
          <el-select  style="width:100%" v-model="form.courseId" placeholder="请选择课程">
          	<el-option v-for="(item,index) in majorList" :key="index" :value="item.id" :label="item.name">

          	</el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="课程名称" prop="siteCourseName">
          <el-input v-model.trim="form.siteCourseName" placeholder="请输入课程名称" ></el-input>
        </el-form-item>-->
        <el-form-item label="课程学分" prop="courseCredit">
          <el-input v-model.trim="form.courseCredit" placeholder="请输入课程学分" ></el-input>
        </el-form-item>
        <el-form-item label="课时" prop="courseClassHour">
          <el-input v-model.trim="form.courseClassHour" placeholder="请输入课时" ></el-input>
        </el-form-item>
        <el-form-item label="考试形式" prop="levexamKindel">
          <el-select  style="width:100%" v-model="form.examKind" placeholder="请选择考试形式">
          	<el-option label="所有" value=""/>
          	<el-option :value="0" label="线下"></el-option>
            <el-option :value="1" label="线上"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试性质" prop="examNature">
          <el-select  style="width:100%" v-model="form.examNature" placeholder="请选择考试性质">
          	<el-option label="所有" value=""/>
            <el-option :value="0" label="考试"></el-option>
            <el-option :value="1" label="考查 "></el-option>
            <el-option :value="2" label="统考"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="学期(0-5)" prop="term">
          <el-input v-model.trim="form.term" placeholder="请输入学期"></el-input>
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
        batchId:"",
        level:"",
        majorId:"",
        disciplineId:""
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
        courseClassHour: "",
        examKind: "",
        examNature: "",
        term: "",
        remark: "",
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
        batchId: [
          { required: true, message: "请选择年级", trigger: "blur" },
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
        courseId: [
          { required: true, message: "请选择资源课程", trigger: "blur" },
        ],
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
     majorList:[]
    };
  },
  components: {},
  mounted() {
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
        .get_discussList({
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
         batchId: "", //课件名称
        disciplineId: "", //课件编码
        level: "", //备注
        majorId: "",
        courseId: "",
        siteCourseName: "",
        courseType: "",
        courseCredit: "",
        courseClassHour: "",
        examKind: "",
        examNature: "",
        term: "",
        remark: "",
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
         batchId: row.batchId, //课件名称
        disciplineId: row.disciplineId, //课件编码
        level:  row.level, //备注
        majorId: row.majorId,
        courseId: row.courseId,
        siteCourseName: row.siteCourseName,
        courseType:  row.courseType,
        courseCredit:  row.courseCredit,
        courseClassHour:  row.courseClassHour,
        examKind:  row.examKind,
        examNature:   row.examNature,
        term:   row.term,
        remark:  row.remark,
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.teachManage
          .discuss_add(this.form)
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
          .discuss_edit(this.form.id,this.form)
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
