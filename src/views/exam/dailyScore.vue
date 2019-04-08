<template>
    <div class="schoolManagementWrap">
        <el-card class="pageCard">
            <div class="pageHead flexItem" style="flex-wrap:wrap">

                <!--<div class="headTopItem">
                    <span class='label marL10'>年份</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.batchId" class="kf-select" placeholder="请选择年份" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option v-for="(item,index) in batchList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </div>-->
                
                <div class="headTopItem">
                    <span class='label marL10'>年级</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.batchId" class="kf-select" placeholder="请选择年级" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option v-for="(item,index) in batchList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="headTopItem">
                    <span class='label marL10'>层次</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.level" class="kf-select" placeholder="请选择层次" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option label="高起专" :value="1"></el-option>
                            <el-option label="专升本" :value="2"></el-option>
                            <el-option label="高起本" :value="3"></el-option>
                        </el-select>
                    </div>

                </div>


                <div class="headTopItem">
                    <span class='label marL10' style="word-spacing:1.7em">专业</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.majorId" class="kf-select" placeholder="请选择专业" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option
                                    v-for="(item,index) in majorList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"/>
                        </el-select>
                    </div>
                </div>
                
                
                 <div class="headTopItem">
                    <span class='label marL10' style="word-spacing:1.7em">课程</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.planId" class="kf-select" placeholder="请选择课程" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option
                                    v-for="(item,index) in courseList"
                                    :key="index"
                                    :label="item.siteCourseName"
                                    :value="item.planId"/>
                        </el-select>
                    </div>
                </div>

                <!--<div class="headTopItem">
                    <span class='label marL10'>考试类型</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.examType" class="kf-select" placeholder="请选择考试类型" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option label="正考" :value="1"/>
                            <el-option label="补考" :value="2"/>
                        </el-select>
                    </div>
                </div>-->

                <!--<div class="headTopItem">
                    <span class='label marL10'>审核状态</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.agreeStatus" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option
                                    v-for="(item, index) in agreeStatusList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"/>
                        </el-select>
                    </div>
                </div>-->

               <div class="headTopItem">
                <div class="flexItem">
                    <span class='label marL10'>证件号码</span>
                    <div class="marL10">
                        <el-input v-model="tableForm.cardNo" class='searchInp' placeholder="请输入证件号码">
                        </el-input>
                    </div>
                </div>
              </div>
                
                 <div class="headTopItem" style="width: 360px">
                    <span class='label marL10'>姓名</span>
                    <div class="marL10">
                        <!--searchInp-->
                        <el-input v-model="tableForm.name" class='searchInp' placeholder="请输入姓名">
                            <el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
                        </el-input>
                    </div>
                </div>




                <div class="comTopSaveBtn comTopOrangeBtn topBtn marL10 marT20" @click='dialogAdd_show' v-if="extra.indexOf('添加')>-1">
                    添加
                </div>
                <download url="/exam/usualScore/downloadMould" class="marL10 marT20"  v-if="extra.indexOf('下载模板')>-1" />
                <upload class="marL10 marT20" url="/exam/usualScore/upload"    :ok="get_ajax"  v-if="extra.indexOf('批量导入')>-1"  ></upload>




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
                            prop="code"
                            label="学号" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            prop="batchName"
                            label="年级" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="姓名" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            label="证件类型" :show-overflow-tooltip="true">
                        <template slot-scope="scope" >
                            {{scope.row.cardType==1?'身份证':scope.row.cardType==2?'军官证/士兵证':'港澳通行证'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="cardNo"
                            label="证件号码" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            prop="level"
                            label="层次"
                            :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{scope.row.level==1?'高起专':scope.row.level==2?'专升本':'高起本'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="majorName"
                            label="专业" :show-overflow-tooltip="true">
                    </el-table-column>
                     <el-table-column
                            prop="siteCourseName"
                            label="课程" :show-overflow-tooltip="true">
                    </el-table-column>
                     <el-table-column
                            prop="usualScore"
                            label="平时成绩" :show-overflow-tooltip="true">
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
                    <el-form-item label="学生名称" prop="name">
                        <el-input v-model.trim="form.name"  placeholder="请输入学生姓名（不超过20个字）"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型" prop="cardType">
                        <el-select  style="width:100%" v-model="form.cardType" placeholder="请选择证件类型">
                            <el-option label="身份证" :value="1"></el-option>
                            <el-option label="军官证/士兵证" :value="2"></el-option>
                            <el-option label="港澳通行证" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码" prop="cardNo">
                        <el-input v-model.trim="form.cardNo" placeholder="请输入证件号码"></el-input>
                    </el-form-item>
                    <el-form-item label="年级" prop="batchId">
                        <el-select  style="width:100%" v-model="form.batchId" placeholder="请选择年级">
                            <el-option v-for="(item,index) in batchList" :key="index"  :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="科类" prop="disciplineId">
                        <el-select  style="width:100%" v-model="form.disciplineId" placeholder="请选择科类">
                            <el-option v-for="(item,index) in disciplineList" :key="index"  :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业" prop="majorId">
                        <el-select  style="width:100%" v-model="form.majorId" placeholder="请选择专业">
                            <el-option v-for="(item,index) in majorList" :key="index"  :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="层次" prop="level">
                        <el-select  style="width:100%" v-model="form.level" placeholder="请选择层次">
                            <el-option label="高起专" :value="1"></el-option>
                            <el-option label="专升本" :value="2"></el-option>
                            <el-option label="高起本" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期" prop="term">
                        <el-select  style="width:100%" v-model="form.term" placeholder="请选择学期">
                            <el-option label="考前辅导" :value="0"></el-option>
                            <el-option label="第一学期" :value="1"></el-option>
                            <el-option label="第二学期" :value="2"></el-option>
                            <el-option label="第三学期" :value="3"></el-option>
                            <el-option label="第四学期" :value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="函授站" prop="stationId"  v-if="!userInfo.stationId">
                        <el-select  style="width:100%" v-model="form.stationId" placeholder="请选择函授站">
                            <el-option v-for="(item,index) in stationList" :key="index"  :label="item.name" :value="item.id"></el-option>
                        </el-select>
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
                    title="转出"
                    :visible.sync="saveOutDialogVisible"
                    width="660px"
                    center
                    :append-to-body="true"
                    class="kf-dialog-add">
                <el-form ref="saveOutForm" :rules="saveOutRules" :model="saveOutForm" label-width="120px" class="kf-form-add">
                    <el-form-item label="转出信息" prop="content">
                        <el-input v-model.trim="saveOutForm.content" placeholder="请输入学生姓名（不超过20个字）"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="状态">-->
                    <!--<el-radio-group v-model.trim="form.ableStatus">-->
                    <!--<el-radio :label="1">启用</el-radio>-->
                    <!--<el-radio :label="0">禁用</el-radio>-->
                    <!--</el-radio-group>-->
                    <!--</el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureSaveOut('saveOutForm')">保 存</el-button>
                </div>
            </el-dialog>
            
            <!---->
             <el-dialog
                    title="审核"
                    :visible.sync="trailDialogVisible"
                    width="660px"
                    center
                    :append-to-body="true"
                    class="kf-dialog-add">
                <el-form ref="trailForm" :rules="agreeStatus" :model="trailForm" label-width="120px" class="kf-form-add">
                    <!--<el-form-item label="转出信息" prop="content">
                        <el-input v-model.trim="saveOutForm.content" placeholder="请输入学生姓名（不超过20个字）"></el-input>
                    </el-form-item>-->
                    <el-form-item label="审核状态">
	                    <el-radio-group v-model.trim="trailForm.agreeStatus">
	                    <el-radio :label="2">通过</el-radio>
	                    <el-radio :label="3">拒绝</el-radio>
	                    </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureTrial('trailForm')">保 存</el-button>
                </div>
            </el-dialog>



            <el-dialog
                    title="变更学籍"
                    :visible.sync="allotDialogVisible"
                    width="660px"
                    center
					@close="closeDialog"
                    :append-to-body="true"
                    class="kf-dialog-add">
                <el-form ref="allotForm" :rules="allotRules" :model="allotForm" label-width="120px" class="kf-form-add">
                    <el-form-item label="学生">
                        <el-input v-model.trim="actionRow.userName" :disabled="true" placeholder="请输入学生姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input v-model.trim="actionRow.cardNo" :disabled="true" placeholder="请输入证件号码"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="kind">
                        <el-select  style="width:100%" v-model="allotForm.kind"  placeholder="请选择操作类型">
                            <el-option v-for="(item,index) in kindIdList" :key="index" :value="item.id" :label="item.name">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学籍状态" prop="newValue" v-if="allotForm.kind==1">
                        <el-select  style="width:100%" v-model="allotForm.newValue" placeholder="请选择学籍状态">
                            <el-option v-for="(item,index) in schoolStatusList" :key="index"  :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业" prop="newValue" v-if="allotForm.kind==2">
                        <el-select  style="width:100%" v-model="allotForm.newValue" placeholder="请选择专业">
                            <el-option v-for="(item,index) in majorList" :key="index"  :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="函授站" prop="newValue" v-if="allotForm.kind==3">
                        <el-select  style="width:100%" v-model="allotForm.newValue" placeholder="请选择函授站">
                            <el-option v-for="(item,index) in stationList" :key="index"  :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="新值" prop="newValue">
                        <el-input v-model.trim="allotForm.newValue"  placeholder="请输入新值"></el-input>
                    </el-form-item>-->
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model.trim="allotForm.remark"  placeholder="备注..." type="textarea" :row="2"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureChange('allotForm')">保 存</el-button>
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
   					batchId:"",
                    majorId:"",
                    level:"",
                    planId:"",
                    start:"",
                   	end:""
                },
                tableData: [],
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
                    cardType:1,
                    cardNo:"",
                    disciplineId:"",
                    majorId:"",
                    level:"",
                    batchId:"",
                    remark:"",
                    cardNo:"",        
                    ableStatus:1,
                },
                rulesForm: {
                    name: [
                        { required: true, message: "请输入学生姓名", trigger: "blur" },
                        {
                            min: 1,
                            max: 20,
                            message: "最长 20 个字符",
                            trigger: "change"
                        }
                    ],
                    cardType: [
                        { required: true, message: "请选择证件类型", trigger: "blur" },
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
                    term: [
                        { required: true, message: "请选择学期", trigger: "blur" },
                    ],
                    majorId: [
                        { required: true, message: "请选择专业", trigger: "blur" },
                    ],
                    batchId: [
                        { required: true, message: "请选择年级", trigger: "blur" },
                    ],
                    enrollYear: [
                        { required: true, message: "请输入年份", trigger: "blur" },
                    ],
                    stationId: [
                        { required: true, message: "请选择函授站", trigger: "blur" },
                    ]
                },
				
				trailForm:{
					agreeStatus:3
				},

                saveOutRules: {
                    content: [
                        { required: true, message: "请输入转出信息 ", trigger: "blur" },
                    ],
                },

                allotRules: {
                    kind: [
                        { required: true, message: "请选择操作类型 ", trigger: "blur" },
                    ],
                    newValue: [
                        { required: true, message: "请选择更变后的值 ", trigger: "blur" },
                    ],
                    stationId: [
                        { required: true, message: "请选择函授站 ", trigger: "blur" },
                    ],

                },
                saveOutForm:{
                    content:""
                },
                allotForm:{
                    kindId:"",
                    newValue:""
                },


                disciplineList:[],
                majorList:[],
                stationList:[],
                yearList:[],
                actionId:"",



                agreeStatusList:[{
                    name:'未提交',
                    id:0
                },{
                    name:'待审核',
                    id:1
                },{
                    name:'通过',
                    id:2
                },{
                    name:'拒绝',
                    id:3
                }],





                schoolStatusList:[
                    // {
                //     name:'补录',
                //     id:-2
                // },{
                //     name:'转出',
                //     id:-1
                // },{
                //     name:'考前',
                //     id:0
                // },
                    {
                    name:'正常',
                    id:1
                },{
                    name:'休学',
                    id:2
                },{
                    name:'退学',
                    id:3
                },{
                    name:'延迟毕业',
                    id:4
                },{
                    name:'肄业',
                    id:5
                },{
                    name:'毕业',
                    id:6
                }],
                actionRow:{},

                kindIdList:[{
                    name:'变更学籍状态',
                    id:1
                },{
                    name:'变更专业',
                    id:2
                },{
                    name:'变更函授站',
                    id:3
                }],
                batchList:[],
                trailDialogVisible:false,
                trailRow:{},
                allotDialogVisible:false,
                courseList:[]
            };
        },
        components: {},
        computed: mapState(["userInfo"]),
        mounted() {
        	this.getExamStudentList_courses();
        	this.getStudentPreSimpleMajors();
        	this.getBatchList();
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
            showTrail(row){
            	this.trailDialogVisible=true;
            	this.trailRow={...row}
            },
            closeDialog(){
            	this.allotForm={
            		kindId:"",
            		newValue:""
            	}
            },
            sureTrial(){
            	this.$api.studentManagement.studentInfo_trail(this.trailRow.id,this.trailForm).then((res)=>{
            		this.$message.success("审核成功!");
            		this.ready_ajax();
            		this.trailDialogVisible=false
            	}).catch((e)=>{
            		this.$message.error("审核失败")
            	})
            },
            showApply(row){
            	this.$confirm( `确认要对${row.userName}进行申请操作吗?`,'提示', {
		          distinguishCancelAndClose: true,
		          confirmButtonText: '确定',
		          cancelButtonText: '取消'
		        })
		          .then(() => {
		           	this.$api.studentManagement.studentInfo_apply(row.id).then((res)=>{
		           		this.$message.error("申请成功");
		           		this.ready_ajax();
		           	}).catch((e)=>{
		           		this.$message.error("申请失败")
		           	})
		          })
		          .catch(action => {
//		            this.$message.info("取消申请")
		          });
            },
            getBatchList(){
              this.$api.exam.getExamStudentList_batchs().then((res)=>{
                  this.batchList=res.data;
              })
            },
            showChange(item){
                this.actionRow={...item};
                this.allotDialogVisible=true;
                console.log(this.actionRow)
            },
            sureChange(formName){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$api.studentManagement.studentInfo_allot(this.actionRow.id,this.allotForm).then((res)=>{1
                            this.$message.success("学籍变更成功");
                            this.allotDialogVisible=false;
                            this.ready_ajax()
                        }).catch((e)=>{
                            this.$message.error("学籍变更失败")
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
            getExamStudentList_courses(){
                this.$api.exam.getExamStudentList_courses().then((res)=>{
                    this.courseList=res.data
                })
            },
            getStudentPreSimpleMajors(){
                this.$api.exam.getExamStudentList_majors().then((res)=>{
                    this.majorList=res.data
                })
            },
            getStudentPreSimpleStations(){
                this.$api.studentManagement.getStudentInfoSimpleStations().then((res)=>{
                    this.stationList=res.data
                })
            },
            get_ajax() {
                this.tableLoading = true;
                this.$api.exam
                    .getDailyScoreList({
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
                    cardType:1,
                    cardNo:"",
                    disciplineId:"",
                    majorId:"",
                    level:"",
                    enrollYear:"",
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
                    name:row.userName,
                    cardType:row.cardType,
                    cardNo:row.cardNo,
                    batchId:row.batchId,
                    disciplineId:row.disciplineId,
                    majorId:row.majorId,
                    level:+row.level,
                    enrollYear:row.enrollYear,
                    remark:row.remark,
                    term:row.term,
                    stationId:row.stationId,
                    ableStatus:row.ableStatus,
                };
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },
            //添加编辑数据
            add_ajax() {
                if (this.dialogType === 0) {
                    this.$api.studentManagement
                        .studentInfo_add(this.form)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "添加成功!"
                            });
                            this.dialogAddVisible = false;
                            this.ready_ajax();
                        });
                } else {
                    this.$api.studentManagement
                        .studentInfo_edit(this.form.id,this.form)
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
<style lang="less">
	.el-message-box{
		.el-message-box__btns{
			.el-button{
				span{
					color:white!important
				}
			}
		}
	}
</style>