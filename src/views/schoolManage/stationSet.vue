<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
  			<!--<span class='label'>类别</span>
  			<div class="marL10">
				 <el-select v-model="tableForm.kindId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
		              <el-option label="所有" value=""/>
		              <el-option
		                v-for="(item,index) in kindList"
		                :key="index"
		                :label="item.name"
		                :value="item.id"/>
	          	  </el-select>
		 	</div>
		 	<span class='label marL10' v-if="!userInfo.stationId">函授站</span>
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
		 	<div class="marL10">
 					<!--searchInp-->
				<el-input v-model="tableForm.name" class='searchInp' placeholder="请输入函授站名称">
				 	<el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
				</el-input>
 			</div>
			<!--<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show' v-if="extra.indexOf('添加')>-1">
				添加
			</div>-->

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
		          prop="stationName"
		          label="函授站" :show-overflow-tooltip="true" width="200">
		        </el-table-column>
		        <el-table-column
		          prop="contactUser"
		          label="负责人">
		        </el-table-column>
		         <el-table-column
		          prop="contactPhone"
		          label="联系电话">
		        </el-table-column>
		         <el-table-column
		          prop="email"
		          label="邮箱">
		        </el-table-column>
		        <el-table-column
		          prop="studentCount"
		          label="学生人数">
		        </el-table-column>
		        <el-table-column
		          fixed="right"
		          label="操作" width="200">
		          <template slot-scope="scope">
		          	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="publish(scope.row.id)" v-if="scope.row.publishStatus!=1&&extra.indexOf('发布')>-1" >发布</el-button>
		            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)"  v-if="extra.indexOf('编辑')>-1&&scope.row.publishStatus!=1">编辑</el-button>
		            <baseDelBtn delUrl="/notice/notice" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
        <el-form-item label="负责人" prop="contactUser">
          <el-input v-model.trim="form.contactUser" placeholder="请输入负责人名字"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model.trim="form.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="form.email" placeholder="请输入email"></el-input>
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
		  name:"",
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
		email:"",
		phone:"",
		contactUser:""
      },
      rulesForm: {
        contactUser: [
          { required: true, message: "请输入负责人", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入email", trigger: "blur" },
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
//	this.getKindList();
//	this.getStationList();
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
      this.$api.schoolManage
        .getStationList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
			...this.tableForm
        })
        .then(res => {
          this.extra = res.data.extra;
          this.tableData = res.data.pageList;
          this.total = +res.data.total;
          this.tableLoading = false;
                    console.log(this.userInfo)
          this.tableData.map((item)=>{
          	if(item.sendName==this.userInfo.name&&item.stationName==this.userInfo.name){
          		item.canAction=true
          	}else{
          		item.canAction=false
          	}
          })
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
        email:"",
		phone:"",
		contactUser:""
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
        id: row.id,
		email:row.email,
		phone:row.contactPhone,
		contactUser:row.contactUser
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.message
          .notice_add(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
        this.$api.schoolManage
          .stationEdit(this.form.id,this.form)
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
