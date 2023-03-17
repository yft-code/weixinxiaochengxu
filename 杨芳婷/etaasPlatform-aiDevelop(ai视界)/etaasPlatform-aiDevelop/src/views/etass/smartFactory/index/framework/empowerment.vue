<template>
	<ul class="empowerment flex">
		<li v-for="(item,index) in lists" :key="index" :class="item.className">
			<div class="empowerment-title">{{item.title}}</div>
			<ul class="flex-all empowerment-subs">
				<li v-for="(sub,subIndex) in item.subs" :key="subIndex" class="empowerment-sub">{{sub}}</li>
			</ul>
			<ul v-if="item.bottomSubs" class="flex-all empowerment-bottom-subs">
				<li v-for="(sub,subIndex) in item.bottomSubs" :key="subIndex" class="empowerment-sub">{{sub}}</li>
			</ul>
		</li>
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				lists: [{
					title: "复空间服务平台",
					className: "empowerment-left flex-grow-base box-sizing-base",
					subs: ["WebRTC","bim"],
					bottomSubs: ["GIS","UE4","3D-Max"]
				},{
					title: "云计算中心",
					className: "empowerment-center",
					subs: ["数据管理","数据集成","云边协同"]
				},{
					title: "复空间服务平台",
					className: "empowerment-right flex-grow-base box-sizing-base",
					subs: ["训练中心","算法中心","预警中心"]
				}]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.empowerment {
		position: relative;
		margin-bottom: 21px;
		text-align: center;
		.empowerment-sub {
			width: 100px;
			height: 26px;
			margin-right: 16px;
			line-height: 26px;
			background: #D0E6F6;
			border-radius: 13px;
			&:last-child {
				margin-right: 0;
			}
		}
		.empowerment-subs {
			margin-top: 17px;
		}
		.empowerment-center {
			position: absolute;
			bottom: 12px;
			left: 50%;
			transform: translateX(-50%);
		}
		.empowerment-left,.empowerment-right {
			width: calc((100% - 12px) / 2);
			padding: 0 50px;
			height: 229px;
			background-color: $white;
		}
		.empowerment-left {
			margin-right: 12px;
			.empowerment-sub {
				margin-right: 25px;
				&:last-child {
					margin-right: 0;
				}
			}
		}
		.empowerment-right .empowerment-subs {
			margin-top: 36px;
		}
		.empowerment-title {
			width: 156px;
			margin: 12px auto 0;
			padding-bottom: 5px;
			border-bottom: 2px solid #6E94B1;
		}
		.empowerment-bottom-subs {
			margin-top: 21px;
		}
	}
</style>
