<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
  			<span class='label'>时间</span>
  			<div class="marL10">
				    <el-date-picker
				    class='timeWrap'
			      v-model="tableForm.time"
			      type="datetimerange"
			      @change="ready_ajax"
			      range-separator="至"
			      @onClick="clearAction"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
		 	</div>
		 	<!--<span class='label marL10' v-if="!userInfo.stationId">函授站</span>
		 	<div class="marL10" v-if="!userInfo.stationId">
				 <el-select v-model="tableForm.stationId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
		              <el-option label="所有" value=""/>
		              <el-option
		                v-for="(item, index) in stationList"
		                :key="index"
		                :label="item.name"
		                :value="item.id"/>
	            </el-select>
		 	</div>-->
		 	<span class='label marL10'>考试类型</span>
  			<div class="marL10">
				 <el-select v-model="tableForm.examType" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
		              <el-option label="所有" value=""/>
		             <el-option label="正考" :value="1"></el-option>
		             <el-option label="补考" :value="2"></el-option>
	          	  </el-select>
		 	</div>

			<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show'>
				添加
			</div>

 				<!--<div  class="comTopResetBtn comTopBlueBtn topBtn  marL10">
 					重置
 				</div>-->
 				<!--<div  class="comTopReleteBtn  comTopOrangeBtn topBtn marL10">
 					关联函授站
 				</div>-->
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
		          prop="address"
		          label="考试地点" :show-overflow-tooltip="true" width="200">
		        </el-table-column>
		        <el-table-column
		          prop="examType"
		          label="考试类型" :show-overflow-tooltip="true" width="200">
		          <template slot-scope='scope'>
		          	{{scope.row.examType==1?'正考':'补考'}}
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop="startTime"
		          label="考试开始时间" :formatter="$fun.table.time">
		        </el-table-column>
		        <el-table-column
		          prop="endTime"
		          label="考试结束时间" :formatter="$fun.table.time">
		        </el-table-column>
		        <el-table-column
		          prop="capacity"
		          label="教室容纳人数/已安排人数">
		          <template slot-scope='scope'>
		          	{{scope.row.capacity+'/'+scope.row.usedCount}}
		          </template>
		        </el-table-column>
		        <el-table-column
		          fixed="right"
		          label="操作" width="250">
		          <template slot-scope="scope">
		          	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="$router.push('/exam/arrangeStudent/'+scope.row.id)"   v-if="extra.indexOf('关联学生列表')>-1" >添加学生</el-button>
		            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)"  v-if="extra.indexOf('编辑')>-1">编辑</el-button>
		            <baseDelBtn delUrl="/exam/exam" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="140px" class="kf-form-add">
      	 <el-form-item label="考试开始时间" prop="start">
              <el-date-picker
		      v-model="form.start"
		      type="datetime"
		      style="width:100%!important"
		      placeholder="选择日期时间">
		    </el-date-picker>
        </el-form-item>
         <el-form-item label="考试结束时间" prop="end">
              <el-date-picker
		      v-model="form.end"
		      type="datetime"
		      style="width:100%!important"
		      placeholder="选择日期时间">
		    </el-date-picker>
        </el-form-item>
      	 <el-form-item label="考试地点" prop="address">
          <el-input v-model.trim="form.address	" placeholder="请输入考试地点"></el-input>
        </el-form-item>
        <el-form-item label="考场号" prop="areaNo">
          <el-input v-model.trim="form.areaNo" placeholder="请输入考场号"></el-input>
        </el-form-item>
         <el-form-item label="考试类型" prop="examType">
          <el-select  style="width:100%" v-model="form.examType" :disabled="dialogType==1" placeholder="请选择考试类型">
          	<el-option label="正考" :value='1'></el-option>
          	<el-option label="补考" :value='2'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教室容纳人数"  prop="capacity">
          <el-input v-model.trim="form.capacity" placeholder="请输入教室容纳人数" type="number" onkeypress="return event.keyCode>=48&&event.keyCode<=57"  min="0"></el-input>
        </el-form-item>
        <!--<el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>-->
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
    import { mapState } from "vuex";
export default {
  data() {
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
		  examType:"",
		  start:"",
		  end:"",
		  time:''
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
          examType:"",
          examType:"",
          remark:"",
          address:"",
          time:"",
          start:"",
          end:""
      },
      rulesForm: {
        address: [
          { required: true, message: "请输入考场地址", trigger: "blur" },
        ],
        areaNo: [
          { required: true, message: "请输入考场号", trigger: "blur" },
        ],
        
        
        examType: [
          { required: true, message: "请选择考试类型", trigger: "blur" },
        ],
        capacity: [
          { required: true, message: "请输入教室容纳人数", trigger: "blur" },
        ],
        start: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        end: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
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
     stationList:[]
    };
  },
  components: {},
    computed: mapState(["userInfo"]),

  mounted() {
	this.getKindList();
	this.getStationList();
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
    clearAction(){
    	za
    },
    publish(id){
    	this.$alert('确认发布此公告？', '发布', {
          confirmButtonText: '确定',
          callback: action => {
              if(action=='confirm'){
                  this.$api.message.notice_publish(id).then((res)=>{
                      this.$message.success("发布成功");
                      this.get_ajax()
                  }).catch((e)=>{
                      this.$message.error("发布失败")
                  })
			  }else{
                  this.$message.info("已取消发布")
			  }
          }
        });
    },
    get_ajax() {
      this.tableLoading = true;
      if(this.tableForm.time){
      	this.tableForm.start=this.$fun.table.time(null,null,this.tableForm.time[0]);
      	this.tableForm.end=this.$fun.table.time(null,null,this.tableForm.time[1]);
      }else{
      	this.tableForm.start=this.tableForm.end=""
      }
      this.$api.exam
        .getExamArrangeList({
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
          start:"",
          end:"",
          examType:"",
          remark:"",
          address:"",
          time:"",
          areaNo:""
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
        address:row.address,
        capacity:row.capacity,
        start:row.startTime,
        end:row.endTime,
 				examType:row.examType,
        remark: row.remark, //备注
        areaNo:row.areaNo
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
      	this.form.start=this.$fun.time(this.form.start);
      	this.form.end=this.$fun.time(this.form.end);
        this.$api.exam
          .addExamArrange(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
      	this.form.start=this.$fun.time(this.form.start);
      	this.form.end=this.$fun.time(this.form.end);
        this.$api.exam
          .editExamArrange(this.form.id,this.form)
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
    		this.kindList=res.data
    	})
    },
    getStationList(){
    	this.$api.message.getNoticeStationsList().then((res)=>{
    		this.stationList=res.data
    	})
    }
    //分页end
  }
};
</script>
