<template>
<div class="smart-park">
  <div class="smart-park-header">
    <p style="height: 1px"></p>
    <div>
      <img src="@/assets/img/smartPark/btton_ljzx.png" v-show="!consultVisible" @mouseover="handleConsult" @mouseleave="handleConsultThen"/>
      <img src="@/assets/img/smartPark/btton_ljzx_hover.png" v-show="consultVisible"/>
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
        title:'方案架构',
        icon: require("@/assets/img/smartPark/icon_faan.png"),
        isActive: true,
        path: "/smartPark/schemeArchitecture",
      },
      {
        title:'方案优势',
        icon: require("@/assets/img/smartPark/iconys_hover.png"),
        path: "/smartPark/programAdvantages",
      },
      {
        title:'场景介绍',
        icon: require("@/assets/img/smartPark/icon_cj_hover.png"),
        path: "/smartPark/sceneIntroduction",
      },
      {
        title:'客户案例',
        icon: require("@/assets/img/smartPark/icon_kh_hover.png"),
        path: "/smartPark/customerCase",
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
    },
    handleConsult() {
      this.consultVisible = true
    },
    handleConsultThen() {
      this.consultVisible = false
    }
  }

}
</script>

<style scoped lang="scss">
.smart-park{
  .smart-park-header{
    height: 401px;
    background: url('~@/assets/img/smartPark/img_banner.png') no-repeat;
    background-size: cover;
    div{
      margin-top: 267px;
      margin-left: 288px;
      image{
        //width: 211px;
        height: 87px;

      }
    }


  }
  .smart-park-navs{
    padding-left: 547px;
    color: $gray;
    .smart-park-nav{
      position: relative;
      width: 187px;
      border-bottom: 2px solid transparent;
      line-height: 80px;
      font-size: 18px;
      text-align: center;
      .smart-park-title {
        img {
          position: absolute;
          height: 22px;
          left: 17px;
          right: 147px;
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
