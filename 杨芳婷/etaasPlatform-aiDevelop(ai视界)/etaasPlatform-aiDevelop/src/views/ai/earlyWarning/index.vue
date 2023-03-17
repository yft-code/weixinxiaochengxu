<template>
  <div class="deviceContainer">
    <div class="deviceCard" v-loading="cardLoading">
      <div class="deviceCardLi">
        <div class="deviceCardNum">{{info.day}}</div>
        <div class="deviceCardTitle">今日事件(起)</div>
      </div>
       <div class="deviceCardLi">
        <div class="deviceCardNum">{{info.week}}</div>
        <div class="deviceCardTitle">本周事件(起)</div>
      </div>
       <div class="deviceCardLi">
        <div class="deviceCardNum">{{info.month}}</div>
        <div class="deviceCardTitle">本月事件(起)</div>
      </div>
       <div class="deviceCardLi">
        <div class="deviceCardNum">{{info.pending}}</div>
        <div class="deviceCardTitle">待处理事件(起)</div>
      </div>
       <div class="deviceCardLi">
        <div class="deviceCardNum">{{info.device}}</div>
        <div class="deviceCardTitle">布控设备(个)</div>
      </div>
       <div class="deviceCardLi">
        <div class="deviceCardNum">{{info.algos}}</div>
        <div class="deviceCardTitle">授权算法(个)</div>
      </div>
    </div>
    <div class="deviceContent"> 
      <div class="content">
          <el-form ref="form"  size="small" label-width="105px">
      <el-row
        :gutter="0"
      >
        <!-- 搜索框组件 -->
        <template>
          <el-col
           :sm="8"
           :md="8"
           :lg="6"
           :xl="6"
          >
       <el-form-item label="园区/厂区名称">
            <el-select
             style="width:100%"
              v-model="parkNames"
              :popper-append-to-body="false"
              placeholder="请选择"
              @change="parkChange"
            >
              <el-option
                v-for="item in parkNameList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          </el-col>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
        <el-form-item label="处理状态" class="common-width">
            <el-select
              style="width:100%"
              v-model="form.state"
              :popper-append-to-body="false"
              placeholder="请选择"
            >
              <el-option label="全部" value=""></el-option>
              <el-option label="已处理" value="已处理"></el-option>
              <el-option label="待处理" value="待处理"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
          <el-form-item label="识别算法" class="common-width">
            <el-select
             style="width:100%"
              v-model="form.algName"
              :popper-append-to-body="false"
              placeholder="请选择"
            >
              <el-option
                v-for="item in aloList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          </el-col>
          
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
         <el-form-item label="预警等级" class="level-width common-width">
            <el-select
             style="width:100%"
              v-model="warningLevel"
              :popper-append-to-body="false"
              placeholder="请选择"
              @change="changeLevel"
            >
              <el-option
                v-for="item in WarningListLeve"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
          </el-col>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
         <el-form-item label="预警类型" class="level-width common-width">
            <el-select
             style="width:100%"
              v-model="warningType"
              :popper-append-to-body="false"
              placeholder="请选择"
              @change="changeType"
            >
              <el-option label="全部" value="全部"></el-option>
              <el-option label="实时" value="实时"></el-option>
              <el-option label="非实时" value="非实时"></el-option>
            </el-select>
          </el-form-item> 
          </el-col>
          <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
          <el-form-item label="设备名称" class="level-width common-width">
            <el-select
            @change="changeDevice"
             style="width:100%"
               v-model="form.deviceId"
              :popper-append-to-body="false"
              placeholder="请选择"
        
            >
              <el-option v-for="item in deviceInfo" 
                :key="item.id" 
                :label="item.name" 
                :value="item.id">
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
         <el-form-item label="预警时间" class="time-width">
            <el-date-picker
              style="width:100%"
              :append-to-body="false"
              popper-class="pickerPopper"
              @change="change"
              v-model="value1"
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
           :sm="6"
            :md="6"
            :lg="6"
            :xl="6"
          >
       <el-form-item style="float:right;margin-right:0;min-width:240px"> 
         <el-button type="primary" @click="handleCheck" size="small" style="margin-left: 10px" 
            >搜索</el-button
          >
            <el-button @click="handleReset" size="small"
            >清空</el-button
          >
         
          </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
        <div class="form_br"></div>
        <div class="form_bottom1">
          <div>
            <el-dropdown trigger="click">
              <el-button size="small">展示设置</el-button>
              <el-dropdown-menu slot="dropdown" :append-to-body="false">
                <div class="check-group-box">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <div style="margin: 15px 0"></div>
                  <div
                    style="min-width: 130px"
                    v-for="(item, index) in tableHeader"
                    :key="index"
                  >
                    <el-checkbox @change="handleChecked" v-model="item.show">{{
                      item.label
                    }}</el-checkbox>
                    <div style="margin: 15px 15px"></div>
                  </div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-button
              type="primary"
              :disabled="this.eventList && this.eventList.length <= 0"
              size="small"
              @click="handleMulti"
              >一键处理</el-button
            >
          </div>
        </div>
        <div class="deviceTable">
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :key="num"
            :data="tableData"
            :header-cell-style="{ 'font-size': '16PX' }"
            :cell-style="{ 'font-size': '15PX' }"
            style="width: 100%"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            :cell-class-name="cellClassName"
            :header-cell-class-name="headerCellClassName"
          >
            <el-table-column
              fixed
              align="center"
              type="selection"
              min-width="50"
            >
            </el-table-column>
            <template v-for="(col, index) in tableHeader">
              <el-table-column
                :key="index"
                :prop="col.prop"
                :label="col.label"
                :min-width="col.width || ''"
                :column-key="index.toString()"
                :render-header="renderHeader"
                :align="col.align"
                :show-overflow-tooltip="col.isShow"
                v-if="col.show"
                @cell-mouse-enter="mouseOver"
                @cell-mouse-leave="mouseLeave"
              >
                <template slot-scope="scope">
                  <div v-if="col.prop === 'pic'">
                    <img
                      :src="scope.row.pic"
                      height="40"
                      width="40"
                      style="cursor: pointer"
                      @click="lookImg(scope.row)"
                    />
                  </div>
                  <div v-else-if="col.prop === 'state'">
                    <span
                      style="color: #52c41a"
                      v-if="scope.row.state === '已处理'"
                      >{{ scope.row.state }}</span
                    >
                    <span style="color: #ff3a3a" v-else>{{
                      scope.row.state
                    }}</span>
                  </div>
                  <div v-else-if="col.prop === 'isMistake'">
                    <div class="is-mistake">{{ scope.row.isMistake }}</div>
                  </div>
                  <div v-else-if="col.prop === 'isRepeat'">
                    <div class="is-mistake">{{ scope.row.isRepeat }}</div>
                  </div>
                  <div v-else-if="col.prop === 'levelName'">
                    <!-- <span style="color:#52C41A" v-if="scope.row.state==='已处理'">{{scope.row.state}}</span>
                      <span style="color:#FF3A3A" v-else>{{scope.row.state}}</span> -->
                    <!-- <div class="points">
                      <div
                        class="point"
                        :style="{ background: scope.row.levelColor }"
                      ></div>
                      <div style="margin-left: 5px">
                        {{ scope.row.levelName }}
                      </div>
                    </div> -->
                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger="hover"
                      popper-class="my-popover1"
                    >
                      <div>{{ `预警等级:${scope.row.warning.levelName}` }}</div>
                      <div>
                        {{
                          `预警说明:${
                            scope.row.warning.levelComment
                              ? scope.row.warning.levelComment
                              : "--"
                          }`
                        }}
                      </div>
                      <el-button slot="reference" type="text">
                        <span
                          class="circle"
                          :style="{ background: scope.row.warning.levelColor }"
                          @mouseover="mouseOver"
                          @mouseleave="mouseLeave"
                        ></span>
                      </el-button>
                    </el-popover>
                    <span>{{ scope.row.levelName }}</span>
                  </div>
                  <div v-else-if="col.prop === 'type'">
                    <div
                      class="is-mistakes"
                      style="color: #52c41a"
                      v-if="scope.row.state === '实时'"
                    >
                      {{ scope.row.type }}
                    </div>
                    <div class="is-mistakes" style="color: lightgren" v-else>
                      {{ scope.row.type }}
                    </div>
                  </div>
                  <div v-else>
                    {{ scope.row[col.prop] ? scope.row[col.prop] : "--" }}
                  </div>
                </template>
              </el-table-column>
            </template>

            <el-table-column
              v-if="lastItemShow"
              fixed="right"
              label="操作"
              min-width="150"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="checkEdit(scope.row.eventId, scope.row)"
                  >查看/处理</el-button
                >
              </template>
            </el-table-column>

            <el-table-column
              v-if="!lastItemShow"
              fixed="right"
              label="操作"
              width="150"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="checkEdit(scope.row.eventId, scope.row)"
                  >查看/处理</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="form_pg">
          <el-pagination
            style="float: right"
            background
            align="center"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
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
    <el-dialog
      width="400"
      title=""
      :visible.sync="lookImgVisible"
      :before-close="handleCloseLookImg"
    >
      <img class="imgStyle" :src="imgUrl"/>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button size="mini" >取 消</el-button> -->
        <!-- <el-button size="mini" type="primary" @click="handleCloseLookVideo">关闭</el-button> -->
      </div>
    </el-dialog>
    <check-dialog
      :dialogVisible="visible"
      :parkName="parkName"
      :name="name"
      :id="id"
      :form-data="row"
      :title="title"
      :floor="floor"
      :isRead="isRead"
      :areaName="areaName"
      :deviceName="deviceName"
      :building-name="buildingName"
      :form="form"
      @close-callback1="handleClose1"
      @close-callback="handleClose"
      @getReadState="getReadState"
    >
    </check-dialog>
  </div>
