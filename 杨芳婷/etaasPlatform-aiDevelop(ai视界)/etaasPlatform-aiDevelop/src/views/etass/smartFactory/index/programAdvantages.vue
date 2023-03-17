<template>
	<div class="program-advantages" id="方案优势">
		<div class="program-advantages-title">
			<img src="@/assets/img/smartFactory/programAdvantages/img_ywjs_bt.png" alt="">
		</div>
		<ul class="flex flex-wrap program-advantages-cont">
			<li v-for="(item,index) in lists" :key="index" class="program-advantages-list">
				<div class="pal-title">{{item.title}}</div>
				<div class="pal-des">{{item.des}}</div>
				<img :src="item.img" alt="">
			</li>
		</ul>
		<img src="@/assets/img/smartFactory/programAdvantages/img_fays_tp.png" alt="" class="program-advantages-bg">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lists: [{
					title: "下一站中控",
					des: "在全局视角下进行综合研判、调度指挥和应急指挥等。",
					img: require("@/assets/img/smartFactory/programAdvantages/img_zk.png")
				},{
					title: "智能高效的运行",
					des: "利用感知智能及时发现问题并预警，降低生产事故，提升生产效率。",
					img: require("@/assets/img/smartFactory/programAdvantages/img_yx.png")
				},{
					title: "更深度的洞察",
					des: "打通数据孤岛，搭建3D实景仿真平台，实现生产透明化。实现对历史数据的回溯、实时数据的管理和未来趋势的预测。",
					img: require("@/assets/img/smartFactory/programAdvantages/img_dc.png")
				}]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.program-advantages {
		position: relative;
		padding: 48px 424px 42px 333px;
		.program-advantages-title {
			text-align: center;
			img { width: 149px; }
		}
		.program-advantages-bg {
			position: absolute;
			bottom: 5px;
			right: 0;
			width: 941px;
		}
		.program-advantages-cont {
			.program-advantages-list {
				width: 546px;
				margin-top: 38px;
				&:first-child {
					margin-right: 54px;
				}
				.pal-title {
					padding-bottom: 12px;
					margin-bottom: 4px;
					border-bottom: 1px solid #999999;
					font: 16px/1 bold;
				}
				.pal-des { height: 40px; }
				img {
					width: 546px;
					margin-top: 26px;
				}
			}
		}
	}
</style>
