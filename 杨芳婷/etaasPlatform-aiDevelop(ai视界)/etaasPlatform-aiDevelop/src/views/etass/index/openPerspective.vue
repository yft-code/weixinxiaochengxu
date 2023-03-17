<!-- 打开上帝视角 -->
<template>
	<div class="open-perspective flex">
		<!-- 描述信息 -->
		<div class="open-perspective-info">
			<!-- 信息标题 -->
			<div class="opi-title flex align-items-center">
				<img src="@/assets/img/index/openPerspective/icon_sdsj_jt.png" alt="">
				<span>打开上帝视角</span>
			</div>
			<!-- 信息描述 -->
			<div class="opi-des">
				基于数字孪生技术打造复空间平台，在空间维度实现视角的自由切换，在时间维度上能够实现历史时间回溯，未来趋势预测。
			</div>
		</div>
		<!-- 右侧贴图 -->
		<img src="@/assets/img/index/openPerspective/img_dksdsj.png" alt="" class="open-perspective-img">
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.open-perspective {
		padding: 0 260px 72px 260px;
		background: #F6FDFF;
		// 描述信息
		.open-perspective-info {
			width: 370px;
			padding-top: 110px;
			margin-right: 240px;
			// 信息标题
			.opi-title {
				margin-bottom: 42px;
				font: 38px/1 bold;
				color: $default;
				img {
					width: 12px;
					margin-right: 17px;
				}
			}
			// 信息描述
			.opi-des {
				font-size: 20px;
				letter-spacing: 1px;
				text-align: justify;
			}
		}
		// 右侧贴图
		.open-perspective-img { width: 765px; }
	}
</style>
