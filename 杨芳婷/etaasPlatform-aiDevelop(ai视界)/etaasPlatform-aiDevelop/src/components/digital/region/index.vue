<template>
  <div class="regionWarp">
    <img
      class="bgImg"
      src="@/assets/digital/assets/img/region/region.png"
      alt=""
    />
    <img
      class="closeImg"
      src="@/assets/digital/assets/img/region/close.png"
      alt=""
      @click="closeRegion"
    />
    <div class="title">区域信息</div>
    <div class="line"></div>

    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabStyle">
        <el-tab-pane label="关联区域" name="first">
          <div class="device-has">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="areaName" label="区域名称">
                    <div class="device-list" @click="areaValue">
                      <div style="margin-left: 10px">
                        {{ ruleForm.areaName ? ruleForm.areaName : "请选择" }}
                      </div>
                      <!-- <input v-model="addDeviceForm.parkName" type="text" placeholder="请选择" class="deviceDetailLiSelectInput" > -->
                      <i class="el-icon-arrow-down el-right"></i>
                    </div>

                    <div class="deviceDetailList" v-show="areaShow">
                      <ul v-if="regionList && regionList.length !== 0">
                        <li
                          @click="handleChange(item.id)"
                          v-for="(item, index) in regionList"
                          :key="index"
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
                          JSON.stringify(regionList) === '{}' ||
                          regionList.length === 0
                        "
                        class="deviceDetailNoData"
                      >
                        暂无数据
                      </div>
                    </div>
                  </el-form-item>
                  <!-- <el-form-item
             prop="areaName"
             label="区域名称"
             >
              <el-select   @change="handleChange" v-model="ruleForm.areaName" placeholder="请选择" :popper-append-to-body="false">
                 <el-option
                  v-for="item in regionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item> -->
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="parkName" label="园区/厂区">
                    <el-input
                      class="readonlyContrl"
                      :readonly="true"
                      v-model="ruleForm.parkName"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="buildingName" label="建筑名称">
                    <el-input
                      class="readonlyContrl"
                      :readonly="true"
                      v-model="ruleForm.buildingName"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="floor" label="楼层">
                    <el-input
                      class="readonlyContrl"
                      :readonly="true"
                      v-model="ruleForm.floor"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="24">
                  <el-form-item prop="remarks" label="备注">
                    <el-input
                      class="readonlyContrl2"
                      :readonly="true"
                      type="textarea"
                      v-model="ruleForm.remarks"
                    ></el-input>
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
        <el-tab-pane label="新建区域" name="second">
          <div class="device-has">
            <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="areaName" label="区域名称">
                    <el-input v-model="ruleForm1.areaName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="parkName" label="园区/厂区">
                   <el-input
                      class="readonlyContrl"
                      :readonly="true"
                      v-model="ruleForm1.parkName"
                    ></el-input>
                    <!-- <div class="device-list">
                      <div style="margin-left: 10px">
                        {{ ruleForm1.parkName ? ruleForm1.parkName : "请选择" }}
                      </div> -->
                    
                      <!-- <i class="el-icon-arrow-down el-right"></i>
                    </div> -->

                    <!-- <div class="deviceDetailList" v-show="parkNameShow">
                      <ul v-if="parkNameList && parkNameList.length !== 0">
                        <li
                          @click="handleChangeParkName(item)"
                          v-for="(item, index) in parkNameListStorge[Index]"
                          :key="index"
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
                          <div>共有{{ total1 }}条</div>
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpageafter.png"
                            class="pageImg leftPageImg"
                            @click="goLastPage1()"
                            v-if="beforePage1"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpage.png"
                            class="pageImg leftPageImg"
                            @click="goLastPage1()"
                            v-if="!beforePage1"
                          />
                          <span class="earlyWarningCurrentPage">{{
                            currentPage1
                          }}</span>
                          /{{ Math.ceil(total1 / 5) }}&nbsp;
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpageafter.png"
                            class="pageImg rightPageImg"
                            @click="goNextPage1()"
                            v-if="afterPage1"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpage.png"
                            class="pageImg rightPageImg"
                            @click="goNextPage1()"
                            v-if="!afterPage1"
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
                  <!-- <el-form-item
                    prop="parkName"
                    label="园区/厂区"
                >
             <el-select    @change="handleChangeParkName" v-model="ruleForm1.parkName" placeholder="请选择" :popper-append-to-body="false">
                  <el-option
                      v-for="item in parkNameList"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
              </el-select>
          </el-form-item> -->
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-form-item prop="buildingName" label="建筑名称">
                    <div class="device-list" @click="buildingNameValue">
                      <div style="margin-left: 10px">
                        {{
                          ruleForm1.buildingName
                            ? ruleForm1.buildingName
                            : "请选择"
                        }}
                      </div>
                      <!-- <input v-model="addDeviceForm.parkName" type="text" placeholder="请选择" class="deviceDetailLiSelectInput" > -->
                      <i class="el-icon-arrow-down el-right"></i>
                    </div>

                    <div class="deviceDetailList" v-show="buildingNameShow">
                      <ul
                        v-if="buildingNameList && buildingNameList.length !== 0"
                      >
                        <li
                          @click="handleChangeBuildingName(item)"
                          v-for="(item, index) in buildingNameListStorge[
                            Index2
                          ]"
                          :key="index"
                          class="ww"
                          :title="item.buildingName"
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
                          <div>共有{{ total2 }}条</div>
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpageafter.png"
                            class="pageImg leftPageImg"
                            @click="goLastPage2()"
                            v-if="beforePage2"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpage.png"
                            class="pageImg leftPageImg"
                            @click="goLastPage2()"
                            v-if="!beforePage2"
                          />
                          <span class="earlyWarningCurrentPage">{{
                            currentPage2
                          }}</span>
                          /{{ Math.ceil(total2 / 5) }}&nbsp;
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpageafter.png"
                            class="pageImg rightPageImg"
                            @click="goNextPage2()"
                            v-if="afterPage2"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpage.png"
                            class="pageImg rightPageImg"
                            @click="goNextPage2()"
                            v-if="!afterPage2"
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
                  <!-- <el-form-item
                    prop="buildingName"
                    label="建筑名称"
                    >
             <el-select    @change="handleChangeBuildingName" v-model="ruleForm1.buildingName" placeholder="请选择" :popper-append-to-body="false">
                <el-option
              v-for="item in buildingNameList"
              :key="item.id"
              :label="item.buildingName"
              :value="item.id"
            />
              </el-select>
          </el-form-item> -->
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="floor" label="楼层">
                    <div class="device-list" @click="floorValue">
                      <div style="margin-left: 10px">
                        {{ ruleForm1.floor ? ruleForm1.floor : "请选择" }}
                      </div>
                      <!-- <input v-model="addDeviceForm.parkName" type="text" placeholder="请选择" class="deviceDetailLiSelectInput" > -->
                      <i class="el-icon-arrow-down el-right"></i>
                    </div>

                    <div class="deviceDetailList" v-show="floorShow">
                      <ul v-if="floorList && floorList.length !== 0">
                        <li
                          @click="handleChangeFloor(item)"
                          v-for="(item, index) in floorListStorge[Index3]"
                          :key="index"
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
                          <div>共有{{ total3 }}条</div>
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpageafter.png"
                            class="pageImg leftPageImg"
                            @click="goLastPage3()"
                            v-if="beforePage3"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpage.png"
                            class="pageImg leftPageImg"
                            @click="goLastPage3()"
                            v-if="!beforePage3"
                          />
                          <span class="earlyWarningCurrentPage">{{
                            currentPage3
                          }}</span>
                          /{{ Math.ceil(total3 / 5) }}&nbsp;
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpageafter.png"
                            class="pageImg rightPageImg"
                            @click="goNextPage3()"
                            v-if="afterPage3"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpage.png"
                            class="pageImg rightPageImg"
                            @click="goNextPage3()"
                            v-if="!afterPage3"
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
                  </el-form-item>
                  <!-- <el-form-item
                    prop="floor"
                    label="楼层"
                >
             <el-select  v-model="ruleForm1.floor" placeholder="请选择" :popper-append-to-body="false">
                 <el-option
              v-for="item in floorList"
              :key="item"
              :label="item"
              :value="item"
            />
              </el-select>
          </el-form-item> -->
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="24">
                  <el-form-item prop="remarks" label="备注">
                    <el-input
                      type="textarea"
                      v-model="ruleForm1.remarks"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="confirmButton" @click="confirm">确认</div>
    <div class="cancelButton" @click="cancel">取消</div>
  </div>
