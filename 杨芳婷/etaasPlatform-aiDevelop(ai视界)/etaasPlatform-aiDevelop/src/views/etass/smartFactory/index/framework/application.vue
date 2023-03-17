<template>
	<ul class="application flex">
		<li v-for="(item,index) in lists" :key="index" class="application-item">
			<div class="application-item-title">{{item.title}}</div>
			<ul class="application-subs">
				<li v-for="(sub,subIndex) in item.subs" :key="subIndex" class="application-sub">{{sub}}</li>
			</ul>
		</li>
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				lists: [{
					title: "数字孪生平台",
					subs: ["3D实景仿真","AI中控室","综合研判平台","调度指挥","AI应急指挥中心"]
				},{
					title: "AL-5S监管",
					subs: ["AI整理监管","AI整顿监管","AI清扫监管","AI清洁监管","AI素养监管"]
				},{
					title: "AI-安全监管",
					subs: ["叉车安全作业监测","总装安全作业监管","总装配电所触电报警","防护用具规范穿戴","涂装苯类物质监测"]
				},{
					title: "碳监测与碳指挥",
					subs: ["碳监测","标杆数据研究","碳排放体检","碳指挥"]
				},{
					title: "非接触智能质量监管",
					subs: ["设备故障智能预警","AI-PDI外观检测","质量问题舆情监控"]
				}]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.application {
		padding: 25px 27px 26px 18px;
		margin-bottom: 12px;
		background: #FFFFFF;
		box-shadow: 0px 4px 2px 0px rgba(191, 191, 191, 0.29);
		.application-item {
			margin-right: 24px;
			text-align: center;
			&:last-child {
				margin-right: 0;
			}
			.application-item-title {
				font-size: 16px;
				line-height: 1;
			}
			.application-subs {
				.application-sub {
					width: 150px;
					height: 26px;
					margin-top: 13px;
					border-radius: 13px;
					line-height: 26px;
					background: #D0E6F6;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
