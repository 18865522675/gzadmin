<template>
  <!--<div class="g-module">
    <div class="kf-bd">
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">模块列表</div>
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
          prop="module"
          label="模块名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="moduleSort"
          label="模块排序"
          width="80">
        </el-table-column>
        <el-table-column
          prop="submodule"
          label="子模块名称">
        </el-table-column>
        <el-table-column
          prop="submoduleSort"
          label="子模块排序">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作名称">
        </el-table-column>
        <el-table-column
          prop="ctrlName"
          label="控制器名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="ctrlMethod"
          label="控制器方法"
          width="200">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="系统备注">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.displayStatus?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="system/permission" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
        <el-form-item label="模块名称" prop="module">
          <el-input v-model.trim="form.module" placeholder="请输入模块名称"></el-input>
        </el-form-item>
        <el-form-item label="模块排序" prop="moduleSort">
          <el-input v-model.trim="form.moduleSort" placeholder="请输入模块排序"></el-input>
        </el-form-item>
        <el-form-item label="子模块名称" prop="submodule">
          <el-input v-model.trim="form.submodule" placeholder="请输入子模块名称"></el-input>
        </el-form-item>
        <el-form-item label="子模块排序" prop="submoduleSort">
          <el-input v-model.trim="form.submoduleSort" placeholder="请输入子模块排序"></el-input>
        </el-form-item>
        <el-form-item label="操作名称" prop="operate">
          <el-input v-model.trim="form.operate" placeholder="请输入操作名称"></el-input>
        </el-form-item>
        <el-form-item label="控制器名称" prop="ctrlName">
          <el-input v-model.trim="form.ctrlName" placeholder="请输入控制器名称"></el-input>
        </el-form-item>
        <el-form-item label="控制器方法" prop="ctrlMethod">
          <el-input v-model.trim="form.ctrlMethod" placeholder="请输入控制器方法"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-select v-model.trim="form.type" placeholder="请选择本" class="kf-form-item form-sel" style="width: 100%">
            <el-option label="超级管理员" :value="0"/>
            <el-option label="超级管理员，学校" :value="1"/>
            <el-option label="超级管理员，学校，助学中心" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="显示类型" prop="showType">
          <el-input v-model.trim="form.showType" placeholder="最低位表示普通，然后依次助考、主考、超管)"></el-input>
        </el-form-item>
        <el-form-item label="系统备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="请输入系统备注"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.displayStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
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
  			<span class='label'>模块管理</span>
 				<!--<div class="marL10">
 					<el-input v-model="tableForm.phone" class='searchInp' placeholder="请输入内容">
 					 <el-button slot="append" icon="el-icon-search" @click="searchChange()"></el-button>
 					</el-input>
 				</div>-->
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
          prop="module"
          label="模块名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="moduleSort"
          label="模块排序"
          width="80">
        </el-table-column>
        <el-table-column
          prop="submodule"
          label="子模块名称" width="180">
        </el-table-column>
        <el-table-column
          prop="submoduleSort"
          label="子模块排序" width="180">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作名称">
        </el-table-column>
        <el-table-column
          prop="ctrlName"
          label="控制器名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="ctrlMethod"
          label="控制器方法"
          width="200">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="系统备注">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.displayStatus?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small ml10" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="system/permission" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
        <el-form-item label="模块名称" prop="module">
          <el-input v-model.trim="form.module" placeholder="请输入模块名称"></el-input>
        </el-form-item>
        <el-form-item label="模块排序" prop="moduleSort">
          <el-input v-model.trim="form.moduleSort" placeholder="请输入模块排序"></el-input>
        </el-form-item>
        <el-form-item label="子模块名称" prop="submodule">
          <el-input v-model.trim="form.submodule" placeholder="请输入子模块名称"></el-input>
        </el-form-item>
        <el-form-item label="子模块排序" prop="submoduleSort">
          <el-input v-model.trim="form.submoduleSort" placeholder="请输入子模块排序"></el-input>
        </el-form-item>
        <el-form-item label="操作名称" prop="operate">
          <el-input v-model.trim="form.operate" placeholder="请输入操作名称"></el-input>
        </el-form-item>
        <el-form-item label="控制器名称" prop="ctrlName">
          <el-input v-model.trim="form.ctrlName" placeholder="请输入控制器名称"></el-input>
        </el-form-item>
        <el-form-item label="控制器方法" prop="ctrlMethod">
          <el-input v-model.trim="form.ctrlMethod" placeholder="请输入控制器方法"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-select v-model.trim="form.type" placeholder="请选择本" class="kf-form-item form-sel" style="width: 100%">
            <el-option label="超级管理员" :value="0"/>
            <el-option label="超级管理员，学校" :value="1"/>
            <el-option label="超级管理员，学校，助学中心" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="显示类型" prop="showType">
          <el-input v-model.trim="form.showType" placeholder="最低位表示普通，然后依次助考、主考、超管)"></el-input>
        </el-form-item>
        <el-form-item label="系统备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="请输入系统备注"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.displayStatus">
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
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
      dialogAddVisible: false,
      dialogType: 0,
      form: {
        module: "", //模块名称
        submodule: "", //子模块名称
        operate: "", //操作名称
        ctrlName: "", //控制器
        ctrlMethod: "", //控制器方法
        moduleSort: "", //模块排序
        submoduleSort: "", //子模块排序
        type: "", //权限类型 0添加权限后只给超管加，1给超管组学校 2给超管，学校，助学中心
        showType: "", //显示类型(最低位表示普通，然后依次助考、主考、超管)
        remark: "", //备注
        displayStatus: 1 //启用状态(1显示0隐藏)
      },
      rulesForm: {
        module: [
          { required: true, message: "请输入模块名称", trigger: "blur" }
        ],
        submodule: [
          { required: true, message: "请输入子模块名称", trigger: "blur" }
        ],
        operate: [
          { required: true, message: "请输入操作名称", trigger: "blur" }
        ],
        ctrlName: [
          { required: true, message: "请输入控制器", trigger: "blur" }
        ],
        ctrlMethod: [
          { required: true, message: "请输入控制器方法", trigger: "blur" }
        ],
        moduleSort: [
          { required: true, message: "请输入模块排序", trigger: "blur" }
        ],
        submoduleSort: [
          { required: true, message: "请输入子模块排序", trigger: "blur" }
        ],
        type: [{ required: true, message: "选择权限类型", trigger: "blur" }],
        showType: [
          { required: true, message: "请输入显示类型", trigger: "blur" }
        ],
        displayStatus: [
          { required: true, message: "请选择状态", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  mounted() {
    this.get_ajax();
  },
  methods: {
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.systemManagement
        .moduleManagement_get_list({
          pageNum: this.pageNum,
          pageSize: this.pageSize
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
    //显示添加框
    dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
      this.form = {
        module: "", //模块名称
        submodule: "", //子模块名称
        operate: "", //操作名称
        ctrlName: "", //控制器
        ctrlMethod: "", //控制器方法
        moduleSort: "", //模块排序
        submoduleSort: "", //子模块排序
        type: "", //权限类型 0添加权限后只给超管加，1给超管组学校 2给超管，学校，助学中心
        showType: "", //显示类型(最低位表示普通，然后依次助考、主考、超管)
        remark: "", //备注
        displayStatus: 1 //启用状态(1显示0隐藏)
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
        module: row.module, //模块名称
        submodule: row.submodule, //子模块名称
        operate: row.operate, //操作名称
        ctrlName: row.ctrlName, //控制器
        ctrlMethod: row.ctrlMethod, //控制器方法
        moduleSort: row.moduleSort, //模块排序
        submoduleSort: row.submoduleSort, //子模块排序
        type: row.type, //权限类型 0添加权限后只给超管加，1给超管组学校 2给超管，学校，助学中心
        showType: row.showType, //显示类型(最低位表示普通，然后依次助考、主考、超管)
        remark: row.remark, //备注
        displayStatus: row.displayStatus //启用状态(1显示0隐藏)
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.systemManagement.moduleManagement_add(this.form).then(() => {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.dialogAddVisible = false;
          this.ready_ajax();
        });
      } else {
        this.$api.systemManagement.moduleManagement_edit(this.form).then(() => {
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