</template>

<script>

import {
  getAreaPageList,
  pointInfo,
  bindPoint,
  bindArea,
  areaSave,
} from "../../../api/ai/region";

import {
  getBuildingParkList,
  getBuildingBuildingList,
  getBuildingFloorList,
} from "../../../api/ai/constructionManagement";

export default {
  props: {
    myMessagePostion: {},
    myMessageCenter: {},
  },
  data() {
    return {
      //  区域列表
      regionIdStorge: "",
      buildingNameId: "",
      Index: 0,
      Index2: 0,
      Index3: 0,
      parkNameListStorge: [],
      buildingNameListStorge: [],
      floorListStorge: [],
      parkNameShow: false,
      buildingNameShow: false,
      total1: 0,
      currentPage1: 1,
      total2: 0,
      total3: 0,
      currentPage2: 1,
      currentPage3: 1,
      afterPage: true,
      beforePage: false,
      afterPage1: true,
      beforePage1: false,
      afterPage2: true,
      beforePage2: false,
      afterPage3: true,
      beforePage3: false,
      currentPage: 1,
      total: 0,
      limit: 5,
      areaShow: false,
      floorShow: false,
      floorList: [],
      regionList: [],
      componentPointIdStorge: "",
      parkNameList: [],
      buildingNameList: [],
      areaId: "",
      pointId: "",
      pointListObject: {},
      componentId: "",
      deviceList: {
        parkName: this.$store.state.parkName,
        buildingName: "",
        floor: "",
        areaName: "",
      },
      deviceList1: {
        parkName: "",
        buildingName: "",
        floor: "",
        areaName: "",
      },
      activeName: "first",
      ruleForm: {
        parkName: this.$store.state.parkName,
        buildingName: "",
        floor: "",
        areaName: "",
        remarks: "",
      },
      ruleForm1: {
        parkName: this.$store.state.parkName,
        buildingName: "",
        floor: "",
        areaName: "",
        remarks: "",
      },
      rules: {
        parkName: [{ required: true, message: " ", trigger: "blur" }],
        buildingName: [{ required: true, message: " ", trigger: "blur" }],
        floor: [{ required: false, message: " ", trigger: "blur" }],
        areaName: [{ required: true, message: " ", trigger: "blur" }],
      },
      rules1: {
        parkName: [{ required: true, message: " ", trigger: "blur" }],
        buildingName: [{ required: true, message: " ", trigger: "blur" }],
        floor: [{ required: true, message: " ", trigger: "blur" }],
        areaName: [{ required: true, message: " ", trigger: "blur" }],
      },
    };
  },
  created() {
    let that = this;
    that.$bus.$on("closeModule", (data) => {
      this.$store.state.editModuleShow = false;
      that.cancel();
    });
    
  },
  mounted() {
    
    this.getRegionManageListAll();
  },
  methods: {
    sliceArray(array, size) {
      var result = [];
      for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
      }
      return result;
    },
    // 分页
    goLastPage() {
      if (this.currentPage > 1 && this.currentPage <= this.total) {
        this.currentPage--;
        this.beforePage = true;
        this.afterPage = false;
        this.getRegionManageList2(this.deviceList);
      }
    },
    goNextPage() {
      if (this.currentPage < this.total / 5) {
        this.currentPage++;
        this.afterPage = true;
        this.beforePage = false;
        this.getRegionManageList2(this.deviceList);
      }
    },
    goLastPage3() {
      if (this.currentPage3 > 1 && this.currentPage3 <= this.total3) {
        this.currentPage3--;
        this.Index3 -= 1;
        this.$forceUpdate();
      }
    },
    goNextPage3() {
      if (this.currentPage3 < this.total3 / 5) {
        this.currentPage3++;
        this.Index3 += 1;
        this.$forceUpdate();
      }
    },
    goLastPage2() {
      if (this.currentPage2 > 1 && this.currentPage2 <= this.total2) {
        this.currentPage2--;
        this.Index2 -= 1;
        this.$forceUpdate();
      }
    },
    goNextPage2() {
      if (this.currentPage2 < this.total2 / 5) {
        this.currentPage2++;
        this.Index2 += 1;
        this.$forceUpdate();
      }
    },
    goLastPage1() {
      if (this.currentPage1 > 1 && this.currentPage1 <= this.total1) {
        this.currentPage1--;
        this.Index -= 1;
        this.$forceUpdate();
      }
    },
    goNextPage1() {
      if (this.currentPage1 < this.total1 / 5) {
        this.currentPage1++;
        this.Index += 1;
        this.$forceUpdate();
      }
    },
    areaValue() {
      this.areaShow = !this.areaShow;
    },
    parkNameValue() {
      this.parkNameShow = !this.parkNameShow;
      this.buildingNameShow = false;
      this.floorShow = false;
    },
    buildingNameValue() {
      this.buildingNameShow = !this.buildingNameShow;
      this.floorShow = false;
      this.parkNameShow = false;
    },
    floorValue() {
      this.floorShow = !this.floorShow;
      this.buildingNameShow = false;
      this.parkNameShow = false;
    },
    getParkNameList() {
      getBuildingParkList().then((res) => {
        this.parkNameList = res.result;
        this.total1 = this.parkNameList.length;
        this.parkNameListStorge = this.sliceArray(this.parkNameList, 5);
      });
    },
    handleChangeBuildingName(e) {
      this.buildingNameShow = !this.buildingNameShow;
      this.ruleForm1.buildingName = e.buildingName;
      this.buildingNameId = e.id;
      this.getFloorList(e.id);
    },
    getFloorList(e) {
      const params = {
        id: e,
      };
      getBuildingFloorList(params).then((res) => {
        this.floorList = res.result;
        this.total3 = this.floorList.length;
        this.floorListStorge = this.sliceArray(this.floorList, 5);
      });
    },
    handleChangeFloor(item) {
      this.floorShow = !this.floorShow;
      this.ruleForm1.floor = item;
    },
    handleChangeParkName(e) {
      // this.parkNameShow = !this.parkNameShow;
      this.ruleForm1.parkName = e;
      this.ruleForm1.floor = "";
      this.ruleForm1.buildingName = "";
      const params = {
        parkName: e,
      };
      getBuildingBuildingList(params).then((res) => {
        this.buildingNameList = res.result;
        if(this.buildingNameList&&this.buildingNameList.length>0){
          if(this.buildingNameList[0].buildingName==='全部'){
            this.buildingNameList.shift()
          }
        }
       
        this.total2 = this.buildingNameList.length;
        this.buildingNameListStorge = this.sliceArray(this.buildingNameList, 5);
      });
    },
    bindArea() {
      const params = {
        areaId: this.areaId,
        pointId: this.pointId,
      };
      bindArea(params).then((res) => {
        this.$message({
          message: "关联成功",
          type: "success",
        });
        this.$emit("cancel");
        // this.$store.state.myLoading = true;
       
        this.$bus.$emit("resetAllPoint");
      });
    },
    bindPoint() {
      const params = {
        longitude: this.myMessagePostion.longitude,
        latitude: this.myMessagePostion.latitude,
        altitude: this.myMessagePostion.height,
        componentId: 2,
        parkName: this.$store.state.parkName,
      };
      bindPoint(params).then((res) => {
        this.pointId = res.result;
        this.bindArea();
      });
    },
    handleChange(e) {
      this.areaShow = !this.areaShow;
      this.areaId = e;
      const params = {
        id: e,
      };
      pointInfo(params).then((res) => {
        this.ruleForm.parkName = res.result.parkName;
        this.ruleForm.buildingName = res.result.buildingName;
        this.ruleForm.floor = res.result.floor;
        this.ruleForm.areaName = res.result.name;
        this.ruleForm.remarks = res.result.comment;
        if (res.result.componentPointId) {
          this.componentPointIdStorge = res.result.componentPointId;
        } else {
          this.componentPointIdStorge = "";
        }
      });
    },
    getRegionManageListAll() {
      const params = {
        limit: 999,
        current: 1,
        parkName:this.$store.state.parkName
      };
      getAreaPageList(params).then((res) => {
        this.regionListAll = res.result.list;
        // console.log(this.regionListAll,'rrrrrrrrrrrrrrrrrr')
        this.getRegionManageList1(this.deviceList);
      });
    },
    getRegionManageList1(params) {
      const current = this.currentPage;
      const limit = this.limit;
      params.limit = limit;
      params.current = current;
      params.parkName  = this.$store.state.parkName
      getAreaPageList(params).then((res) => {
        console.log(res)
        this.regionList = res.result.list;
        this.total = res.result.total;
        let params1 = {};
        if (this.$store.state.setAreaId !== "") {
          params1.id = this.$store.state.setAreaId;
          this.regionListAll &&
            this.regionListAll.map((item) => {
              if (item.id === this.$store.state.setAreaId) {
                if (item.componentPointId) {
                  this.componentPointIdStorge = item.componentPointId;
                } else {
                  this.componentPointIdStorge = "";
                }
              }
              this.areaId = this.$store.state.setAreaId;
            });
        } else {
          params1.id = this.regionListAll && this.regionListAll[0].id;
          if (this.regionListAll[0].componentPointId) {
            this.componentPointIdStorge =
              this.regionListAll[0].componentPointId;
          } else {
            this.componentPointIdStorge = "";
          }
          this.areaId = this.regionListAll[0].id;
        }
        pointInfo(params1).then((res) => {
          this.ruleForm.parkName = res.result.parkName;
          this.ruleForm.buildingName = res.result.buildingName;
          this.ruleForm.floor = res.result.floor;
          this.ruleForm.areaName = res.result.name;
          this.ruleForm.remarks = res.result.comment;
        });
      });
    },
    getRegionManageList2(params) {
      const current = this.currentPage;
      const limit = this.limit;
      params.limit = limit;
      params.current = current;
      getAreaPageList(params).then((res) => {
        this.regionList = res.result.list;
        this.total = res.result.total;
      });
    },
    //   取消关联已有设备
    cancleHas() {},
    handleClick(tab, event) {
      if (this.activeName === "first") {
        this.areaShow = false;
        (this.ruleForm1 = {
          parkName: "",
          buildingName: "",
          floor: "",
          areaName: "",
          remarks: "",
        }),
          this.getRegionManageList1(this.deviceList);
      } else {
        this.parkNameShow = false;
        this.buildingNameShow = false;
        this.floorShow = false;
        this.ruleForm1.parkName = this.$store.state.parkName
        this.handleChangeParkName(this.$store.state.parkName)

        // this.getParkNameList();
      }
    },
    closeRegion() {
      this.$emit("closeRegion", true);
    },

    confirm() {
      if (this.activeName === "first") {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.componentPointIdStorge !== "") {
              this.$emit("confirm", true);
            } else {
              this.bindPoint();
            }
          } else {
            return false;
          }
        });
      } else {
        this.$refs.ruleForm1.validate((valid) => {
          if (valid) {
            const params = {
              buildingId: this.buildingNameId,
              name: this.ruleForm1.areaName,
              floor: this.ruleForm1.floor,
              comment: this.ruleForm1.remarks,
            };
            areaSave(params).then((res) => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.areaId = res.result.addedAreaId;
              this.bindPoint();
              this.cancel();
            });
          } else {
            return false;
          }
        });
      }
    },
    cancel() {
      this.$emit("cancel");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.ww{
  max-width:120px;
  text-overflow :ellipsis;
  white-space :nowrap;
  overflow : hidden;
}
/deep/ [class*=" el-icon-"],
[class^="el-icon-"] {
  position: absolute;
  left: 104px;
  top: 7px;
}

.deviceDetailNoData {
  width: 100%;
  overflow: hidden;
  color: #fff;
  font-size: 0.07292rem;
  text-align: center;
}
.device-list {
  margin-top: 1px;
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
.pageImg {
  height: 20px;
  margin-top: 10px;
  width: 16px;
  cursor: pointer;
}
.leftPageImg {
  margin-left: 4px;
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
.readonlyContrl {
  background-color: rgba(72, 79, 97, 0.5);
  height: 31px;
  border-radius: 5px;
}

.readonlyContrl2 {
  background-color: rgba(72, 79, 97, 0.5);
  height: 64px;
  border-radius: 5px;
}

.confirmButton:hover {
  background: rgba(37, 188, 255, 0.2);
  border: 1px solid #25bcff;
  color: #25bcff;
}
.cancelButton:hover {
  background: rgba(37, 188, 255, 0.2);
  border: 1px solid #25bcff;
  color: #25bcff;
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
    //   position: relative;
    //  background-color: blue;
    width: 452px;
    height: 200px;
    position: absolute;
    left: 26px;
    top: 72px;
    // background: chartreuse;
  }
}

.device-has {
  //  background-color: antiquewhite;
  width: 452px;
  margin-bottom: 20px;
  height: 320px;
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
.tabStyle {
  width: 452px;
  height: 200px;
  // height: 500px;
  // background: chocolate;
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
// 按钮
.confirmButton {
  position: absolute;
  bottom: 20px;
  width: 64px;
  right: 26px;
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
  height: 200px;
}
/deep/.el-textarea__inner {
  display: block;
  resize: vertical;
  font-size: 14px;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 60px;
  width: 100%;
  color: #fff;
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
  margin-bottom: -15px;
  font-weight: 700;
}
/deep/.el-form-item {
  margin-bottom: -15px;
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
  margin-left: 102px !important;
}
/deep/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  width: 102px !important;
  font-size: 12px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/deep/.el-input__inner {
  position: relative;
  top: -4px;
  -webkit-appearance: none;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
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

/deep/ .el-input::-webkit-scrollbar-thumb {
  border-radius: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 6px;
  background: #b4bccc;
}

/deep/ .el-select .el-input .el-select__caret {
  color: #c0c4cc;
  font-size: 14px;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  -webkit-transform: rotateZ(180deg);
  transform: rotateZ(180deg);
  cursor: pointer;
}

/deep/ .el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 40px;
}

::v-deep .el-select {
  width: 124px;
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

input[readonly] {
  background-color: #ffffff;
}
</style>