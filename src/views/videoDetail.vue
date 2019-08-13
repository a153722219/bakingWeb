<template>
    <div class="content">
		 <div class="audio-model">
		   <video :src="baseURL+list.videoUrl" controls></video>
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
                    <div class="course"  @click="download">进入课程</div>
                </div>
            </div>
     
            <div class="text" v-html="list.introduce">
				<!-- <rich-text :nodes="list.introduce"></rich-text> -->
            </div>
        </div>
        <!-- 推荐 -->
        <h3 class="title">
        	相关推荐
        </h3>
        <div class="recommendBox">
        	
        	<div v-for="(item,index) in list.recommendedCourse" :key="index"   @click.stop="download" class="item fx-row fx-row-start">
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
</template>

<script>
    // import recommend from '@/components/recommend'
    export default {
        name: "index",
      
		data(){
			return {
				list:[],
				id:null
			
			}
		},
		mounted(options){
			this.id = this.$route.query.id || 18;
			
			this.$http.get('/public/getVideoDetails',{courseSectionFileId:this.id}).then(res=>{
			
				this.list = res.body;
			});
		},
		
		methods:{
			back(){
				
			}
			
		},
		
    }
</script>

<style lang="less">
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
        margin-top: 42px;
        /* background:#F6F7F7; */
      
    }
	
	.audio-model video{
		height:400px;
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
