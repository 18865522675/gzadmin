<template>
  <div class="g-module">
			<el-card>
				    <!--筛选-->
    <div class="kf-screen">
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="课程名称" class="kf-form-item form-search">
            <el-input :value="sign.courseName" disabled></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">
      <!--tab切换-->
      <div class="kf-table-tab">
        <div class="kf-table-tab-box">
          <div class="kf-table-tab-item" :class="{on: table_tab_ind === 0}" data-ind="0" @click="change_table_tab">课件列表</div>
          <div class="kf-table-tab-item" :class="{on: table_tab_ind === 1}" data-ind="1" @click="change_table_tab">习题列表</div>
          <div class="kf-table-tab-item" :class="{on: table_tab_ind === 2}" data-ind="2" @click="change_table_tab">图书列表</div>
        </div>
      </div>

      <!--课件列表——表格-->
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        class="kf-table"
        style="width: 100%"
        v-show="table_tab_ind===0">
        <el-table-column
          type="index"
          :index="(index) => (pageNum - 1) * pageSize + index + 1"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="课件名称"
          width="200" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="code"
          label="课件编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="所属课程" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="讲师" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="times"
          label="时长（秒）" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="$fun.table.time"
          label="创建时间"
          width="160" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :formatter="$fun.table.time"
          label="更新时间"
          width="160" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="60">
          <template slot-scope="scope">
            <el-button type="text" size="small"  class="kf-btn kf-btn-table kf-orange-btn  small" @click="dialogVideo_show(scope.row)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--习题列表——表格-->
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        class="kf-table"
        style="width: 100%"
        v-show="table_tab_ind===1">
        <el-table-column
          type="index"
          :index="(index) => (pageNum - 1) * pageSize + index + 1"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="content"
          label="题目"  :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="version"
          label="习题类型"
          width="100">
          <template slot-scope="scope">
            {{scope.row.type===1?"判断":scope.row.type===2?"单选":"多选"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="所属于课程"  :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="$fun.table.time"
          label="创建时间"
          width="160"  :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :formatter="$fun.table.time"
          label="更新时间"
          width="160"  :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="60">
          <template slot-scope="scope">
            <exercisesInfo :id="scope.row.id" :courseName="scope.row.courseName"/>
          </template>
        </el-table-column>
      </el-table>
      
      
      
      <!--图书列表——表格-->
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        class="kf-table"
        style="width: 100%"
        v-show="table_tab_ind===2">
        <el-table-column
          type="index"
          :index="(index) => (pageNum - 1) * pageSize + index + 1"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="图书名称"  :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="code"
          label="图书编码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="所属于课程"  :show-overflow-tooltip="true">
        </el-table-column>
         <!--<el-table-column
          prop="courseName"
          label="类别"  :show-overflow-tooltip="true">
        </el-table-column>-->
         <!--<el-table-column
          prop="sort"
          label="顺序号"  :show-overflow-tooltip="true">
        </el-table-column>-->
        <el-table-column
          prop="updateTime"
          :formatter="$fun.table.time"
          label="更新时间"
          width="160"  :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="true"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="60">
          <template slot-scope="scope">
               <el-button type="text" size="small"  class="kf-btn kf-btn-table kf-orange-btn  small" @click="dialogVideo_show(scope.row)">预览</el-button>
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
			</el-card>

  </div>
</template>

<script>
import exercisesInfo from "../../components/exercisesInfo";
export default {
  data() {
    return {
      sign: {},
      tableLoading: true,
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
      //表格table--start
      table_tab_ind: 0,
      //表格table--end
      apiArr: {
        // 资源管理——课程管理
        resourceManagement_courseManagement_look: {
          ware: {
            model: "resourceManagement",
            page: "courseManagement_get_listWare"
          },
          exe: {
            model: "resourceManagement",
            page: "courseManagement_get_listExercise"
          }
        },
        home_resourceManagement_look: {
          ware: {
            model: "resourceManagement",
            page: "courseManagement_get_listWare"
          },
          exe: {
            model: "resourceManagement",
            page: "courseManagement_get_listExercise"
          }
        },
        // 资源管理——专业管理
        resourceManagement_professionalManagement_look_list: {
          ware: {
            model: "resourceManagement",
            page: "professionalManagement_get_listWare"
          },
          exe: {
            model: "resourceManagement",
            page: "professionalManagement_get_listExercise"
          }
        },
        // 基本信息——专业管理
        essentialInformation_professionalManagement_look_list: {
          ware: {
            model: "essentialInformation",
            page: "essentialInformation_get_listWare"
          },
          exe: {
            model: "essentialInformation",
            page: "essentialInformation_get_listExercise"
          }
        },
        // 基本信息——课程管理
        essentialInformation_courseManagement_look: {
          ware: {
            model: "essentialInformation",
            page: "courseManagement_get_listWare"
          },
          exe: {
            model: "essentialInformation",
            page: "courseManagement_get_listExercise"
          }
        },
        home_essentialInformation_look: {
          ware: {
            model: "essentialInformation",
            page: "courseManagement_get_listWare"
          },
          exe: {
            model: "essentialInformation",
            page: "courseManagement_get_listExercise"
          }
        }
      },
      apiUrl: {}
    };
  },
  components: { exercisesInfo },
  mounted() {
    let pathArr = this.$route.path.split("/");
    this.sign = this.$route.params;
    this.apiUrl = this.apiArr[pathArr[1] + "_" + pathArr[2]];

    this.get_ajax();
  },
  methods: {
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      if (this.table_tab_ind === 0) {
        this.$api[this.apiUrl.ware.model]
          [this.apiUrl.ware.page]({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            courseId: this.sign.courseId,
//          wareVer: this.sign.wareVer
          })
          .then(res => {
            this.tableData = res.data.pageList;
            this.total = +res.data.total;
            this.tableLoading = false;
          });
      } else if(this.table_tab_ind === 1){
        this.$api[this.apiUrl.exe.model]
          [this.apiUrl.exe.page]({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            courseId: this.sign.courseId
          })
          .then(res => {
            this.tableData = res.data.pageList;
            this.total = +res.data.total;
            this.tableLoading = false;
          });
      }else {
            this.$api.resourceManagement.courseManagement_get_listBook({
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                courseId: this.sign.courseId
            })
              .then(res => {
                  this.tableData = res.data.pageList;
                  this.total = +res.data.total;
                  this.tableLoading = false;
              });
      }
    },
    ready_ajax() {
      this.pageNum = 1;
      this.get_ajax();
    },
    //显示视频弹窗
    dialogVideo_show(row) {
      this.$store.commit("dialogVideo_show", {
        src: row.playUrl,
        poster: row.coverUrl,
        time: row.duration
      });
    },
    //切换表格tab
    change_table_tab(e) {
      this.table_tab_ind = parseInt(e.target.dataset.ind);
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
    }
    //分页end
  }
};
</script>
<style>
  .on{
    color: #ffbb51!important;
  }
</style>
