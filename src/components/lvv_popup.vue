<template>
	<div>
		<div class="mark" v-show="popshow"></div>
		<div class="lvv-popup" :class="position=='top'&&!hideanimation?'lvv-popuptop':position=='left'&&!hideanimation?'lvv-popupleft':position=='right'&&!hideanimation?'lvv-popupright':position=='bottom'&&!hideanimation?'lvv-popupbottom':position=='top'&&hideanimation?'lvv-hidetop':position=='left'&&hideanimation?'lvv-hideleft':position=='right'&&hideanimation?'lvv-hideright':position=='bottom'&&hideanimation?'lvv-hidebottom':''"
		 v-show="popshow">
			<div class="lvv-popupmark" @click="close">
				<div class="lvv-popupcontent" @click.stop="">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		props: {
			position: {
				type: String,
				default: null
			},
		},
		data() {
			return {
				popshow: false,
				hideanimation: false,

			};
		},
		methods: {
			// Toshow popup page
			show: function() {
				this.popshow = true;
			},
			// Tohide popup page
			close: function() {
				let that = this;
				that.hideanimation = true;

				if (that.position == null) {
					that.popshow = false;
				} else {
					setTimeout(function() {
						that.popshow = false;
						that.hideanimation = false;

					}, 500);
				}
			}
		},
	}
</script>

<style>
	.lvv-popup {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 99999;
	}

	.mark{
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.3);
		position: fixed;
		z-index: 99998;
	}

	.lvv-popup .lvv-popupmark {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		background: rgba(0, 0, 0, 0)
	}

	.lvv-popup .lvv-popupmark .lvv-popupcontent {
		width: 0;
		height: 0
	}

	.lvv-popuptop {
		top: 0;
		left: 0;
		animation: showtop 0.5s
	}

	.lvv-popupleft {
		top: 0;
		left: 0;
		animation: showleft 0.5s
	}

	.lvv-popupright {
		top: 0;
		right: 0;
		animation: showright 0.5s
	}

	.lvv-popupbottom {
		left: 0;
		bottom: 0;
		animation: showbottom 0.5s
	}

	.lvv-hidetop {
		top: 0;
		left: 0;
		animation: hidetop 0.5s
	}

	.lvv-hideleft {
		top: 0;
		left: 0;
		animation: hideleft 0.5s
	}

	.lvv-hideright {
		top: 0;
		right: 0;
		animation: hideright 0.5s
	}

	.lvv-hidebottom {
		left: 0;
		bottom: 0;
		animation: hidebottom 0.5s
	}

	@keyframes showtop {
		from {
			transform: translateY(-100%)
		}

		to {
			transform: translateY(0)
		}
	}

	@keyframes showleft {
		from {
			transform: translateX(-100%)
		}

		to {
			transform: translateY(0)
		}
	}

	@keyframes showright {
		from {
			transform: translateX(100%)
		}

		to {
			transform: translateX(0)
		}
	}

	@keyframes showbottom {
		from {
			transform: translateY(100%)
		}

		to {
			transform: translateY(0)
		}
	}

	@keyframes hidetop {
		from {
			transform: translateY(0)
		}

		to {
			transform: translateY(-100%)
		}
	}

	@keyframes hideleft {
		from {
			transform: translateY(0)
		}

		to {
			transform: translateX(-100%)
		}
	}

	@keyframes hideright {
		from {
			transform: translateX(0)
		}

		to {
			transform: translateX(100%)
		}
	}

	@keyframes hidebottom {
		from {
			transform: translateY(0)
		}

		to {
			transform: translateY(100%)
		}
	}
</style>
