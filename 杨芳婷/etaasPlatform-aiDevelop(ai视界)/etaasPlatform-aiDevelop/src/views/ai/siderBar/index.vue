<template>
  <div>
    <div
      v-if="isLogin"
      class="menuSider"
      :style="{ minHeight: clientHeight + 'px' }"
      :class="[openIcon ? 'styleAA' : '']"
    >
      <el-scrollbar
        wrap-class="scrollbar-wrapper"
        :class="[openIcon ? 'styleAA' : '']"
        class="menuSiderScroll"
      >
        <el-menu
          class="muen-el"
          style="overflow: auto; overflow-x: hidden"
          :style="{ maxHeight: `${screenHeight1}px` }"
          :collapse-transition="false"
          ref="menus"
          :collapse="openIcon"
          @close="handleClose"
          :default-active="activeMenu"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :router="true"
          mode="vertical"
        >
          <sidebar-item
            v-for="route in routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
            :class="{ bgOne: route.isShow }"
          />
        </el-menu>
      </el-scrollbar>
      <div :class="[openIcon ? 'icBottom1' : 'icBottom']">
        <i
          class="iconfont icon-Expand fn"
          v-show="openIcon"
          @click="openItem"
        ></i>
        <i
          class="iconfont icon-Collect fn"
          v-show="!openIcon"
          @click="closeItem"
        ></i>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
import variables from "@/assets/aiStyles/variables.scss";
import * as api from "@/api/ai/earlyWarning";
import { getMenu } from "../../../api/ai/menu";

