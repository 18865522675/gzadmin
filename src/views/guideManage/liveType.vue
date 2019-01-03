<template>
  <div class="g-module">
    
    <div class="kf-bd">
      <!--表格导航-->
      <div class="kf-table-nave" style="justify-content:flex-start">
        <div class="kf-table-nave-left">
          <div class="kf-btn">直播类别</div>
          <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="show(true)" v-if="extra.indexOf('添加')>-1"></div>
        </div>
      </div>


      <!--表格-->
      <el-table
        :data="tableData"
        v-loading="loading"
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
          label="类别">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间" :formatter="$fun.table.time">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"  :formatter="$fun.table.time">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注" :show-overflow-tooltip="true">
        </el-table-column>
         <el-table-column
          prop="ableStatus"
          label="状态" :formatter="formats">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button  type="text" size="small" class="kf-table-scopeBtn"  @click="show(false,scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <!--<baseModifyBtn  @click.native="show(false,scope.row)"></baseModifyBtn>-->
            <baseDelBtn delUrl="/tutor/liveVideoType" :delId="scope.row.id" :delOk="selectChange"  v-if="extra.indexOf('删除')>-1"></baseDelBtn>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-size="pageSize"
        class="kf-pagination">
      </el-pagination>
    </div>

     <!--弹窗-->
    <!--添加编辑弹窗-->
    <el-dialog
      :title="actionType?'添加':'编辑'"
      :visible.sync="dialogVisible"
      width="760px"
      center
      :append-to-body="true"
      @close="closeDialog"
      class="kf-dialog-add">
      <el-form ref="formData" :rules="rules" :model="formData" label-width="120px" class="kf-form-add">
        <el-form-item label="直播类别" prop="name">
          <el-input type="name"  v-model.trim="formData.name" placeholder="请输入直播类别(不超过50个字)"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="formData.remark" :rows="6" placeholder="输入不超过60个字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import guideMixin from "@/mixin/guideMixin";
export default {
  data() {
    return {
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      //   操作类型 true 添加 false编辑
      actionType: true,
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入类别名称", trigger: "blur" },
          { max: 50, message: "类别名称最长为50字", trigger: "blur" }
        ],
        remark: [{ trigger: "blur", max: 100, message: "备注最多为100个字" }]
      },
      formData: {
        ableStatus: 1
      },
        extra:[]
    };
  },
  mixins: [guideMixin],
  components: {},
  mounted() {
    // console.log(guideMixin)
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.loading = true;
      this.$api.guideManage
        .getVideotTypeList({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
            this.extra=res.data.extra;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
          this.loading = false;
        });
    },
    show(actionType, row) {
      if (actionType === null || actionType === undefined) return;
      this.actionType = actionType;
      if (!actionType) {
        this.formData = Object.assign({}, row);
      }
      this.dialogVisible = true;
    },
    closeDialog() {
      // console.log(78945);
      this.$refs["formData"].resetFields();
      this.formData.ableStatus = 1;
    },
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (this.actionType) {
            this.$api.guideManage
              .AddVideoType(this.formData)
              .then(() => {
                this.actionMes("新增成功");
              })
              .catch(e => {
                console.log(e);
              });

            return;
          }
          this.$api.guideManage
            .editVideoType(this.formData.id, this.formData)
            .then(() => {
              this.actionMes("编辑成功");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    formats(row, col) {
      switch (row.ableStatus) {
        case 1:
          return "启用";
        case 0:
          return "禁用";
      }
    }
  }
};
</script>
