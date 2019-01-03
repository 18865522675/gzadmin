<template>
  <!--<div class="g-module">
    <div class="kf-bd">
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">链接列表</div>
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
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="url"
          :show-overflow-tooltip="true"
          label="链接">
        </el-table-column>
        <el-table-column
          label="LOGO地址"
          width="120">
          <template slot-scope="scope">
            <tableCover :url="scope.row.logoUrl"/>
          </template>
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
            <baseDelBtn delUrl="system/link" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入名称（不超过20个字）"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model.trim="form.url" placeholder="请输入链接（不超过255个字）"></el-input>
        </el-form-item>
        <el-form-item label="LOGO地址" prop="logoUrl">
          <el-input v-model.trim="form.logoUrl" placeholder="请输入LOGO地址（不超过255个字）"></el-input>
        </el-form-item>
        <el-form-item label="设备端" prop="device">
          <el-select v-model.trim="form.device" placeholder="请选择" class="kf-form-item form-sel" style="width: 100%">
            <el-option label="PC" value="1"/>
            <el-option label="APP" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.trim="form.sort" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="请输入备注"></el-input>
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
  			<span class='label'>链接列表</span>
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
          prop="name"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="url"
          :show-overflow-tooltip="true"
          label="链接">
        </el-table-column>
        <el-table-column
          label="LOGO地址"
          width="120">
          <template slot-scope="scope">
            <tableCover :url="scope.row.logoUrl"/>
          </template>
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
            <baseDelBtn delUrl="system/link" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入名称（不超过20个字）"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model.trim="form.url" placeholder="请输入链接（不超过255个字）"></el-input>
        </el-form-item>
        <el-form-item label="LOGO地址" prop="logoUrl">
          <el-input v-model.trim="form.logoUrl" placeholder="请输入LOGO地址（不超过255个字）"></el-input>
        </el-form-item>
        <el-form-item label="设备端" prop="device">
          <el-select v-model.trim="form.device" placeholder="请选择" class="kf-form-item form-sel" style="width: 100%">
            <el-option label="PC" value="1"/>
            <el-option label="APP" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.trim="form.sort" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="请输入备注"></el-input>
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
        name: "", //名称
        url: "", //链接
        logoUrl: "", //logo
        device: "", //设备端(1PC2APP)
        sort: "", //排序
        remark: "", //备注
        ableStatus: 1 //启用状态(1已启用 0未启用)
      },
      rulesForm: {
        name: [
          { required: true, message: "请输入名称", trigger: "change" },
          {
            min: 1,
            max: 20,
            message: "最长 20 个字符",
            trigger: "change"
          }
        ],
        url: [
          { required: true, message: "请输入链接", trigger: "change" },
          {
            min: 1,
            max: 255,
            message: "最长 255 个字符",
            trigger: "change"
          }
        ],
        logoUrl: [
          { required: true, message: "请输入LOGO地址", trigger: "change" },
          {
            min: 1,
            max: 255,
            message: "最长 255 个字符",
            trigger: "change"
          }
        ],
        device: [
          { required: true, message: "请选择设备端", trigger: "change" }
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "change" }]
      }
    };
  },
  watch: {
    "form.sort": function(val) {
      this.$nextTick(() => {
        let value = parseInt(val);

        if (value) {
          value = String(value);
        } else {
          value = "";
        }
        this.form.sort = value;
      });
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
      this.$api.systemManagement
        .friendshipLink_get_list({
          pageNum: this.pageNum,
          pageSize: this.pageSize
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
    //显示添加框
    dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
      this.form = {
        name: "", //名称
        url: "", //链接
        logoUrl: "", //logo
        device: "", //设备端(1PC2APP)
        sort: "", //排序
        remark: "", //备注
        ableStatus: 1 //启用状态(1已启用 0未启用)
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
        name: row.name, //名称
        url: row.url, //链接
        logoUrl: row.logoUrl, //logo
        device: row.device, //设备端(1PC2APP)
        sort: row.sort, //排序
        remark: row.remark, //备注
        ableStatus: row.ableStatus //启用状态(1已启用 0未启用)
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.systemManagement.friendshipLink_add(this.form).then(() => {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.dialogAddVisible = false;
          this.ready_ajax();
        });
      } else {
        this.$api.systemManagement.friendshipLink_edit(this.form).then(() => {
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
