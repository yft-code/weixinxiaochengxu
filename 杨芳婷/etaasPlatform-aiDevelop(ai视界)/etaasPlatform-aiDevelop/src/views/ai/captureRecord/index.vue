<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
        <div class="deviceTop">
          <el-form
            :model="form"
            size="small"
            label-width="80px"
          >
            <el-row
        :gutter="10"
      >
        <!-- 搜索框组件 -->
        <template>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
          <el-form-item label="抓拍设备">
              <el-select
               style="width:100%"
                v-model="deviceName"
                multiple
                collapse-tags
                placeholder="请选择">
                <el-option
                  v-for="item in deviceNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
          <el-form-item label="识别结果">
               <el-select  v-model="form.result" placeholder="请选择" style="width:100%"
               :popper-append-to-body="false">
                 <el-option
                  v-for="item in faceList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
              
            </el-form-item>
        </el-col>
          <el-col  
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6">
               <el-form-item label="姓名" label-width="60px"  class="sm-width">
              <el-input placeholder="请输入" v-model="form.name"></el-input>
            </el-form-item>
          </el-col> 
          <el-col
           :sm="12"
           :md="12"
            :lg="8"
            :xl="8"
          >
       <el-form-item label="查询时间">    
            <el-date-picker
              @change="change"
              style="width:100%"
              :append-to-body="false"
              popper-class="pickerPopper"
              v-model="time"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            
            </el-form-item>
          </el-col>
         <el-col 
            :sm="12"
            :md="12"
            :lg="16"
            :xl="16">
             <el-form-item style="float:right;margin-right:0px;">
      <el-button @click="handleCheck" type="primary" size="small"
                >搜索</el-button
              >
              <el-button @click="handleReset" size="small">清空</el-button>
        </el-form-item>
          </el-col>
        </template>
      </el-row>   
    </el-form>
        <div class="clear"></div>
        <div class="deviceTable" v-loading="loading">
          <div v-if="list.length === 0" class="noData">暂无数据</div>
           <div class="captureLi" v-for="(item,index) in list" :key="index" @click="captureClick(item)">
             <img :src="item.captureImg" class="captureImg"/>
             <div class="captureDetail">
               <div  class="captureDetailTitle">
               <img src="@/assets/img/ai/captureRecord/people.png" class="captureDetailImg"/>
               </div>
               <!-- <div class="captureDetailTitle">识别结果</div> -->
               <div class="captureDetailContent" :class="[item.name ? '' : 'unknown']">{{item.name ? item.name : '未识别'}}</div>
               <div class="clear"></div>
                <div  class="captureDetailTitle">
               <img src="@/assets/img/ai/captureRecord/ai.png" class="captureDetailImg"/>
               </div>
               <!-- <div class="captureDetailTitle">抓拍地点</div> -->
               <div class="captureDetailContent listAnother" >{{item.deviceName}}</div>
               <div class="clear"></div> 
                <div  class="captureDetailTitle">
               <img src="@/assets/img/ai/captureRecord/time.png" class="captureDetailImg"/>
               </div>
               <!-- <div class="captureDetailTitle">抓拍时间</div> -->
               <div class="captureDetailContent listAnother">{{item.time}}</div>
               <div class="clear"></div>
              </div>
             
       
           </div>
        </div>
        <div class="form_pg">
          <el-pagination
            style="float: right"
            background
            align="center"
            :current-page="currentPage"
            :page-sizes="[24, 32, 40]"
            :page-size="pageSize"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
        </div>
      </div>
    </div>
       <el-dialog
       width="60%"
      :visible.sync="visible"
      :before-close="handleClose"
    >
    <div slot="title" class="captureBorder">
      抓拍详情
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="captureTab">
        <el-tab-pane label="识别信息" name="first">
          <div class="captureDialogDetail">
            <div class="dialogDetailLi dialogDetailLiBorder">
               <div class="dialogDetailLiTitle">抓拍图</div>
                <div class="captureDialogImg">
                <img :src="detaliInfo.captureImg"  class="captureDialogImgs"/>
                 <el-button size="mini" @click="captureImg" style="margin-left:20px">抓拍原图</el-button>
                <div class="dialogDetailMessage">
                  <div class="dialogDetailMessageLi">
                    <span class="dialogDetailMessageTitle">抓拍地点</span>
                    <span>{{detaliInfo.deviceName}}</span>
                  </div>
                  <div class="dialogDetailMessageLi">
                    <span  class="dialogDetailMessageTitle">抓拍时间</span>
                    <span>{{detaliInfo.time}}</span>
                  </div>
                </div>
                </div>
               <!-- <div class="changeCapture">
                   <div>
                   <el-button size="mini" @click="captureImg">抓拍原图</el-button>
                  </div>
                
                </div> -->
            </div>
            <div class="dialogDetailLi">
               <div class="dialogDetailLiTitle">识别结果</div>
                <div class="dialogDetailResult" v-if="!detaliInfo.personId">

                   <img :src="detaliInfo.captureImg" class="resultImg"/>
                   <div class="dialogDetailMessage">
                   <div class="dialogDetailMessageLi">
                    <span class="dialogDetailMessageTitle">识别人员</span>
                    <span class="unknown">未识别</span>
                  </div> 
                   </div>
                </div>
               <div class="dialogDetailResult" v-if="detaliInfo.personId">
   
                 <img :src="detaliInfo.faceImg" class="resultImg" />
            
                <div class="dialogDetailMessage">
                  <div class="dialogDetailMessageLi">
                    <span class="dialogDetailMessageTitle">脸库人员</span>
                    <span>{{detaliInfo.name}}</span>
                  </div>
                  <div class="dialogDetailMessageLi">
                    <span  class="dialogDetailMessageTitle">所属脸库</span>
                    <span>{{detaliInfo.faceDbName}}</span>
                  </div>
                  <div class="dialogDetailMessageLi">
                    <span  class="dialogDetailMessageTitle">人员编号</span>
                    <span>{{detaliInfo.personId}}</span>
                  </div>
                </div>
               </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="人员轨迹" name="second">
            <el-form
            :model="peopleForm"
            :inline="true"
            size="mini"
            class="peopleRoad"
            label-width="80px"
          >
          
            <el-form-item label="查询时间">
              <el-date-picker
              style="width:100%"
              :append-to-body="false"
              popper-class="pickerPopper"
              v-model="peopleTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTime"
            >
            </el-date-picker>
            </el-form-item>
         
            <el-form-item label="相似度">
             <el-select
               style="width:100%"
                v-model="peopleForm.similarity"
                placeholder="请选择">
                <el-option
                  v-for="item in similarityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item  class="captureSearch">
             <el-button @click="handleCheckPeople" type="primary" size="mini"
                >搜索</el-button
              >
              <el-button @click="handleResetPeople" size="mini">清空</el-button>
            </el-form-item>
          </el-form>
            <div class="captureDialogDetail">
            <div class="dialogDetailLi dialogDetailLiBorder">
               <div class="dialogDetailLiTitle">抓拍图</div>
               <div class="dialogDetailResult"   v-if="!detaliInfo.personId">
                 <img :src="detaliInfo.captureImg" class="resultImg"/>
                 <div class="dialogDetailMessage">  
                   <div class="dialogDetailMessageLi">
                    <span class="dialogDetailMessageTitle">识别人员</span>
                    <span class="unknown">未识别</span>
                  </div> 
                 </div>
               </div>
                <div class="dialogDetailResult"  v-if="detaliInfo.personId">
                 <img :src="detaliInfo.faceImg" class="resultImg"/>
          
                <div class="dialogDetailMessage"  >
                  <div class="dialogDetailMessageLi">
                    <span class="dialogDetailMessageTitle">脸库人员</span>
                    <span>{{detaliInfo.name}}</span>
                  </div>
                  <div class="dialogDetailMessageLi">
                    <span  class="dialogDetailMessageTitle">所属脸库</span>
                    <span>{{detaliInfo.faceDbName}}</span>
                  </div>
                  <div class="dialogDetailMessageLi">
                    <span  class="dialogDetailMessageTitle">人员编号</span>
                    <span>{{detaliInfo.personId}}</span>
                  </div>
                </div>
               </div>
            </div>
            <div class="dialogDetailLi" >
               <div class="dialogDetailLiTitle">查询结果</div>
               <div class="resultSecondNoData" v-if="traceInfo.length === 0" v-loading="traceInfoLoading"> {{noDataInfo}} </div>
               <div class="resultSecond" v-for="(item,index) in traceInfo" :key="index" v-loading="traceInfoLoading">
                 <div class="resultSecondLeft">
                 <img src="@/assets/img/ai/dian.svg" class="resultSecondImg">
                 <div class="resultSecondBorder"></div>
                 </div>
                 <div class="resultSecondCenter">
                    <img :src="item.captureImg" class="resultSecondCenterImg"/>
                 </div>
                 <div class="resultSecondRight">
                  <div class="resultSecondRightLi">
                    <span class="resultSecondRightColor">相似度</span>
                    <span class="resultSecondRightColors">{{item.similarityValue}}%</span>
                  </div>
                  <div class="resultSecondRightLi">{{item.deviceName}}</div>
                  <div class="resultSecondRightLi">{{item.time}}</div>
                 </div>
                 <div class="clear"></div>
               </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="录像回放" name="third">
          <div class="capptureVideoTime" v-if="videoInfo.time">录像时间:&nbsp;&nbsp;&nbsp;{{videoInfo.time}}</div>
          <div class="capptureVideo">
            <video :src="videoInfo.videoUrl" class="capptureVideos"
              muted
              controls
              autoplay="autoplay" v-if="videoInfo.videoUrl"/>
            <div v-if="!videoInfo.videoUrl">暂无录像</div>
          </div>
       </el-tab-pane>
    </el-tabs>
    
      
      <div slot="footer" class="dialog-footer">
       <el-button  size="mini" @click="visible = false">取消</el-button>
       <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
      </div>
    </el-dialog>
     <el-dialog
       width="400"
      :visible.sync="imgVisible"
      :before-close="imgHandleClose"
    >
    <img :src="imgUrl" class="visibleImg"/>
     </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/ai/captureRecord";
