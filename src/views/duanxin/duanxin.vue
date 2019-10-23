<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
  			<span class='label'>类别</span>
  			<div class="marL10">
				 <el-select v-model="tableForm.type" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
				 	  <el-option label="全部" value=""/>
		              <el-option label="所有" value="1"/>
		              <el-option label="单个" value="0"/>
	          	  </el-select>
		 	</div>
		 	
		 	
		 	<span class='label marL10'>发送状态</span>
  			<div class="marL10">
				 <el-select v-model="tableForm.status" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
				 	  <el-option label="全部" value=""/>
		              <el-option label="未发送" value="0"/>
		              <el-option label="已发送" value="1"/>
	          	  </el-select>
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
		 	
		 	
		 	<div class="marL10">
 					<!--searchInp-->
				<el-input v-model="tableForm.content" class='searchInp' placeholder="请输入短信内容">
				 	<el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
				</el-input>
 			</div>
			<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show' v-if="extra.indexOf('添加')>-1">
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
		        <!--<el-table-column
		          prop="title"
		          label="短信标题" :show-overflow-tooltip="true" width="200">
		        </el-table-column>-->
		        <el-table-column
		          prop="kindName"
		          label="类别">
		          <template slot-scope="scope">
		          {{scope.row.type==0?'单个':'所有'}}
		          </template>
		        </el-table-column>
		         <el-table-column
		          prop="content"
		          width="320"
				  :show-overflow-tooltip="true"
		          label="内容">
		        </el-table-column>
		         <!--<el-table-column
		          prop="sendName"
		          width="120"
		          label="发布者">
		        </el-table-column>-->
		        <el-table-column
		          prop="sendName"
		          width="120"
		          label="发送数量">
		         	<template slot-scope="scope">
		         		<span style="cursor: pointer" @click="showDialog(scope.row.id)">{{scope.row.sendCount}}</span>
		         	</template>
		        </el-table-column>
		        <!--<el-table-column
		          prop="sendName"
		          width="120"
		          label="函授站">
		        </el-table-column>-->
		        <el-table-column
		          prop="updateTime"
		          label="更新时间"
		          width="200" :show-overflow-tooltip="true"
		          :formatter="$fun.table.time">
		        </el-table-column>
		        <!--<el-table-column
		          prop="publishTime"
		          label="发布时间" :show-overflow-tooltip="true"
		          :formatter="$fun.table.time">
		        </el-table-column>-->
		        <el-table-column
		          label="发布状态"
		          width="80">
		          <template slot-scope="scope">
		            {{scope.row.status==0?"未发送":"已发送"}}
		          </template>
		        </el-table-column>
		        
		        
		        <!--<el-table-column
		          label="状态"
		          width="80">
		          <template slot-scope="scope">
		            {{scope.row.ableStatus?"启用":"禁用"}}
		          </template>
		        </el-table-column>-->
		        <el-table-column
		          fixed="right"
		          label="操作" width="200">
		          <template slot-scope="scope">
		          	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="publish(scope.row.id)" v-if="scope.row.publishStatus!=1&&extra.indexOf('发送')>-1" >发送</el-button>
		            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)"  v-if="extra.indexOf('编辑')>-1&&scope.row.publishStatus!=1">编辑</el-button>
		            <baseDelBtn delUrl="/outside/note/remove" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
         <el-form-item label="类别" prop="type">
          <el-select  style="width:100%" v-model="form.type" :disabled="dialogType==1" placeholder="请选择类别">
          	<el-option label="所有" value="1"/>
		    <el-option label="单个" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phones" v-if='form.type==0&&dialogType==0'>
        	<!--v-if="form.type==0"-->
          <el-input v-model.trim="form.phones" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model.trim="form.content" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>
    
    
    <el-dialog
      title="发送人列表"
      :visible.sync="numberDialog"
      width="660px"
      center
      @close="closeDialog"
      :append-to-body="true"
      class="kf-dialog-add">
     	<div>
     		<div class="marL10">
 					<!--searchInp-->
 				<div class="pageCard">
 					<el-input v-model="senderPhone" placeholder="请输入手机号码">
				 	<el-button slot="append" icon="el-icon-search" @click="getSenderList()"></el-button>
				</el-input>
 				</div>
				
 			</div>
 			
     		<el-table
     			class="marL10"
			    :data="senderList"
			    border
			    style="width: 100%;margin-top: 50px;">
			    <el-table-column
			      fixed
			      prop="date"
			      label="姓名">
			      <template  slot-scope="scope">
			      	{{scope.row.userName||'未知'}}
			      </template>
			    </el-table-column>
			    
			    <el-table-column
			      prop="phone"
			      label="手机号">
			    </el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <baseDelBtn delUrl="/outside/note/removePhone" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
			      </template>
			    </el-table-column>
			  </el-table>
			  
     	</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="numberDialog=false">关闭</el-button>
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
		  type:"",
		  status:"",
		  content:""
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
          type:"0",
          content:"",
          phones:""
      },
      rulesForm: {
        phones: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        type: [
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
//   kindList:[],
     stationList:[],
     numberDialog:false,
     senderList:[],
     senderPageNumber:1,
     senderpageSize:10,
     senderPhone:"",
     senderId:""
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
    closeDialog(){
    	this.senderPhone=""
    },
    showDialog(id){
    	this.numberDialog=true;
    	this.senderId=id;
    	this.getSenderList();
    },
    getSenderList(){
    	this.$api.duanxin.getDuanxinSenderList({
    		id:this.senderId,
    		pageNum:this.senderPageNumber,
    		pageSize:this.senderpageSize,
    		phone:this.senderPhone
    	}).then((res)=>{
    		this.senderList=res.data.pageList;
    		
    	}).catch((e)=>{
    		this.$message.warning("获取发送人失败")
    	})
    },
    publish(id){
    	this.$alert('确认发送此短信？', '发送', {
          confirmButtonText: '确定',
          callback: action => {
              if(action=='confirm'){
                  this.$api.duanxin.duanxin_publish(id).then((res)=>{
                      this.$message.success("短信发送成功");
                      this.get_ajax()
                  }).catch((e)=>{
//                    this.$message.error("发布失败")
                  })
			  }else{
                  this.$message.info("已取消发布")
			  }
          }
        });
    },
    get_ajax() {
      this.tableLoading = true;
      this.$api.duanxin
        .getDuanxinList({
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
//        this.tableData.map((item)=>{
//        	if(item.sendName==this.userInfo.name&&item.stationName==this.userInfo.name){
//        		item.canAction=true
//        	}else{
//        		item.canAction=false
//        	}
//        })
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
          type:"0",
          phones:"",
          content:"",
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
		type: String(row.type),
		phones:row.phones,
        content: row.content, //课件编码
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
//    	if(this.form.type==1){
//    		delete this.form.phones
//    	}
        this.$api.duanxin
          .addDuanxin(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
        this.$api.duanxin
          .editDuanxin(this.form.id,this.form)
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
