// 往state里面存数据
import state from "./state";
const mutations = {
  // setVideoContainerShow() {
  //   state.videoContainerShow = !state.videoContainerShow;
  // },
  setStorageTanks(state, componentInfo) {
    state.storageTanks = componentInfo;
  },
  setrightinfo(state, info) {
    state.rightinfo = info;
  },
  setEventDetailShow(state, bool) {
    if (bool) {
      state.eventDetailShow = bool;
    } else {
      state.eventDetailShow = !state.eventDetailShow;
    }
  },
  setEarlyWarnigShow(state, bool) {
    if (bool) {
      state.earlyWarnigShow = bool;
    } else {
      state.earlyWarnigShow = !state.earlyWarnigShow;
    }
  },
  setDeviceDetailShow(state, bool) {
    if (bool) {
      state.deviceDetailShow = bool;
    } else {
      state.deviceDetailShow = !state.deviceDetailShow;
    }
  },
  setHandleData(state, item) {
    state.handleData = item
  },
  setToolbarShow(state) {
    state.toolbarShow = false
  },
  setPointInfoShow(state, info) {
    state.areaInfo = info;
  },
  setAreaId(state, areaId) {
    state.setAreaId = areaId
  }
};
export default mutations;
