<template>
  <div class="deviceContainer">
    <div v-if="openFlag" class="deviceContent">
       <el-form 
         :model="deviceList"
          size="small"
          label-width="105px"
          :rules="rules"
          ref="form"
         >
      <el-row
        :gutter="-10"
      >
        <!-- 搜索框组件 -->
        <template>
          <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
      <el-form-item label="园区/厂区名称" prop="parkName">
          <el-select
            :popper-append-to-body="false"
            v-model="deviceList.parkName"
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
      <el-form-item label="建筑名称" prop="buildingName" class="common-width md-width-common">
          <el-select
            :popper-append-to-body="false"
            v-model="buildingName"
            placeholder="请选择"
            @change="buildingChange"
          >
            <el-option
              v-for="item in buildingNameList"
              :key="item.id"
              :label="item.buildingName"
              :value="item.buildingName"
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
           <el-form-item label="楼层" prop="floor" class="common-width md-width-common">
          <el-select
            :popper-append-to-body="false"
            v-model="floor"
            placeholder="请选择"
            @change="floorChange"
          >
            <el-option
              v-for="item in floorList"
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
        <el-form-item label="设备序列号" prop="serialNumber">
          <el-select
            :popper-append-to-body="false"
            v-model="deviceList.serialNumber"
            placeholder="请选择"
          >
            <el-option
              v-for="item in serialNumberList"
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
        <el-form-item label="区域名称" prop="areaName" class="md-width-common commom-width">
          <el-select
            @change="areaChange"
            :popper-append-to-body="false"
            v-model="areaName"
            placeholder="请选择"
          >
            <el-option
              v-for="item in areaNameList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
          <!-- <el-input
            v-model="deviceList.areaName"
            class="formInput"
            placeholder="请选择"
          ></el-input> -->
        </el-form-item>
          </el-col>
      
            <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
         <el-form-item label="设备IP" prop="ip" class="common-width md-width-common">
          <el-select
            :popper-append-to-body="false"
            v-model="deviceList.ip"
            placeholder="请选择"
          >
            <el-option
              v-for="item in ipList"
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
      <el-form-item label="运行状态" prop="status" class="common-width">
          <el-select
            :popper-append-to-body="false"
            v-model="deviceList.state"
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusList"
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
         <el-form-item label="设备名称" prop="deviceName" class="md-width-common">
          <el-input
            v-model="deviceList.deviceName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
          </el-col>
             <el-col
           :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
         <!-- <el-form-item label="是否关联" prop="releate" class="md-width-common">
          <el-select
            :popper-append-to-body="false"
            v-model="deviceList.isAssociated"
            placeholder="请选择"
          >
            <el-option
              v-for="item in associatedList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
          </el-col>
             <el-col
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24"
          >
         <el-form-item style="float:right;margin-right:0px">
           <el-button type="primary" size="small" @click="handleCheck"
          >搜索</el-button
        >
        <el-button size="small" @click="handleReset">清空</el-button>
        </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
      <el-form
        ref="deviceList"
        :model="deviceList"
        :inline="true"
        class="form"
        size="mini"
      >
      </el-form>
      <div class="form_br"></div>
      <div class="form_bottom1">
        <div>
          <el-button type="primary" @click="openMonitoringRoom" size="small"
            >监控室</el-button
          >
          <el-dropdown trigger="click">
            <el-button
              style="margin-left: 6px; padding: 6px 15px; padding-top: 9px"
              size="small"
              >展示设置</el-button
            >
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
          <el-button type="primary" @click="handleAdd('添加设备')" size="small"
            >添加设备</el-button
          >
          <el-button @click.native="handleImport" size="small"
            >批量添加设备</el-button
          >
        </div>
      </div>
      <div class="deviceTable" v-loading="loading">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed align="center" type="selection" width="55">
          </el-table-column>
          <el-table-column
            fixed
            label="编号"
            :index="count"
            type="index"
            width="60"
            show-overflow-tooltip
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
              show-overflow-tooltip
              v-if="col.show"
            >
              <template slot-scope="scope">
                <div v-if="col.prop === 'isActive'">
                  <div
                    :class="{
                      isActiveClass: scope.row.isActive === true,
                      isActiveClass1: scope.row.isActive === false,
                    }"
                    @click="changeStyle(scope.row)"
                  ></div>
                </div>
                <div v-else-if="col.prop === 'state'">
                  <span
                    v-if="scope.row.state === '运行中'"
                    style="color: #a9e28d"
                    >{{ scope.row.state }}</span
                  >
                  <span v-if="scope.row.state === ''">--</span>
                  <span
                    v-if="scope.row.state === '设备异常'"
                    style="color: red"
                    >{{ scope.row.state }}</span
                  >
                </div>
                <div v-else-if="col.prop === 'offlineNotification'">
                  <div
                    :class="{
                      isActiveClass: scope.row.offlineNotification === true,
                      isActiveClass1: scope.row.offlineNotification === false,
                    }"
                    @click="changeStyle1(scope.row)"
                  ></div>
                </div>
                <div v-else>
                  {{ scope.row[col.prop] ? scope.row[col.prop] : "--" }}
                </div>
              </template>
            </el-table-column>
          </template>

          <el-table-column
            fixed="right"
            label="操作"
            min-width="250"
            v-if="lastItemShow"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleHistoryFile(scope.row)"
                class="historyFile"
                :class="[historyDisabled ? 'buttonDisable' : '']"
                :disabled="historyDisabled"
                >历史监控</el-button
              >
              <el-button
                type="text"
                @click="handleToEaryWaring(scope.row)"
                class="historyFile1"
                :disabled="waringDisabled"
                :class="[waringDisabled ? 'buttonDisable' : '']"
                >预警事件</el-button
              >
              <el-button
                type="text"
                @click="handleEdit(scope.row, '编辑设备')"
                class="historyFile1"
                >编辑</el-button
              >
              <el-button
                type="text"
                @click="handleDelete(scope.row)"
                class="historyFile1"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="250"
            v-if="!lastItemShow"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleHistoryFile(scope.row)"
                class="historyFile"
                :class="[historyDisabled ? 'buttonDisable' : '']"
                :disabled="historyDisabled"
                >历史监控</el-button
              >
              <el-button
                type="text"
                @click="handleToEaryWaring(scope.row)"
                class="historyFile1"
                :disabled="waringDisabled"
                :class="[waringDisabled ? 'buttonDisable' : '']"
                >预警事件</el-button
              >
              <el-button
                type="text"
                @click="handleEdit(scope.row, '编辑设备')"
                class="historyFile1"
                >编辑</el-button
              >
              <el-button
                type="text"
                @click="handleDelete(scope.row)"
                class="historyFile1"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="form_Devicepg">
        <el-pagination
          style="float: right"
          background
          align="center"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
          @size-change="handleDeviceSizeChange"
          @current-change="handleDeviceCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <importFile :visible="showImport" @close-callback="closeCallback" />
    <addDevice
      :disable-flag="disableFlag"
      :visible="showAdd"
      :type="type"
      :row="row"
      :title="title"
      @close-callback1="closeCallback1"
    />
    <monitoringRoom
      v-if="!openFlag"
      :warningData="warningData"
      :loadData="loadData"
      :multipleSelection="multipleSelection"
    ></monitoringRoom>
  </div>
