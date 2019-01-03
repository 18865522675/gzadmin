<template>
  <div class="g-module">
    <!--筛选-->
    <div class="kf-screen">
      <div class="kf-screen-head">
        <div class="kf-screen-head-cap">筛选</div>
      </div>
      <el-form ref="form" :model="form" class="kf-form">
        <!--选择-->
        <div class="kf-row">
          <el-form-item label="活动名称" class="kf-form-item form-sel mr40">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" class="kf-form-item form-sel mr40">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" class="kf-form-item form-sel mr40">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" class="kf-form-item form-sel mr40">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" class="kf-form-item form-sel mr40">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" class="kf-form-item form-sel">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <!--选择加搜索-->
        <div class="kf-row">
          <el-form-item label="活动名称" class="kf-form-item form-sel mr60">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" class="kf-form-item form-sel mr60">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="kf-form-item form-search">
            <el-input placeholder="请输入内容" v-model="form.name">
              <el-button slot="append" class="form-search-ico">搜索</el-button>
            </el-input>
          </el-form-item>
        </div>

        <!--搜索-->
        <div class="kf-row">
          <el-form-item label="学校名称" class="kf-form-item form-search">
            <el-input placeholder="请输入学校名称" v-model="form.name" style="width: 296px;">
              <el-button slot="append" class="form-search-ico">搜索</el-button>
            </el-input>
          </el-form-item>
        </div>

        <!--时间-->
        <div class="kf-row">
          <el-form-item label="活动名称" class="kf-form-item form-sel mr60">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生" class="kf-form-item form-sel mr40">
            <el-input placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="日期范围" class="kf-form-item form-date-range mr40">
            <el-date-picker
              v-model="dateRangeValue"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="kf-form-item form-search-btn">
            <el-button class="form-search-ico">搜索</el-button>
          </el-form-item>
        </div>

      </el-form>
    </div>
    <div class="kf-bd">
      <!--tab切换-->
      <div class="kf-table-tab">
        <div class="kf-table-tab-box">
          <div class="kf-table-tab-item" :class="{on: table_tab_ind === 0}" data-ind="0" @click="change_table_tab">课件列表</div>
          <div class="kf-table-tab-item" :class="{on: table_tab_ind === 1}" data-ind="1" @click="change_table_tab">习题列表</div>
          <div class="kf-table-tab-item" :class="{on: table_tab_ind === 2}" data-ind="2" @click="change_table_tab">图书列表</div>
        </div>
      </div>

      <!--表格导航-->
      <div class="kf-table-nave">
        <div class="kf-btn kf-btn-table kf-btn-add" @click="dialogAdd_show">习题列表</div>
        <!--导出表格-->
        <download class="mla mr20" url="resource/download/course/exportExcel" text="导出表格"/>
        <!--下载模板-->
        <download class="" url="resource/download/course/exportExcel"/>
        <!--导入模板-->
        <upload url="resource/warecourse/import"/>
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
          :index="(index) => (currentPage - 1) * limitNum + index + 1"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
          <template slot-scope="scope">
            <router-link to="/" class="kf-table-link">{{scope.row.address}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="dialogVideo_show">视频预览</el-button>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small">查看</el-button>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="dialogAdd_edit">编辑</el-button>
            <el-button type="text" size="small" class="kf-btn kf-btn-table small" @click="confirm">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页start-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="limitNum"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="kf-pagination">
      </el-pagination>
      <!--分页end-->
    </div>

    <!--添加编辑弹窗-->
    <el-dialog
      :title="dialogType===0?'添加':'编辑'"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      class="kf-dialog-add">
      <el-form label-width="100px" class="kf-form-add">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="value" placeholder="请选择活动区域" class="kf-form-item form-sel" style="width: 100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" :rows="6" placeholder="输入不超过60个字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddVisible = false">确 定</el-button>
        <el-button type="primary not">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import download from "../components/download";
import upload from "../components/upload";

import Cookies from "js-cookie";

Cookies.set("name", "666");

export default {
  data() {
    return {
      form: {
        name: "",
        type: [],
        resource: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      loading: true,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],

      //日期范围--start
      dateRangeValue: "",
      //日期范围--end

      //分页start
      currentPage: 1,
      total: 0,
      limitNum: 10,

      //表格table--start
      table_tab_ind: 0,
      //表格table--end

      //添加编辑弹窗--start
      dialogAddVisible: false,
      dialogType: 0 // 0 添加，1 编辑
      //添加编辑弹窗--end
    };
  },
  components: {
    download,
    upload
  },
  mounted() {},
  methods: {
    //获取信息
    get_ajax() {
      this.loading = true;
      this.$api.resourceManagement
        .get_list({
          wareCourseName: ""
        })
        .then(res => {
          console.log(res);
          this.loading = false;
          //分页
          this.total = res.data.paging.total;
        })
        .catch(res => {
          this.loading = false;
          console.log(res);
        });
    },
    //显示添加框
    dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
    },
    //显示编辑框
    dialogAdd_edit() {
      this.dialogType = 1;
      this.dialogAddVisible = true;
    },
    //切换表格tab
    change_table_tab(e) {
      this.table_tab_ind = parseInt(e.target.dataset.ind);
    },
    //确认提示框
    confirm() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分页start
    handleSizeChange(val) {
      this.limitNum = val;
      this.get_ajax();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_ajax();
    },
    //分页end
    //显示视频弹窗
    dialogVideo_show() {
      this.$store.commit("dialogVideo_show", {
        src: "/static/mp4.mp4",
        poster: "/static/background.png"
      });
    }
  }
};
</script>
