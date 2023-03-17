<template>
   <div class="wapper">
           <div class="wapperBody">
            <div v-for="(item,index) in searchImg" :key="index">
              <div class="menu">
                <img @click="menuClick(index)" class="img pointer" :src="item.img" alt="">
              </div>
            </div>
           </div> 
           <div class="model">
            <!-- 点位 -->
            <div v-show="mark===1" class="pointCotainer">
              <div class="changeSelect">
                <div class="changeBtns">
                    <div class="changeLeft pointer" @click="pre">
                      &lt;
                    </div>
                    <div class="changeCenter"></div>
                     <div class="changeRight pointer" @click="next">
                      &gt;
                        </div>
                </div>
              </div>
            <el-carousel ref="elCarousel" :interval="4000000000000000000000" type="card" height="20vh">
             <el-carousel-item v-for="(item,index) in pointMsg" :key="index">
               <div @click="changeEvent(index)">
                <img style="width:100%;padding:5px;height:15vh;" :src="item.img" alt="">
                </div>
                <div class="pointTitle" style="color:#red">{{item.title}}</div> 
               </el-carousel-item>
          </el-carousel>
            </div>
            <!-- 飞行 -->
             <div v-show="mark===3" class="flyCotainer">
                <div class="changeSelect">
                <div class="changeBtns">
                    <div class="changeLeft pointer" @click="prev">
                      &lt;
                    </div>
                    <div class="changeCenter"></div>
                     <div class="changeRight pointer" @click="nexts">
                      &gt;
                        </div>
                </div>
              </div>
             <el-carousel ref="elCarousels" :interval="4000000000000000000000" type="card" height="20vh">
             <el-carousel-item v-for="(item,index) in pointMsg" :key="index">
               <div @click="changeEvent(index)">
                <img style="width:100%;padding:5px;height:15vh;" :src="item.img" alt="">
                </div>
                <div class="pointTitle" style="color:#red">{{item.title}}</div> 
               </el-carousel-item>
          </el-carousel>
            </div>
            <!-- 点位层级 -->
             <div v-show="mark===0" class="pointsCotainer pointsTree">
             <el-tree
             style="padding-bottom:1.06vh"
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
</el-tree>
            </div>
           </div>
       </div>
</template>

