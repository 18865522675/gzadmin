<template>
  <div>
      <el-card class="pageCard">
      	<!--<div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">角色列表</div>
          <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="dialogAdd_show" v-if="extra.indexOf('添加')>-1"></div>
        </div>
      </div>-->
       <div class="pageHead flexItem">
  			<span class='label'>角色列表</span>
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

      <!--表格-->
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
          label="角色名称"
          width="200">
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
          label="状态">
          <template slot-scope="scope">
            {{scope.row.ableStatus?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="220">
          <template slot-scope="scope">
            <router-link
              :to="'/systemManagement/roleManagement_sys/'+
              scope.row.id+'/'+
              scope.row.name
              " size="small" class="kf-btn kf-btn-table small" :disabled="scope.row.remark=='系统创建默认学校角色'" v-if="extra.indexOf('修改权限')>-1">设置权限</router-link>
            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small ml10" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="system/role" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
          </template>
        </el-table-column>
      </el-table>

      <!--分页start-->
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
      <!--分页end-->


    <!--弹窗-->
    <el-dialog
      :title="dialogType===0?'添加':'编辑'"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="130px" class="kf-form-add">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入角色名称（不超过20个字）"></el-input>
        </el-form-item>
        <template v-if="dialogType===0">
          <el-form-item label="类型" prop="type">
            <el-select v-model.trim="form.type" placeholder="请选择" class="kf-form-item form-sel" style="width: 100%">
              <!--<el-option label="超管" :value="3"/>-->
              <template v-if="$store.state.userInfo.type===3">
                <el-option label="普通" :value="0"/>
                <el-option label="主考院校" :value="2"/>
              </template>
              <template v-else-if="$store.state.userInfo.type===2">
                <el-option label="普通" :value="0"/>
                <!--<el-option label="助考院校" :value="1"/>-->
              </template>
              <template v-else>
                <el-option label="普通" :value="0"/>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="主考院校" prop="siteId" v-if="form.type===2">
            <el-select v-model.trim="form.siteId" placeholder="请选择" class="kf-form-item form-sel" style="width: 100%">
              <el-option
                v-for="(item, index) in siteList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="助考院校" prop="stationId" v-if="form.type===1">
            <el-select v-model.trim="form.stationId" placeholder="请选择" class="kf-form-item form-sel" style="width: 100%">
              <el-option
                v-for="(item, index) in stationList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </template>
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
        type: 0, //类型(0普通 1助考院校 2主考院校 3超管)
        siteId: "", //当类型为主考院校时必填
        stationId: "", //当类型为助考院校时必填
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      },
      rulesForm: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "change" },
          {
            min: 1,
            max: 20,
            message: "最长 20 个字符",
            trigger: "change"
          }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        siteId: [
          { required: true, message: "请选择主考院校", trigger: "change" }
        ],
        stationId: [
          { required: true, message: "请选择助考院校", trigger: "change" }
        ],
        remark: [
          {
            min: 1,
            max: 255,
            message: "最长 255 个字符",
            trigger: "change"
          }
        ]
      },
      siteList: [],
      stationList: []
    };
  },
  watch: {
    "form.type": function() {
      console.log(this.form.type);
      switch (this.form.type) {
        case 1: // 助考院校
          this.get_siteList();
          this.get_stationList();
          break;
        case 2: // 主考院校
          this.get_siteList();
          break;
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
      this.$api.systemManagement
        .roleManagement_get_list({
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
    get_siteList() {
      this.$api.systemManagement.roleManagement_get_siteList().then(res => {
        this.siteList = res.data;
      });
    },
    get_stationList() {
      this.$api.systemManagement.roleManagement_get_stationList().then(res => {
        this.stationList = res.data;
      });
    },
    //显示添加框
    dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
      this.form = {
        name: "", //名称
        type: 0, //类型(0普通 1助考院校 2主考院校 3超管)
        siteId: "", //当类型为主考院校时必填
        stationId: "", //当类型为助考院校时必填
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
        name: row.name, //名称
        type: row.type, //类型(0普通 1助考院校 2主考院校 3超管)
        siteId: row.siteId, //当类型为主考院校时必填
        stationId: row.stationId, //当类型为助考院校时必填
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
        this.$api.systemManagement
          .roleManagement_add(this.$fun.signDel(this.form))
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
        this.$api.systemManagement
          .roleManagement_edit(this.$fun.signDel(this.form))
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
