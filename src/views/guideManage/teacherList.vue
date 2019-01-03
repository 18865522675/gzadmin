<template>
  <div class="g-module">
    <!-- 奖惩管理 -->
    <div class="kf-screen">
        <div class="kf-screen-head">
          <div class="kf-screen-head-cap">筛选</div>
        </div>
      <el-form ref="form"  class="kf-form">
        <div class="kf-row">
          <el-form-item  class="kf-form-item form-search">
            <el-input placeholder="请输入姓名/手机号" v-model.trim="keyword" style="width: 296px;">
              <el-button slot="append" class="form-search-ico" @click="search">搜索</el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="kf-table-nave" style="justify-content:flex-start">
      <div class="kf-table-nave-left">
        <div class="kf-btn">教师列表</div>
        <div class="kf-btn kf-btn-table kf-btn-add ml20" @click="show(true)" v-if="extra.indexOf('添加')>-1"></div>
      </div>
    </div>

    <!--表格-->
      <el-table :data="tableData" border class="kf-table" style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" :index="(index) => (pageNum - 1) * pageSize + index + 1" ></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="summary" label="简介" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="type" label="教师类别" :formatter="formats"></el-table-column>
        <el-table-column prop="courseList" label="课程" width="400" :formatter="formats" :show-overflow-tooltip="true">
          <!--<template slot-scope="scope">-->
            <!--<div style="display: flex;flex-wrap:wrap;justify-content: center;">-->
              <!--<div style="width:auto;height: auto;border-radius: 5px;background:#5e4faa;margin-left:25px;opacity:.8;padding:3px;margin-top:2px;color:white" v-for="(item,index) in scope.row.courseList.slice(0,2)">-->
                  <!--{{item.name}}-->
              <!--</div>-->
            <!--</div>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column prop="tutorRange" label="辅导范围" :formatter="formats"></el-table-column>
        <el-table-column prop="tutorNum" label="辅导人数"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="$fun.table.time"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"  :formatter="$fun.table.time"></el-table-column>
        <el-table-column prop="ableStatus" label="状态" :formatter="formats"></el-table-column>
        <el-table-column fixed="right"  width="200" label="操作">
          <template slot-scope="scope">
              <el-button size="small" type="text"  class="kf-table-scopeBtn" @click="resetTeacher(scope.row.id)" v-if="extra.indexOf('重置')>-1">重置</el-button>
              <!--<baseSeeBtn></baseSeeBtn>-->
            <el-button size="small" type="text"  class="kf-table-scopeBtn"  @click="$router.push(`/guideManage/distribution/${scope.row.id}/1`)"  v-if="extra.indexOf('查看')>-1">查看</el-button>
              <el-button  size="small" type="text" class="kf-table-scopeBtn" @click="$router.push(`/guideManage/distribution/${scope.row.id}/2`)"  v-if="extra.indexOf('分配')>-1">分配</el-button>
              <!--<baseModifyBtn @click.native="show(false,scope.row)"></baseModifyBtn>-->
            <el-button  type="text" size="small" class="kf-table-scopeBtn"  @click="show(false,scope.row)"  v-if="extra.indexOf('编辑')>-1">编辑</el-button>
              <baseDelBtn delUrl="/tutor/teacher" :delId="scope.row.id" :delOk="selectChange"  v-if="extra.indexOf('删除')>-1"></baseDelBtn>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="kf-pagination">
      </el-pagination>

    <!--添加编辑弹窗-->
    <el-dialog
            :title="isRight?'选择课程':actionType?'添加':'编辑'"
            :visible.sync="dialogVisible"
            width="760px"
            center
            :append-to-body="true"
            @close="closeDialog"
            class="kf-dialog-add">
      <div class="overflow_wrap">
        <div class="slide_wrap" ref="slide_wrap">
          <div class="slide_left">
            <el-form ref="formData" :rules="rules" :model="formData" label-width="120px" class="kf-form-add">
              <el-form-item label="手机号" prop="phone">
                <el-input   v-model.trim="formData.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input   v-model.trim="formData.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="简介" prop="summary">
                <el-input   v-model.trim="formData.summary" placeholder="请输入简介"></el-input>
              </el-form-item>
              <el-form-item label="教师类别" prop="type">
                <el-radio-group v-model="formData.type">
                  <el-radio :label="1">直播</el-radio>
                  <el-radio :label="2">辅导</el-radio>
                  <el-radio :label="3">全部</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="辅导课程" class="guideCourseList" prop="courseIdList">

                <div style="line-height: 40px;padding-right: 25px">


                  {{courseStr}}
                </div>
                <img :src="arrow_Btn" alt="" class="arrow_Btn arrow_Btn_Left" @click="slideAction">
              </el-form-item>
              <el-form-item label="辅导范围" prop="tutorRange">
                <el-select v-model="formData.tutorRange" placeholder="请选择辅导范围" class="kf-form-item form-sel" style="width: 100%">
                  <el-option label="不限" :value="0"></el-option>
                  <el-option label="限定" :value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="formData.ableStatus">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">禁用</el-radio>
                </el-radio-group>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
              <el-button type="primary" @click="submitForm('formData')">保 存</el-button>
            </div>
          </div>


          <div  class="slide_right">
            <img :src="arrBtnLeft"  class="arrow_Btn" alt="" @click="slideAction">
            <el-table
                    :data="courseList"
                    border
                    center
                    style="width: 100%">
              <el-table-column
                      type="index"
                      label="序号" width="50" :index="(index) => (pageNum2 - 1) * pageSize2 + index + 1">
              </el-table-column>
              <el-table-column
                      prop="name"
                      label="课程名称">
              </el-table-column>
              <el-table-column
                      prop="code"
                      label="课程编码">
              </el-table-column>
              <el-table-column
                      fixed="right"
                      label="操作">
                <template  slot-scope="scope">
                  <el-button type="text" size="small" @click="selWork(scope.row)" v-show="!scope.row.isChoose"  class="kf-table-scopeBtn">选择</el-button>
                  <el-button type="text" size="small" @click="delWork(scope.row)" v-show="scope.row.isChoose" class="kf-table-scopeBtn">取消</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer" style="text-align: center;padding-top: 20px">
              <el-button type="primary" @click="saveSelCourse">保 存</el-button>
            </div>
            <!--分页-->
            <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="pageNum2"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize2"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total2"
                    class="kf-pagination">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import arrBtnLeft from "@/assets/img/arrBtnLeft.png";
