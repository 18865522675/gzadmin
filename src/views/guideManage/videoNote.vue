<template>
    <div class="g-module">
        <div class="kf-screen">
            <!--<el-form ref="form" :model="form" class="kf-form">-->
                <!--<div class="kf-row">-->
                    <!--<el-form-item  label="标题 : " class="kf-form-item form-search">-->
                        <!--测试测试-->
                    <!--</el-form-item>-->

                    <!--<el-form-item  label="讲师 : " class="kf-form-item form-search">-->
                        <!--朱斌杰朱斌杰-->
                    <!--</el-form-item>-->

                    <!--<el-form-item  label="所属课程 : " class="kf-form-item form-search">-->
                        <!--zbj课程-->
                    <!--</el-form-item>-->
                <!--</div>-->
            <!--</el-form>-->
            <div class="kf-detail-top">
                <div class="kf-delTop-item">
                    标题 : {{$route.params.title}}
                </div>
                <div class="kf-delTop-item">
                    讲师 :  {{$route.params.teacher}}
                </div>
                <div class="kf-delTop-item">
                    所属课程 : {{$route.params.course}}
                </div>
            </div>
        </div>
        <div class="kf-bd">
            <!--表格导航-->
            <div class="kf-table-nave" style="justify-content:flex-start">
                <div class="kf-btn kf-btn-table">评论列表</div>
            </div>

            <!--表格-->
            <el-table
                    :data="tableData"
                    v-loading="loading"
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
                        label="手机号">
                </el-table-column>
                <el-table-column
                        prop="nick"
                        label="昵称">
                </el-table-column>
                <el-table-column
                        prop="typeText"
                        label="角色">
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="消息内容" width="560" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间" :formatter="$fun.table.time">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="kf-table-scopeBtn" @click="show(scope.row.id)">查看</el-button>
                        <baseDelBtn delUrl="/tutor/liveVideoComment/" :delId="scope.row.id" :delOk="selectChange"></baseDelBtn>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[10, 20, 30, 50]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    :page-size="pageSize"
                    class="kf-pagination">
            </el-pagination>
        </div>

        <!--弹窗-->
        <el-dialog
                title="查看"
                :visible.sync="dialogVisible"
                width="760px"
                center
                :append-to-body="true"
                @close="closeDialog"
                class="kf-dialog-add">
            <el-form ref="formData" :rules="rules" :model="formData" label-width="120px" class="kf-form-add">
                <label class="mesLabel">消息内容 : </label>
                <div class="mesInfo">
                 {{seeInfo}}
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible=false">关 闭</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
import guideMixin from "@/mixin/guideMixin.js";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      loading: false,
      id: null,
      seeInfo: null,
      dialogVisible: false
    };
  },
  components: {},
  mounted() {
    let { id } = this.$route.params;
    this.id = id;
    this.getDataList();
  },
  mixins: [guideMixin],
  methods: {
    getDataList() {
      this.loading = true;
      this.$api.guideManage
        .getComList(this.id, {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.tableData = res.data.pageList;
          this.total = res.data.total;
          this.loading = false;
        });
    },
    show(id) {
      this.$api.guideManage.seeCom(id).then(res => {
        this.seeInfo = res.data;
      });
      this.dialogVisible = true;
    }
  }
};
</script>
<style scoped lang="less">
.mesInfo {
  overflow: hidden;
  max-height: 400px;
  overflow-y: auto;
  line-height: 25px;
  box-sizing: border-box;
  padding: 20px 0px;
}
.mesLabel {
  font-size: 20px;
}
</style>
