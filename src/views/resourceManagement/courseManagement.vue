<template>
  <!--<div class="g-module">
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="课程名称" class="kf-form-item form-search">
            <el-input placeholder="请输入课程名称" v-model="tableForm.name">
              <el-button slot="append" class="form-search-ico" @click="searchChange">搜索</el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">课程列表</div>
          <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="dialogAdd_show" v-if="extra.indexOf('添加')>-1"></div>
        </div>
        <div class="kf-table-nave-right">
          <download url="resource/course/downloadMould" v-if="extra.indexOf('下载模板')>-1"/>
          <upload url="resource/course/upload" class="ml20" :ok="ready_ajax" v-if="extra.indexOf('批量上传')>-1"/>
        </div>
      </div>
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
          prop="name"
          label="课程名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="code"
          label="课程编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="selectCount"
          label="选课人数">
        </el-table-column>
        <el-table-column
          label="封面"
          width="120">
          <template slot-scope="scope">
            <tableCover :url="scope.row.coverUrl"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="课程讲师">
        </el-table-column>
        <el-table-column
          prop="summary"
          :show-overflow-tooltip="true"
          label="课程简介">
        </el-table-column>
        <el-table-column
          prop="pricing"
          label="课程定价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="price"
          label="课程售价">
        </el-table-column>
        <el-table-column
          prop="wareVer"
          label="课件/版本号"
          width="100">
          <template slot-scope="scope">
            {{scope.row.wareCount+'/'+(scope.row.wareVer?scope.row.wareVer:'0')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="exerciseCount"
          label="习题">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          :formatter="$fun.table.time"
          width="160">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="备注">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.ableStatus?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <router-link
              :to="'/resourceManagement/courseManagement_look/'+
              scope.row.id+'/'+
              scope.row.name+'/'+
              (scope.row.wareVer?scope.row.wareVer:0)
              " size="small" class="kf-btn kf-btn-table small">查看</router-link>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="resource/course" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
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
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入课程名称（不超过20个字）"></el-input>
        </el-form-item>
        <el-form-item label="课程编码" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入课程编码（不超过8个字）" :disabled="dialogType===1"></el-input>
        </el-form-item>
        <el-form-item label="封面地址" prop="coverUrl">
          <el-input v-model.trim="form.coverUrl" placeholder="请输入封面地址"></el-input>
        </el-form-item>
        <el-form-item label="课程讲师" prop="teacher">
          <el-input v-model.trim="form.teacher" maxlength="20" placeholder="请输入课程讲师（不超过20个字）"></el-input>
        </el-form-item>
        <el-form-item label="课程简介" prop="summary">
          <el-input v-model.trim="form.summary" maxlength="50" placeholder="请输入课程简介（不超过50个字）"></el-input>
        </el-form-item>
        <el-form-item label="课程定价" prop="pricing">
          <el-input v-model.trim="form.pricing" placeholder="请输入课程定价"></el-input>
        </el-form-item>
        <el-form-item label="课程售价" prop="price">
          <el-input v-model.trim="form.price" placeholder="请输入课程售价"></el-input>
        </el-form-item>
        <el-form-item label="课件版本" v-if="dialogType===1">
          <el-select v-model.trim="form.wareVer" placeholder="请选择课件版本" class="kf-form-item form-sel" style="width: 100%">
            <el-option
              v-for="(item, index) in listVersion"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="输入不超过255个字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>

  </div>-->


  	 <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
  			<span class='label'>课程名称</span>
 				<div class="marL10">
 					<!--searchInp-->
 					<el-input v-model="tableForm.name" class='searchInp' placeholder="请输入内容">
 					 <el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
 					</el-input>
 				</div>
 				<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show'  v-if="extra.indexOf('添加')>-1">
 					添加
 				</div>
 				  <download url="resource/course/downloadMould" v-if="extra.indexOf('下载模板')>-1"/>
          <upload url="resource/course/upload" class="ml20" :ok="ready_ajax" v-if="extra.indexOf('批量上传')>-1"/>
  		</div>
  		<div class="pageCon">
  			 <el-table
		        v-loading="tableLoading"
		        :data="tableData"
		        border
		        class="kf-table"
		        style="width: 100%" @cell-click="test">
		        <el-table-column
		          type="index"
		          :index="(index) => (pageNum - 1) * pageSize + index + 1"
		          label="序号"
		          width="60">
		        </el-table-column>
		        <el-table-column
		          prop="name"
		          width="120"
		          label="课程名称">
		        </el-table-column>
		        <el-table-column
		          prop="logo"
		          label="课程封面"
		          :show-overflow-tooltip="true" width="200">
		        </el-table-column>
		        <!--<el-table-column
		          prop="code"
		          label="课程定价"
		          width="160">
		        </el-table-column>
		        <el-table-column
		          prop="createTime"
		          label="课程售价"
		          :formatter="$fun.table.time"
		          width="160">-->
		        </el-table-column>
		        <el-table-column
		          prop="wareCount"
		          label="课件"
		          width="160">
		        </el-table-column>
		        <el-table-column
		          prop="exerciseCount"
		          :show-overflow-tooltip="true"
		          label="习题">
		        </el-table-column>
		        <el-table-column
		          prop="bookCount"
		          :show-overflow-tooltip="true"
		          label="图书">
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
		          label="操作" width='250'>
		          <template slot-scope="scope">
		            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
		            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn  small" >查看</el-button>-->
		            <baseDelBtn delUrl="resource/course" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入课程名称（不超过20个字）"></el-input>
        </el-form-item>
        <el-form-item label="课程编码" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入课程编码（不超过8个字）" :disabled="dialogType===1"></el-input>
        </el-form-item>
        <el-form-item label="封面地址" prop="coverUrl">
          <el-input v-model.trim="form.logo" placeholder="请输入封面地址"></el-input>
        </el-form-item>
        <el-form-item label="课件来源" prop="wareFrom">
          <el-input v-model.trim="form.wareFrom" placeholder="请输入课件来源"></el-input>
        </el-form-item>
        <el-form-item label="适用" prop="used">
          <el-select v-model="form.used" placeholder="请选择适用" style="width:100%">
              <el-option label="通用" value="0"/>
              <el-option label="高起专" value="1"/>
              <el-option label="专升本" value="2"/>
              </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="输入不超过255个字"></el-input>
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
        name: ""
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
        name: "", //课件名称
        code: "", //课件编码
        coverUrl: "", //封面地址
        remark: "", //备注
        ableStatus: 1, //启用状态(1启用0禁用)
        used:0,
        wareFrom:""
      },
      rulesForm: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "最长 20 个字符",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入课程编码", trigger: "blur" },
          {
            min: 1,
            max: 8,
            message: "最长 8 个字符",
            trigger: "change"
          }
        ],
        teacher: [
          {
            min: 1,
            max: 20,
            message: "最长 20 个字符",
            trigger: "change"
          }
        ],
        summary: [
          {
            min: 1,
            max: 50,
            message: "最长 50 个字符",
            trigger: "change"
          }
        ],
        price: [{ required: true, message: "请输入课程售价", trigger: "blur" }],
        remark: [
          {
            min: 1,
            max: 255,
            message: "最长 50 个字符",
            trigger: "change"
          }
        ]
      },
      listVersion: []
    };
  },
  watch: {
    "form.pricing": function(val) {
      this.$nextTick(() => {
        this.form.pricing = this.$fun.match.manyFloat(val);
      });
    },
    "form.price": function(val) {
      this.$nextTick(() => {
        this.form.price = this.$fun.match.manyFloat(val);
      });
    },
    "tableForm.name":function(n,o){
  			if(!n){
  				this.get_ajax()
  			}
  	}
  },
  components: {},
  mounted() {
    this.get_ajax();
  },
  methods: {
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.resourceManagement
        .courseManagement_get_list({
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
    //获得版本号列表
    get_listVer(courseId, fun) {
      this.$api.resourceManagement
        .courseManagement_get_listVersion({
          courseId: courseId
        })
        .then(res => {
          this.listVersion = res.data;
          fun();
        });
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
        coverUrl: "", //封面地址
				used:"0",
				wareFrom:'',
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //显示编辑框
    dialogEdit_show(row) {
      // this.get_listVer(row.id, () => {
      //   this.dialogType = 1;
      //   this.dialogAddVisible = true;
      //   this.form = {
      //     id: row.id,
      //     name: row.name, //课件名称
      //     code: row.code, //课件编码
      //     coverUrl: row.coverUrl, //封面地址
		// 			used:row.used,
		// 			wareFrom:row.wareFrom,
      //     remark: row.remark, //备注
      //     ableStatus: row.ableStatus //启用状态(1启用0禁用)
      //   };
      //   this.$nextTick(() => {
      //     this.$refs["form"].clearValidate();
      //   });
      // });
        this.dialogType = 1;
        this.dialogAddVisible = true;
        this.form = {
            id: row.id,
            name: row.name, //课件名称
            code: row.code, //课件编码
            logo: row.logo, //封面地址
            used:row.used,
            wareFrom:row.wareFrom,
            remark: row.remark, //备注
            ableStatus: row.ableStatus //启用状态(1启用0禁用)
        };
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.resourceManagement
          .courseManagement_add(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
        this.$api.resourceManagement
          .courseManagement_edit(this.form)
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
    test(row,col){
    	console.log(col);
    	if(col.label=="习题"||col.label=="课件"||col.label=="图书"){
    		this.$router.push(`/resourceManagement/courseManagement_look/${row.id}/${row.name}/1`)
    	}
    }
    //分页end
  }
};
</script>
