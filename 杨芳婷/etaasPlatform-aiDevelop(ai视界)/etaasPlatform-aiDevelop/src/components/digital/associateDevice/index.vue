<template>
  <div class="regionWarp" v-if="show">
    <img
      class="bgImg"
      src="@/assets/digital/assets/img/region/region.png"
      alt=""
    />
    <img
      class="closeImg"
      src="@/assets/digital/assets/img/region/close.png"
      alt=""
      @click="closeDevice()"
    />
    <div class="title">关联设备</div>
    <div class="line"></div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabStyle">
        <el-tab-pane label="关联已有设备" name="first">
          <div class="device-has">
            <el-form :model="hasDeviceForm" ref="hasDeviceForm">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="deviceName" label="设备名称">
                    <div class="device-list" @click="openValue">
                      <!-- <input v-model="hasDeviceForm.deviceName" type="text" placeholder="请选择" class="deviceDetailLiSelectInput" > -->
                      <div style="margin-left: 10px">
                        {{
                          hasDeviceForm.deviceName
                            ? hasDeviceForm.deviceName
                            : "请选择"
                        }}
                      </div>
                      <i class="el-icon-arrow-down el-right"></i>
                    </div>

                    <div class="deviceDetailList" v-show="isshow">
                      <ul v-if="devices && devices.length !== 0">
                        <li
                          @click="selectChange(item.id)"
                          v-for="(item, index) in devices"
                          :key="item.index"
                        >
                          {{ item.deviceName }}
                        </li>
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            color: #ccd1df;
                          "
                        >
                          <div>共有{{ total }}条</div>
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpageafter.png"
                            class="pageImg leftPageImg"
                            @click="goLastPage()"
                            v-if="beforePage"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpage.png"
                            class="pageImg leftPageImg"
                            @click="goLastPage()"
                            v-if="!beforePage"
                          />
                          <span class="earlyWarningCurrentPage">{{
                            currentPage
                          }}</span>
                          /{{ Math.ceil(total / 5) }}&nbsp;
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpageafter.png"
                            class="pageImg rightPageImg"
                            @click="goNextPage()"
                            v-if="afterPage"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpage.png"
                            class="pageImg rightPageImg"
                            @click="goNextPage()"
                            v-if="!afterPage"
                          />
                        </div>
                      </ul>
                      <div
                        v-if="
                          JSON.stringify(devices) === '{}' ||
                          devices.length === 0
                        "
                        class="deviceDetailNoData"
                      >
                        暂无数据
                      </div>
                    </div>
                    <!-- <el-select
               v-model="hasDeviceForm.deviceName"
                placeholder="请选择" 
                :popper-append-to-body="false"
               @change="selectChange"
                >
               <el-option
                v-for="item in devices"
                 :key="item.id"
                 :label="item.deviceName"
                 :value="item.id">
        </el-option>
              </el-select> -->
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="email" label="设备序列号">
                    <el-input
                      disabled
                      v-model="hasDeviceForm.serialNumber"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="email" label="ID">
                    <el-input disabled v-model="hasDeviceForm.id"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="email" label="设备用户名">
                    <el-input
                      disabled
                      v-model="hasDeviceForm.username"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="email" label="设备密码">
                    <el-input
                      disabled
                      v-model="hasDeviceForm.password"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="24">
                  <el-form-item prop="email" label="rtsp地址">
                    <el-input
                      disabled
                      type="textarea"
                      v-model="hasDeviceForm.rtsp"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="email" label="园区/厂区">
                    <el-input
                      disabled
                      v-model="hasDeviceForm.parkName"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="email" label="建筑名称">
                    <el-input
                      disabled
                      v-model="hasDeviceForm.buildingName"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="email" label="楼层">
                    <el-input disabled v-model="hasDeviceForm.floor"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="email" label="区域名称">
                    <el-input
                      disabled
                      v-model="hasDeviceForm.areaName"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="email" label="权重">
                    <el-input
                      disabled
                      v-model="hasDeviceForm.weight"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="state" label="状态">
                    <div class="state-word">{{ hasDeviceForm.state }}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 按钮 -->
              <el-row :gutter="0">
                <el-col :span="12"> </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="关联新增设备" name="second">
          <div class="device-has">
            <el-form :model="addDeviceForm" :rules="rules" ref="addDeviceForm">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="deviceName" label="设备名称">
                    <el-input v-model="addDeviceForm.deviceName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="parkName" label="园区/厂区">
                    <div class="device-list">
                      <div style="margin-left: 10px">
                        {{
                          addDeviceForm.parkName
                        }}
                      </div>
                      <!-- <input v-model="addDeviceForm.parkName" type="text" placeholder="请选择" class="deviceDetailLiSelectInput" > -->
                      <!-- <i class="el-icon-arrow-down el-right"></i> -->
                    </div>

                    <!-- <div class="deviceDetailList" v-show="parkShow">
                      <ul v-if="parkNameList && parkNameList.length !== 0">
                        <li
                          @click="handleChangeBuilding(item)"
                          v-for="(item, index) in parkNameList"
                          :key="item.index"
                        >
                          {{ item }}
                        </li>
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            color: #ccd1df;
                          "
                        >
                          <div>共有{{ totalArea }}条</div>
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpageafter.png"
                            class="pageImg leftPageImg"
                            @click="goLastPageArea()"
                            v-if="beforePageArea"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpage.png"
                            class="pageImg leftPageImg"
                            @click="goLastPageArea()"
                            v-if="!beforePageArea"
                          />
                          <span class="earlyWarningCurrentPage">{{
                            currentPageArea
                          }}</span>
                          /{{ Math.ceil(totalArea / limitArea) }}&nbsp;
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpageafter.png"
                            class="pageImg rightPageImg"
                            @click="goNextPageArea()"
                            v-if="afterPageArea"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpage.png"
                            class="pageImg rightPageImg"
                            @click="goNextPageArea()"
                            v-if="!afterPageArea"
                          />
                        </div>
                      </ul>
                      <div
                        v-if="
                          JSON.stringify(parkNameList) === '{}' ||
                          parkNameList.length === 0
                        "
                        class="deviceDetailNoData"
                      >
                        暂无数据
                      </div>
                    </div> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="buildingName" label="建筑名称">
                    <div class="device-list" @click="buildingValue">
                      <div style="margin-left: 10px">
                        {{
                          addDeviceForm.buildingName
                            ? addDeviceForm.buildingName
                            : "请选择"
                        }}
                      </div>
                      <!-- <input v-model="addDeviceForm.parkName" type="text" placeholder="请选择" class="deviceDetailLiSelectInput" > -->
                      <i class="el-icon-arrow-down el-right"></i>
                    </div>

                    <div class="deviceDetailList" v-show="buildingShow">
                      <ul
                        v-if="buildingNameList && buildingNameList.length !== 0"
                      >
                        <li
                          @click="floorSelectChange(item.id)"
                          v-for="item in buildingNameList"
                          :key="item.id"
                        >
                          {{ item.buildingName }}
                        </li>
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            color: #ccd1df;
                          "
                        >
                          <div>共有{{ totalBuildings-1 }}条</div>
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpageafter.png"
                            class="pageImg leftPageImg"
                            @click="goLastPageBuildings()"
                            v-if="beforePageBuildings"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpage.png"
                            class="pageImg leftPageImg"
                            @click="goLastPageBuildings()"
                            v-if="!beforePageBuildings"
                          />
                          <span class="earlyWarningCurrentPage">{{
                            currentPageBuildings
                          }}</span>
                          /{{
                            Math.ceil(totalBuildings / limitBuildings)
                          }}&nbsp;
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpageafter.png"
                            class="pageImg rightPageImg"
                            @click="goNextPageBuildings()"
                            v-if="afterPageBuildings"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpage.png"
                            class="pageImg rightPageImg"
                            @click="goNextPageBuildings()"
                            v-if="!afterPageBuildings"
                          />
                        </div>
                      </ul>
                      <div
                        v-if="
                          JSON.stringify(buildingNameList) === '{}' ||
                          buildingNameList.length === 0
                        "
                        class="deviceDetailNoData"
                      >
                        暂无数据
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="floor" label="楼层">
                    <div class="device-list" @click="floorValue">
                      <div style="margin-left: 10px">
                        {{
                          addDeviceForm.floor ? addDeviceForm.floor : "请选择"
                        }}
                      </div>
                      <!-- <input v-model="addDeviceForm.parkName" type="text" placeholder="请选择" class="deviceDetailLiSelectInput" > -->
                      <i class="el-icon-arrow-down el-right"></i>
                    </div>

                    <div class="deviceDetailList" v-show="floorShow">
                      <ul v-if="floorList && floorList.length !== 0">
                        <li
                          @click="areaSelectChange(item)"
                          v-for="(item, index) in floorList"
                          :key="item.index"
                        >
                          {{ item }}
                        </li>
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            color: #ccd1df;
                          "
                        >
                          <div>共有{{ totalFloor }}条</div>
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpageafter.png"
                            class="pageImg leftPageImg"
                            @click="goLastPageFloor()"
                            v-if="beforePageFloor"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpage.png"
                            class="pageImg leftPageImg"
                            @click="goLastPageFloor()"
                            v-if="!beforePageFloor"
                          />
                          <span class="earlyWarningCurrentPage">{{
                            currentPageFloor
                          }}</span>
                          /{{ Math.ceil(totalFloor / limitFloor) }}&nbsp;
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpageafter.png"
                            class="pageImg rightPageImg"
                            @click="goNextPageFloor()"
                            v-if="afterPageFloor"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpage.png"
                            class="pageImg rightPageImg"
                            @click="goNextPageFloor()"
                            v-if="!afterPageFloor"
                          />
                        </div>
                      </ul>
                      <div
                        v-if="
                          JSON.stringify(floorList) === '{}' ||
                          floorList.length === 0
                        "
                        class="deviceDetailNoData"
                      >
                        暂无数据
                      </div>
                    </div>
                    <!-- <el-select
               v-model="addDeviceForm.floor"
                placeholder="请选择" 
                :popper-append-to-body="false"
               @change="areaSelectChange"
                >
               <el-option
                v-for="item in floorList"
                 :key="item"
                 :label="item"
                 :value="item">
        </el-option>
              </el-select> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="areaName" label="区域名称">
                    <div class="device-list" @click="areaValue">
                      <div style="margin-left: 10px">
                        {{
                          addDeviceForm.areaName
                            ? addDeviceForm.areaName
                            : "请选择"
                        }}
                      </div>
                      <!-- <input v-model="addDeviceForm.parkName" type="text" placeholder="请选择" class="deviceDetailLiSelectInput" > -->
                      <i class="el-icon-arrow-down el-right"></i>
                    </div>

                    <div class="deviceDetailList" v-show="areaShow">
                      <ul v-if="areas && areas.length !== 0">
                        <li
                          @click="SelectChangeId(item.id)"
                          v-for="(item, index) in areas"
                          :key="item.id"
                        >
                          {{ item.name }}
                        </li>
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            color: #ccd1df;
                          "
                        >
                          <div>共有{{ totalParks }}条</div>
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpageafter.png"
                            class="pageImg leftPageImg"
                            @click="goLastPageParks()"
                            v-if="beforePageParks"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpage.png"
                            class="pageImg leftPageImg"
                            @click="goLastPageParks()"
                            v-if="!beforePageParks"
                          />
                          <span class="earlyWarningCurrentPage">{{
                            currentPageParks
                          }}</span>
                          /{{ Math.ceil(totalParks / limitParks) }}&nbsp;
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpageafter.png"
                            class="pageImg rightPageImg"
                            @click="goNextPageParks()"
                            v-if="afterPageParks"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpage.png"
                            class="pageImg rightPageImg"
                            @click="goNextPageParks()"
                            v-if="!afterPageParks"
                          />
                        </div>
                      </ul>
                      <div
                        v-if="
                          JSON.stringify(areas) === '{}' || areas.length === 0
                        "
                        class="deviceDetailNoData"
                      >
                        暂无数据
                      </div>
                    </div>
                    <!-- <el-select
               v-model="addDeviceForm.areaName"
                placeholder="请选择" 
                :popper-append-to-body="false"
               @change="SelectChangeId"
                >
               <el-option
                v-for="item in areas"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
        </el-option>
              </el-select> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="24">
                  <el-form-item
                    prop="rtsp"
                    label="rtsp地址"
                    style="margin-top: 12px"
                  >
                    <el-input
                      type="textarea"
                      v-model="addDeviceForm.rtsp"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="serialNumber" label="设备序列号">
                    <el-input v-model="addDeviceForm.serialNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="ip" label="IP">
                    <el-input v-model="addDeviceForm.ip"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="username" label="设备用户名">
                    <el-input v-model="addDeviceForm.username"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="password" label="设备密码">
                    <el-input v-model="addDeviceForm.password"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="weight" label="权重">
                    <el-input v-model="addDeviceForm.weight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 按钮 -->
              <el-row :gutter="0">
                <el-col :span="12"> </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="bottom-area">1</div>
      <div
        v-if="this.activeName === 'second'"
        class="confirmButton"
        @click="submitForm('addDeviceForm')"
       >
        确定
      </div>
      <div v-else class="confirmButton" @click="bindSumbit">确定</div>
      <div class="cancelButton" @click="cancel">取消</div>
    </div>
  </div>
