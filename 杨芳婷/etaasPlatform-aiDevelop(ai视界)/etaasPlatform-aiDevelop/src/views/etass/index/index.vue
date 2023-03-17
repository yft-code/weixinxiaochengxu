<!-- 首页 -->
<template>
	<div class="index">
		<!-- banner -->
		<index-banner></index-banner>
		<!-- 业务介绍 -->
		<index-business></index-business>
		<!-- 打开上帝视角 -->
		<open-perspective></open-perspective>
		<!-- 提升运营管理能力 -->
		<operation-mag></operation-mag>
		<!-- 增强决策能力 -->
		<policy-decision></policy-decision>
		<!-- 技术优势介绍——深度产学研合作 -->
		<advantage></advantage>
		<!-- 联系我们 -->
		<contact-us></contact-us>
	</div>
</template>

<script>
	export default {
		name: "index",
		components: {
			indexBanner: resolve => require(["./banner"],resolve),
			indexBusiness: resolve => require(["./business"],resolve),
			openPerspective: resolve => require(["./openPerspective"],resolve),
			operationMag: resolve => require(["./operationMag"],resolve),
			policyDecision: resolve => require(["./policyDecision"],resolve),
			advantage: resolve => require(["./advantage"],resolve),
			contactUs: resolve => require(["./contactUs"],resolve)
		}
	}
</script>

<style>
	
</style>
