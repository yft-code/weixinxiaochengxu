<template>
  <el-breadcrumb class="app-breadcrumb" :separator="separator">
      <el-breadcrumb-item v-for="(item) in breadcrumbData" :key="item.path">
        <a class="breadcrumb_a" @click.prevent="handleLink(item)">{{ item.name }}</a>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "LzBreadcrumb",
  props:{
    separator:{
      type:String,
      default:'/'
    },
    breadcrumbData:{
      type:Array,
      default: ()=>[]
    }
  },
  methods:{
    handleLink(item){
      this.$emit('toPath',item)
    }
  }
}
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 16px;

 a:hover{
    color: #7C5EFD;
    cursor: pointer;
  }
}
.el-breadcrumb__inner a{
  color: #606266;
  font-weight: 400;
}
</style>
