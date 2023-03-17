<template>
  <div class="sceneContainer">
      <div class="titleStyle">{{title}}</div>
      <div class="form_br"></div>
      <div style="overflow: auto" :style="{ maxHeight: `${screenHeight1}px` }">
        <el-form
          :inline="true"
          :rules="rules"
          :model="rulesForm"
          ref="rulesForm"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="监管场景">
            <el-input
              maxlength="50"
              v-model="rulesForm.name"
              placeholder="涂漆车间防火"
            ></el-input>
          </el-form-item>

          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="添加设备" name="first">
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-top: 10px; margin-bottom: 10px"
                  @click="handleAddDevice"
                  >添加</el-button
                >
                <el-table
                  max-height="408"
                  v-loading="loading"
                  ref="multipleTableDeviceOuter"
                  :data="tableData"
                  style="width: 100%"
                  tooltip-effect="dark"
                  :header-cell-style="{ 'font-size': '16PX' }"
                  :cell-style="{ 'font-size': '15PX' }"
                >
                  <el-table-column type="index" label="编号" width="60">
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="parkName"
                    label="园区/厂区名称"
                    width="150"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.parkName ? scope.row.parkName : "--" }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="buildingName"
                    label="建筑名称"
                  >
                    <template slot-scope="scope">
                      {{
                        scope.row.buildingName ? scope.row.buildingName : "--"
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="floor"
                    label="楼层"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.floor ? scope.row.floor : "--" }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="areaName"
                    label="区域名称"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.areaName ? scope.row.areaName : "--" }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="deviceName"
                    label="设备名称"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.deviceName ? scope.row.deviceName : "--" }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="state"
                    label="运行状态"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.state ? scope.row.state : "--" }}
                    </template>
                  </el-table-column>

                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="handleDelete(scope)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="添加算法" name="second">
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-top: 10px; margin-bottom: 10px"
                  @click="handleAddAlgorithm"
                  >添加</el-button
                >
                <el-table
                  max-height="408"
                  ref="multipleTableAlgorithmOuter"
                  :data="tableData1"
                  style="width: 100%"
                  tooltip-effect="dark"
                  :header-cell-style="{ 'font-size': '16PX' }"
                  :cell-style="{ 'font-size': '15PX' }"
                >
                  <el-table-column type="index" label="编号" width="60">
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="name"
                    label="算法名称"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.state === '失效'"
                        style="color: red"
                      >
                        {{ scope.row.name ? scope.row.name : "--" }}</span
                      >
                      <span v-else>
                        {{ scope.row.name ? scope.row.name : "--" }}</span
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="scene"
                    label="智能算法请求场景"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.scene ? scope.row.scene : "--" }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="description"
                    label="功能概述"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.description ? scope.row.description : "--" }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="state"
                    label="状态"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.state === '正常'">
                        {{ scope.row.state ? scope.row.state : "--" }}</span
                      >
                      <span v-else style="color: red">
                        {{ scope.row.state ? scope.row.state : "--" }}</span
                      >
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="handleDelete1(scope)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="预警消息" name="third">
              <div>
                <el-form 
                 style="margin-left:25px"
                  :inline="true"
                  :rules="rules1"
                  :model="formList"
                  ref="rules1"
                  class="demo-form-inline"
                  size="mini"
                >
                  <el-form-item label="预警名称">
                    <el-select
                      v-model="formList.n"
                      placeholder="请选择"
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
                  <div
                    style="
                      display: inline-block;
                      height: 33px;
                      line-height: 33px;
                      letter-spacing: 3px;
                      color: #bcc1c8;
                      font-size: 12px;
                    "
                  >
                    {{ this.content }}
                  </div>
                </el-form>
                <el-form
                  :inline="true"
                  :rules="rulesTemplate"
                  :model="formTemplateList"
                  ref="rules1"
                  class="demo-form-inline"
                  size="mini"
                >
                  <el-form-item label="算法运行时间">
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
                </el-form>
                <!-- <div>添加预警时间</div> -->
                <!-- <el-button
                  type="primary"
                  size="mini"
                  style="margin-top: 10px; margin-bottom: 10px"
                  @click="handleTime"
                  >添加</el-button
                > -->
                <el-form
                  ref="form"
                  :model="form"
                  :rules="formRules"
                  :inline="true"
                  class="demo-ruleForm"
                >
                  <div v-for="(item, index) in form.dynamicItem" :key="index">
                    <el-form-item label="">
                      <el-form-item>
                        <el-date-picker
                          v-model="item.time1"
                          type="daterange"
                          range-separator="~"
                          style="color: #878f9c"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                        >
                        </el-date-picker>
                      </el-form-item>

                      <span style="color: #dcdcde"> ~ </span>
                      <el-form-item
                        :prop="'dynamicItem.' + index + '.time2'"
                        :rules="{
                          type: 'array',
                          required: true,
                          message: '请选择时间区间',
                          fields: {
                            0: {
                              type: 'string',
                              required: true,
                              message: '请选择开始时间',
                            },
                            1: {
                              type: 'string',
                              required: true,
                              message: '请选择结束时间',
                            },
                          },
                        }"
                      >
                        <el-time-picker
                          is-range
                          format="HH:mm"
                          value-format="HH:mm"
                          v-model="item.time2"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          placeholder="选择时间范围"
                        >
                        </el-time-picker>
                      </el-form-item>

                      <i
                        class="iconfont icon-delete_fill text"
                        @click="deleteItem(item, index)"
                      ></i>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="添加通知对象" name="fourth">
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-top: 10px; margin-bottom: 10px"
                  @click="handleAddObject"
                  >添加</el-button
                >
                <el-table
                  max-height="408"
                  ref="multipleTableObjectOuter"
                  :data="tableData2"
                  style="width: 100%"
                  tooltip-effect="dark"
                  :header-cell-style="{ 'font-size': '16PX' }"
                  :cell-style="{ 'font-size': '15PX' }"
                >
                  <el-table-column type="index" label="编号" width="60">
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="organization"
                    label="所属机构"
                  >
                    <template slot-scope="scope">
                      {{
                        scope.row.organization ? scope.row.organization : "--"
                      }}
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    show-overflow-tooltip
                    prop="department"
                    label="部门"

                >
                  <template slot-scope="scope">
                    {{scope.row.department?scope.row.department:'--'}}
                  </template>
                </el-table-column> -->
                  <el-table-column
                    show-overflow-tooltip
                    prop="name"
                    label="姓名"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.name ? scope.row.name : "--" }}
                    </template>
                  </el-table-column>

                  <el-table-column
                    show-overflow-tooltip
                    prop="phone"
                    label="电话"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.phone ? scope.row.phone : "--" }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="email"
                    label="邮箱"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.email ? scope.row.email : "--" }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="handleDelete2(scope)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
      <div class="bottonStyle">
      <!-- <div slot="footer" class="dialog-footer"> -->
        <el-button size="mini" @click="Close">取 消</el-button>
        <el-button
          v-if="activeName !== 'first'"
          size="mini"
          type="primary"
          @click="handlePrevious()"
          >上一步</el-button
        >
        <el-button
          v-if="activeName !== 'fourth'"
          size="mini"
          type="primary"
          @click="handleNext()"
          >下一步</el-button
        >
        <!-- <el-button  v-if="activeName==='fourth'&&!buttonConfirm"  size="mini" type="primary" @click="handleNext()">完成11</el-button>
        <el-button v-if="activeName==='fourth'&&!buttonConfirm" size="mini" type="primary" @click="handleScene()" :loading="loading1">完 成</el-button> -->
        <el-button
          v-if="activeName === 'fourth'"
          size="mini"
          type="primary"
          @click="handleNext()"
          :loading="loading1"
          >完 成</el-button
        >
        </div>
      <!-- </div> -->
    <addDevice
      :tableDataFlag="tableData"
      :editDevice="editDevice"
      :removeIndex="removeIndex"
      :visible="showAddDevice"
      @close-callback1="closeCallback1"
    />
    <addAlgorithm
      :tableDataFlag1="tableData1"
      :editAlgorithm="editAlgorithm"
      :removeIndex1="removeIndex1"
      :visible="showAddAlgorithm"
      @close-callback2="closeCallback2"
    />
    <addObject
      :tableDataFlag2="tableData2"
      :editObject="editObject"
      :removeIndex2="removeIndex2"
      :visible="showAddObject"
      @close-callback3="closeCallback3"
    />
  </div>
