<template>
  <div class="reportContainer">
    <div class="reportContent">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="预警事件统计" name="first">
          <warning-event
            :parkNameList="parkNameList"
            :buildingNameList="buildingNameList"
            :aloList="aloList"
            :sceneList="sceneList"
            :departList="departList"
            :deviceNameList="deviceNameList"
            :userData="userData"
          ></warning-event>
        </el-tab-pane>
        <el-tab-pane label="处理时效" name="second">
          <treatment-aging
            :userData="userData"
            :aloList="aloList"
            :departList="departList"
            :parkNameList="parkNameList"
            :buildingNameList="buildingNameList"
            :sceneList="sceneList"
            :deviceNameList="deviceNameList"
          />
        </el-tab-pane>
        <el-tab-pane label="算法评估" name="third">
          <algorith-evaluation
            :sceneList="sceneList"
            :parkNameList="parkNameList"
            :buildingNameList="buildingNameList"
            :aloList="aloList"
            :departList="departList"
            :deviceNameList="deviceNameList"
          ></algorith-evaluation>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {
  userPageList,
  getUserDetailInfo,
  queryUserId,
} from "@/api/ai/scenarioManagement";
import * as api from "@/api/ai/earlyWarning";
import warningEvent from "./warningEvent";
import treatmentAging from "./treatmentAging";
import algorithEvaluation from "./algorithEvaluation";
import {
  buildnameList,
  parknameList,
  serialnumberList,
  stateList,
  getParknameList,
  getBuildnameList,
} from "../../../api/ai/deviceManage";
import { getAlgorithm } from "@/api/ai/algorithmManage";
import {
  getDepartInfo,
  getDeviceInfo,
  getUserInfo,
} from "@/api/ai/warningEvent";
export default {
  name: "reportView",
  components: { warningEvent, treatmentAging, algorithEvaluation },
  data() {
    return {
      activeName: "first",
      parkNameList: [],
      buildingNameList: [],
      aloList: [],
      sceneList: [],
      departList: [],
      deviceNameList: [],
      userData: [],
    };
  },
  created() {},
  mounted() {
    //初始化数据,传入公有数据
    this.getSceneList();
    //this.getBuildingNameList();
    this.getParkNameList();
    this.getList();
    this.getdepart();
    this.getDevice();
    this.getUser();
  },
  methods: {
    handleClick(tab, event) {},
    async getUser() {
      let params = {
        pageSize: 99999,
        pageNum: 1,
      };
      let arr = [];
      let id;
      if (localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']) {
        id = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'].id;
        let param = {
          id: id,
        };
        await queryUserId(param)
          .then((res) => {
            if (res.code === 0) {
              if (res.result)
                res.result.organizations.map((element) => {
                  params["id"] = element.organizationId;
                  userPageList(params)
                    .then((response) => {
                      if (response.code === 0) {
                        const userData = [];
                        userData.push({
                          id: "全部",
                          username: "全部",
                        });
                        response.result.list.map((val2) => {
                          userData.push({
                            id: val2.id,
                            username: val2.name,
                          });
                        });
                        this.userData = userData;
                        this.userData = this.deWeightThree(this.userData, "id");
                      }
                    })
                    .catch();
                });
            }
          })
          .catch();
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
    //获取设备名称
    getDevice() {
      getDeviceInfo()
        .then((res) => {
          if (res.code === 0) {
            this.deviceNameList = res.result;
          }
        })
        .catch();
    },

    getdepart() {
      let id;
      if (localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']) {
        id = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'].id;
        let param = {
          id: id,
        };
        getUserDetailInfo(param)
          .then((response) => {
            if (response.code === 0) {
              //改造数据,增加value和label
              if (
                response.result &&
                response.result &&
                response.result.length !== 0
              ) {
                response.result.map((element) => {
                  element.label = element.name;
                  element.value = element.id;
                  if (element.children && element.children.length !== 0) {
                    element.children.map((val) => {
                      val.label = val.name;
                      val.value = val.id;
                      if (val.children && val.children.length !== 0) {
                        val.children.map((val2, index2) => {
                          val2.label = val2.name;
                          val2.value = val2.id;
                          if (val2.children && val2.children.length !== 0) {
                          } else {
                            val2.children = "";
                          }
                        });
                      } else {
                        val.children = "";
                      }
                    });
                  } else {
                    element.children = "";
                  }
                });
                this.departList = response.result;
              }
            }
          })
          .catch();
      }
    },
    // 获取场景列表
    getSceneList() {
      api.sceneList().then((res) => {
        this.sceneList = res.result;
      });
    },
    getBuildingNameList() {
      getBuildnameList().then((res) => {
        this.buildingNameList = res.result;
      });
    },
    getParkNameList() {
      getParknameList().then((res) => {
        this.parkNameList = res.result;
      });
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
          res.result.list &&
            res.result.list.map((item) => {
              arr.push(item.name);
            });
          arr.unshift("全部");
          this.aloList = arr;
        })
        .catch();
    },
  },
};
</script>
<style lang="scss" scoped>
.reportContainer {
    .reportContent {
    width: 97%;
    margin: 24px auto;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 8px 24px;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
  }
}
</style>