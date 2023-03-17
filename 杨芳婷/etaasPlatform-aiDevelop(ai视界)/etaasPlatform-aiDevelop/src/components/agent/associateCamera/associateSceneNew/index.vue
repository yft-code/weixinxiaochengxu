<template>
  <div class="regionWarp">
    <img
      class="bgImg"
      src="@/assets/agent/img/bg.png"
      alt=""
    />
    <img
      class="closeImg"
      src="@/assets/agent/img/close.svg"
      alt=""
      @click="closeScence()"
    />
    <div class="title">
      <img
         class="imgIcon"
         src="@/assets/digital/assets/img/mode/billboard/ico.png" alt=""/>
      关联监管场景</div>
    <!-- <div class="line"></div> -->
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabStyle">
        <el-tab-pane label="新增关联场景" name="first">
          <div class="device-has">
            <el-form :model="addscenceForm" ref="addscenceForm">
              <el-row :gutter="0">
                <el-col :span="12" class="item-left">
                  <el-form-item prop="areaName" label="监管场景">
                    <div class="device-list" @click="scenceValue">
                      <div style="margin-left: 10px">
                        {{ addscenceForm.name ? addscenceForm.name : "请选择" }}
                      </div>
                      <!-- <input v-model="addDeviceForm.parkName" type="text" placeholder="请选择" class="deviceDetailLiSelectInput" > -->
                      <i class="el-icon-arrow-down el-right"></i>
                    </div>

                    <div class="deviceDetailList" v-show="scenceShow">
                      <ul v-if="scences && scences.length !== 0">
                        <li
                          @click="selectChange(item.id)"
                          v-for="(item, index) in scences"
                          :key="item.id"
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
                          JSON.stringify(scences) === '{}' ||
                          scences.length === 0
                        "
                        class="deviceDetailNoData"
                      >
                        暂无数据
                      </div>
                    </div>
                    <!-- <el-select v-model="addscenceForm.name" placeholder="请选择"
                  @change="selectChange"
               :popper-append-to-body="false">
             <el-option
                v-for="item in scences"
                 :key="item.id"
                 :label="item.deviceName"
                 :value="item.id">
        </el-option>
              </el-select> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <div class="add-scence" @click="addScence()">
                    新增监管场景
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="24" class="item-left">
                  <el-form-item prop="email" label="识别算法">
                    <p class="algority-word">
                      {{ addscenceForm.algoruthmsName }}
                    </p>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12" class="item-left">
                  <el-form-item prop="email" label="预警名称">
                    <el-input
                      disabled
                      v-model="addscenceForm.warning.name"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="email" label="监控预警时间">
                    <el-input
                      disabled
                      v-model="addscenceForm.timeFormat"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12" class="item-left">
                  <el-form-item prop="email" label="通知对象">
                    <el-input
                      disabled
                      v-model="addscenceForm.handlersName"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="state" label="状态">
                    <div class="state-word">{{ addscenceForm.state }}</div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12" class="item-left">
                  <el-form-item prop="email" label="是否生效">
                    <el-switch
                      @change="switchActive"
                      v-model="addscenceForm.isActive"
                      active-color="#25BCFF"
                      inactive-color="rgba(232,238,255,0.5)"
                    >
                    </el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="email" label="是否线下通知">
                    <el-switch
                      @change="switchNotification"
                      v-model="addscenceForm.offlineNotification"
                      active-color="#25BCFF"
                      inactive-color="rgba(232,238,255,0.5)"
                    >
                    </el-switch>
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
        <el-tab-pane label="已关联场景" name="second">
          <div class="device-has">
            <el-form :model="hasscenceForm" ref="addscenceForm">
              <el-row :gutter="0">
                <el-col :span="12" class="item-left">
                  <el-form-item prop="areaName" label="监管场景">
                    <div class="device-list" @click="hasScenceValue">
                      <div style="margin-left: 10px">
                        {{ hasscenceForm.name ? hasscenceForm.name : "请选择" }}
                      </div>
                      <!-- <input v-model="addDeviceForm.parkName" type="text" placeholder="请选择" class="deviceDetailLiSelectInput" > -->
                      <i class="el-icon-arrow-down el-right"></i>
                    </div>

                    <div class="deviceDetailList" v-show="hasScenceShow">
                      <ul v-if="hasscences && hasscences.length !== 0">
                        <li
                          @click="hasSelectChange(item.id)"
                          v-for="(item, index) in hasscences"
                          :key="item.id"
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
                          <div>共有{{ totalHas }}条</div>
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpageafter.png"
                            class="pageImg leftPageImg"
                            @click="goLastPageHas()"
                            v-if="beforePageHas"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/leftpage.png"
                            class="pageImg leftPageImg"
                            @click="goLastPageHas()"
                            v-if="!beforePageHas"
                          />
                          <span class="earlyWarningCurrentPage">{{
                            currentPageHas
                          }}</span>
                          /{{ Math.ceil(totalHas / 5) }}&nbsp;
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpageafter.png"
                            class="pageImg rightPageImg"
                            @click="goNextPageHas()"
                            v-if="afterPageHas"
                          />
                          <img
                            src="~@/assets/digital/assets/img/earlyWarning/rightpage.png"
                            class="pageImg rightPageImg"
                            @click="goNextPageHas()"
                            v-if="!afterPageHas"
                          />
                        </div>
                      </ul>
                      <div
                        v-if="
                          JSON.stringify(hasscences) === '{}' ||
                          hasscences.length === 0
                        "
                        class="deviceDetailNoData"
                      >
                        暂无数据
                      </div>
                    </div>
                    <!-- <el-select v-model="hasscenceForm.name" placeholder="请选择"
                  @change="hasSelectChange"
               :popper-append-to-body="false">
             <el-option
                v-for="item in hasscences"
                 :key="item.id"
                 :label="item.deviceName"
                 :value="item.id">
              </el-option>
              </el-select> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="24" class="item-left">
                  <el-form-item prop="email" label="识别算法">
                    <p class="algority-word">
                      {{ hasscenceForm.algoruthmsName }}
                    </p>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12" class="item-left">
                  <el-form-item prop="email" label="预警名称">
                    <el-input
                      disabled
                      v-model="hasscenceForm.warning.name"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="email" label="监控预警时间">
                    <el-input
                      disabled
                      v-model="hasscenceForm.timeFormat"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12" class="item-left">
                  <el-form-item prop="email" label="通知对象">
                    <el-input
                      disabled
                      v-model="hasscenceForm.handlersName"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="state" label="状态">
                    <div class="state-word">{{ hasscenceForm.state }}</div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12" class="item-left">
                  <el-form-item prop="email" label="是否生效">
                    <el-switch
                      @change="hasSwitchActive"
                      v-model="hasscenceForm.isActive"
                      active-color="#25BCFF"
                      inactive-color="rgba(232,238,255,0.5)"
                    >
                    </el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="email" label="是否线下通知">
                    <el-switch
                      @change="hasSwitchNotification"
                      v-model="hasscenceForm.offlineNotification"
                      active-color="#25BCFF"
                      inactive-color="rgba(232,238,255,0.5)"
                    >
                    </el-switch>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="0">
                <el-col :span="12" class="item-left">
                  <div class="delete-scence" @click="deleteScence()">
                    删除关联
                  </div>
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
      <div v-if="this.activeName === 'first'">
        <div class="confirmButton" @click="scenceSumbit">确认</div>
        <div class="cancelButton" @click="cancle()">取消</div>
      </div>
      <div v-if="this.activeName === 'second'">
        <div class="confirmButton" @click="hasScenceSumbit">确认</div>
        <div class="cancelButton" @click="cancle()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as deviceApi from "@/api/digital/device";
