<template>
  <div class="regionWarp">
    <!-- <img class="bgImg" src="@/assets/digital/assets/img/region/region.png" alt="">
      <img class="closeImg" src="@/assets/digital/assets/img/region/close.png" alt=""  @click="closeRegion">
      <div class="title">区域信息</div>
      <div class="line"></div>
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tabStyle">
        <el-tab-pane label="关联区域" name="first">
          <el-form :inline="true" :model="formInline" label-position="right" class="demo-form-inline">
           <div style="display:flex;justify-content:space-between;"> 
              <el-form-item label="区域名称" >
               <el-select v-model="formInline.user" placeholder="请选择" class="common">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
          </el-form-item>
           <el-form-item label="园区/厂区">
            <el-input v-model="formInline.user" placeholder="请输入" class="common"></el-input>
          </el-form-item>
           </div>
            <div style="display: flex;justify-content:space-between">
              <el-form-item label="建筑名称">
            <el-input type="text" v-model="formInline.user" placeholder="请输入" class="common"></el-input>
          </el-form-item>
           <el-form-item label="楼层">
            <el-input type="text" v-model="formInline.user" placeholder="请输入" class="common"></el-input>
          </el-form-item>
            </div>
            
           <el-form-item label="备注" prop="desc">
            <el-input type="textarea" v-model="formInline.user" placeholder="空" class="areaStyle"></el-input>
          </el-form-item>
          
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="新建区域" name="second">
             <el-form :inline="true" :model="formInline" label-position="right" class="demo-form-inline">
           <div style="display:flex;justify-content:space-between;"> 
              <el-form-item label="区域名称" >
                  <el-input v-model="formInline.user" placeholder="请输入" style="width:136px"></el-input>
          </el-form-item>
           <el-form-item label="园区/厂区">
            <el-input v-model="formInline.user" placeholder="请输入" style="width:136px"></el-input>
          </el-form-item>
           </div>
            <div style="display: flex;justify-content:space-between">
              <el-form-item label="建筑名称">
            <el-input type="text" v-model="formInline.user" placeholder="请输入" style="width:136px"></el-input>
          </el-form-item>
           <el-form-item label="楼层">
            <el-input type="text" v-model="formInline.user" placeholder="请输入" style="width:136px"></el-input>
          </el-form-item>
            </div>
            
           <el-form-item label="备注" prop="desc">
            <el-input type="textarea" v-model="formInline.user" placeholder="空" style="width:397px"></el-input>
          </el-form-item>
          
             </el-form>
              
        </el-tab-pane>
      </el-tabs>
      </div>

      <div class="button">
        <div @click="confirm" class="confirmButton">确认</div>
        <div @click="cancel" class="cancelButton">取消</div>
      </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {
    handleClick(tab, event) {},
    closeRegion() {
      this.$emit("closeRegion", true);
    },
    confirm() {},
    cancel() {},
  },
};
</script>

<style lang="scss" scoped>
.button {
  position: absolute;
  left: 342px;
  top: 327px;
  // background: chartreuse;
}
.confirmButton {
  width: 64px;
  height: 32px;
  display: inline-block;
  background: rgba(170, 170, 170, 0.16);
  border: 1px solid rgba(170, 170, 170, 0.75);
  font-size: 16px;
  text-align: center;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  line-height: 32px;
}

.cancelButton {
  display: inline-block;
  width: 64px;
  height: 32px;
  background: rgba(37, 188, 255, 0.2);
  border: 1px solid #25bcff;
  font-size: 16px;
  text-align: center;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  line-height: 32px;
  margin-left: 8px;
}
.areaStyle {
  width: 397px;
}
.tabStyle {
  width: 452px;
}
.common {
  width: 136px;
}
/deep/ .el-tabs__nav {
  margin-left: 24px;
}
/deep/ .el-tabs__header {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px 2px 0px 0px;
  opacity: 0.8;
}
/deep/ .el-tabs__nav-wrap::after {
  display: none;
}
/deep/ .el-tabs__active-bar {
  background: #25bcff;
  width: 60px;
  // margin-left: 24px;
}

/deep/ .el-tabs__item {
  font-size: 16px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  // margin-left: 24px;
}
/deep/ .el-tabs__item.is-active {
  color: #25bcff;
}

/deep/ .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ccd1df;
}
/deep/ .el-textarea__inner,
.el-input__inner {
  background: transparent;
}
/deep/ input {
  background-color: transparent;
}

/deep/input::-webkit-input-placeholder {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e8eeff;
}

/deep/input::-moz-input-placeholder {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e8eeff;
}

/deep/input::-ms-input-placeholder {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e8eeff;
}
.regionWarp {
  width: 504px;
  height: 378px;
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
    left: 453px;
    top: 18px;
  }
  .title {
    position: absolute;
    left: 26px;
    top: 18px;
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #e8eeff;
    line-height: 30px;
  }
  .line {
    width: 452px;
    height: 1px;
    background: #979797;
    position: absolute;
    left: 27px;
    top: 55px;
  }
  .content {
    width: 452px;
    // height: 50px;
    position: absolute;
    left: 26px;
    top: 72px;
    // background: chartreuse;
  }
}
</style>