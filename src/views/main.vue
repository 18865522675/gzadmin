<template>
  <div :class="$route.fullPath=='/home'?'home-main':'g-main'" class="moduleWrap flexItem flexDir-r">
    <!--<div class="m-make" @click="checkStatus=false" v-show="checkStatus"></div>

    <div class="m-crumbs">
      <div class="m-crumbs-ico"></div>
      <div class="m-crumbs-item" v-for="(item, index) in crumbs" :key="index">{{item.title}}</div>
    </div>-->
   <div class="moduleLeft ">
   		<div class="moduleLeft_logo">
   			<img src="../assets/img/logo.png" alt="" style="width: 150px;" />
   		</div>
   		<div class="moduleLeft_con">
   				<el-menu
			      default-active="2"
			      class="el-menu-vertical-demo"
			      @open="handleOpen"
			      @close="handleClose"
			      background-color="#333333"
			      text-color="#fff"
			      router
			      active-text-color="#ffd04b">
							<template v-for="(item,index) in routesArr">
									<el-menu-item :index="item.path" v-if="!item.children">
										<!--<img :src=`../assets/img/${item.meta.icon}.png` alt="" />-->
						        <span slot="title" style="padding-left: 18px;">首页</span>
						      </el-menu-item>
						      <el-submenu  :index="index*3-12"  :key="index" v-else-if="item.meta.routerStatus">

					          <template slot="title">
					          		 <!--<div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}" v-if="!item.logo"></div>-->

					          		<!--<img :src="require('../assets/img/'+item.meta.icon+'.png')," alt="" />-->
					          		<!--<div class="menu-icon" :style="{backgroundImage: 'url('+require('../assets/img/'+item.meta.icon+'.png')+')'}"></div>-->
					          		<span>{{item.meta.title}}</span>
					          	</template>
					          <div v-for="(cItem,cIndex) in item.children"   :key="cIndex"  v-if="cItem.meta.show&&cItem.meta.routerStatus">
					          		<el-menu-item :index="cItem.path">{{cItem.meta.title}}</el-menu-item>
					          </div>
					        </el-submenu>
							</template>
			    </el-menu>
   		</div>
   </div>
   <div class="moduleRight">
   		<header>
	      <div class="moduleRight-header flexItem">
	      	 
        <div class="m-check" :class="{on: checkStatus}" style="margin-top: 20px;"  v-if="userInfo.stationId||userInfo.roleId==1">
          <div class="m-check-cap" @click="checkStatus=!checkStatus">
            <span :title="extResult.name">{{extResult.name?extResult.name:"切换"}}</span>
          </div>
          <div class="m-check-box">
            <div class="m-check-in-box">
              <input type="text" @keyup="checkSearch" v-model.trim="checkSearchVal" class="m-check-in" placeholder="快速筛选学校">
            </div>
            <div class="m-check-list">
              <div class="m-check-item" v-for="(item, index) in schoolList" :key="index" @click="checkSite(item.id)"   v-if="schoolList.length&&item.name">{{item.name}}</div>
              <div class="m-check-item" v-if="!schoolList.length">无内容</div>
              <!--@click="checkSite(item.siteId)"-->
            </div>
          </div>
        </div>
        
        
	        <!--<div class="header-item flexItem">
	        	<img src="../assets/img/kefu.png" alt="" />
	        	<span>客服电话</span>
	        </div>-->
	        <!--<div class="header-item flexItem">
	        	<img src="../assets/img/xitong.png" alt="" />
	        	<span>系统</span>
	        </div>-->
	        <div  class="header-item flexItem" style="cursor:pointer" @click="$router.push('/systemManagement/myMessage')">
	        	<img src="../assets/img/geren.png" alt="" />
	        	<span>个人中心</span>
	        </div>
	        <div  class="header-item flexItem hasOut" >
	        	<img src="../assets/img/geren.png" alt="" />
	        	<span>管理员· <span >{{userInfo.name}}</span></span>
	        	<span> | </span>
	        	<span style="cursor: pointer;" @click="logout">退出登录</span>
	        </div>
	      </div>
   	 </header>
   	 <div class="routerContent" style="overflow:auto;">
   	 		 		<router-view></router-view>
   	 </div>
   </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookies from "js-cookie"
