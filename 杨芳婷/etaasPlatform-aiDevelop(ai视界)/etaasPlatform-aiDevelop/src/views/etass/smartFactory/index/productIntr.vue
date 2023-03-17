<template>
	<div class="product-intr" id="产品介绍">
		<div class="product-intr-title">
			<img src="@/assets/img/smartFactory/productIntr/img_cpjs_bt.png" alt="">
		</div>
		<ul class="product-intr-cont flex flex-wrap">
			<li v-for="(item,index) in lists" :key="index" class="product-intr-item box-sizing-base">
				<div class="pii-title">{{item.title}}</div>
				<div class="pii-des" v-html="item.des"></div>
				<ul class="pii-subs flex flex-wrap">
					<li v-for="(sub,subIndex) in item.subs" :key="subIndex" class="pii-sub">{{sub}}</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lists: [{
					title: "数字孪生平台",
					des: "基于GIS地理信息、厂房、仓库等静态实体信息和叉车等动态实体信息建模，建立3D实景仿真平台。通过产能利用率、二氧化硫排放标准等虚信息管理进行沉浸式报表展示。<br>通过信息系统集成，建设下一代中控平台，实现透明化生产。内容包括AI中控、综合研判平台、调度指挥平台和数字孪生AI应急指挥中心。",
					subs: ["AI中控室","综合研判平台","调度指挥平台","数字孪生AI指挥"]
				},{
					title: "AI-5S监管平台",
					des: "利用AI算法进行5S监管，包括整理、整顿、清扫、清洁和素养，提高监管和工作效率，优化工作环境，提升员工素养。",
					subs: ["AI-整理，整顿监管","AI-清扫，清洁监管","AI-素养监管"]
				},{
					title: "AI-安全监管平台",
					des: "利用AI算法进行作业安全监管，通过强化员工规范化作业，预防安全事故发生；对安全风险进行提前预警，避免或降低损失。",
					subs: ["叉车安全作业监测","总装车间","涂装车间","整车检验区域"]
				},{
					title: "碳监测与碳指挥",
					des: "通过电能、化石能源的消耗及光伏发电信息进行碳排碳汇监测，完成碳足迹追踪。建立行业碳排放标杆数据库并进行对比分析，实现碳排放体检，最终得出碳排放优化方案。",
					subs: ["碳监测","标杆数据研究","碳排放体检","碳指挥"]
				},{
					title: "非接触智能质量监管",
					des: "利用AI感知智能及认知智能技术实现产品全生命周期的质量监管，包括制造过程设备故障诊断、出厂PDI外观检测及流入市场后的质量问题舆情监控，提升客户服务质量。",
					subs: ["设备故障智能诊断与预警","AI-PDI外观检测","质量问题智能舆情监控"]
				},{
					title: "其他集成",
					des: "支持其他系统集成，推动人事、采购等部门密切配合，实现供应链上下游预警，最终提升整体运行效率，增强产业竞争力。",
					subs: ["门禁管理","物流透明化","供应商管理","采购管理","订单管理","库存管理"]
				}]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.product-intr {
		padding: 48px 331px 16px;
		background-color: #F2F2F2;
		.product-intr-title {
			margin-bottom: 27px;
			text-align: center;
			img { width: 161px; }
		}
		.product-intr-cont {
			.product-intr-item {
				width: 401px;
				height: 334px;
				padding: 0 19px 7px;
				margin-bottom: 36px;
				margin-right: 19px;
				background: url('~@/assets/img/smartFactory/productIntr/img_cpjs_kuang.png') no-repeat;
				background-size: cover;
				&:nth-of-type(3n) {
					margin-right: 0;
				}
				.pii-title {
					padding: 22px 40px 29px;
					font: 16px/1 bold;
					color: $white;
				}
				.pii-des {
					height: 155px;
					border-bottom: 1px solid #6E94B1;
					letter-spacing: 1px;
					line-height: 20px;
				}
				.pii-subs {
					padding-top: 20px;
					.pii-sub {
						width: 165px;
						height: 30px;
						margin-bottom: 13px;
						margin-right: 32px;
						line-height: 30px;
						font-weight: bold;
						text-align: center;
						background: #D0E6F6;
						color: #333;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						&:nth-of-type(2n) {
							margin-right: 0;
						}
					}
				}
				&:last-child {
					.pii-des {
						height: 109px;
					}
				}
			}
		}
	}
</style>
