<template>
	<div class="smartPark">
    <ul class="index-contain">
      <li v-for="(item,index) in lists" :key="index" class="flex-all" :id="item.title">
        <img :src="item.icon" alt="">
      </li>
    </ul>
    <div class="des-one">
      方案架构
    </div>
    <div class="des-two">
      方案优势
    </div>
    <div class="des-three">
      场景介绍
    </div>
    <div class="des-four">
      客户案例
    </div>

  </div>
</template>

<script>
	export default {
		name: "indexContain",
		data() {
			return {
				lists: [
          {
            title:'方案架构',
            icon:require("@/assets/img/smartPark/contain/img_cpjg.png"),
          },
          {
            title:'方案优势',
            icon:require("@/assets/img/smartPark/contain/img_cpys.png"),
          },
          {
            title:'场景介绍',
            icon:require("@/assets/img/smartPark/contain/img_cjjs.png"),
          },
          {
            title:'客户案例',
            icon:require("@/assets/img/smartPark/contain/img_khal.png")
          }
        ]
			}
		},
	}
</script>

<style lang="scss" scoped>
.smartPark{
  position: relative;
  .des-one{

    //width: 85px;
    height: 20px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 600;
    color: #4D4D4D;
    line-height: 36px;
    position: absolute;
    top: 30px;
    left: 918px;
  }
  .des-two{
    //width: 85px;
    height: 20px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 600;
    color: #4D4D4D;
    line-height: 36px;
    position: absolute;
    top: 604px;
    left: 918px;
  }
  .des-three{
    //width: 85px;
    height: 19px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 600;
    color: #4D4D4D;
    line-height: 36px;
    position: absolute;
    left: 918px;
    top: 1157px;
  }
  .des-four{
    //width: 85px;
    height: 21px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 600;
    color: #4D4D4D;
    line-height: 36px;
    position: absolute;
    left: 918px;
    bottom: 1419px;
  }
  .index-contain {
    li:nth-of-type(1) {
      padding: 82px 226px 65px 212px;
      background-color:#F2F2F2;
      border-bottom: 8px #FFFFFF solid;
      img {
        width: 1482px;
      }
    }
    li:nth-of-type(2) {
      padding: 75px 449px 27px 307px;
      background-color: #FFFFFF;
      img {
        width: 1164px;
      }
    }
    li:nth-of-type(3) {
      padding: 94px 363px 51px 303px;
      background-color: #F2F2F2;
      img {
        width: 1254px;
      }
    }
    li:nth-of-type(4) {
      padding: 73px 353px 74px 313px;
      background-color: #FFFFFF;
      img {
        width: 1254px;
      }
    }
  }
}

</style>
