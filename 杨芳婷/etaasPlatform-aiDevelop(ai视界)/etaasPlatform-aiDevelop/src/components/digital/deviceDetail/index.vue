<template>
  <div
    class="deviceDetail"
    id="deviceDetail"
    v-show="$store.state.deviceDetailShow"
  >
    <div class="earlyWarningTitle">
      设备信息详情
      <img
        src="~@/assets/digital/assets/img/earlyWarning/close.png"
        class="earlyWarningClose"
        @click="closeClick"
      />
    </div>
    <div>
      <div class="earlyWarningBorderCircle"></div>
      <div class="earlyWarningBorder"></div>
      <div class="earlyWarningBorderCircles"></div>
      <div class="clear"></div>
    </div>
    <div class="deviceDetailContent">
      <div class="deviceDetailLi">
        <div class="deviceDetailLiTitle">ID</div>
        <div class="deviceDetailLiInfo">{{ currentData.id }}</div>
        <div class="clear"></div>
      </div>
      <div class="deviceDetailLi">
        <div class="deviceDetailLiTitle">设备名称</div>
        <div class="deviceDetailLiInfo">{{ currentData.deviceName }}</div>
        <div class="clear"></div>
      </div>
      <div class="deviceDetailLiLeft deviceDetailLi">
        <div class="deviceDetailLiTitle">权重</div>
        <div class="deviceDetailLiInfo">{{ currentData.weight }}</div>
        <div class="clear"></div>
      </div>
      <div class="deviceDetailLiRight deviceDetailLi">
        <div class="deviceDetailLiTitle">设备序列号</div>
        <div class="deviceDetailLiInfo">{{ currentData.serialNumber }}</div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
      <div class="deviceDetailLiLeft deviceDetailLi">
        <div class="deviceDetailLiTitle">设备用户名</div>
        <div class="deviceDetailLiInfo">{{ currentData.username }}</div>
        <div class="clear"></div>
      </div>
      <div class="deviceDetailLiRight deviceDetailLi">
        <div class="deviceDetailLiTitle">设备密码</div>
        <div class="deviceDetailLiInfo">{{ currentData.password }}</div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
      <div class="deviceDetailLi">
        <div class="deviceDetailLiTitle">rtsp地址</div>
        <div class="deviceDetailLiInfo">{{ currentData.rtsp }}</div>
        <div class="clear"></div>
      </div>
      <div class="deviceDetailLi">
        <div class="deviceDetailLiTitle">运行状态</div>
        <div class="deviceDetailLiStatus">{{ currentData.state }}</div>
        <div class="clear"></div>
      </div>
      <div class="deviceDetailLi">
        <div class="deviceDetailLiTitle">识别算法</div>
        <div class="deviceDetailLiInfo">{{ currentData.algName }}</div>
        <div class="clear"></div>
      </div>
        <!-- <div class="deviceDetailLi">
        <div class="deviceDetailLiTitle">监管场景</div>
        <div class="deviceDetailLiSelect">
          <div @click="openValue" style="position: relative">
            <input
              v-model="seceneValue"
              type="text"
              placeholder="请选择"
              class="deviceDetailLiSelectInput"
            />
            <img
              src="~@/assets/digital/assets/img/deviceDetail/down.svg"
              alt=""
              style="width: 16px; position: absolute; right: 8px; top: 10px"
            />
          </div>

          <div class="deviceDetailList" v-show="show">
            <ul
              v-if="
                currentData &&
                currentData.scenes &&
                currentData.scenes.length !== 0
              "
            >
              <li
                @click="getValue(index, item)"
                v-for="(item, index) in currentData.scenes"
                :key="item.index"
              >
                {{ item.sceName }}
              </li>
            </ul>
            <div
              v-if="
                JSON.stringify(currentData) === '{}' ||
                JSON.stringify(currentData.scenes) === '{}' ||
                currentData.scenes.length === 0
              "
              class="deviceDetailNoData"
            >
              暂无数据
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div> -->
      <div class="deviceDetailLi">
        <div class="deviceDetailLiTitle">预警名称</div>
        <div class="deviceDetailLiInfo" style="color: #ff3426">
          {{ currentInfo.warningName }}
        </div>
        <div class="clear"></div>
      </div>
      <div class="deviceDetailLi">
        <div class="deviceDetailLiTitle">预警时间</div>
        <div class="deviceDetailLiInfo">{{ currentInfo.timeFormat }}</div>
        <div class="clear"></div>
      </div>
      <div class="deviceDetailLi">
        <div class="deviceDetailLiTitle">是否生效</div>
        <div class="deviceDetailLiInfo">
          <img
            src="~@/assets/digital/assets/img/deviceDetail/effective.png"
            class="effectiveImg"
            v-if="currentInfo.is_active === 1"
          />
        </div>
        <img
          src="~@/assets/digital/assets/img/deviceDetail/noeffective.svg"
          class="effectiveImg"
          v-if="currentInfo.is_active === 0"
        />
      </div>
      <div class="clear"></div>
      <div class="deviceDetailNote">备注:{{ currentData.comment }}</div>
    </div>

    <div class="deviceDetaiButton">查看历史数据</div>
  </div>
