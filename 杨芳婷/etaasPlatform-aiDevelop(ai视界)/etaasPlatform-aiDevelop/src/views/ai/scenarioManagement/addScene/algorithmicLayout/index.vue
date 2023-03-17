<template>
  <div class="scenarioManagementContainer">
    <div class="scenarioManagementContent">
      <div class="left">
        <div class="header">
          <img
            class="ico"
            src="@/assets/img/ai/arrow.png"
            alt=""
            @click="back()"
          />
          <span class="title">布控算法</span>
        </div>
        <div
          :class="[{ active: index === mark }]"
          v-for="(item, index) in algorithmList"
          :key="index"
          class="alg"
          @click="changeAlgorithm(item, index)"
          @mouseover="mouseOver(index)"
          @mouseleave="mouseLeave(index)"
        >
          <div class="aglItem" :class="[{ activeSecond: index === mark }]">
            <span
              v-if="!item.isActive"
              class="circle"
              style="background: red"
            ></span>
            <span
              v-if="item.isActive"
              class="circle"
              style="background: green"
            ></span>
            <span class="algName">{{ item.algName }}</span>
            <img
              v-if="index === Index"
              class="delStyle"
              src="@/assets/img/ai/del.png"
              alt=""
              @click.stop="del(item, index)"
            />
          </div>
        </div>
         <el-button size="small"  class="algAdd" @click="algorithmAdd">添加算法</el-button>
      </div>
      <div class="right">
        <div v-if="algorithmList.length === 0" class="noData">暂未布控算法，点击<span class="addData" @click="algorithmAdd">添加算法</span></div>
        <div class="header">
          <div v-if="algorithmList.length > 0">
            <span class="title">{{ item && item.algName }}</span>
            <el-switch
              @change="switchActive"
              v-model="value"
              active-color="#347FFF"
              inactive-color="#9B9FAC"
              class="algroSwitch"
            >
            </el-switch>
            <el-button type="primary" class="btn" size="small" @click="save" :loading="loading"
              >保存</el-button
            >
          </div>
        </div>
        <div class="content">
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            v-if="algorithmList.length > 0"
            style="height:100%"
          >
            <el-tab-pane label="基础配置" name="first">
              <basicConfig
                :algLists="algLists"
                ref="basicChild"
                :algId="algId"
                :item="item"
                :id="id"
                :objectArr="objectArr"
                :deviceId="deviceId"
                :pointArea="pointArea"
                :timeTemplateId="timeTemplateId"
                :warningId="warningId"
                @saveSuccess = "saveSuccess"   
              ></basicConfig>
            </el-tab-pane>
            <el-tab-pane label="算法参数" name="second">
              <algorithmParam
                :algParam="algParam"
                ref="algChild"
                :algId="algId"
                :item="item"
              ></algorithmParam>
            </el-tab-pane>
            <el-tab-pane label="日志" name="third">
              <log :item="item"  :algorithmicLayoutForm="algorithmicLayoutForm"></log>
            </el-tab-pane>
          </el-tabs>
          
        </div>
      </div>
      
       <div class="clear"></div>
      
    </div>
    <addAlgorithm
      :tableDataFlag1="tableData1"
      :visible="showAddAlgorithm"
      @toAlogorithm="toAlogorithm"
      @close-callback2="closeCallback2"
      :algorithForm = "algorithForm"
      :algList = "algorithmList"
    />
  </div>
</template>

