<template>
 <div class="g-module">
  <!--筛选-->
  <div class="kf-screen">
   <div class="kf-screen-head">
    <div class="kf-screen-head-cap">筛选</div>
   </div>
   <el-form ref="screenForm" class="kf-form">

    <!--搜索-->
    <div class="kf-row">

     <el-form-item label="课程名称" class="kf-form-item form-sel mr60">
      <el-select v-model="courseId" placeholder="请选择主考课程" @change="selectChange(true)" filterable>
       <el-option label="全部" value=""/>
       <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id">
       </el-option>
      </el-select>
     </el-form-item>

     <el-form-item label="主考院校" class="kf-form-item form-sel mr60" v-if="this.$store.getters.getUserInfo.type == 3">
      <el-select  v-model="siteId" placeholder="请选择主考院校" @change="changes" filterable>
       <el-option label="全部" value=""/>
       <el-option v-for="item in siteList" :key="item.id" :label="item.name" :value="item.id">
       </el-option>
      </el-select>
     </el-form-item>

     <el-form-item label="助学机构" class="kf-form-item form-sel mr60" v-if="this.$store.getters.getUserInfo.type == 3||this.$store.getters.getUserInfo.type == 2">
      <el-select v-model="stationId" placeholder="请选择助学机构" @change="selectChange(true)">
       <el-option label="全部" value=""/>
       <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item.id">
       </el-option>
      </el-select>
     </el-form-item>

     <el-form-item label="状态" class="kf-form-item form-sel mr60">
      <el-select v-model="displayStatus" placeholder="请选择状态" @change="selectChange(true)" filterable>
       <el-option label="全部" value=""/>
       <el-option label="显示" :value="1"/>
       <el-option label="隐藏" :value="0"/>
      </el-select>
     </el-form-item>


     <el-form-item class="kf-form-item form-search">
      <el-input placeholder="请输入手机号" v-model="phone" style="width: 296px;">
       <el-button slot="append" class="form-search-ico" @click="select">搜索</el-button>
      </el-input>
     </el-form-item>

    </div>
   </el-form>
  </div>
  <div class="kf-bd">

   <!--表格导航-->
   <div class="kf-table-nave">
    <div class="kf-btn">笔记列表</div>
   </div>

   <!--表格-->
   <el-table v-loading="loading" :data="tableData" border class="kf-table" style="width: 100%">
    <el-table-column type="index" :index="(index) => (pageNum - 1) * pageSize + index + 1" label="序号"
                     width="50">
    </el-table-column>
    <el-table-column prop="phone" label="手机号">
    </el-table-column>
    <el-table-column prop="nick" label="昵称">
    </el-table-column>
    <el-table-column prop="name" label="姓名">
    </el-table-column>
    <el-table-column prop="title" label="笔记名称">
    </el-table-column>
    <el-table-column prop="content" label="内容" width="320" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="course" label="所属课程">
    </el-table-column>
    <el-table-column prop="site" label="主考院校">
    </el-table-column>
    <el-table-column prop="station" label="助学机构">
    </el-table-column>
    <el-table-column prop="displayStatus" label="状态" :formatter="formats">
    </el-table-column>
    <el-table-column
            fixed="right"
            label="操作"
            width="200">
     <template slot-scope="scope">
      <el-button type="text" size="small" class="kf-table-scopeBtn" @click="show(scope.row)" v-if="extra.indexOf('查看')>-1" >查看</el-button>
      <!--<baseSeeBtn @click.native="show(false,scope)"></baseSeeBtn>-->
      <el-button type="text" size="small" class="kf-table-scopeBtn" @click="changeStatus(scope.row.id)" v-show="scope.row.displayStatus==0" v-if="extra.indexOf('显示隐藏')>-1" >显示</el-button>
      <el-button type="text" size="small" class="kf-table-scopeBtn"  @click="changeStatus(scope.row.id)" v-show="scope.row.displayStatus==1" v-if="extra.indexOf('显示隐藏')>-1">隐藏</el-button>
      <baseDelBtn delUrl="/study/studentNote" :delId="scope.row.id" :delOk="selectChange" v-if="extra.indexOf('删除')>-1"></baseDelBtn>
     </template>
    </el-table-column>
   </el-table>

   <!--分页start-->
   <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                  :page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                  layout="total, sizes, prev, pager, next, jumper" :total="total" class="kf-pagination">
   </el-pagination>
   <!--分页end-->
  </div>

  <!--弹窗-->
  <el-dialog
          title="查看"
          :visible.sync="dialogVisible"
          width="760px"
          center
          :append-to-body="true"
          class="kf-dialog-add">
   <el-form ref="formData" :model="formData" label-width="120px" class="kf-form-add"  v-loading="zLoading">

    <div v-if="noteDetail" class="noteDetail">
     <el-row>
      <el-col :span="8">
       手机号 : {{noteDetail.phone}}
      </el-col>
      <el-col :span="8">
       姓名 : {{noteDetail.name}}
      </el-col>
      <el-col :span="8">
       所属课程 : {{noteDetail.course}}
      </el-col>
     </el-row>
     <el-row>
      <el-col :span="8">
       助学机构 : {{noteDetail.station}}
      </el-col>
      <el-col :span="8">
       状态 : {{noteDetail.displayStatus===1?'显示':'隐藏'}}
      </el-col>
     </el-row>
     <el-row>
      <el-col>
       笔记名称 : {{noteDetail.title}}
      </el-col>
     </el-row>
     <label>内容 : </label>
     <div class="noteDelCon" v-html="noteDetail.content">

     </div>
    </div>

   </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible=false">关 闭</el-button>
   </div>
  </el-dialog>
 </div>