</template>

<script>
import {
  getBuildingParkList,
  getBuildingBuildingList,
  getBuildingFloorList,
} from "@/api/ai/constructionManagement";
import { getDevices } from "@/api/digital/config";
import * as deviceApi from "@/api/digital/device";
export default {
  props: {
    longitude: {},
    latitude: {},
    altitude: {},
  },
  data() {
    const validateIp = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入设备IP"));
      } else if (
        !/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的设备IP"));
      } else {
        callback();
      }
    };
    return {
      longitudes:'',
      latitudes:'',
      altitudes:'',
      allPoints:{},
      allMessage:{},
      // 园区厂区分页
      afterPageArea: true,
      beforePageArea: false,
      currentPageArea: 1,
      totalArea: 0,
      limitArea: 5,
      // 建筑分页
      currentPageBuildings: 1,
      afterPageBuildings: true,
      beforePageBuildings: false,
      totalBuildings: 0,
      limitBuildings: 5,
      // 楼层分页
      currentPageFloor: 1,
      afterPageFloor: true,
      beforePageFloor: false,
      totalFloor: 0,
      limitFloor: 5,
      floorId: "",
      // 设备分页
      afterPage: true,
      beforePage: false,
      currentPage: 1,
      total: 0,
      limit: 5,
      //区域分页
      afterPageParks: true,
      beforePageParks: false,
      currentPageParks: 1,
      totalParks: 0,
      limitParks: 5,

      deviceTotal: "",
      areaShow: false,
      parkShow: false,
      buildingShow: false,
      floorShow: false,
      isshow: false,
      show: false,
      // 查找区域参数
      parkName: "",
      buildingName: "",
      floor: "",
      areaId: "",
      // 建筑列表
      buildingNameList: [],
      // 园区/厂区列表
      parkNameList: [],
      // 楼层列表
      floorList: [],
      // 区域
      areas: [],
      deviceId: "",
      deviceAll: [],
      devices: [],
      pointId: "",
      activeName: "first",
      addDeviceForm: {
        deviceName: "",
        serialNumber: "",
        id: "",
        username: "",
        password: "",
        rtsp: "",
        parkName:this.$store.state.parkName,
        buildingName: "",
        floor: "",
        areaName: "",
        weight: "",
        state: "",
      },
      hasDeviceForm: {
        deviceName: "",
        serialNumber: "",
        id: "",
        username: "",
        password: "",
        rtsp: "",
        parkName: "",
        buildingName: "",
        floor: "",
        areaName: "",
        weight: "",
        state: "",
      },
      rules: {
        ip: [{ required: true, trigger: "blur", validator: validateIp }],
        username: [
          { required: true, message: "请输入设备用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入设备密码", trigger: "blur" },
        ],
        rtsp: [{ required: true, message: "请输入rtsp地址", trigger: "blur" }],
        parkName: [
          { required: true, message: "请输入园区/厂区名称", trigger: "change" },
        ],
        buildingName: [
          { required: true, message: "请输入建筑名称", trigger: "change" },
        ],
        floor: [{ required: true, message: "请输入楼层", trigger: "change" }],
        weight: [
          { required: false, message: "请输入权重", trigger: "change" },
          { pattern: /^\+?[0-9]\d*$/, message: "请输入0~9999的正整数" },
        ],
        areaName: [
          { required: true, message: "请输入区域名称", trigger: "change" },
        ],
        serialNumber: [
          { required: true, message: "请输入设备序列号", trigger: "blur" },
        ],
        deviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // this.hasDevice()
     this.$bus.$on('editBind',(data)=>{
      this.longitudes=data.center.longitude
      this.latitudes=data.center.latitude
      this.altitudes=data.center.height
    })
  },
  created() {
    this.hasDevice();
    this.getParkList();
    this.hasPageDevice();
    this.handleChangeBuilding(this.$store.state.parkName)
  },
  methods: {
    // 分页
    goLastPage() {
      if (this.currentPage > 1 && this.currentPage <= this.total) {
        this.currentPage--;
        this.beforePage = true;
        this.afterPage = false;
        this.hasPageDevice();
      }
    },
    goNextPage() {
      if (this.currentPage < this.total / 5) {
        this.currentPage++;
        this.afterPage = true;
        this.beforePage = false;
        this.hasPageDevice();
      }
    },
    // 园区厂区分页
    goLastPageArea() {
      if (this.currentPageArea > 1 && this.currentPageArea <= this.totalArea) {
        this.currentPageArea--;
        this.beforePageArea = true;
        this.afterPageArea = false;
        this.getParkList();
      }
    },
    goNextPageArea() {
      if (this.currentPageArea < this.totalArea / this.limitArea) {
        this.currentPageArea++;
        this.afterPageArea = true;
        this.beforePageArea = false;
        this.getParkList();
      }
    },

    // 建筑分页
    goLastPageBuildings() {
      if (
        this.currentPageBuildings > 1 &&
        this.currentPageBuildings <= this.totalBuildings
      ) {
        this.currentPageBuildings--;
        this.beforePageBuildings = true;
        this.afterPageBuildings = false;
        this.handleChangeBuilding(this.addDeviceForm.parkName);
      }
    },
    goNextPageBuildings() {
      if (
        this.currentPageBuildings <
        this.totalBuildings / this.limitBuildings
      ) {
        this.currentPageBuildings++;
        this.afterPageBuildings = true;
        this.beforePageBuildings = false;
        this.handleChangeBuilding(this.addDeviceForm.parkName);
      }
    },
    // 建筑分页
    goLastPageFloor() {
      if (
        this.currentPageFloor > 1 &&
        this.currentPageFloor <= this.totalFloor
      ) {
        this.currentPageFloor--;
        this.beforePageFloor = true;
        this.afterPageFloor = false;
        this.floorPages();
      }
    },
    goNextPageFloor() {
      if (this.currentPageFloor < this.totalFloor / this.limitFloor) {
        this.currentPageFloor++;
        this.afterPageFloor = true;
        this.beforePageFloor = false;
        this.floorPages();
      }
    },

    // 区域分页
    goLastPageParks() {
      if (
        this.currentPageParks > 1 &&
        this.currentPageParks <= this.totalParks
      ) {
        this.currentPageParks--;
        this.beforePageParks = true;
        this.afterPageParks = false;
        this.getAreaNameList();
      }
    },
    goNextPageParks() {
      if (this.currentPageParks < this.totalFloor / this.limitFloor) {
        this.currentPageParks++;
        this.afterPageParks = true;
        this.beforePageParks = false;
        this.getAreaNameList();
      }
    },
    // 获取园区带分页功能
    getParkList() {
      getBuildingParkList().then((res) => {
        this.parkNameList = res.result.slice(
          (this.currentPageArea - 1) * this.limitArea,
          this.currentPageArea * this.limitArea
        );
        this.totalArea = res.result.length;
      });
    },

    // 通过园区获取建筑分页功能
    handleChangeBuilding(e) {
      e=this.$store.state.parkName
      const params = {
        parkName: e,
      };
      //  parkName
      this.addDeviceForm.parkName = e;
      this.addDeviceForm.floor = "";
      this.addDeviceForm.areaName = "";
      this.addDeviceForm.areaId = "";
      this.addDeviceForm.buildingName = "";
      this.buildingNameList = [];
      this.floorList = [];
      this.areas = [];
      getBuildingBuildingList(params).then((res) => {
        this.currentPageFloor = 1;
          let arr=res.result.slice(1);
        this.buildingNameList = arr.slice(
          (this.currentPageBuildings - 1) * this.limitBuildings,
          this.currentPageBuildings * this.limitBuildings
        );
        this.totalBuildings = res.result.length;
      });
      this.parkShow = !this.parkShow;
    },
    // 通过建筑获取楼层
    floorSelectChange(e) {
      this.addDeviceForm.floor = "";
      this.addDeviceForm.areaName = "";
      this.addDeviceForm.areaId = "";
      this.floorList = [];
      this.areas = [];
      // console.log('e',e);
      this.buildingNameList &&
        this.buildingNameList.map((item) => {
          if (item.id === e) {
            this.addDeviceForm.buildingName = item.buildingName;
          }
        });
      const params = {
        id: e,
      };
      this.floorId = e;
      getBuildingFloorList(params).then((res) => {
        let floorList = [];
        floorList = res.result.slice(
          (this.currentPageFloor - 1) * this.limitFloor,
          this.currentPageFloor * this.limitFloor
        );
        this.floorList = floorList;
        this.totalFloor = res.result.length;
      });
      this.buildingShow = false;
    },

    // 原来分页的
    floorPages() {
      // console.log('e',e);
      this.buildingNameList &&
        this.buildingNameList.map((item) => {
          if (item.id === this.floorId) {
            this.addDeviceForm.buildingName = item.buildingName;
          }
        });
      const params = {
        id: this.floorId,
      };
      getBuildingFloorList(params).then((res) => {
        this.floorList = res.result.slice(
          (this.currentPageFloor - 1) * this.limitFloor,
          this.currentPageFloor * this.limitFloor
        );
        this.totalFloor = res.result.length;
      });
      this.buildingShow = false;
    },

    // 获取区域
    areaSelectChange(e) {
      this.addDeviceForm.areaName = "";
      this.addDeviceForm.areaId = "";
      this.areas = [];
      this.addDeviceForm.floor = e;
      this.getAreaNameList();
      this.floorShow = !this.floorShow;
    },
    // 获取区域
    getAreaNameList() {
      const params = {
        limit: this.limitParks,
        current: this.currentPageParks,
        buildingName: this.addDeviceForm.buildingName,
        floor: this.addDeviceForm.floor,
        parkName: this.addDeviceForm.parkName,
      };
      deviceApi
        .getAreaPageList(params)
        .then((res) => {
          const areas = [];
          this.totalParks = res.result.total;
          res.result &&
            res.result.list &&
            res.result.list.map((item) => {
              areas.push({
                id: item.id,
                name: item.name,
              });
            });
          this.areas = areas;
        })
        .catch();
    },
    checkAvailability(arr, val) {
      return arr.some(function (arrVal) {
        return val === arrVal;
      });
    },
    // 确定
    bindSumbit() {
      this.getBindPoint();
    },
    //绑定后的数据
    getDevicesList() {
      let _that = this;
      const param={
          parkName:this.$store.state.parkName
        }
      getDevices(param)
        .then(async (res) => {
          console.log('绑定后的数据',res);
          if (res.success == true && res.code == 0) {
            let devices = [];
            for (let item of res.result) {
              if (
                item.height == 0.0 &&
                item.latitude == 0.0 &&
                item.longitude == 0.0
              ) {
                continue;
              }

              devices.push(item.id);
              _that.$store.state.deviceBind = devices;
              // console.log('devicess添加成功后的摄像头', _that.$store.state.deviceBind);
            }
          }
        })
        .catch((e) => {
          _that.$message.warning(e || "获取设备列表失败！");
        });
    },
    //刷新时获取最新的设备数据，将设备id传过去
    getAllDevice() {
      const params = {
        limit: 999999,
        current: 1,
        parkName:this.$store.state.parkName
      };
      // console.log('设备列表')
      deviceApi
        .pageList(params)
        .then((res) => {
          const id = res && res.result&&res.result.list && res.result.list[0].id;
          this.getBindDevice(this.pointId, id);
          this.$store.state.deviceId = id;
          // this.$store.state.deleteCameraId._id = id;
          //  console.log('id',id);
          //  当新增成功后将设备id存储到vuex里面
        })
        .catch();
    },

    parkValue() {
      this.parkShow = !this.parkShow;
      this.areaShow = false;
      this.buildingShow = false;
      this.floorShow = false;
    },
    openValue() {
      this.currentPage = 1;
      this.hasPageDevice();
      this.isshow = !this.isshow;
    },
    areaValue() {
      this.areaShow = !this.areaShow;
      this.parkShow = false;
      this.buildingShow = false;
      this.floorShow = false;
    },
    floorValue() {
      this.floorShow = !this.floorShow;
      this.areaShow = false;
      this.parkShow = false;
      this.buildingShow = false;
    },
    buildingValue() {
      this.buildingShow = !this.buildingShow;
      this.floorShow = false;
      this.areaShow = false;
      this.parkShow = false;
    },
    // 获取园区
    // getParkList() {
    //   getBuildingParkList().then(res => {
    //     this.parkNameList = res.result;
    //     // console.log(res,'ppppp')
    //   });
    // },
    // 查找值
    selectChange(value) {
      this.deviceId = value;
      // this.$store.state.deviceId=value
      this.deviceAll &&
        this.deviceAll.map((j) => {
          if (j.id === value) {
            this.hasDeviceForm = j;
          }
        });
      this.isshow = !this.isshow;
    },

    // 绑定点位
    getBindPoint() {
      const params = {
        parkName: this.$store.state.parkName,
        longitude: this.longitude,
        latitude: this.latitude,
        altitude: this.altitude,
        componentId: "1",
      };
      deviceApi
        .bindPoint(params)
        .then((res) => {
          // console.log('resss',res);
          this.pointId = res.result;
          // console.log('result',res.result);
          if (this.activeName === "first") {
            // console.log('deviceId',this.deviceId);
            // 只有点击确定时才可以将设备id存储到vuex
            // this.$store.state.deviceId=this.deviceId
            let flag = this.checkAvailability(
              this.$store.state.deviceBind,
              this.deviceId
            );
            if (flag) {
              this.$message.warning("该设备已经被绑定,请选择其他设备进行绑定");
            } else {
              this.getBindDevice(res.result, this.deviceId);
            }
          }
        })
        .catch();
    },

    //  绑定设备
    getBindDevice(pointId, deviceId) {
      const params = {
        pointId: pointId,
        id: deviceId,
      };
      deviceApi
        .bindDevice(params)
        .then((res) => {
          //  console.log('resXXX',res)
          if (res.code===0){
            this.$message({
              message: "绑定成功",
              type: "success",
            });
            // this.$bus.$emit('resetAllDevices')
            this.$store.state.deviceId = deviceId;
            // this.$store.state.deleteCameraId._id=deviceId
            // this.getDevicesList();
            // this.$bus.$emit("cameraList");
            this.cancel();
          }
        })
        .catch();
    },

    // 获取已有的设备
    hasDevice() {
      const params = {
        limit: 999,
        current: 1,
        parkName: this.$store.state.parkName,
      };
      // console.log('设备列表')
      deviceApi
        .pageList(params)
        .then((res) => {
          const deviceAll = [];
          if (this.$store.state.deviceId) {
            res &&
              res.result &&
              res.result.list &&
              res.result.list.map((item) => {
                if (item.id === this.$store.state.deviceId) {
                  deviceAll.push(item);
                }
              });
          }
          res &&
            res.result &&
            res.result.list &&
            res.result.list.map((item) => {
              if (
                item.altitude == 0 &&
                item.latitude == 0 &&
                item.longitude == 0
              ) {
                deviceAll.push(item);
              }
            });
          this.deviceAll = deviceAll;
          if(this.deviceAll&&this.deviceAll.length>0){
          this.hasPageDevice();
          this.hasDeviceForm = this.deviceAll&&this.deviceAll[0];
          this.deviceId = this.deviceAll&&this.deviceAll[0]&&this.deviceAll[0].id;
          }
          this.show = true;
        })
        .catch();
    },

    // 分页获取数据
    hasPageDevice() {
      const devices = [];
      if(this.deviceAll&&this.deviceAll.length>0){
       this.deviceAll &&
        this.deviceAll.map((item) => {
          devices.push({
            id: item.id,
            deviceName: item.deviceName,
          });
        });
      this.total = this.deviceAll.length;
      this.devices =
        this.deviceAll &&
        this.deviceAll.slice(
          (this.currentPage - 1) * this.limit,
          this.currentPage * this.limit
        );
      }  
    },
    // 获取areaId
    SelectChangeId(e) {
      this.addDeviceForm.areaId = e;
      this.areas &&
        this.areas.map((item) => {
          if (item.id === e) {
            this.addDeviceForm.areaName = item.name;
          }
        });
      this.areaShow = !this.areaShow;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.noPoint();
        }
      });
    },

    // 添加不存在的设备
    noPoint() {
      const params = {
        parkName:this.$store.state.parkName,
        longitude: this.longitude?this.longitude:this.longitudes,
        latitude: this.latitude?this.latitude:this.latitudes,
        altitude: this.altitude?this.altitude:this.altitudes,
        // componentId: "1",
      };
       this.allPoints=params
      deviceApi
        .bindPoint(params)
        .then((res) => {
          // console.log('resss',res);
          this.pointId = res.result;
          if (res.result) {
            this.addDevice();
          }
          // console.log('result',res.result);
        })
        .catch();
    },
    // 添加设备
    addDevice() {
      const params = {
        areaName: this.addDeviceForm.areaName,
        username: this.addDeviceForm.username,
        rtsp: this.addDeviceForm.rtsp,
        parkName: this.addDeviceForm.parkName,
        buildingName: this.addDeviceForm.buildingName,
        floor: this.addDeviceForm.floor,
        areaId: this.addDeviceForm.areaId,
        deviceName: this.addDeviceForm.deviceName,
        weight: this.addDeviceForm.weight,
        pointId: this.pointId,
        ip: this.addDeviceForm.ip,
        password: this.addDeviceForm.password,
        serialNumber: this.addDeviceForm.serialNumber,
      };
      this.allMessage=params
      deviceApi
        .deviceSave(params)
        .then((res) => {
          if(res.code===0){
          // this.getDevicesList();
          // this.$bus.$emit("cameraList");
          this.hasDevice();
          this.getAllDevice();
          this.cancel();
        }}
        )
        .catch();
    },

    //取消关联已有设备
    closeDevice() {
      this.$store.state.scenceStyle = false;
      this.$store.state.deviceStyle = false;
      this.$store.state.commentStyle = false;
      this.$emit("closeDevice");
    },
    // 取消
    cancel() {
      this.addDeviceForm = {};
      this.closeDevice();
    },
    handleClick(tab, event) {
      //  console.log('activeName',this.activeName);
    },
    closeRegion() {
      this.$emit("closeRegion", true);
    },
    confirm() {
      this.$emit("confirm", true);
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.regionWarp {
  width: 570px;
  height: 545px;
  position: fixed;
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
    right: 25px;
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
    width: 520px;
    height: 1px;
    border-bottom: 0.5px dotted rgba(151, 151, 151, 0.5);
    // background:#979797;
    position: absolute;
    left: 27px;
    top: 55px;
  }
  .content {
    //   position: relative;
    //  background-color: blue;
    // width: 520px;
    height: 460px;
    position: absolute;
    left: 26px;
    top: 72px;
    // background: chartreuse;
  }
  .bottom-area {
    //   line-height: 40px;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    opacity: 0;
    // background-color: chartreuse;
  }
}

