<template>
	<div>
		<!-- 顶部 -->
		<div class="topBg">
			<div class="back"></div>
		</div>

		<!-- 标题 -->
		<div class="container">
			<h3 class="title">
				如何经营好一家门店？
			</h3>
			<div class="infoBox fx-row fx-row-center">
				<div class="left fx-row fx-row-center">
					<img class="avatar" src="../assets/logo.png" alt="">
					<div class="mtitle">博尊课程</div>
				</div>
				<div class="right">
					<button class="goClass">进入课程</button>
				</div>
			</div>
			<!-- 播放器 -->
			<div class="player fx-row fx-row-center">
				<img class="playerAvatar" src="../assets/redplay.png" alt="">
				<div class="playerInfo fx-column fx-col-space-around">
					<div class="playerTitle">
						如何经营好一家门店？
					</div>
					<div class="playerTime">
						11:23
					</div>
				</div>
			</div>
			<!-- 主体 -->

			<div class="bodyContainer">


				店铺的管理，店铺的管理好于坏直接或间接的影响店铺的销售。店铺的经营管理主要包括：店面的布置、商品的管理、店铺推广、销售和售后，下面我们逐一介绍应注意的问题。

				1：店面的布置

				　　店面的布置主要是首页整体的规划，店铺首页是整体展现商品等信息给客户的第一感觉，店主应给据商品服务等信息第一时间展现在客户的眼前，不要让客户点几下鼠标才可以看到。要注意一下几点：

				　　A：整洁大方体现一定的特色，不能一味追求花哨好看，考虑大众的眼球。有的店铺打开以后只见满屏幕图片再跳什么也看不看，眼睛都睁不开。

				　　B：方便与浏览和查找。不要客户在你的店铺看商品还需要“技术性操作”

				　　C：第一时间展现主要商品，有限的页面要合理运用。不要让你的客户第一眼看到大部分是无关紧要的图片和信息。（建议找一些商品陈列的知识看一下）

				2：商品的管理

				　　商品管理主要商品的摆放、商品更新、这直接关系到客户对你的商铺信任的影响，没有客户喜欢扎乱无章，在众多的商品遨游却找不到需要商品。店主要在商品管理上要注意那几个方面呢？

				　　A：商品分类商品分类是客户快速查找商品的途径。好的商品分类有助于客户快速的查找。怎么样对商品分类呢？在这里给大家一个建议作为查考，如果得商品品牌杂乱，每一个品牌商品少的情况下应采取类别分类如：上衣、裤子、祛斑、补水等这样别类有利于客户的查寻。如果每一个品牌有一定的数量类别相对单一建议使用以品牌分类。

			</div>
			
			<!-- 推荐 -->
			<h3 class="title">
				相关推荐
			</h3>
			<div class="recommendBox">
				
				<div v-for="i in 3" class="item fx-row fx-row-start">
					<div class="avatarbox">
						<img src="../assets/h1.png" alt="">
						<div class="tip">
							音频
						</div>
					</div>
					<div class="info fx-column fx-row-space-around">
						<div class="title">
							《烘焙情书》看透烘焙的魔力
						</div>
						<div class="mtitle">
							教你打造垄断企业
						</div>
						<div class="smtitle">
							硅谷创业教父披得•哲学笔记
						</div>
						
						<div class="fx-row fx-row-space-between">
							<span class="price">30讲/￥79.00</span>
							<span class="peoNum">652人加入学习</span>
						</div>
					</div>
					
				</div>
				
			</div>
			
			
		</div>

	</div>


</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			name() {

			}
		},
		mounted() {

		}
	}
</script>

<style lang="less">
	.topBg {
		width: 750px;
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
			width: 684px;
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
