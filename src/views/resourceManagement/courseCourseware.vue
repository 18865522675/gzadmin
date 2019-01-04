<template>
  <!--<div class="g-module">
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="课程名称" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.courseId" placeholder="请选择" filterable @change="searchChange(1)">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in listCourse"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="课件版本号" class="kf-form-item form-sel mr40">
            <el-select v-model="tableForm.version" placeholder="请选择" :disabled="!listVersion.length||!tableForm.courseId" @change="searchChange(2)">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in listVersion"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd">
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">课件列表</div>
          <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="dialogAdd_show" v-if="extra.indexOf('添加')>-1"></div>
          <div class="kf-btn kf-btn-table ml20" @click="batchEnabled" v-if="extra.indexOf('启用')>-1">启用</div>
          <div class="kf-btn kf-btn-table ml20" @click="batchDisable" v-if="extra.indexOf('禁用')>-1">禁用</div>
        </div>
        <div class="kf-table-nave-right">
          <download url="resource/ware/downloadMould" v-if="extra.indexOf('下载模版')>-1"/>
          <upload url="resource/ware/upload" class="ml20" :ok="ready_ajax" v-if="extra.indexOf('批量上传')>-1"/>
        </div>
      </div>

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
          label="课件名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="code"
          label="课件编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="version"
          label="课件版本号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="所属课程">
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="讲师">
        </el-table-column>
        <el-table-column
          prop="teacherSummary"
          :show-overflow-tooltip="true"
          label="讲师简介">
        </el-table-column>
        <el-table-column
          prop="playUrl"
          :show-overflow-tooltip="true"
          label="播放地址">
        </el-table-column>
        <el-table-column
          prop="coverUrl"
          label="封面"
          width="120">
          <template slot-scope="scope">
            <tableCover :url="scope.row.coverUrl"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="duration"
          label="时长（秒）"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="顺序号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          :formatter="$fun.table.time"
          width="160">
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
          label="预览">
          <template slot-scope="scope">
            <a href="javascript:;" class="kf-table-link" @click="dialogVideo_show(scope.row)">预览</a>
          </template>
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
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="resource/ware" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
          </template>
        </el-table-column>
      </el-table>

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
 

    </div>
    <el-dialog
      :title="dialogType===0?'添加':'编辑'"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="课件名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入课件名称（不超过50个字）"></el-input>
        </el-form-item>
        <el-form-item label="课件编码" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入课件编码（不超过8个字）"></el-input>
        </el-form-item>
        <el-form-item label="课程" prop="courseId">
          <el-select v-model.trim="form.courseId" filterable placeholder="请选择课程" class="kf-form-item form-sel" style="width: 100%">
            <el-option
              v-for="(item, index) in listCourse"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课件版本" prop="version">
          <el-input v-model.trim="form.version" placeholder="请输入课件版本（不超过8个字）"></el-input>
        </el-form-item>
        <el-form-item label="讲师" prop="teacher">
          <el-input v-model.trim="form.teacher" placeholder="请输入讲师名称（不超过20个字）"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介" prop="teacherSummary">
          <el-input v-model.trim="form.teacherSummary" placeholder="请输入讲师简介（不超过50个字）"></el-input>
        </el-form-item>
        <el-form-item label="播放地址" prop="playUrl">
          <el-input v-model.trim="form.playUrl" placeholder="请输入播放地址（不超过255个字）"></el-input>
        </el-form-item>
        <el-form-item label="封面地址" prop="coverUrl">
          <el-input v-model.trim="form.coverUrl" placeholder="请输入封面地址（不超过255个字）"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="duration">
          <el-input v-model.trim="form.duration" placeholder="请输入时长（不超过100个字）"></el-input>
        </el-form-item>
        <el-form-item label="顺序号" prop="sort">
          <el-input v-model.trim="form.sort" placeholder="请输入顺序号"></el-input>
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>


		
  </div>-->
  
  
  	
  	 <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
  			<span class='label'>课程</span>
 				<div class="marL10">
 					<!--searchInp-->
 					<!--<el-input v-model="input" class='searchInp' placeholder="请输入内容">
 					 <el-button slot="append" icon="el-icon-search"  @click="get_ajax() "></el-button>
 					</el-input>-->
 					<el-select v-model="tableForm.courseId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
              <el-option label="所有" value=""/>
              <el-option
                v-for="(item, index) in listCourse"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
 				</div>
 				<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show'>
 					添加
 				</div>
 	      <download url="resource/ware/downloadMould" />
          <upload url="resource/ware/upload" class="ml20" :ok="ready_ajax" v-if="extra.indexOf('批量上传')>-1"/>
  		</div>
  		
  		
  		<div class="pageCon">
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
          label="课件名称">
        </el-table-column>
        <el-table-column
          prop="code"
          label="课件编码">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="所属课程">
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="讲师">
        </el-table-column>
        <el-table-column
          prop="teacherSummary"
          :show-overflow-tooltip="true"
          label="讲师简介">
        </el-table-column>
        <el-table-column
          prop="url"
          :show-overflow-tooltip="true"
          label="播放地址">
        </el-table-column>
        <el-table-column
          prop="coverUrl"
          label="封面"
          width="120">
          <template slot-scope="scope">
            <tableCover :url="scope.row.coverUrl"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="times"
          label="时长（秒）"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sorting"
          label="顺序号">
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
          label="预览">
          <template slot-scope="scope">
            <a href="javascript:;" class="kf-table-link" @click="dialogVideo_show(scope.row)">预览</a>
          </template>
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
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small kf-orange-btn" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="resource/ware" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
              <el-button type="text" size="small" class="kf-btn kf-btn-table small kf-orange-btn" style="margin-left: 10px;" @click="ableAction(scope.row.id,true)" v-if="scope.row.ableStatus==0">启用</el-button>
              <el-button type="text" size="small" class="kf-btn kf-btn-table small kf-orange-btn" style="margin-left: 10px;" @click="ableAction(scope.row.id,false)" v-else>禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  		</div>
  		
  		
  		  <el-dialog
      :title="dialogType===0?'添加':'编辑'"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="课件名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入课件名称（不超过50个字）"></el-input>
        </el-form-item>
        <el-form-item label="课件编码" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入课件编码（不超过8个字）"></el-input>
        </el-form-item>
        <el-form-item label="课程" prop="courseId">
          <el-select v-model.trim="form.courseId" filterable placeholder="请选择课程" class="kf-form-item form-sel" style="width: 100%">
            <el-option
              v-for="(item, index) in listCourse"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="课件版本" prop="version">
          <el-input v-model.trim="form.version" placeholder="请输入课件版本（不超过8个字）"></el-input>
        </el-form-item>-->
        <el-form-item label="讲师" prop="teacher">
          <el-input v-model.trim="form.teacher" placeholder="请输入讲师名称（不超过20个字）"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介" prop="teacherSummary">
          <el-input v-model.trim="form.teacherSummary" placeholder="请输入讲师简介（不超过50个字）"></el-input>
        </el-form-item>
        <el-form-item label="播放地址" prop="url">
          <el-input v-model.trim="form.url" placeholder="请输入播放地址（不超过255个字）"></el-input>
        </el-form-item>
        <el-form-item label="封面地址" prop="logo">
          <el-input v-model.trim="form.logo" placeholder="请输入封面地址（不超过255个字）"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="times">
          <el-input v-model.trim="form.times" placeholder="请输入时长（不超过100个字）"></el-input>
        </el-form-item>
        <el-form-item label="顺序号" prop="sorting">
          <el-input v-model.trim="form.sorting" placeholder="请输入顺序号"></el-input>
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>	
    
  	</el-card>
  </div>
  
  
