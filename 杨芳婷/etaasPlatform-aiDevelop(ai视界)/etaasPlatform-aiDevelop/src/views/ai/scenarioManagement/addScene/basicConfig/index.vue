<template>
  <div>
    <div class="btn1">
      <!-- <el-button @click="test">获取相交</el-button> -->
      <el-button
        size="small"
        @click="addArea"
        :disabled="disabled"
        class="addAreaButton"
        >新增区域</el-button
      >
      <el-button type="primary" size="small" @click="captureRefresh"
        >抓图</el-button
      >
    </div>
    <div class="content" v-loading="loading">
      <div v-show="!showRect" id="map" ref="map">
        </div>
      <div v-show="showRect" class="rectContainer">
        <div style="position:relative;width:100%;height: 100%;">
          <img :src="srcUrl" style="position:absolute;left:0;top:0"  width="100%" height="100%" alt=""/>
          <vdr class="test"
             v-if="rectArr.length>0"
             :w="width"
             :h="height" 
             :x="x"
             :y="y"
             @dragstop = "dragstop"
             @activated = "activated"
             v-on:dragging="onDrag" 
             v-on:resizing="onResize"
             :parent="true">
           </vdr>
           <vdr class="testOne"
             v-if="rectArrOne.length>0"
             :w="widthOne"
             :h="heightOne" 
             :x="xOne"
             :y="yOne"
             @dragstop = "dragstops"
             @activated = "activateds"
             v-on:dragging="onDrags" 
             v-on:resizing="onResizes"
             :parent="true">
               
           </vdr>
        </div>
      </div>
    </div>
    <div>
      <div style="display: flex">
        <el-form
          label-width="120px"
          style="margin-top: 15px"
          :rules="rulesTemplate"
          :model="formTemplateList"
          ref="formTemplateList"
          class="demo-form-inline"
          size="mini"
        >
        <div v-if="algName !== 'belt'">
            <el-form-item label="预警名称" prop="warningName">
              <el-select
                v-model="formTemplateList.warningName"
                placeholder="请选择预警名称"
                @change="handleChange"
              >
                <el-option
                  v-for="item in warningList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="算法运行时间" prop="activeTemplate">
              <el-select
                v-model="formTemplateList.activeTemplate"
                placeholder="请选择时间模板"
                @change="handleChangeActiveTemplateList"
              >
                <el-option
                  v-for="item in activeTemplateList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="algName === 'belt'||algName==='person_sleep'">
               <el-button type="primary"  @click="check">查看实时状态</el-button>
            </el-form-item>
          </div>
        </el-form>

        <div
          style="
            display: inline-block;
            height: 33px;
            margin-top: 15px;
            margin-left: 10px;
            line-height: 33px;
            letter-spacing: 3px;
            color: #bcc1c8;
            font-size: 12px;
          "
        >
          {{ this.content }}
        </div>
      </div>

      <div class="object" v-if="algName !== 'belt'">
        <span class="title">通知对象</span>
        <div
          class="tag"
          v-for="tag in dynamicTags"
          :key="tag.id"
          @mouseenter="imgMouseenter(tag)"
          @mouseleave="imgMouseleave(tag)"
        >
          {{ tag.name }}
          <img
            src="@/assets/img/ai/closeTag.svg"
            class="closeImg"
            v-if="tag.imgShow"
            @click="handleClose(tag)"
          />
        </div>
        <el-button size="small" @click="addObject" class="addObjectButton"
          >添加</el-button
        >
        <div class="clear"></div>
      </div>
    </div>

    <addObject
      :tableDataFlag2="tableData2"
      :editObject="editObject"
      :removeIndex2="removeIndex2"
      :visible="showAddObject"
      @close-callback3="closeCallback3"
      :dynamicTags="dynamicTags"
    />
    <div class="dialog-body">
      <el-dialog
      title="实时状态"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="closeDialog">
     <div style="max-height:300px;overflow: auto;">
    <div v-if="webscoketArr.length>0">
      <div v-for="(item,index) in webscoketArr" :key="index">
      <div v-if="algName === 'belt'">
        <p style="padding-top:3px;font-size: 14px;">
          {{item.time}} &nbsp;&nbsp;&nbsp;状态：
          {{item.moving&&item.moving?'运行':'关闭'}}
          &nbsp;&nbsp;&nbsp;区域编号：{{item.equieid}}
        </p>
      </div>
       <div v-if="algName === 'person_sleep'">
        <p style="padding-top:3px;font-size: 14px;">
          {{item.time}}
        </p>
      </div>
    </div>
    </div>
   
    <div v-else>
      <div style="width:30%;margin:10px auto;font-size: 16px;">
        暂无最新数据
      </div>
    </div>
  </div>
</el-dialog>
    </div>
    <!-- <div class="bottom">
        <el-button type="primary" class="btn"  size="small"
            @click="save"
            >保存</el-button
        >
    </div> -->
  </div>
</template>

