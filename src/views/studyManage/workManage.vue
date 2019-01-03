<template>
 <div class="g-module">
  <!--筛选-->
  <div class="kf-screen">
   <div class="kf-screen-head">
    <div class="kf-screen-head-cap">筛选</div>
   </div>
   <el-form ref="screenForm"  class="kf-form">

    <!--搜索-->
    <div class="kf-row">
     <el-form-item label="课程名称" class="kf-form-item form-sel mr60">
      <el-select v-model="courseId" placeholder="请选择课程" @change="selectChange(true)" filterable>
       <el-option label="全部" value=""/>
       <el-option
               v-for="item in courseList"
               :key="item.id"
               :label="item.name"
               :value="item.id">
       </el-option>
      </el-select>
     </el-form-item>

     <el-form-item  class="kf-form-item form-search">
      <el-input placeholder="请输入作业名称" v-model="name" style="width: 296px;">
       <el-button slot="append" class="form-search-ico" @click="selectChange(true)">搜索</el-button>
      </el-input>
     </el-form-item>

    </div>
   </el-form>
  </div>
  <div class="kf-bd">

   <!--表格导航-->
   <!--<div class="kf-table-nave" style="justify-content: flex-start">-->
    <!--<div class="kf-btn">作业列表</div>-->
    <!--<baseAddBtn @click.native="show(true)"  v-if="extra.indexOf('添加')>-1"></baseAddBtn>-->
   <!--</div>-->
      <div class="kf-table-nave" style="justify-content:flex-start">
          <div class="kf-table-nave-left">
              <div class="kf-btn">作业列表</div>
              <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="show(true)" v-if="extra.indexOf('添加')>-1"></div>
          </div>
      </div>

   <!--表格-->
   <el-table
           v-loading="loading"
           :data="tableData"
           border
           class="kf-table"
           style="width: 100%">
    <el-table-column
            type="index"
            :index="(index) => (pageNum - 1) * pageSize + index + 1"
            label="序号"
            width="50"
    >
    </el-table-column>
    <el-table-column
            prop="name"
            label="作业名称">
    </el-table-column>
    <el-table-column
            prop="course"
            label="所属课程">
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
            label="备注">
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
      <el-button type="text" size="small"   v-if="extra.indexOf('习题详情')>-1"  class="kf-table-scopeBtn" @click="goReleteWork(scope)">关联习题({{scope.row.exerciseCount}})</el-button>
         <!--<baseModifyBtn  @click.native="show(false,scope.row)"></baseModifyBtn>-->
         <el-button type="text" size="small" class="kf-table-scopeBtn"   @click.native="show(false,scope.row)"  v-if="extra.indexOf('编辑')>-1">编辑</el-button>
         <baseDelBtn delUrl="/study/task" :delId="scope.row.id" :delOk="selectChange"  v-if="extra.indexOf('删除')>-1"></baseDelBtn>
     </template>
    </el-table-column>
   </el-table>

   <!--分页start-->
   <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="pageNum"
           :page-size="pageSize"
           :page-sizes="[10, 20, 30, 40]"
           layout="total, sizes, prev, pager, next, jumper"
           :total="total"
           class="kf-pagination">
   </el-pagination>
   <!--分页end-->
  </div>

  <!--弹窗-->
  <el-dialog
     :title="actionType?'添加':'编辑'"
     :visible.sync="dialogVisible"
     width="760px"
     center
     :append-to-body="true"
     class="kf-dialog-add" @close="close">
     <el-form ref="formData" :rules="rules" :model="formData" label-width="120px" class="kf-form-add">
       <el-form-item label="作业名称" prop="name">
         <el-input v-model.trim="formData.name" placeholder="请输入作业名称"></el-input>
       </el-form-item>
       <el-form-item label="所属课程" prop="courseId">
         <el-select v-model="formData.courseId" filterable placeholder="请选择课程" class="kf-form-item form-sel" style="width: 100%" :disabled="!actionType">
             <el-option
               v-for="item in courseList"
               :key="item.id"
               :label="item.name"
               :value="item.id">
             </el-option>
           </el-select>
       </el-form-item>
       <el-form-item label="状态" prop="ableStatus">
         <el-radio-group v-model="formData.ableStatus">
            <el-radio :label="1">启用</el-radio>
           <el-radio  :label="0">禁用</el-radio>
         </el-radio-group>
       </el-form-item>
       <el-form-item label="备注" prop="remark">
         <el-input type="textarea" v-model.trim="formData.remark" maxlength="100" :rows="6" placeholder="输入不超过100个字"></el-input>
       </el-form-item>

     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitForm('formData')">保 存</el-button>
     </div>
   </el-dialog>

 </div>
</template>

<script>
import studyManage from "@/mixin/studyManage.js";
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      formData: {
        ableStatus: 1
      },
      actionType: true,
      courseId: "",
      name: "",
      // keyword: "",
      courseList: [],
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入作业名称", trigger: "blur" },
          { max: 50, message: "作业名称最长为50字", trigger: "blur" }
        ],
        courseId: [
          { required: true, message: "请选择课程名称", trigger: "blur" }
        ],
        remark: [{ trigger: "blur", max: 100, message: "备注最多为100个字" }]
      },
      extra: []
    };
  },
  components: {},
  mixins: [studyManage],
  mounted() {
    this.getWorkCourses();
    this.getDataList();
  },
  watch: {
    name: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    getWorkCourses() {
      this.$api.studyManage.getWorkCourses().then(res => {
        this.courseList = res.data;
      });
    },
    getDataList() {
      this.loading = true;
      this.$api.studyManage
        .getWorkList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          courseId: this.courseId,
          name: this.name
        })
        .then(res => {
          this.extra = res.data.extra;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
          this.loading = false;
        });
    },
    show(actionType, row) {
      console.log(12345);
      if (actionType === null || actionType === undefined) return;
      console.log(1789);
      this.actionType = actionType;
      if (!actionType) {
        this.formData = Object.assign({}, row);
      }
      this.dialogVisible = true;
    },
    close() {},
    submitForm() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          if (this.actionType) {
            this.$api.studyManage.addWork(this.formData).then(() => {
              this.actionMes("新增成功");
            });
            return;
          }
          this.$api.studyManage
            .editWork(this.formData.id, this.formData)
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
      if (col.property === "ableStatus") {
        switch (row.ableStatus) {
          case 1:
            return "已启用";
          case 0:
            return "未启用";
        }
      }
    },
    goReleteWork(scope) {
      this.$router.push(
        `/studyManage/releteWork/${scope.row.id}/${scope.row.courseId}/${
          scope.row.exerciseCount
        }/${scope.row.judgmentCount}/${scope.row.singleCount}/${
          scope.row.multipleCount
        }`
      );
    }
  }
};
</script>
