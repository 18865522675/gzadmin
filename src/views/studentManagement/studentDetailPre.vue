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
                        <div class="kf-table-tab-item" :class="{on: table_tab_ind === 1}" data-ind="1" @click="change_table_tab">网上报名</div>
                        <div class="kf-table-tab-item" :class="{on: table_tab_ind === 2}" data-ind="2" @click="change_table_tab">准考证信息</div>
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



                <div  v-show="table_tab_ind==1">
                    <div style="width: 600px;margin: 0 auto">
                        <label class="titles">网上报名信息</label>
                        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                            <el-form-item label="报考时间">
                                <el-input v-model="applyForm.name" placeholder="请输入报考时间"></el-input>
                            </el-form-item>
                            <el-form-item label="层次">
                                <el-select v-model="applyForm.level"  style="width: 100%" placeholder="请选择层次" filterable>
                                    <el-option label="所有" value=""/>
                                    <el-option label="高起专" :value="1"></el-option>
                                    <el-option label="专升本" :value="2"></el-option>
                                    <el-option label="高起本" :value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="科类">
                                <el-select v-model="applyForm.disciplineId"   style="width: 100%" placeholder="请选择科类" filterable >
                                    <el-option label="所有" value=""></el-option>
                                    <el-option
                                            v-for="(item,index) in disciplineList"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="专业">
                                <el-select v-model="applyForm.disciplineId"   style="width: 100%" placeholder="请选择专业" filterable>
                                    <el-option label="所有" value=""></el-option>
                                    <el-option
                                            v-for="(item,index) in disciplineList"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="报名号">
                                <el-input v-model="applyForm.type"  placeholder="请输入报名号"></el-input>
                            </el-form-item>
                            <el-form-item label="成考确认点">
                                <el-input v-model="applyForm.type"  placeholder="请输入成考确认点"></el-input>
                            </el-form-item>
                            <el-form-item label="确认时间">
                                <el-input v-model="applyForm.type"  placeholder="请输入确认时间"></el-input>
                            </el-form-item>
                            <el-form-item label="考区">
                                <el-input v-model="applyForm.type"  placeholder="请输入考区"></el-input>
                            </el-form-item>
                            <el-form-item label="确认地址">
                                <el-input v-model="applyForm.type"  placeholder="请输入确认地址"></el-input>
                            </el-form-item>
                            <el-form-item label="确认情况">
                                <el-input v-model="applyForm.type"  placeholder="请输入确认情况"></el-input>
                            </el-form-item>
                            <el-form-item style="text-align: center">
                                <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
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
                applyForm:{},
                disciplineList:[],
                majorList:[]
            }
        },
        mounted() {
            this.getStudentPreDetail(this.$route.params.studentId);
            this.getApplyForm(this.$route.params.studentId)
        },
        methods: {
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
                        // this.stuBaseInfo=res.data;
                    }
                }).catch((e)=>{
                    // console.log(e)
                    this.$message.error("获取网上报名信息失败")
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