<script>
import basicConfig from "../basicConfig/index.vue";
import algorithmParam from "../algorithmParam/index.vue";
import { getAlgorithm } from "@/api/ai/newScenarioManagement.js";
import log from "../log/index.vue";
import {
  getDeviceVideoPic,
  deviceControlAlg,
  getDeviceAlgByDeviceId,
  removeDeviceAlg,
  controlAlg
} from "@/api/ai/newScenarioManagement.js";
import addAlgorithm from "../addAlgorithm/index.vue";
export default {
  components: { basicConfig, algorithmParam, log, addAlgorithm },
  props: {
    algLists:[],
    list: [],
    algorithmicLayoutForm: {},
    algorithForm: [],
  },
  watch:{
      list: {
      handler(newVal, oldVal) {
        // 刷新时将之前未保存，且还没有删除的算法保留到页面
        this.saveDeletes()
        this.algorithmList=newVal.concat(this.deletes)
        // 去重
        this.algorithmList=this.unlink(this.algorithmList)
        if(this.algorithmList.length>0){
          if(!this.deleteRemark){
          this.item = this.algorithmList[0];
          this.value = this.algorithmList[0].isActive;
          }
        }
      },
      immediate: true,
      deep: true,
    },
      algorithmList: {
      handler(newVal, oldVal) {
        // 监听所有未被保存的算法
        if(this.algorithmList.length>0){
          if(!this.deleteRemark){
         this.item = this.algorithmList[0];
         this.value = this.algorithmList[0].isActive;
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      deletes:[],
      loading:false,
      deleteRemark:false,
      item: {},
      algParam: "",
      mark: 0,
      id: "",
      Index: -1,
      algId: "",
      algName:'',
      warningId: "",
      timeTemplateId: "",
      objectArr: [],
      pointArea: "",
      deviceId: "",
      algorithName: "",
      tableData1: {},
      showAddAlgorithm: false,
      editAlgorithm: {},
      removeIndex1: "",
      value: false,
      form: this.algorithmicLayoutForm,
      activeName: "first",
      algorithmList:[],
      algorithmLists:[]
    };
  },
  created() {
    // 删除，编辑，添加都调用的方法
    this.$bus.$on('getNewDevices',()=>{
    if(this.algorithmList.length>0){
      this.mark=0
      this.Index=-1
      this.item = this.algorithmList[0];
    }
    })
    if (this.algorithmList.length === 0) {
    } else {
      this.algorithName = this.algorithmList[0].algName;
      this.value = this.algorithmList[0].isActive;
      this.warningId = this.algorithmList[0].warningId;
      this.timeTemplateId = this.algorithmList[0].timeTemplateId;
      this.pointArea = this.algorithmList[0].pointArea;
      this.deviceId = this.algorithmicLayoutForm.id;
      this.algId = this.algorithmList[0].algId;
      this.id = this.algorithmList[0].id;
      this.objectArr = this.algorithmList[0].userIds;
      this.algParam = this.algorithmList[0].algParam;
      this.item = this.algorithmList[0];
      this.fetchData();
    }
  },
  methods: {
     fetchData() {
      const params = {
        pageSize: 9999,
        pageNum: 1,
      };
      getAlgorithm(params)
        .then((res) => {
          this.algorithmLists = res.result.list;
          this.algorithmLists &&
            this.algorithmLists.map((item) => {
              if (this.algId === item.id) {
                this.algName = item.code;
                return;
              }
            });
         
        })
        .catch();
    },
    // 数组去重
  unlink(arr) {
    for (var i = 0; i < arr.length; i++) {    // 首次遍历数组
        for (var j = i + 1; j < arr.length; j++) {   // 再次遍历数组
            if (arr[i].algId == arr[j].algId) {          // 判断连个值是否相等
                arr.splice(j, 1);           // 相等删除后者
                j--;
            }
        }
    }
    return arr
},
    saveDeletes(){
        let deletes=[]
        this.algorithmList.map(item=>{
          if(item.id==''){
            deletes.push(item)
          }
        })
        this.deletes=deletes
    },
    saveSuccess(status){
      if(!status){
        this.loading = true
      }else{
        setTimeout(()=>{
          this.loading = false
        },3000)
      }  
      this.fetchData();
    },
    deWeightThree(arr, value) {
      let map = new Map();
      for (let item of arr) {
        if (!map.has(item[value])) {
          map.set(item[value], item);
        }
      }
      return [...map.values()];
    },
    // setImportantId(data) {
    //   this.algorithmList &&
    //     this.algorithmList.map((item) => {
    //       if (item.algId === this.algId) {
    //         item.id = data;
    //         this.$forceUpdate(); // 强制刷新
    //       }
    //     });
    // },
    save() {
      this.$refs.basicChild.save();
      //this.$refs.algChild.save();
    },
    switchActive() {
      if (this.item.id === "") {
        this.$message.error('请先保存该算法!')
        this.value = !this.value;
        this.$store.state.isRemark=true
      } else  {
          this.$refs.basicChild.$refs.formTemplateList.validate((valid) => {
          if(valid){
            this.algorithmLists.map(element=>{
              if(element.id === this.algId) {
                 this.algName = element.code;
              }
            })
            let formrule = '';
            if(this.algName === 'fire'){
               formrule = 'formFire'
            }else if(this.algName === "smoke"){
               formrule = 'formFire'
            }else if(this.algName === "person"){
               formrule = 'formFire'
            }else if(this.algName === "person_illegal"){
               formrule = 'formillega'
            }else if(this.algName === "face"){
              formrule = 'formFace'
            }else if(this.algName === "face_captured"){
              formrule = 'formFaceCaptured'
            }else if(this.algName === "person_leave"){
              formrule = 'formPersonLeave'
            }else if(this.algName === "deep_lab"){
              formrule = 'formDeepLab'
            }else if(this.algName === "person_sleep"){
              formrule = 'formDetection'
            }else if(this.algName === "person_wander"){
              formrule = 'formWander'
            }else if(this.algName === 'extinguisher'){
               formrule = 'formExting'
            }else if(this.algName === 'exbox'){
               formrule = 'formExting'
            }else if(this.algName === 'car_captured'){
               formrule = 'formCar'
            }else if(this.algName === 'belt'){
               formrule = 'formBelt'
            }else if(this.algName === 'person_density'){
               formrule = 'formDensity'
            }else if(this.algName === 'person_gather'){
               formrule = 'formGather'
            }else if(this.algName === 'person_fall'){
               formrule = 'formfall'
            }
            this.$refs.algChild.$refs[formrule].validate((valids) => {
              if(valids){
                  const param = {
                    deviceId: this.deviceId,
                    algId: this.algId,
                    isActive: this.value,
                  };
                  controlAlg(param).then((res) => {
                    if(res.code===0){
                   this.$store.state.areaRemark=false
                      this.deleteRemark=true
                      this.$message.success(res.message)
                      this.algorithmList &&
                      this.algorithmList.map((item) => {
                        if (item.algId === this.algId) {
                        item.isActive = this.value;
                        this.$forceUpdate();//强制刷新
                          // item.id = data
                        this.$store.state.isRemark=false
                      }
                      });
                    }
                  }).catch(()=>{
                      setTimeout(()=>{
                        this.value = !this.value;
                      },300)
                  });
              }else{
                 this.$message.error('请先完成算法参数!');
                this.value = !this.value;
                this.$store.state.isRemark=true
              }
            })
          
          }else{
            this.$message.error('请先完成基础配置!');
            this.value = !this.value;
            this.$store.state.isRemark=true
          }
        
       })
       
     }
    },
    del(item, index) { 
       this.$confirm(
        "确认要删除这个算法吗？删除后将不可恢复！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
        if(item.id===''){
        for (let i=0; i<this.algorithmList.length; i++){
            if (this.algorithmList[i].algId == item.algId){
              this.algorithmList.splice(i, 1)
            }
          }
          this.$bus.$emit('getDeviceAlgById',this.deviceId)
          // this.saveDeletes()
        }else{
         const param = {
          deviceId: this.deviceId,
          algId: item.algId,
         };
         removeDeviceAlg(param).then((res) => {
          for (let i = 0; i < this.algorithmList.length; i++) {
            if (this.algorithmList[i].algId == item.algId) {
              this.algorithmList.splice(i, 1);
            }
          }
           for (let i = 0; i < this.algorithForm.length; i++) {
            if (this.algorithForm[i].id == item.algId) {
              this.algorithForm.splice(i, 1);
            }
          }
         }); 
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.item = this.algorithmList[0];
          this.$bus.$emit('getDeviceAlgById',this.deviceId)
          this.$bus.$emit('deleteCurrnetalgorit',item.algId)
          // this.saveDeletes()
         }
        })
        .catch(() => {
        });
    },

    mouseOver(index){
        this.Index = index;
    },
    mouseLeave(val) {
      this.Index = -1;
    },

    toAlogorithm(data) {
      this.showAddAlgorithm = false;
      var arr = [];
      data &&
        data.map((item) => {
          var obj = {
            id: "",
            userIds: [],
            algId: item.id,
            algName: item.name,
            pointArea: "",
            algParam: null,
            warningId: "",
            timeTemplateId: "",
            isActive: false,
          };
          arr.push(obj);
        });
      this.algorithmList = this.algorithmList.concat(arr);
      this.algorithName = this.algorithmList[0].algName;
      this.value = this.algorithmList[0].isActive;
      this.warningId = this.algorithmList[0].warningId;
      this.timeTemplateId = this.algorithmList[0].timeTemplateId;
      this.pointArea = this.algorithmList[0].pointArea;
      this.deviceId = this.algorithmicLayoutForm.id;
      this.algId = this.algorithmList[0].algId;
      this.id = this.algorithmList[0].id;
      this.objectArr = this.algorithmList[0].userIds;
      this.algParam = this.algorithmList[0].algParam;
      this.item = this.algorithmList[0];
      this.mark=0
      this.Index=-1
      this.algorithmList = this.deWeightThree(this.algorithmList,'algId')
    },
    closeCallback2() {
      this.showAddAlgorithm = false;
    },
    algorithmAdd() {
      this.showAddAlgorithm = true;
      this.tableData1 = this.algorithmList;
    },
    back() {
      this.$emit("back");
    },
    changeAlgorithm(item, index) {
      this.$store.state.areaRemark=true
      this.$store.state.isRemark=true
      // this.Index=index
      this.mark = index;
      this.algorithName = item.algName;
      this.value = item.isActive;
      this.warningId = item.warningId;
      this.timeTemplateId = item.timeTemplateId;
      this.pointArea = item.pointArea;
      this.algId = item.algId;
      this.id = item.id;
      this.objectArr = item.userIds;
      this.algParam = item.algParam;
      this.item = item;
      this.$refs.basicChild.resetFrom();
    },
    getDeviceAlgByDeviceId() {
      const param = {
        deviceId: this.form.id,
      };
      getDeviceAlgByDeviceId(param).then((res) => {
        if(res.result){
          this.algorithmList = res.result;
          this.$forceUpdate(); // 强制刷新
        }
      });
    },
    handleClick(tab, event) {
      if(this.activeName==='first'){
         this.$store.state.refreshMrak=true
         this.$store.state.isRemark=true
         if(this.mark===0){
            this.item = this.algorithmList[0];
            this.$bus.$emit('getFirstData',this.item)
         }
      // this.$bus.$emit('getDeviceAlgById',this.deviceId)
      }else{
         this.$store.state.refreshMrak=false
         this.$store.state.isRemark=false
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.algName{
  color:#0A1933;
  font-weight: 500;
}
.activeSecond {
  border-right: 2px solid #347fff;
}
.algroSwitch{
  margin-top:-6px;
}
.active {
  background: rgba(52, 127, 255, 0.08) !important;
}
.noData{
  text-align: center;
  color:#0A1933;
  font-weight: 600;
  padding-top:200px;
  font-size: 20px;
}
.addData{
   cursor: pointer;
   text-decoration: underline;
   color:#347FFF;
}
.aglItem {
  height: 30px;
  line-height: 30px;
  position: relative;
  // background: greenyellow;
}
.delStyle {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 6px;
  right: 10px;
}
.aglItem:hover {
  border-right: 2px #347fff solid;
}
.algAdd {
  position: absolute;
  bottom: 16px;
  left:16px;
  width:224px;
  color: rgba(10,25,51,0.5);
  font-size: 14px;
  border: 1px solid rgba(10,25,51,0.2);
}
.circle {
  display: inline-block;
  border-radius: 50%;
  height: 9PX;
  width: 9PX;
   line-height:44px;
  margin-left: 26px;
  margin-right: 5px;
  position: relative;
  // float:left;
}
.alg {
  width: 256px;
  height: 44px;
  line-height: 44px;
  margin-bottom: 8px;
  padding: 7px 0 7px 0;
  // background: rgba(10, 25, 51, 0.03);
  cursor: pointer;
}
.alg:hover {
 background: rgba(10, 25, 51, 0.03);
}
.scenarioManagementContainer {
  /deep/ .el-table__fixed::before {
    width: 0;
  }
  // width: 1620px;
  .id_style {
    /deep/.el-table th:first-child {
      padding-left: 24px;
    }
    /deep/.el-table__body-wrapper {
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
    display: flex;
    width: 97%;
    min-height: 70vh;
    //background:red;
    //width: 1572px;
    margin: 24px;
    // padding: 24px 60px;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
    .left {
      position: relative;
      width: 257px;
      border-right: 1px #f3f3f5 solid;
      .header {
        line-height: 56px;
        border-bottom: 1px #f3f3f5 solid;
        height: 56px;

        .ico {
          width: 20px;
          height: 20px;
          margin-left: 24px;
          margin-top: -6px;
          cursor: pointer;
        }
        .title {
          padding-left: 16px;
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 500;
          color: #000000;
        }
      }
    }
    .clear{
      clear:both
    }
    .right {
      width: 1350px;
      height: 100%;
      .header {
        line-height: 56px;
        border-bottom: 1px #f3f3f5 solid;
        height: 56px;
        position: relative;
      }
      .btn {
        float: right;
        margin-top:8px;
        margin-right:8px;
      }
      .title {
        padding-left: 32px;
        padding-right: 32px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 500;
        color: #000000;
      }
      .content {
        padding: 28px 0 0 24px;
        height:100%;
        ::v-deep .el-tabs__content{
          height:100%;
          min-height: 70vh;
        }
        ::v-deep .el-tabs__item {
          font-size: 16px;
        }
      }
    }
    ::v-deep .el-form-item__label {
      font-size: 16px;
    }
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
      //.isActiveClass1{
      //  width: 20px;
      //  height: 20px;
      //  border-radius: 10px;
      //  background: royalblue;
      //  border: white 8px solid;
      //}

      // width: 1492px;
    }

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
      // background:red;
      width: 100%;
      //width: 1492px;
    }
    .form_pg {
      height: 40px;
      margin-top: 24px;
      margin-right: 0;
    }
  }
}
</style>