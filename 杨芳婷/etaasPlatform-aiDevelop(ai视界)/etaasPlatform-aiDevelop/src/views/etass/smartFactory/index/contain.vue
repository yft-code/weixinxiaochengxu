<template>
	<div class="smartFactory">
    <ul class="index-contain">
      <li v-for="(item,index) in lists" :key="index" :id="item.title" class="flex-all">
        <img :src="item.icon" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
	export default {
		name: "indexContain",
		data() {
			return {
				lists: [
          {
            title:'方案理念',
            icon:require("@/assets/img/smartFactory/contain/img_faln.png")
          },
          {
            title:'方案架构',
            icon:require("@/assets/img/smartFactory/contain/img_fajg.png")
          },
          {
            title:'场景优势',
            icon:require("@/assets/img/smartFactory/contain/img_fays.png")
          },
          {
            title:'产品介绍',
            icon: require("@/assets/img/smartFactory/contain/img_cpjs.png")
          }
        ]
			}
		},
	}
</script>

<style lang="scss" scoped>
.smartFactory{
  position: relative;
  .des{
    width: 85px;
    height: 20px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #4D4D4D;
    line-height: 36px;
  }
  .index-contain {
    .des{
      width: 85px;
      height: 20px;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #4D4D4D;
      line-height: 20px;
      position: absolute;
      bottom: 831px;
    }
    li:nth-of-type(1) {
      background-color: #FFFFFF;
      img {
        width: 1920px;
      }
    }
    li:nth-of-type(2) {
      padding: 48px 253px 50px  332px;
      background-color: #F2F2F2;
      img {
        width: 1335px;
      }
    }
    li:nth-of-type(3) {
      padding: 48px 0px 5px  332px;
      background-color: #FFFFFF;
      img {
        width: 1588px;
      }
    }
    li:nth-of-type(4) {
      padding: 48px 331px 68px  330px;
      background-color: #F2F2F2;
      img {
        width: 1259px;
      }
    }
  }
}

</style>
