<template>
    <div class="content">
		 <div class="audio-model">
			<!-- <div class="back" @click.stop="navigateBack"></div>
			 <div class="share" @click.stop="showShare"></div> -->
		     <video id="myVideo" playsinline :src="baseURL+list.videoUrl" controls controlslist="nodownload" :poster="baseURL+list.lecturerImageUrl"></video>
		</div>
        <!-- <image :src="baseURL+list.lecturerImageUrl"  class="top"></image> -->
        <div class="main">
            <div class="introduce" >
                <div class="i-title">{{list.title}}</div>
                <div class="i-main">
                    <div class="i-name">
                        <img  class="avatar"  :src="baseURL+list.lecturerImageUrl"></img>
                        <span>{{list.courseName}}</span>
                    </div>
                    <div class="course"   @click="navigateBack">进入课程</div>
                </div>
            </div>
     
            <div class="text" v-html="list.introduce">
				<!-- <rich-text :nodes="list.introduce"></rich-text> -->
            </div>
        </div>
        <!-- 推荐 -->
        <h3 class="title" v-if="list.recommendedCourse">
        	相关推荐
        </h3>
        <div class="recommendBox" v-if="list.recommendedCourse">
        	
        	<div v-for="(item,index) in list.recommendedCourse" :key="index"   @click.stop="details(item.id,item.type)" class="item fx-row fx-row-start">
        		<div class="avatarbox">
        			<img :src="baseURL+item.imageUrlList[0].fileUrl" alt="">
        			<div class="tip">
        				{{item.type==1?'音频':'视频'}}
        			</div>
        		</div>
        		<div class="info fx-column fx-row-space-around">
        			<div class="title single-line" style="max-width: 100%;">
        				{{item.courseName}}
        			</div>
        			<div class="mtitle single-line" style="max-width: 100%;">
        				{{item.courseIntro}}
        			</div>
        			<div class="smtitle single-line" style="max-width: 100%;">
        				{{item.courseSummarize}}
        			</div>
        			
        			<div class="fx-row fx-row-space-between">
        				<span class="price">{{item.totalExpect}}讲/{{item.price==0?'免费':'￥'+item.price}}</span>
        				<span class="peoNum">{{item.studyCount || 0}}人加入学习</span>
        			</div>
        		</div>
        		
        	</div>
        
			
        </div>
		<!-- 复制工具条 -->
		<div class="toolbar fx-row" :class="{'fadeIn':showToolBar}">
			<div class="item" @click.stop="clickHandle(0)">记笔记</div>
			<!-- <button class="item btnCopy" data-clipboard-action="copy" data-clipboard-target="#foo">复制</button> -->
			<div class="item" @click.stop="clickHandle(1)">复制</div>
			<div class="item" @click.stop="clickHandle(2)">分享</div>
		</div>
		<share-modal ref="share" @share="shareHandle"></share-modal>
    </div>
</template>

