<template>
  <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
  			<!--<span class='label'>查看导师</span>-->
 				<!--<div  class="comTopResetBtn comTopBlueBtn topBtn  marL10">
 					重置
 				</div>-->
 				<!--<div  class="comTopReleteBtn  comTopOrangeBtn topBtn marL10">
 					关联函授站
 				</div>-->
 				 <div class="headTopItem">
                    <span class='label marL10'>选题方向</span>
                    <div class="marL10">
                        <el-input v-model="tableForm.direction" class='searchInp' placeholder="请输入选题方向">                        </el-input>
                    </div>
                </div>
                
                <div class="headTopItem" style="width: 360px">
                    <span class='label marL10'>论题</span>
                    <div class="marL10">
                        <!--searchInp-->
                        <el-input v-model="tableForm.topicName" class='searchInp' placeholder="请输入论题名称">
                            <el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
                        </el-input>
                    </div>
                </div>
                
                <div class="headTopItem" style="width: 360px">
                    <div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show'>
					 					添加
					 				</div>
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
		          prop="direction"
		          label="选题方向">
		        </el-table-column>
		        <el-table-column
		          prop="defined"
		          label="学生可自定义">
		          <template slot-scope="scope">
		            {{scope.row.defined?"是":"否"}}
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop="name"
		          label="论题">
		        </el-table-column>
		        <el-table-column
		          label="状态">
		          <template slot-scope="scope">
		            {{scope.row.ableStatus?"启用":"禁用"}}
		          </template>
		        </el-table-column>
		        <!--<el-table-column
		          fixed="right"
		          label="操作" width='250'>
		          <template slot-scope="scope">
		            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
		            <baseDelBtn delUrl="/notice/kind" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
         <el-form-item label="选题方向" prop="direction">
         <el-input v-model.trim="form.direction" placeholder="请输入选题方向"></el-input>
        </el-form-item>
        <el-form-item label="论题" prop="topicName">
          <el-input v-model.trim="form.topicName" placeholder="请输入论题名称"></el-input>
        </el-form-item>
        <el-form-item label="是否允许学生自定义">
          <el-radio-group v-model.trim="form.defined">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
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
        topicName: "",
        direction:""
      },
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      directionList:[],
      //分页——end
      dialogAddVisible: false,
      dialogType: 0,
      form: {
        direction: "", //课件名称
        topicName: "", //备注
        ableStatus: 1, //启用状态(1启用0禁用)
        defined:1
      },
      rulesForm: {
        direction: [
          { required: true, message: "请输入选题方向", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "最长 20 个字符",
            trigger: "change"
          }
        ],
        topicName: [
          { required: true, message: "请输入论题名称", trigger: "blur" },
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
      }
    };
  },
  components: {},
  mounted() {
    this.get_ajax();
  },
  watch:{
  	"tableForm.topicName":function(n,o){
  			if(!n){
  				this.get_ajax()
  			}
  	}
  },
  computed:{
  	"id":function(){
  		return this.$route.params.id
  	}
  },
  methods: {
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.paper.getTeacherTopicList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          teacherId:this.id,
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
        defined:1,
        direction:"",
        topicName:"",//课件名称
//      code: "", //课件编码
//      remark: "", //备注
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
        direction: row.direction, //课件名称
        topicName: row.topicName, //课件编码
        defined: row.defined, //备注
        ableStatus: row.ableStatus //启用状态(1启用0禁用)
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.paper
          .teacherTopic_add({
          	...this.form,
          	teacherId:this.id
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
          console.log(this.$api.message.messageType_edit)
        this.$api.message
          .messageType_edit(this.form.id,this.form)
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
    }
    //分页end
  }
};
</script>