import arrow_Btn from "@/assets/img/ico_4.png";
import guideMixin from "@/mixin/guideMixin"; //混合，内含分页，请求之后的消息，页码重置
import { checkTel } from "@/public/validators.js";
export default {
  data() {
    var courseIdList = (rule, value, callback) => {
      if (!this.alReadySels.length) {
        return callback(new Error("请选择课程"));
      }
      return callback();
    };
    return {
      arrBtnLeft,
      arrow_Btn,
      pageNum: 1,
      pageSize: 10,
      keyword: "",
      loading: false,
      tableData: [],
      total: 0,
      dialogVisible: false,
      actionType: true,
      formData: {
        type: 1,
        ableStatus: 1,
        tutorRange: 0
      },
      rules: {
        phone: [{ required: true, validator: checkTel, trigger: "blur" }],
        name: [{ max: 20, message: "姓名最长为20个字", trigger: "blur" }],
        summary: [{ trigger: "blur", max: 50, message: "简介最多为50个字" }],
        type: [{ trigger: "blur", required: true, message: "请选择教师类别" }],
        courseIdList: [{ trigger: "blur", validator: courseIdList }],
        tutorRange: [
          { trigger: "blur", required: true, message: "请选择辅导范围" }
        ]
      },
      // 课程猎豹
      courseList: [],
      // 是否滑动到右边
      isRight: false,
      // 已选课程
      alReadySels: [],

      // 选择课程的idList
      courseIdList: [],

      // 课程列表分页
      pageSize2: 5,
      pageNum2: 1,
      total2: 0,
      alReadySels: [],
      extra: [],

      idsArr: []
    };
  },
  mounted() {
    this.getDataList();
    this.getCourseList();
    //   for(let i=0;i<5;i++){
    //       this.tableData.push({id:i})
    //   }
  },
  mixins: [guideMixin],
  computed: {
    courseStr: function() {
      let str = "";
      for (let i of [...new Set(this.alReadySels)]) {
        str += i.name + ",";
      }
      return str;
    }
  },
  methods: {
    getDataList() {
      this.loading = true;
      this.$api.guideManage
        .getTeacherList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          keyword: this.keyword
        })
        .then(res => {
          this.extra = res.data.extra;
          this.loading = false;
          this.tableData = res.data.pageList;
          this.total = res.data.total;
        });
    },
    show(actionType, row) {
      if (actionType === null || actionType === undefined) return;
      this.actionType = actionType;
      this.getCourseList();
      if (!actionType) {
        this.formData = Object.assign({}, row);
        // +this.formData.type;
        this.alReadySels = row.courseList;
        for (let i of this.alReadySels) {
          i.isChoose = true;
          this.idsArr.push(i.id);
        }
        // console.log(this.alReadySels)
        this.formData.type = Number(this.formData.type);
      }
      this.dialogVisible = true;
    },
    formats(row, col) {
      if (col.property == "type") {
        switch (row.type) {
          case 1:
            return "直播";
          case 2:
            return "辅导";
          case 3:
            return "全部";
          default:
            return "未知";
        }
      }

      if (col.property == "courseList") {
        let str = "";
        for (let i of row.courseList) {
          str += i.name + ",";
        }
        return str;
      }

      if (col.property == "tutorRange") {
        switch (row.tutorRange) {
          case 0:
            return "不限";
          case 1:
            return "限定";
          default:
            return "未知";
        }
      }

      if (col.property == "ableStatus") {
        switch (row.ableStatus) {
          case 0:
            return "禁用";
          case 1:
            return "启用";
        }
      }
    },
    closeDialog() {
      // this.$refs["formData"].resetFields();
      for (let i in this.formData) {
        this.formData[i] = "";
      }
      this.formData.ableStatus = 1;
      // this.isRight = false;
      this.$refs.slide_wrap.style.left = "0";
      this.alReadySels = [];
      this.pageNum2 = 1;
    },
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (this.actionType) {
            this.formData.courseIdList = this.courseIdList.join(",");
            this.$api.guideManage.addTeacher(this.formData).then(() => {
              this.actionMes("新增成功");
            });

            return;
          }
          this.alReadySels.map(item => {
            this.courseIdList.push(item.id);
          });
          this.formData.courseIdList = [...new Set(this.courseIdList)].join(
            ","
          );
          // console.log(this.formData.courseIdList)
          delete this.formData.courseList;
          this.$api.guideManage
            .editTeacher(this.formData.id, this.formData)
            .then(() => {
              this.actionMes("编辑成功");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCourseList() {
      this.$api.guideManage
        .getCourseList({
          pageNum: this.pageNum2,
          pageSize: this.pageSize2,
          status: 1
        })
        .then(res => {
          this.courseList = res.data.pageList;
          this.total2 = res.data.total;
          if (this.actionType) {
            this.courseList.map(item => {
              item.isChoose = false;
            });
            return;
          }
          this.courseList.map(item => {
            item.isChoose = false;
            for (let i of this.alReadySels) {
              if (i.id == item.id) {
                item.isChoose = true;
              }
            }
          });
        });
    },
    slideAction() {
      if (this.isRight) {
        this.$refs.slide_wrap.style.left = "0";
      } else {
        this.$refs.slide_wrap.style.left = "-100%";
      }
      this.isRight = !this.isRight;
    },
    resetTeacher(id) {
      this.$api.guideManage.resetTeacher(id).then(res => {
        this.$message.success("重置成功");
        this.selectChange(false);
      });
    },
    selWork(row) {
      // if (this.idsArr.indexOf(row.id) > -1)
      //   return this.$message.warning("此课程已被添加");
      this.alReadySels.push(row);
      this.idsArr.push(row.id);
      row.isChoose = true;
      // console.log(this.alReadySels);
    },
    delWork(row) {
      for (let i of this.alReadySels) {
        if (i.id == row.id) {
          // console.log(this.idsArr.indexOf(row.id))
          this.alReadySels.splice(this.idsArr.indexOf(row.id), 1);
          this.idsArr.splice(this.idsArr.indexOf(row.id), 1);
          row.isChoose = false;
        }
      }
    },
    // 课程列表的分页
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.getCourseList();
    },
    handleCurrentChange2(val) {
      this.pageNum2 = val;
      this.getCourseList();
    },
    // 保存选择课程
    saveSelCourse() {
      console.log(this.alReadySels);
      this.alReadySels.map(item => {
        this.courseIdList.push(item.id);
      });
      this.$refs.slide_wrap.style.left = "0";
      //     console.log(this.courseIdList)
    },
    search() {
      if (!this.keyword) return;
      this.selectChange(true);
    }
  }
};
</script>
<style lang="less" scoped>
.search {
  border-color: #6c8bfa !important;
  background-color: #6c8bfa !important;
  color: #fff !important;
  height: 48px;
  border-radius: 0px !important;
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
}
.el-input-group__append {
  border: none !important;
}
.guideCourseList {
  min-height: 50px;
  line-height: 25px;
  max-height: 110px;
  overflow-y: auto;
  position: relative;
}
.arrow_Btn_Left {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  /*cursor: pointer;*/
}
.arrow_Btn {
  width: 30px;
  height: 30px;
  cursor: pointer;
  /*margin-bottom: 20px;*/
  /*padding-bottom: 30px;*/
}
.slide_left {
  float: left;
  width: 50%;
}
.slide_right {
  float: right;
  width: 50%;
}
.slide_wrap {
  width: 200%;
  position: absolute;
  left: 0px;
  transition: all 0.4s;
  /*height: 720px;*/
}
.overflow_wrap {
  width: 100%;
  position: relative;
  height: 680px;
  overflow-x: hidden;
}
</style>