</template>

<script>
export default {
  data() {
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        courseId: "",
        version: ""
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
        name: "", //课件名称
        code: "", //课件编码
        courseId: "", //课程id
//      version: "", //课件版本号
        teacher: "", //课程讲师
        teacherSummary: "", //讲师简介
        url: "", //播放地址
        logo: "", //封面地址
        times: "", //时长
        sorting: "", //顺序号
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      },
      rulesForm: {
        name: [
          { required: true, message: "请输入课件名称", trigger: "change" },
          {
            min: 1,
            max: 50,
            message: "最长 50 个字符",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入课件编码", trigger: "change" },
          {
            min: 1,
            max: 8,
            message: "最长 8 个字符",
            trigger: "change"
          }
        ],
        courseId: [{ required: true, message: "请选择课程", trigger: "change" }],
//      version: [
//        { required: true, message: "请输入课件版本", trigger: "blur" },
//        {
//          min: 1,
//          max: 8,
//          message: "最长 8 个字符",
//          trigger: "change"
//        }
//      ],
        teacher: [
          {
            min: 1,
            max: 20,
            message: "最长 20 个字符",
            trigger: "change"
          }
        ],
        teacherSummary: [
          {
            min: 1,
            max: 50,
            message: "最长 50 个字符",
            trigger: "change"
          }
        ],
        url: [
          { required: true, message: "请输入播放地址", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "最长 255 个字符",
            trigger: "change"
          }
        ],
        logo: [
          { required: true, message: "请输入封面地址", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "最长 255 个字符",
            trigger: "change"
          }
        ],
        times: [
          { required: true, message: "请输入时长", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "最长 100 个字符",
            trigger: "change"
          }
        ],
        sorting: [{ required: true, message: "请输入顺序号", trigger: "blur" }],
        remark: [
          {
            min: 1,
            max: 255,
            message: "最长 255 个字符",
            trigger: "change"
          }
        ]
      },
      listCourse: [],
      listVersion: []
    };
  },
  watch: {
    "form.duration": function(val) {
      this.$nextTick(() => {
        let value = parseInt(val);

        if (value) {
          value = String(value);
        } else {
          value = "";
        }
        this.form.duration = value;
      });
    },
    "form.sort": function(val) {
      this.$nextTick(() => {
        let value = parseInt(val);

        if (value) {
          value = String(value);
        } else {
          value = "";
        }
        this.form.sort = value;
      });
    }
  },
  components: {},
  mounted() {
    this.get_listCourse();
    this.get_ajax();
  },
  methods: {
    //课程列表
      ableAction(id,type){
          if(type){
              this.$api.resourceManagement.courseCourseware_enable({
                  wareId:id
              }).then((res)=>{
                  this.$message.success("启用成功");
                  this.ready_ajax()
              }).catch(()=>{
                  this.$message.error("启用失败")
              })
              return
          }

          this.$api.resourceManagement.courseCourseware_disable({
              wareId:id
          }).then((res)=>{
              this.$message.success("禁用成功");
              this.ready_ajax()
          }).catch(()=>{
              this.$message.error("禁用失败")
          })
      },
    get_listCourse() {
      this.$api.resourceManagement
        .courseCourseware_get_listCourse()
        .then(res => {
          this.listCourse = res.data;
        });
    },
    //课件版本号
    get_listVersion() {
      this.$api.resourceManagement
        .courseCourseware_get_listVersion({
          courseId: this.tableForm.courseId
        })
        .then(res => {
          this.listVersion = res.data;
          this.tableForm.version = "";
        });
    },
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.resourceManagement
        .courseCourseware_get_list({
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
    //搜索选择框
    searchChange(type) {
      switch (type) {
        case 1:
          if (this.tableForm.courseId) {
            this.get_listVersion();
          } else {
            this.tableForm.version = "";
          }
          break;
      }
      this.ready_ajax();
    },
    //显示添加框
    dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
      this.form = {
        name: "", //课件名称
        code: "", //课件编码
        courseId: "", //课程id
//      version: "", //课件版本号
        teacher: "", //课程讲师
        teacherSummary: "", //讲师简介
       	url: "", //播放地址
        logo: "", //封面地址
       	times: "", //时长
        sorting: "", //顺序号
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //显示编辑框
    dialogEdit_show(row) {
      this.dialogType = 1;
      this.dialogAddVisible = true;
      this.form = {
        id: row.id,
        name: row.name, //课件名称
        code: row.code, //课件编码
        courseId: row.courseId, //课程id
//      version: row.version, //课件版本号
        teacher: row.teacher, //课程讲师
        teacherSummary: row.teacherSummary, //讲师简介
        url: row.url, //播放地址
        logo: row.logo, //封面地址
        times: row.times, //时长
        sorting: row.sorting, //顺序号
        remark: row.remark, //备注
        ableStatus: row.ableStatus //启用状态(1启用0禁用)
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.resourceManagement
          .courseCourseware_add(this.form)
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
          .courseCourseware_edit(this.form)
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
    //显示视频弹窗
    dialogVideo_show(row) {
      this.$store.commit("dialogVideo_show", {
        src: row.playUrl,
        poster: row.coverUrl,
        time: row.duration
      });
    },
    //批量启用
    batchEnabled() {
      if (!this.tableForm.courseId) {
        this.$message.warning("请选择课程名称");
        return;
      }
//    if (!this.tableForm.version) {
//      this.$message.warning("课件版本号");
//      return;
//    }
      this.$api.resourceManagement
        .courseCourseware_enable({
          courseId: this.tableForm.courseId,
          version: this.tableForm.version
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "启用成功!"
          });
          this.ready_ajax();
        });
    },
    //批量禁用
    batchDisable() {
      if (!this.tableForm.courseId) {
        this.$message.warning("请选择课程名称");
        return;
      }
//    if (!this.tableForm.version) {
//      this.$message.warning("课件版本号");
//      return;
//    }
      this.$api.resourceManagement
        .courseCourseware_disable({
          courseId: this.tableForm.courseId,
          version: this.tableForm.version
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "禁用成功!"
          });
          this.ready_ajax();
        });
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