<script>
export default {
data(){
  return{
    mark:-1,
  searchImg:[
    {
      img:require('@/assets/img/menu/datacenter.png')
    },
     {
      img:require('@/assets/img/menu/point.png')
    },
     {
      img:require('@/assets/img/menu/add.png')
    },
    {
      img:require('@/assets/img/menu/fly.png')
    }
  ],
  pointMsg:[{
    title:'框架',
    img:require('@/assets/img/menu/delamination.png')
  },
  {
    title:'工程',
    img:require('@/assets/img/menu/datacenter.png')
  },{
    title:'6666',
    img:require('@/assets/img/menu/datacenter.png')
  },
   {
    title:'工程',
    img:require('@/assets/img/menu/datacenter.png')
  },{
    title:'6666',
    img:require('@/assets/img/menu/datacenter.png')
  }],
       data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1'
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
  }
},
methods:{
  pre(){
 this.$refs.elCarousel.prev()
  },
  next(){
 this.$refs.elCarousel.next()
  },
   prev(){
 this.$refs.elCarousels.prev()
  },
  nexts(){
 this.$refs.elCarousels.next()
  },
  changeEvent(item){
   console.log('item',item);
  },
  menuClick(index){
    this.mark=index
  },
  getImgEvent(item){
    console.log('item',item);
  },
}
}
</script>
<style lang="scss" scoped>
     .wapper{
      height: 100%;
      width:100%;
      display: flex;
      flex-direction: row-reverse;
      // background: #000;
     }
     .wapperBody{
      margin-bottom: 3vh;
      display: flex;
      flex-direction: column-reverse;
     }
     .model{
       margin-bottom: 3vh;
       display: flex;
      // background: #000;
      flex-direction: column-reverse;
     }
     .menu{
      margin-right: 3vh;
      width:6.8vw;
      text-align: center;
      margin-top: -3vh;
      // background-color: darkcyan;
     }
     .img{
        width:100%;
     }
     .pointCotainer{
      width:20.625vw;
      height: 20vh;
      position: relative;
      margin-bottom: 6vh;

     }

     .changeSelect{
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
     }
    
     .changeBtns{
      width: 100%;
      height: 100%;
      // background: red;
      display: flex;
      align-items: center;
      justify-content: center;
     }
     .changeCenter{
      flex:1;
      height: 100%;
     }
    .changeLeft,.changeRight{
      width: 2vw;
      margin: 10px;
      border-radius:50%;
      text-align: center;
      // height: 100%;  
      color: rgba(255,255,255,0.7);
      background: rgba(0,0,0,0.5);
           }
     .flyCotainer{
      width:15.625vw;
      height: 20vh;
      position: relative;
      margin-bottom: 15vh;
     }
     .pointTitle{
      width:85%;
      margin: 0 auto;
      background: rgba(62,147,255,0.30);
      padding:1.06vh 0.52vw;
      color: #fff;
      text-align: center;
      font-size: 0.16rem;
     }
     .pointsCotainer{
       width:15.625vw;
       max-height: 20vh;
       overflow:auto;
      //background: #000;
      //  background:url('~@/assets/img/menu/pointsbg.png') no-repeat center center;
      // background:url('~@/assets/img/right/onebg.png') no-repeat center center;
        // background:url('~@/assets/img/menu/light.png') no-repeat center center;
       background:url('~@/assets/img/menu/selectbg.png') no-repeat center center;
       background-size:100% 100%;
     /deep/.el-tree {
    position: relative;
    cursor: default;
     background: none;
    color: #D9D9D9;
}
/deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background:red;
}
/deep/.el-checkbox__inner {
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    // background-color:none;
   background-color: transparent;
    z-index: 1;
    display: inline-block;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),
    background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
/deep/.el-tree-node__content{
  &:hover{
    background-color: transparent !important;
  }
}
// el-tree 失去焦点时的颜色 收缩展开后的背景色
/deep/.el-tree-node:focus > .el-tree-node__content {
  background-color: transparent !important;
}
/deep/::v-deep.el-tree-node.is-current > .el-tree-node__content {
    background-color: radial-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.85), rgba(0,0,0,0.45)) !important;
  }
/deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: radial-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.85), rgba(0,0,0,0.45)) !important;
}
/deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #409EFF !important;
    border-color: #409EFF;
}
/deep/.el-tree-node__expand-icon.expanded {
    color: #549FFF;
    transform: rotate(90deg);
}
/deep/.el-tree-node__content>.el-tree-node__expand-icon {
    padding: 6px;
    color: #549FFF;
}
}
  .pointsCotainerImg{
        width: 15.625vw;
        height: 20vh;
         position:absolute;
         top:0;
         left:0;
  }
  .el-carousel__item:nth-child(n) {
      background:url('~@/assets/img/right/onebg.png') no-repeat center center;
      // background:url('~@/assets/img/menu/bg.svg') no-repeat center center;
      background-size:100% 100%;
  }
  // .el-carousel__item:nth-child(2n+1) {
  //   // background-color: #d3dce6;
  //    background:url('~@/assets/img/menu/bg.png') no-repeat center center;
  //    background-size:100% 100%;
  // }
  // 去除轮播图的下面的切换li
  /deep/.el-carousel__indicators--outside {
    bottom: 2.76vh;
    text-align: center;
    position: static;
    display: none;
    transform: none;

}
/deep/.el-carousel__arrow {
    border: none;
    outline: 0;
    padding: 0;
    margin: 0;
    height: 36px;
    width: 36px;
    cursor: pointer;
    transition: .3s;
    border-radius: 50%;
    color: #FFF;
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    text-align: center;
    font-size: 12px;
    display: none;
}
</style>