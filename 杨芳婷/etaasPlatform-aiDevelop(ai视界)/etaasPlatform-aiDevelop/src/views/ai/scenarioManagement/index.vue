<template>
  <div class="scenarioManagementContainer">
    <div v-if="!showAddSceneFlag"  class="scenarioManagementContent">
    
      <el-form
        :model="ruleForm"
         size="small"
        label-width="80px"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row
        :gutter="20"
      >
        <!-- 搜索框组件 -->
        <template>
          <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
       <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="ruleForm.deviceName" placeholder="请输入"></el-input>
        </el-form-item>
          </el-col>
           <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
       <el-form-item label="算法查询">
            <el-select 
                      style="width:100%"
                      v-model="ruleForm.algId"
                      placeholder="请选择"
                      @change="handleChangeAlgorithm"
                    >
                      <el-option
                        v-for="item in algorithmList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
        </el-form-item>
          </el-col>

          <el-col 
            :sm="24"
            :md="8"
            :lg="12"
            :xl="12">
             <el-form-item style="float:right;margin-right:0px;">
          <el-button type="primary" @click="handleSearch" size="small"
            >搜索</el-button>
          <el-button @click="resetForm" size="small">清空</el-button>
        </el-form-item>
          </el-col>
        </template>
      </el-row> 
      </el-form>
      <div class="form_br"></div>
      <div class="form_bottom1">
        <el-button
          size="small"
          @click="volumeOpen"
          >批量启用</el-button
        >
         <el-button
          size="small"
          @click="volumeClose"
          >批量停用</el-button
        >
     
      </div>
      <div class="scenarioManagementTable id_style">
        <el-table
            class="scenarioManagementTables"
            v-loading="loading"
            ref="multipleTable"
            :data="tableData"
            :cell-style="cellstyle"
            style="width: 100%"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            >
          <el-table-column  align="center" type="selection" width="60">
          </el-table-column>
          <el-table-column
              :index="count"
              type="index"
              label="编号"
              width="100">
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="name"
              label="设备IP"
          >
           <template slot-scope="scope">
              {{scope.row.ip?scope.row.ip:'--'}}
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="area"
              label="设备名称"
          >  
          <template slot-scope="scope"> 
               {{scope.row.deviceName?scope.row.deviceName:'--'}}
          </template>
          </el-table-column>
        
          <el-table-column
              show-overflow-tooltip
              prop="deviceName"
              label="园区/厂区名称"
          >
           <template slot-scope="scope"> 
               {{scope.row.parkName?scope.row.parkName:'--'}}
          </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="algName"
              label="布控算法"
          >
           <template slot-scope="scope"> 
              <div v-if="scope.row.item&&scope.row.item.length>0">
                 <div v-for="(item,index) in scope.row.item" :key="index">
                      <span v-if="!item.isActive" class="circle" style="background:red"></span>
                      <span v-if="item.isActive" class="circle" style="background:green"></span>
                      <span>{{item.algName}}</span>
                 </div>
              </div>
              <div v-else>--</div>
          </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="algorithmicLayout(scope.row)">算法布控</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="form_pg">
          <el-pagination
            style="float: right"
            background
            align="center"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-else>
     <algorithmicLayout 
     :list="list" 
     @back="back" 
     :algLists="algLists"
     :algorithForm="algorithForm"  
     :algorithmicLayoutForm="algorithmicLayoutForm">
    </algorithmicLayout>
    </div>
    <addAlgorithm
      :tableDataFlag1="tableData1"
      :editAlgorithm="editAlgorithm"
      :removeIndex1="removeIndex1"
      :visible="showAddAlgorithm"
      @close-callback2="closeCallback2"
    />
  </div>
</template>
<script>

