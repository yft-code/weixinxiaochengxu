<template>
  <div>
    <el-dialog
      width="600px"
      title="规范样例"
      :visible.sync="innerVisible"
      :before-close="handleClose"
      append-to-body>
      <div style="border-top:1px solid rgba(10, 25, 51, 0.0500);margin-top:-25px;">
        <p class="common-word">规范说明</p>
        <div class="inner-word">
           {{arr&&arr.description?arr.description:'--'}}
        </div>
        <div>
            <p class="common-words">规范样例图</p>
            <div v-if="type==='check'">
              <div  style="display:flex" v-if="arr&&arr.sampleImgs&&arr.sampleImgs.split( ',' )">
              <div style="margin-top:18px" v-for="item in arr&&arr.sampleImgs&&arr.sampleImgs.split( ',' )" :key="item">
                <img style="margin-right:25px" width="100" height="100" :src="item" alt=""/>
            </div>
            </div>
            <div v-else>--</div>
            </div>
          
            <div v-if="type==='select'">
              <div  style="display:flex" v-if="arr&&arr.sampleImgs&&arr.sampleImgs.length>0">
              <div style="margin-top:18px" v-for="item in arr.sampleImgs" :key="item">
                <img style="margin-right:25px" width="100" height="100" :src="item" alt=""/>
            </div>
            </div>
              <div v-else>--</div>
            </div>
        </div>
 </div>
   <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">关 闭</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
 props: {
    row: {},
    faceLists:{},
    innerVisible: {
      type: Boolean,
      default: false,
    },
    type:{},
    title: {
      type: String,
      default: "",
    },
    id: {},
    arr:{},
  },
  methods:{
    handleClose(){
        this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.tips{
    padding:2PX 0;
}
.common-word{
    margin-top: 15PX;
    color: rgba(10, 25, 51, 1);
    font-size: 14PX;
}
.common-words{
     margin-top: 15PX;
    color: rgba(10, 25, 51, 1);
    font-size: 14PX;
}
.inner-word{
    white-space: pre-line;
    margin-top: 4PX;
     color: rgba(10, 25, 51, 0.7);
    font-size: 14PX;
}

</style>