<!-- 安装指南 -->
<template>
  <div>
    <div class="componentTitle">安装</div>
    <div class="npmTitle">npm安装</div>
    <div class="npmFirst">npm install liangzi-common@{{store.state.version}}</div>
  </div>
</template>
<script>


export default {
  components: {
  
  },
  data() {
    return {
     
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
.componentTitle {
  margin-top:32px;
  font-size: 24px;
  color: #333;
  line-height: 48px;
}
.npmTitle{
  margin-top:54px;
  font-size: 18px;
  color:#1f2f3d
}
.npmFirst{
  font-size: 12px;
  padding: 18px 24px;
  background-color: #fafafa;
  border: 1px solid #eaeefb;
  margin-bottom: 25px;
  border-radius: 4px;
  margin-top:32px;
}
</style>
