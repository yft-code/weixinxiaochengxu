<!-- 首页 -->
<template>
	<div class="main">
		<!-- 头部 -->
		<u-header></u-header>
		<div class="main-cont">
			<router-view></router-view>
		</div>
		<u-footer></u-footer>
	</div>
</template>

<script>
	export default {
		components: {
			uHeader: resolve => require(["@components/uHeader/index"],resolve),
			uFooter: resolve => require(["@components/uFooter"],resolve)
		}
	}
</script>

<style lang="scss" scoped>
</style>
