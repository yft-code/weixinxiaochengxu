<template>
	<div class="iframe fixed-all">
		<iframe :src="iframeUrl" frameborder="0"
		sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
		v-show="isFrameS"
		id="uIframe"></iframe>
		<iframe name="targetIfr" style="display:none"></iframe>
		<div class="iframe-nemu flex">
			<ul class="iframe-nemu-lists box-sizing-base" v-show="isShow">
				<li class="iframe-nemu-control" @click="toPath('/control')">控制台</li>
				<li 
				v-for="(item,index) in lists" 
				:key="index"
				:class="{
					isActive: item.isActive
				}"
				@click="toP(item)">
					{{item.title}}
				</li>
			</ul>
			<div>
				<img src="@/assets/img/iframe/button_jqr.png"  draggable="false" alt="" @click="changeT" class="cursor-pointer">
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import $ from 'jquery';
	export default {
		data() {
			return {
				iframeUrl: "http://192.168.1.11:30000",
				lists: [{
					title: "软件生命周期管理",
					link: "https://192.168.1.11:8448",
					isActive: true
				},{
					title: "代码管理",
					link: "http://192.168.1.11:30080/",
					isActive: false
				},{
					title: "流水线",
					link: "http://192.168.1.11:30001",
					isActive: false
				},{
					title: "制品仓库",
					link: "https://192.168.1.11:9443",
					isActive: false
				},{
					title: "性能测试",
					link: "http://192.168.1.11/lr?url=192.168.1.14",
					isActive: false
				},{
					title: "安全测试",
					link: "http://192.168.1.11/fortify?url=192.168.1.15",
					isActive: false
				},{
					title: "自动化测试",
					link: "http://192.168.1.11/uft?url=192.168.1.16",
					isActive: false
				}],
				isShow: true,
				isFrameS: true,
				style: {}
			}
		},
		methods: {
			init() {
				this.$route.params.iframeUrl && (sessionStorage.iframeUrl = this.$route.params.iframeUrl);
				if(sessionStorage.iframeUrl == "http://192.168.1.11:30000") this.setOctance();
				if(sessionStorage.iframeUrl == "http://192.168.1.11:30081/") 
					this.setIframe('http://192.168.1.11:30081/c/login', [{
						name: "principal",
						value: "admin"
					},{
						name: "password",
						value: "Harbor12345"
					}]);
				if(sessionStorage.iframeUrl == "http://192.168.1.11:30080/")
					this.setIframe('http://192.168.1.11:30080/users/sign_in', [{
						name: "user[login]",
						value: "root"
					},{
						name: "user[password]",
						value: "Quantum2021!"
					},{
						name: "authenticity_token",
						value: ""
					},{
						name: "user[remember_me]",
						value: 0
					}]);
				else this.setLists();
			},
			setLists() {
				this.iframeUrl = sessionStorage.iframeUrl ? sessionStorage.iframeUrl : "";
				this.lists.forEach(item => {
					item.isActive = false;
					(this.iframeUrl == item.link) && (item.isActive = true);
				})
				if(!this.iframeUrl) {
					this.$message.error("暂无URL地址！");
					this.toPath('/');
				}
			},
			setOctance() {
				var sEncoded = this.b64EncodeUnicode("sa@nga:Quantum2018");
				$.ajax({
				    type: 'POST',
				    url: "http://192.168.1.11/etaas/octane/api/authentication/sign_in",
				    headers: { 'Content-Type': 'application/json;charset=utf8', 'Authorization': "Basic "+ sEncoded },
				    data:JSON.stringify({"user":"sa@nga","password":"Quantum2018"}),
				    success: () => {
				        // window.location.href='octane.html';
						// this.iframeUrl = "http://192.168.1.11:30000"
						this.setLists();
				    },
				    error: function(data){
				    }
				})
			},
			b64EncodeUnicode(str) {
			    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
			        function (match, p1) {
			            return String.fromCharCode('0x' + p1);
			        }));
			},
			setIframe(url, elements) {
				var ExportForm = document.createElement("FORM");
				document.body.appendChild(ExportForm);
				ExportForm.method = "POST";
				ExportForm.target = "targetIfr";
				elements.forEach(item => {
					var newElement = document.createElement("input");
					newElement.setAttribute("name", item.name);
					newElement.setAttribute("type", "hidden");
					ExportForm.appendChild(newElement);
					newElement.value = item.value;
				})
				ExportForm.action = url;
				ExportForm.submit();
				setTimeout(() => {
				   this.setLists();
				},500)
			},
			toP(item) {
				if(item.toLink) {
					window.open(item.toLink);
				}else {
					this.changeTag(item, this.lists);
					this.iframeUrl = item.link;
				}
			},
			changeT() {
				this.isShow = !this.isShow;
			}
		},
		mounted() {
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.iframe {
		iframe {
			width: 100%;
			height: 100%;
		}
		.iframe-nemu {
			position: absolute;
			right: -5px;
			bottom: 50px;
			height: 334px;
			img {
				height: 50px;
			}
			.iframe-nemu-lists {
				width: 160px;
				padding: 3px;
				margin-right: 6px;
				background: #79B0F5;
				box-shadow: 0px 2px 13px 0px rgba(52, 107, 150, 0.28);
				border-radius: 6px;
				li {
					position: relative;
					height: 40px;
					padding-left: 24px;
					border-bottom: 1px dashed #E6E6E6;
					line-height: 40px;
					background: #FFFFFF;
					cursor: pointer;
					&.isActive,
					&:hover {
						background: #E7F2FF;
						color: #2393D5;
						&:after {
							content: "";
							position: absolute;
							top: 50%;
							left: 10px;
							width: 7px;
							height: 14px;
							transform: translateY(-50%);
							background: url('~@/assets/img/iframe/icon_jt.png') no-repeat;
							background-size: cover;
						}
					}
					&.iframe-nemu-control {
						background: linear-gradient(90deg, #3A78DB, #5083F8);
						color: #fff;
						&:hover {
							&:after {
								display: none;
							}
						}
					}
				}
			}
		}
	}
</style>
