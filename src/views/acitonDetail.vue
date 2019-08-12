<template>
    <div class="content">
        <div class="banner">
            <!-- <swiper :indicator-dots="indicatorDots" indicator-active-color="#E94727" indicator-color="#CDCDCD"  circular="true" :autoplay="autoplay" :interval="interval" :duration="duration">
                <swiper-item v-for="(item,index) in list.fileUrl" :key="index">
                    <image style="width:100%;height:100%" :src="baseURL+item"></image>
                </swiper-item>
            </swiper> -->
			
			  <swiper :options="swiperOption" ref="mySwiper">
				<!-- slides -->
				<swiper-slide v-for="(item,index) in list.fileUrl"  :key="index">
					<div class="swiper" >
						<img style="width:100%;height:100%" :src="baseURL+item"></img>
					</div>
				</swiper-slide>
				
				<!-- Optional controls -->
				<!-- <div class="swiper-pagination"  slot="pagination"></div>
				<div class="swiper-button-prev" slot="button-prev"></div>
				<div class="swiper-button-next" slot="button-next"></div>
				<div class="swiper-scrollbar"   slot="scrollbar"></div> -->
			  </swiper>
        </div>
        <div class="time">
            <div class="price">
                <div class="p-title"><span>¥</span>{{list.applyPrice}}</div>
                <div class="p-schedule">
                    <div >已报名{{(list.applyCount/list.maxCount)*100}}%</div>
                    <div :style="'width:'+(list.applyCount/list.maxCount)*100+'%'"></div>
                </div>
                <div class="p-number">{{list.applyCount}}人已报名</div>
            </div>
            <div class="date">
                <div>
                    <div>活动时间</div>
                    <div>{{activityTime}}</div>
                </div>
            </div>
        </div>
        <div class="title-box">
            <div class="t-top">{{list.activityName}}</div>
            <div class="t-bottom">
                <div>地点:</div>
                <div>{{list.cityName}}{{list.address}}</div>
            </div>
        </div>
        <div class="focus">
            <span></span><div>课程亮点</div><span></span>
        </div>
        <div class="article">
            <div v-html="list.activityPoint">
				<!-- <rich-text :nodes="list.activityPoint"></rich-span>		 -->
			</div>
        </div>
        <button class="joins">立即报名</button>
    </div>
</template>

<script>
	import 'swiper/dist/css/swiper.css'

	import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "index",
		 components: {
			swiper,
			swiperSlide
		  },
        data(){
            return {
				list:[],
                indicatorDots: true,
                autoplay: true,
                interval: 3000,
                duration: 1000,
				id:null,
				swiperOption:{
					autoplay:true,
					loop:true
				}
            }
        },
		computed:{
			activityTime(){
				return (this.list.activityTime||"").split(' ')[0]
			}
		},
        mounted(){
			this.id = this.$route.query.id || 3;
			this.getDetails(this.id)
        },
        methods:{
            
			
			getDetails(id){
				this.$http.get('/public/activityDetails',{id:id}).then(res=>{
			
					this.list = res.body
				})
			}
			
        },
    }
</script>

<style scoped>
    .content{
        color:#333
    }

    .banner{
        height:518px;
    }

    .swiper{
        height:518px
    }

    .time{
        height:90px;
        display: flex;
        justify-content: space-between;
        font-size: 30px;
    }

    .price{
        display: flex;
        align-items: center;
        background:#EA4728;
        color:#fff;
        width:65%
    }

    .p-title{
        font-size: 42px;
        margin-left:20px
    }

    .p-title span{
        font-size: 26px;
        margin-right: 5px;
    }

    .p-schedule{
        position:relative;
        width: 180px;
        height:30px;
        background:#fff;
        border-radius: 30px;
        margin-left:10px;
        color:#333;
        font-size: 20px;
        text-align: center;
        line-height: 30px;
    }

    .p-schedule div:nth-child(1){
        position:absolute;
        z-index: 3;
        width: 100%;
        text-align: center;
		font-size:18px;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:30px;
    }

    .p-schedule div:nth-child(2){
        position:absolute;
        background:#FFD21F;
        height:30px;
        border-radius: 30px;
        z-index: 2;
    }

    .p-number{
        font-size: 20px;
        margin-left: 10px;
    }

    .date{
        display: flex;
        align-items: center;
        justify-content: center;
        width:35%;
        background:#FFC1B5;
        font-size: 24px;
    }

    .date div{
        text-align: center;
    }

    .title-box{
        width:95%;
        margin: 0 auto;

    }

    .t-top{
        display: flex;
        align-items: center;
        padding-top: 20px;
        padding-bottom: 28px;
        border-bottom: 1px solid #E6E6E6;
    }

    .t-bottom{
        color:#343434;
        margin-top: 20px;
        font-size: 30px;
        display: flex;
        padding-bottom: 42px;
    }

    .t-bottom div:nth-child(1){
        width:10%
    }

    .t-bottom div:nth-child(2){
        width:90%
    }

    .focus{
        display: flex;
        align-items: center;
        justify-content: center;
        height:80px;
        background:#F6F7F7
    }

    .focus div{
        margin:0 30px
    }

    .focus span{
        display: inline-block;
        height:2px;
        width:70px;
        background: #ccc;
    }

    .article{
        width:90%;
        margin:0 auto;
        margin-top: 40px;
        font-size: 26px;
    }

    .joins{
		position:fixed;
		width:100%;
		height:90px;
		line-height: 90px;;
		background:rgba(234,71,40,1);
		bottom:0;
        color:#fff;
        background:#EA4728;
        border-radius: 0;
    }
</style>