//  :default-openeds="['/3D', '/AI','/TaskCenter','/dataCenter','/userCenter']"
export default {
  name: "SiderBar",
  components: { SidebarItem },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
  },

  watch: {
    // 根据路由监听判断是否是登录状态
    $route: function (val) {
      if (val.path === "/") {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
  },
  data() {
    return {
      arr: [],
      // 展开时的路由
      routes: [],
      // 关闭时的路由
      closeRoutes: [],
      // 中间值
      mRouters: [],
      wholeRoute: [],
      screenHeight1: document.body.clientHeight - 115,
      // screenHeight: document.body.clientHeight - 110,
      // windowWidth: document.documentElement.clientWidth,
      aa: [],
      bb: [],
      cc: [],
      dd: [],
      ee: [],
      a: [],
      b: [],
      d: [],
      c: [],
      width1: 260,
      openIcon: false,
      isLogin: false,
      clientHeight: document.body.clientHeight - 56,
    };
  },

  mounted() {
    const that = this;
    window.addEventListener("resize", function () {
      return (() => {
        // const aa = document.getElementsByTagName("a")[1];
        // aa && (aa.parentElement.hidden = true);
        // aa && (aa.parentElement.style.display = true);
        window.clientHeight = document.body.clientHeight - 56;
        that.clientHeight = window.clientHeight;
        window.screenHeight = document.body.clientHeight - 115;
        that.screenHeight1 = window.screenHeight;
      })();
    });
    // 刷新浏览器事件判断
    if (this.$route.path === "/") {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }

    if (this.isLogin) {
      this.getMenus();
    }
    this.$bus.$on("getMenuEvent", () => {
      this.getMenus();
    });
  },

  methods: {
    // 获取菜单
    getMenus() {
      let arr = [];
      getMenu().then((res) => {
        arr = res.result;
        //  展开时对数据的处理
        if (arr && arr.length !== 0) {
          arr.forEach((element) => {
            if (element.button === null) {
              delete element.button;
            }
            if (element.children === null || element.children.length === 0) {
              delete element.children;
              // 添加isShow控制el-menu-item的样式变化
              element.isShow = true;
            } else {
              element.isShow = false;
              if (element.children.length === 1) {
                element.children.push({
                  path: "",
                  name: "",
                });
              }
              element.children.forEach((val) => {
                val.path = val.name;
                // 刚登录时删除子路由的icon
                if (val.meta) {
                  val.meta.icon = "";
                }
                if (val.children === null) {
                  delete val.children;
                }
                if (val.button === null) {
                  delete val.button;
                }
              });
            }
          });
        }
        this.routes = arr;
        this.mRouters = arr;
        // 关闭时对数据的处理
        // this.getCloseMenus()
      });
    },
    // // 获取关闭时的路由
    // getCloseMenus() {
    //   let arr = []
    //   getMenu().then((res) => {
    //     arr = res.result
    //     //  展开时对数据的处理
    //     if (arr && arr.length !== 0) {
    //       arr.forEach((element) => {
    //         if (element.button === null) {
    //           delete element.button;
    //         }
    //         if (element.children === null||element.children.length===0) {
    //           delete element.children;
    //            element.meta.icon=''
    //            element.isShow=true
    //         } else {
    //            element.isShow=false
    //           if (element.children.length === 1) {
    //             element.children.push({
    //               path: "",
    //               name: "",
    //             });
    //           }
    //          if(element.meta&&element.meta.icon) {
    //            element.meta.icon=''
    //          }
    //           element.children.forEach((val) => {
    //             val.path = val.name;
    //             if (val.children === null) {
    //               delete val.children;
    //             }
    //             if (val.button === null) {
    //               delete val.button;
    //             }
    //           });
    //         }
    //       });
    //     }
    //       this.closeRoutes = arr;
    //     // 关闭时对数据的处理
    //   });
    // },

    handleClose(key, keyPath) {
      // this.$refs.menus.open(keyPath)
    },
    // 打开菜单
    openItem() {
      this.$bus.$emit("msg", true);
      //将收缩显示的菜单进行深拷贝，赋值给this.routes
      //this.routes = JSON.parse(JSON.stringify(this.mRouters));
      // this.routes.forEach((element) => {
      //   if (element.meta.title === "HI..") {
      //     element.meta.title = "历史监控";
      //   } else if (element.meta.title === "TA..") {
      //     element.meta.title = "任务中心";
      //   } else if (element.meta.title === "3D..") {
      //     element.meta.title = "3D实景仿真";
      //   } else if (element.meta.title === "CO..") {
      //     element.meta.title = "配置中心";
      //   } else if (element.meta.title === "US..") {
      //     element.meta.title = "用户中心";
      //   }else if(element.meta.title === "RE..") {
      //     element.meta.title = "报表中心";
      //   }else if(element.meta.title === "HO..") {
      //     element.meta.title = "视界中心";
      //   }
      // });
      this.openIcon = false;
    },

    closeItem() {
      this.$bus.$emit("msg", false);
      //保存数据
      //将收缩显示的菜单进行深拷贝，赋值给this.routes
      this.routes = [];
      this.routes = JSON.parse(JSON.stringify(this.mRouters));
      // // 结构重构
      // let arr = [];
      // this.routes.forEach((element, index) => {
      //   if(element.meta.title === "历史监控") {
      //     element.meta.title = "HI..";
      //     arr.push(element);
      //     if (element.children) {
      //       element.children.forEach((val) => {
      //         val.path = element.path + "/" + val.name;
      //         arr.push(val);
      //       });
      //     }else{
      //       element['children'] = [];
      //       element['children'].push(
      //         {
      //           path:'/monitoringData',
      //           name:'历史监控',
      //           meta:{
      //             title:'历史监控'
      //           }
      //         },
      //         {
      //           path:'',
      //           name:''
      //         }
      //       )
      //     }
      //   } else if (element.meta.title === "任务中心") {
      //     element.meta.title = "TA..";
      //     arr.push(element);
      //     if (element.children) {
      //       element.children.forEach((val) => {
      //         val.path = element.path + "/" + val.name;
      //         arr.push(val);
      //       });
      //     }
      //   } else if (element.meta.title === "3D实景仿真") {
      //     element.meta.title = "3D..";
      //     arr.push(element);
      //     if (element.children) {
      //       element.children.forEach((val) => {
      //         val.path = element.path + "/" + val.name;
      //         arr.push(val);
      //       });
      //     }
      //   } else if (element.meta.title === "配置中心") {
      //     element.meta.title = "CO..";
      //     arr.push(element);
      //     if (element.children) {
      //       element.children.forEach((val) => {
      //         val.path = element.path + "/" + val.name;
      //         arr.push(val);
      //       });
      //     }
      //   } else if (element.meta.title === "用户中心") {
      //     element.meta.title = "US..";
      //     arr.push(element);
      //     if (element.children) {
      //       element.children.forEach((val) => {
      //         val.path = element.path + "/" + val.name;
      //         arr.push(val);
      //       });
      //     }
      //   } else if (element.meta.title === "报表中心") {
      //     element.meta.title = "RE..";
      //     arr.push(element);
      //     if (element.children) {
      //       element.children.forEach((val) => {
      //         val.path = element.path + "/" + val.name;
      //         arr.push(val);
      //       });
      //     }else{
      //       element['children'] = [];
      //       element['children'].push(
      //         {
      //           path:'/reportView',
      //           name:'报表中心',
      //           meta:{
      //             title:'报表中心'
      //           }
      //         },
      //         {
      //           path:'',
      //           name:''
      //         }
      //       )
      //     }
      //   } else if (element.meta.title === "视界中心") {
      //     element.meta.title = "HO..";
      //     arr.push(element);
      //     if (element.children) {
      //       element.children.forEach((val) => {
      //         val.path = element.path + "/" + val.name;
      //         arr.push(val);
      //       });
      //     }else{
      //       element['children'] = [];
      //       element['children'].push(
      //         {
      //           path:'/horizonCenter',
      //           name:'视界中心',
      //           meta:{
      //             title:'视界中心'
      //           }
      //         },
      //         {
      //           path:'',
      //           name:''
      //         }
      //       )
      //     }
      //   }else if (element.meta.title === "设备管理") {
      //     element.meta.title = "DM..";
      //     arr.push(element);
      //     if (element.children) {
      //       element.children.forEach((val) => {
      //         val.path = element.path + "/" + val.name;
      //         arr.push(val);
      //       });
      //     }else{
      //       element['children'] = [];
      //       element['children'].push(
      //         {
      //           path:'/deviceManage',
      //           name:'设备管理',
      //           meta:{
      //             title:'设备管理'
      //           }
      //         },
      //         {
      //           path:'',
      //           name:''
      //         }
      //       )
      //     }
      //   }else if (element.meta.title === "事件中心") {
      //     element.meta.title = "EC..";
      //     arr.push(element);
      //     if (element.children) {
      //       element.children.forEach((val) => {
      //         val.path = element.path + "/" + val.name;
      //         arr.push(val);
      //       });
      //     }else{
      //       element['children'] = [];
      //       element['children'].push(
      //         {
      //           path:'/earlyWarning',
      //           name:'事件中心',
      //           meta:{
      //             title:'事件中心'
      //           }
      //         },
      //         {
      //           path:'',
      //           name:''
      //         }
      //       )
      //     }
      //   }
      // });
      // this.routes = arr;
      this.openIcon = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.muen-el {
  //滚动条整体
  height: 100%;
  &::-webkit-scrollbar {
    width: 6px;
    height: 14px;
  }
  //滚动条小方块
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    height:5PX !important;
    -webkit-box-shadow: inset 0 0 5px rgb(199, 203, 209);
    background: rgb(199, 203, 209);
  }
  //滚动条轨道
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgb(248, 248, 248);
    border-radius: 0;
    background: rgb(248, 248, 248);
  }
}
.fn {
  cursor: pointer;
  font-size: 25px;
  margin-left: 18px;
  line-height: 56px;
}
.icBottom {
  border-top: #f3f3f5 1px solid;
  position: fixed;
  bottom: 6px;
  width: 260px;
  height: 50px;
  // background: red;
}
.icBottom1 {
  height: 50px;
  border-top: #f3f3f5 1px solid;
  position: fixed;
  bottom: 6px;
  width: 64px;
}

.styleAA {
  width: 64px !important;
  /deep/ .el-submenu__title span {
    display: none;
  }
  /deep/.el-submenu__icon-arrow {
    display: none;
  }
}
/deep/ .el-menu--collapse {
  width: 100%;
}
/deep/ .el-scrollbar__bar.is-horizontal {
  height: 0;
}
/deep/ .el-icon-arrow-right:before {
  content: "";
}
/deep/ .el-menu {
  background: #ffffff;
  border-right: none;
  a:nth-child(3) {
    color: red;
  }
}
/deep/ .el-menu-item {
  color: rgba(10, 25, 51, 0.5) !important;
  font-size: 14PX !important;
}
/deep/ .el-menu-item i {
  color: #0a1933 !important;
  font-size: 14PX;
}
.bgOne {
  /deep/ .el-menu-item {
    color: #0a1933 !important;
    // text-align: center;
    font-size: 14PX !important;
    background-color: rgba(10, 25, 51, 0.02) !important;
  }
  /deep/ .el-menu-item i {
    color: #0a1933 !important;
    font-size: 14PX;
  }
}
/deep/ .el-menu-item.is-active {
  //  text-decoration: none;
  color: rgb(64, 158, 255) !important;
  background: rgba(52, 127, 255, 0.1) !important;
  border-right: 2px solid;
}
/deep/ .el-submenu__title {
  // height: 48px;
  // line-height: 48px;
  font-weight: 400;
  // color: #0a1933 !important;
  color: #0a1933 !important;
  background-color: rgba(10, 25, 51, 0.02) !important;
  font-size: 14PX;
}
/deep/ .el-submenu__title i {
  font-size: 14PX;
  color: #0a1933 !important;
}
/deep/ .el-menu-item i {
  font-size: 14PX;
  color: #0a1933 !important;
  margin-right: 4PX;
}

[data-v-0ac34886] /deep/.el-submenu .el-menu-item {
  min-width: 100PX !important;
  padding: 0 !important;
  padding-left: 18PX !important;
}
/deep/ .el-scrollbar__wrap {
  margin-right: 0px !important;
  overflow: hidden;
}
a:nth-child(3) {
  color: red;
}
.el-scrollbar {
  overflow: initial;
}
/deep/.el-menu-item:hover {
  background-color: rgba(6, 16, 48, 0.03) !important;
}
.menuSider {
  width: 260px;
  height: 100%;
  background: #ffffff;
  // background: red;

  box-shadow: 0px 0px 7px -3px rgba(10, 25, 51, 0.2);
  /deep/.el-scrollbar__view{
    height: 100%;
  }
  .menuSiderScroll {
    // background: blue;
    position: fixed;
    height: 100%;
    width: 266px;
    left: 0;
    top: 64px;
  }
}
.menuFirstTitle {
  height: 64px;
  background: #347fff;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  line-height: 36px;
  display: flex;
  align-items: center;
  p {
    margin-left: 20px;
  }
}

@media screen and (max-width: 1680px) {
  /deep/.menuSiderScroll {
    top: 76px !important;
  }
}
</style>
<style lang="scss">
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>>

