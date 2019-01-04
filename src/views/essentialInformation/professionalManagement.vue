<template>
  <div class="g-module">
 		<div class="yearWrap">
			  <el-card style="height: 100%;box-sizing: border-box;padding: 20px;">
			  		<div class="baseInfoTitle flexItem" style="align-items: center;"> 
			  				<div class="baseInfoTitleItem">
			  					 <span>专业列表</span>
			  				</div>
			  				<!--<div class="marL10">
				 					<el-input v-model="name" class='searchInp' placeholder="请输入年级名称">
				 					 <el-button slot="append" icon="el-icon-search"></el-button>
				 					</el-input>
				 				</div>-->
			  				<div class="comTopSaveBtn1 comTopOrangeBtn topBtn marL10" @click='dialogAdd_show'> 
			 					添加
			 				</div>
			  				<!--@click='dialogAdd_show'-->
			  		</div>
			  		
			  		
			  		<div class="baseInfoList flexItem" style="flex-wrap: wrap;justify-content: space-between;">
			  			<div class="baseInfoItem flexItem" style="justify-content: space-between;" v-for="(item,index) in List" :key="index">
			  				<div class="baseInfoLeft">
			  					<div class="baseInfoLine">
			  						<span class="twoWord">专 业</span>
			  						<!--{{item}}-->
			  						<span v-if="!item.isEdit">{{item.name}}</span>
			  						
			  						<el-input v-model="item.name" class="baseInfoInp" v-else></el-input>
			  					</div>
			  					<div class="baseInfoLine">
			  						<span class="twoWord">编 码</span>
			  						<span v-if="!item.isEdit">{{item.code}}</span>
			  						<el-input v-model="item.name" class="baseInfoInp" v-else></el-input>
			  					</div>
			  					<div class="baseInfoLine">
			  						<span>创建时间</span>
			  						<span>{{$fun.table.time(null,null,item.createTime)}}</span>
			  					</div>
			  					<div class="baseInfoLine">
			  						<span>更新时间</span>
			  						<span>{{$fun.table.time(null,null,item.updateTime)}}</span>
			  					</div>
			  				</div>
			  				<div class="baseInfoRight">
			  					<div class="baseInfoLine2 flexItem " style="box-sizing: border-box;padding-top: 10px;">
			  						<span style="float: left;">备注</span>
			  						<!--<div>-->
			  						<el-input
										  type="textarea"
										  :rows="2"
										  placeholder="请输入内容"
										  resize="none"				
										  :disabled="!item.isEdit"
										  v-model="item.remark" style="display: inline-block;width:70%;float: right;margin-left: 20px" >
										</el-input>
			  					</div>
			  						<!--</div>-->
			  					<div class="baseInfoLine" style="display: block;margin-top: 4px;">
			  						<span>状态</span>
			  						<span  v-if="!item.isEdit">{{item.ableStatus==1?'启用':'禁用'}}</span>
			  						<div style="display: inline-block;margin-left: 20px;" v-else>
			  							  <el-radio v-model="item.ableStatus" :label="1">启用</el-radio>
  											<el-radio v-model="item.ableStatus" :label="0">禁用</el-radio>
			  						</div>
			  					</div>
			  					<div class="baseInfoLine flexItem" style="justify-content: flex-start;">
			  						<span>操作</span>
			  						<div style="margin-left: 20px;">
									     <el-button type="text" size="small" class="kf-btn kf-btn-table small kf-orange-btn"  @click="goEdit(item,index)" v-if="!item.isEdit" >编辑</el-button>
									      <el-button type="text" size="small" class="kf-btn kf-btn-table small kf-orange-btn"  @click="sureEdit(item,index)" v-else>保存</el-button>
					           	 <baseDelBtn delUrl="baseInfo/major" :delId="item.id" :delOk="ready_ajax" />
			  						</div>
			  					</div>
			  				</div>
			  			</div>
			  		</div>
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
			      
			      
			      	 <el-dialog
      :title="dialogType===0?'添加':'编辑'"
      :visible.sync="dialogAddVisible"
      width="760px"
      center
      :append-to-body="true"
      class="kf-dialog-add">
      <el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
        <el-form-item label="专业" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入专业名称（不超过20个字）"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入专业编码（不超过8个字）" :disabled="dialogType===1"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="form.ableStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" :rows="6" placeholder="输入不超过255个字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-dialog>
    
    
   	 		</el-card>
   	 		
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
		pageNum:1,
		pageSize:10,
		name:"",
		List:[],
		form:{},
		nowItem:{},
		rulesForm: {
        name: [
          { required: true, message: "请输入年级名称", trigger: "change" },
          {
            min: 1,
            max: 50,
            message: "最长 50 个字符",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入年级编码", trigger: "change" },
          {
            min: 1,
            max: 8,
            message: "最长 8 个字符",
            trigger: "change"
          }
        ],
        remark: [
          {
            min: 1,
            max: 255,
            message: "最长 255 个字符",
            trigger: "change"
          }
        ]
      },
    };
  },
  components: {},
  mounted() {
    this.get_ajax();
//  this.get_List();
//  this.$api.essentialInformation
//    .get_gradeList({ limitNum: 100000 })
//    .then(res => {
//      console.log(res.data.results);
//      if (res.data.results.indexOf(res.data.results[0]) == -1) {
//        this.form.batchId = "";
//      } else {
//        this.batch = res.data.results[0].id;
//        this.form.batchId = res.data.results[0].id;
//      }
//      this.$api.home
//        .home_get_list({
//          start: 1,
//          length: 100000,
//          batchId: this.form.batchId
//        })
//        .then(res => {
//          this.List = res.data.results;
//          //分页
//          this.total = res.data.paging.total;
//        })
//        .catch(res => {
//          this.loading = false;
//          console.log(res);
//        });
//      // this.$api.home
//      //   .home_get_list({
//      //     start: this.start,
//      //     length: this.length,
//      //     batchId: this.form.batchId
//      //   })
//      //   .then(res => {
//      //     this.List = res.data.results;
//      //     //分页
//      //     this.total = res.data.paging.total;
//      //   })
//      //   .catch(res => {
//      //     this.loading = false;
//      //     console.log(res);
//      //   });
//    });
  },
  methods: {
  	sureEdit(){
//		this.$refs["form"].validate(valid => {
//      if (valid) {
					console.log(this.nowItem)
					console.log(this.$api.essentialInformation)
          this.$api.essentialInformation.essentialInformation_edit(this.nowItem.id,{
          	name:this.nowItem.name,
          	code:this.nowItem.code,
          	remark:this.nowItem.remark,
          	ableStatus:this.nowItem.ableStatus
          }).then((res)=>{
              this.ready_ajax();
              this.$message.success("编辑成功")
          }).catch(()=>{
              this.$message.error("编辑失败")
          })
//      } else {
//        console.log("error submit!!");
//        return false;
//      }
//    });
  	},
  	goEdit(item,index){
				this.List[index].isEdit=true;
				this.$set(this.List,index,this.List[index]);
				this.nowItem=item
				console.log(this.List)
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
    add_ajax() {
      if (this.dialogType === 0) {
        this.$api.essentialInformation
          .essentialInformation_add(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogAddVisible = false;
            this.ready_ajax();
          });
      } else {
        this.$api.essentialInformation
          .batch_edit(this.form.id,this.form)
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
    ready_ajax() {
      this.pageNum = 1;
      this.get_ajax();
    },
    get_ajax() {
      this.$api.essentialInformation
        .essentialInformation_get_list	({
          pageNum:this.pageNum ,
          pageSize:this.pageSize,
          name:this.name,
          code:""
        })
        .then(res => {
          this.List = res.data.pageList;
          this.List.map((item,index)=>{
          	item.isEdit=false
          })
          console.log(this.List);
          //分页
          this.total = +res.data.total;
        })
        .catch(res => {
          this.loading = false;
          console.log(res);
        });
    },
    get_List() {
      this.$api.essentialInformation
        .get_gradeList({ limitNum: 100000 })
        .then(res => {
          this.batchList = res.data.results;
        });
    },
    check_detail(batch, major, levelId) {
      console.log(batch, major, levelId);
      // this.$router.push({
      //   name: "teachingPlan",
      //   params: { batch: batch, major: major, level: levelId }
      // });
      this.$router.push(
        `/educationalManagement/teachingPlan/${batch}/${major}?level=${levelId}`
      );
    },
    search() {
      this.get_ajax({
        start: 10,
        length: 1
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.get_ajax();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.get_ajax();
    },
     dialogAdd_show() {
      this.dialogType = 0;
      this.dialogAddVisible = true;
      this.form = {
        name: "", //课件名称
        code: "", //课件编码
        remark: "", //备注
        ableStatus: 1 //启用状态(1启用0禁用)
      };
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
  }
};
</script>
<style lang="less">
	.baseInfoTitle{
		font-family: PingFangSC-Regular;
		font-size: 16px;
		color: #333333;
		letter-spacing: 0;
	}
	.baseInfoList{
		box-sizing: border-box;
		padding: 20px 0;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #333333;
		letter-spacing: 0;
		.baseInfoItem{
			border: 1px solid gray;
			box-sizing: border-box;
			padding: 25px;
			border-radius: 10px;
			width: 45%;
			margin-top: 20px;
			.baseInfoLine{
					line-height: 35px;
					&>span{
						font-size: 14px;
						color: #333333;
						
					}
					&>span:last-child{
						display: inline-block;
						margin-left: 20px;
					}
				}
			.baseInfoLeft{
				width:50%;
				/*text-align: center;*/
				.twoWord{
					word-spacing: 24px;
				}
			}
			.baseInfoRight{
				width: 50%;
			}
		}
		
	}
</style>