</template>
<script>
import importFile from "./importFile";
import addDevice from "./addDevice";
import monitoringRoom from "./monitoringRoom";
import { getMenu } from "@/api/ai/menu";
import {
  deviceDelete,
  pageList,
  serialnumberList,
  getParknameList,
  getBuildnameList,
  getFloorList,
  getAreanameList,
  ipList,
  stateList
} from "@/api/ai/deviceManage";
import * as api from "@/api/ai/earlyWarning";

export default {
  components: { importFile, addDevice, monitoringRoom },
  data() {
    return {
      lastItemShow: false,
      checkAll: false,
      isIndeterminate: true,
      arrShow: [],
      rules:{
        deviceName: [
          { max:50, message: "设备名称长度限制50个字符", trigger: "blur" },
        ],
      },
      tableHeader: [
        {
          prop: "serialNumber",
          label: "设备序列号",
          width: 100,
          show: true,
        },
        {
          prop: "ip",
          label: "设备IP",
          width: 150,
          show: true,
        },
        {
          prop: "deviceName",
          label: "设备名称",
          show: true,
          width: 100,
        },
        {
          prop: "state",
          label: "运行状态",
          width: "100",
          show: true,
        },

        // {
        //   prop: "isassociated",
        //   label: "是否关联",
        //   width: "100",
        //   show: true,
        // },
        {
          prop: "parkName",
          label: "园区/厂区名称",
          width: 250,
          show: true,
        },

        {
          prop: "buildingName",
          label: "建筑名称",
          width: 150,
          show: true,
        },

        {
          prop: "floor",
          label: "楼层",
          width: 60,
          show: true,
        },
        {
          prop: "areaName",
          label: "区域名称",
          width: 150,
          show: true,
        },

        {
          prop: "longitude",
          label: "设备经度X",
          width: 150,
          show: false,
        },
        {
          prop: "latitude",
          label: "设备维度Y",
          width: "100",
          show: false,
        },
        {
          prop: "altitude",
          label: "设备维度Z",
          width: "100",
          show: false,
        },

        {
          prop: "comment",
          label: "备注",
          width: "100",
          show: true,
        },
        {
          prop: "weight",
          label: "权重",
          width: "100",
          show: false,
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
      associatedList: [
        {
          label: "全部",
          value: " ",
        },
        {
          label: "是",
          value: "true",
        },
        {
          label: "否",
          value: "false",
        },
      ],
      historyDisabled: false,
      waringDisabled: false,
      disableFlag: false,
      loading: false,
      // 监控室
      openFlag: true,
      resetSelection: false, // 是否清空选择项
      // 新增/编辑
      showAdd: false,
      // 批量导入
      showImport: false,
      // 设备列表
      tableData: [],
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
      // ip列表
      ipList: [],
      type: "",
      title: "",
      // 搜索按钮数据接受
      deviceList: {
        parkName: "",
        buildingName: "",
        floor: "",
        areaName: "",
        serialNumber: "",
        ip: "",
        state: "",
        deviceName: "",
      },
      floor: "",
      areaName: "",
      buildingName: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      row: {},
      warningData: [],
      multipleSelection: [],
      loadData: false,
    };
  },
  created() {
    this.getShowArr();
    this.getParkNameList();
    this.getSerialnumberList();
    this.getAreaName();
    // this.getBuildingNameList();
    // this.getFloorList();
    this.getIpList();
    this.getStatusList();
    this.getDeviceList(this.deviceList);
    this.judgeRoute();
  },
  mounted() {
    let that = this;
    window.addEventListener("setItemEvent", function (e) {
      if (e.key === "noticeNum") {
        !that.openFlag && that.fetchData(1, 100);
      }
    });
    this.$bus.$emit("monitoringRoom", "");
    this.$bus.$on("showDeviceDefault", (flag) => {
      this.openFlag = flag;
    });
    this.$bus.$on("resetSelection", (flag) => {
      this.resetSelection = flag;
    });
  },
  methods: {
    areaChange(val) {
      if (val === "全部") {
        this.deviceList.areaName = "";
      } else {
        this.deviceList.areaName = val;
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
        // console.log(`开始移动的位置 ${this.dragState.startIndex}`)
        // 给当前要拖动列的th设置class
        // document.querySelectorAll('.drag_table table thead tr th')[this.dragState.startIndex].className += ' ' + 'dragging_column';
        // 给拖动时的虚拟容器添加宽高
        // let table = document.getElementsByClassName('drag_table')[0]
        // let virtual = document.getElementsByClassName('virtual')
        // 设置新插入的span.virtual的标签 每一列的宽度、高度
        // for (let item of virtual) {
        //     item.style.height = table.clientHeight - 1 + 'px'
        //     item.style.width = item.parentElement.parentElement.clientWidth + 'px'
        // }
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
    judgeRoute() {
      getMenu().then((res) => {
        let historyArr = [];
        let warningArr = [];
        //判断设备管理是否有历史文件
        res.result.map((element) => {
          if (element.name === "monitoringData") {
            historyArr.push(element.name);
          }
          if (element.name === "earlyWarning") {
            warningArr.push(element.name);
          }
        });
        //dataCenter和monitoringData存在
        if (historyArr.indexOf("monitoringData") !== -1) {
          this.historyDisabled = false;
        } else {
          this.historyDisabled = true;
        }
        //AI和earlyWarning存在
        if (warningArr.indexOf("earlyWarning") !== -1) {
          this.waringDisabled = false;
        } else {
          this.waringDisabled = true;
        }
      });
    },
   
    count(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    fetchData(current, limit) {
      const params = { state: "待处理", limit, current };
      if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))['aiHorizon']) {
        api
          .alarmlistBacklog(params)
          .then((res) => {
            this.warningData = res.result && res.result.list;
            this.loadData = true;
            this.multipleSelection.map((item) => {
              !item.warningData && (item.warningData = []);
              item.current = 1;
              this.warningData.map((j) => {
                if (item.id === j.device.id) {
                  item.warningData.push(j);
                }
              });
            });
          })
          .catch((res) => {
            this.warningData = [];
            this.loadData = true;
          });
      }
    },
    getStatusList() {
      stateList().then((res) => {
        this.statusList = res.result;
      });
    },
    getIpList() {
      ipList().then((res) => {
        this.ipList = res.result;
      });
    },
    getFloorList(id) {
      let params = {
        id: id,
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
        parkName: this.deviceList.parkName,
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
        parkName: this.deviceList.parkName,
        buildingName: this.deviceList.buildingName,
        floor: this.deviceList.floor,
        current: 1,
        limit: 9999,
      };
      getAreanameList(params).then((res) => {
        if (res.result && res.result.list) {
          const areaNameList = [];
           if(res.result.list.length !== 0){
             areaNameList.push({
               name: "全部",
               id: "2342342342342",
              });
           }
          
          this.areaNameList = res.result.list.map((item) => {
            areaNameList.push({
              name: item.name,
              id: item.id,
            });
          });
          this.areaNameList = areaNameList;
        }
      });
    },

    parkChange() {
      this.areaName = "";
      this.buildingName = "";
      this.floor = "";
      this.deviceList.buildingName = "";
      this.deviceList.floor = "";
      this.deviceList.areaName = "";
      this.floorList = [];
      this.getBuildingNameList();
      this.getAreaName();
    },

    buildingChange(val) {
      if (val === "全部") {
        this.deviceList.areaName = "";
        this.deviceList.floor = "";
        this.floorList = [];
        this.floor = ''
        this.areaName = ''
        this.deviceList.buildingName = '';
      } else {
        this.deviceList.buildingName = val;
        let id = "";
        this.floor = ''
        this.buildingNameList.map((element) => {
          if (val === element.buildingName) {
            id = element.id;
          }
        });
        this.areaName = ''
        this.floorList = [];
        this.deviceList.areaName = "";
        this.deviceList.floor = "";
        this.getFloorList(id);
        this.getAreaName();
      }
    },

    floorChange(val) {
      if (val === "全部") {
        this.deviceList.floor = "";
      } else {
        this.deviceList.floor = val;
      }
      this.areaName = ""
      this.deviceList.areaName = "";
      this.getAreaName();
    },

    getSerialnumberList() {
      serialnumberList().then((res) => {
        this.serialNumberList = res.result;
      });
    },
    // 设备列表
    getDeviceList(params) {
      this.loading = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.current = current;
      pageList(params).then((res) => {
        this.total = res.result.total;
        res.result.list.map((element) => {
          if (element.isAssociated) {
            element.isassociated = "是";
          } else {
            element.isassociated = "否";
          }
        });
        this.tableData = res.result.list;
        this.loading = false;
      });
    },
    // 搜索
    handleCheck() {
     this.$refs['form'].validate((valid) => {
      if (valid) {
      this.currentPage = 1;
      this.pageSize = 10;
      this.getDeviceList(this.deviceList);
      }
      })
    },
    // 清空
    handleReset() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.deviceList = {
        parkName: "",
        buildingName: "",
        floor: "",
        areaName: "",
        serialNumber: "",
        ip: "",
        state: "",
        deviceName: "",
        isAssociated: "",
      };
      this.floor = "";
      this.areaName = "";
      this.buildingName = "";

      this.floorList = [];
      this.buildingNameList = [];
      this.getAreaName();
      this.getDeviceList(this.deviceList);
    },
    // 历史文件
    handleHistoryFile(row) {
      this.$router.replace({
        name: "monitoringData",
        query: { deviceId: row.id },
      });
    },
    // 预警事件
    handleToEaryWaring(row) {
      this.$router.push({ name: "earlyWarning", query: { deviceId: row.id } });
    },
    // 编辑
    handleEdit(row, val) {
      this.disableFlag = true;
      this.row = JSON.parse(JSON.stringify(row));
      this.type = "edit";
      this.title = val;
      this.showAdd = true;
    },
    handleDeviceSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getDeviceList(this.deviceList);
    },
    handleDeviceCurrentChange(val) {
      this.currentPage = val;
      this.getDeviceList(this.deviceList);
    },
    // 删除
    handleDelete(row) {
      this.$confirm("确定删除后当前内容将无法找回，请谨慎操作！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading=true
          const params = { id: row.id };
          deviceDelete(params).then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getDeviceList(this.deviceList);
            this.getParkNameList();
            this.getSerialnumberList();
            this.getAreaName();
            // this.getBuildingNameList();
            // this.getFloorList();
            this.getIpList();
            this.getStatusList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.resetSelection = false;
    },
    // 监控室
    openMonitoringRoom() {
      if (this.resetSelection) {
        this.multipleSelection = [];
      }
      if (this.multipleSelection.length === 0) {
        this.$msgbox({
          title: "切换监控室模式",
          message: "监控室模式至少选择一个摄像头！",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        });
      } else if (this.multipleSelection.length > 10) {
        this.$msgbox({
          title: "切换监控室模式",
          message: "监控室模式最多选择10路摄像头！",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        });
      } else {
        this.fetchData(1, 100);
        this.$bus.$emit("monitoringRoom", "监控室");
        this.openFlag = false;
      }
    },

    // 新增
    handleAdd(val) {
      this.disableFlag = false;
      this.title = val;
      this.type = "add";
      this.showAdd = true;
    },
    // 批量导入
    handleImport() {
      this.showImport = true;
    },
    closeCallback(aa) {
      if (aa === "open") {
        this.getParkNameList();
        this.getSerialnumberList();
        this.getAreaName();
        this.getIpList();
        this.getStatusList();
        this.currentPage = 1;
        this.pageSize = 10;
        this.getDeviceList(this.deviceList);
      } else {
        this.showImport = false;
      }
    },
    closeCallback1(tag) {
      if (tag === "yes") {
        this.showAdd = false;
        this.loading=true
        this.getParkNameList();
        this.getSerialnumberList();
        this.getAreaName();
        // this.getBuildingNameList();
        // this.getFloorList();
        this.getIpList();
        this.getStatusList();
        this.currentPage = 1;
        this.pageSize = 10;
        this.getDeviceList(this.deviceList);
      } else {
        this.showAdd = false;
      }
    },
  },
};
</script>
<style lang="scss">
.el-message-box {
  .el-message-box__header {
    font-size: 24px;
    font-weight: 500;
    color: #0a1933;
    line-height: 36px;
  }
  .el-message-box__message {
    // text-align: center;
    font-size: 24px;
    font-weight: 400;
    color: #0a1933;
    line-height: 36px;
  }
  .el-message-box__content {
    padding: 30px 15px;
  }
}
.el-message-box__message p {
  font-size: 16px;
}
</style>
<style lang="scss" scoped>
/deep/ .el-dropdown-menu {
  z-index: 100 !important;
  left: 0 !important;
}
/deep/ .el-select-dropdown {
  z-index: 10 !important;
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
  height: 100%;
  .buttonDisable {
    color: #aaa;
  }
  .deviceContent {
    /deep/.el-select{
      width:100% !important;
    }
    /deep/ .el-table__fixed::before {
      width: 0;
    }
    //width: 1572px;
    width: 97%;
    margin: 24px;
    padding: 24px 40px;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
    .form_bottom {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
    }
    .form_br {
      width: 100%;
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
      .historyFile {
        font-size: 14px;
      }
      .historyFile1 {
        font-size: 14px;
        margin-left: 8px;
      }
      width: 100%;
      // width: 1492px;
    }
    .form_Devicepg {
      height: 40px;
      margin-top: 24px;
      margin-right: 0;
    }
  }
}
</style>
