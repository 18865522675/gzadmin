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

     <el-form-item label="直播状态" class="kf-form-item form-sel mr60">
      <el-select v-model="playStatus" placeholder="请选择直播状态" @change="selectChange(true)" filterable>
       <el-option label="全部" value=""/>
       <el-option label="未开始" :value="0"/>
       <el-option label="播放中" :value="1"/>
       <el-option label="已结束" :value="2"/>
       <!--<el-option-->
               <!--v-for="item in courseList"-->
               <!--:key="item.id"-->
               <!--:label="item.name"-->
               <!--:value="item.id">-->
       <!--</el-option>-->
      </el-select>
     </el-form-item>

     <el-form-item  class="kf-form-item form-search">
      <el-input placeholder="请输入标题" v-model="title" style="width: 296px;">
       <el-button slot="append" class="form-search-ico" @click="search">搜索</el-button>
      </el-input>
     </el-form-item>
    </div>
   </el-form>
  </div>
  <div class="kf-bd">
   <!--表格导航-->
   <div class="kf-table-nave" style="justify-content:flex-start">
    <div class="kf-table-nave-left">
     <div class="kf-btn">直播列表</div>
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
            prop="title"
            label="标题"  :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column
            prop="content"
            label="内容"   :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column
            prop="type"
            label="类别">
    </el-table-column>
    <el-table-column
            prop="course"
            label="所属课程">
    </el-table-column>
    <el-table-column
            prop="teacher"
            label="讲师">
    </el-table-column>
    <el-table-column
            prop="viewCount"
            label="观看次数">
    </el-table-column>
    <el-table-column
            prop="viewCount"
            label="实时在线人数">
    </el-table-column>
    <el-table-column
            prop="site"
            label="直播日志">
     <template slot-scope="scope">
      <el-tooltip class="item" effect="dark" content="点击查看评论" placement="top">
       <span style="color:#5e4faa;cursor: pointer" @click="$router.push(`/guideManage/videoNote/${scope.row.title}/${scope.row.teacher}/${scope.row.course}/${scope.row.id}`)">******</span>
      </el-tooltip>
     </template>
    </el-table-column>
    <el-table-column
            prop="startTime"
            label="直播开始时间" :formatter="$fun.table.time">
    </el-table-column>
    <el-table-column
            prop="endTime"
            label="直播结束时间"  :formatter="$fun.table.time">
    </el-table-column>
    <el-table-column
            prop="playUrl"
            label="播放地址" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column
            width="120"
            label="封面地址">
     <template slot-scope="scope">
      <tableCover :url="scope.row.coverUrl"/>
     </template>
    </el-table-column>
    <el-table-column
            prop="publishUrl"
            label="发布地址"  :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column
            prop="playbackUrl"
            label="回放地址"  :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column
            prop="sort"
            label="顺序号">
    </el-table-column>
    <el-table-column
            prop="notice"
            label="房间公告" :show-overflow-tooltip="true">
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
            prop="playStatus"
            label="播放状态" :formatter="formats">
    </el-table-column>
    <el-table-column
            prop="ableStatus"
            label="状态"  :formatter="formats" >
    </el-table-column>
    <el-table-column
            fixed="right"
            label="操作"
            width="200">
     <template slot-scope="scope">
      <el-button type="text" size="small" class="kf-table-scopeBtn"  @click="dialogVideo_show(scope.row)"  v-if="extra.indexOf('预览')>-1">预览</el-button>
      <!--<baseModifyBtn  @click.native="show(false,scope.row)"></baseModifyBtn>-->
      <el-button  type="text" size="small" class="kf-table-scopeBtn"  @click="show(false,scope.row)"  v-if="extra.indexOf('编辑')>-1">编辑</el-button>
      <baseDelBtn delUrl="/tutor/liveVideo" :delId="scope.row.id" :delOk="selectChange"  v-if="extra.indexOf('删除')>-1"></baseDelBtn>
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
    <el-form-item label="标题" prop="title">
     <el-input v-model.trim="formData.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="直播类别" prop="typeId">
     <el-select v-model="formData.typeId" placeholder="请选择直播类别" class="kf-form-item form-sel" style="width: 100%">
      <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
      </el-option>
     </el-select>
    </el-form-item>
    <el-form-item label="所属课程" prop="courseId">
     <el-select v-model="formData.courseId" placeholder="请选择所属课程" class="kf-form-item form-sel" style="width: 100%" filterable>
      <el-option
              v-for="item in courseList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
      </el-option>
     </el-select>
    </el-form-item>
    <el-form-item label="讲师" prop="teacherId">
     <el-select v-model="formData.teacherId" placeholder="请选择讲师" class="kf-form-item form-sel" style="width: 100%">
      <el-option label="不定" value=" "></el-option>
      <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
      </el-option>
     </el-select>
    </el-form-item>
    <el-form-item label="开播时间" prop="startTime">
     <el-date-picker
             v-model="formData.startTime"
             type="datetime"
             placeholder="选择日期时间"  style="width:100%">
     </el-date-picker>
     <!--<el-input v-model.trim="formData.startTime" placeholder="请输入开播时间"></el-input>-->
    </el-form-item>
    <el-form-item label="结束时间" prop="endTime">
     <el-date-picker
             v-model="formData.endTime"
             type="datetime"
             placeholder="选择日期时间" style="width:100%">
     </el-date-picker>
     <!--<el-input v-model.trim="formData.endTime" placeholder="请输入结束时间"></el-input>-->
    </el-form-item>
    <el-form-item label="播放地址" prop="playUrl">
     <el-input v-model.trim="formData.playUrl" placeholder="请输入播放地址"></el-input>
    </el-form-item>
    <el-form-item label="播放封面" prop="coverUrl">
     <el-input v-model.trim="formData.coverUrl" placeholder="请输入封面地址"></el-input>
    </el-form-item>
    <el-form-item label="发布地址" prop="publishUrl">
     <el-input v-model.trim="formData.publishUrl" placeholder="请输入发布地址"></el-input>
    </el-form-item>
    <el-form-item label="回放地址" prop="playbackUrl">
     <el-input v-model.trim="formData.playbackUrl" placeholder="请输入回放地址"></el-input>
    </el-form-item>
    <el-form-item label="房间公告" prop="notice">
     <el-input v-model.trim="formData.notice" placeholder="请输入房间公告"></el-input>
    </el-form-item>
    <el-form-item label="顺序号" prop="sort">
     <el-input v-model.trim.number="formData.sort" placeholder="请输入顺序号"></el-input>
    </el-form-item>
    <el-form-item label="播放状态">
     <el-radio-group>
      <!--<el-radio :label="1">未开始</el-radio>-->
      <el-radio  :checked="true">已结束</el-radio>
     </el-radio-group>
    </el-form-item>
    <el-form-item label="内容" prop="content">
     <el-input type="textarea" v-model.trim="formData.content" maxlength="100" :rows="6" placeholder="输入不超过100个字"></el-input>
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
import guideMixin from "@/mixin/guideMixin";
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
      playStatus: "",
      actionType: true,
      courseId: "",
      title: "",
      courseList: [],
      dialogVisible: false,
      rules: {
        title: [
          { trigger: "blur", message: "请输入标题", required: true },
          { trigger: "blur", max: 50, message: "标题不超过50个字" }
        ],
        startTime: [
          { trigger: "blur", message: "请输入开始时间", required: true }
        ],
        endTime: [
          { trigger: "blur", message: "请输入结束时间", required: true }
        ],
        playbackUrl: [
          { trigger: "blur", message: "请输入回放地址", required: true },
          { trigger: "blur", message: "回放地址最长为255个字符", max: 255 }
        ],
        coverUrl: [{ trigger: "blur", message: "请输入回放地址", max: 255 }],
        content: [{ trigger: "blur", message: "内容最大为100个字", max: 100 }],
        teacherId: [{ trigger: "blur", message: "请选择教师", required: true }],
        typeId: [{ trigger: "blur", message: "请选择类别", required: true }],
        courseId: [{ trigger: "blur", message: "请选择课程", required: true }],
        sort: [{ trigger: "blur", message: "请输入顺序号", required: true }]
      },

      // 添加类别选择
      typeList: [],
      teacherList: [],
      courseList: [],
      extra: []
    };
  },
  mixins: [guideMixin],
  components: {},
  mounted() {
    this.getDataList();
    this.getTypeList();
    this.getCourseList();
    this.getTeacherList();
  },
  watch: {
    title: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    getDataList() {
      this.loading = true;
      this.$api.guideManage
        .getVideoList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          courseId: this.courseId,
          playStatus: this.playStatus,
          title: this.title
        })
        .then(res => {
          this.tableData = res.data.pageList;
          // for (let i of this.tableData) {
          //   for (let  k in i) {
          //     if (typeof i[k]==="string"&&i[k].search("朱斌杰") != -1) {
          //       i[k].replace("朱斌杰", "谭浩");
          //       console.log(123)
          //         console.log(i)
          //
          //   }
          // }
          this.extra = res.data.extra;
          this.total = res.data.total;
          this.loading = false;
        });
    },
    getCourseList() {
      this.$api.guideManage.getVideoCourses().then(res => {
        this.courseList = res.data;
      });
    },
    getTeacherList() {
      this.$api.guideManage.getVideoTeachers().then(res => {
        this.teacherList = res.data;
      });
    },
    getTypeList() {
      this.$api.guideManage
        .getVideoTypes({ pageNum: 1, pageSize: 100 })
        .then(res => {
          this.typeList = res.data;
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
          this.formData.startTime = this.$fun.table.time(
            null,
            null,
            this.formData.startTime
          );
          this.formData.endTime = this.$fun.table.time(
            null,
            null,
            this.formData.endTime
          );
          if (this.actionType) {
            this.$api.guideManage.addVideo(this.formData).then(() => {
              this.actionMes("新增成功");
            });
            return;
          }
          this.$api.guideManage
            .editVideo(this.formData.id, this.formData)
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
      // if (col.property == "playStatus") {
      //   return "已结束";
      // }
      if (col.property == "ableStatus") {
        switch (row.ableStatus) {
          case 1:
            return "开启";
          case 0:
            return "禁用 ";
        }
      }

      if (col.property == "playStatus") {
        switch (row.playStatus) {
          case 0:
            return "未开始";
          case 1:
            return "播放中";
          case 2:
            return "已结束";
          default:
            return "未知";
        }
      }
    },
    search() {
      if (!this.title) return;
      this.selectChange(true);
    },
    //显示视频弹窗
    dialogVideo_show(row) {
      this.$store.commit("dialogVideo_show", {
        src: row.playUrl,
        poster: "",
        time: "未知"
      });
    }
  }
};
</script>
