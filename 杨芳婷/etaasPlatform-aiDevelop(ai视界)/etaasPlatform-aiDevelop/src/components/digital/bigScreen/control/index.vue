<template>
  <div>
    <div v-if="$store.state.modelShow" class="control-container">
      <div class="tool-word">工具栏</div>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        text-color="#fff"
        background-color="#1D212D"
      >
        <template v-for="item in list">
          <el-submenu
            v-if="item.childrenMenu && item.childrenMenu.length"
            :index="item.id"
            :key="item.id"
          >
            <template slot="title">
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  {{ item.name }}
                </div>
                <i
                  :class="[
                    item.name === '视角切换'
                      ? 'iconfont icon-a-1024-shijiaoqiehuan'
                      : '',
                    'icon-word',
                  ]"
                ></i>
              </el-tooltip>
            </template>

            <!--二级菜单-->
            <template v-for="itemChild in item.childrenMenu">
              <el-submenu
                v-loading="loading"
                v-if="itemChild.children && itemChild.children.length"
                :index="itemChild.id"
                :key="itemChild.id"
              >
                <template slot="title">
                  <div @click="getNewModel(itemChild)">
                    {{ itemChild.name }}
                  </div>
                </template>

                <!--三级菜单-->
                <el-menu-item
                  v-for="itemChild_child in itemChild.children"
                  :index="itemChild_child.id"
                  :key="itemChild_child.id"
                  @click="flyTo(itemChild_child.id)"
                >
                  <span slot="title">{{ itemChild_child.name }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="itemChild.id" :key="itemChild.id">{{
                itemChild.name
              }}</el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :index="item.id" :key="item.id">
            <i v-if="item.name!=='模式切换'"
              @click="handleEvent(item.name)"
              :class="[
            item.name === '后台管理'
              ?  'iconfont icon-a-MonitoringData icon-title icon-middle'
              :  item.name === '视角切换'
              ? 'iconfont icon-a-1024-shijiaoqiehuan icon-word'
              :  item.name === '区域/设备关联'
              ? 'icon-a-1024-shezhi iconfont icon-word'
              : '',
          ]"
            ></i>
            <img  @click="handleEvent(item.name)" width="28" height="30" v-if="item.name === '模式切换'" src="@/assets/img/ai/modeChange.png" alt="">
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { getModels } from "@/api/digital/menu.js";
import { getBuildingPageList } from "@/api/ai/constructionManagement";
export default {
  data() {
    return {
      models: [],
      children: [],
      isCollapse: true,
      editFlag: true,
      menuListOne: [],
      menuListAll: [],
      list: [],
      loading: true,
    };
  },

  created() {
    this.getModel();
    // this.getBuildingPageList()
    this.$store.state.listShow = false;
    this.$bus.$on("closeModule", () => {
      this.$store.state.editModuleShow = false;
      // this.$store.state.areaInfoShow = true;
      this.list = JSON.parse(JSON.stringify(this.menuListAll));
    });
  },
  methods: {
    // 获取菜单栏
    getModel() {
      getModels()
        .then((res) => {
          const menuList = [];
          const muenListOneShow = [];
          const menuOne = {};
          const childrenMenu = [];
          if (res.code === 0) {
            res.result &&
              res.result.length > 0 &&
              res.result.map((item, i) => {
                let models = [];
                let children = [];
                item.buildingList.map((val) => {
                  val.models &&
                    val.models.length > 0 &&
                    val.models.map((j) => {
                      if (j.state === 0 && j.isInternal === 1) models.push(j);
                    });
                    {
                    children.push({
                      name: val.buildingName,
                      id: val.id,
                    });
                  }
                });
                this.models = models;
                 {
                  childrenMenu.push({
                    name: item.parkName,
                    id: i + "-" + 1,
                    children,
                    models,
                  });
                }
                //   if (models && models.length > 0) {
                //     children.push({
                //       name: val.buildingName,
                //       id: val.id,
                //     });
                //   }
                // });
                // this.models = models;
                // if (models && models.length > 0) {
                //   childrenMenu.push({
                //     name: item.parkName,
                //     id: i + "-" + 1,
                //     children,
                //     models,
                //   });
                // }
              });
            menuOne.name = "视角切换";
            menuOne.id = "12312312312321";
            menuOne.childrenMenu = childrenMenu;
            //  console.log('menuOne',menuOne);
            muenListOneShow.push(menuOne);
            //  console.log('mmmm',muenListOneShow);
            this.menuListOne = muenListOneShow;
            const parkParams = {
              name: "区域/设备关联",
              id: "2",
              childrenMenu: [],
            };
            const manage = {
              name: "后台管理",
              id: "3",
              childrenMenu: [],
            };
        //      const model = {
        //   name: "模式切换",
        //   id: "4",
        //   childrenMenu: [],
        // };
            menuList.push(menuOne,parkParams,manage);
            // menuList.push(parkParams);
            // menuList.push(manage);
            // menuList.push(model)
            this.menuListAll = menuList;
            this.list = menuList;
            this.loading = false;
            //  console.log('list',this.list);
            this.$store.state.parkName =
              this.list &&
              this.list[0] &&
              this.list[0].childrenMenu &&
              this.list[0].childrenMenu[0] &&
              this.list[0].childrenMenu[0].name;
          }
        })
        .catch();
    },
    // 获取园区
    getBuildingPageList() {
      this.loading = true;
      const params = {
        current: 1,
        limit: 9999,
      };
      getBuildingPageList(params).then((res) => {
        const menuList = [];
        const muenListOneShow = [];
        const menuOne = {};
        const childrenMenu = [];
        res.result &&
          res.result.list &&
          res.result.list.length > 0 &&
          res.result.list.map((item, i) => {
            this.$store.state.parkName = res.result.list[0].parkName;
            //  console.log('item',item);
            const children = [];
            children.push({
              name: item.buildingName,
              id: i + 1 + "-" + i + 2 + "-" + i + 1,
            });
            childrenMenu.push({
              name: item.parkName,
              id: item.id,
              children,
            });
          });
        //  console.log('childrenMenu', childrenMenu);
        menuOne.name = "视角切换";
        menuOne.id = "12312312312321";
        menuOne.childrenMenu = childrenMenu;
        //  console.log('menuOne',menuOne);
        muenListOneShow.push(menuOne);
        //  console.log('mmmm',muenListOneShow);
        this.menuListOne = muenListOneShow;
        const parkParams = {
          name: "区域/设备关联",
          id: "2",
          childrenMenu: [],
        };
        const manage = {
          name: "后台管理",
          id: "3",
          childrenMenu: [],
        };
        //  const model = {
        //   name: "模式切换",
        //   id: "4",
        //   childrenMenu: [],
        // };
        menuList.push(menuOne);
        menuList.push(parkParams);
        menuList.push(manage);
        // menuList.push(model)
        //  console.log('menu',menuList);
        this.menuListAll = menuList;
        this.list = menuList;
        this.loading = false;
        // console.log("list111", this.list);
      });
    },
    // 区域设置和后台管理方法
    handleEvent(item) {
      if (item === "区域/设备关联") {
        this.list = this.menuListOne;
        this.$store.state.videoCheck = false;
        // this.$store.state.videoContainerShow=false
        // this.$store.state.videoContainerShow=false
        // console.log(this.$store.state.videoContainerShow,'6666')
        this.$store.state.videoContainerShow.forEach((item, index) => {
          item.show = false;
        });
        this.$store.state.earlyWarnigShow = false;
        // console.log('videoContainerShow',this.$store.state.videoContainerShow);
        //  this.$emit('handleEdit',true)
        this.$bus.$emit("editModule", false);
        this.$store.state.listShow = true;
        this.$emit("showList");
        this.$store.state.entityArr &&
          this.$store.state.entityArr.length > 0 &&
          this.$store.state.entityArr.forEach((id) => {
            id.show = false;
          });
      } else if(item==='后台管理'){
        this.$store.state.cesMenuShow = false;
        this.$store.state.horizonShow = true;
        this.$store.state.toolbarShow = false;
        // this.$store.state.videoContainerShow = false;
        // console.log(this.$store.state.videoContainerShow,'1111')
        this.$store.state.videoContainerShow.forEach((item, index) => {
          item.show = false;
        });
        this.$router.replace({ path: "/horizonCenter" });
      }else if(item='模式切换'){
        this.$bus.$emit('changeMode')
        this.$store.state.modelShow=false
        this.$store.state.tipShow = false
      }
    },
    getNewModel(item) {
      this.$store.state.parkName = item.name;
      const models = [];
      item &&
        item.models &&
        item.models.length > 0 &&
        item.models.map((val) => {
          models.push(val.path);
        });
        // 防止编辑时切换模型
        this.$bus.$emit('deleteEditModel')
        if(item.models[0]&&item.models[0].filename==='luzhou'){
          this.$bus.$emit("getModules", models,'mine');
       }else{
          // 当类型为others时加载others
          this.$bus.$emit("getModules", models,'others');
        }
   },
    flyTo(id) {
      switch (id) {
        case "68d91578-e6ca-4be5-ada0-7b52fedebe34":
          $viewer.qtum.centerAt({
            y: 22.268612,
            x: 114.218806,
            z: 63.47,
            heading: 264.2,
            pitch: -10.3,
            roll: 358.8,
          });
          break;
        case "5096dbc5-27ba-4b58-8401-8f37b9660a3e":
          $viewer.qtum.centerAt({
            y: 22.267042,
            x: 114.214047,
            z: 37.09,
            heading: 48.5,
            pitch: -9.9,
            roll: 357.8,
          });
          break;
        case "0822e47f-3d18-4834-871c-156c919fd7fd":
          $viewer.qtum.centerAt({
            y: 22.268669,
            x: 114.214293,
            z: 54.27,
            heading: 246.6,
            pitch: -8.5,
            roll: 357.9,
          });
          break;
        case "4-32-31":
          $viewer.qtum.centerAt({
            y: 22.264654,
            x: 114.213709,
            z: 83.34,
            heading: 36,
            pitch: -12.3,
            roll: 358,
          });
          break;

        case "5-42-41":
          $viewer.qtum.centerAt({
            y: 22.274614,
            x: 114.199335,
            z: 124.69,
            heading: 79.5,
            pitch: -6.5,
            roll: 357.9,
          });
          break;
        case "6-52-51":
          $viewer.qtum.centerAt({
            y: 22.27307,
            x: 114.204974,
            z: 42.83,
            heading: 59.2,
            pitch: -5.5,
            roll: 357.9,
          });
          break;
        case "1-2-2":
          $viewer.qtum.centerAt({
            y: 22.278253,
            x: 114.204472,
            z: 52.26,
            heading: 143.2,
            pitch: -13.3,
            roll: 357.9,
          });
          break;
        case "1-2-3":
          $viewer.qtum.centerAt({
            y: 22.275444,
            x: 114.205087,
            z: 62.88,
            heading: 53.2,
            pitch: -17.1,
            roll: 357.9,
          });
          break;

        default:
          $viewer.qtum.centerAt({
            y: 22.275444,
            x: 114.205087,
            z: 62.88,
            heading: 66.2,
            pitch: -17.1,
            roll: 357.9,
          });
          break;
      }
    },
    handleOpen(key, keyname) {
      console.log(key, keyname);
    },
    handleClose(key, keyname) {
      console.log(key, keyname);
    },
  },
};
</script>

