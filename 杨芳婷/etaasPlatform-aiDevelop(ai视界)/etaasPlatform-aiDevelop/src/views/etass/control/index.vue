<template>
	<div class="control box-sizing-base">
		<!-- 用户信息 -->
		<div class="control-user">
			<div>您好,tempike@aliyn.com</div>
			<img src="@/assets/img/control/img_fgx.png" alt="">
		</div>
		<!-- 产品与服务 -->
		<div class="control-ps">
			<div class="control-ps-title">产品与服务</div>
			<div class="control-ps-cont">
				<control-lists 
				:title="item.title"
				:lists="item.lists"
				v-for="(item,index) in lists" 
				:key="index"></control-lists>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "control",
		data() {
			return {
				lists: [{
					title: "Devops",
					lists: [{
						title: "软件生命周期管理",
						path: "https://192.168.1.11:8448",
						className: "smq"
					},{
						title: "代码管理",
						path: "http://192.168.1.11:30080/",
						className: "dm"
					},{
						title: "流水线",
						path: "http://192.168.1.11:30001",
						className: "ls"
					},{
						title: "制品仓库",
						path: "https://192.168.1.11:9443",
						className: "zp"
					}]
				},{
					title: "云测",
					lists: [{
						title: "性能测试",
						path: "http://192.168.1.11/lr?url=192.168.1.14",
						className: "xn"
					},{
						title: "安全测试",
						path: "http://192.168.1.11/fortify?url=192.168.1.15",
						className: "aq"
					},{
						title: "自动化测试",
						path: "http://192.168.1.11/uft?url=192.168.1.16",
						className: "zdh"
					}]
				}]
			}
		},
		components: {
			controlLists: resolve => require(["./lists"],resolve)
		}
	}
</script>

<style lang="scss" scoped>
	.control {
		height: 801px;
		padding: 20px 267px 80px 266px;
		background: url('~@/assets/img/control/img_bg.png') no-repeat;
		background-size: cover;
		// 用户信息
		.control-user {
			padding-bottom: 27px;
			font-size: 20px;
			line-height: 1;
			color: #0E6DB7;
			img { width: 320px;margin-top: 19px; }
		}
		// 产品与服务
		.control-ps {
			.control-ps-title {
				position: relative;
				display: inline-block;
				font-size: 20px;
				font-weight: bold;
				line-height: 1;
				&:after {
					content: "";
					position: absolute;
					top: -14px;
					right: -12px;
					width: 18px;
					height: 14px;
					background: url('~@/assets/img/control/img_fk.png') no-repeat;
					background-size: cover;
				}
			}
			.control-ps-cont {
				margin-top: 15px;
			}
		}
	}
</style>
