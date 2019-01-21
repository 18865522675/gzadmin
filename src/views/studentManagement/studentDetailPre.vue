<template>
    <div class="g-module">
        <el-card>
            <!--筛选-->
            <div class="kf-screen">
                <el-form class="kf-form">
                    <div class="kf-row">
                        <el-form-item label="学生姓名" class="kf-form-item form-search">
                            <el-input :value="$route.params.studentName" disabled></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div class="kf-bd">
                <!--tab切换-->
                <div class="kf-table-tab">
                    <div class="kf-table-tab-box">
                        <div class="kf-table-tab-item" :class="{on: table_tab_ind === 0}" data-ind="0" @click="change_table_tab">基本信息</div>
                        <!--<div class="kf-table-tab-item" :class="{on: table_tab_ind === 1}" data-ind="1" @click="change_table_tab">网上报名</div>-->
                        <!--<div class="kf-table-tab-item" :class="{on: table_tab_ind === 2}" data-ind="2" @click="change_table_tab">准考证信息</div>-->
                        <div class="kf-table-tab-item" :class="{on: table_tab_ind === 3}" data-ind="3" @click="change_table_tab">考试信息</div>
                        <!--<div class="kf-table-tab-item" :class="{on: table_tab_ind === 4}" data-ind="4" @click="change_table_tab">录取信息</div>-->
                    </div>
                </div>

                <div class="tableWrap flexItem" style="flex-wrap: wrap" v-show="table_tab_ind==0">
                    <div>
                        账号
                    </div>
                    <div>
                        {{stuBaseInfo.account}}
                    </div>
                    <div>
                        姓名
                    </div>
                    <div>
                        {{stuBaseInfo.userName}}
                    </div>
                    <div>
                        性别
                    </div>
                    <div>
                        {{stuBaseInfo.gender}}
                    </div>
                    <div>
                        年级
                    </div>
                    <div>
                        {{stuBaseInfo.batchName}}
                    </div>


                    <div>
                        报考年份
                    </div>
                    <div>
                        {{stuBaseInfo.enrollYear}}
                    </div>
                    <div>
                        证件类型
                    </div>
                    <div>
                        {{stuBaseInfo.cardType==1?'身份证':stuBaseInfo.cardType==2?'军官证/士兵证':'港澳通行证'}}
                    </div>
                    <div>
                        证件号码
                    </div>
                    <div>
                        {{stuBaseInfo.cardNo}}
                    </div>
                    <div>
                        出生日期
                    </div>
                    <div>
                        {{stuBaseInfo.birthday}}
                    </div>



                    <div>
                        民族
                    </div>
                    <div>
                        {{stuBaseInfo.nation}}
                    </div>
                    <div>
                        政治面貌
                    </div>
                    <div>
                        {{stuBaseInfo.political}}
                    </div>
                    <div>
                        邮编
                    </div>
                    <div>
                        {{stuBaseInfo.zipCode}}
                    </div>
                    <div>
                        Email
                    </div>
                    <div>
                        {{stuBaseInfo.email}}
                    </div>



                    <div>
                        层次
                    </div>
                    <div>
                        {{stuBaseInfo.level==1?'高起专':stuBaseInfo.level==2?'专升本':'高起本'}}
                    </div>
                    <div>
                        科类
                    </div>
                    <div>
                        {{stuBaseInfo.disciplineName}}
                    </div>
                    <div>
                        专业
                    </div>
                    <div>
                        {{stuBaseInfo.majorName}}
                    </div>
                    <div>
                        班级
                    </div>
                    <div>
                        {{stuBaseInfo.className}}
                    </div>





                    <div>
                        原毕业院校
                    </div>
                    <div>
                        {{stuBaseInfo.graduateSchool}}
                    </div>
                    <div>
                        原毕业年份
                    </div>
                    <div>
                        {{stuBaseInfo.graduateDate}}
                    </div>
                    <div>
                        最高学历
                    </div>
                    <div>
                        {{stuBaseInfo.lastEducation}}
                    </div>
                    <div>
                        籍贯
                    </div>
                    <div>
                        {{stuBaseInfo.place}}
                    </div>



                    <div>
                        原证书编号
                    </div>
                    <div>
                        {{stuBaseInfo.diplomaNo}}
                    </div>
                    <div>
                        移动电话
                    </div>
                    <div>
                        {{stuBaseInfo.phone}}
                    </div>
                    <div>
                        通讯地址
                    </div>
                    <div>
                        {{stuBaseInfo.address}}
                    </div>
                    <div>
                        学籍状态
                    </div>
                    <div>
                        {{stuBaseInfo.diplomaNo}}
                    </div>



                    <div>
                        学位申请
                    </div>
                    <div>
                        域名前缀+身份证号
                    </div>
                    <div>
                        状态
                    </div>
                    <div>
                        ***
                    </div>
                    <div>
                        备注
                    </div>
                    <div style="overflow:hidden;" :title="stuBaseInfo.remark">
                        {{stuBaseInfo.remark}}
                    </div>
                </div>



                <!--<div  v-show="table_tab_ind==1">
                    <div style="width: 600px;margin: 0 auto">
                        <label class="titles">网上报名信息</label>
                        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                            <el-form-item label="报考时间">
                                <el-input v-model="applyForm.name" placeholder="请输入报考时间"></el-input>
                            </el-form-item>
                            <el-form-item label="层次">
                                <el-input :value="stuBaseInfo.level==1?'高起专':stuBaseInfo.level==2?'专升本':'高起本'"  :disabled="true" placeholder="请输入层次"></el-input>
                            </el-form-item>
                            <el-form-item label="科类">
                                <el-input  :value="stuBaseInfo.disciplineName" :disabled="true"  placeholder="请输入科类"></el-input>
                            </el-form-item>
                            <el-form-item label="专业">
                                <el-input  :value="stuBaseInfo.majorName" :disabled="true"  placeholder="请输入专业"></el-input>
                            </el-form-item>
                            <el-form-item label="报名号">
                                <el-input v-model="applyForm.enrollNo"  placeholder="请输入报名号"></el-input>
                            </el-form-item>
                            <el-form-item label="成考确认点">
                                <el-input v-model="applyForm.confirmScoreArea"  placeholder="请输入成考确认点"></el-input>
                            </el-form-item>
                            <el-form-item label="确认时间">
                                <el-date-picker
                                        v-model="applyForm.confirmTime"
                                        style="width: 100%"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="考区">
                                <el-input v-model="applyForm.examArea"  placeholder="请输入考区"></el-input>
                            </el-form-item>
                            <el-form-item label="确认地址">
                                <el-input v-model="applyForm.confirmAddress"  placeholder="请输入确认地址"></el-input>
                            </el-form-item>
                            <el-form-item label="确认情况">
                                <el-radio-group v-model="applyForm.confirmed">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item style="text-align: center">
                                <el-button type="primary" @click="saveApplyNet">保 存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>-->



                <!--<div  v-show="table_tab_ind==2">
                    <div style="width: 600px;margin: 0 auto">
                        <label class="titles">准考证信息</label>
                        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                            <el-form-item label="科目">
                                <el-input v-model="stuTicketInfo.obj1" placeholder="请输入科目"></el-input>
                            </el-form-item>
                            <el-form-item label="考试地点">
                                <el-input v-model="stuTicketInfo.obj1Area" placeholder="请输入考试地点"></el-input>
                            </el-form-item>
                            <el-form-item label="开始时间">
                                <el-date-picker
                                        v-model="stuTicketInfo.obj1StartTime"
                                        style="width: 100%"
                                        type="datetime"
                                        placeholder="选择开始时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-date-picker
                                        v-model="stuTicketInfo.obj1EndTime"
                                        style="width: 100%"
                                        type="datetime"
                                        placeholder="选择结束时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="科目">
                                <el-input v-model="stuTicketInfo.obj2" placeholder="请输入科目"></el-input>
                            </el-form-item>
                            <el-form-item label="考试地点">
                                <el-input v-model="stuTicketInfo.obj2Area" placeholder="请输入考试地点"></el-input>
                            </el-form-item>
                            <el-form-item label="开始时间">
                                <el-date-picker
                                        v-model="stuTicketInfo.obj2StartTime"
                                        style="width: 100%"
                                        type="datetime"
                                        placeholder="选择开始时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-date-picker
                                        v-model="stuTicketInfo.obj2EndTime"
                                        style="width: 100%"
                                        type="datetime"
                                        placeholder="选择结束时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="科目">
                                <el-input v-model="stuTicketInfo.obj3" placeholder="请输入科目"></el-input>
                            </el-form-item>
                            <el-form-item label="考试地点">
                                <el-input v-model="stuTicketInfo.obj3Area" placeholder="请输入考试地点"></el-input>
                            </el-form-item>
                            <el-form-item label="开始时间">
                                <el-date-picker
                                        v-model="stuTicketInfo.obj3StartTime"
                                        style="width: 100%"
                                        type="datetime"
                                        placeholder="选择开始时间">
                                </el-date-picker>
      
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-date-picker
                                        v-model="stuTicketInfo.obj3EndTime"
                                        style="width: 100%"
                                        type="datetime"
                                        placeholder="选择结束时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="科目">
                                <el-input v-model="stuTicketInfo.obj4" placeholder="请输入科目"></el-input>
                            </el-form-item>
                            <el-form-item label="考试地点">
                                <el-input v-model="stuTicketInfo.obj4Area" placeholder="请输入考试地点"></el-input>
                            </el-form-item>
                            <el-form-item label="开始时间">
                                <el-date-picker
                                        v-model="stuTicketInfo.obj4StartTime"
                                        style="width: 100%"
                                        type="datetime"
                                        placeholder="选择开始时间">
                                </el-date-picker>
  
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-date-picker
                                        v-model="stuTicketInfo.obj4EndTime"
                                        style="width: 100%"
                                        type="datetime"
                                        placeholder="选择结束时间">
                                </el-date-picker>
     
                            </el-form-item>
                            <el-form-item label="是否领取准考证">
                                <el-radio-group v-model="stuTicketInfo.getTicket">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item style="text-align: center">
                                <el-button type="primary" @click="saveTicketInfo">保 存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>-->




                <div  v-show="table_tab_ind==3">
                    <div style="width: 600px;margin: 0 auto">
                        <label class="titles">考试信息</label>
                        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                            <el-form-item label="年级">
                                <el-input :value="stuBaseInfo.batchName" :disabled="true" placeholder="请输入年级"></el-input>
                            </el-form-item>
                            <el-form-item label="层次">
                                <el-input :value="stuBaseInfo.level==1?'高起专':stuBaseInfo.level==2?'专升本':'高起本'" :disabled="true"  placeholder="请输入层次"></el-input>
                            </el-form-item>
                            <el-form-item label="科类">
                                <el-input :value="stuBaseInfo.disciplineName" :disabled="true"  placeholder="请输入科类"></el-input>
                            </el-form-item>
                            <el-form-item label="专业">
                                <el-input  :value="stuBaseInfo.majorName" :disabled="true" placeholder="请输入专业"></el-input>
                            </el-form-item>
                            <el-form-item label="录取分数线">
                                <el-input v-model="stuExamInfo.scoreLine " placeholder="请输入录取分数线"></el-input>
                            </el-form-item>
                            <el-form-item label="考试总成绩">
                                <el-input v-model="stuExamInfo.examScore " placeholder="请输入考试总成绩"></el-input>
                            </el-form-item>
                            <el-form-item label="科目">
                                <el-input v-model="stuExamInfo.obj1" placeholder="请输入科目"></el-input>
                            </el-form-item>
                            <el-form-item label="成绩">
                                <el-input v-model="stuExamInfo.obj1Score" placeholder="请输入成绩"></el-input>
                            </el-form-item>
                            <el-form-item label="科目">
                                <el-input v-model="stuExamInfo.obj2" placeholder="请输入科目"></el-input>
                            </el-form-item>
                            <el-form-item label="成绩">
                                <el-input v-model="stuExamInfo.obj2Score" placeholder="请输入成绩"></el-input>
                            </el-form-item>
                            <el-form-item label="科目">
                                <el-input v-model="stuExamInfo.obj3" placeholder="请输入科目"></el-input>
                            </el-form-item>
                            <el-form-item label="成绩">
                                <el-input v-model="stuExamInfo.obj3Score" placeholder="请输入成绩"></el-input>
                            </el-form-item>
                            <el-form-item label="科目">
                                <el-input v-model="stuExamInfo.obj4" placeholder="请输入科目"></el-input>
                            </el-form-item>
                            <el-form-item label="成绩">
                                <el-input v-model="stuExamInfo.obj4Score" placeholder="请输入成绩"></el-input>
                            </el-form-item>
                            <el-form-item style="text-align: center">
                                <el-button type="primary" @click="saveExamInfo">保 存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>



            </div>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "studentDetailPre",
        data() {
            return {
                table_tab_ind:0,
                stuBaseInfo:{},
                stuExamInfo:{},
                stuTicketInfo:{},
                stuNetInfo:{},
                applyForm:{
                    confirmed:1
                },
                disciplineList:[],
                majorList:[]
            }
        },
        mounted() {
            this.getStudentPreDetail(this.$route.params.studentId);
//          this.getApplyForm(this.$route.params.studentId);
//          this.getTickeyForm(this.$route.params.studentId);
            this.getExamForm(this.$route.params.studentId);
        },
        methods: {
            saveExamInfo(){
                this.$api.studentManagement.saveExamForm({
                    studentId:this.stuExamInfo.studentId,
                    scoreLine:this.stuExamInfo.scoreLine,
                    examScore:this.stuExamInfo.examScore,
                    obj1:this.stuExamInfo.obj1,
                    obj1_score:this.stuExamInfo.obj1Score,
                    obj2:this.stuExamInfo.obj2,
                    obj2_score:this.stuExamInfo.obj2Score,
                    obj3:this.stuExamInfo.obj3,
                    obj3_score:this.stuExamInfo.obj3Score,
                    obj4:this.stuExamInfo.obj4,
                    obj4_score:this.stuExamInfo.obj4Score,
                }).then((res)=>{
                    this.$message.success("考试信息保存成功")
                }).catch((e)=>{
                    // console.log(e)
                    this.$message.success("考试信息保存失败")
                })
            },
            saveTicketInfo(){
                this.$api.studentManagement.saveTicketForm({
                    studentId:this.stuTicketInfo.studentId,
                    get_ticket:this.stuTicketInfo.getTicket,
                    obj1:this.stuTicketInfo.obj1,
                    obj1_area:this.stuTicketInfo.obj1Area,
                    obj1_start_time:this.$fun.time(this.stuTicketInfo.obj1StartTime),
                    obj1_end_time:this.$fun.time(this.stuTicketInfo.obj1EndTime),
                    obj2:this.stuTicketInfo.obj2,
                    obj2_area:this.stuTicketInfo.obj2Area,
                    obj2_start_time:this.$fun.time(this.stuTicketInfo.obj2StartTime),
                    obj2_end_time:this.$fun.time(this.stuTicketInfo.obj2EndTime),
                    obj3:this.stuTicketInfo.obj3,
                    obj3_area:this.stuTicketInfo.obj3Area,
                    obj3_start_time:this.$fun.time(this.stuTicketInfo.obj3StartTime),
                    obj3_end_time:this.$fun.time(this.stuTicketInfo.obj3EndTime),
                    obj4:this.stuTicketInfo.obj4,
                    obj4_area:this.stuTicketInfo.obj4Area,
                    obj4_start_time:this.$fun.time(this.stuTicketInfo.obj4StartTime),
                    obj4_end_time:this.$fun.time(this.stuTicketInfo.obj4EndTime),
                }).then((res)=>{
                    this.$message.success("准考证信息保存成功")
                }).catch((e)=>{
                    // console.log(e)
                    this.$message.success("准考证信息保存失败")
                })
            },
            saveApplyNet(){
                console.log(this.applyForm.confirmTime)
                this.$api.studentManagement.saveApplyForm({
                    studentId:this.applyForm.studentId,
                    enroll_no:this.applyForm.enrollNo,
                    confirm_score_area:this.applyForm.confirmScoreArea,
                    exam_area:this.applyForm.examArea,
                    confirm_address:this.applyForm.confirmAddress,
                    confirm_time:this.$fun.time(this.applyForm.confirmTime),
                    confirm:this.applyForm.confirmed,
                }).then((res)=>{
                    this.$message.success("考试信息保存成功")
                }).catch((e)=>{
                    // console.log(e)
                    this.$message.success("考试信息保存失败")
                })
            },
            change_table_tab(e){
                this.table_tab_ind=e.target.dataset.ind
            },
            getStudentPreDetail(id){
                this.$api.studentManagement.getStudentPreDetail(id).then((res)=>{
                    if(res.data&&Object.keys(res.data).length){
                        this.stuBaseInfo=res.data;
                    }
                }).catch((e)=>{
                    // console.log(e)
                    this.$message.error("获取学生详情失败")
                })
            },
            getApplyForm(id){
                this.$api.studentManagement.getApplyForm(id).then((res)=>{
                    if(res.data&&Object.keys(res.data).length){
                        this.applyForm=res.data;
                    }
                }).catch((e)=>{
                    // console.log(e)
                    this.$message.error("获取网上报名信息失败")
                })
            },
            getTickeyForm(id){
                this.$api.studentManagement.getTickeyForm(id).then((res)=>{
                    if(res.data&&Object.keys(res.data).length){
                        this.stuTicketInfo=res.data;
                    }
                }).catch((e)=>{
                    // console.log(e)
                    this.$message.error("获取准考证信息失败")
                })
            },
            getExamForm(id){
                this.$api.studentManagement.getExamForm(id).then((res)=>{
                    if(res.data&&Object.keys(res.data).length){
                        this.stuExamInfo=res.data;
                    }
                }).catch((e)=>{
                    // console.log(e)
                    this.$message.error("获取考试信息失败")
                })
            },
            getStudentPreSimpleDisplines(){
                this.$api.studentManagement.getStudentPreSimpleDisplines().then((res)=>{
                    this.disciplineList=res.data
                })
            },
            getStudentPreSimpleMajors(){
                this.$api.studentManagement.getStudentPreSimpleMajors().then((res)=>{
                    this.majorList=res.data
                })
            },
        },
        created() {
        },
        destoryed() {
        }
    }
</script>

<style scoped lang="less">
.tableWrap{
    div{
        text-align: center;
        width: 12.5%;
        font-size: 12px;
        box-sizing:border-box;
        padding: 8px 12px;
        border: 1px solid black;
    }
}
    .titles{
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        display: inline-block;
        line-height: 50px;
        width: 100% ;
    }
</style>