import { getfaceInfo } from "@/api/ai/algorithmManage.js";
import {
  getDeviceInfo
} from "@/api/ai/warningEvent";
export default {
  components: {

  },
  data() {
    return {
      form: {
        // startTime:'',
        // endTime:''
      },
      faceList:[],
      noDataInfo:'',
      currentSelection:{},
      peopleTime:'',
      time:'',
      traceInfoLoading:false,
      similarity:'',
      detaliInfo:{},
      traceInfo:[],
      loading:false,
      imgUrl:'',
      deviceName:'',
      deviceNameList:[],
      currentPage: 1,
      pageSize: 24,
      total: 0,
      peopleForm:{},
      visible:false,
      imgVisible:false,
      activeName:'first',
      list:[],
      videoInfo:{},
      similarityList:[
        {
          value:'high',
          label:'高'
        },
        {
          value:'mid',
          label:'中'
        },
        {
          value:'low',
          label:'低'
        }
      ]   
    };
  },
  created() {
    this.fetchData();
    this.getDevice();
    this.initData();
  },
  methods: {
    getRecordEvent(row){
      let params={
        id:row.id
      }
       api.getRecord(params).then(res=>{
         if(res.result){
           this.videoInfo = res.result;
          
         }else{
           this.videoInfo = {}
         }
       })
    },
    initData(){
     getfaceInfo()
        .then((res) => {
          if(res.result){
            let arr = []
            this.faceList = res.result;
            this.faceList.map(element=>{
              arr.push({
                name:element.name,
                value:element.name
              })
              
            })
            this.faceList = arr
            this.faceList.unshift({
               name:'全部',
               value:''
            },{
              name:'未识别',
              value:'未识别'
            })
          }
           
        })
        .catch();
    },
    captureImg(){
      this.imgVisible = true;
      this.imgUrl = this.detaliInfo.originImg;
    },
     // 时间处理
    change(e) {
      if (e) {
        this.form.startTime = e[0];
        this.form.endTime = e[1];
      } else {
        this.form.startTime = "";
        this.form.endTime = "";
      }
    },
    changeTime(e){
      if (e) {
        this.peopleForm.startTime = e[0];
        this.peopleForm.endTime = e[1];
      } else {
        this.peopleForm.startTime = "";
        this.peopleForm.endTime = "";
      }
    },
    handleClose() {
      this.visible = false
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    handleClick(tab,event){

    },
    //获取设备名称
    getDevice() {
      getDeviceInfo()
        .then((res) => {
          if (res.code === 0) {
            let arr = []
            res.result.map(element=>{
              if(element !== '全部'){
                arr.push({value: element,label:element})
              }else{
                arr.push({value: '',label:element})
              }
              
            })
            this.deviceNameList = arr;
          }
        })
        .catch();
    },
    // 获取数据
    fetchData() {
      let deviceName = '';
      if(this.deviceName.length !== 0){
        deviceName = this.deviceName.join(',')
      }
      this.loading = true;
      this.form.current = this.currentPage;
      this.form.size = this.pageSize;
      this.form.deviceName = deviceName;
      api.getfaceList(this.form).then((res) => {
        this.loading = false
        if(res.result && res.result.list){
          this.list = res.result.list;
          this.total = res.result.total;
        }
      }).catch(()=>{
        this.loading = false
      })
    },
    handleCheck(){
      this.fetchData();
    },
    handleReset(){
        this.form = {
          startTime:'',
          endTime:''
        }
        this.deviceName = ""
        this.time = ''
        this.fetchData()
    },
    captureClick(item){
      this.visible = true;
       this.peopleForm = {

      };
        this.peopleTime = "";
        this.traceInfoLoading = false;
        this.noDataInfo=""
        this.traceInfo = [];
      let param={
        id: item.id
      }
      this.getRecordEvent(item);
      this.currentSelection = item;
      api.getFaceDetailInfo(param).then((res)=>{
        if(res.result){
          this.detaliInfo = res.result;
        }
      })
   
      
    },
    handleCheckPeople(){
      if(this.peopleForm.startTime&&this.peopleForm.endTime && this.peopleForm.similarity){
         let params={
            id: this.currentSelection.id,
            similarity:this.peopleForm.similarity,
            startTime:this.peopleForm.startTime,
            endTime:this.peopleForm.endTime
          }
          this.traceInfoLoading = true;
          api.getTrace(params).then((res)=>{
            if(res.result){
              this.traceInfo = res.result;
              this.noDataInfo="暂无查询结果"
              this.traceInfoLoading = false;
              this.traceInfo.map(element=>{
                element.similarityValue = element.similarity * 100;
                element.similarityValue = element.similarityValue.toFixed(2)
              })
            }
          })
      }else{
       this.$message({
         message: "查询时间,相似度必须输入!",
         type: "error",
        });
      }
     

    },
    handleResetPeople(){
        this.peopleForm = {

        };
        this.peopleTime = "";
        this.traceInfo = [];
    },
    imgHandleClose(){
      this.imgVisible = false;
   }
  },
};
</script>
<style lang="scss" scoped>
.visibleImg{
    width: 100%;
    max-height: 500px;
    margin:0 auto;
    display:block;
    margin-top:16px;
    margin-bottom:32px;
  }
  .captureDialogImgs{
    width:180px;
    height:180PX;
  }
.deviceContainer {
  width: 100%;
  
  .deviceContent {
    width: 97%;
    margin: 24px auto;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
  }
  /deep/.el-button.is-disabled,
  .el-button.is-disabled:focus,
  .el-button.is-disabled:hover {
    color: #a0cfff;
    cursor: not-allowed;
  }
  .content {
    width: 95%;
    margin: 0 auto;
    padding-top: 24px;
    //background: #0E6DB7;
  }
  .deviceTop {
    border-bottom: 1px solid rgba(10, 25, 51, 0.05);
    padding-bottom: 24px;
  }
  .deviceCenter {
    height: 40px;
    margin-bottom: 16px;
    //background: #0A1933;
  }
  .deviceTable {
    width: 100%;
    display: flex;
    font-size: 16PX;
    flex-wrap: wrap;
  }
}
.captureLi{
  width:calc(100%/8);
  padding:12px 12px;
}
@media (min-width: 1480px) and (max-width: 1720px) {
.captureLi{
   width:calc(100%/7) !important;
  padding:12px 12px;
}

}
@media (min-width: 1180px) and (max-width: 1480px) {
.captureLi{
   width:calc(100%/6) !important;
  padding:12px 12px;
}

}
@media screen and (max-width: 1180px) {
.captureLi{
   width:calc(100%/5) !important;
  padding:12px 12px;
}

}
.clear{
  clear:both;
}
.captureImg{
  display: block;
  width:100%;
  height:150PX;
}
.captureDetail{
  background: rgba(52,127,255,0.03);
  font-size:13PX;
  padding:2px 8px;
  cursor: pointer;
}
.captureDetail:hover{
  background: rgba(52,127,255,0.08);

}
.captureDetail:focus{
  background: rgba(52,127,255,0.08);

}
.captureDetailImg{

  width:14px;
  margin:0 auto;
}
.captureDetailTitle{
  float:left;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #0A1933;
  line-height: 28PX;
  opacity: 0.64;
  width:24px;
}
.captureDetailContent{
  float:left;
  color: #347FFF;
  line-height: 28PX;
  overflow: hidden;
  text-overflow:ellipsis;
  width:calc(100% - 24px);
  white-space: nowrap; 
}
.listAnother{
  color:#0A1933;
}
.captureBorder{
  margin-top:8PX;
  border-bottom:1px solid rgba(10,25,51,0.05);
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  padding-bottom:32px;
  color:#0A1933;
  font-size: 24px;
  font-weight: 500;
}
.captureTab{
  margin-top:-20px;
}
.captureDialogDetail{
  border: 1px solid rgba(10,25,51,0.05);
  width:100%;
  display: flex;
  flex-wrap: wrap;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  padding-bottom:24px;
}
.dialogDetailLi{
  flex:1;
  max-height: 500PX;
  overflow: auto;
}
.dialogDetailLiTitle{
  font-size: 16PX;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  line-height: 40px;
   border-bottom: 1px solid rgba(10,25,51,0.05);
   width:calc(100% - 48px);
   margin:0 auto;
}
.captureDialogImg{
  float:left;
  width:300px;
  margin-top:24px;
  margin-left:80px;
}
.changeCapture{
  margin-left:16px;
  margin-top: 80px;
  float:left;
}
.nextImg{
  margin-top:20px;
}
.dialogDetailLiBorder{
  border-right: 1px solid rgba(10,25,51,0.05);
}
.dialogDetailMessage{
  margin-top:12px;
  margin-bottom:18px;
}
.dialogDetailMessageLi{
  color:#0A1933;
  line-height: 28px;
  font-size: 16px;
}
.dialogDetailMessageTitle{
   opacity: 0.64;
   margin-right:8px;
}
.dialogDetailResult{ 
  width:300px;
  padding-top:24px;
  text-align: left;
  margin:0 auto;
}
.resultImg{
  width:60%;
  display: block;
  height:180PX;
}
.capptureVideoTime{
  color: #0A1933;
  font-size: 12PX;
}
.capptureVideo{
  margin-top:16px;
}
.resultSecond{
  width:80%;
  margin:0 auto;
  padding:24px 0px;
}
.resultSecondNoData{
   width:80%;
   margin:0 auto;
   padding:24px 0px;
   text-align: center;
   font-size: 20px;
}
.resultSecondLeft{
  float:left;
}
.resultSecondCenter{
  float:left;
  padding: 32px 0px 0px 16px
}
.resultSecondRight{
  float:left;
  padding: 42px 0px 0px 16px
}
.resultSecondImg{
  width:20px;
}
.resultSecondBorder{
  width: 1px;
  height: 150px;
  background: rgba(10,25,51,0.0500);
  margin:0 auto;
  
}
.resultSecondCenterImg{
   width:120px;
   display:block;
   
}
.resultSecondRightLi{
  line-height: 30px;
  color: #0A1933
}
.resultSecondRightColor{
  opacity: 0.64;
}
.resultSecondRightColors{
  color:#347FFF;
  margin-left:8px;
}
.form_pg {
  height: 45px;
  margin-top: 24px;
  padding-bottom: 24px;
  margin-right: 0;
}
.captureSearch{
   margin-bottom:16px;
   margin-left:16px;
  // float:right
}
.noData{
  text-align: center;
  margin:0 auto;
  font-weight: 500;
  line-height: 100px;
}
.capptureVideos{
  width:100%;
}
 @media (min-width: 1260px) and (max-width: 1520px) {
    .captureSearch{
      float:right
    }
 }
 .unknown{
   color:#FF3A3A;
 }
   @media screen and (max-width: 768px) {
  .sm-width {
   /deep/.el-form-item__label {
    width:80PX !important;
    }
  /deep/.el-form-item__content{
   margin-left: 80PX !important;
   }
  }
}
</style>
<style >
.deviceContainer .peopleRoad .el-form-item__label {
  font-size: 14PX !important;
}
</style>