.device-has {
  //  background-color: antiquewhite;
  width: 520px;
  margin-bottom: 20px;
  height: 520px;
  position: relative;
  .common {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ccd1df;
    line-height: 22px;
    position: absolute;
    display: inline-block;
  }
}
.pageImg {
  height: 20px;
  margin-top: 10px;
  width: 19px;
  cursor: pointer;
}
.leftPageImg {
  margin-left: 4px;
}

.device-list {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-bottom: 3px;
  color: #ccd1df;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccd1df;
  position: relative;
}
.deviceDetailList {
  position: absolute;
  top: 33px;
  width: 100%;
  border: 1px solid #979797;
  z-index: 99;
  background: rgb(8, 13, 30);
}
.deviceDetailList ul li {
  width: 100%;
  height: 30px;
  cursor: pointer;
  line-height: 30px;
  padding-left: 10px;
  color: #fff;
}
.deviceDetailList ul li:hover {
  background: #46527c;
}
.deviceDetailLiSelectInput {
  background: #46527c;
  border: 1px solid #979797;
  height: 28px;
  color: #fff;
  cursor: pointer;
  padding-left: 8px;
}
.deviceDetailLiSelectInput::-webkit-input-placeholder {
  color: #fff;
  font-size: 16px;
  text-align: left;
  padding-left: 8px;
}
.deviceDetailLiSelectInput::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
  font-size: 16px;
  text-align: left;
  padding-left: 8px;
}
.deviceDetailLiSelectInput:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
  font-size: 16px;
  text-align: left;
  padding-left: 8px;
}
.deviceDetailLiSelectInput:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #fff;
  font-size: 16px;
  text-align: left;
  padding-left: 8px;
}
.tabStyle {
  width: 520px;
  // height: 500px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
// ==========================
// 状态的字体样式
.state-word {
  width: 100%;
  height: 32px;
  line-height: 32px;
  margin-bottom: 3px;
  color: #25bcff;
  text-align: center;
  border-radius: 3px;
  border: 1px dotted #ccd1df;
  background: rgba(37, 188, 255, 0.2);
}
// 按钮
.confirmButton {
  position: absolute;
  bottom: 20px;
  width: 64px;
  right: 26px;
  height: 32px;
  display: inline-block;
  background: rgba(37, 188, 255, 0.2);
  border: 1px solid #25bcff;
  font-size: 16px;
  text-align: center;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #25bcff;
  line-height: 32px;
}
.cancelButton {
  position: absolute;
  bottom: 20px;
  right: 102px;
  display: inline-block;
  width: 64px;
  height: 32px;
  background: rgba(170, 170, 170, 0.16);
  border: 1px solid rgba(170, 170, 170, 0.75);
  font-size: 16px;
  text-align: center;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  line-height: 32px;
  margin-left: 8px;
}
/deep/.el-form {
  margin-bottom: 20px;
  // height: 400px;
  // background-color: brown;
}
/deep/.el-textarea__inner {
  display: block;
  resize: vertical;
  font-size: 14px;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  color: #ccd1df;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
/deep/.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
/deep/label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: -12px;
  font-weight: 700;
}
/deep/.el-form-item {
  margin-bottom: -12px;
}
// disabled
/deep/.el-input.is-disabled .el-input__inner {
  background-color: rgba(72, 79, 97, 0.5);
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
/deep/.el-textarea.is-disabled .el-textarea__inner {
  background-color: rgba(72, 79, 97, 0.5);
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.item-last {
  /deep/ label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 0px;
    font-weight: 700;
  }
  /deep/.el-form-item {
    margin-bottom: 0px;
  }
}
.input-item {
  margin-bottom: 1px;
}
/deep/.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  margin-left: 104px !important;
}
/deep/.el-form-item__error {
  color: #f56c6c;
  font-size: 0.3px;
  padding-top: 0px;
  position: absolute;
  top: 100%;
  left: 0;
}
/deep/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  width: 104px !important;
  font-size: 16px;
  color: #9aa0ab;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/deep/.el-input__inner {
  -webkit-appearance: none;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #dcdfe6;
  display: inline-block;
  font-size: 14px;
  height: 30px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
// =============================
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
// // 修改下拉框的样式
::v-deep .el-select {
  width: 100%;
}

::v-deep .el-input__inner {
  background-color: transparent;
}

::v-deep .el-select-dropdown__item {
  color: #fff;
}

::v-deep .el-scrollbar,
::v-deep .el-select-dropdown {
  background-color: transparent !important;
  color: #fff !important;
}

::v-deep .el-scrollbar__wrap,
::v-deep .el-select-dropdown__list {
  background-color: #0b1a37;
  color: #fff !important;
}

::v-deep .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
}
/deep/.el-popper[x-placement^="bottom"] .popper__arrow {
  top: -8px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}
