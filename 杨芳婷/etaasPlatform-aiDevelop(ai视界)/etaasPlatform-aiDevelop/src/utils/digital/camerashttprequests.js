import http from "./http";
let axioses = http.axioses;
const BASE_URL = "http://124.71.153.0:30034";
const BASE_URL2 = "/flv"
// 获取摄像头列表的接口
const getCameras = () => axioses(BASE_URL + "/video/list", {}, "GET");

//获取http-flv视频流
const getHttpflv = params =>
  axioses(BASE_URL2 + "/video/stream", params, "POST");

const getEventsFind = (params, page, pageSize, camera_id) =>
  axioses(
    BASE_URL +
    "/video/warning/find?page=" +
    page +
    "&pageSize=" +
    pageSize +
    "&camera_id=" +
    camera_id +
    "",
    params,
    "POST"
  );
//获取算法的列表
const getAlgorithmList = () => axioses(BASE_URL + "/video/events", {}, "GET");

//获取事件详情
const getEventsDetail = params =>
  axioses(BASE_URL + "/video/warning/detail", params, "POST");

//事件数量的查询接口
const getEventsNum = () =>
  axioses(BASE_URL + "/video/warning/count", {}, "GET");

export {
  getEventsNum,
  getHttpflv,
  getEventsFind,
  getAlgorithmList,
  getEventsDetail,
  getCameras
};
