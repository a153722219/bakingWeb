<template>
	<div>
		<lvv-popup  position="bottom" ref="share" @close="closeShare">
			<div class="shareModal" style="width:100%;background: #FFFFFF;position: absolute;bottom:0">
				
				<div class="iconBox fx-row fx-wrap fx-col-space-around">
					<div class="icon fx-column fx-column-center fx-row-center"  @click="share(0)">
						<img src="../assets/wechat.png"></img>
						<span>微信</span>
					</div>
					
					<div class="icon fx-column fx-column-center fx-row-center" @click="share(1)">
						<img src="../assets/wxc.png"></img>
						<span>朋友圈</span>
					</div>
				</div>
				<div class="close" @click="close">
					取消
				</div>
			</div>
		</lvv-popup>
	</div>
</template>

<script>
	import lvvPopup from "./lvv_popup.vue"
	export default {
		components: {
			lvvPopup
		},
		
		data() {
			return {
				
			};
		},
		
		methods: {
			share(type=0){
				
				this.$refs.share.close();
				this.$emit("share",{type})
			},
			
			close(){
				this.$refs.share.close();
			},
			
			closeShare(){
				// this.$refs.share.hide();
			
			},
			
			show(hideTabBar=false){
			
				this.$refs.share.show();
			}
			
		},
	}
</script>

<style lang="less" scoped>
.shareModal{
		position: relative;
		z-index: 66666;
		height:498px;
		.iconBox{
			box-sizing: border-box;
			padding-top: 49px;
			height:320px;
			.icon{
				font-size:26px;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(101,101,101,1);
				text-align: center;
				width:50%;
				img{
					width:90px;
					height:90px;
				}
				span{
					margin-top: 10px;
				}
			}
		}
		
		
		
		.close{
			position: absolute;
			bottom: 0;
			height: 100px;
			border-top: 1px solid rgba(204,204,204,1);
			line-height: 100px;
			text-align: center;
			width: 100%;
			font-size:36px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
	}
</style>
