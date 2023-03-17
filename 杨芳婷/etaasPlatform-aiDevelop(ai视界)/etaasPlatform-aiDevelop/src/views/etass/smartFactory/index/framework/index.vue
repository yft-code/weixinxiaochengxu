<template>
	<div class="framework" id="方案架构">
		<div class="framework-title">
			<img src="@/assets/img/smartFactory/framework/img_fajg_bt.png" alt="">
		</div>
		<div class="framework-cont flex">
			<ul class="framework-left">
				<li v-for="(item,index) in lists" :key="index" class="framework-left-item">
					<div class="rli-title box-sizing-base">{{item.title}}</div>
					<component :is="item.type"></component>
				</li>
			</ul>
			<div class="framework-right">
				<div class="framework-right-item">
					<div class="framework-right-title">智慧工厂解决方案</div>
					<div class="fri-top">
						<div class="fri-top-des">智慧工厂解决方案可以打破数据孤岛，实现主机厂供应链上下游全流程透明化；实现工厂5S+安全智能无人监管，提升生产效率，降低安全事故发生概率；通过全局碳监测与碳指挥，响应国家碳中和战略，逐步降低碳排放；提前诊断产品质量问题或设备故障，提升客户服务质量。</div>
						<button class="fri-top-contact flex-all">
							<img src="@/assets/img/index/contactUs/phone.png" alt="">
							<span>联系我们</span>
						</button>
					</div>
				</div>
				<div class="framework-right-item">
					<div class="framework-right-title">核心技术赋能</div>
					<ul>
						<li v-for="(item,index) in rightLists" :key="index" class="fri-list">
							<span>{{item.label}}</span>
							<span>{{item.value}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lists: [{
					title: "用户入口",
					type: "userEnter"
				},{
					title: "业务应用",
					type: "application"
				},{
					title: "Etass赋能",
					type: "empowerment"
				},{
					title: "生态应用",
					type: "ecology"
				}],
				rightLists: [{
					label: "LoT：",
					value: "数据来源更丰富，自动化采集，为智能工厂打好基础。"
				},{
					label: "数字孪生：",
					value: "通过3D仿真模拟，实现生产透明化。"
				},{
					label: "AI算法：",
					value: "搭建工厂大脑。"
				}]
			}
		},
		components: {
			userEnter: resolve => require(['./userEnter'],resolve),
			application: resolve => require(['./application'],resolve),
			empowerment: resolve => require(['./empowerment'],resolve),
			ecology: resolve => require(['./ecology'],resolve)
		}
	}
</script>

<style lang="scss" scoped>
	.framework {
		padding: 48px 364px 50px 332px;
		background-color: #F2F2F2;
		.framework-title {
			margin-bottom: 36px;
			text-align: center;
			img { width: 140px; }
		}
		
		// 内容区
		.framework-cont {
			.framework-left {
				width: 891px;
				margin-right: 33px;
				.framework-left-item {
					position: relative;
					.rli-title {
						width: 165px;
						height: 30px;
						padding: 0 23px;
						border-radius: 4px;
						line-height: 30px;
						background: $main-color;
						color: $white;
					}
					&:after {
						content: "";
						position: absolute;
						bottom: -32px;
						left: 50%;
						width: 24px;
						height: 29px;
						transform: translateX(-50%);
						background: url('~@/assets/img/smartFactory/framework/jt_fajg.png') no-repeat;
						background-size: cover;
					}
					&:last-child:after { display: none; }
				}
			}
			
			// right
			.framework-right {
				padding-top: 30px;
				.framework-right-item {
					&:first-child {
						margin-bottom: 84px;
					}
					.framework-right-title {
						padding-bottom: 10px;
						border-bottom: 1px solid #6E94B1;
						font: 16px/1 bold;
						color: $main-color;
					}
					.fri-top {
						.fri-top-des {
							width: 292px;
							margin-top: 10px;
							line-height: 36px;
							letter-spacing: 1px;
						}
						.fri-top-contact {
							width: 140px;
							height: 30px;
							margin-top: 4px;
							border: none;
							background: linear-gradient(90deg, #4FB2FF, #2192E6);
							border-radius: 15px;
							color: #fff;
							cursor: pointer;
							img {
								width: 16px;
								margin-right: 8px;
							}
						}
					}
					.fri-list {
						margin-bottom: 33px;
						line-height: 30px;
						span:first-child { color: $main-color; }
					}
				}
			}
		}
	}
</style>
