<template>
    <div class="schoolManagementWrap">
        <el-card class="pageCard">
            <div class="pageHead flexItem" style="flex-wrap:pre-wrap">

                <span class='label marL10'>课程</span>
                <div class="marL10">
                    <el-select v-model="tableForm.batchId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                        <el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
				
				
				
                <span class='label marL10'>函授站</span>
                <div class="marL10">
                    <el-select v-model="tableForm.stationId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                        <el-option label="所有" value=""/>
                        <el-option
                                v-for="(item, index) in stationList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"/>
                    </el-select>
                </div>
                
                <span class='label marL10'>作业</span>
                <div class="marL10">
                    <!--searchInp-->
                    <el-input v-model="tableForm.name" class='searchInp' placeholder="请输入作业名称">
                        <el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
                    </el-input>
                </div>
                <div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show' >
                    添加
                </div>




                <!--<div  class="comTopResetBtn comTopBlueBtn topBtn  marL10">
                    重置
                </div>-->
                <!--<div  class="comTopReleteBtn  comTopOrangeBtn topBtn marL10">
                    关联函授站
                </div>-->
            </div>

            <div class="flexItem pageHead" style="flex-wrap: wrap">


                <!--<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='saveOutDialogVisible=true' >-->
                <!--转出-->
                <!--</div>-->

                <!--<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='saveAppend_show' v-if="extra.indexOf('添加')>-1">-->
                <!--补录-->
                <!--</div>-->
                <download url="student/before/downloadMould" class="marL10"  v-if="extra.indexOf('下载模板')>-1" />
                <upload class="marL10" url="/student/before/upload"    :ok="get_ajax"  v-if="extra.indexOf('批量导入')>-1"  ></upload>
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
                            prop="batchName"
                            label="年级">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            label="证件类型">
                        <template slot-scope="scope">
                            {{scope.row.cardType==0?'身份证':scope.row.cardType==1?'军官证/士兵证':'港澳通行证'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="cardNo" :show-overflow-tooltip="true"
                             label="证件号码">
                    </el-table-column>
                    <el-table-column
                            prop="majorName"
                            label="层次"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="disciplineName"
                            label="科类">
                    </el-table-column>
                    <el-table-column
                            prop="majorName"
                            label="专业">
                    </el-table-column>
                    <el-table-column
                            prop="batchName"
                            label="函授站">
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--label="状态"-->
                            <!--width="80">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.ableStatus?"启用":"禁用"}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                            fixed="right"
                            label="操作" width="200">
                        <template slot-scope="scope">
                            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showAllot(scope.row)" v-if="extra.indexOf('分配函授站')>-1">分配</el-button>-->

                            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showSaveAppend(scope.row.id)">补录</el-button>-->
                            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="$router.push(`/studentManagement/studentDetailPre/${scope.row.id}/${scope.row.userName}`)" >查看</el-button>
                            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" >编辑</el-button>
                            <baseDelBtn delUrl="/teaching/work" :delId="scope.row.id" :delOk="get_ajax" />
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
			        <el-form-item label="教学计划" prop="planId">
			          <el-select  style="width:100%" v-model="form.cardType" placeholder="请选择教学计划">
			          	
			          </el-select>
			        </el-form-item>
			        <el-form-item label="作业名称" prop="name">
			          <el-input v-model.trim="form.name" placeholder="请输入作业名称"></el-input>
			        </el-form-item>
			        <el-form-item label="状态">
			          <el-radio-group v-model="form.ableStatus">
			            <el-radio :label="1">启用</el-radio>
			            <el-radio :label="0">禁用</el-radio>
			          </el-radio-group>
			        </el-form-item>
			        <el-form-item label="备注" prop="remark">
			          <el-input v-model.trim="form.remark" placeholder="请输入备注" type="textarea" :rows="2"></el-input>
			        </el-form-item>
			      </el-form>
			      <div slot="footer" class="dialog-footer">
			        <el-button type="primary" @click="submitForm">保 存</el-button>
			      </div>
			    </el-dialog>



            <el-dialog
                    title="分配函授站"
                    :visible.sync="allotDialogVisible"
                    width="660px"
                    center

                    :append-to-body="true"
                    class="kf-dialog-add">
                <el-form ref="allotForm" :rules="allotRules" :model="allotForm" label-width="120px" class="kf-form-add">
                    <el-form-item label="学生">
                        <el-input v-model.trim="actionRow.name" :disabled="true" placeholder="请输入学生姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input v-model.trim="actionRow.cardNo" :disabled="true" placeholder="请输入证件号码"></el-input>
                    </el-form-item>
                    <el-form-item label="函授站" prop="stationId">
                        <el-select  style="width:100%" v-model="form.stationId"  placeholder="请选择收函授站">
                            <el-option v-for="(item,index) in stationList" :key="index" :value="item.id" :label="item.name">

                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureAllot('allotForm')">保 存</el-button>
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
                tableLoading: false,
                tableForm: {
                    name: "",
                    stationId:"",
                    majorId:"",
                    level:"",
                    disciplineId:"",
                    enrollYear:"",
                },
                tableData: [{}],
                //分页——start
                pageNum: 1,
                pageSize: 10,
                total: 0,
                //分页——end
                dialogAddVisible: false,

                // 转出visible
                saveOutDialogVisible:false,
                saveAppendDialogVisible:false,
                dialogType: 0,
                form: {
                    name:"",
                    planId:"",
                    remark:"",
                    ableStatus:1
                },
                rulesForm: {
                    name: [
                        { required: true, message: "请输入作业名称", trigger: "blur" },
                        {
                            min: 1,
                            max: 20,
                            message: "最长 20 个字符",
                            trigger: "change"
                        }
                    ],
                    planId: [
                        { required: true, message: "请选择教学计划", trigger: "blur" },
                    ],
                    cardNo: [
                        { required: true, message: "请输入证件号码", trigger: "blur" },
                    ],
                    disciplineId: [
                        { required: true, message: "请选择科类", trigger: "blur" },
                    ],
                    level: [
                        { required: true, message: "请选择层次", trigger: "blur" },
                    ],
                    majorId: [
                        { required: true, message: "请选择专业", trigger: "blur" },
                    ],
                    enrollYear: [
                        { required: true, message: "请输入年份", trigger: "blur" },
                    ]
                },


                allotRules: {
                    stationId: [
                        { required: true, message: "请选择函授站 ", trigger: "blur" },
                    ],
                },
                allotDialogVisible:false,
                allotForm:{
                    stationId:""
                },


                disciplineList:[],
                majorList:[],
                stationList:[],
                yearList:[],
                actionId:"",
                actionRow:{}
            };
        },
        components: {},
        mounted() {
//	this.getKindList();
//	this.getStationList();
            console.log(new Date().getFullYear())
            let now=new Date().getFullYear()
            for(let i=now;i<now+5;i++){
                this.yearList.push(i)
            }
            this.tableForm.batchId=now;
            this.getStudentPreSimpleDisplines();
            this.getStudentPreSimpleMajors();
            this.getStudentPreSimpleStations();
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
            //获取数据
            showAllot(item){
                this.actionRow={...item};
                this.allotDialogVisible=true;
            },
            sureAllot(formName){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$api.studentManagement.studentEnroll_allot({
                            studentId:this.actionRow.id,
                            ...this.allotForm
                        }).then((res)=>{
                            this.$message.success("分配成功");
                            this.allotDialogVisible=false;
                            this.ready_ajax()
                        }).catch((e)=>{
                            this.$message.success("分配失败")
                        })
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            sureSaveAppend(formName){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$api.studentManagement.studentPre_saveAppend({
                            studentId:this.actionId,
                            ...this.saveAppendForm
                        }).then((res)=>{
                            this.$message.success("补录成功");
                            this.ready_ajax()
                        }).catch((e)=>{
                            this.$message.success("失败")
                        })
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            showSaveOut(id){
                this.actionId=id;
                this.saveOutDialogVisible=true;
            },
            showSaveAppend(id){
                this.actionId=id;
                this.saveAppendDialogVisible=true;
            },
            getStudentPreSimpleDisplines(){
                this.$api.studentManagement.getStudentEnrollSimpleDisplines().then((res)=>{
                    this.disciplineList=res.data
                })
            },
            getStudentPreSimpleMajors(){
                this.$api.studentManagement.getStudentEnrollSimpleMajors().then((res)=>{
                    this.majorList=res.data
                })
            },
            getStudentPreSimpleStations(){
                this.$api.studentManagement.getStudentEnrollSimpleStations().then((res)=>{
                    this.stationList=res.data
                })
            },
            get_ajax() {
                this.tableLoading = true;
                this.$api.studentManagement
                    .getStudentEnrollList({
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
                   name:"",
                    planId:"",
                    remark:"",
                    ableStatus:1
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
//      id: row.id,
//      kindId: row.kindId, //课件名称
//      content: row.content, //课件编码
//      remark: row.remark, //备注
//      ableStatus: row.ableStatus //启用状态(1启用0禁用)
                    id:row.id,
                    name:row.name,
                    planId:row.planId,
                    remark:row.remark,
                    ableStatus:row.ableStatus
                };
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },
            //添加编辑数据
            add_ajax() {
                if (this.dialogType === 0) {
                    this.$api.teachManage
                        .courseWork_add(this.form)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "添加成功!"
                            });
                            this.dialogAddVisible = false;
                            this.ready_ajax();
                        });
                } else {
                    this.$api.teachManage
                        .courseWork_edit(this.form.id,this.form)
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
            getKindList(){
                this.$api.message.getNoticeKindsList().then((res)=>{
                    this.kindList=res.data.list
                })
            },
            getStationsList(){
                this.$api.message.getNoticeStationsList().then((res)=>{
                    this.stationList=res.data.list
                })
            }
            //分页end
        }
    };
</script>
