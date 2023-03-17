<template>
  <div class="deviceContainer">
    <div class="deviceContainer">
    <div class="deviceContent" v-if="!modelShow">
      <div class="content">
        <div class="mailContent">邮箱</div>
          <email ref='org' @addEmail="addEmail" @edit='edit'></email>
       <!--  <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="邮箱" name="first">
            <email ref='org' @addEmail="addEmail" @edit='edit'></email>
          </el-tab-pane>
          <el-tab-pane label="短信" name="second">
            <div class="noData">该功能暂未开放,敬请期待</div>
          </el-tab-pane>
           <el-tab-pane label="虚拟拨号" name="third">
              <div class="noData">该功能暂未开放,敬请期待</div>
          </el-tab-pane>
        </el-tabs> -->
      </div>
    </div>
    <div v-if="modelShow">
      <model :flag="addFlag" @back="back" :row='row'></model>
    </div>
   
  </div>
  </div>
</template>
<script>
import email from "@/views/ai/notification/notifitTemplate/email"
import model from "@/views/ai/notification/notifitTemplate/model"
export default {
   components: {email, model},
  data() {
    return {
      params:{},
      activeName: "first",
      modelShow:false,
      // 添加和编辑的类型
      addFlag:'',
      // 编辑的类型
      editFlag:'',
      // 编辑row
      row:{},
      flag: false,
      num: 0,
      loading: true,
      tableData: [],
      // tableData:[{state:'待处理',scene:{name:'yier'},device:{parkName:'公园',buildingName:'也一样',floor:'123',areaName:'dddd',deviceName:'1233434'}},{state:'已处理'}],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {},
  methods: {
     back(){
    this.modelShow=false
    },
    
    // 编辑模板
    edit(val,row){
      // console.log('编辑row',row);
      this.row = JSON.parse(JSON.stringify(row));
      this.addFlag=val
      this.modelShow=true
      // console.log('val',val);

    },
    // 添加邮件模板
    addEmail(val){
      this.addFlag=val
      // console.log('bal',this.addFlag);
      // console.log('321312');
      this.modelShow=true
    },
    handleClick(tab, event) {},
  },
};
</script>
<style lang="scss" scoped>
.mailContent{
  color:#409EFF;
  font-size: 14px;
  line-height: 40px;
  height:40px;
  border-bottom:2px solid #409EFF;
  width:40px;
  cursor: pointer;
  font-weight: 500;
}
.circle {
  display: inline-block;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  margin: 0;
  margin-right: 5px;
}
.fileNameWarning {
  cursor: pointer;
}
/deep/ .el-tabs__nav {
  margin-left: 40px;
}
/deep/ .el-select-dropdown {
  z-index: 10 !important;
}
.deviceContainer {
  /deep/.el-button--primary .el-button--primary {
    background: #347fff;
    border-color: #347fff;
    color: #fff;
  }
  width: 100%;
  .id_style {
    /deep/.el-table th:first-child {
      padding-left: 24px;
    }
  }
  /deep/.el-form-item__label {
    font-weight: 400;
    font-size: 14px;
    color: #0a1933;
  }
  .deviceContent {
    width: 97%;
    margin: 24px auto;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
  }
  .noData{
    // height: 60px;
    line-height: 60px;
    margin-left: 30px;
    font-weight: 400;
    font-size: 16px;
    color: #0a1933;
    padding-bottom:20px;
  }
  .content {
    width: 95%;
    margin: 0 auto;
    padding-top: 24px;
    //background: #0E6DB7;
  }
  .deviceTop {
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(10, 25, 51, 0.05);
    ::v-deep .el-input__inner {
      padding: 0 0 0 16px;
    }
    ::v-deep .el-form-item {
      margin-bottom: 0;
    }
  }
  .deviceCenter {
    height: 40px;
    margin-bottom: 16px;
    //background: #0A1933;
  }
  .deviceTable {
    margin-top: 24px;
    //background: #0A1933;
    ///deep/.el-table--fit {
    //   border-right: 1px solid #EBEEF5;
    //   border-left: 1px solid #EBEEF5;
    // }
  }
  .alogrithm_page {
    margin-top: 24px;
    padding-bottom: 24px;
    height: 45px;
  }
}
</style>