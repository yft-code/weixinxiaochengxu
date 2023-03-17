<template>
  <div class="personelPosition">
    <div class="personelFlex">
      <div class="positionLi positionMargin">
        <img src="@/assets/img/right/xjry.png" class="positionLiImg"/>
        <div class="positionLiContent">
           <div class="positionLiTitle">下井人数</div>
           <div class="positionLiNum">126</div>
        </div>
        <div class="clear"></div>
      </div> 
      <div class="positionLi positionMargin">
        <img src="@/assets/img/right/ccsj.png" class="positionLiImg"/>
        <div class="positionLiContent">
           <div class="positionLiTitle">赶出时间</div>
           <div class="positionLiNum">54</div>
        </div>
        <div class="clear"></div>
      </div>   
      <div class="positionLi">
        <img src="@/assets/img/right/jccl.png" class="positionLiImg"/>
        <div class="positionLiContent">
           <div class="positionLiTitle">进出车辆</div>
           <div class="positionLiNum">32</div>
        </div>
        <div class="clear"></div>
      </div>  
    </div>
      <div class="positionBorder"></div>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>
.personelPosition {
  width: 100%;
  height: 22.45vh;
  background:url('~@/assets/img/right/onebg.png') no-repeat center center;
  background-size:100% 100%;
  padding:10vh 0.4vw 0 0.4vw;
  font-family: Helvetica, Helvetica-Bold;
  
}
.personelFlex{
  display: flex;
}
.positionLi{
  flex:1;
}
.positionMargin{
  margin-right:8px;
}
.clear{
  clear:both;
}
.positionLiImg{
  float:left;
  width:4vw;

}
.positionLiContent{
  float:left;
}
.positionLiTitle{
  color:#fff;
  font-size: 0.5vw;
}
.positionLiNum{
  color:#71CCFF;
  font-size: 1.4vw;
  font-weight: 700;
  margin-top:1.2vh;
}
.positionBorder{
  width:90%;
  margin:0 auto;
  height:2px;
  margin-top:2vh;
  background: linear-gradient(to right, rgba(34,131,255,0), #4895f6, rgba(72,149,247,0.39), rgba(72,150,248,0.77), rgba(71,152,255,0));
}
</style>