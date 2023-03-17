<template>
	<ul class="user-enter flex align-items-center">
		<li v-for="(item,index) in lists" :key="index" class="user-enter-list">
			{{item}}
		</li>
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				lists: ["3D实景仿真","灵活用户页面","业务场景赋能"]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.user-enter {
		padding: 26px 280px 22px 208px;
		margin-bottom: 8px;
		background: #FFFFFF;
		box-shadow: 0px 4px 2px 0px rgba(191, 191, 191, 0.29);
		.user-enter-list {
			margin-left: 56px;
			font-size: 16px;
			line-height: 1;
			&:first-child {
				margin-left: 0;
			}
		}
	}
</style>
