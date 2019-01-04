<template>
  <!--<div class="g-module">
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="院校名称" class="kf-form-item form-search">
            <el-input placeholder="请输入院校名称" v-model="tableForm.name">
              <el-button slot="append" class="form-search-ico" @click="searchChange">搜索</el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">院校列表</div>
          <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="dialogAdd_show" v-if="extra.indexOf('添加')>-1"></div>
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
          label="院校名称">
        </el-table-column>
        <el-table-column
          prop="code"
          label="院校代码"
          width="160">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          :formatter="$fun.table.time"
          width="160">
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
          label="状态"
          width="80">
          <template slot-scope="scope">
            {{scope.row.ableStatus?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="resource/site" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
        <el-form-item label="院校名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入院校名称（不超过20个字）"></el-input>
        </el-form-item>
        <el-form-item label="院校编码" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入院校编码（不超过8个字）"></el-input>
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
  			<span class='label'>院校名称</span>
 				<div class="marL10">
 					<!--searchInp-->
 					<el-input v-model="tableForm.name" class='searchInp' placeholder="请输入内容">
 					 <el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
 					</el-input>
 				</div>
 				<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show'>
 					添加
 				</div>
 				<!--<div  class="comTopResetBtn comTopBlueBtn topBtn  marL10">
 					重置
 				</div>-->
 				<div  class="comTopReleteBtn  comTopOrangeBtn topBtn marL10">
 					关联函授站
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
		          prop="name"
		          :show-overflow-tooltip="true"
		          label="学校名称">
		        </el-table-column>
		        <el-table-column
		          prop="domain"
		          label="域名前缀"
		          :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="code"
		          :show-overflow-tooltip="true"
		          label="学校编码">
		        </el-table-column>
		        <el-table-column
		          prop="code"
		          :show-overflow-tooltip="true"
		          label="账号">
		          <template slot-scope="scope">
		           			华中科技大学
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop="createTime"
		          label="创建时间"
		          :show-overflow-tooltip="true"
		          :formatter="$fun.table.time">
		        </el-table-column>
		        <el-table-column
		          prop="updateTime"
		          label="更新时间"
		          :formatter="$fun.table.time"
		          :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="remark"
		          :show-overflow-tooltip="true"
		          label="备注">
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
		          label="操作" width="360">
		          <template slot-scope="scope">
		            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
		            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn  small" >查看</el-button>-->
		            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn  small" @click="$router.push('/resourceManagement/siteReleteStation/'+scope.row.id)" >关联函授站</el-button>
		            <baseDelBtn delUrl="resource/site" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
        <el-form-item label="院校名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入院校名称（不超过20个字）"></el-input>
        </el-form-item>
        <el-form-item label="院校编码" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入院校编码（不超过8个字）"></el-input>
        </el-form-item>
		  <el-form-item label="域名前缀" prop="domain">
			  <el-input v-model.trim="form.domain" placeholder="请输入域名前缀"></el-input>
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
          domain:"",  //域名前缀
        name: "", //课件名称
        code: "", //课件编码
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      },
      rulesForm: {
        name: [
          { required: true, message: "请输入院校名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "最长 20 个字符",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入院校编码", trigger: "blur" },
          {
            min: 1,
            max: 8,
            message: "最长 8 个字符",
            trigger: "change"
          }
        ],
          domain: [
              { required: true, message: "请输入域名前缀", trigger: "blur" },
          ],
        remark: [
          {
            min: 1,
            max: 255,
            message: "最长 50 个字符",
            trigger: "change"
          }
        ]
      }
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
    get_ajax() {
      this.tableLoading = true;
      this.$api.resourceManagement
        .schoolManagement_get_list({
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
        name: "", //课件名称
        code: "", //课件编码
        remark: "", //备注
          domain:"",
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
		  domain:row.domain,
        name: row.name, //课件名称
        code: row.code, //课件编码
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
        this.$api.resourceManagement
          .schoolManagement_add(this.form)
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
          .schoolManagement_edit(this.form)
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