</template>
<script>
import { pageList } from "../../../api/ai/deviceManage";
import { setCharts } from "@/utils/digital/utils.js";
export default {
  name: "deviceDetail",
  props: {},
  data() {
    return {
      deviceDetailShow: false,
      currentData: {},
      seceneValue: "",
      currentInfo: {},
      show: false,
    };
  },
  mounted() {
    this.$bus.$on("deviceDetailEvent", () => {
      this.initData();
    });
  },
  watch: {
    "$store.state.deviceDetailShow": {
      handler(newV, oldV) {
        if (newV == true) {
          let x = document.getElementById("deviceDetail");
          //拖拽事件
          setCharts(x, this);
        }
      },
      deep: true,
    },
  },
  methods: {
    seceneChange(value) {
      this.currentData.scenes.map((element) => {
        if (element.sceName === value) {
          this.currentInfo = element;
        }
      });
    },

    //初始化数据
    initData() {
      let params = {
        limit: 999999,
        current: 1,
      };
      let that = this;
      pageList(params).then((res) => {
        if (res.result && res.result.list) {
          res.result.list.forEach((element) => {
            if (element.id === this.$store.state.currentCameraId) {
              that.currentData = element;
              that.currentData.scenesList = [];
              if (that.currentData.scenes.length !== 0) {
                that.currentInfo = that.currentData.scenes[0];
                that.seceneValue = that.currentData.scenes[0].sceName;
              }
              if (that.currentData.algNames.length !== 0) {
                that.currentData.algName = that.currentData.algNames.join(",");
              } else {
                that.currentData.algName = "";
              }

              for (let i in that.currentData) {
                if (!that.currentData[i]) {
                  that.currentData[i] = "--";
                }
              }
            }
          });
        }
      });
      //console.log(3434,this.$store.state.devicePageList)
    },

    //关闭事件
    closeClick() {
      this.$store.commit("setDeviceDetailShow", false);
    },

    openValue() {
      this.show = !this.show;
    },

    getValue(index, item) {
      this.seceneValue = item.sceName;
      this.show = false;
      this.currentData.scenes.map((element) => {
        if (element.sceName === item.sceName) {
          this.currentInfo = element;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.clear {
  clear: both;
}
.deviceDetail {
  position: fixed;
  right: 28%;
  z-index: 99;
  top: 10%;
  min-height: 509px;
  width: 23vw;
  padding-bottom: 16px;
  background: url("~@/assets/digital/assets/img/deviceDetail/bg.png") no-repeat
    center center;
  background-size: 100% 100%;
  .deviceDetailLiSelect {
    float: left;
    position: relative;
  }
  .deviceDetailNoData {
    width: 100%;
    overflow: hidden;
    color: #fff;
    font-size: 14px;
    text-align: center;
  }
  .deviceDetailList {
    position: absolute;
    top: 33px;
    width: 100%;
    border: 1px solid #979797;
    overflow: hidden;
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
  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='~@/assets/digital/assets/img/deviceDetail/bg.png', sizingMethod='scale');
  .earlyWarningTitle {
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #e8eeff;
    line-height: 30px;
    padding: 8px 26px 8px 26px;
  }

  .earlyWarningClose {
    position: absolute;
    right: 16px;
    top: 12px;
    width: 25px;
    cursor: pointer;
  }
  .earlyWarningBorderCircle {
    float: left;
    height: 2px;
    width: 2px;
    background: #fff;
    border-radius: 50%;
    margin-left: 26px;
  }
  .earlyWarningBorder {
    border-bottom: 1px dashed #979797;
    width: calc(100% - 52px);
    float: left;
  }
  .earlyWarningBorderCircles {
    float: left;
    height: 2px;
    width: 2px;
    background: #fff;
    border-radius: 50%;
    margin-right: 16px;
  }
  .earlyWarningTable {
    width: calc(100% - 52px) !important;
    margin: 0 auto;
    margin-top: 16px;
  }
  .deviceDetailContent {
    padding: 16px 26px 8px 26px;
  }
  .deviceDetailLi {
    line-height: 36px;
    font-size: 16px;
  }
  .deviceDetailLiTitle {
    float: left;
    color: #ccd1df;
    margin-right: 6px;
  }
  .deviceDetailLiInfo {
    color: #e8eeff;
  }
  .deviceDetailLiLeft {
    float: left;
    width: 50%;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }
  .deviceDetailLiRight {
    float: left;
    width: 50%;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }
  .deviceDetailNote {
    font-size: 14px;
    line-height: 36px;
    color: #e8eeff;
  }
  .deviceDetaiButton {
    cursor: pointer;
    width: 120px;
    font-size: 15px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin-left: 30px;
    background: rgba(170, 170, 170, 0.16);
    border: 1px solid rgba(170, 170, 170, 0.75);
    color: #fff;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }
  .deviceDetailLiStatus {
    width: 80px;
    height: 32px;
    float: left;
    background: rgba(37, 188, 255, 0.2);
    border-radius: 2px;
    color: #25bcff;
    text-align: center;
  }
  .effectiveImg {
    width: 30px;
  }
}
</style>
