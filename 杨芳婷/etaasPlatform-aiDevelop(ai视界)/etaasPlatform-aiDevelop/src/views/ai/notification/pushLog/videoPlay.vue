<template>
  <div class="algorithm_update">
    <el-dialog
      :visible.sync="visible"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div slot="title"></div>
       <video
        :src="videoUrl"
        muted
        controls
        autoplay
        class="myvideo"
        style="width: 100%; height: 400px; margin: 0 auto"
      ></video>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "videoPlay",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    videoUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  created() {},
  watch: {
    visible(n, o) {
      if (n) {
      } else {
      }
    },
  },
  methods: {
    // 关闭弹框
    handleClose() {
      this.$emit("close-callback-video");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
