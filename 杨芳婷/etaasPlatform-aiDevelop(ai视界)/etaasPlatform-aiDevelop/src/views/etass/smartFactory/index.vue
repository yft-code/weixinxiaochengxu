<template>
<div class="smart-park">
  <div class="smart-park-header">
    <div style="height: 1px"></div>
    <div class="smart-park-header-title">智慧工厂解决方案</div>
    <div class="smart-park-header-br"></div>
    <div class="smart-park-header-content">
      基于数字孪生，感知智能，认知智能和云边协同的技术支撑，运用数字技术进行深度信息挖掘，搭建下一代中控，实现全流程可视化，全局协同优化，让工厂运转更搞高效和准确
    </div>
    <div class="smart-park-header-footer">
        咨询方案详情
    </div>
  </div>
    <ul class="smart-park-navs flex align-items-center flex-grow-base">
      <li v-for="(item, index) in list" :key="index" :class="['smart-park-nav box-sizing-base',{
					isActive: item.isActive
				}]">
        <div class="smart-park-title flex-all cursor-pointer" @click="counter(item.title)">
          <img :src="item.icon" alt="">
          <div>{{item.title}}</div>
        </div>

      </li>
    </ul>
    <router-view></router-view>

</div>

</template>

<script>
export default {
name: "smartPark",
  data(){
  return{
    consultVisible: false,
    list:[
      {
        title:'方案理念',
        icon: require("@/assets/img/smartFactory/icon_fzln.png"),
        isActive: true,
        path: "/smartFactory/schemeConcept",
      },
      {
        title:'方案架构',
        icon: require("@/assets/img/smartFactory/icon_faan.png"),
        path: "/smartFactory/schemeArchitecture",
      },
      {
        title:'方案优势',
        icon: require("@/assets/img/smartFactory/iconys_hover.png"),
        path: "/smartFactory/sceneAdvantage",
      },
      {
        title:'产品介绍',
        icon: require("@/assets/img/smartFactory/icon_cpjs.png"),
        path: "/smartFactory/productIntroduction",
      }
    ]
  }
  },
  methods: {
    counter(item){

      const returnEle = document.querySelector('#'+item);  //productId是将要跳转区域的id
      if (returnEle) {
        returnEle.scrollIntoView(true); // true 是默认的
      }
      document.querySelector("counter").scrollIntoView(true); //这里的counter1是将要返回地方的id
    }
  }

}
</script>

<style scoped lang="scss">
.smart-park{
  .smart-park-header{
    height: 401px;
    background: url('~@/assets/img/smartFactory/img_banner.png') no-repeat;
    background-size: cover;
    .smart-park-header-title{
      letter-spacing: 6px;
      width: 337px;
      height: 34px;
      font-size: 36px;
      font-family: Source Han Sans CN;
      margin-left: 711px;
      margin-top: 79px;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 14px;
    }
    .smart-park-header-br{
      width: 483px;
      height: 1px;
      background-color: #FFFFFF;
      margin-left: 711px;
      margin-right: 726px;
      margin-top: 21px;
    }
    .smart-park-header-content{
      width: 491px;
      height: 64px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      margin-left: 710px;
      margin-right: 719px;
      margin-top: 22px;
      color: #FFFFFF;
      //text-align: center;
      letter-spacing: 1px;
      line-height: 24px;
    }
    .smart-park-header-footer {
      width: 160px;
      height: 32px;
      letter-spacing: 2px;
      background: #2F96E3;
      border-radius: 16px;
      margin-left: 711px;
      margin-top: 26px;
      line-height: 32px;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;
      text-align: center;
    }

  }
  .smart-park-navs{
    background: #F2F2F2;
    padding-left: 547px;
    color: $gray;
    .smart-park-nav{
      position: relative;
      width: 187px;
      border-bottom: 2px solid transparent;
      line-height: 80px;
      font-size: 18px;
      text-align: center;
      //text-align: center;
      .smart-park-title {
        img {
          left: 31px;
          height: 22px;
          position: absolute;
          right: 139px;
        }
        div{
          width: 81px;
        }
      }
      &.isActive,&:hover {
        border-bottom-color:#3699E4 ;
        background-color:#F2F2F2 ;
      }
    }
  }
}


</style>
