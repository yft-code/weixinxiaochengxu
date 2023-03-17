<template>
  <div>
    <div
      class="menuSider"
      :style="{ minHeight: clientHeight + 'px' }"
    >
      <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item  v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    </div>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
import variables from "@/assets/css/variables.scss";
export default {
  name: "SiderBar",
  components: { SidebarItem },
  computed: {
      routes() {
    //return this.$router.options.routes
     return  this.$router.options.routes[1].children
    },
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
    mounted(){
  console.log('routes()',this.routes);
    },
  data() {
    return {
     clientHeight: document.body.clientHeight - 56,
    };
  },

};
</script>