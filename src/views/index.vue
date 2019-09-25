<template>
	<div>
		<!-- 顶部 -->
		<div class="topBg" :style="{'background-image':'url('+baseURL+detail.lecturerImageUrl+')'}">
			<div class="back" @click="navigateBack"></div>
			<div class="share" @click="showShare"></div>
		</div>
		<!-- 标题 -->
		<div class="container">
			<h3 class="title">
				{{detail.courseName}}
			</h3>
			<div class="infoBox fx-row fx-row-center">
				<div class="left fx-row fx-row-center">
					<img class="avatar" :src="baseURL+detail.lecturerImageUrl" alt="">
					<div class="mtitle">{{detail.courseName}}</div>
				</div>
				<div class="right">
					<button class="goClass" @click="navigateBack">进入课程</button>
				</div>
			</div>
			<!-- 播放器 -->
			<div class="player fx-row fx-row-center">
				<img class="playerAvatar" v-if="!isPlaying" @click="play" src="../assets/redplay.png" alt="">
				<img class="playerAvatar" v-else @click="reset" src="../assets/red-puase.png" alt="">
				<div class="playerInfo fx-column fx-col-space-around">
					<div class="playerTitle single-line">
						{{detail.title}}
					</div>
					<div class="playerTime">
						<!-- 11:23 -->
						{{" "}}
					</div>
				</div>
			</div>
			<!-- 主体 -->

			<div class="bodyContainer" v-html="detail.introduce">
				<!-- <a href="/play">dasdasfsdaf</a> -->
			</div>
			
			<!-- 推荐 -->
			<h3 class="title">
				相关推荐
			</h3>
			<div class="recommendBox">
				
				<div v-for="(item,index) in detail.recommendedCourse" :key="index"  @click.stop="details(item.id,item.type)" class="item fx-row fx-row-start">
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
			
			
		</div>
		
		<!-- <input type="text" v-model="str" id="foo" style="display: none;"> -->
		
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
		data() {
			return {
				id:null,
				detail:{},
				showToolBar:false,
				str:"",
				isPlaying:false
			}
		},
		components:{shareModal},
		methods: {
			play(){
				this.isPlaying=true;
				location.href="/qksmessage?action=play&courseId="+this.detail.courseId+"&sId="+this.id
			},
			reset(){
				this.isPlaying=false;
				location.href="/qksmessage?action=pause&courseId="+this.detail.courseId+"&sId="+this.id
			},
			showShare(){
				this.$refs.share.show()
			},
			pause(){
				this.isPlaying=false;
			},
			
			navigateBack() {
				uni.navigateBack();
			},
			
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
			shareHandle(e){
				console.log(e)
				location.href="/qksmessage?action=share&type="+e.type
				+"&id="+this.detail.id+"&name="+this.detail.courseName+"&image="+this.detail.lecturerImageUrl
				+"&intro="+this.detail.title
				+"&shareType=0"
			},
			
			clickHandle(index){
				// console.log(this.str)

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
		
		
		
		
		mounted() {
			window.vms = this; //挂到window 用于evalJS
			this.id = this.$route.query.id;
			this.$store.commit("setToken",this.$route.query.token);
			this.isPlaying = this.$route.query.playing==1;
			//获取数据
			
			this.$http.get('/public/getVideoDetails',{courseSectionFileId:this.id}).then(res=>{
			
				this.detail = res.body;
				
				this.detail.introduce = this.detail.introduce.replace(/<img/g,'<img style="max-width:100%;"').replace(/&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1/g,"")
				
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
				
				}.bind(this)
				
				
			});
			
			
		}
	}
</script>

<style lang="less">
	.container,.toolbar,.topBg{
		user-select: none;
		-webkit-user-select: none;
	}
	.bodyContainer{
		user-select: text;
		-webkit-user-select: text;
	}


	
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
	
	.topBg {
		width: 100%;
		height: 324px;
		background-image: url(../assets/listen-banner.png);
		position: relative;
		background-size: 100% 100%;

		.back {
			width: 18px;
			height: 32px;
			background-image: url(../assets/white-back.png);
			background-size: 100% 100%;
			position: absolute;
			top: 67px;
			left: 34px;
		}
		
		.share {
			width: 32px;
			height: 32px;
			background-image: url(../assets/share.png);
			background-size: 100% 100%;
			position: absolute;
			top: 67px;
			right: 34px;
		}
	}

	.container {
		padding: 35px;

		.title {
			font-size: 42px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}

		.infoBox {
			margin-top: 44px;
			padding-bottom: 25px;
			border-bottom: 1px solid rgba(230, 230, 230, 1);

			.avatar {
				width: 60px;
				height: 60px;
				border-radius: 50%;
			}

			.mtitle {
				font-size: 30px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
				margin-left: 10px;
			}

		}

		.goClass {
			width: 139px;
			height: 48px;
			border: 2px solid rgba(230, 230, 230, 1);
			background: white;
			border-radius: 24px;
			font-size: 24px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
		}

		.player {
			width:100%;
			height: 120px;
			background: rgba(246, 247, 247, 1);
			margin-top: 42px;

			.playerAvatar {
				width: 70px;
				height: 70px;
				background: rgba(234, 71, 40, 1);
				border-radius: 50%;
				margin-left: 18px;
			}

			.playerTitle {
				max-width: 89%;
				font-size: 30px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
				margin-left: 32px;
			}

			.playerTime {
				font-size: 24px;
				margin-left: 32px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
			}
		}


		.bodyContainer {
			padding: 56px 0;
			border-bottom: 1px solid rgba(230,230,230,1);
			font-size: 30px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 48px;
			margin-bottom: 39px;
			*{
				max-width: 100%;
			}
		}
		.recommendBox{
			margin-top: 16px;
			
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
	}
</style>
