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
                    <span class='label marL10'>专业</span>
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
                
                <div class="headTopItem"   v-if="!userInfo.stationId">
                    <span class='label marL10'>函授站</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.stationId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option
                                    v-for="(item,index) in stationList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"/>
                        </el-select>
                    </div>
                </div>
                
                <!--<div class="headTopItem">
                    <span class='label marL10'>导师</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.teacherId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option
                                    v-for="(item,index) in teacherList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"/>
                        </el-select>
                    </div>
                </div>-->
                
                <div class="headTopItem">
                    <span class='label marL10'>匹配状态</span>
                    <div class="marL10">
                        <el-select v-model="tableForm.matchStatus" class="kf-select" placeholder="请选择" filterable  @change="searchChange">
                            <el-option label="所有" value=""/>
                            <el-option
                                    v-for="(item,index) in matchStatusList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"/>
                        </el-select>
                    </div>
                </div>

                 <div class="headTopItem">
                <div class="flexItem">
                    <span class='label marL10'>证件号码</span>
                    <div class="marL10">
                        <!--searchInp-->
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







                <div class=" comTopOrangeBtn topBtn marL10 marT20" @click='sendAction(true)' >
                    下发
                </div>
                <div class=" comTopOrangeBtn topBtn marL10 marT20" @click='sendAction(false)' >
                    取消下发
                </div>
                <upload class="marL10 marT20" url="/advice/note/uploadSimpleNote"  successInfo="通知书上传成功" text='上传通知书'  :isMore="true"   :ok="get_ajax"  v-if="extra.indexOf('上传')>-1"  ></upload>

                <!--<span class='label marL10' style="word-spacing:1.7em">专业</span>-->
                <!--<div class="marL10">-->
                    <!--<el-select v-model="tableForm.majorId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">-->
                        <!--<el-option label="所有" value=""/>-->
                        <!--<el-option-->
                                <!--v-for="(item,index) in majorList"-->
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


                <!--<span class='label marL10'>函授站</span>-->
                <!--<div class="marL10">-->
                <!--<el-select v-model="tableForm.stationId" class="kf-select" placeholder="请选择" filterable  @change="searchChange">-->
                <!--<el-option label="所有" value=""/>-->
                <!--<el-option-->
                <!--v-for="(item, index) in stationList"-->
                <!--:key="index"-->
                <!--:label="item.name"-->
                <!--:value="item.id"/>-->
                <!--</el-select>-->
                <!--</div>-->

                <!--<span class='label marL10'>学生</span>-->
                <!--<div class="marL10">-->
                    <!--&lt;!&ndash;searchInp&ndash;&gt;-->
                    <!--<el-input v-model="tableForm.name" class='searchInp' placeholder="请输入姓名，证件号码">-->
                        <!--<el-button slot="append" icon="el-icon-search" @click="get_ajax()"></el-button>-->
                    <!--</el-input>-->
                <!--</div>-->
                <!--<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='dialogAdd_show' v-if="extra.indexOf('添加')>-1">-->
                    <!--添加-->
                <!--</div>-->

                <!--<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='saveOutDialogVisible=true' >-->
                <!--转出-->
                <!--</div>-->

                <!--<div class="comTopSaveBtn comTopOrangeBtn topBtn marL10" @click='saveAppend_show' v-if="extra.indexOf('添加')>-1">-->
                <!--补录-->
                <!--</div>-->


            <div class="pageCon">
                <el-table
                        v-loading="tableLoading"
                        :data="tableData"
                        border
                          ref="multipleTable"
                          @selection-change="handleSelectionChange"
                        class="kf-table"
                        style="width: 100%">
                    <el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>
                    <el-table-column
                            type="index"
                            :index="(index) => (pageNum - 1) * pageSize + index + 1"
                            label="序号"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="学号">
                    </el-table-column>
                    <el-table-column
                            prop="batchName"
                            label="年级">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="姓名">
                    </el-table-column>
                    <!--<el-table-column
                            label="证件类型" :show-overflow-tooltip="true">
                        <template slot-scope="scope" >
                            {{scope.row.cardType==1?'身份证':scope.row.cardType==2?'军官证/士兵证':'港澳通行证'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="cardNo"
                            label="证件号码" :show-overflow-tooltip="true">
                    </el-table-column>-->
                    <el-table-column
                            prop="level"
                            label="层次">
                        <template slot-scope="scope">
                        {{scope.row.level==1?'高起专':scope.row.level==2?'专升本':'高起本'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="majorName"
                            label="专业"  :show-overflow-tooltip="true" >
                    </el-table-column>
                    <el-table-column
                            prop="stationName"
                            label="函授站" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                            prop="cardNo"
                            label="证件号码" :show-overflow-tooltip="true">
                    </el-table-column>
                    <!--<el-table-column
                            prop="direction"
                            label="选题方向" :show-overflow-tooltip="true">
                    </el-table-column>-->
                    <el-table-column
                            prop="topicName"
                            label="上传状态" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                            	<span>上传成功</span>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="topicName"
                            label="下发状态" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                            	{{scope.row.displayStatus==1?'已下发':'未下发'}}
                            </template>
                    </el-table-column>
                    <!--<el-table-column
                            prop="commitTime"
                            label="申请时间" :show-overflow-tooltip="true" :formatter="$fun.table.time">
                    </el-table-column>
                    <el-table-column
                            prop="auditStatus"
                            label="审核状态" :show-overflow-tooltip="true" :formatter="formats">
                    </el-table-column>-->
                    <el-table-column
                            fixed="right"
                            label="操作" width="350">
                        <template slot-scope="scope">
                        	<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showSee(scope.row)">查看</el-button>
                        	<baseDelBtn delUrl="/advice/note/remove" :delId="scope.row.id" :delOk="get_ajax" v-if="extra.indexOf('删除')>-1"/>                        <!--<baseDelBtn delUrl="/thesis/topic"  :delId="scope.row.id" :delOk="get_ajax" />-->
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--prop="disciplineName"-->
                            <!--label="科类">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--prop="majorName"-->
                            <!--label="专业">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--prop="batchName"-->
                            <!--label="函授站">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.stationName?scope.row.stationName:'未分配'}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--prop="status"-->
                            <!--label="录取状态" :formatter="forSchoolStatus">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--fixed="right"-->
                            <!--label="操作" width="200">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-button type="text" size="small" class="kf-btn kf-btn-table kf-orange-btn small" @click="showAllot(scope.row)" v-if="extra.indexOf('分配函授站')>-1">分配函授站</el-button>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
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

            <!--<el-dialog-->
            <!--:title="dialogType===0?'添加':'编辑'"-->
            <!--:visible.sync="dialogAddVisible"-->
            <!--width="660px"-->
            <!--center-->
            <!--:append-to-body="true"-->
            <!--class="kf-dialog-add">-->
            <!--<el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">-->
            <!--<el-form-item label="学生名称" prop="name">-->
            <!--<el-input v-model.trim="form.name" placeholder="请输入学生姓名（不超过20个字）"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="证件类型" prop="cardType">-->
            <!--<el-select  style="width:100%" v-model="form.cardType" placeholder="请选择证件类型">-->
            <!--<el-option label="身份证" :value="0"></el-option>-->
            <!--<el-option label="军官证/士兵证" :value="1"></el-option>-->
            <!--<el-option label="港澳通行证" :value="2"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="证件号码" prop="cardNo">-->
            <!--<el-input v-model.trim="form.cardNo" placeholder="请输入证件号码"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="科类" prop="disciplineId">-->
            <!--<el-select  style="width:100%" v-model="form.disciplineId" placeholder="请选择科类">-->
            <!--<el-option v-for="(item,index) in disciplineList" :key="index"  :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="专业" prop="majorId">-->
            <!--<el-select  style="width:100%" v-model="form.majorId" placeholder="请选择专业">-->
            <!--<el-option v-for="(item,index) in majorList" :key="index"  :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="层次" prop="level">-->
            <!--<el-select  style="width:100%" v-model="form.level" placeholder="请选择层次">-->
            <!--<el-option label="军官证/士兵证" :value="1"></el-option>-->
            <!--<el-option label="港澳通行证" :value="2"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="报考年份" prop="enrollYear">-->
            <!--<el-input v-model.trim="form.enrollYear" placeholder="请输入报考年份"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="状态">-->
            <!--<el-radio-group v-model="form.ableStatus">-->
            <!--<el-radio :label="1">启用</el-radio>-->
            <!--<el-radio :label="0">禁用</el-radio>-->
            <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="备注" prop="remark">-->
            <!--<el-input v-model.trim="form.remark" placeholder="请输入备注" type="textarea" :rows="2"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<div slot="footer" class="dialog-footer">-->
            <!--<el-button type="primary" @click="submitForm">保 存</el-button>-->
            <!--</div>-->
            <!--</el-dialog>-->



            <el-dialog
      :title="dialogType===0?'添加':'编辑'"
      :visible.sync="dialogAddVisible"
      width="660px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
      	<el-form-item label="年级" prop="batchId">
          <el-select  style="width:100%" v-model="form.batchId" placeholder="请选择年级">
          	<el-option v-for="(item,index) in batchList" :key="index" :value="item.id" :label="item.name">
          	</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="层次" prop="level">
          <el-select  style="width:100%" v-model="form.level" placeholder="请选择层次">
          	<el-option label="高起专" :value="1"></el-option>
            <el-option label="专升本" :value="2"></el-option>
            <el-option label="高起本" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="majorId">
          <el-select  style="width:100%" v-model="form.majorId" placeholder="请选择专业">
          	<el-option v-for="(item,index) in majorList" :key="index" :value="item.id" :label="item.name">
          	</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入导师名字"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="summary">
          <el-input v-model.trim="form.summary" placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>
    
    
    
              <el-dialog
      :title="applyType?'通过':'拒绝'"
      :visible.sync="applyDialog"
      width="660px"
      center
      @close="closeDialog"
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="applyForm" :rules="applyForm" :model="applyForm" label-width="120px" class="kf-form-add">
      	<el-form-item label="理由">
               <el-input v-model.trim="applyForm.remark" placeholder="请输入理由"></el-input>
       </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitApplyForm">保 存</el-button>
      </div>
    </el-dialog>
    
    
       <el-dialog
      title="查看"
      :visible.sync="showSeeDialogVisible"
      width="900px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <div>
      	<iframe :src="showSeeUrl" style="width: 100%;" height="600"></iframe>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showSeeDialogVisible=false">关 闭</el-button>
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
                tableLoading: false,
                tableForm: {
                    name: "",
                    // stationId:"",
                    // majorId:"",
                    level:"",
                    batchId:"",
                    majorId:"",
                    matchStatus:"",
                    teacherId:"",
                    cardNo:"",
                    stationId:""
                    // enrollYear:"",
                },
                tableData: [],
                //分页——start
                pageNum: 1,
                pageSize: 10,
                total: 0,
                //分页——end
                dialogAddVisible: false,

                // 转出visible
                dialogVisible:false,
                dialogType: 0,
                applyForm:{
                	remark:""
                },
                form: {
                    name:"",
                    email:"",
                    batchId:"",
                    majorId:"",
                    level:"",
                    summary:"",
                    ableStatus:1
                },
                teacherList:[],
                applyId:"",
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
                    majorId: [
                        { required: true, message: "请选择专业", trigger: "blur" },
                    ],
                    batchId: [
                        { required: true, message: "请选择年级", trigger: "blur" },
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
                matchStatusList:[{
                	name:'未匹配',
                	id:0
                },{
                	name:'已匹配',
                	id:1
                }],
                applyType:true,
                applyDialog:false,
                showSeeDialogVisible:false,
                showSeeUrl:"",
                multipleSelection:[]
            };
        },
        components: {},
        computed: mapState(["userInfo"]), 
        mounted() {
//	this.getKindList();
//	this.getStationList();
            console.log(new Date().getFullYear())
            let now=new Date().getFullYear()
            for(let i=now;i<now+5;i++){
                this.yearList.push(i)
            }
            // this.tableForm.batchId=now;
//          this.getStudentPreSimpleDisplines();
            this.getStudentPreSimpleMajors();
            this.getBatchList();
//          this.getTeacherList();
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
        	handleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
            sendAction(type){
            	if(!this.multipleSelection.length){
            		return this.$message.warning("操作前请先选择数据");
            	}
            	let ids=[];
            	this.multipleSelection.map((item)=>{
            		ids.push(item.id);
            	})
            	
            	this.$alert(`确定要对选中的用户进行${type?'下发':'取消下发'}操作吗?`, '提示', {
		          confirmButtonText: '确定',
		          callback: action => {
		            if(action){
		            	this.$api.noticePaper.sendNoticePaper({
		            		ids:ids.join(","),
		            		displayStatus:type?1:0
		            	}).then((res)=>{
		            		this.$message.success("操作成功");
		            		this.get_ajax();
		            	}).catch((e)=>{
		            		this.$message.success(e.msg)
		            	})
		            }else{
		            	this.$message.info('操作取消')
		            }
		          }
		        });
            	
            	
            },
            showSee(row){
            	this.showSeeDialogVisible=true;
            	this.showSeeUrl=row.noteUrl;
            },
            closeDialog(){
            	this.$nextTick(()=>{
            		this.form.remark="";
            	})
            },
            showApply(type,row){
            	this.applyId=row.id,
            	this.applyType=type;
            	this.applyDialog=true;
            },
            showAllot(item){
                this.actionRow={...item};
                this.allotDialogVisible=true;
            },
            formats(row){
            	switch(row.auditStatus){
            		case 1:return "审核中";
            		case 2:return "通过";
            		case 3:return "拒绝";
            	}
            },
            getBatchList(){
                this.$api.paper.getPaperAudit_simpleBatch().then((res)=>{
                    this.batchList=res.data;
//                  this.tableForm.batchId=res.data[0].id;
//                  this.get_ajax();
                })
            },
            getTeacherList(){
                this.$api.paper.getPaperAudit_simpleTeacher().then((res)=>{
                    this.teacherList=res.data;
//                  this.tableForm.batchId=res.data[0].id;
//                  this.get_ajax();
                })
            },
            sureAllot(formName){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$api.studentManagement.studentSelfHelp_allot({
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
                this.$api.essentialInformation.SimpleDiscipline_get_list().then((res)=>{
                    this.disciplineList=res.data;
                    console.log(this.disciplineList)
                })
            },
            getStudentPreSimpleMajors(){
                this.$api.paper.getPaperAudit_simpleMajor().then((res)=>{
                    this.majorList=res.data
                })
            },
            getStudentPreSimpleStations(){
                this.$api.paper.getPaperAudit_simpleStation().then((res)=>{
                    this.stationList=res.data
                })
            },
            get_ajax() {
//              this.tableLoading = true;
                this.$api.noticePaper
                    .getNoticePaperList({
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        ...this.tableForm,
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
                    email:"",
                    batchId:"",
                    majorId:"",
                    level:"",
                    summary:"",
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
                    majorId:row.majorId,
                    batchId:row.batchId,
                    level:row.level,
                    summary:row.summary,
                    email:row.email,
                    ableStatus:row.ableStatus,
                };
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },
            //添加编辑数据
            add_ajax() {
                if (this.dialogType === 0) {
                    this.$api.paper
                        .teacher_add(this.form)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "添加成功!"
                            });
                            this.dialogAddVisible = false;
                            this.ready_ajax();
                        });
                } else {
                	console.log(this.form)
                    this.$api.paper
                        .teacher_edit(this.form)
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
            submitApplyForm(){
            	 if (this.applyType) {
                    this.$api.paper
                        .AuditApplyPass(this.applyId,this.applyForm)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "通过成功!"
                            });
                            this.applyDialog = false;
                            this.ready_ajax();
                        });
               } else {
                    this.$api.paper
                        .AuditApplyRefuse(this.applyId,this.applyForm)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "拒绝成功!"
                            });
                            this.applyDialog = false;
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
            forSchoolStatus(row){
                switch(row.schoolStatus){
                    case 1:return '正常';break;
                    case 2:return '休学';break;
                    case 3:return '退学';break;
                    case 4:return '延迟毕业';break;
                    case 5:return '肄业';break;
                    case 6:return '毕业';break;
                    default:return "未知"
                }
            }
            //分页end
        }
    };
</script>
