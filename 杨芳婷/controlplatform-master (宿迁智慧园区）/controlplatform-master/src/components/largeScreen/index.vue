<template>
  <div class="largeScreen">
    <!-- 头部 -->
    <indexTop />
    <div class="box">
      <div class="left"></div>
      <div class="center">
        <div class="centerLeft">
          <left-one />
          <left-two />
          <left-three />
        </div>
        <div class="center">
          <!-- 导航栏 -->
          <menuTip/>
        </div>
        <div class="centerRight">
          <right-One />
          <right-Two />
          <right-Three />
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
import menuTip from "@/components/menu/index.vue";
import rightOne from "@/components/rightOne/index.vue";
import rightTwo from "@/components/rightTwo/index.vue";
import rightThree from "@/components/rightThree/index.vue";
import indexTop from "@/components/indexTop/index.vue";
import leftTwo from "@/components/leftTwo/index.vue";
import leftOne from "@/components/leftOne/index.vue";
import leftThree from "@/components/leftThree/index.vue";
export default {
  components: { indexTop, leftOne, leftTwo, rightOne,rightTwo,rightThree, menuTip,leftThree},
};
</script>

<style>
.largeScreen {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.box {
  margin: 2.6vh 0;
  width: 100%;
  height: 87vh;
  display: flex;
}
.left,
.right {
  width: 0.89vw;
  height: 87vh;
}
.center {
  width: 100%;
  flex: 1;
  height: 87vh;
  display: flex;
}
.centerLeft {
  width: 26.04vw;
  height: 87vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.centerRight {
  width: 26.04vw;
  height: 87vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.none {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: aqua; */
}
.common {
  width: 100%;
  height: 27vh;
  background-color: yellow;
}
.rightTitle {
  font-size: 1.1vw;
}
</style>