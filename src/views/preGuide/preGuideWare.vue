<template>
    <div class="schoolManagementWrap">
        <el-card class="pageCard">
            <div class="pageHead flexItem">
                <span class='label'>课程</span>
                <div class="marL10">
                    <el-select v-model="tableForm.courseId" class="kf-select" placeholder="请选择课程" filterable  @change="searchChange">
                        <el-option label="所有" value=""/>
                        <el-option
                                v-for="(item,index) in courseList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"/>
                    </el-select>
                </div>
                <span class='label marL10'>层次</span>
                <div class="marL10">
                    <el-select v-model="tableForm.level" class="kf-select" placeholder="请选择层次" filterable  @change="searchChange">
                        <el-option label="所有" value=""/>
                        <el-option
                                v-for="(item,index) in levelList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"/>
                    </el-select>
                </div>
                <span class='label marL10'>科类</span>
                <div class="marL10">
                    <el-select v-model="tableForm.disciplineId" class="kf-select" placeholder="请选择科类" filterable  @change="searchChange">
                        <el-option label="所有" value=""/>
                        <el-option
                                v-for="(item,index) in disciplineList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"/>
                    </el-select>
                </div>
                <span class='label marL10'>课件</span>
                <div class="marL10">
                    <!--searchInp-->

                    <el-input v-model="tableForm.name" class='searchInp' placeholder="请输入辅导课件名称">
                        <el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
                    </el-input>

                </div>
                <!--v-if="extra.indexOf('添加')>-1"-->
                <div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show' v-if="extra.indexOf('添加')>-1">
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
                            prop="name"
                            label="课件名称" width="200" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            prop="level"
                            label="层次"  :formatter="forLevel">
                    </el-table-column>
                    <el-table-column
                            prop="courseName"
                            label="所属课程" :show-overflow-tooltip="true"	>
                    </el-table-column>
                    <el-table-column
                            prop="sort"
                            label="顺序号">
                    </el-table-column>
                    <!--<el-table-column
                            prop="playTimes"
                            label="观看次数">
                    </el-table-column>-->
                    <el-table-column
                            prop="playUrl"
                            label="播放地址" :show-overflow-tooltip="true" width="200">
                    </el-table-column>
                    <el-table-column
                            prop="disciplineName"
                            label="科类">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间" :formatter="$fun.table.time" width="160">
                    </el-table-column>
                    <el-table-column
                            prop="logo"
                            label="预览">
                    </el-table-column>
                    <el-table-column
                            prop="agreeStatus"
                            label="审核状态" :formatter="forStatus">
                    </el-table-column>
                    <el-table-column
                            label="状态">
                        <template slot-scope="scope">
                            {{scope.row.ableStatus==1?"启用":"禁用"}}
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="publisher"-->
                    <!--width="120"-->
                    <!--label="收件人是否已删">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                    <!--prop="updateTime"-->
                    <!--label="更新时间"-->
                    <!--width="200"-->
                    <!--:formatter="$fun.table.time">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                    <!--prop="publisher"-->
                    <!--width="120"-->
                    <!--label="发布状态">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column
                      label="状态"
                      width="80">
                      <template slot-scope="scope">
                        {{scope.row.ableStatus?"启用":"禁用"}}
                      </template>
                    </el-table-column>-->
                    <el-table-column
                            fixed="right"
                            label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
                            <baseDelBtn delUrl="/tutor/ware" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
                    width="660px"
                    center
                    :append-to-body="true"
                    class="kf-dialog-add">
                <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model.trim="form.name" placeholder="请输入辅导课件名称（不超过20个字）"></el-input>
                    </el-form-item>
                    <el-form-item label="课程" prop="courseId">
                        <el-select  style="width:100%" v-model="form.courseId"  placeholder="请选择课程">
                            <el-option v-for="(item,index) in courseList" :key="index" :value="item.id" :label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="播放地址" prop="playUrl">
                        <el-input v-model.trim="form.playUrl" placeholder="请输入播放地址"></el-input>
                    </el-form-item>
                    <el-form-item label="顺序号" prop="sort">
                        <el-input v-model.trim="form.sort" type="number" onkeypress="return event.keyCode>=48&&event.keyCode<=57" placeholder="请输入顺序号"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model.trim="form.remark" :row="2" type="textarea" placeholder="请输入备注"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="层次" prop="level">-->
                        <!--<el-select  style="width:100%" v-model="form.level"  placeholder="请选择层次">-->
                            <!--<el-option v-for="(item,index) in levelList" :key="index" :value="item.id" :label="item.name">-->

                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="科类" prop="disciplineId">-->
                        <!--<el-select  style="width:100%" v-model="form.disciplineId"  placeholder="请选择科类">-->
                            <!--<el-option v-for="(item,index) in disciplineList" :key="index" :value="item.id" :label="item.name">-->

                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="状态">
                        <el-radio-group v-model="form.ableStatus">
                            <el-radio :label="1">启用</el-radio>
                            <el-radio :label="0">禁用</el-radio>
                        </el-radio-group>
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
    import { mapState } from "vuex";
    export default {
        data() {
            return {
                extra: [],
                tableLoading: true,
                tableForm: {
                    name: "",
                    level:"",
                    disciplineId:"",
                    courseId:""
                },
                tableData: [],
                //分页——start
                pageNum: 1,
                pageSize: 10,
                total: 0,
                //分页——end
                stationList:[],
                dialogAddVisible: false,
                dialogType: 0,
                form: {
                    name: "", //课件名称
                    playUrl:"",
                    sort:"",
                    remark:"",
                    ableStatus: 1 //启用状态(1启用0禁用)
                },
                rulesForm: {
                    name: [
                        { required: true, message: "请输入课件名称", trigger: "blur" },
                        {
                            min: 1,
                            max: 20,
                            message: "最长 20 个字符",
                            trigger: "change"
                        }
                    ],
                    playUrl: [
                        { required: true, message: "请输入播放地址", trigger: "blur" },
                    ],
                    sort: [
                        { required: true, message: "请输入顺序号", trigger: "blur" },
                    ],
                    courseId: [
                        { required: true, message: "请选择课程", trigger: "blur" },
                    ],
//      code: [
//        { required: true, message: "请输入院校编码", trigger: "blur" },
//        {
//          min: 1,
//          max: 8,
//          message: "最长 8 个字符",
//          trigger: "change"
//        }
//      ],
//      remark: [
//        {
//          min: 1,
//          max: 255,
//          message: "最长 50 个字符",
//          trigger: "change"
//        }
//      ]
                },
                kindList:[],
                stationList:[],
                disciplineList:[],
                courseList:[],
                levelList:[{
                    name:'高起专',
                    id:1
                },{
                    name:'专升本',
                    id:2
                },{
                    name:'高起本 ',
                    id:3
                }]
            };
        },
        computed: mapState(["userInfo"]),
        components: {},
        mounted() {
            // this.getStudentList();
            // this.getZhanneixinStationList();
            this.getDisciplineList();
            this.getCourseList()
            this.get_ajax();
        },
        watch:{
            "tableForm.name":function(n,o){
                if(!n){
                    this.get_ajax()
                }
            }
        },
        methods: {
            forStatus(row){
                switch (row.agreeStatus) {
                    case 0:return '待提交';break;
                    case 1:return '审核中';break;
                    case 2:return '通过';break;
                    case 3:return '不通过';break;
                }
            },
            forLevel(row){
                switch (row.level) {
                    case 1:return '高起专';break;
                    case 2:return '专升本';break;
                    case 3:return '高起本';break;
                }
            },
            getDisciplineList(){
                this.$api.preGuide.getGuidePreWare_discipliness({
                    pageNum:1,
                    pageSize:1000
                }).then((res)=>{
                    this.disciplineList=res.data;
                }).catch((e)=>{

                })
            },
            getCourseList(){
                this.$api.preGuide.getGuidePreWare_courses({
                    pageNum:1,
                    pageSize:1000
                }).then((res)=>{
                    this.courseList=res.data;
                }).catch((e)=>{

                })
            },
            //获取数据
            get_ajax() {
                this.tableLoading = true;
                this.$api.preGuide
                    .getGuidePreWare({
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
            searchChange() {
                this.ready_ajax();
            },
            //显示添加框
            dialogAdd_show() {
                this.dialogType = 0;
                this.dialogAddVisible = true;
                this.form = {
                    name: "", //课件名称
                    playUrl:"",
                    sort:"",
                    remark:"",
                    courseId:"",
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
                    playUrl:row.playUrl,
                    courseId:row.courseId,
                    sort:row.sort,
                    remark:row.remark,
                    ableStatus: row.ableStatus //启用状态(1启用0禁用)
                };
                this.$nextTick(() => {
                });
                this.$refs["form"].clearValidate();
            },
            //添加编辑数据
            add_ajax() {
                if (this.dialogType === 0) {
                    this.$api.preGuide
                        .preGuideWare_add(this.form)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "添加成功!"
                            });
                            this.dialogAddVisible = false;
                            this.ready_ajax();
                        });
                } else {
                    this.$api.preGuide
                        .preGuideWare_edit(this.form.id,this.form)
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
            //分页start
            handleSizeChange(val) {
                this.pageSize = val;
                this.get_ajax();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.get_ajax();
            },
            getStudentList(){
                this.$api.message.getStudentList().then((res)=>{
                    this.kindList=res.data
                })
            },
            getZhanneixinStationList(){
                this.$api.message.getZhanneixinStationList().then((res)=>{
                    this.stationList=res.data
                })
            }
            //分页end
        }
    };
</script>
