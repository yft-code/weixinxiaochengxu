<template>
	<div class="ecology">
		<div class="ecology-title">生态应用软件（SAP,BOM,TMS,WMS,MES,OA....）</div>
		<ul class="flex align-items-center flex-wrap">
			<li v-for="(item,index) in lists" :key="index" class="ecology-list">{{item}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lists: ["销售计划管理模块","资源管理模块","零件采购管理模块","排产排程模块","供应商管理模块","库存管理模块","三方物流欧快","报表管理模块"]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.ecology {
		padding: 16px 31px 20px 20px;
		background: #FFFFFF;
		box-shadow: 0px 4px 2px 0px rgba(191, 191, 191, 0.29);
		.ecology-title {
			position: relative;
			padding-bottom: 5px;
			text-align: center;
			&:after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 156px;
				height: 2px;
				transform: translateX(-50%);
				background: #6E94B1;
			}
		}
		.ecology-list {
			width: 170px;
			height: 26px;
			margin-top: 20px;
			margin-right: 53px;
			line-height: 26px;
			text-align: center;
			background: #D0E6F6;
			border-radius: 13px;
			&:nth-of-type(4n) {
				margin-right: 0;
			}
		}
	}
</style>