<script>
    import shareModal from "../components/shareModal.vue"
    export default {
        name: "index",
      
		data(){
			return {
				list:[],
				id:null,
				showToolBar:false,
				str:"",
				courseId:null,
				studyPlanRelId:null
			}
		},
		components:{shareModal},
		mounted(options){
			window.vms = this; //挂到window 用于evalJS
			this.id = this.$route.query.id;
			this.courseId = this.$route.query.courseId;
			this.studyPlanRelId = this.$route.query.studyPlanRelId;
			this.$store.commit("setToken",this.$route.query.token);
			
			
			document.getElementById("myVideo").onended=()=>{
				if(this.studyPlanRelId){
					location.href="/qksmessage?action=endPlay&id="+this.id+"&studyPlanRelId="+this.studyPlanRelId;
					console.log(`修改${this.studyPlanRelId}的学习状态...`)
				}else{
					console.log(`未加入学习计划或者是试听课程不修改...`)
				}
					
			}
			
			
			document.onselectionchange = function(){
				const str = document.getSelection()+"";
				
				if(str==""){
					setTimeout(()=>{
						this.showToolBar=false;
						this.str = str;
					},500)
				}else{
					this.showToolBar=true;
					this.str = str;
				}
			
			}.bind(this);
			
			
			if(this.id===undefined){
				//试听
				this.$http.get('/public/getCourseDetails',{courseId:this.courseId}).then(res=>{
					res = res.body;
					this.list = {
						courseId:this.courseId,
						videoUrl:res.preconditionUrl,
						title:res.preconditionTitle,
						courseName:res.courseName,
						lecturerImageUrl:res.lecturerImageUrl,
						introduce:res.courseIntro
					}
					
					
					
					console.log(res)
					
				})
				
				
			
				return;
			}
			
			//非试听
					uni.getEnv(function(res) {
			            console.log('当前环境：' + JSON.stringify(res));
			        });
			
			this.$http.get('/public/getVideoDetails',{courseSectionFileId:this.id}).then(res=>{
			
				this.list = res.body;
				this.list.introduce = this.list.introduce.replace(/<img/g,'<img style="max-width:100%;"').replace(/&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1/g,"")
			});
		
			//全屏处理 安卓
			// var self = plus.webview.currentWebview();  
			// self.setStyle({  
			// 	videoFullscreen: 'landscape'  
			// });
			document.addEventListener('webkitfullscreenchange', function() {  
			    var el = document.webkitFullscreenElement; //获取全屏元素  
			    if(el) {  
			        plus.screen.lockOrientation('landscape'); //锁死屏幕方向为横屏  
			    } else {  
			        plus.screen.unlockOrientation(); //解除屏幕方向的锁定  
					plus.screen.lockOrientation('portrait');
			    }  
			});
			
			var  videoElem = document.getElementById("myVideo")
			// 全屏处理IOS 监听的事件与Android平台有很大区别  
			videoElem.addEventListener('webkitbeginfullscreen', function() {  
				plus.screen.lockOrientation('landscape'); //锁死屏幕方向为横屏  
			});  
			videoElem.addEventListener('webkitendfullscreen', function() {  
			//  plus.screen.unlockOrientation(); //解除屏幕方向的锁定，但是不一定是竖屏；  
				plus.screen.lockOrientation('portrait'); //锁死屏幕方向为竖屏  
			});
		},
		
		methods:{
			details(id,type){
				if(type==1){
					uni.navigateTo({
						url: "/pages/list/index?id="+id
					});
				}else{
					uni.navigateTo({
						url: "/pages/videoList/index?id="+id
					});
				}
			},
			
			navigateBack() {
				uni.navigateBack();
			},
			showShare(){
				if(!this.id){
					plus.nativeUI.toast("试听课程暂不支持分享");
					return 
				}
				this.$refs.share.show()
			},
			shareHandle(e){
				console.log(e)
				location.href="/qksmessage?action=share&type="+e.type
				+"&id="+this.list.id+"&name="+this.list.courseName+"&image="+this.list.lecturerImageUrl
				+"&intro="+this.list.title
				+"&courseId="+this.courseId
				+"&shareType=1"
			},
			clickHandle(index){
				console.log(this.str)
				
				if(index==0){
					
					// location.href="/qksmessage?action=note&text="+this.str
					uni.navigateTo({
						url:'/pages/newNote/newNote?text='+encodeURIComponent(this.str)+"&courseSectionFileId="+this.id
					});
				}else if(index==1){
					location.href="/qksmessage?action=copy&text="+this.str
					
				}else{
					// location.href="/qksmessage?action=share1&text="+this.str
					uni.navigateTo({
						url:'/pages/newNote/newNote?text='+encodeURIComponent(this.str)+"&courseSectionFileId="+this.id
					});
				}
				
			}
			
		},
		
    }
</script>

