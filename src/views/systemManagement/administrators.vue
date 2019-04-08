<template>
  <!--<div class="g-module">
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="搜索" class="kf-form-item form-search">
            <el-input placeholder="请输入手机号" v-model="tableForm.phone">
              <el-button slot="append" class="form-search-ico" @click="searchChange">搜索</el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="kf-bd">
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">管理员列表</div>
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
          prop="phone"
          label="账号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="160">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色"
          width="160">
        </el-table-column>
        <el-table-column
          prop="site"
          label="院校"
          width="200">
        </el-table-column>
        <el-table-column
          prop="roleType"
          label="账号类别"
          width="160">
          <template slot-scope="scope">
            {{scope.row.roleType==0?"普通":scope.row.roleType==1?"助考院校":scope.row.roleType==2?"主考院校":scope.row.roleType==3?"超管":""}}
          </template>
        </el-table-column>
        <el-table-column
          label="头像"
          width="120">
          <template slot-scope="scope">
            <tableCover :url="$config.HOST_API+scope.row.avatar"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="email">
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
          label="状态">
          <template slot-scope="scope">
            {{scope.row.ableStatus?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="reset_btn(scope.row)" v-if="extra.indexOf('重置管理员密码')>-1">重置</el-button>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small ml10" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="system/admin" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
          </template>
        </el-table-column>
      </el-table>-->


  
    <div class="schoolManagementWrap">
  	<el-card class="pageCard">
  		<div class="pageHead flexItem">
  			<span class='label'>管理员</span>
 				<div class="marL10">
 					<el-input v-model="tableForm.phone" class='searchInp' placeholder="请输入账号">
 					 <el-button slot="append" icon="el-icon-search" @click="searchChange()"></el-button>
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
          prop="phone"
          label="账号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="160">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色"
          width="160">
        </el-table-column>
        <el-table-column
          prop="site"
          label="院校"
          width="200">
        </el-table-column>
        <el-table-column
          prop="roleType"
          label="账号类别"
          width="160">
          <template slot-scope="scope">
            {{scope.row.roleType==0?"普通":scope.row.roleType==1?"助考院校":scope.row.roleType==2?"主考院校":scope.row.roleType==3?"超管":""}}
          </template>
        </el-table-column>
        <el-table-column
          label="头像"
          width="120">
          <template slot-scope="scope">
            <tableCover :url="scope.row.avatar"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="email">
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
          label="状态">
          <template slot-scope="scope">
            {{scope.row.ableStatus?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="320">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="reset_btn(scope.row)" v-if="extra.indexOf('重置管理员密码')>-1">重置</el-button>
            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small ml10" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
            <baseDelBtn delUrl="system/admin" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
      <!--表单-->
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <template>
          <el-form-item label="手机" prop="phone">
            <el-input v-model.trim="form.phone" :disabled="dialogType==1"  maxlength="11" placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="form.name" :disabled="dialogType==1"  maxlength="11" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model.trim="form.roleId" placeholder="请选择" :disabled="dialogType==1"  class="kf-form-item form-sel" style="width: 100%">
              <el-option
                v-for="(item, index) in role_list"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="form.email" :disabled="dialogType==1" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </template>
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
  	   var validatePhone = (rule, value, callback) => {
//	   	alert(2)
//      if (value === '') {
//      	 	alert(3)
//        callback(new Error('请输入手机号'));
//      } else {
//      	let reg=/^1[34578]\d{9}$/;
//        if (!(reg.test(val))) {
//        	alert(1)
//         return   callback(new Error('手机号格式不对'));
//        }
//        alert(4)
//        callback();
//      }
        let reg=/^1[34578]\d{9}$/;
          if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (!(reg.test(value))) {
        	
          callback(new Error('手机号格式不对!'));
        } else {
          callback();
        }
      };
  
    return {
      extra: [],
      tableLoading: true,
      tableForm: {
        phone: ""
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
        name: "", //名称
        roleId: "", //角色id
        phone: "", //手机号
        email: "", //邮箱
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      },
      rulesForm: {
        name: [
          { required: true, message: "请输入姓名", trigger: "change" },
          {
            min: 1,
            max: 20,
            message: "最长 20 个字符",
            trigger: "change"
          }
        ],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
        phone: [{ required: true,  validator: validatePhone, trigger: "blur" }]
      },
      role_list: []
    };
  },
  // watch: {
  //   "form.phone": function(val) {
  //     this.$nextTick(() => {
  //       if (val) {
  //         val = parseInt(val);
  //         this.form.phone = val ? val : "";
  //       }
  //     });
  //   }
  // },
  components: {},
  mounted() {
  	this.get_role_list()
    this.get_ajax();
  },
  methods: {
    get_role_list(fun) {
      this.$api.systemManagement.administrators_get_role_list().then(res => {
        this.role_list = res.data;
        if (typeof fun === "function") fun();
      });
    },
    //获取数据
    get_ajax() {
      this.tableLoading = true;
      this.$api.systemManagement
        .administrators_get_list({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.tableForm
        })
        .then(res => {
          this.extra = res.data.extra;
          this.tableData = res.data.pageList;
          this.total = +res.data.total;
          this.tableLoading = false;
        });
    },
    ready_ajax() {
      this.pageNum = 1;
      this.get_ajax();
    },
    //显示添加框
    dialogAdd_show() {
      this.get_role_list(() => {
        this.dialogType = 0;
        this.dialogAddVisible = true;
        this.form = {
          name: "", //名称
          roleId: "", //角色id
          phone: "", //手机号
          email: "", //邮箱
          remark: "", //备注
          ableStatus: 1 //启用状态(1启用0禁用)
        };
        this.$nextTick(() => {
          this.$refs["form"].clearValidate();
        });
      });
    },
    //显示编辑框
    dialogEdit_show(row) {
//  	this.
      this.dialogType = 1;
      this.dialogAddVisible = true;
      this.form = {
        id: row.id,
        remark: row.remark, //备注
        ableStatus: row.ableStatus, //启用状态(1启用0禁用)
        name:row.name,
//      roleId:row.roleId,
        phone:row.phone,
        email:row.email
      };
      if(row.roleName){
      	for(let i of this.role_list){
      		if(i.name==row.roleName){
      			this.form.roleId=i.id
      		}
      	}
      }

      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //添加编辑数据
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.systemManagement
          .administrators_get_role_add(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
        this.$api.systemManagement
          .administrators_get_role_edit(this.form)
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
    searchChange() {
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
    },
    reset_btn(row) {
      this.$api.systemManagement
        .administrators_get_role_reset({ id: row.id })
        .then(() => {
          this.$message({
            type: "success",
            message: "重置成功!"
          });
        });
    }
  }
};
</script>
