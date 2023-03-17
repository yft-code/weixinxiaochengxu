const ApiRootUrl = 'http://180.101.119.122:9999/';

module.exports = {
  IndexUrl: ApiRootUrl + 'index/index', //首页数据接口
  AuthLoginByWeixin: ApiRootUrl + 'auth/token/wechatLogin', //微信登录
  ApplyRepair:ApiRootUrl + 'sp/sp-maintenance-record/wechat-application-for-repair', //报修申请
  RegionList:ApiRootUrl + 'om/building/get-region-list', //区域列表
  BuildingList:ApiRootUrl + 'om/building/get-building-by-region-list', //楼宇列表
  RepairRRecord:ApiRootUrl + 'sp/sp-maintenance-record/wechat-get-repair-record', //获取报修记录
  HandledList:ApiRootUrl + 'sp/sp-maintenance-record/wechat-get-repair-handled-detail', //维修待办已处理列表
  UnhandleList:ApiRootUrl + 'sp/sp-maintenance-record/wechat-get-repair-un-handle', //维修待办未处理列表
  UnhandleDetail:ApiRootUrl + 'sp/sp-maintenance-record/wechat-get-repair-un-handle-detail', //维修待办处理详情页面
  RoomList:ApiRootUrl + 'om/om-room/get-room-list-by-building-id', //维修待办处理详情页面
  getDateList:ApiRootUrl + 'sp/sp-maintenance-record/get-date-query-list', //日期查询列表
  unHandleList:ApiRootUrl + 'sp/pm-alarm-record/get-alarm-record-un-handle-list',//告警记录未处理列表
  handleList:ApiRootUrl + 'sp/pm-alarm-record/get-alarm-record-handled-list',//告警记录已处理列表
  handleDetail:ApiRootUrl + 'sp/pm-alarm-record/get-alarm-record-un-handle-detail',//告警记录未处理详情页面
  handleRecord:ApiRootUrl + 'sp/pm-alarm-record/handle-alarm-record',//告警记录处理
  queryDateRecord:ApiRootUrl + 'sp/pm-alarm-record/get-date-query-list',//获得已处理告警记录日期查询列表
  vehicleList:ApiRootUrl + 'pm/pm-vehicle/get-vehicle-by-wechat-list',//车辆列表
  saveVehicle:ApiRootUrl + 'pm/pm-vehicle/save-vehicle-by-wechat',//新增车辆
  updateVehicle:ApiRootUrl + 'pm/pm-vehicle/update-vehicle-by-wechat',//修改车牌号
  visitorRecordList:ApiRootUrl + 'pm/pm-visitor-record/wechat-get-visitor-record-list',//获取访客记录
  qrcode:ApiRootUrl + 'pm/pm-visitor-record/qrcode',//访客通行证二维码
  passCheck:ApiRootUrl + 'pm/pm-visitor-record/get-pass-check',//获得临时通行证
  isNotice:ApiRootUrl + 'sp/sp-maintenance-record/notice',//维修待办通知
  isAlarmNotice:ApiRootUrl + 'sp/pm-alarm-record/notice',//告警待办通知
  getVehicleBill:ApiRootUrl + 'pm/pm-vehicle-bill/get-vehicle-bill',//查询车辆缴费记录
  feeHandling:ApiRootUrl + 'pm/pm-vehicle-bill/monthly-fee-handling',//月费办理
  getTenantList:ApiRootUrl + 'om/om-tenant/get-tenant-list',//企业下拉列表
  getOwnerInfo:ApiRootUrl + 'pm/pm-vehicle-owner/get-vehicle-owner',//查询车主信息
  getParkingBill:ApiRootUrl + 'pm/pm-vehicle-bill/get-parking-bill',//停车缴费
  payParkingBill:ApiRootUrl + 'pm/pm-vehicle-bill/pay-vehicle-bill',//停车缴费立即支付模拟
  saveVisitorRecord:ApiRootUrl + 'pm/pm-visitor-record/save-visitor-record',//新增访客记录
}