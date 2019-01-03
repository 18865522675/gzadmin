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
                    <el-form-item label="主考院校" class="kf-form-item form-sel mr60">
                        <el-select v-model="siteId" placeholder="请选择课程" @change="change(true)" filterable>
                            <el-option label="全部" value=""/>
                            <el-option
                                    v-for="item in siteList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="助学机构" class="kf-form-item form-sel mr60">
                        <el-select v-model="stationId" placeholder="请选择课程" @change="change" filterable>
                            <el-option label="全部" value=""/>
                            <el-option
                                    v-for="item in stationList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>



                    <el-form-item label="用户角色" class="kf-form-item form-sel mr60">
                        <el-select v-model="clientRoleType" placeholder="用户角色" @change="change" filterable>
                            <!--<el-option label="全部" value=""/>-->
                            <el-option label="学生" :value="1"/>
                            <el-option label="老师" :value="2"/>
                        </el-select>
                        <el-select v-model="handleStatus" class="ml10" placeholder="请选择处理状态" @change="change" filterable>
                            <el-option label="全部" value=""/>
                            <el-option label="已处理" :value="1"/>
                            <el-option label="未处理" :value="0"/>

                        </el-select>
                    </el-form-item>
                    <!--<el-form-item  class="kf-form-item form-sel mr60">-->

                    <!--</el-form-item>-->

                    <el-form-item  class="kf-form-item form-search">
                        <el-input placeholder="请输入姓名/手机号" v-model="account" style="width: 296px;">
                            <el-button slot="append" class="form-search-ico" @click="search">搜索</el-button>
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="kf-bd">
            <!--表格导航-->
            <div class="kf-table-nave" style="justify-content: flex-start">
                <div class="kf-btn">用户反馈</div>
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
                        prop="site"
                        label="主考院校">
                </el-table-column>
                <el-table-column
                        prop="station"
                        label="助学机构">
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="问题" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="imgUrl"
                        label="问题图片">
                        <template slot-scope="scope">
				            <tableCover :url="scope.row.imgUrl.startsWith('http')?scope.row.imgUrl:$config.HOST_API+scope.row.imgUrl"/>
				          </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间" :formatter="$fun.table.time">
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注">
                </el-table-column>
                <el-table-column
                        prop="handleStatus"
                        label="状态" :formatter="formats">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small" class="kf-table-scopeBtn"  @click="show(scope.row)">编辑</el-button>
                        <baseDelBtn delUrl="/message/feedback" :delId="scope.row.id" :delOk="selectChange"></baseDelBtn>
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
                title="编辑"
                :visible.sync="dialogVisible"
                width="760px"
                center
                :append-to-body="true"
                class="kf-dialog-add" @close="close">
            <el-form ref="formData" :rules="rules" :model="formData" label-width="120px" class="kf-form-add">
                <el-form-item label="状态" prop="handleStatus">
                    <el-radio-group v-model="formData.handleStatus">
                        <el-radio :label="0">待处理</el-radio>
                        <el-radio  :label="1">已处理</el-radio>
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
import studyMixin from "@/mixin/studyManage";
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      siteList: [],
      stationList: [],
      siteId: "",
      stationId: "",
      clientRoleType: 1,
      handleStatus: "",
      account: "",
      formData: {},
      dialogVisible: false
    };
  },
  mixins: [studyMixin],
  components: {},
  mounted() {
    this.getSiteList();
    this.getStationList();
    this.getDataList();
  },
  watch: {
    account: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    show(row) {
      this.formData = Object.assign({}, row);
      this.dialogVisible = true;
    },
    getStationList() {
      this.$api.message
        .getFeedBackStations({
          siteId: this.siteId
        })
        .then(res => {
          this.stationList = res.data;
        });
    },
    getSiteList() {
      this.$api.message.getFeedBackSites().then(res => {
        this.siteList = res.data;
      });
    },
    // changeSite(){
    //     this.stationList=[];
    //     this.getStationList()
    // },
    getDataList() {
      this.loading = true;
      this.$api.message
        .getFeedBackList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          clientRoleType: this.clientRoleType,
          siteId: this.siteId,
          stationId: this.stationId,
          handleStatus: this.handleStatus,
          account: this.account
        })
        .then(res => {
          this.loading = false;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
        });
    },
    formats(row) {
      switch (row.handleStatus) {
        case 1:
          return "已处理";
        case 0:
          return "未处理";
      }
    },
    change(type) {
      if (type) {
        this.stationList = [];
        this.getStationList();
      }
      this.selectChange(true);
    },
    search() {
      if (!this.account) return;
      this.selectChange(true);
    },
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (valid) {
            this.$api.message
              .editFeedBack(this.formData.id, this.formData)
              .then(() => {
                // this.actionMes("编辑成功")
                this.selectChange();
                this.dialogVisible = false;
              });
          } else {
            console.log("error");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
