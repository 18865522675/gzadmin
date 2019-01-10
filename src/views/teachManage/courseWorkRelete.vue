<template>
    <div class="schoolManagementWrap">
        <el-card class="pageCard">
            <div class="pageHead">
                <div>请先设置各项题目总分(总和100)</div>
                <div style="margin-top: 30px;">
  
                        <el-form class="flexDir-r" label="80px" style="display: flex;justify-content: flex-start;">
                                <el-form-item label="单选题" style="flex:1">
                                    <el-input type="number" v-model.number="simpleScore" placeholder='请输入单选题总分' :maxlength="3">
                                        <template slot="append">分</template>
                                    </el-input>
                                </el-form-item>
           
                                <el-form-item label="多选题" style="margin-left: 20px;flex:1">
                                    <el-input type="number"  v-model.number="multipleScore"  placeholder='请输入多选题总分' :maxlength="3">
                                        <template slot="append">分</template>
                                    </el-input>
                                </el-form-item>
                            
                      
                                <el-form-item label="判断题"  style="margin-left: 20px;flex:1">
                                    <el-input type="number"  v-model.number="judgementScore"  placeholder='请输入判断题总分' :maxlength="3">
                                        <template slot="append">分</template>
                                    </el-input>
                                </el-form-item>
                            
                        </el-form>
                   

                </div>







                <div class="comTopSaveBtn comTopOrangeBtn topBtn" style="margin-left: 20px!important;" @click="savePager">
                    	生成试卷
                </div>
            </div>

            <div class="pageCon">
                <el-table
                        v-loading="tableLoading"
                        :data="tableData"
                        border
                        tooltip-effect="dark"
                        ref="multipleTable"
                        @selection-change="handleSelectionChange"
                        class="kf-table"
                        style="width: 100%">
                     <el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="题目" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="题型" :show-overflow-tooltip="true" :formatter="forType">
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
                        <el-select v-model="form.planId" class="kf-select" placeholder="请选择" filterable  @change="searchChange" style="width: 100%">
                            <el-option v-for="(item,index) in teachPlanList" :key="index" :label="item.siteCourseName" :value="item.planId"></el-option>
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
                    planId:"",
                    stationId:"",
                    name:''
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
                actionRow:{},
                teachPlanList:[],
                multipleSelection: [],
                simpleScore:"",
                multipleScore:"",
                judgementScore:"",
//              simpleCount:0,
//              multipleCount:0,
//              judgementCount:0
              
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
            // this.tableForm.batchId=now;
            this.getStudentPreSimpleDisplines();
            this.getStudentPreSimpleMajors();
            this.getStudentPreSimpleStations();
            this.get_discussTeachPlanList()
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
            handleSelectionChange(val) {
            	if(this.simpleScore+this.multipleScore+this.judgementScore!=100){
            		this.$nextTick(()=>{
            			 this.$refs.multipleTable.clearSelection();
            		})
            		return this.$message.warning("请设置正确的总分");
            	}
	        	this.multipleSelection = val;
	      	},
            get_discussTeachPlanList(){
                this.$api.teachManage
                    .get_courseWorkTeachPlanList()
                    .then(res => {
                        this.teachPlanList=res.data
                    });
            },
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
                this.$api.teachManage
                    .get_courseWorkExerciseList(this.$route.params.workId)
                    .then(res => {
                        this.extra = res.data.extra;
                        this.tableData = res.data.exercises;
                        this.simpleScore=res.data.singleAllScore?res.data.singleAllScore:"";
                        this.multipleScore=res.data.multipleAllScore?res.data.multipleAllScore:"";
                        this.judgementScore=res.data.judgmentAllScore?res.data.judgmentAllScore:"";
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
            },
            forType(row){
            	switch(row.type){
            		case 1:return "判断";break;
            		case 2:return "单选";break;
            		case 3:return "多选";break;
            	}
            },
            savePager(){
            	if(!this.multipleSelection.length){
            		return this.$message.warning("请先选择习题")
            	}
            	let  simpleCount=0;
                let multipleCount=0;
                let judgementCount=0;
                let idarr=[];
                this.multipleSelection.map((item)=>{
                	idarr.push(item.id)
                	switch(item.type){
                		case 1:judgementCount+=1;break;
                		case 2:simpleCount+=1;break;
                		case 3:multipleCount+=1;break;
                	}
                })
                this.$api.teachManage.courseWorkAddWork({
                	courseWorkId:this.$route.params.workId,
                	simpleCount,
                	multipleCount,
                	judgementCount,
                	simpleScore:this.simpleScore,
                	multipleScore:this.multipleScore,
                	judgementScore:this.judgementScore,
                	exerciseList:idarr.join(",")
                }).then(()=>{
                	this.$message.success("试卷生成成功")
                }).catch((e)=>{
                	this.$message.error("试卷生成失败")
                })
                
            }
            //分页end
        }
    };
</script>
