export const customHeaderData = {
  // 是否重置监测项目
  isReset: false,
  titleCustom: "筛选的监测项目",
  tableColumns: [
    {
      prop: "name",
      label: "名称",
      show: true,
      fixShow: true,
    },
    {
      prop: "area",
      label: "区域",
      show: true,
      fixShow: true,
    },
    {
      prop: "basin",
      label: "流域",
      show: true,
      fixShow: true,
    },
    {
      prop: "pointName",
      label: "点位名称",
      show: true,
      fixShow: false,
    },
    {
      prop: "monitorTime",
      label: "时间",
      show: true,
      fixShow: false,
    },
    {
      prop: "temperature",
      label: "水温(℃)",
      show: true,
      fixShow: false,
    },
    {
      prop: "ph",
      label: "ph(6.0-9.0)",
      show: true,
      fixShow: false,
    },
    {
      prop: "conductivity",
      label: "电导率(μS/cm)",
      show: true,
      fixShow: false,
    },
    {
      prop: "turbidity",
      label: "浊度(NTU)",
      show: true,
      fixShow: false,
    },
    {
      prop: "potassiumPermanganate",
      label: "高锰酸盐指数(mg/L)",
      show: true,
      fixShow: false,
    },
    {
      prop: "ammoniaNitrogen",
      label: "氨氮(mg/L)",
      show: false,
      fixShow: false,
    },
    {
      prop: "totalPhosphorus",
      label: "总磷(mg/L)",
      show: false,
      fixShow: false,
    },
    {
      prop: "totalNitrogen",
      label: "总氨(mg/L)",
      show: false,
      fixShow: false,
    },
  ],
  defaultRadio: "default",
};
