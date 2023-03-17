// AI视界路由
const paasMaps = [
  
  {
    path: "/deviceManage",
    name: "deviceManage",
    meta: { title: "设备管理", icon: "icon-a-AlgorithmManagement" },
    component: resolve =>
      require(["@/views/deviceManage/index"], resolve)
  },
  {
    path: "/3D",
    name: "3D",
    meta: { title: "3D实景仿真", icon: "icon-a-AlgorithmManagement" },
    component: resolve => require(["@/views/3d/index"], resolve),
  },
  // {
  //   path: "earlyWarning",
  //   name: "earlyWarning",
  //   meta: { title: "事件中心", icon: "icon-a-EarlyWarningEvents" },
  //   component: resolve =>
  //     require(["@/views/ai/earlyWarning/index"], resolve)
  // },
  // {
  //   path: "/AI",
  //   name: "AI",
  //   meta: { title: "配置中心", icon: "" },
  //   component: resolve => require(["@/views/ai/aiIndex/index"], resolve),
  //   children: [
  //     {
  //       path: "constructionManagement",
  //       name: "constructionManagement",
  //       meta: { title: "建筑管理", icon: "icon-a-EquipmentManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/constructionManagement/index"], resolve)
  //     },
  //     {
  //       path: "regionManage",
  //       name: "regionManage",
  //       meta: { title: "区域管理", icon: "icon-a-EquipmentManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/regionManage/index"], resolve)
  //     },
  //     {
  //       path: "eventConfiguration",
  //       name: "eventConfiguration",
  //       meta: { title: "事件配置", icon: "icon-a-EquipmentManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/eventConfiguration/index"], resolve)
  //     },
  //     //     {
  //     //     path: "regionManage",
  //     //     name: "regionManage",
  //     //     meta: { title: "区域管理", icon: "icon-a-EquipmentManagement" },
  //     //     component: resolve =>
  //     //     require(["@/views/ai/regionManage/index"], resolve)
  //     //      },
  //     //    {
  //     //     path: "constructionManagement",
  //     //    name: "constructionManagement",
  //     //    meta: { title: "建模文件管理", icon: "icon-a-EquipmentManagement" },
  //     //   component: resolve =>
  //     //   require(["@/views/ai/constructionManagement/index"], resolve)
  //     //  },
  //     {
  //       path: "tupleRoom",
  //       name: "tupleRoom",
  //       meta: { title: "元组件管理", icon: "icon-a-EarlyWarningManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/tupleRoom/index"], resolve)
  //     },
  //     {
  //       path: "timeTemplate",
  //       name: "timeTemplate",
  //       meta: { title: "时间模板", icon: "icon-a-EarlyWarningManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/timeTemplate/index"], resolve)
  //     }
  //     // {
  //     //   path: "warningManage",
  //     //   name: "warningManage",
  //     //   meta: { title: "预警管理", icon: "icon-a-EarlyWarningManagement" },
  //     //   component: resolve =>
  //     //     require(["@/views/ai/warningManage/index"], resolve)
  //     // },
  //     // {
  //     //   path: "scenarioManagement",
  //     //   name: "scenarioManagement",
  //     //   meta: { title: "监管场景", icon: "icon-a-Regulatoryscenarios" },
  //     //   component: resolve =>
  //     //     require(["@/views/ai/scenarioManagement/index"], resolve)
  //     // },
  //   ]
  // },
  // {
  //   path: "/notification",
  //   name: "notification",
  //   meta: { title: "通知管理", icon: "icon-renlianyingyong" },
  //   component: resolve => require(["@/views/ai/aiIndex/index"], resolve),
  //   children: [
  //     {
  //       path: "pushLog",
  //       name: "pushLog",
  //       meta: { title: "推送日志", icon: "icon-a-EarlyWarningManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/notification/pushLog/index"], resolve)
  //     },
  //     {
  //       path: "notifitTemplate",
  //       name: "notifitTemplate",
  //       meta: { title: "通知模板", icon: "icon-a-EarlyWarningManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/notification/notifitTemplate/index"], resolve)
  //     },
  //     {
  //       path: "mailConfiguration",
  //       name: "mailConfiguration",
  //       meta: { title: "邮箱配置", icon: "icon-a-EarlyWarningManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/notification/mailConfiguration/index"], resolve)
  //     }
  //   ]
  // },
  // {
  //   path: "/material",
  //   name: "material",
  //   meta: { title: "素材采集", icon: "icon-a-EquipmentManagement" },
  //   component: resolve => require(["@/views/ai/aiIndex/index"], resolve),
  //   children: [
  //     {
  //       path: "task",
  //       name: "task",
  //       meta: { title: "采集任务", icon: "icon-a-EarlyWarningManagement"},
  //       component: resolve =>
  //         require(["@/views/ai/materialManage/task/index"], resolve)
  //     },
  //     {
  //       path: "list",
  //       name: "list",
  //       meta: { title: "素材列表", icon: "icon-a-EarlyWarningManagement"},
  //       component: resolve =>
  //         require(["@/views/ai/materialManage/list/index"], resolve)
  //     }
  //   ]
  // },
  // {
  //   path: "/scenario",
  //   name: "scenario",
  //   meta: { title: "监管场景管理", icon: "icon-jianguanchangjing" },
  //   component: resolve => require(["@/views/ai/aiIndex/index"], resolve),
  //   children: [
  //     {
  //       path: "warningManage",
  //       name: "warningManage",
  //       meta: { title: "预警管理", icon: "icon-a-EarlyWarningManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/warningManage/index"], resolve)
  //     },
  //     {
  //       path: "scenarioManagement",
  //       name: "scenarioManagement",
  //       meta: { title: "监管场景", icon: "icon-a-Regulatoryscenarios" },
  //       component: resolve =>
  //         require(["@/views/ai/scenarioManagement/index"], resolve)
  //     },
  //   ],
  // },
  {
    path: "/algorithm",
    name: "algorithm",
    meta: { title: "算法管理", icon: "icon-a-AlgorithmManagement" },
    component: resolve => require(["@/views/aiIndex/index"], resolve),
    children: [
      {
        path: "algorithmManage",
        name: "algorithmManage",
        meta: { title: "算法库", icon: "" },
        component: resolve =>
          require(["@/views/algorith/index"], resolve)
      },
      {
        path: "project",
        name: "algorithmManage",
        meta: { title: "项目库", icon: "" },
        component: resolve =>
          require(["@/views/project/index"], resolve)
      }
    ],
  },
  // {
  //   path: "/faceApplication",
  //   name: "faceApplication",
  //   meta: { title: "人脸应用", icon: "icon-renlianyingyong" },
  //   component: resolve => require(["@/views/ai/aiIndex/index"], resolve),
  //   children: [
    
  //     {
  //       path: "captureRecord",
  //       name: "captureRecord",
  //       meta: { title: "抓拍记录", icon: "icon-a-PersonnelControl" },
  //       component: resolve => require(["@/views/ai/captureRecord/index"], resolve)
  //     },
  //     {
  //       path: "faceSearch",
  //       name: "faceSearch",
  //       meta: { title: "以图搜图", icon: "icon-a-AlgorithmManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/faceSearch/index"], resolve)
  //     },
  //     {
  //       path: "userManager",
  //       name: "userManager",
  //       meta: { title: "人脸库", icon: "icon-a-PersonnelControl" },
  //       component: resolve => require(["@/views/ai/userManager/index"], resolve)
  //     }
  //   ],
  // },
  // {
  //   path: "/hiddenDanger",
  //   name: "hiddenDanger",
  //   meta: { title: "隐患库", icon: "icon-yinhuanshibie" },
  //   component: resolve => require(["@/views/ai/aiIndex/index"], resolve),
  //   children: [
  //     {
  //       path: "dangerInfo",
  //       name: "dangerInfo",
  //       meta: { title: "隐患信息", icon: "icon-a-AlgorithmManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/hiddenDanger/dangerInfo/index"], resolve)
  //     },
  //     {
  //       path: "dangerRecognizing",
  //       name: "dangerRecognizing",
  //       meta: { title: "隐患识别", icon: "icon-a-AlgorithmManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/hiddenDanger/dangerRecognizing/index"], resolve)
  //     },
  //     {
  //       path: "dangerlibManage",
  //       name: "dangerlibManage",
  //       meta: { title: "隐患库管理", icon: "icon-a-AlgorithmManagement" },
  //       component: resolve =>
  //         require(["@/views/ai/hiddenDanger/dangerlibManage/index"], resolve)
  //     }
  //   ],
  // },
  // {
  //   path: "/reportView",
  //   name: "reportView",
  //   meta: { title: "报表中心", icon: "icon-a-EquipmentManagement" },
  //   component: resolve => require(["@/views/ai/reportView/index"], resolve)
  // },
  // {
  //   path: "monitoringData",
  //   name: "monitoringData",
  //   meta: { title: "历史监控", icon: "icon-a-MonitoringData" },
  //   component: resolve =>
  //     require(["@/views/ai/monitoringData/index"], resolve)
  // },
  // {
  //   path: "/horizonCenter",
  //   name: "horizonCenter",
  //   meta: { title: "视界中心", icon: "" },
  //   component: resolve =>
  //     require(["@/views/ai/horizonCenter/index"], resolve)
  // },
  // {
  //   path: "generalView",
  //   name: "generalView",
  //   meta: { title: "概览", icon: "" },
  //   component: resolve =>
  //     require(["@/views/ai/generalView/index"], resolve)
  // },
  // 元组件路由
];
export const aiMaps = {
  paasMaps
};
