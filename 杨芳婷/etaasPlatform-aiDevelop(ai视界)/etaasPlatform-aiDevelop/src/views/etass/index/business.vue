<!-- 业务介绍 -->
<template>
	<div class="business">
		<!-- 业务列表 -->
		<ul class="business-lists flex align-items-center">
			<li v-for="(item,index) in lists" :key="index" class="business-list box-sizing-base">
				<div class="business-list-title">{{item.title}}</div>
				<div class="business-list-des">
					<div>{{item.des}}</div>
					<div>{{item.enDes}}</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "business",
		data() {
			return {
				lists: [{
					title: "赋能",
					des: "软件即服务",
					enDes: "Soft as a Service",
					path: ""
				},{
					title: "赋智",
					des: "算法即服务",
					enDes: "Algorithm as a Service",
					path: ""
				},{
					title: "赋维",
					des: "维度即服务",
					enDes: "Dimension as a Service",
					path: ""
				}]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.business {
		padding: 58px 260px 51px;
		// 标题
		.business-title {
			text-align: center;
			img { width: 135px; }
			.business-title-des {
				margin-top: 16px;
				color: $light-gray;
			}
		}
		
		// 业务列表
		.business-lists {
			.business-list {
				width: 446px;
				height: 165px;
				padding: 23px 41px;
				margin-right: 30px;
				cursor: pointer;
				&:first-child {
					background: url('~@/assets/img/index/business/img_fn.png') no-repeat;
					background-size: cover;
				}
				&:nth-of-type(2) {
					background: url('~@/assets/img/index/business/img_fz.png') no-repeat;
					background-size: cover;
				}
				&:last-child {
					background: url('~@/assets/img/index/business/img_fw.png') no-repeat;
					background-size: cover;
				}
				.business-list-title {
					margin-bottom: 22px;
					font: 25px/1 bold;
					color: $main-color;
				}
				.business-list-des {
					font-size: 19px;
					line-height: 1;
					color: $gray;
					div:first-child {
						margin-bottom: 14px;
					}
				}
			}
		}
	}
</style>
