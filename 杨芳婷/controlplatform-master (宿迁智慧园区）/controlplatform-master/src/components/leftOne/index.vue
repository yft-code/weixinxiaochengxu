<template>
  <div class="common">
    <!--标题-->
    <div class="title"></div>
    <!--内容区-->
    <div class="well-content">
      <div v-for="well in wellData" :key="well.id" class="well">
        <img :src="well.pic" class="well-pic">
        <span class="well-name">{{ well.name }}</span>
        <!--钩子数-->
        <Detail :data="well.hooks" class="hooks"></Detail>
        <!--吨数-->
        <Detail :data="well.ton" class="ton"></Detail>
        <!--开机率-->
        <Detail :data="well.startUp" :show-num="false" class="start-up"></Detail>
      </div>
    </div>
  </div>
</template>
<script>
import Detail from './detail.vue'
export default {
  name: "leftOne",
  components: {
    Detail
  },
  data() {
    return {
      // 主井数据
      wellData: [
        {
          id: 1,
          name: '主井1',
          hooks: {
            title: '钩数',
            number: 63,
            odds: '72%'
          },
          ton: {
            title: '吨数',
            number: 23,
            odds: '-12%'
          },
          startUp: {
            title: '开机率',
            odds: '0.5%'
          },
          pic: require('@/assets/img/left/blue-well.svg')
        },
        {
          id: 2,
          name: '主井2',
          hooks: {
            title: '钩数',
            number: 725,
            odds: '7.2%'
          },
          ton: {
            title: '吨数',
            number: 2,
            odds: '-0.03%'
          },
          startUp: {
            title: '开机率',
            odds: '12%'
          },
          pic: require('@/assets/img/left/white-well.svg')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.common {
  width: 100%;
  height: 27.97vh;
  background-image: url("~@/assets/img/left/left-one-bg.png");
  background-size: 100% 100%;
  background-color: transparent !important;
  /* 标题样式 */
  .title {
    height: 20%;
    width: 100%;
  }
  /* 内容区样式 */
  .well-content {
    display: flex;
    height: 80%;
    .well {
      height: 100%;
      flex: 1;
      position: relative;
      border-color: transparent;
      background-color: transparent;
      &-pic {
        width: 90%;
        margin-left: 5%;
        margin-top: -5%;
      }
      &-name {
        font-size: 1.3vw;
        position: absolute;
        top: 12%;
        left: 50%;
        font-weight: 500;
        transform: translateX(-50%);
        background-image: linear-gradient(to bottom, #A6CDFF, #2283FF);
        -webkit-background-clip: text;
        color: transparent;
      }
      .hooks {
        left: 3%;
        top: 40%;
      }
      .ton {
        right: 0;
        top: 40%;
      }
      .start-up {
        left: 50%;
        transform: translateX(-50%);
        bottom: 20%
      }
    }
  }
}
</style>