export default {
  name: "g-main",
  data() {
    return {
      checkSearchVal: "",
      checkStatus: false,
      checkIf: false,
      schoolList: [],
      schoolListData: [],
      extResult: {},
      routesList:[],
      user:{},
      checkSearchVal: "",
      checkStatus: false,
      checkIf: false,
      schoolList: [],
      schoolListData: [],
      extResult: {}
      
    };
  },
  watch: {
    checkStatus: function(val) {
      if (val) {
        this.schoolList = this.schoolListData;
      }
    }
  },
  computed: mapState(["crumbs", "routesArr", "userInfo"]),
  components: {},
  mounted() {
//	  if(Cookies.set("userInfo")){
//       	this.$store.dispatch("save_userInfo", JSON.parse(Cookies.set("userInfo")));
//  }
//	  this.$store.dispatch("save_userInfo", JSON.parse(Cookies.set("userInfo")));

	  this.$nextTick(()=>{
//	  	this.$store.commit("save_userInfo", JSON.parse(Cookies.get("userInfo")));	
	 		setTimeout(()=>{
	 			if(Cookies.set("userInfo")){
	         	this.$store.commit("save_userInfo", JSON.parse(Cookies.get("userInfo")));	
	      }
 		  	let {stationId,roleId}=this.userInfo;
		  	console.log(this.userInfo)
		  	if(stationId||roleId==1){
		  		 this.get_schoolList();
		  	}
	 		},500)
	  })
	  
	   
	 	console.log(this.$store.state.userInfo)
  	this.routesList=this.$router.options.routes[3].children.slice(1);
  },
  methods: {
    //退出
    logout() {
      this.$api.main
        .signOut()
        .then(() => {
          let _this = this;

          this.$message({
            type: "success",
            message: "退出成功，您即将返回登录页面!",
            duration: 2000,
            onClose() {
              sessionStorage.removeItem("Token");
              sessionStorage.removeItem("userInfo");
              _this.$router.push("/login");
            }
          });
        })
        .catch(() => {});
    },
    //获取学校列表
    get_schoolList() {
      this.$api.systemManagement
        .get_schoolList()
        .then(res => {
          this.schoolListData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //切换学校
    checkSite(id) {
      this.checkStatus = false;
      this.$api.systemManagement
        .get_checkSite({
          siteId: id
        })
        .then(() => {
          location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //快捷搜索
    checkSearch() {
      let val = this.checkSearchVal;
      let schoolListData = this.schoolListData;
      let schoolList = [];

      schoolListData.map(item => {
        if (item.name && item.name.indexOf(val) > -1) {
          schoolList.push(item);
        }
      });
      this.schoolList = schoolList;
    }
  }
};
</script>
<style lang="less">
	.moduleWrap{
		/*overflow-x: hidden;*/
		.moduleLeft{
			width: 200px!important;
			&>.el-menu-item{
				padding-left: 34px!important;
			}
			background: #333333;
			.el-submenu__title{
				padding-left: 35px!important;
				box-sizing: border-box;
			}
			.moduleLeft_logo{
				height: 73px;
				text-align: center;
				img{
					transform: translateY(40%);
				}
			}
		}
		.moduleRight{
			flex:1;
			overflow-x: auto;
			/*overflow-y: auto;*/
			.moduleRight-header{
				align-items: center;
				background: #FFBB51;
				height: 73px;
				justify-content: flex-end;
				box-sizing: border-box;
				padding: 0 17px;
			}
			.routerContent{
				box-sizing: border-box;
				padding: 30px;
				height: calc(100% - 73px);
			}
			.hasOut{
				span{
					display: inline-block;
					box-sizing:border-box;
					padding: 0px 2px;
				}
			}
			.header-item{
				padding: 0 10px;
				align-items: center;
				font-size: 12px;
				img{
					margin: 0 10px;
				}
			}
		}
		.menu-icon{
			 width: 20px;
			 height: 20px;
			 background-size: 100% 100%;
			 display: inline-block;
		}
	}
	.m-check-box{
		background-color: rgba(0,0,0,0.4)!important;
	}
</style>
