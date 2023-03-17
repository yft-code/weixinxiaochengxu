<template>
  <div class="operationWarp">
    <img
      class="bgImg"
      src="@/assets/agent/img/bg.png"
      alt=""
    />
    <img
      class="closeImg"
      src="@/assets/digital/assets/img/region/close.png"
      alt=""
      @click="closeOperation"
    />
    <div class="title">操作</div>
    <div class="line"></div>
    <div class="button" @click="editOperation">编辑区域信息</div>
    <div class="delete noDelete" @click="delOperation">删除点位</div>
  </div>
</template>

<script>
export default {
  props: {
    myMessageCenter: {},
  },
  data() {
    return {
      editFlag: false,
    };
  },
  methods: {
    editOperation() {
      this.$emit("editOperationNew", true);
    },
    closeOperation() {
      this.$emit("closeOperation", true);
    },
    delOperation() {
      
      console.log('删除点位')
      if (!this.$store.state.delPoint) {
        this.$message({
          message: "该点位还未绑定区域",
          type: "warning",
        });
      } else {
        this.$store.state.delOperation = true;
        this.$store.state.delPoint = true;
        this.$emit("delOperationNew", true);
      }
    },
  },
  created() {
    let that = this;
    this.$bus.$on("closeModule", (data) => {
      this.$store.state.editModuleShow = false;

      this.closeOperation();
    });
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.operationWarp {
  width: 292px;
  height: 198px;
  position: relative;
  .bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .closeImg {
    width: 24px;
    height: 24px;
    position: absolute;
    left: 242px;
    top: 26px;
  }
  .title {
    position: absolute;
    left: 27px;
    top: 32px;
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #e8eeff;
    line-height: 30px;
  }
  .line {
    width: 235px;
    height: 1px;
    background: #979797;
    position: absolute;
    left: 29px;
    top: 69px;
  }
  .button {
    position: absolute;
    left: 47px;
    top: 98px;
    width: 128px;
    height: 32px;
    background: rgba(37, 188, 255, 0.2);
    border: 1px solid #25bcff;
    line-height: 32px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #25bcff;
    text-align: center;
  }
  .delete {
    position: absolute;
    left: 163px;
    top: 32px;
    width: 64px;
    height: 22px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #25bcff;
    line-height: 22px;
    text-align: center;
    border-bottom: 1px #25bcff solid;
  }
}
</style>