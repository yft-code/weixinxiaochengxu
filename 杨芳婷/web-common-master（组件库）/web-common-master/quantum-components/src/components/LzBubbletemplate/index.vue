<template>
    <div>
       <div id="bubble">
        <h4>气泡1</h4>
      </div>
      <div id="bubble2">
        <h4>气泡2</h4>
      </div>
    </div>
</template>
<style scoped>
  #bubble,#bubble2 {
  width: 80px;
  height: 50px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 3;
  background-image: url('../../assets/cesium/bg.png');
  background-size:100% 100%;
  display: block;
  color: #fff;
  padding: 3px 15px;
}
</style>