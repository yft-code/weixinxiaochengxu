<template>
    <!-- <index-contain></index-contain> -->
		<div class="smart-factory">
			<!-- 方案理念 -->
			<scheme-concept></scheme-concept>
			<!-- 方案架构 -->
			<framework></framework>
			<!-- 方案优势 -->
			<program-advantages></program-advantages>
			<!-- 产品介绍 -->
			<product-intr></product-intr>
		</div>
</template>

<script>
export default {
  name: "index",
  components: {
    schemeConcept: resolve => require(["./schemeConcept"],resolve),
		framework: resolve => require(["./framework/index"],resolve),
		programAdvantages: resolve => require(["./programAdvantages"],resolve),
		productIntr: resolve => require(["./productIntr"],resolve)
  }
}
</script>

<style scoped>

</style>
