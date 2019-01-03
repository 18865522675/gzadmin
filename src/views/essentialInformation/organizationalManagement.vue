<template>
  <div class="g-module">
 		<div class="homeWrap">
			  <el-card style="height: 100%;">
			  		<div class="homeTitle flexItem" style="align-items: center;"> 
			  				<div class="homeTitleItem">
			  					 <span>年级</span>
			  					 <el-select v-model="value" placeholder="请选择" class="gzSelect marL10">
									    <el-option
									      v-for="item in options"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									  </el-select>
			  				</div>
			  				
			  				<div class="homeTitleItem">
			  					 <span>在读人数</span>
			  					 <span class="num">100</span>
			  				</div>
			  				<div class="homeTitleItem">
			  					 <span>毕业人数</span>
			  					 <span class="num">100</span>
			  				</div>
			  				<div class="homeTitleItem">
			  					 <span>未毕业人数</span>
			  					 <span class="num">100</span>
			  				</div>
			  				<div class="homeTitleItem">
			  					 <span>开设课程</span>
			  					 <span class="num">100</span>
			  				</div>
			  		</div>
			  		
			  		
			  		<div class="home-subjectList flexItem" style="flex-wrap: wrap;justify-content: space-between;">
			  			<div class="home-subjectItem">
			  				<div class="home-subjectItem-title">
			  					计算机科学与技术
			  				</div>
			  				<div class="home-subjectItem-con flexItem">
			  						<div class="home-subjectItem-con-item">
			  							<span>在读人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>学制</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>当前学期</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>未毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>开设课程</span>
			  							<span>100</span>
			  						</div>
			  				</div>
			  			</div>
			  			
			  			<div class="home-subjectItem">
			  				<div class="home-subjectItem-title">
			  					计算机科学与技术
			  				</div>
			  				<div class="home-subjectItem-con flexItem">
			  						<div class="home-subjectItem-con-item">
			  							<span>在读人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>学制</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>当前学期</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>未毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>开设课程</span>
			  							<span>100</span>
			  						</div>
			  				</div>
			  			</div>
			  			
			  			<div class="home-subjectItem">
			  				<div class="home-subjectItem-title">
			  					计算机科学与技术
			  				</div>
			  				<div class="home-subjectItem-con flexItem">
			  						<div class="home-subjectItem-con-item">
			  							<span>在读人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>学制</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>当前学期</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>未毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>开设课程</span>
			  							<span>100</span>
			  						</div>
			  				</div>
			  			</div>
			  			
			  			<div class="home-subjectItem">
			  				<div class="home-subjectItem-title">
			  					计算机科学与技术
			  				</div>
			  				<div class="home-subjectItem-con flexItem">
			  						<div class="home-subjectItem-con-item">
			  							<span>在读人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>学制</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>当前学期</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>未毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>开设课程</span>
			  							<span>100</span>
			  						</div>
			  				</div>
			  			</div>
			  			
			  			
			  			<div class="home-subjectItem">
			  				<div class="home-subjectItem-title">
			  					计算机科学与技术
			  				</div>
			  				<div class="home-subjectItem-con flexItem">
			  						<div class="home-subjectItem-con-item">
			  							<span>在读人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>学制</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>当前学期</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>未毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>开设课程</span>
			  							<span>100</span>
			  						</div>
			  				</div>
			  			</div>
			  			
			  			<div class="home-subjectItem">
			  				<div class="home-subjectItem-title">
			  					计算机科学与技术
			  				</div>
			  				<div class="home-subjectItem-con flexItem">
			  						<div class="home-subjectItem-con-item">
			  							<span>在读人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>学制</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>当前学期</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>未毕业人数</span>
			  							<span>100</span>
			  						</div>
			  						<div class="home-subjectItem-con-item">
			  							<span>开设课程</span>
			  							<span>100</span>
			  						</div>
			  				</div>
			  			</div>
			  			
			  		</div>
   	 		</el-card>
   	 		
   	 		<el-card style='margin-top: 50px;'>
   	 			<div class="home-tj">
   	 				统计
   	 			</div>
   	 			<div class="staticList flexItem" >
   	 				<div class="statciItem">
   	 					<span>院校人数</span>
   	 					<span>100</span>
   	 				</div>
   	 				<div class="statciItem">
   	 					<span>院校人数</span>
   	 					<span>100</span>
   	 				</div>
   	 				<div class="statciItem">
   	 					<span>院校人数</span>
   	 					<span>100</span>
   	 				</div>
   	 			</div>
   	 		</el-card>
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        batchId: ""
      },
      start: 1,
      length: 10,
      total: 10,
      List: "",
      batchList: ""
    };
  },
  components: {},
  mounted() {
//  this.get_ajax();
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
    get_ajax() {
      this.$api.home
        .home_get_list({
          start: 1,
          length: 100000,
          batchId: this.form.batchId
        })
        .then(res => {
          console.log(res.data.results);
          this.List = res.data.results;
          console.log(this.List);
          //分页
          this.total = res.data.paging.total;
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
      this.length = val;
      this.get_ajax();
    },
    handleCurrentChange(val) {
      this.start = val;
      this.get_ajax();
    }
  }
};
</script>
<style lang="less">
.homeWrap{
	
	.homeTitleItem{
		span{
			font-size: 14px;
			color: #333333;
		}
		.num{
	    display:inline-block;
	    margin-left: 15px;
	    font-size: 14px;
	    color: #6DABFF ;	
		}
	}
	.homeTitleItem:not(:first-child){
		margin-left: 70px;
	}
	
	.home-subjectList{
		.home-subjectItem-title{
			font-size: 16px;
			box-sizing: border-box;
			padding-left: 10%;
			font-weight: bold;
			line-height: 34px;
			border-bottom: 1px solid #F76B1C;
		}
		.home-subjectItem{
			width: 45%;
			padding: 20px;
			border: 1px solid black;
			border-radius: 20px;
			margin-top: 30px;
		}
		
		.home-subjectItem-con{
			flex-wrap:wrap;
			.home-subjectItem-con-item{
				width:45% ;
				text-align: center;
				line-height: 52px;
				span{
					&:not(:first-child){
						margin-left: 10px;
						font-size: 13px;
					}
				}
			}
		}
	}
	.home-tj{
			font-size: 14px;
			line-height: 40px;
			font-weight: bold;
		}
	.staticList{
		justify-content: space-between;
		.statciItem{
			width: 30%;
			line-height: 40px;
			background: #FFFFFF;
			border: 1px solid #333333;
			border-radius: 12px;
			font-size: 14px;
			text-align: center;
			span{
				&:not(:first-child){
					margin-left: 10px;
					display: inline-block;
				}
			}
		}
	}
}


</style>
