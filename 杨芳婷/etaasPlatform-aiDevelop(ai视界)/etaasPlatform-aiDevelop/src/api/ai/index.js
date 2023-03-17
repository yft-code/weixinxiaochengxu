/**
 * api接口的统一出口
 */
import login from "@/api/ai/login";
import deviceManage from "@/api/ai/deviceManage";
import earlyWarning from "@/api/ai/earlyWarning";
import warningManage from "@/api/ai/warningManage";
import algorithmManage from "@/api/ai/algorithmManage";
import scenarioManagement from "@/api/ai/scenarioManagement";
import monitoringData from "@/api/ai/monitoringData";

// 导出接口
export default {
  // 登录接口
  login,
  // 设备管理接口
  deviceManage,
  // 预警事件接口
  earlyWarning,
  // 预警管理接口
  warningManage,
  // 算法管理接口
  algorithmManage,
  // 监管场景管理接口
  scenarioManagement,
  // 监控数据接口
  monitoringData
};
