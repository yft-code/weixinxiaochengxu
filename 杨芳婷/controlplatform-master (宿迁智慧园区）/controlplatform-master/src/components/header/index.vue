<template>
  <div>
    <div class="headerContainer"></div>
     <div class="header">
       AI视频智能辅助监管监察系统 <span class="headerService">产品与服务</span>
       <el-dropdown class="user">
       <div >admin</div>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
     </div>
     <div class="clear"></div>
  </div>
</template>
<script>

export default {
  mounted() {
  
  },
  methods: {
   
  },
};
</script>

<style lang="scss" scoped>
.headerContainer{
   width:100%;
  height: 64px;
  line-height: 64px;
  background:#1C1E24;
  color:#fff;
  font-size: 18px;
  font-family: Source Han Sans CN, Source Han Sans CN-Bold;
  font-weight: 700;
  padding-left:32px;
  position: relative;
  top:0;
  z-index: 9;
}
.header{
  width:100%;
  height: 64px;
  line-height: 64px;
  background:#1C1E24;
  color:#fff;
  font-size: 18px;
  font-family: Source Han Sans CN, Source Han Sans CN-Bold;
  font-weight: 700;
  padding-left:32px;
  position: fixed;
  top:0;
  z-index: 9;
}
.headerService{
  color:#F0F2F5;
  font-size: 14px;
  font-weight: 400;
  padding-left:16px;
}
.user{
  float:right; 
  font-size: 14px;
  color:#fff;
  font-weight: 400;
  margin-right: 32px;
}
.clear{
  clear:both;
 
  
}
</style>