</template>

<script>
import studyManage from "@/mixin/studyManage";
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      loading: false,
      total: 0,
      phone: "",
      displayStatus: "",
      formData: {
        ableStatus: 1
      },
      actionType: true,
      // isSee: false,
      dialogVisible: false,
      isReply: false,
      stationList: [],
      stationId: "",
      siteList: [],
      siteId: "",
      courseId: "",
      noteDetail: null,
      zLoading: false,
      extra: [],
      courseList: []
    };
  },
  components: {},
  mounted() {
    this.getDataList();
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
  },
  watch: {
    phone: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  mixins: [studyManage],
  methods: {
    changes() {
      this.stationList = [];
      this.getStationList();
      this.selectChange(true);
    },
    getCourseList() {
      this.$api.studyManage.getNoteCourses().then(res => {
        this.courseList = res.data;
      });
    },
    getStationList() {
      this.$api.studyManage
        .getNoteStations({
          siteId: this.siteId
        })
        .then(res => {
          this.stationList = res.data;
        });
    },
    getSiteList() {
      this.$api.studyManage.getNoteSites().then(res => {
        this.siteList = res.data;
      });
    },
    getDataList() {
      this.loading = true;
      this.$api.studyManage
        .getNoteList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          siteId: this.siteId,
          stationId: this.stationId,
          courseId: this.courseId,
          displayStatus: this.displayStatus,
          phone: this.phone
        })
        .then(res => {
          this.extra = res.data.extra;
          this.loading = false;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
        });
    },
    show(actionType, row, isReply) {
      this.actionType = actionType;
      this.isReply = isReply;
      // if(!actionType){
      this.formData = Object.assign({}, row);
      // }
      this.dialogVisible = true;
    },
    formats(row, col) {
      if (col.property === "displayStatus") {
        switch (row.displayStatus) {
          case 1:
            return "显示";
          case 0:
            return "隐藏";
        }
      }
    },
    close() {},
    select() {
      if (!this.phone) return;
      this.selectChange(true);
    },
    changeStatus(id) {
      this.$api.studyManage.changeNoteStatus(id).then(res => {
        this.actionMes(res.msg);
      });
    },
    show(row) {
      if (row === null || row === undefined) return;
      this.actionRow = Object.assign({}, row);
      this.dialogVisible = true;
      this.zLoading = true;
      this.$api.studyManage.seeNote(row.id).then(res => {
        this.noteDetail = res.data;
        this.zLoading = false;
      });
    }
  }
};
</script>
<style lang="less">
.noteDetail {
  line-height: 25px;
  font-size: 16px;
}
.noteDelCon {
  line-height: 20px;
  max-height: 500px;
  overflow: auto;
}
</style>
