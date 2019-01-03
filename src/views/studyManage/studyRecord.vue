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
            <el-select v-model="courseId" placeholder="请选择层次" @change="selectChange(true)" filterable>
              <el-option label="全部" value=""/>
              <el-option
                v-for="item in courseList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="主考院校" class="kf-form-item form-sel mr60" v-if="this.$store.getters.getUserInfo.type==3">
            <el-select v-model="siteId" placeholder="请选择主考院校" @change="change(true)" filterable>
              <el-option label="全部" value=""/>
              <el-option
                v-for="item in siteList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="助学机构" class="kf-form-item form-sel mr60" v-if="this.$store.getters.getUserInfo.type == 3||this.$store.getters.getUserInfo.type == 2">
            <el-select v-model="stationId" placeholder="请选择助学机构" @change="selectChange(true)">
              <el-option label="全部" value=""/>
              <el-option
                v-for="item in stationList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item  class="kf-form-item form-search">
            <el-input placeholder="请输入手机号/姓名" v-model="account" style="width: 296px;">
              <el-button slot="append" class="form-search-ico" @click="selectChange(true)">搜索</el-button>
            </el-input>
          </el-form-item>

        </div>
      </el-form>
    </div>
    <div class="kf-bd">

      <!--表格导航-->
      <div class="kf-table-nave">
        <div class="kf-btn">记录列表</div>
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
          prop="nick"
          label="昵称">
        </el-table-column>
        <el-table-column    
          prop="name"
          label="姓名">
        </el-table-column>
         <el-table-column
          prop="course"
          label="课程名称">
        </el-table-column>       
        <el-table-column    
          prop="site"
          label="主考院校">
        </el-table-column>
        <el-table-column
          prop="station"
          label="助学机构">
        </el-table-column>
         <el-table-column    
          prop="studyTimes"
          label="学习次数">
        </el-table-column>
        <el-table-column
          prop="noteTimes"
          label="笔记提交次数">
        </el-table-column>
         <el-table-column    
          prop="taskTimes"
          label="作业提交次数">
        </el-table-column>
        <el-table-column
          prop="wareSchedul"
          label="课件学习进度">
          <template slot-scope="scope">
            {{scope.row.wareSchedule+'%'}}
          </template>
        </el-table-column>
      </el-table>

      <!--分页pageNum-->
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
   <!--<el-dialog
      :title="actionType?'添加':'编辑'"
      :visible.sync="dialogVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add" @close="close">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="课件名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入课件名称 "></el-input>
        </el-form-item>
        <el-form-item label="层次" prop="level">
          <el-select v-model="form.level" placeholder="请选择层次" class="kf-form-item form-sel" style="width: 100%" @change="changeLevel">
              <el-option
                v-for="item in levelList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="课程" prop="level">
          <el-select v-model="form.courseId" placeholder="请选择课程" class="kf-form-item form-sel" style="width: 100%" :disabled="!form.level">
              <el-option
                v-for="item in addCourseList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="播放地址" prop="playUrl">
          <el-input v-model.trim="form.playUrl" placeholder="请输入播放地址"></el-input>
        </el-form-item>
        <el-form-item label="封面地址" prop="coverUrl">
          <el-input v-model.trim="form.coverUrl" placeholder="请输入封面地址"></el-input>
        </el-form-item>
        <el-form-item label="顺序号" prop="sort">
          <el-input v-model.trim="form.sort" placeholder="请输入顺序号(必须为数字)"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
             <el-radio :label="0">启用</el-radio>
            <el-radio  :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model.trim="form.remark" maxpageSize="100" :rows="6" placeholder="输入不超过255个字"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">保 存</el-button>
      </div>
    </el-dialog>
    -->

  </div>
</template>

<script>
import studyMixin from "@/mixin/studyManage.js";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      siteList: [],
      stationList: [],
      courseList: [],
      siteId: "",
      stationId: "",
      courseId: "",
      account: "",
      loading: false
    };
  },
  components: {},
  mixins: [studyMixin],
  mounted() {
    if (this.$store.getters.getUserInfo.type == 3) {
      this.getSiteList();
    }
    if (
      this.$store.getters.getUserInfo.type == 3 ||
      this.$store.getters.getUserInfo.type == 2
    ) {
      this.getStationList();
    }
    this.getCourseList();
    this.getDataList();
  },
  watch: {
    account: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    getSiteList() {
      this.$api.studyManage.getRecordSites().then(res => {
        this.siteList = res.data;
      });
    },
    getStationList() {
      this.$api.studyManage
        .getRecordStations({
          siteId: this.siteId
        })
        .then(res => {
          this.stationList = res.data;
        });
    },
    getDataList() {
      this.loading = true;
      this.$api.studyManage
        .getRecordList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          siteId: this.siteId,
          stationId: this.stationId,
          account: this.account,
          courseId: this.courseId
        })
        .then(res => {
          this.loading = false;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
        });
    },
    getCourseList() {
      this.$api.studyManage.getRecordCourses().then(res => {
        this.courseList = res.data;
      });
    },
    change(type) {
      if (type) {
        this.stationList = [];
        this.getStationList();
      }
    }
  }
};
</script>