<script>
import vdr from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import * as math from 'mathjs'
import addObject from "../addObject/index.vue";
import {
  getDeviceVideoPic,
  warningList,
  getListActiveTemplate,
  deviceControlAlg,
  userPageList,
  getAlgorithm
} from "@/api/ai/newScenarioManagement.js";
import Konva from "konva";
export default {
  components: { addObject,vdr },
  props: {
    deviceId: {
      type: String,
      default: "",
    },
    algLists:{},
    objectArr: {
      type: Array,
      default: "",
    },
    warningId: {
      type: String,
      default: "",
    },
    timeTemplateId: {
      type: String,
      default: "",
    },
    pointArea: {
      type: String,
      default: "",
    },
    algId: {
      type: String,
      default: "",
    },
    // id: {
    //   type: String,
    //   default: "",
    // },
    item: {},
  },
  watch: {
    objectArr: {
      handler(newVal, oldVal) {
        this.dynamicTags = [];
        for (let i = 0; i < this.objectTableData.length; i++) {
          for (let j = 0; j < this.objectArr.length; j++) {
            if (this.objectArr[j] === this.objectTableData[i].id) {
              this.dynamicTags.push({
                name: this.objectTableData[i].name,
                id: this.objectTableData[i].id,
                email: this.objectTableData[i].email,
                phone: this.objectTableData[i].phone,
                status: this.objectTableData[i].status,
                password:this.objectTableData[i].password,
                imgShow: false,
              });
            }
          }
        }
        this.dynamicTags = this.deWeightThree(this.dynamicTags, "id");
        this.$forceUpdate(); // 强制刷新
      },
      immediate: true,
      deep: true,
    },
    warningId: {
      handler(newVal, oldVal) {
        this.formTemplateList.warningName = newVal;
        this.$forceUpdate(); // 强制刷新
      },
      immediate: true,
      deep: true,
    },
    algId: {
      handler(newVal, oldVal) {
        this.myAlgId = newVal;
        this.$forceUpdate(); // 强制刷新
      },
      immediate: true,
      deep: true,
    },
    timeTemplateId: {
      handler(newVal, oldVal) {
        this.formTemplateList.activeTemplate = this.timeTemplateId;
        this.$forceUpdate(); // 强制刷新
      },
      immediate: true,
      deep: true,
    },
    pointArea: {
      handler(newVal, oldVal) {
        this.$forceUpdate(); // 强制刷新
      },
      immediate: true,
      deep: true,
    },
    item: {
      handler(newVal, oldVal) {
         this.items=newVal
        this.algLists &&
          this.algLists.map((item) => {
              if (newVal.algId === item.id) {
                this.algName = item.code;
                return;
              }
            });
        if(this.$store.state.areaRemark){
          if(this.algName === 'belt'){
          this.showRect=true
          if (this.$store.state.isRemark&&this.$store.state.refreshMrak){
              this.captureRect();
            }else{
              // this.editchangehPic()
            }
         }else{
          this.showRect=false
           this.polygonPoint = [];
            if (this.$store.state.isRemark&&this.$store.state.refreshMrak){
              this.capture();
            }else{
              this.editchangehPic()
            }
          }
        this.id = newVal.id;
        this.$forceUpdate(); //强制刷新
        this.formTemplateList.warningName = newVal.warningId;
        this.formTemplateList.activeTemplate = newVal.timeTemplateId;
        //this.$refs.formTemplateList&& this.$refs.formTemplateList.resetFields();
        }
      },
      immediate: true,
      deep: true,
    },
    deviceId: {
      handler(newVal, oldVal) {
        this.$forceUpdate(); // 强制刷新
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      showNewRect:false,
      deleteMarkRect:false,
      deleteMarkRectOne:false,
      algorithmList:[],
      srcUrl:'',
      algName:"",
      showRect:false,
      // 矩形的点位坐标
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      // 矩形的点位坐标2
      widthOne:0,
      heightOne:0,
      xOne:0,
      yOne:0,
      rectArrOne:[],
      dialogVisible:false,
      // 监控按钮webscoket
      webscoketArr:[],
      // 矩形数据
      rectArr:[],
      items:{},
      id:'',
      removeMark:false,
      saveMark:false,
      // 存储图形交叉
      lineIntersect:[],
      deleteMark:false,
      saveLoading:false,
      freshRemark: true,
      disabled: false,
      loading: false,
      // 记录点击事件
      clickNum: 1,
      colorMark: true,
      // 存储临时的点位坐标
      polygonPoint: [],
      imgRemark: null,
      // 删除时存储当前的id
      imgIds: [],
      // 获取拖动时的图形id
      imgId: "",
      imgShow: false,
      objectTableData: [],
      objectId: [],
      importantId: "",
      imageUrl: "",
      myAlgId: this.algId,
      arr: [
        { evt: { offsetX: 177, offsetY: 64 } },
        { evt: { offsetX: 235, offsetY: 65 } },
        { evt: { offsetX: 249, offsetY: 108 } },
        { evt: { offsetX: 236, offsetY: 150 } },
        { evt: { offsetX: 176, offsetY: 146 } },
        { evt: { offsetX: 160, offsetY: 105 } },
      ],
      content: "",
      stage: null,
      layer: null,
      shape: null,
      image: { src: require("@/assets/img/ai/event.jpg") },
      tools: [
        { id: 1, nameEN: "rect", nameCN: "矩形" },
        { id: 2, nameEN: "poly", nameCN: "多边形" },
      ],
      currentTool: "",
      drawing: false, //一开始不能绘画
      currentDrawingShape: null, //现在绘画的图形
      pointStart: [], //记录鼠标按下的起始坐标
      polygonPoints: [], //存储绘画多边形各个顶点的数组
      tableData2: {},
      editObject: {},
      removeIndex2: "",
      showAddObject: false,
      rules1: {},
      formList: {},
      warningList: [],
      rulesTemplate: {
        warningName: [
          { required: true, message: "请选择预警名称", trigger: "change" },
        ],
        activeTemplate: [
          { required: true, message: "请选择时间模板", trigger: "change" },
        ],
      },
      formTemplateList: {
        warningName: "",
        activeTemplate: "",
      },
      activeTemplateList: [],
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  created() {
    this.$bus.$on('getFirstData',(item)=>{
      this.item=item
      this.items=item
      if(this.algName === 'belt'){
        this.captureRect();
      }else{
        this.capture()
      }
      // this.getUserPageList();
    })
    this.getUserPageList();
    warningList().then((res) => {
      this.warningList = res.result;
    });
    getListActiveTemplate().then((res) => {
      this.activeTemplateList = res.result;
    });
    this.formTemplateList.warningName = this.warningId;
    this.formTemplateList.activeTemplate = this.timeTemplateId;
    this.myAlgId = this.algId;
  },
  beforeDestroy() {
    this.$bus.$off("basicValidSuccess");
    this.$bus.$off("basicValid");
    this.$bus.$off("getFirstData")
  },
  mounted() {
    window.addEventListener("setItemEvent", this.showWarningEvent);
    this.$bus.$on("basicValidSuccess", () => {
      this.validSuccess();
    });
    // this.fetchData();
    // this.capture()
    let _this = this;
    document.onkeydown = function (e) {
      let key = window.event ? e.keyCode : e.which;
     if ((key == 46||key==8)&&_this.deleteMark&&_this.$store.state.isRemark&&_this.$store.state.refreshMrak) {
        if (_this.imgRemark) {
          _this.imgRemark &&
            _this.imgRemark.children &&
            _this.imgRemark.children.map((item) => {
              _this.imgRemark.move(item.absolutePosition());
            });
          if (_this.imgRemark.children[0].attrs.fill === "red") {
            _this.clickNum = 1;
          } else {
            _this.clickNum = 0;
          }
          _this.imgRemark = null;
          _this.$message.success("删除当前图形成功");
          _this.polygonPoint.splice(
            _this.polygonPoint.findIndex((item) => item.id === _this.imgId),
            1
          );
           _this.lineIntersect.splice(
            _this.lineIntersect.findIndex((item) => item.id === _this.imgId),
            1
          );
          if (_this.polygonPoint.length <= 0) {
            _this.clickNum = 1;
          }
        } else {
          _this.$message.warning("请鼠标选择当前要删除的图形");
        }
      }
      if ((key == 46||key==8)&&_this.$store.state.isRemark&&_this.$store.state.refreshMrak) {
        if(_this.deleteMarkRect){
          _this.x=0
           _this.y=0
           _this.width=0
           _this.height=0
           _this.rectArr=[]
           _this.$message.success("删除当前图形成功");
        }
        if(_this.deleteMarkRectOne){
          _this.xOne=0
           _this.yOne=0
           _this.widthOne=0
           _this.heightOne=0
           _this.rectArrOne=[]
           _this.$message.success("删除当前图形成功");
        }

          
      }
    }
  },
  methods: {
    onResize(x, y, width, height) {
      Number(x)
      Number(y)
      Number(width)
      Number(height)
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    
    },
    activated(){
      this.deleteMarkRect=true
      this.deleteMarkRectOne=false
    },
    onDrag(x, y) {
      Number(x)
      Number(y)
      this.x = x
      this.y = y
    },
    dragstop(){

    },
    onResizes(x, y, width, height) {
      Number(x)
      Number(y)
      Number(width)
      Number(height)
      this.xOne = x
      this.yOne = y
      this.widthOne = width
      this.heightOne = height
    },
    activateds(){
      this.deleteMarkRect=false
      this.deleteMarkRectOne=true
    },
    onDrags(x, y) {
      Number(x)
      Number(y)
      this.xOne = x
      this.yOne = y
    },
    dragstops(){

    },
    closeDialog(){
      this.dialogVisible=false
    },
    check(){
      this.webscoketArr=[]
      this.dialogVisible=true
    },
     // 预警事件webScoket
     showWarningEvent(e) {
      const newValue = JSON.parse(e.newValue);
      if(newValue.dateTime&& newValue.equieid && (newValue.cameraid === this.deviceId)){
        this.webscoketArr.push({
        time:newValue.dateTime&&newValue.dateTime,
        moving:newValue.moving&&newValue.moving,
        equieid:newValue.equieid&&newValue.equieid
      })
      }

      if(newValue.personSize&& (newValue.cameraid === this.deviceId)){
        this.webscoketArr.push({
        time:newValue.personSize&&newValue.personSize,
      })
      }
      
    },
    printFn(value) {
    const precision = 20
    return Number(math.format(value, precision))
},
     equalToZero(x){
          if(x===0){
            return true
          }
     },
    vectorProduct(x1,y1,x2,y2) {
        return this.printFn(this.printFn(x1*y2)-this.printFn(x2*y1));
    },
    twoLineVectorJudge(x1,y1,x2,y2,a1,b1,a2,b2) {
        if (Math.max(x1,x2) < Math.min(a1,a2) || Math.max(y1,y2) < Math.min(b1,b2) ||
            Math.max(a1,a2) < Math.min(x1,x2) || Math.max(b1,b2) < Math.min(y1,y2)) {
            return false;
        }
        let vectorProduct1 = this.vectorProduct(this.printFn(x1-a1),this.printFn(y1-b1),this.printFn(x2-a1),this.printFn(y2-b1)) * this.vectorProduct(this.printFn(x1-a2),this.printFn(y1-b2),this.printFn(x2-a2),this.printFn(y2-b2));
        let vertorProduct2 = this.vectorProduct(this.printFn(a1-x1),this.printFn(b1-y1),this.printFn(a2-x1),this.printFn(b2-y1)) * this.vectorProduct(this.printFn(a1-x2),this.printFn(b1-y2),this.printFn(a2-x2),this.printFn(b2-y2));
        if (vectorProduct1 > 0 || this.equalToZero(vectorProduct1) ||
            vertorProduct2 > 0 || this.equalToZero(vertorProduct2)) {
            return false;
        }
        return true;
    },
    resetFrom() {
      this.$refs.formTemplateList && this.$refs.formTemplateList.resetFields();
    },
    // tab切换的时候的数据回显
       editchangehPic() {
      this.polygonPoint = [];
      if (this.item && this.item.pointArea) {
        let points = JSON.parse(this.item.pointArea);
        if (points && points.length > 0) {
          points.map((item) => {
            // 编辑回显时图形颜色判断
            if (item.points && item.points.length > 0) {
              let editAreas = [];
              let points = item.points;
              editAreas.push(
                { evt: { offsetX: this.printFn(points[0]/2.4), offsetY: this.printFn(points[1]/2.4) } },
                { evt: { offsetX: this.printFn(points[2]/2.4), offsetY: this.printFn(points[3]/2.4) } },
                { evt: { offsetX:this.printFn(points[4]/2.4), offsetY: this.printFn(points[5]/2.4) } },
                { evt: { offsetX: this.printFn(points[6]/2.4), offsetY:this.printFn(points[7]/2.4) } },
                { evt: { offsetX: this.printFn(points[8]/2.4), offsetY: this.printFn(points[9]/2.4) } },
                { evt: { offsetX: this.printFn(points[10]/2.4), offsetY: this.printFn(points[11]/2.4) } }
              );
              this.polygonPoint.push({
               color:item.color,
               x1:this.printFn(points[0]/2.4),
               x2:this.printFn(points[2]/2.4),
               x3:this.printFn(points[4]/2.4),
               x4:this.printFn(points[6]/2.4),
               x5:this.printFn(points[8]/2.4),
               x6:this.printFn(points[10]/2.4),
               y1:this.printFn(points[1]/2.4),
               y2:this.printFn(points[3]/2.4),
               y3:this.printFn(points[5]/2.4),
               y4:this.printFn(points[7]/2.4),
               y5:this.printFn(points[9]/2.4),
               y6:this.printFn(points[11]/2.4),
              })
              setTimeout(() => {
                if (item.color === "red") {
                  this.colorMark = true;
                  this.clickNum = 0;
                } else {
                  this.colorMark = false;
                  this.clickNum = 1;
                }
                // this.editArea(editAreas);
              },100);
            }
          });
        }
      }
    },
     // 编辑回显数据
     editPicRect() {
      this.rectArr=[]
      this.rectArrOne=[]
      if (this.item && this.item.pointArea) {
        let points = JSON.parse(this.item.pointArea);
        if(points&&points.length>0){
            this.x=points[0].x/2.4
            this.y=points[0].y/2.4
            this.width=points[0].width/2.4
            this.height=points[0].height/2.4
            this.rectArr.push(
            { x:this.x,
                y:this.y,
                width:this.width,
                height:this.height
            })
        if(points&&points.length>1){
            this.xOne=points[1].x/2.4
            this.yOne=points[1].y/2.4
            this.widthOne=points[1].width/2.4
            this.heightOne=points[1].height/2.4
            this.rectArrOne.push(
          {x:this.xOne,y:this.yOne,
          width:this.widthOne,height:this.heightOne
        })
        }
       }
      }
    },
    // 重新抓图时显示的rect
    editNewPicRect() {
      this.rectArr=[]
      this.rectArrOne=[]
        // this.x=this.x
        // this.y=this.y
        // this.width=this.width
        // this.height=this.height
        if(this.x!==0&&this.y!==0&&this.width!==0&&this.height!==0){
          this.rectArr.push(
          {x:this.x,y:this.y,
          width:this.width,height:this.height
        })
        }
        if(this.xOne!==0&&this.yOne!==0&&this.widthOne!==0&&this.heightOne!==0){
          this.rectArrOne.push(
          {x:this.xOne,y:this.yOne,
          width:this.widthOne,height:this.heightOne
        })
       }
    },
    // 编辑回显数据
    editPic() {
      this.polygonPoint = [];
      if (this.item && this.item.pointArea) {
        let points = JSON.parse(this.item.pointArea);
        if (points && points.length > 0) {
          points.map((item) => {
            // 编辑回显时图形颜色判断
            if (item.points && item.points.length > 0) {
              let editAreas = [];
              let points = item.points;
              editAreas.push(
                { evt: { offsetX: this.printFn(points[0]/2.4), offsetY: this.printFn(points[1]/2.4) } },
                { evt: { offsetX: this.printFn(points[2]/2.4), offsetY: this.printFn(points[3]/2.4) } },
                { evt: { offsetX:this.printFn(points[4]/2.4), offsetY: this.printFn(points[5]/2.4) } },
                { evt: { offsetX: this.printFn(points[6]/2.4), offsetY:this.printFn(points[7]/2.4) } },
                { evt: { offsetX: this.printFn(points[8]/2.4), offsetY: this.printFn(points[9]/2.4) } },
                { evt: { offsetX: this.printFn(points[10]/2.4), offsetY: this.printFn(points[11]/2.4) } }
              );
              setTimeout(() => {
                if (item.color === "red") {
                  this.colorMark = true;
                  this.clickNum = 0;
                } else {
                  this.colorMark = false;
                  this.clickNum = 1;
                }
                this.editArea(editAreas);
              }, 100);
            }
          });
        }
      }
    },
    // 编辑时回显图形
    editArea(arr) {
      // 解决选择之后又取消选中还可以删除问题
      this.imgRemark = null;
      this.currentTool = this.tools[1].nameEN;
      if (this.polygonPoint.length < 2) {
        for (var i = 0; i < arr.length; i++) {
          this.startDraw(arr[i]);
        }
      } else {
        this.$message.warning("一次最多只能添加两个图形");
      }
      //点击第一个红点，绘画多边形结束
      //绘画多边形
      this.currentDrawingShape.setAttr("points", this.polygonPoints);
      //结束绘画多边形封闭
      //  this.currentDrawingShape.setAttr('closed', true);
      this.drawing = false;
      this.polygonPoints = [];
      //隐藏所有顶点
      this.stage.find("Circle").forEach((element) => {
        element.hide();
      });
      //所有顶点变为白色
      this.stage.find("Circle").forEach((element) => {
        element.setAttrs({
          fill: "#ffffff",
        });
      });
      if (this.polygonPoint && this.polygonPoint.length < 2) {
        //把现在的绘画对象更改为点和多边形合成的组
        this.currentDrawingShape = this.currentDrawingShape.getParent();
        let points = this.currentDrawingShape.children[0].attrs.points;
        let color = this.currentDrawingShape.children[0].attrs.fill;
        this.polygonPoint.push({
          id: this.currentDrawingShape._id,
          color: color,
          x1: points[0],
          y1: points[1],
          x2: points[2],
          y2: points[3],
          x3: points[4],
          y3: points[5],
          x4: points[6],
          y4: points[7],
          x5: points[8],
          y5: points[9],
          x6: points[10],
          y6: points[11],
        });
        this.lineIntersect.push({
          id:this.currentDrawingShape._id,
          mark:true
        })
      }
    },
    //去重数组
    deWeightThree(arr, value) {
      let map = new Map();
      for (let item of arr) {
        if (!map.has(item[value])) {
          map.set(item[value], item);
        }
      }
      return [...map.values()];
    },

    imgMouseenter(item) {
      item.imgShow = true;
      this.$forceUpdate();
    },
    imgMouseleave(item) {
      item.imgShow = false;
      this.$forceUpdate();
    },
    save() {
      this.$refs.formTemplateList.validate((valid) => {
        if (valid) {
          this.$bus.$emit("basicValid");
        } else {
          this.$message.error('请完成基础配置!')
        }
      });
    },
    validSuccess() {
      this.$store.state.areaRemark=true
      if(this.lineIntersect&&this.lineIntersect.length>0){
           this.saveMark=this.lineIntersect.every((val)=>{
            if(val.mark===true){
              return true
            }
           })
      }else if(this.lineIntersect.length===0){
        this.saveMark=true
      }
      // 保存多边形的方法
      if(!this.showRect){
        if(this.saveMark){
       let pointArr = []
      this.polygonPoint &&
        this.polygonPoint.length > 0 &&
        this.polygonPoint.map((item) => {
          let points = [];
          points.push(
            this.printFn(item.x1*2.4),
            this.printFn(item.y1*2.4),
            this.printFn(item.x2*2.4),
            this.printFn(item.y2*2.4),
            this.printFn(item.x3*2.4),
            this.printFn(item.y3*2.4),
            this.printFn(item.x4*2.4),
            this.printFn(item.y4*2.4),
            this.printFn(item.x5*2.4),
            this.printFn(item.y5*2.4),
            this.printFn(item.x6*2.4),
            this.printFn(item.y6*2.4),
          );
          pointArr.push({
            color: item.color,
            points,
          });
        });
        let objectIds=[];
        this.dynamicTags &&
        this.dynamicTags.map((i) => {
          objectIds.push(i.id);
        });
        let isActive = false;
        if(this.id){
          isActive =  this.item.isActive
        }
        const param = {
          algId: this.myAlgId,
          algParam: JSON.stringify(this.$store.state.algorParameter),
          deviceId: this.deviceId,
          id: this.id,
          pointArea: JSON.stringify(pointArr),
          timeTemplateId: this.formTemplateList.activeTemplate,
          userIds: objectIds,
          warningId: this.formTemplateList.warningName,
          //当前获取的值
          isActive: isActive,
        };
        deviceControlAlg(param).then((res) => {
          this.$message.success(res.message);
          this.$emit('saveSuccess',true)
          this.$bus.$emit("getDeviceAlgById", this.deviceId);
          this.$bus.$emit("setAlgorValue", this.myAlgId);
        }) 
        .catch(() => {
           this.$emit('saveSuccess',true)
        });
      }else{
         this.$message.warning("图形线段之间不能相交,请重新绘制")
      }
      }
     
      // 保存矩形的方法
      if(this.showRect){
        let pointArr = []
        if(this.x!==0&&this.y!==0&&this.width!==0&&this.height!==0){
          pointArr.push({
          x:this.printFn(this.x*2.4),
          y:this.printFn(this.y*2.4),
          height:this.printFn(this.height*2.4),
          width:this.printFn(this.width*2.4),
        })
        }
        if(this.xOne!==0&&this.yOne!==0&&this.widthOne!==0&&this.heightOne!==0){
          pointArr.push({
          x:this.printFn(this.xOne*2.4),
          y:this.printFn(this.yOne*2.4),
          height:this.printFn(this.heightOne*2.4),
          width:this.printFn(this.widthOne*2.4),
        })
        }
        let objectIds=[];
        this.dynamicTags &&
        this.dynamicTags.map((i) => {
          objectIds.push(i.id);
        });
        let isActive = false;
        if(this.id){
          isActive =  this.item.isActive
        }
        const param = {
          algId: this.myAlgId,
          algParam: JSON.stringify(this.$store.state.algorParameter),
          deviceId: this.deviceId,
          id: this.id,
          pointArea: JSON.stringify(pointArr),
          timeTemplateId: this.formTemplateList.activeTemplate,
          userIds: objectIds,
          warningId: this.formTemplateList.warningName,
          //当前获取的值
          isActive: isActive,
        };
        deviceControlAlg(param).then((res) => {
          this.$message.success(res.message);
          this.$emit('saveSuccess',true)
          this.$bus.$emit("getDeviceAlgById", this.deviceId);
          this.$bus.$emit("setAlgorValue", this.myAlgId);
        }) 
        .catch(() => {
           this.$emit('saveSuccess',true)
        });
     }
    },

    // 切换算法时重新加载图片
    captureRefresh() {
      this.showNewRect=true
      if(!this.showRect){
     let polygonPoint=JSON.parse(JSON.stringify(this.polygonPoint))
      this.polygonPoint = [];
      this.clickNum = 1;
      this.colorMark = true;
      const param = {
        deviceId: this.deviceId,
      };
      this.loading = true;
      getDeviceVideoPic(param)
        .then((res) => {
          this.imageUrl = res.message;
          if (res.message === null) {
            this.disabled = true;
            document.getElementById("map").innerHTML = "暂无视频流图片";
          } else {
            this.initKonvaStage();
            this.disabled = false;
            polygonPoint.map((item) => {
                  let editAreas = [];
            // 编辑回显时图形颜色判断
               editAreas.push(
                { evt: { offsetX: item.x1, offsetY: item.y1 } },
                { evt: { offsetX: item.x2, offsetY: item.y2 } },
                { evt: { offsetX: item.x3, offsetY: item.y3 } },
                { evt: { offsetX: item.x4, offsetY: item.y4 } },
                { evt: { offsetX: item.x5, offsetY: item.y5 } },
                { evt: { offsetX: item.x6, offsetY: item.y6 } }
              );
              setTimeout(() => {
                if (item.color === "red") {
                  this.colorMark = true;
                  this.clickNum = 0;
                } else {
                  this.colorMark = false;
                  this.clickNum = 1;
                }
                this.editArea(editAreas);
              }, 100);
          });
          }
          this.loading = false;
        })
        .catch(() => {});
      }else{
        this.captureRect()
      }
    },
    // 矩形
    captureRect() {
      this.imageUrl=''
      this.srcUrl=''
      const param = {
        deviceId: this.deviceId,
      };
      this.loading = true;
      getDeviceVideoPic(param)
        .then((res) => {
          this.srcUrl = res.message;
          this.loading = false;
          if (res.message === null) {
            this.disabled = true;
            document.getElementById("map").innerHTML = "暂无视频流图片";
          } else {
            this.disabled = false;
            if (this.$store.state.isRemark) {
              if(this.showNewRect){
                // 重新创建时显示
               this.editNewPicRect()
              }else{
                // 编辑时回显的数据
                this.editPicRect();
              }
            }
          }
        
        })
        .catch(() => {});
    },
    //抓拍
    capture() {
      this.clickNum = 1;
      this.colorMark = true;
      const param = {
        deviceId: this.deviceId,
      };
      this.loading = true;
      getDeviceVideoPic(param)
        .then((res) => {
          this.imageUrl = res.message;
          if (res.message === null) {
            this.disabled = true;
            document.getElementById("map").innerHTML = "暂无视频流图片";
          } else {
            this.disabled = false;
            if (this.$store.state.isRemark) {
              this.initKonvaStage();
              this.editPic();
            }
          }
          this.loading = false;
        })
        .catch(() => {});
    },

    startDraw(e) {
      this.layer.draw();
      //开始初始绘画
      this.stageMousedown(this.currentTool, e);
    },
    addArea() {
      if(this.showRect){
        if(this.rectArr.length<1){
          this.x=100
          this.y=100
          this.width=100
          this.height=100
          this.rectArr.push({x:this.x,y:this.y,width:this.width,height:this.height})
        }else if(this.rectArrOne.length<1){
          this.xOne=600
          this.yOne=100
          this.widthOne=100
          this.heightOne=100
          this.rectArrOne.push({x:this.xOne,y:this.yOne,width:this.widthOne,height:this.heightOne})
        }else{
          this.$message.warning("一次最多只能添加两个图形");
        }
      }else{
      // 解决选择之后又取消选中还可以删除问题
      this.imgRemark = null;
      this.currentTool = this.tools[1].nameEN;
      if (this.polygonPoint.length < 2) {
           this.clickNum++;
        if (this.clickNum % 2 === 0) {
          this.colorMark = true;
          let arr = [
            { evt: { offsetX: 177, offsetY: 64 } },
            { evt: { offsetX: 235, offsetY: 65 } },
            { evt: { offsetX: 249, offsetY: 108 } },
            { evt: { offsetX: 236, offsetY: 150 } },
            { evt: { offsetX: 176, offsetY: 146 } },
            { evt: { offsetX: 160, offsetY: 105 } },
          ];
          for (var i = 0; i < arr.length; i++) {
            this.startDraw(arr[i]);
          }
        } else {
          this.colorMark = false;
          let arr = [
            { evt: { offsetX: 521, offsetY: 70 } },
            { evt: { offsetX: 579, offsetY: 71 } },
            { evt: { offsetX: 593, offsetY: 114 } },
            { evt: { offsetX: 580, offsetY: 156 } },
            { evt: { offsetX: 520, offsetY: 152 } },
            { evt: { offsetX: 504, offsetY: 111 } },
          ];
          for (var i = 0; i < arr.length; i++) {
            this.startDraw(arr[i]);
          }
        }
      } else {
        this.$message.warning("一次最多只能添加两个图形");
      }
      //点击第一个红点，绘画多边形结束
      //绘画多边形
      this.currentDrawingShape.setAttr("points",this.polygonPoints);
      //结束绘画多边形封闭
      //  this.currentDrawingShape.setAttr('closed', true);
      this.drawing = false;
      this.polygonPoints = [];
      //隐藏所有顶点
      this.stage.find("Circle").forEach((element) => {
        element.hide();
      });
      //所有顶点变为白色
      this.stage.find("Circle").forEach((element) => {
        element.setAttrs({
          fill: "#ffffff",
        });
      });
      if (this.polygonPoint && this.polygonPoint.length < 2) {
        //把现在的绘画对象更改为点和多边形合成的组
        this.currentDrawingShape = this.currentDrawingShape.getParent();
        let points = this.currentDrawingShape.children[0].attrs.points;
        let color = this.currentDrawingShape.children[0].attrs.fill;
        this.polygonPoint.push({
          id: this.currentDrawingShape._id,
          color: color,
          x1: points[0],
          y1: points[1],
          x2: points[2],
          y2: points[3],
          x3: points[4],
          y3: points[5],
          x4: points[6],
          y4: points[7],
          x5: points[8],
          y5: points[9],
          x6: points[10],
          y6: points[11],
        });
         this.lineIntersect.push({
          id:this.currentDrawingShape._id,
          mark:true
        })
    }
  }
    },
    initKonvaStage() {
      //1实例化stage层
      this.stage = new Konva.Stage({
        container: "map",
        width: this.$refs.map.clientWidth,
        height: this.$refs.map.clientHeight,
      });
      this.stage.container().style.cursor = "crosshair";
      //2实例化layer层
      this.layer = new Konva.Layer();
      this.imageObj = new Image();
      //imageObj的this是imagedom对象，不是vc
      var vc_this = this;
      this.imageObj.onload = function () {
        //3实例化shape层
        vc_this.shape = new Konva.Image({
          x: 0,
          y: 0,
          width: vc_this.stage.width(),
          height: vc_this.stage.height(),
          image: vc_this.imageObj,
        });
        //4将layer层添加到stage层
        vc_this.stage.add(vc_this.layer);
        // 5将shape层添加到layer层
        vc_this.layer.add(vc_this.shape);
      };
      this.imageObj.src = this.imageUrl;
      // 鼠标删除图形
      this.stage.on("mousedown", (e) => {
        this.deleteMark=true
      })
       this.stage.on("mouseleave", (e) => {
        this.deleteMark=false
      })
    },
    /**
     * 圆形
     * @param //x x坐标
     * @param //y y坐标
     */
    drawCircle(x, y) {
      const circle = new Konva.Circle({
        name: "circle",
        x: x,
        y: y,
        radius: 5,
        visible: true, //是否显示
        fill: "#ffffff",
        stroke: "#333333",
        draggable: false,
        strokeWidth: 0.5,
      });
      var vc_this = this;
      var xChange, yChange;
      this.layer.add(circle);
      this.layer.draw();
      circle.on("dragstart", (e) => {
        var polyPoints = vc_this.currentDrawingShape
          .getChildren((element) => {
            return element.getClassName() === "Line";
          })[0]
          .points();
        //查找拖拽了多边形的哪个点
        for (var i = 0; i < polyPoints.length; i += 2) {
          if (
            circle.getAttr("x") == polyPoints[i] &&
            circle.getAttr("y") == polyPoints[i + 1]
          ) {
            xChange = i;
            yChange = i + 1;
            break;
          }
        }
      });

      circle.on("dragmove", (e) => {
        //更改拖拽多边形点的位置
        var polyPoints = vc_this.currentDrawingShape
          .getChildren((element) => {
            return element.getClassName() === "Line";
          })[0]
          .points();
        /*   e.evt.offsetX - vc_this.currentDrawingShape.getAttr('x') ---> 抵消拖动组的xy影响  */
        polyPoints[xChange] =
          e.evt.offsetX - vc_this.currentDrawingShape.getAttr("x");
        polyPoints[yChange] =
          e.evt.offsetY - vc_this.currentDrawingShape.getAttr("y");
        vc_this.currentDrawingShape
          .getChildren((element) => {
            return element.getClassName() === "Line";
          })[0]
          .points(polyPoints);
      });
      return circle;
    },
    /**
     * 矩形
     * @param //x x坐标
     * @param //y y坐标
     * @param //w 宽
     * @param //h 高
     * @param //c 颜色
     * @param //sw 该值大于0-表示空心矩形（描边宽），等于0-表示实心矩形*/
    drawRect(x, y, w, h) {
      const rect = new Konva.Rect({
        name: "rectDemo",
        x: x,
        y: y,
        width: w,
        height: h,
        fill: "green",
        stroke: "green",
        strokeWidth: 1,
        opacity: 0.3,
        draggable: true,
        strokeScaleEnabled: false,
      });
      // let  rectArr=[{x:x,y:y,width:w,height:h}]
      this.rectArr.push({x:x,y:y,width:w,height:h})

      this.currentDrawingShape = rect;
      this.layer.add(rect);
      this.layer.draw();
      var vc_this = this;
     
      rect.on("mouseenter", function (e) {
        vc_this.stage.container().style.cursor = "move";
      });
      rect.on("mouseleave", function (e) {
        
        vc_this.stage.container().style.cursor = "crosshair";
      });
      rect.on("mousedown", (e) => {
   
        //如果不是正在绘画图形时，可以添加变形框
        if (!vc_this.drawing) {
          // 如果有，就移除舞台上唯一一个的transformer
          if (vc_this.stage.find("Transformer").length != 0) {
            vc_this.stage.find("Transformer")[0].destroy();
          }
          var tr = new Konva.Transformer({
            anchorCornerRadius: 5,
            rotateEnabled: false, //关闭旋转
            node: rect,
            keepRatio: false, //不等比缩放
            enabledAnchors: [
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
            ],
            borderDash: [3, 3],
          });
          vc_this.layer.add(tr);
          tr.attachTo(e.target);
          vc_this.layer.draw();
          // return;
        }
        //绘画图形时，不能被拖动
        if (vc_this.drawing) {
          rect.setAttr("draggable", false);
          // return;
        }
      });
      rect.getParent().on("dragend", (e) => {
       
      //   if (rect.getParent()._id === this.imgId) {
      //     this.polygonPoint.splice(
      //       this.polygonPoint.findIndex((item) => item.id === this.imgId),
      //       1
      //     );
      //      this.lineIntersect.splice(
      //       this.lineIntersect.findIndex((item) => item.id === this.imgId),
      //       1
      //     );
      //     // let params={
      //     //   id: this.imgId,
      //     //   color: poly.getParent().children[0].attrs.fill,
      //     //   x1: poly.getParent().children[1].absolutePosition().x,
      //     //   y1: poly.getParent().children[1].absolutePosition().y,
      //     //   x2: poly.getParent().children[2].absolutePosition().x,
      //     //   y2: poly.getParent().children[2].absolutePosition().y,
      //     //   x3: poly.getParent().children[3].absolutePosition().x,
      //     //   y3: poly.getParent().children[3].absolutePosition().y,
      //     //   x4: poly.getParent().children[4].absolutePosition().x,
      //     //   y4: poly.getParent().children[4].absolutePosition().y,
      //     //   x5: poly.getParent().children[5].absolutePosition().x,
      //     //   y5: poly.getParent().children[5].absolutePosition().y,
      //     //   x6: poly.getParent().children[6].absolutePosition().x,
      //     //   y6: poly.getParent().children[6].absolutePosition().y,
      //     // }
      //     // if((params.x1<0&&params.x2<0&&params.x3<0&&params.x4<0&&params.x5<0&&params.x6<0)
      //     // ||(params.y1<0&&params.y2<0&&params.y3<0&&params.y4<0&&params.y5<0&&params.y6<0)
      //     // ||(params.x1>800&&params.x2>800&&params.x3>800&&params.x4>800&&params.x5>800&&params.x6>800)
      //     // ||(params.y1>450&&params.y2>450&&params.y3>450&&params.y4>450&&params.y5>450&&params.y6>450)){
      //     //   if(params.color==='red'){
      //     //       this.clickNum = 1;
      //     //   }else{
      //     //       this.clickNum = 0;
      //     //   }
      //     //   this.removeMark=false
      //     // }else{
      //     //   this.removeMark=true
      //     // }
      // //  if(this.removeMark){
      // //  if(this.twoLineVectorJudge(params.x1,params.y1,
      // //     params.x6,params.y6,params.x2,params.y2,params.x3,params.y3)||
      // //     this.twoLineVectorJudge(params.x1,params.y1,
      // //     params.x6,params.y6,params.x3,params.y3,params.x4,params.y4)||
      // //      this.twoLineVectorJudge(params.x1,params.y1,
      // //     params.x6,params.y6,params.x4,params.y4,params.x5,params.y5)||
      // //      this.twoLineVectorJudge(params.x1,params.y1,
      // //     params.x2,params.y2,params.x5,params.y5,params.x6,params.y6)||
      // //      this.twoLineVectorJudge(params.x1,params.y1,
      // //     params.x2,params.y2,params.x3,params.y3,params.x4,params.y4)||
      // //      this.twoLineVectorJudge(params.x1,params.y1,
      // //     params.x2,params.y2,params.x4,params.y4,params.x5,params.y5)||
      // //     this.twoLineVectorJudge(params.x2,params.y2,
      // //     params.x3,params.y3,params.x4,params.y4,params.x5,params.y5)||
      // //      this.twoLineVectorJudge(params.x2,params.y2,
      // //     params.x3,params.y3,params.x5,params.y5,params.x6,params.y6)||
      // //     this.twoLineVectorJudge(params.x3,params.y3,
      // //     params.x4,params.y4,params.x5,params.y5,params.x6,params.y6)){
      // //       this.$message.warning("图形线段之间不能相交,请重新绘制")
      // //           this.lineIntersect.push({
      // //             id:params.id,
      // //             mark:false
      // //           })
      // //     }else{
      // //           this.lineIntersect.push({
      // //             id:params.id,
      // //             mark:true
      // //           }) 
      // //    } 
      // //    this.polygonPoint.push(params);
      // //     }
      
      //    }  
        vc_this.stage.container().style.cursor = "crosshair";
      });
    },
    /**
     *多边形
     * @param points 多边形绘画的各个顶点，类型数组
     */
    drawPloygon(points) {
      const poly = new Konva.Line({
        name: "poly",
        points: points,
        fill: this.colorMark ? "red" : "rgb(102, 255, 255)",
        stroke: this.colorMark ? "red" : "rgb(102, 255, 255)",
        strokeWidth: 1,
        draggable: false,
        opacity: 0.3,
        lineCap: "round",
        lineJoin: "round",
        closed: true,
        strokeScaleEnabled: false,
      });
      this.currentDrawingShape = poly;
      this.layer.add(poly);
      this.layer.draw();
      var vc_this = this;
      poly.on("mouseenter", (e) => {
        vc_this.stage.container().style.cursor = "move";
      });
      poly.on("mouseleave", (e) => {
        vc_this.stage.container().style.cursor = "crosshair";
      });

      poly.on("mousedown", (e) => {
  
        //如果不是正在绘画图形时，可以显示顶点
        if (!vc_this.drawing) {
          vc_this.stage.container().style.cursor = "move";
          // 获取拖动的id
          this.imgId = poly.getParent()._id;
          //设置现在绘画节点的对象为该多边形和顶点的组
          vc_this.currentDrawingShape = poly.getParent();
          let imgRemark = null;
          imgRemark = poly.getParent();
          this.imgRemark = imgRemark;
          //先隐藏全部顶点
          vc_this.stage.find("Circle").forEach((element) => {
            element.hide();
            //解绑第一个红色顶点的事件
            element.off("mousedown");
          });
          //显示现在操作多边形的原来的顶点
          vc_this.currentDrawingShape
            .getChildren((element) => {
              return element.getClassName() === "Circle";
            })
            .forEach((element) => {
              element.show();
              element.setAttr("draggable", true);
            });
          // 如果要让顶点和多边形一起拖拽，必须设置，多边形不能被拖拽
          poly.setAttr("draggable", false);
          poly.getParent().setAttr("draggable", true);
          //使所有顶点在顶层显示
          vc_this.stage.find("Circle").forEach((element) => {
            element.moveToTop();
          });
          vc_this.layer.draw();
        } else {
          //绘画时，鼠标移入多边形，设置组不可以拖动
          vc_this.stage.container().style.cursor = "crosshair";
          poly.getParent().setAttr("draggable", false);
        }
      });

      poly.getParent().on("dragend", (e) => {
        if (poly.getParent()._id === this.imgId) {
          this.polygonPoint.splice(
            this.polygonPoint.findIndex((item) => item.id === this.imgId),
            1
          );
           this.lineIntersect.splice(
            this.lineIntersect.findIndex((item) => item.id === this.imgId),
            1
          );
          let params={
            id: this.imgId,
            color: poly.getParent().children[0].attrs.fill,
            x1: poly.getParent().children[1].absolutePosition().x,
            y1: poly.getParent().children[1].absolutePosition().y,
            x2: poly.getParent().children[2].absolutePosition().x,
            y2: poly.getParent().children[2].absolutePosition().y,
            x3: poly.getParent().children[3].absolutePosition().x,
            y3: poly.getParent().children[3].absolutePosition().y,
            x4: poly.getParent().children[4].absolutePosition().x,
            y4: poly.getParent().children[4].absolutePosition().y,
            x5: poly.getParent().children[5].absolutePosition().x,
            y5: poly.getParent().children[5].absolutePosition().y,
            x6: poly.getParent().children[6].absolutePosition().x,
            y6: poly.getParent().children[6].absolutePosition().y,
          }
          if((params.x1<0&&params.x2<0&&params.x3<0&&params.x4<0&&params.x5<0&&params.x6<0)
          ||(params.y1<0&&params.y2<0&&params.y3<0&&params.y4<0&&params.y5<0&&params.y6<0)
          ||(params.x1>800&&params.x2>800&&params.x3>800&&params.x4>800&&params.x5>800&&params.x6>800)
          ||(params.y1>450&&params.y2>450&&params.y3>450&&params.y4>450&&params.y5>450&&params.y6>450)){
            if(params.color==='red'){
                this.clickNum = 1;
            }else{
                this.clickNum = 0;
            }
            this.removeMark=false
          }else{
            this.removeMark=true
          }
       if(this.removeMark){
       if(this.twoLineVectorJudge(params.x1,params.y1,
          params.x6,params.y6,params.x2,params.y2,params.x3,params.y3)||
          this.twoLineVectorJudge(params.x1,params.y1,
          params.x6,params.y6,params.x3,params.y3,params.x4,params.y4)||
           this.twoLineVectorJudge(params.x1,params.y1,
          params.x6,params.y6,params.x4,params.y4,params.x5,params.y5)||
           this.twoLineVectorJudge(params.x1,params.y1,
          params.x2,params.y2,params.x5,params.y5,params.x6,params.y6)||
           this.twoLineVectorJudge(params.x1,params.y1,
          params.x2,params.y2,params.x3,params.y3,params.x4,params.y4)||
           this.twoLineVectorJudge(params.x1,params.y1,
          params.x2,params.y2,params.x4,params.y4,params.x5,params.y5)||
          this.twoLineVectorJudge(params.x2,params.y2,
          params.x3,params.y3,params.x4,params.y4,params.x5,params.y5)||
           this.twoLineVectorJudge(params.x2,params.y2,
          params.x3,params.y3,params.x5,params.y5,params.x6,params.y6)||
          this.twoLineVectorJudge(params.x3,params.y3,
          params.x4,params.y4,params.x5,params.y5,params.x6,params.y6)){
            this.$message.warning("图形线段之间不能相交,请重新绘制")
                this.lineIntersect.push({
                  id:params.id,
                  mark:false
                })
          }else{
                this.lineIntersect.push({
                  id:params.id,
                  mark:true
                }) 
         } 
         this.polygonPoint.push(params);
          }
      
         }  
        vc_this.stage.container().style.cursor = "crosshair";
      });
      return poly;
    },
    /**
     * 组件el-menu点击事件
     * @param key 索引值
     * @param keyPath
     */
    handleSelect(key, keyPath) {
      //设置当前工具
      this.currentTool = this.tools[key].nameEN;
    },
    /**
     * 在舞台上鼠标点下发生的事件
     * @param currentTool 当前选择的工具
     * @param e 传入的event对象
     */
    stageMousedown(currentTool, e) {
      switch (currentTool) {
        case "rect":
          //初始化矩形
    
          var x = e.evt.offsetX,
           y = e.evt.offsetY;
          this.pointStart = [x, y];
          var group = new Konva.Group({
              x: 0,
              y: 0,
              name: "pointsAndPoly",
              draggable: false,
            });
            group.add(this.addPoint(e));
            group.add(this.drawRect(x, y, 100, 100))
          break;
        case "poly":
          //如果数组长度小于2，初始化多边形和顶点，是它们成为一组,否则什么都不做
          if (this.polygonPoints.length < 2) {
            var x = e.evt.offsetX,
               y = e.evt.offsetY;
            //拖拽组
            var group = new Konva.Group({
              x: 0,
              y: 0,
              name: "pointsAndPoly",
              draggable: false,
            });
            //添加多边形的点
            group.add(this.addPoint(e));
            //绘画多边形
            this.polygonPoints = [x, y];
            group.add(this.drawPloygon(this.polygonPoints));
            //使所有顶点在顶层显示
            this.stage.find("Circle").forEach((element) => {
              element.moveToTop();
            });
            this.layer.add(group);
            this.stage.draw();
          } //多边形增加顶点
          else {
            let x = e.evt.offsetX,
              y = e.evt.offsetY;
            //group继续添加多边形的点
            this.currentDrawingShape.getParent().add(this.addPoint(e));
            this.polygonPoints.push(x);
            this.polygonPoints.push(y);
            //绘画多边形
            this.currentDrawingShape.setAttr("points", this.polygonPoints);
            //使所有顶点在顶层显示
            this.stage.find("Circle").forEach((element) => {
              element.moveToTop();
            });
            this.stage.draw();
          }
          break;
        default:
          break;
      }
      this.drawing = true;
    },
    /**
     * 鼠标在舞台上移动事件
     * @param currentTool 当前选择的工具
     * @param e 传入的event对象
     */
    stageMousemove(currentTool, e) {
      switch (currentTool) {
        case "rect":
          //绘画矩形中
          this.currentDrawingShape.setAttrs({
            width: e.evt.offsetX - this.pointStart[0],
            height: e.evt.offsetY - this.pointStart[1],
          });
          break;
        case "poly":
          //多边形初始化后，如果数组长度大于2，鼠标移动时，实时更新下一个点
          if (this.polygonPoints.length >= 2) {
            var x = e.evt.offsetX,
              y = e.evt.offsetY;
            var tempPoints = this.polygonPoints.concat();
            tempPoints.push(x);
            tempPoints.push(y);
            this.currentDrawingShape.setAttr("points", tempPoints);
          }
          break;
        default:
          break;
      }
      this.layer.draw();
    },
    /**
     * 鼠标在舞台上移动事件
     * @param currentTool 当前选择的工具
     * @param e 传入的event对象
     */
    stageMouseup(currentTool, e) {
      switch (currentTool) {
        case "rect":
          this.drawing = false;
          break;
        default:
          break;
      }
      this.layer.draw();
    },
    /**
     * 增加多边形顶点
     * @param e 传入的event对象
     */
    addPoint(e) {
      if (this.polygonPoints.length == 0) {
        var vc_this = this;
        //将第一个点标红,并显示
        return this.drawCircle(e.evt.offsetX, e.evt.offsetY)
          .setAttrs({
            fill: "red",
          })
          .show()
          .on("mousedown", (e) => {
            //点击第一个红点，绘画多边形结束
            //绘画多边形
            this.currentDrawingShape.setAttr("points", this.polygonPoints);
            //结束绘画多边形封闭
            //  this.currentDrawingShape.setAttr('closed', true);
            vc_this.drawing = false;
            vc_this.polygonPoints = [];
            //隐藏所有顶点
            vc_this.stage.find("Circle").forEach((element) => {
              element.hide();
            });
            //所有顶点变为白色
            vc_this.stage.find("Circle").forEach((element) => {
              element.setAttrs({
                fill: "#ffffff",
              });
            });
            //把现在的绘画对象更改为点和多边形合成的组
            this.currentDrawingShape = this.currentDrawingShape.getParent();
          });
      } else {
        //绘画点并显示
        return this.drawCircle(e.evt.offsetX, e.evt.offsetY).show();
      }
    },
    closeCallback3(data) {
      data &&
        data.map((item) => {
          this.dynamicTags.push(item);
        });
      this.dynamicTags = this.deWeightThree(this.dynamicTags, "id");
     
      this.showAddObject = false;
    },
    addObject() {
      this.showAddObject = true;
    },
    getUserPageList() {
      const param = {
        pageSize: 999,
        pageNum: 1,
      };
      userPageList(param).then((res) => {
        this.objectTableData = res.result.list;
        for (let i = 0; i < this.objectTableData.length; i++) {
          for (let j = 0; j < this.objectArr.length; j++) {
            if (this.objectArr[j] === this.objectTableData[i].id) {
              this.dynamicTags.push({
                name: this.objectTableData[i].name,
                id: this.objectTableData[i].id,
                email: this.objectTableData[i].email,
                phone: this.objectTableData[i].phone,
                status: this.objectTableData[i].status,
                password:this.objectTableData[i].password,
                imgShow: false,
              });
              // this.objectArr[j].name = this.objectTableData[i].name
            }
          }
          this.dynamicTags = this.deWeightThree(this.dynamicTags, "id");
        }
      });
    },
    handleChangeActiveTemplateList(e) {
      this.formTemplateList.activeTemplate = e;
      this.$forceUpdate(); // 强制刷新
    },
    handleClose(tag) {
      tag.imgShow = false;
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleChange(e) {
      this.formTemplateList.warningName = e;
      this.warningList.map((item) => {
        if (item.id === e) {
          if (item.notificationType === "") {
            if (item.needConfirm === 1) {
              this.a = "人工二次确认";
              this.content = item.type + "|" + item.level + "|" + this.a;
            } else if (item.needConfirm === 0) {
              this.a = "";
              this.content = item.type + "|" + item.level;
            }
          } else {
            if (item.needConfirm === 1) {
              this.a = "人工二次确认";
              this.content =
                item.type +
                "|" +
                item.level +
                "|" +
                item.notificationType +
                "|" +
                this.a;
            } else if (item.needConfirm === 0) {
              this.a = "";
              this.content =
                item.type + "|" + item.level + "|" + item.notificationType;
            }
          }
        }
      });
      this.$forceUpdate(); // 强制刷新
    },
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .konvajs-content{}
.addAreaButton {
  // font-size: 16px;
}
.dialog-body{
  /deep/.el-dialog__body {
    color: #606266;
    font-size: 14px;
    padding-top:0px !important ;
    word-break: break-all;
    padding-bottom: 30PX !important;
}
  width: 95%;
  height: 90%;
}
#map {
  background: #ddd;
  width: 800PX;
  height: 450PX;
  // aspect-ratio: 16/9;
}
.rectContainer{
  background: #ddd;
  width: 800PX;
  height: 450PX;
}
::v-deep .canvas-container {
  width: 200px;
  height: 200px;
}
.bottom {
  float: right;
  height: 50px;

  // background: goldenrod;
}
.object {
  margin-bottom: 64px;
  margin-top: 6px;
  .title {
    font-size: 16px;
    width: 104PX;
    float: left;
    text-align: right;
    margin-right: 16PX;
  }
  .tag {
    margin-right: 16PX;
    height: 32PX;
    line-height: 32PX;
    background: rgba(10, 25, 51, 0.03);
    border-radius: 4PX;
    border: 1px solid rgba(10, 25, 51, 0.1);
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #0a1933;
    font-size: 14px;
    padding: 0 24px;
    float: left;
    margin-top: -4px;
    cursor: pointer;
    position: relative;
    margin-bottom: 16px;
  }
  .closeImg {
    position: absolute;
    width: 16PX;
    right: -8PX;
    top: -9PX;
  }
  .tag:hover {
    color: #347fff;
    background: #fff;
    border: 1px solid #347fff;
  }
}
.btn1 {
  width: 800PX;
  display: flex;
  justify-content: space-between;
}
.content {
  margin-top: 20px;
  width: 800PX;
  height: 450PX;
  text-align: center;
  color: black;
  font-size: 20px;
  line-height: 450PX;
  // background: goldenrod;
  ::v-deep.el-loading-spinner {
    top: 3% !important;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
  }
}
.test{
  background-color: rgba(16, 57, 22, 0.368);
}
.testOne{
  background-color: rgba(219, 106, 31, 0.3);
}
.addObjectButton {
  float: left;
  margin-top: -4px;
  margin-bottom: 16px;
}
</style>