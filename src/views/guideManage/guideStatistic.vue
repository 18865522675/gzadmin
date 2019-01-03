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

     <el-form-item  class="kf-form-item form-search">
      <el-input placeholder="请输入手机号/姓名" v-model="keyword" style="width: 296px;">
       <el-button slot="append" class="form-search-ico" @click="selectChange(true)">搜索</el-button>
      </el-input>
     </el-form-item>

    </div>
   </el-form>
  </div>
  <div class="kf-bd">

   <!--表格导航-->
   <div class="kf-table-nave">
    <div class="kf-btn">统计列表</div>
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
            prop="phone"
            label="手机号">
    </el-table-column>
    <el-table-column
            prop="name"
            label="姓名">
    </el-table-column>
    <el-table-column
            prop="summary"
            label="简介" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column
            prop="type"
            label="教师类别" :formatter="formats">
    </el-table-column>
    <el-table-column
            prop="courseList"
            label="课程" :formatter="formats" width="300" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column
            prop="tutorRange"
            label="辅导范围" :formatter="formats">
    </el-table-column>
    <el-table-column
            prop="tutorNum"
            label="辅导人数">
    </el-table-column>
    <el-table-column
            prop="ware"
            label="提问数量/回复数量">
     <template slot-scope="scope">
       <span>{{scope.row.questionCount+"/"+scope.row.answerCount}}</span>
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

 </div>
</template>

<script>
import guideMixin from "@/mixin/guideMixin";
export default {
  data() {
    return {
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total: 10,
      keyword: "",
      loading: false
    };
  },
  watch: {
    keyword: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  components: {},
  mixins: [guideMixin],
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.loading = true;
      this.$api.guideManage
        .getStaticList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          keyword: this.keyword
        })
        .then(res => {
          this.loading = false;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
        });
    },
    formats(row, col) {
      if (col.property === "tutorRange") {
        switch (row.tutorRange) {
          case 0:
            return "不限";
          case 1:
            return "限定";
        }
      }

      if (col.property === "type") {
        switch (row.type) {
          case 1:
            return "直播";
          case 2:
            return "辅导";
          case 3:
            return "全部";
        }
      }

      if (col.property === "courseList") {
        if (!row.courseList || !row.courseList.length) return "暂无";
        let str = "";
        for (let i of row.courseList) {
          str += i.name + " , ";
        }
        return str;
      }
    }
  }
};
</script>
