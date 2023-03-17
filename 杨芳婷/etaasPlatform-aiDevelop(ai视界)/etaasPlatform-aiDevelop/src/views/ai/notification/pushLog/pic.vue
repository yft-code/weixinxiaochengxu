<template>
  <div class="algorithm_update">
    <el-dialog
      :visible.sync="visible"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
     <div slot="title">
         
        </div>
      <img class="imgStyle" :src="imgUrl" width="100%" />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: "pic",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
     imgUrl: {
      type: String,
      default: "",
    },
   
  },
  data() {
    return {
     
    };
  },
  created() {},
  watch: {
    visible(n,o) {
     if(n){
       
     }else{
       
     }
    },
  },
  methods: {
    // 关闭弹框
    handleClose() {
      this.$emit("close-callback-pic");
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