export default {
  data() {
    return {
      // 已关联场景分页
      afterPage: true,
      beforePage: false,
      currentPage: 1,
      total: 0,
      limit: 5,
      //  关联过的场景
      afterPageHas: true,
      beforePageHas: false,
      currentPageHas: 1,
      totalHas: 0,
      limitHas: 5,
      hasScenceShow: false,
      scenceShow: false,
      // 设备关联场景参数，场景编辑的参数
      scenceParams: {},
      // 对已有的设备的参数进行处理
      hasscenceParams: {},
      scenceAll: [],
      scences: [],
      hasscenceAll: [],
      hasscences: [],
      activeName: "first",
      value: "",
      formInline: {
        user: "",
        region: "",
      },
      hasscenceForm: {
        name: "",
        algoruthmsName: "",
        warning: "",
        timeFormat: "",
        handlersName: "",
        state: "",
      },
      addscenceForm: {
        name: "",
        algoruthmsName: "",
        warning: "",
        timeFormat: "",
        handlersName: "",
        state: "",
      },
    };
  },
  created() {
    this.$bus.$on("getScenceUpdate", () => {
      this.getScence();
      //  this.getHasScence()
    });
    this.$bus.$on("hasScenceUpdate", () => {
      this.getHasScence();
      //  console.log('设备更新了');
    });
    this.getScence();
    this.getHasScence();
  },
  methods: {
    // 场景分页
    goLastPage() {
      if (this.currentPage > 1 && this.currentPage <= this.total) {
        this.currentPage--;
        this.beforePage = true;
        this.afterPage = false;
        this.getPageScence();
      }
    },
    goNextPage() {
      if (this.currentPage < this.total / 5) {
        this.currentPage++;
        this.afterPage = true;
        this.beforePage = false;
        this.getPageScence();
      }
    },

    // 已关联过的场景分页
    goLastPageHas() {
      if (this.currentPageHas > 1 && this.currentPageHas <= this.totalHas) {
        this.currentPageHas--;
        this.beforePageHas = true;
        this.afterPageHas = false;
        this.getHasPageScence();
      }
    },
    goNextPageHas() {
      if (this.currentPageHas < this.totalHas / 5) {
        this.currentPageHas++;
        this.afterPageHas = true;
        this.beforePageHas = false;
        this.getHasPageScence();
      }
    },
    hasScenceValue() {
      this.hasScenceShow = !this.hasScenceShow;
    },
    scenceValue() {
      this.scenceShow = !this.scenceShow;
    },
    //  已关联场景修改是否生效
    hasSwitchActive() {
      this.hasscenceParams.isActive = this.hasscenceForm.isActive;
    },
    //  已关联场景修改是否线下通知
    hasSwitchNotification() {
      this.hasscenceParams.offlineNotification =
        this.hasscenceForm.offlineNotification;
    },

    //新增关联场景修改是否线下通知
    switchActive() {
      this.scenceParams.isActive = this.addscenceForm.isActive;
    },

    // 新增关联场景修改是否线下通知
    switchNotification() {
      this.scenceParams.offlineNotification =
        this.addscenceForm.offlineNotification;
    },
    // 数组去重
    uniqueArr1(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] == arr[j]) {
            arr.splice(j, 1);
            // this.$message.warning('设备id重复')
            j--;
          }
        }
      }
      return arr;
    },
    // 点击确定关联设备场景
    scenceSumbit() {
      if (this.activeName === "first") {
        //  console.log('deviceId',this.$store.state.deviceId);
        // const deviceId=[]
        // deviceId.push(this.$store.state.deviceId)
        // this.scenceParams.deviceIds=deviceId
        deviceApi
          .sceneUpdateDetails(this.scenceParams)
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("修改成功");
              this.getScence();
              this.getHasScence();
            } else {
              this.$message.warning("修改失败");
              if (this.addscenceForm.offlineNotification) {
                this.addscenceForm.offlineNotification = false;
              } else {
                this.addscenceForm.offlineNotification = true;
              }
            }
          })
          .catch(() => {
            this.$message.warning("修改失败");
            if (this.addscenceForm.offlineNotification) {
              this.addscenceForm.offlineNotification = false;
            } else {
              this.addscenceForm.offlineNotification = true;
            }
          });
      }
    },
    // 点击修改已关联的设备
    hasScenceSumbit() {
      this.$store.state.scenceParams = this.hasscenceParams;
      deviceApi
        .sceneUpdateDetails(this.hasscenceParams)
        .then((res) => {
          //  console.log('res',res);
          if (res.code === 0) {
            this.$message.success("修改成功");
            this.getScence();
            this.getHasScence();
          } else {
            this.$message.warning("修改失败");
            if (this.hasscenceForm.isActive) {
              this.hasscenceForm.isActive = false;
            } else {
              this.hasscenceForm.isActive = true;
            }
          }
        })
        .catch(() => {
          this.$message.warning("修改失败");
          if (this.hasscenceForm.isActive) {
            this.hasscenceForm.isActive = false;
          } else {
            this.hasscenceForm.isActive = true;
          }
        });
    },
    // 查找值
    selectChange(value) {
      // console.log('id',value);
      this.scenceAll &&
        this.scenceAll.map((j) => {
          if (j.id === value) {
            // console.log('j',j);
            this.addscenceForm = j;
          }
        });
      let arr = [];
      let handleArr = [];
      this.addscenceForm &&
        this.addscenceForm.algorithms &&
        this.addscenceForm.algorithms.map((item) => {
          arr.push(item.name);
        });
      this.addscenceForm &&
        this.addscenceForm.handlers &&
        this.addscenceForm.handlers.map((item) => {
          handleArr.push(item.name);
        });
      this.addscenceForm.algoruthmsName = arr.join(",");
      this.addscenceForm.handlersName = arr.join(",");
      //  获取场景编辑的参数
      this.scenceParams.name = this.addscenceForm.name;
      const deviceIds = [];
      this.addscenceForm.devices &&
        this.addscenceForm.devices.length > 0 &&
        this.addscenceForm.devices.map((val) => {
          deviceIds.push(val.id);
        });
      // console.log('deviceId',this.$store.state.deviceId);
      deviceIds.push(this.$store.state.deviceId);
      this.uniqueArr1(deviceIds);
      this.scenceParams.deviceIds = deviceIds;
      // console.log('添加时的设备id',this.scenceParams.deviceIds);
      const algIds = [];
      this.addscenceForm.algorithms &&
        this.addscenceForm.algorithms.length > 0 &&
        this.addscenceForm.algorithms.map((val) => {
          algIds.push(val.id);
        });
      this.scenceParams.algIds = algIds;
      this.scenceParams.id = this.addscenceForm.id;
      this.scenceParams.isActive = this.addscenceForm.isActive;
      this.scenceParams.offlineNotification =
        this.addscenceForm.offlineNotification;
      this.scenceParams.time = this.addscenceForm.time;
      const userIds = [];
      this.addscenceForm.handlers &&
        this.addscenceForm.handlers.length > 0 &&
        this.addscenceForm.handlers.map((val) => {
          userIds.push(val.id);
        });
      this.scenceParams.userIds = userIds;
      this.scenceParams.warningId = this.addscenceForm.warning.id;
      // console.log('scenceParams',this.scenceParams);
      this.scenceShow = !this.scenceShow;
    },

    hasSelectChange(value) {
      // console.log('已有的场景',value);
      //  console.log('id',value);
      this.hasscenceAll &&
        this.hasscenceAll.map((j) => {
          if (j.id === value) {
            this.hasscenceForm = j;
            this.$store.state.deleteScenceParams = j;
            // console.log('this.$store.state.deleteScenceParams',this.$store.state.deleteScenceParams);
          }
        });
      let arr = [];
      let handleArr = [];
      this.hasscenceForm &&
        this.hasscenceForm.algorithms &&
        this.hasscenceForm.algorithms.map((item) => {
          arr.push(item.name);
        });
      this.hasscenceForm &&
        this.hasscenceForm.handlers &&
        this.hasscenceForm.handlers.map((item) => {
          handleArr.push(item.name);
        });
      this.hasscenceForm.algoruthmsName = arr.join(",");
      this.hasscenceForm.handlersName = arr.join(",");
      //  获取场景编辑的参数
      this.hasscenceParams.name = this.hasscenceForm.name;
      const deviceIds = [];
      this.hasscenceForm.devices &&
        this.hasscenceForm.devices.length > 0 &&
        this.hasscenceForm.devices.map((val) => {
          deviceIds.push(val.id);
        });
      this.hasscenceParams.deviceIds = deviceIds;
      const algIds = [];
      this.hasscenceForm.algorithms &&
        this.hasscenceForm.algorithms.length > 0 &&
        this.hasscenceForm.algorithms.map((val) => {
          algIds.push(val.id);
        });
      this.hasscenceParams.algIds = algIds;
      this.hasscenceParams.id = this.hasscenceForm.id;
      this.hasscenceParams.isActive = this.hasscenceForm.isActive;
      this.hasscenceParams.offlineNotification =
        this.hasscenceForm.offlineNotification;
      this.hasscenceParams.time = this.hasscenceForm.time;
      const userIds = [];
      this.hasscenceForm.handlers &&
        this.hasscenceForm.handlers.length > 0 &&
        this.hasscenceForm.handlers.map((val) => {
          userIds.push(val.id);
        });
      this.hasscenceParams.userIds = userIds;
      this.hasscenceParams.warningId = this.hasscenceForm.warning.id;
      this.$store.state.scenceParams = this.hasscenceParams;
      this.hasScenceShow = !this.hasScenceShow;
    },
    // 获取关联的场景
    getScence() {
      const params = {
        limit: this.limit,
        current: this.currentPage,
      };
      // console.log('设备列表')
      deviceApi
        .scenePageList(params)
        .then((res) => {
          //  console.log('场景列表res',res);
          this.total = res.result.total;
          this.scenceAll = res && res.result && res.result.list;
          this.addscenceForm = this.scenceAll[0];
          //  console.log('已关联的每一行数据',this.addscenceForm);
          //  编辑参数
          this.scenceParams.name = this.addscenceForm.name;
          const deviceIds = [];
          this.addscenceForm.devices &&
            this.addscenceForm.devices.length > 0 &&
            this.addscenceForm.devices.map((val) => {
              deviceIds.push(val.id);
            });
          // console.log('deviceId',this.$store.state.deviceId);
          deviceIds.push(this.$store.state.deviceId);
          this.uniqueArr1(deviceIds);
          this.scenceParams.deviceIds = deviceIds;
          // console.log('获取准备关联的设备id', this.scenceParams.deviceIds);
          const algIds = [];
          this.addscenceForm.algorithms &&
            this.addscenceForm.algorithms.length > 0 &&
            this.addscenceForm.algorithms.map((val) => {
              algIds.push(val.id);
            });
          this.scenceParams.algIds = algIds;
          this.scenceParams.id = this.addscenceForm.id;
          this.scenceParams.isActive = this.addscenceForm.isActive;
          this.scenceParams.offlineNotification =
            this.addscenceForm.offlineNotification;
          this.scenceParams.time = this.addscenceForm.time;
          const userIds = [];
          this.addscenceForm.handlers &&
            this.addscenceForm.handlers.length > 0 &&
            this.addscenceForm.handlers.map((val) => {
              userIds.push(val.id);
            });
          this.scenceParams.userIds = userIds;
          this.scenceParams.warningId = this.addscenceForm.warning.id;
          // console.log('准备要关联的参数scenceParams',this.scenceParams);
          let arr = [];
          let handleArr = [];
          this.scenceAll[0] &&
            this.scenceAll[0].algorithms &&
            this.scenceAll[0].algorithms.map((val) => {
              arr.push(val.name);
            });
          this.scenceAll[0] &&
            this.scenceAll[0].handlers &&
            this.scenceAll[0].handlers.map((val) => {
              handleArr.push(val.name);
            });
          this.addscenceForm.algoruthmsName = arr.join(",");
          this.addscenceForm.handlersName = handleArr.join(",");
          this.addDeviceForm = this.scenceAll[0];
          const scences = [];
          //  console.log('deciveAll',this.scenceAll);
          res &&
            res.result &&
            res.result.list.map((item) => {
              scences.push({
                id: item.id,
                deviceName: item.name,
              });
            });
          this.scences = scences;
          // console.log('scences',this.scences);
        })
        .catch();
    },

    // 具有分页功能的场景
    getPageScence() {
      const params = {
        limit: this.limit,
        current: this.currentPage,
      };
      // console.log('设备列表')
      deviceApi
        .scenePageList(params)
        .then((res) => {
          //  console.log('场景列表res',res);
          this.total = res.result.total;
          const scences = [];
          //  console.log('deciveAll',this.scenceAll);
          res &&
            res.result &&
            res.result.list.map((item) => {
              scences.push({
                id: item.id,
                deviceName: item.name,
              });
            });
          this.scences = scences;
          // console.log('scences',this.scences);
        })
        .catch();
    },
    // 获取已关联的场景
    getHasScence() {
      const params = {
        limit: this.limitHas,
        current: this.currentPageHas,
        deviceId: this.$store.state.deviceId,
      };
      deviceApi
        .scenePageList(params)
        .then((res) => {
          this.totalHas = res.result.total;
          this.hasscenceAll = res && res.result && res.result.list;
          if (this.hasscenceAll.length > 0) {
            this.hasscenceForm = this.hasscenceAll && this.hasscenceAll[0];
            this.$store.state.deleteScenceParams = this.hasscenceParams;
            //  编辑参数
            this.hasscenceParams.name = this.hasscenceForm.name;
            const deviceIds = [];
            this.hasscenceForm.devices &&
              this.hasscenceForm.devices.length > 0 &&
              this.hasscenceForm.devices.map((val) => {
                deviceIds.push(val.id);
              });
            this.hasscenceParams.deviceIds = deviceIds;
            // console.log('已经绑定的deviceIds',deviceIds);
            const algIds = [];
            this.hasscenceForm.algorithms &&
              this.hasscenceForm.algorithms.length > 0 &&
              this.hasscenceForm.algorithms.map((val) => {
                algIds.push(val.id);
              });
            this.hasscenceParams.algIds = algIds;
            this.hasscenceParams.id = this.hasscenceForm.id;
            this.hasscenceParams.isActive = this.hasscenceForm.isActive;
            this.hasscenceParams.offlineNotification =
              this.hasscenceForm.offlineNotification;
            this.hasscenceParams.time = this.hasscenceForm.time;
            const userIds = [];
            this.hasscenceForm.handlers &&
              this.hasscenceForm.handlers.length > 0 &&
              this.hasscenceForm.handlers.map((val) => {
                userIds.push(val.id);
              });
            this.hasscenceParams.userIds = userIds;
            this.hasscenceParams.warningId = this.hasscenceForm.warning.id;
            // console.log('hasscenceParams',this.hasscenceParams);
            this.$store.state.scenceParams = this.hasscenceParams;
            let arr = [];
            let handleArr = [];
            this.hasscenceAll[0] &&
              this.hasscenceAll[0].algorithms &&
              this.hasscenceAll[0].algorithms.map((val) => {
                arr.push(val.name);
              });
            this.hasscenceAll[0] &&
              this.hasscenceAll[0].handlers &&
              this.hasscenceAll[0].handlers.map((val) => {
                handleArr.push(val.name);
              });
            this.hasscenceForm.algoruthmsName = arr.join(",");
            this.hasscenceForm.handlersName = handleArr.join(",");
            const hasscences = [];
            res &&
              res.result &&
              res.result.list.map((item) => {
                hasscences.push({
                  id: item.id,
                  deviceName: item.name,
                });
              });
            this.hasscences = hasscences;
            // console.log('hasscences',this.hasscences);
            // console.log('scences',this.scences);
          }
        })
        .catch();
    },

    // 已关联的分页
    getHasPageScence() {
      const params = {
        limit: this.limitHas,
        current: this.currentPageHas,
        deviceId: this.$store.state.deviceId,
      };
      deviceApi
        .scenePageList(params)
        .then((res) => {
          this.totalHas = this.res.result.total;
          const hasscences = [];
          res &&
            res.result &&
            res.result.list.map((item) => {
              hasscences.push({
                id: item.id,
                deviceName: item.name,
              });
            });
          this.hasscences = hasscences;
          // console.log('hasscences',this.hasscences);
          // console.log('scences',this.scences);
        })
        .catch();
    },
    //  弹出
    closeScence() {
      this.$store.state.scenceStyle = false;
      this.$store.state.deviceStyle = false;
      this.$store.state.commentStyle = false;
      this.$emit("closeScence");
    },
    // 删除场景
    deleteScence() {
      //console.log('删除关联设备的参数',this.hasscenceParams);
      //  this.$bus.$emit('getParams',this.hasscenceForm)
      //  console.log('deviceId',this.$store.state.deviceId);
      // console.log('12333');
      this.$store.state.scenceDelete = true;
      // console.log('deleteDeviceFlag', this.$store.state.scenceDelete);
      this.$emit("deleteScence");
    },
    // 添加场景
    addScence() {
      this.$emit("addScence");
    },
    // 取消
    cancle() {
      this.closeScence();
    },
    handleClick(tab, event) {},
    closeRegion() {
      this.$emit("closeRegion", true);
    },
    confirm() {
      this.$emit("confirm", true);
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
.regionWarp {
  width: 570px;
  height: 430px;
  position: relative;
  .bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .pageImg {
    height: 20px;
    margin-top: 10px;
    width: 19px;
    cursor: pointer;
  }
  .closeImg {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 1px;
    top: 1px;
  }
  .title {
    position: absolute;
    left: 26px;
    top: 18px;
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color:#25BCFF;
    line-height: 30px;
  }
  .imgIcon{
    width:24px;
    height:24px;
    top: 18px;
   }
  .line {
    width: 520px;
    height: 1px;
    border-bottom: 0.5px dotted rgba(151, 151, 151, 0.5);
    position: absolute;
    left: 27px;
    top: 55px;
  }
  .content {
    //   position: relative;
    //  background-color: blue;
    width: 520px;
    height: 360px;
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

.delete-scence {
  right: 80px;
  width: 120px;
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

.device-has {
  //  background-color: antiquewhite;
  width: 520px;
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
  width: 520px;
  height: 500px;
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
// 按钮
.confirmButton {
  position: absolute;
  bottom: 20px;
  width: 64px;
  right: 5px;
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
  right: 80px;
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
  overflow: hidden;
  z-index: 99;
  max-height: 100px;
  overflow: auto;
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
/deep/.el-form {
  margin-bottom: 20px;
  height: 400px;
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
// 修改switch样式
/deep/.el-switch__core,
.el-switch__label {
  display: inline-block;
  cursor: pointer;
  // background-color: rgba(37, 188, 255, 0.2) !important;
  border: 0.5px solid rgba(232, 238, 255, 0.001) !important;
}
/deep/.el-input.is-disabled .el-input__inner {
  background-color: rgba(72, 79, 97, 0.5);
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.input-item {
  margin-bottom: 1px;
}
.item-left {
  /deep/.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    margin-left: 100px !important;
  }
  /deep/.el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    width: 80px !important;
    font-size: 14px;
    color: #9aa0ab;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  /deep/.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    margin-left: 80px !important;
  }
  /deep/.el-input__inner {
    -webkit-appearance: none;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #ccd1df;
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
}
// 状态的字体样式
.state-word {
  width: 100%;
  height: 32px;
  line-height: 32px;
  margin-top: 3px;
  color: #25bcff;
  text-align: center;
  border-radius: 3px;
  border: 1px dotted #ccd1df;
  background: rgba(37, 188, 255, 0.2);
}
.add-scence {
  width: 80%;
  height: 30px;
  margin-left: 20px;
  line-height: 32px;
  margin-top: 5px;
  color: #25bcff;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #25bcff;
  background: rgba(37, 188, 255, 0.2);
}
.algority-word {
  color: #e8eeff;
}
/deep/.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  margin-left: 110px !important;
}
/deep/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  width: 110px !important;
  font-size: 14px;
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
  color: #ccd1df;
  display: inline-block;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
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
// 修改下拉框样式
::v-deep .el-select {
  width: 100%;
}
/deep/.el-input__icon {
  height: 100%;
  width: 22px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 38px;
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
</style>