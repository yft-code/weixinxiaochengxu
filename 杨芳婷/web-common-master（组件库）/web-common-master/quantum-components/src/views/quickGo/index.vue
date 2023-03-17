<!-- 安装指南 -->
<template>
  <div>
    <div class="componentTitle">快速上手</div>
    <div class="quickDetail">本节将介绍如何在项目中使用liangzi-common</div>
    <div class="quicktTitle">使用vue-cli@3</div>
    <div class="quickDetail">我们为新版的 vue-cli 准备了相应的 liangzi-common 插件，你可以用它们快速地搭建一个基于 liangzi-common 的项目。</div>
    <div class="quicktTitle">引入liangzi-common</div>
    <div class="quickDetail">你可以引入整个 liangzi-common，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 liangzi-common。</div>
    <div class="quickDetails">完整引入</div>
     <div class="quickDetail">在 main.js 中写入以下内容：</div>
     <div class="npmFirst">
       <div class="npmli"><span class="keyQuick">import</span> Vue <span class="keyQuick">from</span><span class="stringQuick">'vue'</span> ;</div>
       <div class="npmli"><span class="keyQuick">import</span> liangziCommon <span class="keyQuick">from</span> <span class="stringQuick">'liangzi-common'</span>;</div>
       <div class="npmli"><span class="keyQuick">import</span><span class="stringQuick"> 'liangzi-common/index.css'</span>;</div>
       <div class="npmli">Vue.use(liangziCommon);</div>
     </div>
     <div class="quickDetails">开始使用</div>
     <div class="quickDetail">至此，一个基于 Vue 和 liangzi-common 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。</div>
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
.quicktTitle{
  margin-top:54px;
  font-size: 20px;
  color:#1f2f3d;
  margin-bottom:24px;
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
.quickDetail{
  font-size: 14px;
  color: #5e6d82;
}
.quickDetails{
  line-height: 80px;
  font-weight: 400;
  color: #1f2f3d;
  font-size: 15px;
}
.npmli{
  font-size: 12px;
  line-height: 28px;
}
.keyQuick{
  color:#3182bd;
}
.stringQuick{
  color:#756bb1;
}
</style>
