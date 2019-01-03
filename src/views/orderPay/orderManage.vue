<template>
    <div class="g-module">
        <!--筛选-->
        <div class="kf-screen">
            <div class="kf-screen-head kf-relete-topHead">
                <div class="kf-screen-head-cap">设置</div>
                <div>
                    总金额 : 800000
                </div>
            </div>
            <el-form ref="screenForm" class="kf-form">

                <!--搜索-->
                <div class="kf-row">

                    <el-form-item label="主考院校" class="kf-form-item form-sel mr60">
                        <el-select v-model="siteId" placeholder="请选择主考院校" @change="change(true)" filterable>
                            <el-option label="全部" value=""/>
                            <el-option v-for="item in siteList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="助学机构" class="kf-form-item form-sel mr60">
                        <el-select v-model="stationId" placeholder="请选择助学机构" @change="selectChange(true)">
                            <el-option label="全部" value=""/>
                            <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="状态" class="kf-form-item form-sel mr60">
                        <el-select v-model="payStatus" placeholder="请选择状态" @change="selectChange(true)" filterable>
                            <el-option label="全部" value=""/>
                            <el-option label="已支付" :value="1"/>
                            <el-option label="支付失败" :value="2"/>
                            <el-option label="已退款" :value="3"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="日期范围" class="kf-form-item form-date-range mr40">
                        <el-date-picker
                                v-model="dateRangeValue"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期" @change="selectChange(true)">
                        </el-date-picker>
                    </el-form-item>
                    <!--<el-form-item label="显示状态" class="kf-form-item form-sel mr60">-->
                    <!--<el-select v-model="displayStatus" placeholder="请选择状态" @change="selectChange(true)" filterable>-->
                    <!--<el-option label="全部" value=""/>-->
                    <!--<el-option label="显示" :value="1"/>-->
                    <!--<el-option label="隐藏" :value="0"/>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->


                    <el-form-item class="kf-form-item form-search">
                        <el-input placeholder="请输入订单编号/手机号" v-model="no" style="width: 296px;">
                            <el-button slot="append" class="form-search-ico" @click="select">搜索</el-button>
                        </el-input>
                    </el-form-item>

                </div>
            </el-form>
        </div>
        <div class="kf-bd">

            <!--表格导航-->
            <div class="kf-table-nave">
                <div class="kf-table-nave-left">
                    <div class="kf-btn">订单列表</div>
                </div>
            </div>

            <!--表格-->
            <el-table v-loading="loading" :data="tableData" border class="kf-table" style="width: 100%">
                <el-table-column type="index" :index="(index) => (pageNum - 1) * pageSize + index + 1" label="序号"
                                 width="50">
                </el-table-column>
                <el-table-column prop="orderNo" label="订单编号" width="300">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="site" label="所属院校" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="station" label="助学中心"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" :formatter="$fun.table.time" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="payWay" label="支付方式" :formatter="formats">
                </el-table-column>
                <el-table-column prop="payStatus" label="支付状态" :formatter="formats">
                </el-table-column>
                <el-table-column prop="course" label="课程名称">
                </el-table-column>
                <el-table-column prop="amount" label="交易金额">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="stationCode" label="助学资格">
                </el-table-column>
                <el-table-column prop="displayStatus" label="是否显示" :formatter="formats">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="kf-table-scopeBtn" @click="show(false,scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
                        <baseDelBtn delUrl="/order/order" :delId="scope.row.id" :delOk="selectChange"  v-if="extra.indexOf('删除')>-1"></baseDelBtn>
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
                :title="actionType?'添加':'编辑'"
                :visible.sync="dialogVisible"
                width="760px"
                center
                :append-to-body="true"
                class="kf-dialog-add">
            <el-form ref="formData" :rules="rules" :model="formData" label-width="120px" class="kf-form-add">
                <el-form-item label="状态">
                    <el-radio-group v-model="formData.displayStatus">
                        <el-radio :label="1">是</el-radio>
                        <el-radio  :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model.trim="formData.remark" maxlength="100" :rows="6" placeholder="输入不超过100个字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import studyManage from "@/mixin/studyManage";
import { checkTel } from "../../public/validators";
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      loading: false,
      total: 0,
      no: "",
      payStatus: "",
      formData: {
        idCardType: 1
      },
      dialogVisible: false,
      isReply: false,
      stationList: [],
      stationId: "",
      siteList: [],
      siteId: "",
      noteDetail: null,
      zLoading: false,
      extra: [],
      actionType: true,
      rules: {
        remark: [{ max: 100, message: "备注最多为100字", trigger: "blur" }]
      },
      dateRangeValue: []
    };
  },
  mounted() {
    this.getDataList();
    this.getStationList();
    this.getSiteList();
  },
  watch: {
    no: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  mixins: [studyManage],
  methods: {
    getStationList() {
      this.$api.orderPay
        .getOrderStations({
          siteId: this.siteId
        })
        .then(res => {
          this.stationList = res.data;
        });
    },
    getSiteList() {
      this.$api.orderPay.getOrderSites().then(res => {
        this.siteList = res.data;
      });
    },
    getDataList() {
      // console.log(this.dateRangeValue)
      this.loading = true;
      let arr = [];
      if (this.dateRangeValue.length) {
        arr = this.dateRangeValue.map(item => {
          return this.$fun.table.time(null, null, item);
        });
      }
      this.$api.orderPay
        .getOrderList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          siteId: this.siteId,
          stationId: this.stationId,
          payStatus: this.payStatus,
          start: arr[0],
          end: arr[1],
          // courseId: this.courseId,
          // displayStatus: this.displayStatus,
          no: this.no
        })
        .then(res => {
          this.extra = res.data.extra;
          this.loading = false;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
        });
    },
    formats(row, col) {
      if (col.property === "payWay") {
        switch (row.payWay) {
          case 1:
            return "支付宝";
          case 2:
            return "微信";
        }
      }
      if (col.property === "payStatus") {
        switch (row.payStatus) {
          case 1:
            return "已支付";
          case 2:
            return "支付失败";
          case 3:
            return "已退款";
          default:
            return "未知";
        }
      }
      if (col.property === "displayStatus") {
        switch (row.displayStatus) {
          case 1:
            return "是";
          case 0:
            return "否";
        }
      }
    },
    close() {},
    change(type) {
      if (type) {
        this.getStationList();
      }
      this.selectChange(true);
    },
    select() {
      if (!this.no) return;
      this.selectChange(true);
    },
    show(actionType, row) {
      if (actionType === null || actionType === undefined) return;
      this.actionType = actionType;
      this.formData = Object.assign({}, row);
      this.dialogVisible = true;
    },
    submitForm() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.$api.orderPay
            .editOrder(this.formData.id, this.formData)
            .then(() => {
              this.actionMes("编辑成功");
            });
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
.noteDetail {
  line-height: 25px;
  font-size: 16px;
}
.noteDelCon {
  line-height: 20px;
  max-height: 500px;
  overflow: auto;
}
.kf-relete-topHead {
  display: flex;
  justify-content: flex-start;
  div {
    color: #333333;
    font-size: 16px;
  }
  div:not(:first-child) {
    margin-left: 40px;
  }
}
</style>
