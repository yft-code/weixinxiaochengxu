<!-- 产品与服务列表 -->
<template>
	<div class="control-lists flex">
		<!-- title -->
		<div class="control-lists-title flex-all">{{title}}</div>
		
		<!-- 列表 -->
		<ul class="control-lists-links flex align-items-center box-sizing-base">
			<li class="control-lists-link" v-for="(item,index) in lists" :key="index" @click="toLink(item)">
				<div :class="['cll-icon',item.className]"></div>
				<div class="control-lists-link-title">{{item.title}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "controlLists",
		props: ["title","lists"],
		methods: {
			toLink(item) {
				item.path && this.toPath('/iframe', { iframeUrl: item.path });
				item.link && window.open(item.link);
			}
		}
	}
</script>

<style lang="scss">
	.control-lists {
		position: relative;
		left: -5px;
		height: 313px;
		background: url('~@/assets/img/control/img_cennter_nr_di.png') no-repeat;
		background-size: cover;
		// title
		.control-lists-title {
			width: 217px;
			height: 100%;
			font-size: 26px;
			line-height: 1;
			color: #fff;
		}
		// 列表
		.control-lists-links {
			width: calc(100% - 212px);
			padding: 0 20px;
			.control-lists-link {
				margin-right: 72px;
				cursor: pointer;
				.cll-icon {
					width: 75px;
					height: 89px;
					margin: 0 auto;
					transition: all .3s;
					&.smq {
						background: url('~@/assets/img/control/icon_rjsmzq.png') no-repeat;
						background-size: cover;
					}
					&.ls {
						background: url('~@/assets/img/control/icon_lsx.png') no-repeat;
						background-size: cover;
					}
					&.dm {
						background: url('~@/assets/img/control/icon_dmk.png') no-repeat;
						background-size: cover;
					}
					&.zp {
						background: url('~@/assets/img/control/icon_zpk.png') no-repeat;
						background-size: cover;
					}
					&.xn {
						background: url('~@/assets/img/control/img_xncs.png') no-repeat;
						background-size: cover;
					}
					&.aq {
						background: url('~@/assets/img/control/icon_aqcs.png') no-repeat;
						background-size: cover;
					}
					&.zdh {
						background: url('~@/assets/img/control/icon_zdhcs.png') no-repeat;
						background-size: cover;
					}
				}
				.control-lists-link-title {
					width: 171px;
					height: 36px;
					margin-top: 21px;
					text-align: center;
					line-height: 36px;
					background: url('~@/assets/img/control/img_bt_di.png') no-repeat;
					background-size: cover;
				}
				&:hover {
					.cll-icon {
						&.smq {
							background: url('~@/assets/img/control/icon_rjsmzq_hover.png') no-repeat;
							background-size: cover;
						}
						&.ls {
							background: url('~@/assets/img/control/icon_lsx_hover.png') no-repeat;
							background-size: cover;
						}
						&.dm {
							background: url('~@/assets/img/control/icon_dmk_hover.png') no-repeat;
							background-size: cover;
						}
						&.zp {
							background: url('~@/assets/img/control/icon_zpk_hover.png') no-repeat;
							background-size: cover;
						}
						&.xn {
							background: url('~@/assets/img/control/img_xncs_hover.png') no-repeat;
							background-size: cover;
						}
						&.aq {
							background: url('~@/assets/img/control/icon_aqcs_hover.png') no-repeat;
							background-size: cover;
						}
						&.zdh {
							background: url('~@/assets/img/control/icon_zdhcs_hover.png') no-repeat;
							background-size: cover;
						}
					}
				}
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
</style>