</template>
<script>
// import Sortable from "sortablejs"
import { getAlgorithm } from "@/api/ai/algorithmManage";
import * as api from "@/api/ai/earlyWarning";
import checkDialog from "@components/checkDialog/index";
import { getUserInfo, getUserList } from "@/api/ai/warningEvent";
import { getWarningListLeve } from "@/api/ai/warningManage";
import { getDevices } from "@/api/digital/config"
import {
  buildnameList,
  floorList,
  ipList,
  parknameList,
  serialnumberList,
  stateList,
  getParknameList,
  getBuildnameList,
  getFloorList,
  getAreanameList,
} from "@/api/ai/deviceManage";
const Base64 = require("js-base64").Base64;
export default {
  components: { checkDialog },
  data() {
    return {
      info:{},
      cardLoading:false,
      scenceNames: "",
      areaNames: "",
      floors: "",
      parkNames: "",
      buildingNames: "",
      noticerId: "",
      warningLevel: "",
      warningType: "",
      WarningListLeve: [],
      deviceInfo:[],
      deviceId:'',
      lookImgVisible: false,
      imgUrl: "",
      lastItemShow: false,
      checkAll: false,
      isIndeterminate: true,
      tableHeader: [
        {
          prop: "levelName",
          label: "预警等级",
          width: 150,
          show: true,
          isShow: true,
          align: "left",
        },
        {
          prop: "eventId",
          label: "事件编号",
          width: 220,
          show: false,
          isShow: true,
          align: "left",
        },
        // {
        //   prop: "scene",
        //   label: "监管场景",
        //   width: "150",
        //   show: true,
        //   isShow: true,
        //   align: "left",
        // },

        {
          prop: "pic",
          label: "事件记录",
          width: 150,
          show: true,
          isShow: false,
          align: "left",
        },
        {
          prop: "deviceName",
          label: "设备名称",
          width: 150,
          show: true,
          isShow: true,
          align: "left",
        },
        {
          prop: "algName",
          label: "识别算法",
          width: 150,
          show: true,
          isShow: true,
          align: "left",
        },
        {
          prop: "datetime",
          label: "预警时间",
          width: 150,
          show: true,
          isShow: true,
          align: "left",
        },
        {
          prop: "type",
          label: "预警类型",
          width: 150,
          show: true,
          isShow: true,
          align: "center",
        },
        {
          prop: "confidence",
          label: "置信度",
          width: 150,
          show: true,
          isShow: true,
          align: "center",
        },
        {
          prop: "isMistake",
          label: "是否误报",
          width: 150,
          show: true,
          isShow: true,
          align: "center",
        },
        {
          prop: "isRepeat",
          label: "重复报警",
          width: 150,
          show: true,
          isShow: true,
          align: "center",
        },
        {
          prop: "state",
          label: "处理状态",
          width: 150,
          show: true,
          isShow: true,
          align: "center",
        },
        {
          prop: "isRead",
          label: "阅读状态",
          width: 150,
          show: false,
          isShow: true,
          align: "center",
        },

        {
          prop: "record",
          label: "处理记录",
          width: 150,
          show: false,
          isShow: true,
          align: "left",
        },

        {
          prop: "parkName",
          label: "园区/厂区名称",
          show: false,
          width: 190,
          isShow: true,
          align: "left",
        },
        {
          prop: "notifiers",
          label: "通知对象",
          width: "150",
          show: false,
          isShow: true,
          align: "left",
        },
        {
          prop: "handler",
          label: "处理人",
          width: "150",
          show: false,
          isShow: true,
          align: "left",
        },
        {
          prop: "handleTime",
          label: "处理时间",
          width: "150",
          show: false,
          isShow: true,
          align: "left",
        },
        {
          prop: "address",
          label: "地址",
          width: "150",
          show: false,
          isShow: true,
          align: "left",
        },
      ],
      dragState: {
        startIndex: -1, // 拖动起始元素的index
        endIndex: -1, // 拖动结束元素的index
        afterMoveIndex: -1, // 拖动后元素的index
        dragging: false, // 是否正在拖动
        direction: null, // 拖动方向
        moveTableOutsideBack: false, // 拖出到table外之后又拖回来
      },
      areaNameList: [],
      flag: false,
      num: 0,
      floor: "",
      areaName: "",
      deviceName: "",
      name: "",
      parkName: "",
      buildingName: "",
      id: "",
      isRead: "",
      isRepeat: "",
      scenceName: "",
      loading: true,
      sceneList: [],
      //算法列表
      aloList: [],
      tableData: [],
      // tableData:[{state:'待处理',scene:{name:'yier'},device:{parkName:'公园',buildingName:'也一样',floor:'123',areaName:'dddd',deviceName:'1233434'}},{state:'已处理'}],
      // 序列号列表
      serialNumberList: [],
      // 状态列表
      statusList: [],
      // 建筑列表
      buildingNameList: [],
      // 园区/厂区列表
      parkNameList: [],
      // 楼层列表
      floorList: [],
      // 场景列表
      scene: [],
      // ip列表
      ipList: [],
      // 事件列表
      eventList: [],
      form: {
        alarmStartTime: "",
        alarmEndTime: "",
        deviceId:""
      },
      value1: "",
      row: {},
      title: "",
      visible: false,
      openFlag: true,
      showAdd: false,
      showEdit: false,
      showImport: false,
      dialogFormVisible: false,
      deviceList: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      ids: [],
      userData: [],
      arrShow: [],
        formInline: {
          user: '',
          region: ''
        },
      isChange:true
    };
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "fetchData",
  },
  created() {
    this.$bus.$on("updateEvents", () => {
      // console.log('this.update');
      this.fetchData(this.form);
    });
    this.$nextTick(() => {
      // 阻止默认行为
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      };
    });
    this.getShowArr();
    this.getUser();
    this.getParkNameList();
    this.getSerialnumberList();
    this.getAreaName();
    // this.getBuildingNameList()
    // this.getFloorList()
    this.getIpList();
    this.getStatusList();
    this.getWarningListLeve();
    this.fetchData(this.form);
    this.getList();
    this.getSceneList();
    this.getDeviceInfo();
  },
  mounted() {
    // 阻止默认行为
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
    //  拖动列和行
    // this.rowDrop()
    // this.columnDrop()
    this.$bus.$emit("monitoringRoom", "");
    this.$bus.$on("showDeviceDefault", (flag) => {
      this.openFlag = flag;
    });
    this.getData();
  },
  methods: {
    changeDevice(e){
       this.isChange=false
    },
    getDeviceInfo(){
        getDevices().then((res) => {
           if (res.success && res.code == 0) {
             this.deviceInfo = res.result;
           }
         
      });
    },
    getData(){
      this.cardLoading = true
      api.getEventStatis().then((res) => {
        this.cardLoading = false
        if(res.result){
          this.info = res.result;
        }
      }).catch(()=>{
        this.cardLoading = false
      })
    },
    //
    getReadState() {
      this.fetchData(this.form);
    },
    mouseOver() {},
    mouseLeave() {},
    userChange(val) {
      if (val === "-1000") {
        this.form.noticerId = "";
      } else {
        this.form.noticerId = val;
      }
    },
    changeLevel(val) {
      if (val === "-1000") {
        this.form.level = "";
      } else {
        this.form.level = val;
      }
    },
    changeType(val) {
      if (val === "全部") {
        this.form.warningType = "";
      } else {
        this.form.warningType = val;
      }
    },
    // 获取预警等级
    getWarningListLeve() {
      getWarningListLeve().then((res) => {
        this.WarningListLeve = res.result;
        this.WarningListLeve.unshift({ id: "全部", name: "全部" });
      });
    },
    lookImg(val) {
      if(this.checkImgExists(val.pic)){
        this.lookImgVisible = true;
        this.imgUrl = val.pic;
      }else{
        this.$message.warning('图片不存在已被删除')
      }
    },
    checkImgExists(imgurl) {
          var ImgObj = new Image(); //判断图片是否存在  
          ImgObj.src = imgurl;  
          //存在图片
          if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
                return true;
          } else {  
                return false;
            }   
      },

    handleCloseLookImg() {
      this.lookImgVisible = false;
    },
    // 区域
    areaChange(e) {
      if (e === "全部") {
        this.form.areaName = "";
      } else {
        this.form.areaName = e;
      }
    },
    // 场景选择全部
    scenceChange(e) {
      if (e === "全部") {
        this.form.sceneName = "";
      } else {
        this.form.sceneName = e;
      }
    },
    // 初始值
    getShowArr() {
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
    },
    handleCheckAllChange(val) {
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

    renderHeader(h, { column, $index }) {
      // 这里可以根据$index的值来对自身需求进行修改，
      return h(
        "span",
        {
          class: ["thead-cell"],
          style: {
            display: "block",
            width: "100%",
            cursor: "move",
          },
          on: {
            mousedown: ($event) => {
              this.handleMouseDown($event, column);
            },
            mouseup: ($event) => {
              this.handleMouseUp($event, column);
            },
            mousemove: ($event) => {
              this.handleMouseMove($event, column);
            },
          },
        },
        [
          h("span", [
            // 给每个表头添加icon 可以不需要
            h("span", {
              class:
                $index === 0 ? "" : $index === 1 ? "" : $index === 2 ? "" : "",
            }),
            h("span", column.label),
          ]),
          // 给每个表头添加一个class=virtual 是画虚线的类名。
          h("span", {
            class: ["virtual"],
          }),
        ]
      );
    },
    // 按下鼠标开始拖动 设置列的背景色
    handleMouseDown(e, column) {
      // 判断是鼠标左键
      if (e.button === 0) {
        this.dragState.dragging = true;
        this.dragState.startIndex = parseInt(column.columnKey);
        this.dragState.moveTableOutsideBack = false;
      }
    },
    // 拖动中
    handleMouseMove(e, column) {
      // 判断是鼠标左键
      if (e.button === 0) {
        if (this.dragState.dragging) {
          let currentIndex = parseInt(column.columnKey); // 拖动的当前列index
          // console.log(`移动到了${currentIndex}`)
          if (currentIndex !== this.dragState.startIndex) {
            this.dragState.direction =
              currentIndex - this.dragState.startIndex < 0 ? "left" : "right"; // 判断拖动方向
            this.dragState.afterMoveIndex = currentIndex;
          } else {
            this.dragState.direction = null;
          }
        } else {
          return false;
        }
      }
    },
    // 鼠标放开结束拖动
    handleMouseUp(e, column) {
      // 判断是鼠标左键
      if (e.button === 0) {
        // 拖出当前table外之后又拖回来，不再进行易位操作（拖出去时已处理）
        if (this.dragState.moveTableOutsideBack) {
          return false;
        } else {
          this.dragState.endIndex = parseInt(column.columnKey); // 记录结束列index
          // console.log(`结束移动的位置 ${this.dragState.endIndex}`)
          if (this.dragState.startIndex !== this.dragState.endIndex) {
            this.dragColumn(this.dragState);
          }
          this.finishDragInit();
        }
      }
    },
    // 拖动到当前table之外的处理
    moveTableOutside() {
      if (this.dragState.dragging) {
        this.dragState.endIndex = this.dragState.startIndex;
        // console.log(`已移动到table外，结束移动的位置 ${this.dragState.endIndex}`)
        if (this.dragState.startIndex !== this.dragState.endIndex) {
          this.dragColumn(this.dragState);
        }
        this.finishDragInit();
        this.dragState.moveTableOutsideBack = true;
      }
    },
    // 拖动易位
    dragColumn({ startIndex, endIndex, direction }) {
      // console.log(`从${startIndex}移动到了${endIndex}`)
      // 排除掉鼠标点击table外面，然后拖入进table报错
      if (startIndex < 0) {
        return;
      }
      // 判断是向左移动还是向右移动
      // 把移动的列插在某个列前面或者后面，然后在删除移动的列
      if (direction === "left") {
        this.tableHeader.splice(endIndex, 0, this.tableHeader[startIndex]);
        this.tableHeader.splice(startIndex + 1, 1);
      } else {
        this.tableHeader.splice(endIndex + 1, 0, this.tableHeader[startIndex]);
        this.tableHeader.splice(startIndex, 1);
      }
    },
    // 拖动完成后的初始化
    finishDragInit() {
      // 给当前要拖动列的th取消class
      // for (var item of document.querySelectorAll('.drag_table table thead tr th')) {
      //     item.className = String(item.className).split("dragging_column").join("");
      // }
      // 再次初始化拖动状态
      this.dragState = {
        startIndex: -1,
        endIndex: -1,
        afterMoveIndex: -1,
        dragging: false,
        direction: null,
        moveTableOutsideBack: false,
      };
    },
    // 动态给表头单元格添加 class，实现拖动中的虚线效果
    /* 
                这个监听在table渲染的时候会执行一遍。 
                然后还会有两个条件会触发执行：
                1. 绑定的数据发生变化的时候(即为表格内容变化就触发)。header变化触发header-cell-class-name，表格数据变化触发cell-class-name.
                2. return返回值 如果绑定了data,如果此data变化也会触发执行。相当于对这个data进行了监听随之触发这个方法。
            */
    headerCellClassName({ column, columnIndex }) {
      return columnIndex === this.dragState.afterMoveIndex
        ? `drag_active_${this.dragState.direction}`
        : "";
    },
    // 动态给表头单元格th添加class，实现拖动中的背景
    cellClassName({ column, columnIndex }) {
      return columnIndex === this.dragState.startIndex ? `dragging_column` : "";
    },
    count(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    //批量处理
    handleMulti() {
      const id = [];
      this.eventList &&
        this.eventList.map((item) => {
          id.push(item.id);
        });
      this.ids = id;
      const ids = this.ids.join(",");
      const formData = new FormData();
      formData.set("ids", ids);
      api
        .handleAll(formData)
        .then(() => {
          this.$message({
            message: "批量处理成功",
            type: "success",
          });
          this.fetchData(this.form);
          this.fetchNoticeData();
        })
        .catch();
    },
    fetchNoticeData() {
      const that = this;
      if (localStorage.getItem('token') && localStorage.getItem("token").aiHorizon) {
        api
          .getNoticemNum()
          .then((res) => {
            this.$bus.$emit("number", res.result);
          })
          .catch((res) => {});
      }
    },
   
    // 时间处理
    change(e) {
      if (e) {
        this.form.alarmStartTime = e[0];
        this.form.alarmEndTime = e[1];
      } else {
        this.form.alarmStartTime = "";
        this.form.alarmEndTime = "";
      }
    },
    // 获取算法列表
    getList() {
      const params = {
        pageNum: 1,
        pageSize: 999,
      };
      getAlgorithm(params)
        .then((res) => {
          const arr = [];
          arr.push("全部");
          res.result.list &&
            res.result.list.map((item) => {
              arr.push(item.name);
            });
          this.aloList = arr;
        })
        .catch();
    },
    getStatusList() {
      stateList().then((res) => {
        this.statusList = res.result;
      });
    },
    // 获取人员
    getUser() {
      let params = {
        departId: "",
      };
      getUserList(params)
        .then((res) => {
          if (res.code === 0) {
            this.userData = res.result;
            this.userData &&
              this.userData.length > 0 &&
              this.userData.map((item) => {
                if (item.name === "全部") {
                  item.id = "-1000";
                }
              });
          }
        })
        .catch();
    },
    // 获取场景列表
    getSceneList() {
      api.sceneList().then((res) => {
        this.scene = res.result;
      });
    },
    getIpList() {
      ipList().then((res) => {
        this.ipList = res.result;
      });
    },
    getFloorList(name) {
      let params = {
        id: name,
      };
      getFloorList(params).then((res) => {
        const floorList = [];
        floorList.push("全部");
        this.floorList = res.result.map((val) => {
          floorList.push(val);
        });
        this.floorList = floorList;
      });
    },
    getBuildingNameList() {
      let params = {
        parkName: this.form.parkName,
      };
      getBuildnameList(params).then((res) => {
        this.buildingNameList = res.result;
      });
    },
    getParkNameList() {
      getParknameList().then((res) => {
        this.parkNameList = res.result;
      });
    },

    getAreaName() {
      let params = {
        parkName: this.form.parkName,
        buildingName: this.form.buildingName,
        floor: this.form.floor,
        current: 1,
        limit: 9999,
      };
      getAreanameList(params).then((res) => {
        if (res.result && res.result.list) {
          let areaNameList = [];
          if(res.result.list.length !== 0){
             areaNameList.push({
              name: "全部",
              id: "1232143435435",
            });
          }      
          res.result.list.map((item) => {
            areaNameList.push({
              name: item.name,
              id: item.id,
            });
          });
          this.areaNameList = areaNameList;
        }
      });
    },

    parkChange(e) {
      if (e === "全部") {
        this.form.parkName = "";
        this.buildingNameList = [];
        this.buildingNames = "";
        this.floors = "";
      } else {
        this.buildingNames = "";
        this.floors = "";
        this.form.parkName = e;
        this.getBuildingNameList();
      }
      this.form.buildingName = "";
      this.buildingName = "";
      this.form.floor = "";
      if (this.form.areaName) {
        this.form.areaName = "";
      }

      this.getAreaName();
      this.floorList = [];
    },

    buildingChange(val) {
      if (val === "全部") {
        this.form.buildingName = "";
        this.floor = "";
        this.form.floor = "";
        this.floorList = [];
        this.floors = "";
      } else {
        let id = "";
        this.floors = "";
        this.form.buildingName = val;
        this.buildingNameList.map((element) => {
          if (val === element.buildingName) {
            id = element.id;
          }
        });
        if (this.form.areaName) {
          this.form.areaName = "";
        }
        this.form.floor = "";
        this.getFloorList(id);
      }
        this.areaNames=''
        this.form.areaName=''
        this.getAreaName();
    },

    floorChange(e) {
      if (e === "全部") {
        this.areaNames=''
        this.form.floor = ""
      } else {
        this.form.floor = e
        this.areaNames=''
        this.form.areaName = ''
      }
      this.getAreaName();
    },
    getSerialnumberList() {
      serialnumberList().then((res) => {
        this.serialNumberList = res.result;
      });
    },

    fetchData(params) {
      this.loading = true;
      const  id =this.isChange?this.$route.query.deviceId:'';
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.deviceId = id?id:params.deviceId;
      params.current = current;
      api.alarmlistBacklog(params).then((res) => {
        this.tableData = res.result.list;
        this.tableData &&
          this.tableData.map((item) => {
            // console.log('item',item);
            // 场景
            let arr = [];
            if (item.scene && item.scene.length > 0) {
              item.scene.map((j) => {
                arr.push(j.name);
                item.scene = arr.join(",");
              });
            } else {
              item.scene = "--";
            }

            item.areaName = item.device.areaName;
            item.buildingName = item.device.buildingName;
            item.floor = item.device.floor;
            item.parkName = item.device.parkName;
            item.levelName = item.warning.levelName;
            item.type = item.warning.type;
            item.address = item.device.address;
            //  误报
            if (item.isMistake === true) {
              item.isMistake = "是";
            } else {
              item.isMistake = "否";
            }
            // 已读未读
            if (item.isRead) {
              item.isRead = "已读";
            } else {
              item.isRead = "未读";
            }
            // 重复报警
            if (item.isRepeat === true) {
              item.isRepeat = "是";
            } else {
              item.isRepeat = "否";
            }
            // 颜色
            item.levelColor = item.warning.levelColor;
          });
        this.total = res.result.total;
        this.loading = false;
      });
    },
    fetchData1(params) {
      const id = this.$route.query.deviceId;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.deviceId = id;
      params.current = current;
      api.alarmlistBacklog(params).then((res) => {
        this.tableData = res.result.list;
        this.total = res.result.total;
      });
    },
    handleClose() {
      this.visible = false;
      // this.fetchData1(this.form)
      this.loading = true;
    },
    handleClose1() {
      this.visible = false;
      // this.fetchData1(this.form)
      this.$forceUpdate();
      this.loading = true;
    },
    checkEdit(val, row) {
      this.num++;
      this.id = row.id;
      this.title = "事件编号" + ":" + " " + val;
      this.row = JSON.parse(JSON.stringify(row));
      this.name = this.row.scene;
      this.isRead = false;
      this.parkName = this.row.device.parkName;
      this.buildingName = this.row.device.buildingName;
      (this.floor = this.row.device.floor),
        (this.areaName = this.row.device.areaName),
        (this.deviceName = this.row.deviceName);
      this.device = JSON.parse(JSON.stringify(row.device));
      this.visible = true;
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.fetchData(this.form);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(this.form);
    },
    handleSelectionChange(val) {
      this.eventList = val;
    },
    handleReset() {
      this.form = {};
      this.noticerId = "";
      this.warningType = "";
      this.warningLevel = "";
      this.areaNames = "";
      this.parkNames = "";
      this.buildingNames = "";
      this.scenceNames = "";
      this.floors = "";
      this.form.alarmStartTime = "";
      this.form.alarmEndTime = "";
      this.value1 = "";
      this.currentPage = 1;
      this.floorList = [];
      this.buildingNameList = [];
      this.getAreaName();
      this.fetchData(this.form);
    },
    handleCheck() {
      this.currentPage = 1;
      // let form = JSON.parse(JSON.stringify(this.form));
      if (this.form.algName === "全部") {
        this.form.algName = "";
      }
      this.fetchData(this.form);
    },
    handleAdd() {
      this.showAdd = true;
    },
    handleImport() {
      this.showImport = true;
    },
    closeCallback() {
      this.showImport = false;
      this.$message({
        message: "取消成功",
        type: "success",
      });
    },
    closeCallback1() {
      this.showEdit = false;
      this.$message({
        message: "编辑成功",
        type: "success",
      });
    },
    closeCallback2() {
      this.showAdd = false;
      this.$message({
        message: "添加成功",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.circle {
  display: inline-block;
  border-radius: 50%;
  height: 12PX;
  width: 12PX;
  margin-top: -10PX;
  margin-right: 5px;
}
/deep/ .el-dropdown-menu {
  z-index: 100 !important;
  left: 0 !important;
}
/deep/ .el-select-dropdown {
  z-index: 120 !important;
}
/deep/.el-popper[x-placement^="bottom"] .popper__arrow {
  top: -6px;
  left: 50% !important;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
/deep/ .popper__arrow::after {
  top: 1px;
  display: none;
  margin-left: -50% !important;
  border-top-width: 0;
  border-bottom-color: #fff;
}
/deep/ .el-picker-panel {
  z-index: 100 !important;
  left: -45% !important;
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
.deviceContainer {
  .point {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .is-mistake {
    width: 60%;
    margin: 0 auto;
  }
  .is-mistakes {
    width: 70%;
    margin: 0 auto;
  }
  .imgStyle{
    width: 100%;
    max-height: 500px;
  }
  .points {
    display: flex;
    align-items: center;
  }
  width: 100%;
  .deviceCard{
    width: 97%;
    margin: 24px auto;
    border-radius: 8px;
    box-sizing: border-box;
    background:#fff;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    display: flex;
    flex-wrap: wrap;
    padding:20px 40px;
    @media screen and (min-width: 992px) {
   .deviceCardLi{
    flex:1;
  }
}
 @media screen and (max-width: 992px) {
   .deviceCardLi{
     flex: 1;
    // height: 120px;
    padding: 20px;
    margin: 0 5px 5px 0; // 间隙为5px
    // background-color: #999;
    width: calc((100% - 10px) / 3);  // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
    min-width: calc((100% - 10px) / 3); // 加入这两个后每个item的宽度就生效了
    max-width: calc((100% - 10px) / 3); // 加入这两个后每个item的宽度就生效了
    &:nth-child(3n) { // 去除第3n个的margin-right
      margin-right: 0;
    }
  }
    .deviceCardTitle{
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0A1933;
    font-size: 14PX;
    padding-top:10PX;
    line-height: 28px;
    text-align: center;
  }
}
  }

  .deviceCardNum{
    font-family: HelveticaNeue-Bold, HelveticaNeue;
    font-weight: bold;
    color: #347FFF;
    font-size: 28PX;
    text-align: center;
    line-height: 39px;
    margin-bottom:8px;
  }
  .deviceCardTitle{
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0A1933;
    font-size: 14PX;
    line-height: 28px;
    text-align: center;
  }
  .deviceContent {
    width: 97%;
    margin: 24px auto;
    border-radius: 8px;
    box-sizing: border-box;
    background:#fff;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    .content {
      width: 95%;
      margin: 0 auto;
      padding-top: 24px;
}
    /deep/ .el-button--primary.is-disabled,
    .el-button--primary.is-disabled:active,
    .el-button--primary.is-disabled:focus,
    .el-button--primary.is-disabled:hover {
      color: #fff;
      background-color: darkblue;
      background-color: rgb(153, 191, 255);
      cursor: not-allowed;
      border-color: #a0cfff;
    }
    .form_bottom {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
    }
    .form_br {
      width: 100%;
      margin-top: 16px;
      height: 1px;
      background-color: #f3f3f5;
    }
    .form_bottom1 {
      margin-top: 24px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
    }
    .deviceTable {
      /deep/ .el-table__fixed::before {
        width: 0;
      }
      width: 100%;
      ::v-deep.el-table__empty-text {
        position: fixed;
        line-height: 60px;
        left: 30%;
        color: #909399;
      }
    }
    .form_pg {
      height: 45px;
      margin-top: 24px;
      padding-bottom: 24px;
      margin-right: 0;
    }
  }
}
</style>
