<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
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
		 	</div>
		 	<span class='label marL10'>学生</span>
		 	<div class="marL10">
 					<!--searchInp-->

			<el-input v-model="tableForm.name" class='searchInp' placeholder="请输入收件人姓名">
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
		          prop="sendName"
		          label="发件人">
		        </el-table-column>
		        <el-table-column
		          prop="receivedName"
		          label="收件人">
		        </el-table-column>
		         <el-table-column
		          prop="title"
		          width="320"
		          label="标题">
		        </el-table-column>
		         <el-table-column
		          prop="content"
		          width="120"
		          label="内容">
		        </el-table-column>
		        <el-table-column
		          width="120"
		          label="已读">
		          <template slot-scope="scope">
		            {{scope.row.readed==1?"已读":"未读"}}
		          </template>
		        </el-table-column>
		        <!--<el-table-column-->
		          <!--prop="publisher"-->
		          <!--width="120"-->
		          <!--label="收件人是否已删">-->
		        <!--</el-table-column>-->
		        <!--<el-table-column-->
		          <!--prop="updateTime"-->
		          <!--label="更新时间"-->
		          <!--width="200"-->
		          <!--:formatter="$fun.table.time">-->
		        <!--</el-table-column>-->
		        <!--<el-table-column-->
		          <!--prop="publisher"-->
		          <!--width="120"-->
		          <!--label="发布状态">-->
		        <!--</el-table-column>-->
		        <!--<el-table-column
		          label="状态"
		          width="80">
		          <template slot-scope="scope">
		            {{scope.row.ableStatus?"启用":"禁用"}}
		          </template>
		        </el-table-column>-->
		        <el-table-column
		          fixed="right"
		          label="操作">
		          <template slot-scope="scope">
		            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>-->
		            <baseDelBtn delUrl="/notice/msg" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
         <el-form-item label="收件人" prop="receivedIds">
          <el-select  style="width:100%" v-model="form.receivedIds" multiple placeholder="请选择收件人">
          	<el-option v-for="(item,index) in kindList" :key="index" :value="item.id" :label="item.userName">

          	</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model.trim="form.content" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
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
    import { mapState } from "vuex";
export default {
  data() {
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        name: "",
		  stationId:""
      },
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
      stationList:[],
      dialogAddVisible: false,
      dialogType: 0,
      form: {
        name: "", //课件名称
        code: "", //课件编码
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
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
		  receivedIds: [
          { required: true, message: "请选择收件人", trigger: "blur" },
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
    computed: mapState(["userInfo"]),
  components: {},
  mounted() {
	this.getStudentList();
	this.getZhanneixinStationList();
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
  	getZhanneixinStationList(){
  		this.$api.message.getZhanneixinStationList({
  			pageNum:1,
  			pageSize:1000
  		}).then((res)=>{
  			this.stationList=res.data.list;
  		}).catch((e)=>{

  		})
  	},
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.message
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
        name: "", //课件名称
        code: "", //课件编码
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
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
        title: row.title, //课件名称
        content: row.content, //课件编码
        receivedIds:row.receivedIds.join(",")
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
          this.form.receivedIds=this.form.receivedIds.join(",")
        this.$api.message
          .stationMsg_add(this.form)
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
    getStudentList(){
    	this.$api.message.getStudentList().then((res)=>{
    		this.kindList=res.data
    	})
    },
      getZhanneixinStationList(){
    	this.$api.message.getZhanneixinStationList().then((res)=>{
    		this.stationList=res.data
    	})
    }
    //分页end
  }
};
</script>
