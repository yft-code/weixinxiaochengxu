<!-- 联系我们 -->
<template>
	<div class="contact-us box-sizing-base">
		<div class="contact-us-title">获取业务合作</div>
		<div class="contact-us-des">沟通全平台最优秀的研发团队,高级技术顾问为您提供免费售前咨询。</div>
		<button class="contact-us-btn flex-all">
			<img src="@/assets/img/index/contactUs/phone.png" alt="">
			<span>联系我们</span>
		</button>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.contact-us {
		height: 298px;
		padding: 62px 356px;
		background: url('~@/assets/img/index/contactUs/bg.png') no-repeat;
		background-size: cover;
		color: $default;
		.contact-us-title {
			margin-bottom: 21px;
			font: 25px/1 bold;
		}
		.contact-us-des {
			margin-bottom: 37px;
			font-size: 21px;
			line-height: 1;
		}
		.contact-us-btn {
			width: 125px;
			height: 36px;
			border: none;
			border-radius: 4px;
			background: $main-color;
			color: #fff;
			cursor: pointer;
			img {
				width: 16px;
				margin-right: 8px;
			}
			&:hover {
				background: linear-gradient(90deg, #FFA55D 0%, #FFD35D 100%);
			}
		}
	}
</style>
