<template>
  <div class="g-module">
    <!--筛选-->
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form ref="form" class="kf-form" :rules="rulesForm" :model="tableForm">
        <div class="kf-row">
          <el-form-item label="管理员" class="kf-form-item mr30">
            <el-select
              v-model.trim="tableForm.adminId"
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading"
              placeholder="请输入管理员名称">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in adminList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块名称" class="kf-form-item form-search">
            <el-input v-model.trim="tableForm.module" placeholder="请输入模块名称"></el-input>
          </el-form-item>
          <el-form-item label="子模块名称" class="kf-form-item form-search">
            <el-input v-model.trim="tableForm.submodule" placeholder="请输入子模块名称"></el-input>
          </el-form-item>
          <el-form-item label="操作名称" class="kf-form-item form-search">
            <el-input v-model.trim="tableForm.operate" placeholder="请输入操作名称"></el-input>
          </el-form-item>
          <el-form-item label="筛选时间" class="kf-form-item form-date-range mr20" style="width: auto">
            <el-date-picker
              v-model="time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="kf-form-item form-search form-search-btn" style="width: auto">
            <el-button @click="searchSubmit" class="form-search-ico">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">
      <!--表格导航-->
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">日志列表</div>
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
          prop="module"
          label="主模块名称">
        </el-table-column>
        <el-table-column
          prop="submodule"
          label="子模块名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作人姓名">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作名称">
        </el-table-column>
        <el-table-column
          prop="operateIp"
          label="操作ip">
        </el-table-column>
        <el-table-column
          prop="operateTime"
          :formatter="$fun.table.time"
          label="操作时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="respMessage"
          label="操作结果消息">
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
      extra: [],
      tableForm: {
        adminId: "",
        module: "",
        submodule: "",
        operate: "",
        start: "",
        end: ""
      },
      rulesForm: {
        adminId: [
          { required: true, message: "请搜索并选择管理员", trigger: "change" }
        ]
      },
      time: [],
      adminList: [],
      tableLoading: false,
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
      loading: false,
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
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
      if (this.time && this.time.length) {
        this.tableForm.start = this.time[0];
        this.tableForm.end = this.time[1].replace(/00:00:00/, "23:59:59");
      } else {
        this.tableForm.start = "";
        this.tableForm.end = "";
      }

      this.tableLoading = true;
      this.$api.systemManagement
        .operationLog_get_list({
          ...this.tableForm,
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
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.$api.systemManagement
          .operationLog_get_admin({
            name: query
          })
          .then(res => {
            this.adminList = res.data;
            this.loading = false;
          });
      } else {
        this.adminList = [];
      }
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
    searchSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.ready_ajax();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
</style>
