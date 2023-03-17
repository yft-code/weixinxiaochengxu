<template>
	<div class="scheme-concept" id="方案理念">
		<div class="scheme-concept-title">
			<img src="@/assets/img/smartFactory/schemeConcept/bt_faln.png" alt="">
		</div>
		<div class="scheme-concept-cont flex">
			<ul class="scheme-concept-left">
				<li v-for="(item,index) in leftLists" :key="index" class="sc-item">
					<div class="sc-item-title">{{item.title}}</div>
					<div class="sc-item-des">{{item.des}}</div>
				</li>
			</ul>
			<img src="@/assets/img/smartFactory/schemeConcept/img_faln_di.png" alt="" class="scheme-concept-center">
			<ul class="scheme-concept-right">
				<li v-for="(item,index) in rightLists" :key="index" class="sc-item">
					<div class="sc-item-title">{{item.title}}</div>
					<div class="sc-item-des">{{item.des}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				leftLists: [{
					title: "生产过程可视化",
					des: "利用数字孪生技术对设备及流程进行仿真模拟，包括实时展示生产现状，不同参数下生产模拟。"
				},{
					title: "人机协作",
					des: "利用AI技术推动基于价值的自动化工作流程，将人力解放出来，去从事更高级的任务将工厂的生产力提升至全新高度。"
				}],
				rightLists: [{
					title: "生产决策智能化",
					des: "可采集并理解外部资讯，优化自身规划；拥有自我学习能力，寻找最佳生产方案，自动执行故障诊断。"
				},{
					title: "绿色低碳",
					des: "低污染排放，低能源消耗。"
				}]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.scheme-concept {
		padding: 46px 0 55px;
		background: url('~@/assets/img/smartFactory/schemeConcept/img_faln_wl.png') no-repeat;
		background-size: cover;
		.scheme-concept-title {
			margin-bottom: 53px;
			text-align: center;
			img { width: 137px; }
		}
		.scheme-concept-cont {
			padding: 0 531px 0 509px;
			.scheme-concept-center {
				width: 293px;
				height: 287px;
				padding-top: 4px;
			}
			.sc-item {
				.sc-item-title {
					padding-bottom: 10px;
					border-bottom: 1px solid #6E94B1;
					font: 16px/1 bold;
					color: $main-color;
				}
				.sc-item-des {
					width: 214px;
					margin-top: 8px;
					line-height: 30px;
					letter-spacing: 1px;
				}
			}
			.scheme-concept-left {
				.sc-item {
					width: 300px;
					&:first-child {
						margin-bottom: 92px;
					}
				}
			}
			.scheme-concept-right {
				.sc-item {
					width: 284px;
					&:first-child {
						margin-bottom: 62px;
					}
					.sc-item-title,.sc-item-des {
						padding-left: 75px;
					}
				}
			}
		}
	}
</style>