/deep/.el-popper .popper__arrow {
  border-width: 6px;
  -webkit-filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}
/deep/.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
/deep/.el-input__icon {
  height: 100%;
  width: 22px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 38px;
}
/deep/.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
}
.el-dropdown-menu {
  position: absolute;
  width: 8% !important;
  transform-origin: center top !important;
  z-index: 2083 !important;
  position: absolute;
  padding: 10px 0 !important;
  margin: 5px 0 !important;
  background-color: #0b1a37 !important;
  border: 1px solid #0b1a37;
  border-radius: 4px;
}
.el-dropdown {
  width: 100%;
  display: inline-block;
  position: relative;
  color: #606266;
  font-size: 14px;
}
.deviceDetailNoData {
  width: 100%;
  overflow: hidden;
  color: #fff;
  font-size: 14px;
  text-align: center;
}
.el-right {
  margin-right: 5px;
  line-height: 30px;
}
// /deep/.el-input__inner::placeholder {
//         color: #fff;
//         font-size:10px;
//     }
//      /* 谷歌 */
// /deep/.el-input__inner::-webkit-input-placeholder {
//          color: #fff;
//          font-size:10px;
//     }
//      /* 火狐 */
// /deep/.el-input__inner:-moz-placeholder {
//          color: #fff;
//          font-size:10px;
//     }
//      /*ie*/
// /deep/.el-input__inner:-ms-input-placeholder {
//         color: #fff;
//         font-size:10px;
//     }
</style>
// <style lang="scss">
.el-popper .popper__arrow {
  display: none;
}
// .el-popper .popper__arrow, .el-popper .popper__arrow::after {
//     position: absolute;
//     display: block;
//     width: 0;
//     height: 0;
//     border-top-color:red;
//     border-color: #0b1a37;
//     border-style: solid;
// }
// /deep/.el-select-dropdown__list {
//     list-style: none;
//     padding: 6px 0;
//     margin: 0;
//     background-color: brown;
//     -webkit-box-sizing: border-box;
//     box-sizing: border-box;
// }
//
</style>