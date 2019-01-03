<template>
  <!--<div class="g-module">
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="设备类型" class="kf-form-item form-sel mr60">
            <el-select v-model="tableForm.deviceType" placeholder="请选择设备类型" @change="searchSubmit">
              <el-option label="全部" value=""/>
              <el-option label="安卓" :value="1"/>
              <el-option label="苹果" :value="2"/>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="kf-bd">
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">版本列表</div>
          <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="dialogAdd_show" v-if="extra.indexOf('添加')>-1"></div>
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
          prop="title"
          label="更新标题"
          width="200">
        </el-table-column>
        <el-table-column
          prop="updateType"
          label="更新方式"
          width="100">
          <template slot-scope="scope">
            {{scope.row.updateType===1?"版本更新":"热更新修复"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="versionCode"
          label="版本号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="versionName"
          label="版本名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="deviceType"
          label="设备类型"
          width="100">
          <template slot-scope="scope">
            {{scope.row.deviceType===1?"安卓":"苹果"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="forceCheck"
          label="是否强制更新"
          width="130">
          <template slot-scope="scope">
            {{scope.row.forceCheck===1?"强制":"不强制"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="download"
          label="新版apk或补丁下载地址"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="content"
          :show-overflow-tooltip="true"
          label="版本更新消息">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="dialogEdit_show(scope.row)"
                       v-if="extra.indexOf('编辑')>-1">编辑
            </el-button>
            <baseDelBtn delUrl="system/appVersion" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
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
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="140px" class="kf-form-add">
        <el-form-item label="更新标题" prop="title">
          <el-input v-model.trim="form.title" placeholder="请输入更新标题"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="versionCode">
          <el-input v-model.trim="form.versionCode" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item label="版本名称" prop="versionName">
          <el-input v-model.trim="form.versionName" placeholder="请输入版本名称"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceType">
          <el-radio-group v-model.trim="form.deviceType">
            <el-radio :label="1">安卓</el-radio>
            <el-radio :label="2">苹果</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="更新方式" prop="updateType">
          <el-radio-group v-model.trim="form.updateType">
            <el-radio :label="1">版本更新</el-radio>
            <el-radio :label="2">热更新修复</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否强制更新" prop="forceCheck">
          <el-radio-group v-model.trim="form.forceCheck">
            <el-radio :label="1">强制</el-radio>
            <el-radio :label="0">不强制</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="app地址" prop="download">
          <el-input v-model.trim="form.download" placeholder="请输入新版apk或补丁下载地址(苹果为appStore地址)"></el-input>
        </el-form-item>
        <el-form-item label="版本更新消息" prop="content">
          <el-input type="textarea" :rows="6" v-model.trim="form.content" placeholder="请输入版本更新消息"></el-input>
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
  			<span class='label'>版本号</span>
 				<div class="marL10">
 					<!--searchInp-->
 					<el-input v-model="tableForm.name" class='searchInp' placeholder="请输入内容">
 					 <el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
 					</el-input>
 				</div>
 				<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show'>
 					添加
 				</div>
 				<!--<div  class="comTopResetBtn comTopBlueBtn topBtn  marL10">
 					重置
 				</div>-->
 				<!--<div  class="comTopReleteBtn  comTopOrangeBtn topBtn marL10">
 					关联函授站
 				</div>-->
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
          prop="title"
          label="更新标题"
          width="200">
        </el-table-column>
        <el-table-column
          prop="updateType"
          label="更新方式"
          width="100">
          <template slot-scope="scope">
            {{scope.row.updateType===1?"版本更新":"热更新修复"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="versionCode"
          label="版本号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="versionName"
          label="版本名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="deviceType"
          label="设备类型"
          width="100">
          <template slot-scope="scope">
            {{scope.row.deviceType===1?"安卓":"苹果"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="forceCheck"
          label="是否强制更新"
          width="130">
          <template slot-scope="scope">
            {{scope.row.forceCheck===1?"强制":"不强制"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="download"
          label="新版apk或补丁下载地址"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="content"
          :show-overflow-tooltip="true"
          label="版本更新消息">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="dialogEdit_show(scope.row)"
                       v-if="extra.indexOf('编辑')>-1">编辑
            </el-button>
            <baseDelBtn delUrl="system/appVersion" :delId="scope.row.id" :delOk="ready_ajax" v-if="extra.indexOf('删除')>-1"/>
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
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="140px" class="kf-form-add">
        <el-form-item label="更新标题" prop="title">
          <el-input v-model.trim="form.title" placeholder="请输入更新标题"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="versionCode">
          <el-input v-model.trim="form.versionCode" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item label="版本名称" prop="versionName">
          <el-input v-model.trim="form.versionName" placeholder="请输入版本名称"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceType">
          <el-radio-group v-model.trim="form.deviceType">
            <el-radio :label="1">安卓</el-radio>
            <el-radio :label="2">苹果</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="更新方式" prop="updateType">
          <el-radio-group v-model.trim="form.updateType">
            <el-radio :label="1">版本更新</el-radio>
            <el-radio :label="2">热更新修复</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否强制更新" prop="forceCheck">
          <el-radio-group v-model.trim="form.forceCheck">
            <el-radio :label="1">强制</el-radio>
            <el-radio :label="0">不强制</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="app地址" prop="download">
          <el-input v-model.trim="form.download" placeholder="请输入新版apk或补丁下载地址(苹果为appStore地址)"></el-input>
        </el-form-item>
        <el-form-item label="版本更新消息" prop="content">
          <el-input type="textarea" :rows="6" v-model.trim="form.content" placeholder="请输入版本更新消息"></el-input>
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
    let checkVersionName = (rule, value, callback) => {
      let reg = /^\d+\.\d+\.\d+$/;
      if (value) {
        if (reg.test(value)) {
          return callback();
        } else {
          return callback(new Error("请按照0.0.0格式输入版本名称"));
        }
      } else {
        return callback(new Error("请输入版本名称"));
      }
    };
    return {
      extra: [],
      tableForm: {
        deviceType: ""
      },
      tableLoading: true,
      tableData: [],
      //分页——start
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //分页——end
      dialogAddVisible: false,
      dialogType: 0,
      form: {
        versionCode: "", //版本号
        versionName: "", //版本名称
        forceCheck: "", //是否强制更新，1强制，0不强制
        download: "", //新版apk或补丁下载地址(苹果为appStore地址)
        deviceType: "", //设备类型1安卓2苹果
        updateType: "", //1版本更新2热更新修复
        title: "", //更新标题
        content: "" //版本更新消息
      },
      rulesForm: {
        versionCode: [
          { required: true, message: "请输入版本号", trigger: "change" }
        ],
        versionName: [
          {
            required: true,
            validator: checkVersionName,
            trigger: "blur"
          }
        ],
        forceCheck: [
          { required: true, message: "请选择是否强制更新", trigger: "change" }
        ],
        download: [
          {
            required: true,
            message: "请输入新版apk或补丁下载地址(苹果为appStore地址)",
            trigger: "change"
          }
        ],
        deviceType: [
          { required: true, message: "请选择设备类型", trigger: "change" }
        ],
        updateType: [
          { required: true, message: "请选择更新方式", trigger: "change" }
        ],
        title: [
          { required: true, message: "请输入更新标题", trigger: "change" }
        ],
        content: [
          { required: true, message: "请输入版本更新消息", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    "form.versionCode": function(val) {
      this.$nextTick(() => {
        let value = parseInt(val);

        if (value) {
          value = String(value);
        } else {
          value = "";
        }
        this.form.versionCode = value;
      });
    }
  },
  components: {},
  mounted() {
    this.get_ajax();
  },
  methods: {
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.systemManagement
        .appVersion_get_list({
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
    //显示添加框
    dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
      this.form = {
        versionCode: "", //版本号
        versionName: "", //版本名称
        forceCheck: 1, //是否强制更新，1强制，0不强制
        download: "", //新版apk或补丁下载地址(苹果为appStore地址)
        deviceType: 1, //设备类型1安卓2苹果
        updateType: 1, //1版本更新2热更新修复
        title: "", //更新标题
        content: "" //版本更新消息
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
        versionCode: row.versionCode, //版本号
        versionName: row.versionName, //版本名称
        forceCheck: row.forceCheck, //是否强制更新，1强制，0不强制
        download: row.download, //新版apk或补丁下载地址(苹果为appStore地址)
        deviceType: row.deviceType, //设备类型1安卓2苹果
        updateType: row.updateType, //1版本更新2热更新修复
        title: row.title, //更新标题
        content: row.content //版本更新消息
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.systemManagement.appVersion_add(this.form).then(() => {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.dialogAddVisible = false;
          this.ready_ajax();
        });
      } else {
        this.$api.systemManagement.appVersion_edit(this.form).then(() => {
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
      this.ready_ajax();
    }
  }
};
</script>
<style lang="less">
.kf-form-imgUp {
  .el-upload__tip {
  }
}

.kf-form-imgUp-head {
  display: flex;
  align-items: center;
  .el-upload__tip {
    margin-top: 0;
    margin-left: 20px;
  }
}

.kf-form-imgUp-img {
  display: block;
  max-width: 100%;
  margin-top: 10px;
}
</style>
