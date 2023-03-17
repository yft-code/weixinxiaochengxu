<template>
	<div class="index-banner">
		<div class="swiper-container">
			<div class="swiper-wrapper">
			  <div class="swiper-slide" v-for="(item,index) in lists" :key="index">
				  <img :src="item.img ? item.img : item" alt="">
				  <div v-if="item instanceof Object" class="swiper-slide-info">
					  <div class="sli-title">{{item.title}}</div>
					  <div class="sli-des">{{item.des}}</div>
					  <button class="flex-all">
						  <span>查看服务</span>
					  </button>
				  </div>
			  </div>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import $ from 'jquery'
	export default {
		name: 'banner',
		data() {
			return {
				lists: [{
					title: "云端企业管理新模式",
					des: "提供稳定，便捷，安全的软件服务",
					img: require("@/assets/img/index/banner/bg1.png"),
				},require("@/assets/img/index/banner/bg2.png"),require("@/assets/img/index/banner/bg3.png")]
			}
		},
		mounted() {
			var mySwiper = new Swiper ('.swiper-container', {
				loop: true,
				// 如果需要分页器
				pagination: '.swiper-pagination', 
				paginationType: 'custom',//这里分页器类型必须设置为custom,即采用用户自定义配置 
				 //下面方法可以生成我们自定义的分页器到页面上 
				paginationCustomRender: function(swiper, current, total) { 
					 var customPaginationHtml = ""; 
					 for(var i = 0; i < total; i++) { 
					  //判断哪个分页器此刻应该被激活 
					  if(i == (current - 1)) { 
					  customPaginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>'; 
					  } else { 
					  customPaginationHtml += '<span class="swiper-pagination-customs"></span>'; 
					  } 
					 } 
					 return customPaginationHtml; 
				},
				// paginationClickable: true,  //点击分页器 进行切换swiper
				autoplay: 4000,
				speed: 400
			  })
		   $('.swiper-pagination').on('click','span',function(){
				var index = $(this).index() + 1;
				mySwiper.slideTo(index, 1000, false)//切换到对应的slide，速度为1秒
				mySwiper.autoplaying = true;
			});
		}
	}
</script>

<style lang="scss" scoped>
	.index-banner {
		height: 500px;
		.swiper-container {
			height: 100%;
			img {
				width: 100%;
			}
			.swiper-slide {
				position: relative;
				.swiper-slide-info {
					position: absolute;
					top: 92px;
					left: 260px;
					color: #fff;
					.sli-title {
						margin-bottom: 30px;
						font-size: 40px;
						line-height: 1;
					}
					.sli-des {
						margin-bottom: 38px;
						font-size: 29px;
						line-height: 1;
					}
					button {
						width: 130px;
						height: 32px;
						border: none;
						background: url('~@/assets/img/index/banner/button_ckfw.png') no-repeat;
						background-size: cover;
						color: $main-color;
						cursor: pointer;
						span {
							position: relative;
							left: -10px;
							font-size: 19px;
						}
						&:hover {
							background: url('~@/assets/img/index/banner/button_ckfw_hover.png') no-repeat;
							background-size: cover;
							color: #fff;
						}
					}
				}
			}
		}
		/*包裹自定义分页器的div的位置等CSS样式*/ 
		 /deep/ .swiper-pagination-custom { 
			 bottom: 27px; 
			 left: 0; 
			 width: 100%; 
		 } 
		 /*自定义分页器的样式，这个你自己想要什么样子自己写*/ 
		/deep/ .swiper-pagination-customs { 
			width: 31px;
			height: 4px;
			background: #E6E6E6;
			display: inline-block; 
			margin: 0 5px; 
			cursor: pointer;
		 } 
		 /*自定义分页器激活时的样式表现*/ 
		/deep/ .swiper-pagination-customs-active { 
			background: #FFA55D;
		 } 
	}
</style>
