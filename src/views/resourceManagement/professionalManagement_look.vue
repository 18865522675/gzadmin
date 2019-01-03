<template>
  <div class="g-module">
    <!--筛选-->
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="专业" class="kf-form-item form-search">
            <el-input :value="sign.name" disabled></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">

      <!--课件列表——表格-->
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
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="code"
          label="课程编码">
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="$fun.table.time"
          label="创建时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :formatter="$fun.table.time"
          label="更新时间"
          width="160">
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
          width="60">
          <template slot-scope="scope">
            <router-link
              :to="'/resourceManagement/professionalManagement_look_list/'+
              scope.row.id+'/'+
              scope.row.name+'/'+
              (scope.row.wareVer?scope.row.wareVer:0)
              " size="small" class="kf-btn kf-btn-table small">查看</router-link>
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      sign: {},
      tableLoading: true,
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0
      //分页——end
    };
  },
  components: {},
  mounted() {
    this.sign = this.$route.params;
    console.log(this.sign);
    this.get_ajax();
  },
  methods: {
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.resourceManagement
        .professionalManagement_get_listCourse({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          majorId: this.sign.majorId
        })
        .then(res => {
          this.tableData = res.data.pageList;
          this.total = res.data.total;
          this.tableLoading = false;
        });
    },
    ready_ajax() {
      this.pageNum = 1;
      this.get_ajax();
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
