<template>
    <div class="schoolManagementWrap">
        <el-card class="pageCard">
            <div class="pageHead flexItem" style="flex-wrap:wrap">

                <div class="headTopItem">
                    <span class='label marL10'>年级</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.batchId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option v-for="(item,index) in batchList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="headTopItem">
                    <span class='label marL10'>层次</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.level" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
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
                        <el-select v-model="tableForm.majorId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option
                                    v-for="(item,index) in majorList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"/>
                        </el-select>
                    </div>
                </div>

                <div class="headTopItem"  v-if="!userInfo.stationId">
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
                </div>

                <div class="headTopItem">
                    <span class='label marL10' style="word-spacing:1.7em">类型</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.kind" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option label="奖励" :value="1"></el-option>
                            <el-option label="惩罚" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="headTopItem" style="width: 360px">
                    <span class='label marL10'>学生</span>
                    <div class="marL10">
                        <!--searchInp-->
                        <el-input v-model="tableForm.name" class='searchInp' placeholder="请输入姓名，证件号码">
                            <el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>
                        </el-input>
                    </div>
                </div>

                <div class="comTopSaveBtn comTopOrangeBtn topBtn marL10 marT20" @click='dialogAdd_show' v-if="extra.indexOf('添加')>-1">
                    添加
                </div>


                <download url="student/before/downloadMould" class="marL10 marT20"  v-if="extra.indexOf('下载模板')>-1" />
                <upload class="marL10 marT20" url="/student/before/upload"    :ok="get_ajax"  v-if="extra.indexOf('批量导入')>-1"  ></upload>


                <!--<span class='label marL10'>科类</span>-->
                <!--<div class="marL10">-->
                    <!--<el-select v-model="tableForm.disciplineId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">-->
                        <!--<el-option label="所有" value=""/>-->
                        <!--<el-option-->
                                <!--v-for="(item,index) in disciplineList"-->
                                <!--:key="index"-->
                                <!--:label="item.name"-->
                                <!--:value="item.id"/>-->
                    <!--</el-select>-->
                <!--</div>-->







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
                    <!--<el-table-column
                            prop="enrollYear"
                            label="报名年份" :show-overflow-tooltip="true">
                    </el-table-column>-->
                      <el-table-column
                            prop="batchName"
                            label="年级"  :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            prop="studentName"
                            label="姓名"  :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            label="证件类型"  :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{scope.row.cardType==1?'身份证':scope.row.cardType==2?'军官证/士兵证':'港澳通行证'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="cardNo"
                            label="证件号码"  :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            prop="level"
                            label="层次"
                            :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{scope.row.level==1?'高起专':scope.row.level==2?'专升本':'高起本'}}
                        </template>
                    </el-table-column>
                    <!--<el-table-column
                            prop="disciplineName"
                            label="科类"  :show-overflow-tooltip="true">
                    </el-table-column>-->
                    <el-table-column
                            prop="majorName"
                            label="专业"  :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="内容"  :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            prop="stationName"
                            label="函授站"   v-if="!userInfo.stationId" :show-overflow-tooltip="true">
                    </el-table-column>
                      <el-table-column
                            prop="kind"
                            label="类型"  :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{scope.row.kind==1?'奖励':'惩罚'}}
                        </template>
                    </el-table-column>
                    <!--<el-table-column
                            prop="stationName"
                            label="录取状态">
                    </el-table-column>-->
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
                            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showAllot(scope.row)">分配</el-button>-->
                            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showSaveAppend(scope.row.id)">补录</el-button>-->

                            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="$router.push(`/studentManagement/studentDetailPre/${scope.row.id}/${scope.row.userName}`)" >查看</el-button>-->

                            <el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="dialogEdit_show(scope.row)" v-if="extra.indexOf('编辑')>-1">编辑</el-button>
                            <baseDelBtn delUrl="/student/rp" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>
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
            title="添加奖惩信息"
            :visible.sync="dialogAddVisible"
            width="660px"
            center
            :append-to-body="true"
            class="kf-dialog-add">
            <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
            <el-form-item label="学生姓名" prop="name">
            <el-input v-model.trim="form.name" placeholder="请输入学生姓名（不超过20个字）"></el-input>
            </el-form-item>

                <el-form-item label="证件号码" v-if="form.cardNo">
                    <el-input v-model.trim="form.cardNo" :disabled="true" placeholder="请输入证件号码"></el-input>
                </el-form-item>


                <el-form-item label="类型" prop="kind">
                    <el-select  style="width:100%" v-model="form.kind" placeholder="请选择操作类型">
                        <!--<el-option label="身份证" :value="0"></el-option>-->
                        <el-option label="奖励" :value="1"></el-option>
                        <el-option label="惩罚" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <el-input v-model.trim="form.content" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
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
            title="编辑奖惩信息"
            :visible.sync="dialogeditVisible"
            width="660px"
            center
            :append-to-body="true"
            class="kf-dialog-add">
            <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
            <el-form-item label="学生姓名" prop="name">
            <el-input v-model.trim="form.name" :disabled="true" placeholder="请输入学生姓名（不超过20个字）"></el-input>
            </el-form-item>

                <el-form-item label="证件号码" v-if="form.cardNo">
                    <el-input v-model.trim="form.cardNo" :disabled="true" placeholder="请输入证件号码"></el-input>
                </el-form-item>


                <el-form-item label="类型" prop="kind">
                    <el-select  style="width:100%" v-model="form.kind" placeholder="请选择证件类型">
                        <!--<el-option label="身份证" :value="0"></el-option>-->
                        <el-option label="奖励" :value="1"></el-option>
                        <el-option label="惩罚" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <el-input v-model.trim="form.content" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
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
                    <el-form-item label="学生">
                        <el-input v-model.trim="actionRow.name" :disabled="true" placeholder="请输入学生姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="学生">
                        <el-input v-model.trim="actionRow.name" :disabled="true" placeholder="请输入学生姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input v-model.trim="actionRow.cardNo" :disabled="true" placeholder="请输入证件号码"></el-input>
                    </el-form-item>
                    <el-form-item label="函授站" prop="stationId" v-if="!userInfo.stationId">
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
    import { mapState } from "vuex";
    export default {
        data() {
            var checkStudent = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入学生姓名'));
                } else {
                    this.$api.studentManagement.getStudentInfoList({
                        name:this.form.name,
                        pageNum:1,
                        pageSize:10
                    }).then((res)=>{
                        if(!res.data.pageList.length){
                            return callback(new Error('学生不存在'));
                        }else{
                            this.form.studentId=res.data.pageList[0].id;
                            this.$set(this.form,'cardNo',res.data.pageList[0].cardNo)
                            // this.form.cardNo=res.data.pageList[0].cardNo;
                            return callback();
                        }
                    }).catch((e)=>{
                        return callback(new Error('学生不存在'));
                    })
                }
            };
            return {
                extra: [],
                tableLoading: false,
                tableForm: {
                    name: "",
                    stationId:"",
                    majorId:"",
                    level:"",
                    batchId:"",
                    kind:"",
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
                    studentId:"",
                    content:"",
                    remark:"",
                    kind:""
                },
                rulesForm: {
                    name: [
                        { required: true, validator: checkStudent, trigger: "blur" },
                    ],
                    kind: [
                        { required: true, message: "请选择操作类型", trigger: "blur" },
                    ],
                    content: [
                        { required: true, message: "请输入内容", trigger: "blur" },
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
                batchList:[],
                dialogeditVisible:false
            };
        },
        computed: mapState([ "userInfo"]),
        mounted() {
//	this.getKindList();
//	this.getStationList();
//             console.log(this.userInfo)
            console.log(new Date().getFullYear())
            let now=new Date().getFullYear()
            for(let i=now;i<now+5;i++){
                this.yearList.push(i)
            }
            // this.tableForm.batchId=now;
            // this.getStudentPreSimpleDisplines();
            this.getStudentPreSimpleMajors();
            this.getStudentPreSimpleStations();
            this.getBatchList()
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
            getBatchList(){
                this.$api.essentialInformation.batch_get_list().then((res)=>{
                    this.batchList=res.data.pageList
                })
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
                this.$api.studentManagement.getStudentTransSimpleDisplines().then((res)=>{
                    this.disciplineList=res.data
                })
            },
            getStudentPreSimpleMajors(){
                this.$api.studentManagement.getStudentrpSimpleMajors().then((res)=>{
                    this.majorList=res.data
                })
            },
            getStudentPreSimpleStations(){
                this.$api.studentManagement.getStudentrpSimpleStations().then((res)=>{
                    this.stationList=res.data
                })
            },
            get_ajax() {
                this.tableLoading = true;
                this.$api.studentManagement
                    .getStudentrpList({
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
                    studentId:"",
                    content:"",
                    remark:"",
                    kind:""
                };
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },
            //显示编辑框
            dialogEdit_show(row) {
                this.dialogType = 1;
                this.dialogeditVisible = true;
                this.form = {
//      id: row.id,
//      kindId: row.kindId, //课件名称
//      content: row.content, //课件编码
//      remark: row.remark, //备注
//      ableStatus: row.ableStatus //启用状态(1启用0禁用)
                    id:row.id,
                    name:row.studentName,
                    kind:row.kind,
                    content:row.content,
                    remark:row.remark,
                };
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },
            //添加编辑数据
            add_ajax() {
                if (this.dialogType === 0) {
                    this.$api.studentManagement
                        .studentrp_add(this.form)
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
                        .studentrp_edit(this.form.id,this.form)
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