import addAlgorithm from './addScene/addAlgorithm/index.vue'
import algorithmicLayout from './addScene/algorithmicLayout/index.vue'
import {
  sceneDelete,
  scenePageList,
  sceneQueryDetails,
  sceneUpdateDetails,
} from "../../../api/ai/scenarioManagement";
import {getDeviceAlgList,getAlgorithm,batchDeviceAlg,getDeviceAlgByDeviceId} from '@/api/ai/newScenarioManagement.js';
import { log } from 'mathjs';
export default {
  components: {addAlgorithm,algorithmicLayout},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      algLists:[],
      rules:{
        deviceName:[
          {
             max:50, message: "设备名称不能超过50个字符", trigger: "blur"
          }
        ]
      },
      algorithmicLayoutForm:{},
      algorithForm:[],
      algorithmList:[],
      algorithmTable:[],
      form: {},
      tableData1:{},
      editAlgorithm:{},
      removeIndex1:'',
      showAddAlgorithm:false,
      lastItemShow: false,
      checkAll: false,
      isIndeterminate: true,
      arrShow: [],
      ruleForm: {
        deviceName: "",
        algId: "",
      },
      aa: [],
      control: {
        flag: true,
      },
      loading: false,
      tableData: [
        {
          warning: {},
        },
      ],
      list:[],
      showAddSceneFlag:false, 
      type: "",
      title: "",
      showAddScene: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      AlgorithmListId: [],
      List: [],
      sceneId: "",
      algIds: [],
      userIds: [],
      deviceIds: [],
      time: [],
      name: "",
      n: "",
      id: "",
      offlineNotification: false,
      isActive: false,
    };
  },
  created() {
    this.aloList()
    this.$bus.$on('getDeviceAlgById',(data)=>{
       this.getDeviceAlgByDeviceId(data)
      this.$bus.$emit('getNewDevices')
    })
    // 算法列表
    this.fetchData(this.form);
    this.getSceneList(this.ruleForm);
  },
  methods: {
    aloList() {
      const params = {
        pageSize: 9999,
        pageNum: 1,
      };
      getAlgorithm(params)
        .then((res) => {
          this.algLists = res.result.list;
         
        })
        .catch();
    },
     // 获取算法数据
    fetchData(params) {
      const pageSize = 9999;
      const pageNum = 1;
      params.pageSize = pageSize;
      params.pageNum = pageNum;
      getAlgorithm(params)
        .then((res) => {
          this.algorithmList = res.result.list
        })
        .catch();
    },
    //批量启用
    volumeOpen(){
      let arr = []
      if(this.algorithmTable.length > 0){
        this.algorithmTable&&this.algorithmTable.map(item=>{
          arr.push(item.id)
        })
        arr = arr.join(',')
        const formData = new FormData();
        formData.set("deviceIds", arr);
        formData.set("isActive", true);
        
        batchDeviceAlg(formData).then((res)=>{
          this.$message({
              message: "批量启用成功",
              type: "success",
            });
            this.getSceneList(this.ruleForm);
        }).catch()
      }else{
        this.$message({
              message: "请先选择一个设备",
              type: "error",
            });
      }
      
    },
    //批量通用
    volumeClose(){
      let arr = []
      if(this.algorithmTable.length > 0){
        this.algorithmTable&&this.algorithmTable.map(item=>{
          arr.push(item.id)
        })
        arr = arr.join(',')
        const formData = new FormData();
        formData.set("deviceIds", arr);
        formData.set("isActive", false);

        batchDeviceAlg(formData).then((res)=>{
          this.$message({
              message: "批量停用成功",
              type: "success",
            });
            this.getSceneList(this.ruleForm);
        }).catch()
      }else{
        this.$message({
            message: "请先选择一个设备",
            type: "error",
        });
      }
    
    },
    //算法
    handleChangeAlgorithm(val){
    },
    // 返回
    back(){
      this.getSceneList(this.ruleForm);
      this.showAddSceneFlag = false
    },
    //添加算法
    addAlgorithm(row){
     this.showAddAlgorithm = true
     this.tableData1 = row
    },
    //添加算法弹框关闭
    closeCallback2(){
      this.showAddAlgorithm = false
    },

    getDeviceAlgByDeviceId(val){
          const param = {
            deviceId:val
          }
          getDeviceAlgByDeviceId(param).then((res=>{
             this.list = res.result
             this.showAddSceneFlag = true
          }))
        },

    //算法布控
    algorithmicLayout(row){
      this.$store.state.areaRemark=true
      this.$store.state.refreshMrak=true
      this.$store.state.isRemark=true
      this.algorithmicLayoutForm = row;
      let arr = []
      if(row.item && row.item.length !== 0){
      row.item.map(val=>{
          arr.push({
            id: val.algId,
            name:val.algName
          })
      }) 
      }
      this.algorithForm = arr
      this.getDeviceAlgByDeviceId(row.id)
    },
    handleCheckAllChange(val) {
      //  console.log('val',val);
      if (this.checkAll) {
        this.tableHeader &&
          this.tableHeader.map((item) => {
            item.show = true;
          });
        this.isIndeterminate = false;
        this.lastItemShow = false;
      } else {
        this.tableHeader &&
          this.tableHeader.map((item) => {
            item.show = false;
          });
        this.lastItemShow = true;
      }
      //  console.log('this.checkAll',this.checkAll);
    },
    handleChecked(value) {
      const arrShow = [];
      this.tableHeader &&
        this.tableHeader.map((item) => {
          if (item.show) {
            arrShow.push(item.show);
          }
        });
      this.arrShow = arrShow;

      if (this.arrShow && this.arrShow.length === this.tableHeader.length) {
        this.checkAll = true;
        this.isIndeterminate = false;
      } else {
        this.isIndeterminate = true;
        this.checkAll = true;
      }
      if (this.arrShow.length === 0) {
        this.lastItemShow = true;
      } else {
        this.lastItemShow = false;
      }
    },
    fetchNoticeData() {
      const that = this;
      if (JSON.parse(localStorage.getItem('token'))['aiHorizon']) {
        api
          .getNoticemNum()
          .then((res) => {
            this.$bus.$emit("number", res.result);
          })
          .catch((res) => {});
      }
    },
    uniqueArr(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] == arr[j]) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },
    count(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },

    cellstyle({ columnIndex }) {
      if (columnIndex === 0) {
        return "padding-left:24px;font-size:15PX";
      } else {
        return "font-size:15PX";
      }
    },
    // 监管场景列表
    getSceneList(params) {
      this.loading = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.current = current;
      getDeviceAlgList(params)
        .then((res) => {
             this.tableData = res.result.list
             this.loading = false
             this.total = res.result.total
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getSceneList(this.ruleForm);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSceneList(this.ruleForm);
    },
    // 新增场景
    handleAddScene(val) {
      this.title = val;
      this.type = "add";
      this.showAddSceneFlag = true
      this.showAddScene = true;
    },
    closeCallback(tag) {
      if (tag === "yes") {
        this.getSceneList(this.ruleForm);
        this.showAddScene = false;
      } else {
        this.showAddSceneFlag = false
        // this.showAddScene = false;
      }
    },
    handleSelectionChange(val) {
      this.algorithmTable = val
    },
    // 清空
    resetForm() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.ruleForm = {
        name: "",
        area: "",
      };
      this.getSceneList(this.ruleForm);
    },
    // 搜索
    handleSearch() {
      this.$refs['ruleForm'].validate((valid) => {
       if(valid){
        this.currentPage = 1;
        this.pageSize = 10;
        this.getSceneList(this.ruleForm);
       }
      })
      
    },
    // 编辑
    handleEdit(row, val) {
      this.showAddSceneFlag = true
      this.sceneId = row.id;
      this.type = "edit";
      this.title = val;
      // this.showAddScene = true;
      this.control.flag = true;
    },
    // 删除
    handleDelete(row) {
      this.$confirm("确定删除后当前内容将无法找回，请谨慎操作！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = { sceneId: row.id };
          sceneDelete(params).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getSceneList(this.ruleForm);
            this.fetchNoticeData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消成功",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.circle {
  display: inline-block;
  border-radius: 50%;
  height: 9PX;
  width: 9PX;
  margin-right: 5px;
}
::v-deep .el-table--border .el-table__cell:first-child .cell {
  padding: 0;
  }

.warp{
  display: flex;
  .left{
    width: 257px;
    .header{
      height: 65px;
    }
  }
}
.check-group-box {
  max-height: 400px;
  overflow: auto;
  /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
  }
  /deep/.el-checkbox__inner {
    display: inline-block;
    position: relative;
    margin-left: 10px !important;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    -webkit-transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
    transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
  }
}
/deep/ .el-table__fixed::before {
  width: 0;
}

.scenarioManagementContainer {
  /deep/ .el-table__fixed::before {
    width: 0;
  }
  // width: 1620px;
  .id_style {
    /deep/.el-table th:first-child {
      padding-left: 27PX;
    }
    /deep/ .el-table__body-wrapper {
      //滚动条整体
      &::-webkit-scrollbar {
        width: 4px;
        height: 14px;
      }
      //滚动条小方块
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgb(199, 203, 209);
        background: rgb(199, 203, 209);
      }
      //滚动条轨道
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgb(248, 248, 248);
        border-radius: 0;
        background: rgb(248, 248, 248);
      }
    }
  }
  .scenarioManagementContent {
    .scenarioManagementTable {
      width: 100%;
      ::v-deep .el-button--text {
        font-size: 14px;
      }
      .isActiveClass {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: #fff;
        border: royalblue 8px solid;
      }
      .isActiveClass1 {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: #fff;
        border: #dfe1e4 4px solid;
      }
    }
    width: 97%;
    margin: 24px;
    padding: 24px 60px;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
    .form_br {
      width: 100%;
      height: 1px;
      background-color: #f3f3f5;
    }
    .form_bottom1 {
      margin-top: 24px;
      display: flex;
      margin-bottom: 24px;
      justify-content: flex-end;
    }
    .deviceTable {
      width: 100%;
    }
    .form_pg {
      height: 40px;
      margin-top: 24px;
      margin-right: 0;
    }
  }
}
</style>
