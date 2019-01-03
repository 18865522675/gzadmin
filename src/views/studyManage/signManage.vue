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
          <el-form-item label="主考院校" class="kf-form-item form-sel mr60" v-if="this.$store.getters.getUserInfo.type==3">
            <el-select v-model="siteId" placeholder="请选择主考院校" @change="select(1)" filterable>
              <el-option label="全部" value=""/>
              <el-option v-for="item in siteList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="助学机构" class="kf-form-item form-sel mr60"
                        v-if="this.$store.getters.getUserInfo.type==3||this.$store.getters.getUserInfo.type==2">
            <el-select v-model="stationId" placeholder="请选择助学机构" @change="select">
              <el-option label="全部" value=""/>
              <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
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
              end-placeholder="结束日期" @change="select">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="kf-form-item form-search">
            <el-input placeholder="请输入手机号" v-model="phone" style="width: 296px;">
              <el-button slot="append" class="form-search-ico" @click="select(null,true)">搜索</el-button>
            </el-input>
          </el-form-item>

        </div>
      </el-form>
    </div>
    <div class="kf-bd">

      <!--表格导航-->
      <!--<div class="kf-table-nave">-->
      <!--<div class="kf-btn">签到列表</div>-->
      <!--</div>-->
      <div class="kf-table-nave">
        <div class="kf-table-nave-left">
          <div class="kf-btn">签到列表</div>
        </div>
        <div kf-table-nave-right>
          <download text="数据导出" url="/study/studentSign/export"></download>
        </div>
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
        <el-table-column prop="site" label="主考院校">
        </el-table-column>
        <el-table-column prop="station" label="助学机构">
        </el-table-column>
        <el-table-column prop="avatar" label="签到头像" width="120">
          <!--<template slot-scope="scope">-->
          <!--<img :src="$config.HOST_IMG+scope.row.avatar" alt="">-->
          <!--</template>-->
          <template slot-scope="scope">
            <tableCover :url="scope.row.avatar.startsWith('http')?scope.row.avatar:$config.HOST_IMG+scope.row.avatar"/>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间" :formatter="$fun.table.time">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-table-scopeBtn" @click="$fun.showImg(scope.row.avatar)">查看
            </el-button>
            <!--<baseSeeBtn @click.native="show(false,scope)"></baseSeeBtn>-->
            <baseDelBtn delUrl="/study/studentSign" :delId="scope.row.id" :delOk="selectChange"
                        v-if="extra.indexOf('删除')>-1"></baseDelBtn>

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

  </div>
</template>

<script>
import studyManage from "@/mixin/studyManage";
import download from "@/components/download";

export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      formData: {
        ableStatus: 1
      },
      actionType: true,
      // isSee: false,
      dialogVisible: false,
      isReply: false,
      phone: "",
      siteId: "",
      stationId: "",
      dateRangeValue: "",
      siteList: [],
      stationList: [],
      extra: [],
      loading: false
    };
  },
  components: {
    download
  },
  mixins: [studyManage],
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

    this.getDataList();
  },
  watch: {
    phone: function(n) {
      if (!n) this.selectChange(true);
    }
  },
  methods: {
    getSiteList() {
      this.$api.studyManage.getSignSites().then(res => {
        this.siteList = res.data;
      });
    },
    getStationList() {
      this.$api.studyManage
        .getSignStations({
          siteId: this.siteId
        })
        .then(res => {
          this.stationList = res.data;
        });
    },
    getDataList() {
      this.loading = true;
      let arr = [];

      if (this.dateRangeValue&&this.dateRangeValue.length) {
        arr = this.dateRangeValue.map(item => {
          return this.$fun.table.time(null, null, item);
        });
      }
      console.log(arr);
      this.$api.studyManage
        .getSignList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          siteId: this.siteId,
          stationId: this.stationId,
          phone: this.phone,
          start: arr[0],
          end: arr[1]&&arr[1].replace(/00:00:00/, "23:59:59")
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
    select(type, isSel) {
      if (type) {
        this.stationList = [];
        this.getStationList();
      }
      if (isSel) {
        if (!this.phone) return;
        // this.selectChange(true)
      }

      this.selectChange(true);
      // console.log(132465);
    }
  }
};
</script>
<style lang="less">
</style>
