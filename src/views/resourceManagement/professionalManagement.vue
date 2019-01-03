<template>
  <div class="g-module">
    <!--筛选-->
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item class="kf-form-item form-search">
            <el-input placeholder="请输入专业名称" v-model="tableForm.name">
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
          <div class="kf-btn">专业列表</div>
          <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="dialogAdd_show" v-if="extra.indexOf('添加')>-1"></div>
        </div>
        <div class="kf-table-nave-right">
          <!--下载模板-->
          <download url="resource/major/downloadMould" v-if="extra.indexOf('下载模版')>-1"/>
          <!--导入模板-->
          <upload url="resource/major/upload" class="ml20" :ok="ready_ajax" v-if="extra.indexOf('批量上传')>-1"/>
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
          prop="level"
          label="层次"
          width="200">
          <template slot-scope="scope">
            {{scope.row.level===1?"高起专":scope.row.level===2?"专升本":""}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="专业名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="code"
          label="专业编码">
        </el-table-column>
        <el-table-column
          label="封面"
          width="120">
          <template slot-scope="scope">
            <tableCover :url="scope.row.coverUrl"/>
          </template>
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
              :to="'/resourceManagement/professionalManagement_look/'+
              scope.row.id+'/'+
              scope.row.name
              " size="small" class="kf-btn kf-btn-table small">查看</router-link>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="resource/major" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
      <div class="kf-fa-bd">
        <div class="kf-fa-box" :class="{on: selStatus}">
          <!--表单-->
          <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
            <el-form-item label="层次" prop="level">
              <el-select v-model.trim="form.level" placeholder="请选择" class="kf-form-item form-sel" style="width: 100%">
                <el-option label="高起专" :value="1"/>
                <el-option label="专升本" :value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item label="专业名称" prop="name">
              <el-input v-model.trim="form.name" placeholder="请输入专业名称"></el-input>
            </el-form-item>
            <el-form-item label="专业编码" prop="code">
              <el-input v-model.trim="form.code" placeholder="请输入专业编码" :disabled="dialogType===1"></el-input>
            </el-form-item>
            <el-form-item label="封面地址" prop="coverUrl">
              <el-input v-model.trim="form.coverUrl" placeholder="请输入封面地址"></el-input>
            </el-form-item>
            <el-form-item label="专业课程">
              <input type="text" v-model.trim="form.courseIds" hidden>
              <div class="kf-fa-selLook">
                <div class="kf-fa-selLook-right" @click="selStatus = true"></div>
                <div class="kf-fa-selLook-tit" v-if="!form.courseIds.length">请点击右侧箭头选择专业课程</div>
                <el-tag
                  class="kf-fa-selLook-item"
                  size="medium"
                  closable
                  @close="selLookClose(index)"
                  v-for="(item, index) in form.courseIds"
                  :key="index">{{item.name}}</el-tag>
              </div>
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
          <!--课程列表-->
          <el-checkbox-group class="kf-fa-sel" v-model="form.courseIds">
            <div class="kf-fa-selLook-left" @click="selStatus = false"></div>
            <el-checkbox
              :label="item"
              border
              v-for="(item, index) in listSimpleCourse"
              :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" v-show="!selStatus">保 存</el-button>
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
        level: "", //层次(1高起专2专升本)
        name: "", //专业名称
        code: "", //专业编码
        coverUrl: "", //封面地址
        courseIds: [], //课程id，用英文逗号隔开
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      },
      rulesForm: {
        level: [{ required: true, message: "请选择层次", trigger: "change" }],
        name: [
          { required: true, message: "请输入专业名称", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入专业编码", trigger: "change" }
        ],
        courseIds: [
          { required: true, message: "请选择专业课程", trigger: "change" }
        ]
      },
      selStatus: false,
      listSimpleCourse: []
    };
  },
  components: {},
  mounted() {
    this.get_ajax();
  },
  methods: {
    //获取简略课程列表
    get_listSimpleCourse(majorId, fun) {
      this.$api.resourceManagement
        .professionalManagement_get_listSimpleCourse({
          majorId
        })
        .then(res => {
          this.listSimpleCourse = res.data;
          if (typeof fun === "function") fun();
        });
    },
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.resourceManagement
        .professionalManagement_get_list({
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
    //显示添加框
    dialogAdd_show() {
      this.get_listSimpleCourse("", () => {
        this.dialogType = 0;
        this.dialogAddVisible = true;
        this.form = {
          level: "", //层次(1高起专2专升本)
          name: "", //专业名称
          code: "", //专业编码
          coverUrl: "", //封面地址
          courseIds: [], //课程id，用英文逗号隔开
          remark: "", //备注
          ableStatus: 1 //启用状态(1启用0禁用)
        };
        this.selStatus = false;
        this.$nextTick(() => {
          this.$refs["form"].clearValidate();
        });
      });
    },
    //显示编辑框
    dialogEdit_show(row) {
      this.get_listSimpleCourse(row.id, () => {
        let courseIds = [];

        this.listSimpleCourse.map(item => {
          if (item.selectStatus) courseIds.push(item);
        });

        this.dialogType = 1;
        this.dialogAddVisible = true;
        this.form = {
          id: row.id,
          level: row.level, //层次(1高起专2专升本)
          name: row.name, //专业名称
          code: row.code, //专业编码
          coverUrl: row.coverUrl, //封面地址
          courseIds: courseIds, //课程id，用英文逗号隔开
          remark: row.remark, //备注
          ableStatus: row.ableStatus //启用状态(1启用0禁用)
        };
        this.selStatus = false;

        this.$nextTick(() => {
          this.$refs["form"].clearValidate();
        });
      });
    },
    //添加编辑数据
    add_ajax() {
      let form = { ...this.form };
      let courseIds = [];

      form.courseIds.map(item => courseIds.push(item.id));
      form.courseIds = courseIds.join(",");

      if (this.dialogType === 0) {
        this.$api.resourceManagement
          .professionalManagement_add(form)
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
          .professionalManagement_edit(form)
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
    searchChange() {
      this.ready_ajax();
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
    //分页end
    selLookClose(ind) {
      this.form.courseIds.splice(ind, 1);
    }
  }
};
</script>
<style lang="less">
.kf-fa-bd {
  overflow: hidden;
  margin-left: -20px;
  margin-right: -20px;
}
.kf-fa-box {
  display: flex;
  width: 1280px;
  transition: all 0.3s;
  .kf-form-add {
    width: 640px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  &.on {
    transform: translateX(-640px);
    transition: all 0.3s;
  }
}
.kf-fa-sel {
  width: 640px;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  .el-checkbox {
    margin-left: 0 !important;
    margin-right: 10px;
    margin-bottom: 15px;
  }
}
.kf-fa-selLook-tit {
  padding-left: 15px;
}
.kf-fa-selLook {
  display: flex;
  flex-wrap: wrap;
  min-height: 45px;
  position: relative;
}
.kf-fa-selLook-left {
  background: url("../../assets/img/arrBtnLeft.png") no-repeat;
  left: 0;
  top: 50%;
  margin-top: -15px;
}
.kf-fa-selLook-right {
  top: 5px;
  right: -20px;
  background: url("../../assets/img/arrBtnRight.png") no-repeat;
}
.kf-fa-selLook-left,
.kf-fa-selLook-right {
  position: absolute;
  width: 18px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
    transition: all 0.3s;
  }
}
.kf-fa-selLook-item {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