<style lang="scss" scoped>
.control-container {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 400PX;
  background-color: #1d212d;
  cursor: pointer;
  /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200PX;
    min-height: 400PX;
  }
  .tool-word {
    color: #fff;
    font-size: 14PX;
    width: 64PX;
    background-color: #1d212d;
    text-align: center;
    height: 40PX;
    line-height: 40PX;
    border-bottom: 1PX solid #2c313b;
  }
  .el-menu {
    border-right: none;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
  }
  /deep/ .el-menu-item {
    border-top: 1PX solid #2c313b;
    color: #fff !important;
    background-color: #1d212d !important;
  }
  .icon-middle {
    font-size: 20PX;
    margin-left: 3PX;
  }
  .icon-word {
    font-size: 25PX;
  }
  .icon-word:hover {
    color: #fff;
  }
  .icon-title {
    // margin-left: 5PX;
  }
}
</style>
<style lang="scss">
.el-submenu__title {
  color: #fff;
  width: 100%;
}
.el-submenu__title:hover {
  width: 100%;
  color: #2889b6 !important;
}
.el-submenu__icon-arrow:hover {
  color: #2889b6;
}
.el-submenu:hover {
  color: #2889b6;
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  color: #2889b6 !important;
  background-color: #ecf5ff;
}
</style>