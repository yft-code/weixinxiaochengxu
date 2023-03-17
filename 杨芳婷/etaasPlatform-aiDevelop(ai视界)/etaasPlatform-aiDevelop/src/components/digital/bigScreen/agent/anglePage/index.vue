<template>
  <div class="anglePage">
    <div class="message">
      <!-- <div class="shuxian"></div> -->
      <img src="@/assets/img/ai/anglePattern/page.png" class="pageImg"/>
      <div class="zuobiao">页面推荐</div>
      <div class="moreDiv">
        <img
          width="20"
          height="20"
          src="@/assets/img/ai/more.png"
          alt=""
          class="moreImg"
        />
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
    <div class="cardWrap">
      <div
        class="anglePageLi"
        v-for="(item, index) in roleList"
        :key="index"
        @click="pageClick(item)"
       :class="[item.checked ? 'angleLiChecked' : '']"
      >
        {{ item.title }}
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      roleList: [
        {
          title: "组织机构管理",
          path: "/organization",
          checked:false,
          type:'user'
        },
        {
          title: "角色管理",
          path: "/role",
          type:'user',
          checked:false
        },
        {
          title: "用户管理",
          path: "/user",
          checked:false,
          type:'user'
        },
        {
          title: "岗位管理",
          path: "/post",
          checked:false,
          type:'user'
        },
        {
          title: "etass平台",
          path: "/index",
          checked:false,
          type:'etass'
        },
      ],
    };
  },
  mounted() {},
  beforeDestroy() {
    // 在组件生命周期结束的时候销毁。
  },
  created() {},
  methods: {
    pageClick(item) {
      this.roleList.forEach(element=>{
        element.checked = false;
      })
      item.checked = true;
      this.$forceUpdate();
      this.$store.state.messageShow=false
      this.$emit("pageClik", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.anglePage {
  color: #fff;
  width:90%;
  margin:0 auto;
}
.anglePageTitle {
  height: 40px;
  line-height: 40px;
  float: left;
}
.clear {
  clear: both;
}
.message {
  margin-top: 20PX;
  height: 30PX;
  line-height: 30PX;
  border-bottom: 2px solid rgba(255, 255, 255, 0.25);
}
.pageImg{
  float:left;
  width:20PX;
  margin-top:6PX;
}
.shuxian {
  vertical-align: center;
  width: 4px;
  height: 16px;
  background: #25bcff;
}
.zuobiao {
  color: #25bcff;
  font-size: 14PX;
  font-weight: 500;
  float:left;
  margin-left:4PX;
}
.moreDiv {
  float:right;
}
.moreImg {
  margin-right: 5px;
  float: right;
  margin-top:5PX;
}
.cardWrap {
  // 大盒子
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; // 替代原先的space-between布局方式
  padding: 10px 0 10px 0px;
}
.angleLiChecked{
  color:#25BCFF;
}
.anglePageLi {
  // 每个item
  flex: 1;
  height: 30PX;
  line-height: 30PX;
  cursor: pointer;
  display: flex;
  color: #fff;
  font-size: 13PX;
  text-align: left;
  margin: 0px 10PX 0px 0; // 间隙为5px
  // background-color: #999;
  width: calc(
    (100% - 23PX) / 3
  ); // 这里的20px = (分布个数3-1)*间隙10px, 可以根据实际的分布个数和间隙区调整
  min-width: calc((100% - 23PX) / 3); // 加入这两个后每个item的宽度就生效了
  max-width: calc((100% - 23PX) / 3); // 加入这两个后每个item的宽度就生效了
  display: block; //块状显示
  overflow: hidden; //隐藏文字
  text-overflow: ellipsis; //显示...
  white-space: nowrap; //不换行
  //  width:100px;//超过100px就截取
  &:nth-child(3n) {
    // 去除第3n个的margin-right
    margin-right: 0;
  }
  &:hover {
    color: #25bcff;
  }
}
</style>