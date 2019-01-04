<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
  			<span class='label'>类别</span>
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
		 	<div class="marL10">
 					<!--searchInp-->
				<el-input v-model="tableForm.name" class='searchInp' placeholder="请输入公告标题">
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
		        <el-table-column
		          prop="title"
		          label="标题">
		        </el-table-column>
		        <el-table-column
		          prop="kindName"
		          label="类别">
		        </el-table-column>
		         <el-table-column
		          prop="content"
		          width="320"
				  :show-overflow-tooltip="true"
		          label="内容">
		        </el-table-column>
		         <el-table-column
		          prop="sendName"
		          width="120"
		          label="发布者">
		        </el-table-column>
		        <el-table-column
		          prop="updateTime"
		          label="更新时间"
		          width="200"
		          :formatter="$fun.table.time">
		        </el-table-column>
		        <el-table-column
		          prop="publishTime"
		          label="发布时间"
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
		          label="操作" width="200">
		          <template slot-scope="scope">
		          	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="publish(scope.row.id)" v-if="scope.row.publishStatus!=1" >发布</el-button>
		            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
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
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="form.title" placeholder="请输入标题（不超过20个字）"></el-input>
        </el-form-item>
         <el-form-item label="类别" prop="kindId">
          <el-select  style="width:100%" v-model="form.kindId" placeholder="请选择类别">
          	<el-option v-for="(item,index) in kindList" :key="index" :value="item.id" :label="item.name">
          		
          	</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model.trim="form.content" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
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
		  name:"",
		  kindId:"",
		  stationId:""
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
          kindId:"",
          ableStatus:1,
          remark:"",
          content:"",
          title:""
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
     kindList:[],
     stationList:[]
    };
  },
  components: {},
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
      this.$api.message
        .getNoticeList({
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
          kindId:"",
          ableStatus:1,
          remark:"",
          content:"",
          title:""
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
		  title:row.title,
        kindId: row.kindId, //课件名称
        content: row.content, //课件编码
        remark: row.remark, //备注
        ableStatus: row.ableStatus //启用状态(1启用0禁用)
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
        this.$api.message
          .notice_edit(this.form.id,this.form)
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