</template>

<script>
import addDevice from "./addDevice";
import addAlgorithm from "./addAlgorithm";
import addObject from "./addObject";
import { warningList } from "../../../../api/ai/warningManage";
import {
  sceneQueryDetails,
  sceneSave,
  sceneUpdateDetails,
  getListActiveTemplate,
} from "../../../../api/ai/scenarioManagement";
export default {
  components: { addDevice, addAlgorithm, addObject },
  name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    control: {},
    type: {
      type: String,
      default: "add",
    },
    sceneId: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // buttonConfirm:false,
      activeTemplateList: [],
      formTemplateList: {
        activeTemplate: null,
      },
      loading1: false,
      screenHeight1: document.body.clientHeight - 300,
      screenHeight: document.body.clientHeight - 340,
      windowWidth: document.documentElement.clientWidth,
      currentPage: 1,
      pageSize: 999,
      deviceList: {
        parkName: "",
        buildingName: "",
        floor: "",
        areaName: "",
        deviceName: "",
      },
      editDevice: [],
      editAlgorithm: [],
      editObject: [],
      rules: {
        // name: [
        //   { required: true, message: "请输入监管场景", trigger: "blur" }
        // ],
      },
      rules1: {
        // n: [
        //   { required: true, message: "请选择预警名称", trigger: "blur" }
        // ],
      },
      rulesTemplate: {
        // n: [
        //   { required: true, message: "请选择预警名称", trigger: "blur" }
        // ],
      },
      rulesForm: {
        name: "",
        time: "",
        warningId: "",
        algIds: "",
        userIds: "",
        deviceIds: "",
        offlineNotification: 0,
        isActive: 0,
        state: "",
      },
      content: "",
      form: {
        dynamicItem: [
          // {
          //   time1:'',
          //   time2:''
          // }
        ],
      },
      formList: {},
      formRules: {},
      id: "",
      a: "",
      removeIndex: "",
      removeIndex1: "",
      removeIndex2: "",
      loading: false,
      repoList: [],
      activeName: "first",
      tableData: [],
      tableData1: [],
      tableData2: [],
      time: [],
      showAddDevice: false,
      showAddAlgorithm: false,
      showAddWaring: false,
      showAddObject: false,
      warningList: [],
      deviceIds: [],
      algIds: [],
      userIds: [],
      deviceIdsFirst: [],
      algNameFlag: [],
      offlineNotification: false,
      isActive: false,
    };
  },
  watch: {
    // deviceIds(){
    //   if(this.deviceIds.length===0||this.algIds.length===0||this.userIds.length===0||this.rulesForm.name===''||this.formList.n===''){
    //     this.buttonConfirm = false
    //   }else{
    //     // this.buttonConfirm = true
    //   }
    // },
    //  algIds(){
    //   if(this.deviceIds.length===0||this.algIds.length===0||this.userIds.length===0||this.rulesForm.name===''||this.formList.n===''){
    //     this.buttonConfirm = false
    //   }else{
    //     // this.buttonConfirm = true
    //   }
    // },
    //  userIds(){
    //   if(this.deviceIds.length===0||this.algIds.length===0||this.userIds.length===0||this.rulesForm.name===''||this.formList.n===''){
    //     this.buttonConfirm = false
    //   }else{
    //     // this.buttonConfirm = true
    //   }
    // },
    // rulesForm:{
    //   handler(newVal, oldVal) {
    // 	if(this.deviceIds.length===0||this.algIds.length===0||this.userIds.length===0||this.rulesForm.name===''||this.formList.n===''){
    //     this.buttonConfirm =false
    //   }else{
    //     // this.buttonConfirm =true
    //   }
    // },
    // immediate: true,
    //  	deep: true

    // },
    // formList:{
    //   handler(newVal, oldVal){
    //   if(this.deviceIds.length===0||this.algIds.length===0||this.userIds.length===0||this.rulesForm.name===''||this.formList.n===''){
    //     this.buttonConfirm =false
    //   }else{
    //     // this.buttonConfirm =true
    //   }

    //   },
    //   immediate:true,
    //   deep:true

    // },
    visible() {
     
    },
  },
  mounted() {
     if (this.type === "edit") {
        this.activeName !== "first";
        if (this.control.flag) {
          const params = {
            id: this.sceneId,
          };
          sceneQueryDetails(params).then((res) => {
            this.formTemplateList.activeTemplate = res.result.timeTemplateId;
            console.log(this.formTemplateList.activeTemplate,'this.formTemplateList.activeTemplate')
            this.isActive = res.result.isActive;
            this.offlineNotification = res.result.offlineNotification;
            this.id = res.result.id;
            this.rulesForm.name = res.result.name;
            this.formList.n = res.result.warning.id;

            this.warningList.map((item) => {
              if (item.id === res.result.warning.id) {
                if (item.notificationType !== "") {
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
                      item.type +
                      "|" +
                      item.level +
                      "|" +
                      item.notificationType;
                  }
                } else {
                  if (item.needConfirm === 1) {
                    this.a = "人工二次确认";
                    this.content = item.type + "|" + item.level + "|" + this.a;
                  } else if (item.needConfirm === 0) {
                    this.a = "";
                    this.content = item.type + "|" + item.level;
                  }
                }
              }
            });

            this.editDevice = res.result.devices;
            this.tableData = res.result.devices;
            this.deviceIds = [];
            this.tableData.map((item) => {
              this.deviceIds.push(item.id);
            });

            this.algIds = [];
            this.editAlgorithm = res.result.algorithms;
            this.tableData1 = res.result.algorithms;
            this.tableData1.map((item) => {
              this.algIds.push(item.id);
            });
            this.userIds = [];
            this.editObject = res.result.handlers;
            this.tableData2 = res.result.handlers;
            res.result.handlers.map((val) => {
              val.organization = [];
              if (val.organizations && val.organizations.length !== 0) {
                val.organizations.map((val2) => {
                  val.organization.push(val2.organizationName);
                });
              }
              val.organization = val.organization.join(",");
            });
            this.tableData2.map((item) => {
              this.userIds.push(item.id);
            });

            this.form.dynamicItem = [];
            // 对返回预警时间进行处理，用于显示
            res.result.time &&
              res.result.time.map((item) => {
                this.form.dynamicItem.push({
                  time1: [item.yearMonthDayStart, item.yearMonthDayEnd],
                  time2: [item.hourMinuteStart, item.hourMinuteEnd],
                });
              });
          });
        }
      } else if (this.type === "add") {
        this.deviceIds = [];
        this.algIds = [];
        this.userIds = [];
        this.activeName !== "first";
        this.rulesForm = {
          name: "",
        };
        this.formTemplateList.activeTemplate = null
        this.buttonConfirm = false;
        this.editObject = [];
        this.editAlgorithm = [];
        this.editDevice = [];
        this.tableData = [];
        this.tableData1 = [];
        this.tableData2 = [];
        this.formList = {
          n: "",
        };
        this.form.dynamicItem = [];
      }
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight - 300;
        that.screenHeight1 = window.screenHeight;
      })();
    };
  },
  created() {
    warningList().then((res) => {
      this.warningList = res.result;
    });
    getListActiveTemplate().then((res) => {
      this.activeTemplateList = res.result;
      // console.log(this.activeTemplateList)
    });
  },
  methods: {
    handleChangeActiveTemplateList(val) {
      //  this.activeTemplate = val
    },
    handlePrevious() {
      // this.buttonConfirm = false
      if (this.activeName === "second") {
        this.activeName = "first";
      } else if (this.activeName === "third") {
        this.activeName = "second";
      } else if (this.activeName === "fourth") {
        this.activeName = "third";
      }
    },
    handleNext() {
      if (this.activeName === "first") {
        if (this.deviceIds.length === 0) {
          this.$message({
            message: "设备不能为空!",
            type: "warning",
          });
          this.activeName = "first";
        } else {
          this.activeName = "second";
        }
      } else if (this.activeName === "second") {
        if (this.algIds.length === 0) {
          this.$message({
            message: "算法不能为空!",
            type: "warning",
          });
          this.activeName = "second";
        } else {
          this.activeName = "third";
        }
      } else if (this.activeName === "third") {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.formList.n === "") {
              this.$message({
                message: "预警名称不能为空!",
                type: "warning",
              });
              this.activeName = "third";
            } else {
              if (this.formTemplateList.activeTemplate === null) {
                this.$message({
                  message: "算法运行时间不能为空!",
                  type: "warning",
                });
                this.activeName = "third";
              }else{
                this.activeName = "fourth";
              }
              // this.activeName = "fourth";
            }
          } else {
            // this.activeName = "fourth";
          }
        });

        // if(this.formList.n===''){
        //      this.$message({
        //                 message: '预警名称不能为空!',
        //                 type: 'warning'
        //               });
        //   this.activeName = 'third'
        // }else{
        //   this.activeName = 'fourth'
        // }
      } else if (this.activeName === "fourth") {
        if (
          this.rulesForm.name === "" &&
          this.userIds.length !== 0 &&
          this.algIds.length !== 0 &&
          this.deviceIds.length !== 0 &&
          this.formList.n !== ""&&
          this.formTemplateList.activeTemplate!==null
        ) {
          this.$message({
            message: "监管场景名称不能为空!",
            type: "warning",
          });
        } else if (
          this.rulesForm.name !== "" &&
          this.userIds.length === 0 &&
          this.algIds.length !== 0 &&
          this.deviceIds.length !== 0 &&
          this.formList.n !== ""&&
          this.formTemplateList.activeTemplate!==null
        ) {
          this.$message({
            message: "通知对象不能为空!",
            type: "warning",
          });
        } else if (
          this.rulesForm.name === "" &&
          this.userIds.length === 0 &&
          this.algIds.length !== 0 &&
          this.deviceIds.length !== 0 &&
          this.formList.n !== ""&&
          this.formTemplateList.activeTemplate!==null
        ) {
          this.$message({
            message: "通知对象、监管场景名称不能为空!",
            type: "warning",
          });
        } else if (
          this.rulesForm.name !== "" &&
          this.userIds.length !== 0 &&
          this.algIds.length !== 0 &&
          this.deviceIds.length == 0 &&
          this.formList.n !== ""&&
          this.formTemplateList.activeTemplate!==null
        ) {
          this.$message({
            message: "设备不能为空!",
            type: "warning",
          });
        } else if (
          this.rulesForm.name !== "" &&
          this.userIds.length !== 0 &&
          this.algIds.length === 0 &&
          this.deviceIds.length !== 0 &&
          this.formList.n !== ""&&
          this.formTemplateList.activeTemplate!==null
        ) {
          this.$message({
            message: "算法不能为空!",
            type: "warning",
          });
        } else if (
          this.rulesForm.name !== "" &&
          this.userIds.length !== 0 &&
          this.algIds.length !== 0 &&
          this.deviceIds.length !== 0 &&
          this.formList.n === ""&&
          this.formTemplateList.activeTemplate!==null
        ) {
          this.$message({
            message: "预警名称不能为空!",
            type: "warning",
          });
        } else if (
          this.rulesForm.name === "" &&
          this.userIds.length === 0 &&
          this.algIds.length === 0 &&
          this.deviceIds.length === 0 &&
          this.formList.n === ""&&
          this.formTemplateList.activeTemplate===null
        ) {
          this.$message({
            message: "监管场景名称、设备、算法、通知对象、预警名称、算法运行时间都不能为空!",
            type: "warning",
          });
        } else if(
           this.rulesForm.name !== "" &&
           this.userIds.length !== 0 &&
           this.algIds.length !== 0 &&
           this.deviceIds.length !== 0 &&
           this.formList.n !== ""&&
           this.formTemplateList.activeTemplate===null
        ){
           this.$message({
            message: "算法运行时间不能为空!",
            type: "warning",
          });

        }else{
           this.handleScene(); //
        }
      } else {
        //  this.buttonConfirm  =true
      }
    },
     Close() {
      this.$message({
        message: "取消成功!",
        type: "success",
      });
      this.control.flag = false;
      // this.handleClose()
      this.content = "";
      this.activeName = "first";
      this.formList = {
        n: "",
      };
      this.rulesForm = {
        name: "",
      };
      this.time = [];
      this.form = {
        dynamicItem: [],
      };

      this.editDevice = [];
      this.editAlgorithm = [];
      this.editObject = [];
      this.tableData = [];
      this.userIds = [];
      this.tableData1 = [];
      this.deviceIds = [];
      this.tableData2 = [];
      this.algIds = [];

      this.time = [];
      this.loading1 = false;
      this.$emit("close-callback", "no");
    },
     Close1() {
    
      this.control.flag = false;
      // this.handleClose()
      this.content = "";
      this.activeName = "first";
      this.formList = {
        n: "",
      };
      this.rulesForm = {
        name: "",
      };
      this.time = [];
      this.form = {
        dynamicItem: [],
      };

      this.editDevice = [];
      this.editAlgorithm = [];
      this.editObject = [];
      this.tableData = [];
      this.userIds = [];
      this.tableData1 = [];
      this.deviceIds = [];
      this.tableData2 = [];
      this.algIds = [];

      this.time = [];
      this.loading1 = false;
      this.$emit("close-callback", "no");
    },
    handleChange(e) {
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
    },
    // 添加场景
    handleScene() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 添加场景的参数

          if (this.type === "add") {
            if (this.rulesForm.name === "") {
              this.$message({
                message: "监管场景不能为空!",
                type: "warning",
              });
            } else {
              if (this.formList.n === "") {
                this.$message({
                  message: "预警名称不能为空!",
                  type: "warning",
                });
                this.activeName = "third";
              } else {
                if (this.formTemplateList.activeTemplate==='') {
                  this.$message({
                    message: "算法运行时间不可为空!",
                    type: "warning",
                  });
                  this.activeName = "third";
                } else {
                  if (
                    this.deviceIds.length === 0 ||
                    this.userIds.length === 0
                  ) {
                    if (
                      this.deviceIds.length === 0 &&
                      this.algIds.length !== 0
                    ) {
                      this.$message({
                        message: "设备不能为空!",
                        type: "warning",
                      });
                    } else if (
                      this.deviceIds.length !== 0 &&
                      this.algIds.length === 0
                    ) {
                      this.$message({
                        message: "算法不能为空!",
                        type: "warning",
                      });
                    } else if (
                      this.deviceIds.length !== 0 &&
                      this.algIds.length !== 0
                    ) {
                      this.$message({
                        message: "通知不能为空!",
                        type: "warning",
                      });
                    } else if (
                      this.deviceIds.length === 0 &&
                      this.algIds.length === 0
                    ) {
                      this.$message({
                        message: "设备、算法不能为空!",
                        type: "warning",
                      });
                    }
                  } else {
                    // 对预警时间去重及数据格式的处理
                    let timeData = [];
                    timeData = this.form.dynamicItem;
                    timeData.map((item) => {
                      this.time.push({
                        yearMonthDayStart: item.time1[0],
                        yearMonthDayEnd: item.time1[1],
                        hourMinuteStart: item.time2[0],
                        hourMinuteEnd: item.time2[1],
                      });
                    });
                    ///

                    if (!this.loading1) {
                      this.loading1 = true;
                      setTimeout(() => {
                        this.loading1 = false;
                      }, 3000);
                      const params = {
                        name: this.rulesForm.name,
                        deviceIds: this.deviceIds,
                        userIds: this.userIds,
                        algIds: this.algIds,
                        warningId: this.formList.n,
                        timeTemplateId: this.formTemplateList.activeTemplate,
                        // time: this.time,
                      };
                      sceneSave(params)
                        .then(() => {
                          this.$message({
                            message: "添加成功",
                            type: "success",
                          });
                          // this.buttonConfirm = false
                          // this.handleClose()
                          this.content = "";
                          this.activeName = "first";
                          this.formList.n = "";
                          this.rulesForm.name = "";
                          this.time = [];
                          this.form.dynamicItem = [];

                          this.editDevice = [];
                          this.editAlgorithm = [];
                          this.editObject = [];
                          this.tableData = [];
                          this.userIds = [];
                          this.tableData1 = [];
                          this.deviceIds = [];
                          this.tableData2 = [];
                          this.algIds = [];
                          this.formTemplateList.activeTemplate = null;
                          this.time = [];
                          this.loading1 = false;
                          this.Close1()
                          this.$emit("close-callback", "yes");
                        })
                        .catch(() => {});
                    }
                  }
                }
              }
            }
          } else if (this.type === "edit") {
            if (this.rulesForm.name === "") {
              this.$message({
                message: "监管场景不能为空!",
                type: "warning",
              });
            } else {
              if (this.formList.n === "") {
                this.$message({
                  message: "预警名称不能为空!",
                  type: "warning",
                });
                this.activeName = "third";
              } else {
                if (
                  (this.deviceIds.length === 0) |
                  (this.userIds.length === 0) |
                  (this.algIds.length === 0)
                ) {
                  if (
                    this.deviceIds.length === 0 &&
                    this.algIds.length !== 0 &&
                    this.userIds.length !== 0
                  ) {
                    this.$message({
                      message: "设备不能为空!",
                      type: "warning",
                    });
                  } else if (
                    this.deviceIds.length !== 0 &&
                    this.algIds.length === 0 &&
                    this.userIds.length !== 0
                  ) {
                    this.$message({
                      message: "算法不能为空!",
                      type: "warning",
                    });
                  } else if (
                    this.deviceIds.length !== 0 &&
                    this.algIds.length !== 0 &&
                    this.userIds.length === 0
                  ) {
                    this.$message({
                      message: "通知不能为空!",
                      type: "warning",
                    });
                  } else if (
                    this.deviceIds.length === 0 &&
                    this.algIds.length === 0 &&
                    this.userIds.length === 0
                  ) {
                    this.$message({
                      message: "设备、算法不能为空!",
                      type: "warning",
                    });
                  }
                } else {
                  // 对预警时间去重及数据格式的处理
                  let timeData = [];
                  timeData = this.form.dynamicItem;
                  timeData.map((item) => {
                    this.time.push({
                      yearMonthDayStart: item.time1[0],
                      yearMonthDayEnd: item.time1[1],
                      hourMinuteStart: item.time2[0],
                      hourMinuteEnd: item.time2[1],
                    });
                  });
                  ///
                  if (!this.loading1) {
                    this.loading1 = true;
                    setTimeout(() => {
                      this.loading1 = false;
                    }, 3000);
                    const params = {
                      name: this.rulesForm.name,
                      deviceIds: this.deviceIds,
                      userIds: this.userIds,
                      algIds: this.algIds,
                      warningId: this.formList.n,
                      timeTemplateId: this.formTemplateList.activeTemplate,
                      // time: this.time,
                    };
                    params.id = this.id;
                    params.offlineNotification = this.offlineNotification;
                    params.isActive = this.isActive;
                    sceneUpdateDetails(params)
                      .then(() => {
                        this.$message({
                          message: "编辑成功",
                          type: "success",
                        });

                        //  this.buttonConfirm = false
                        // this.handleClose()
                        this.content = "";
                        this.activeName = "first";
                        this.formList.n = "";
                        this.rulesForm.name = "";
                        this.time = [];
                        this.form.dynamicItem = [];

                        this.editDevice = [];
                        this.editAlgorithm = [];
                        this.editObject = [];
                        this.tableData = [];
                        this.userIds = [];
                        this.tableData1 = [];
                        this.deviceIds = [];

                        // console.log(this.deviceIds,'编辑完成')
                        this.tableData2 = [];
                        this.algIds = [];

                        this.time = [];
                        this.loading1 = false;
                        this.$emit("close-callback", "yes");
                        this.Close1()
                      })
                      .catch(() => {
                        this.time = [];
                      });
                  }
                }
              }
            }
          }
        } else {
          this.activeName = "third";
          return false;
        }
      });
    },
    // 设备-删除
    handleDelete(scope) {
      this.$confirm(
        "确定删除后当前内容将无法找回，请谨慎操作！",
        "确认要删除这条内容吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.tableData.splice(scope.$index, 1);
          for (var i = 0; i < this.deviceIds.length; i++) {
            if (this.deviceIds[i] === scope.row.id) {
              this.deviceIds.splice(i, 1);
            }
          }
          this.removeIndex = scope.row.id;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消成功！",
          });
        });
    },
    // 算法-删除
    handleDelete1(scope) {
      this.$confirm(
        "确定删除后当前内容将无法找回，请谨慎操作！",
        "确认要删除这条内容吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.tableData1.splice(scope.$index, 1);
          for (var i = 0; i < this.algIds.length; i++) {
            if (this.algIds[i] === scope.row.id) {
              this.algIds.splice(i, 1);
            }
          }
          this.removeIndex1 = scope.row.id;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消成功！",
          });
        });
    },
    // 通知-删除
    handleDelete2(scope) {
      this.$confirm(
        "确定删除后当前内容将无法找回，请谨慎操作！",
        "确认要删除这条内容吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.tableData2.splice(scope.$index, 1);
          for (var i = 0; i < this.userIds.length; i++) {
            if (this.userIds[i] === scope.row.id) {
              this.userIds.splice(i, 1);
            }
          }
          this.removeIndex2 = scope.row.id;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消成功！",
          });
        });
    },

    handleClick(targetName, action) {
      // this.deviceIds = this.deviceIds
      // this.algIds = this.algIds
      // this.userIds = this.userIds
      // this.rulesForm.name = this.rulesForm.name
      // this.formList.n = this.formList.n
    },
    // 添加预警时间
    handleTime() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.dynamicItem.push({
            time1: "",
            time2: "",
          });
        } else {
          return false;
        }
      });
    },
    // 删除预警时间
    deleteItem(item, index) {
      this.$confirm("此操作将永久删除该时间段, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.dynamicItem.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 通知弹框
    handleAddObject() {
      this.showAddObject = true;
    },
    // 算法弹框
    handleAddAlgorithm() {
      this.showAddAlgorithm = true;
    },
    // 设备弹框
    handleAddDevice() {
      this.showAddDevice = true;
    },
    // 设备表格关闭
    closeCallback1(data) {
      this.deviceIds = [];
      this.tableData = data;
      this.tableData.map((item) => {
        this.deviceIds.push(item.id);
      });

      this.showAddDevice = false;
    },
    // 算法表格关闭
    closeCallback2(data) {
      this.algIds = [];
      this.tableData1 = data;
      this.tableData1.map((item) => {
        this.algIds.push(item.id);
      });
      this.showAddAlgorithm = false;
    },
    // 通知表格关闭
    closeCallback3(data) {
      this.userIds = [];
      this.tableData2 = data;
      this.tableData2.map((item) => {
        this.userIds.push(item.id);
      });
      this.showAddObject = false;
    },
    closeCallback() {},
    handleClose() {
      this.content = "";
      this.activeName = "first";
      this.formList.n = "";
      this.rulesForm.name = "";
      this.time = [];
      this.form.dynamicItem = [];
      this.formTemplateList.activeTemplate = null
      this.editDevice = [];
      this.editAlgorithm = [];
      this.editObject = [];
      this.tableData = [];
      this.userIds = [];
      this.tableData1 = [];
      this.deviceIds = [];
      this.tableData2 = [];
      this.algIds = [];

      this.time = [];

      this.$emit("close-callback");
    },
  },
};
</script>

<style lang="scss" scoped>
.titleStyle{
  font-size: 20px;
  margin-bottom: 20px;
}
.bottonStyle{
  margin-top: 20px;
}
.sceneContainer {
   width: 97%;
    //background:red;
    //width: 1572px;
    margin: 24px;
    padding: 24px 60px;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
  ::v-deep .el-form-item__label {
    font-size: 14px;
  }
  ::v-deep .el-tabs__item {
    //font-size: 18px;
  }
  ::v-deep .el-tabs__nav-wrap::after {
    background: white;
  }
  ::v-deep .el-range-separator {
    color: #dcdcde;
  }
  ::v-deep .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 30px;
  }
  ::v-deep .el-tabs__nav-wrap {
    background: #f7f8f9;
  }
  .text {
    margin-left: 10px;
    font-size: 20px;
    color: red;
  }
  .form_br {
    width: 100%;
    height: 1px;
    background-color: #f3f3f5;
    margin-bottom: 20px;
  }
  ::v-deep .el-dialog__body {
    padding: 0 20px;
  }
}
</style>