<style lang="less">
	
	.toolbar{
		position: fixed;
		height: 100px;
		width: 80%;
		left: 50%;
		transform: translateX(-50%);
		bottom:-300px;
		border-radius: 15px;
		background: #f6f7f7;
		box-sizing: border-box;
		padding: 20px 0;
		transition: .5s;
		opacity: 0;
		z-index: 9999;
		&.fadeIn{
			bottom:150px;
			opacity: 1;
		}
		
		.item{
			width: 33%;
			background: #f6f7f7;
			color: #EA4728;
			text-align: center;
			line-height: 60px;
			height: 60px;
			&:not(:nth-last-child(0)){
				border-left: 1px solid #ccc;
			}
		}
	}
	
    .content{
		overflow: hidden;
        color:#333;
		min-height: 100vh;
    }

    .top{
        height:324px;
		width:100%;
    }

    .main{
        width:95%;
        margin:0 auto;
        margin-bottom: 39px;
        border-bottom: 1px solid #E6E6E6;
        padding-bottom: 55px;
    }

    .introduce{
        border-bottom:1px solid #E6E6E6;
        height:200px;
        margin-top: 31px;
    }

    .i-main{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 61px;
    }

    .i-name{
        display: flex;
        align-items: center;
    }

    .i-name span:nth-child(2){
        margin-left:10px ;
        font-size: 26px;
        color:#999
    }

    .avatar{
		border-radius: 50%;
        width:60px;
        height:60px
    }

    .course{
        width:139px;
        height:48px;
        line-height: 48px;
        font-size: 20px;
        background: rgba(0,0,0,0);
        border-radius: 48px;
        color:#999;
        text-align: center;
        border:1px solid #E6E6E6
    }

    .audio-model{
        /*border:1px solid red;*/
        display: flex;
        /* height:120px; */
        // margin-top: 42px;
        /* background:#F6F7F7; */
		position:relative;
		
		
		.back {
			width: 50px;
			height: 50px;
			background-image: url(../assets/white-back.png);
			background-size: 18px 32px;
			background-repeat: no-repeat;
			position: absolute;
			top: 67px;
			left: 34px;z-index: 999;
		}
		
		.share {
			width: 32px;
			height: 32px;
			background-image: url(../assets/share.png);
			background-size: 100% 100%;
			position: absolute;
			top: 67px;
			right: 34px;
			z-index: 999;
		}
      
    }
	
	.audio-model video{
		height:500px;
		width:100%;
	}

    .play{
        width:70px;
        height:70px;
        border-radius: 50%;
        margin-right: 32px;
    }

    .time{
        font-size: 30px;
        color:#666
    }

    .time div:nth-child(2){
        color:#999;
        font-size: 25px;
    }

    .text{
        margin-top: 56px;
        font-size: 28px;
		max-height: calc(100vh - 639px - 55px);
		overflow-y: scroll;
	
		*{
			max-width: 100%;
		}
    }
	
	.recommendBox{
		margin-top: 16px;
		padding: 0 20px;
		.item{
			padding: 30px 0;
			border-bottom: 1px solid rgba(230,230,230,1);
		
			.avatarbox{	
				width:160px;
				height:212px;
				position: relative;
				img{
					width: 100%;
					height: 100%;
				}
				.tip{
					width:70px;
					height:30px;
					background:rgba(0,0,0,0.6);
					border:1px solid rgba(255,255,255,1);
					font-size:20px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(255,255,255,1);
					border-radius:4px;
					position: absolute;
					bottom: 10px;
					right: 10px;
					text-align: center;
					line-height: 30px;
				}
			}
			
			.info{
				margin-left:28px;
				width: calc(100% - 160px);
				.title{
					font-size:32px;
					font-family:PingFang-SC-Bold;
					font-weight:bold;
					color:rgba(51,51,51,1);
				}
				.mtitle{
					font-size:24px;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:33px;
					// margin-top:25px;
				}
				.smtitle{
					font-size:24px;
					// margin-top:25px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:33px;
				}
				.price{
					font-size:24px;
					font-family:PingFang-SC-Bold;
					font-weight:bold;
					color:rgba(234,71,40,1);
					line-height:33px;
				}
				.peoNum{
					font-size:24px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(102,102,102,1);
					line-height:33px;
				}
			}
		
		}
		
		
		
	}
</style>
