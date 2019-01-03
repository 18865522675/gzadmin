<template>
  <div class="g-module">
    <!--筛选-->
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="搜索" class="kf-form-item form-search">
            <el-input placeholder="请输入手机号" v-model="tableForm.phone">
              <el-button slot="append" class="form-search-ico" @click="searchChange">搜索</el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">
      <!--表格导航-->
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">账号列表</div>
          <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="dialogAdd_show" v-if="extra.indexOf('添加')>-1"></div>
        </div>
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
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          label="头像"
          width="120">
          <template slot-scope="scope">
            <tableCover :url="$config.HOST_IMG+scope.row.avatar"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="nick"
          label="昵称">
        </el-table-column>
        <el-table-column
          label="性别">
          <template slot-scope="scope">
            {{scope.row.sex===1?"男":scope.row.sex===2?"女":'未知'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="$fun.table.time"
          label="注册时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :formatter="$fun.table.time"
          label="更新时间"
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
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="btnReset(scope.row.id)" v-if="extra.indexOf('重置')>-1">重置</el-button>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="account/account" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
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

    </div>

    <!--弹窗-->
    <el-dialog
      :title="dialogType===0?'添加':'编辑'"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="form.phone" placeholder="请输入手机号" :disabled="dialogType===1"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model.trim="form.nick" placeholder="请输入昵称" :disabled="dialogType===1"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model.trim="form.sex" placeholder="请选择" class="kf-form-item form-sel" style="width: 100%" :disabled="dialogType===1">
            <el-option label="男" :value="1"/>
            <el-option label="女" :value="2"/>
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        phone: ""
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
        phone: "",
        nick: "",
        sex: "",
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      },
      rulesForm: {
        phone: [
          { validator: this.$fun.form.phone, required: true, trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        remark: [
          {
            min: 1,
            max: 130,
            message: "最长 130 个字符",
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
  methods: {
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.accountManagement
        .account_get_list({
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
    //搜索选择框
    searchChange() {
      this.ready_ajax();
    },
    //显示添加框
    dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
      this.form = {
        phone: "",
        nick: "",
        sex: "",
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
        phone: row.phone,
        nick: row.nick,
        sex: row.sex,
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
        this.$api.accountManagement
          .account_add({
            ...this.form
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
        this.$api.accountManagement
          .account_edit({
            ...this.form
          })
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
    btnReset(id) {
      this.$api.accountManagement
        .account_reset({
          id
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "重置成功!"
          });
          this.dialogAddVisible = false;
          this.ready_ajax();
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
