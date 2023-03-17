<!-- 首页 -->
<template>
  <div>
     首页
     <el-button type="text" @click="login">登录</el-button>
     <el-button type="text" @click="submit">注册</el-button>
     <diglog :dialogVisible="dialogVisible" :loginType="loginType" @close-callback="closeCallback"></diglog>
  </div>
</template>
<script>
import diglog from '../../../src/components/diglog'
export default {
   components: { diglog },
   data(){
   return{
     dialogVisible: false,
     loginType:{
        type:'',
     }
    
   }
 },
 created(){
 },
 methods:{
   login(){
     this.dialogVisible = true
     this.loginType.type = 'login'
   },
   submit(){
     this.dialogVisible = true
     this.loginType.type = 'submit'
   },
   closeCallback(){
     this.dialogVisible = false
     this.type = ''
   }
 },
  mounted(){
   
  },
}
</script>

<style lang="scss" scoped>

</style>
