<template>
  <div style="width:100%;">
    <div class="photosContainer">
     <div class="topTitle">
      <div class="notityTitle" @click="back">
          <img
            width="22"
            height="22"
            style="padding-top: -20PX"
            src="@/assets/img/ai/back.png"
            alt=""
          />
          &nbsp;返回隐患信息
        </div>
     </div>
     <div class="hiddleImgs">
        隐患图集
     </div>
     <div class="hiddleImgs">
        <span class="number">编号:{{code}}</span>
        <span class="number" style="padding-left:20px;padding-right: 8px;">隐患名称</span>
        <span class="name number">{{rowImg&&rowImg.name}}</span>
        <span class="number" style="padding:20px">图片数量:{{total}}</span>
     </div>

     <div class="line"></div>
     
     <!-- 按钮 -->
      <div class="btn-group">
        <el-button @click="deleteMultis"  style="margin-left: 10px"  size="small"
            >批量删除</el-button
          >
        <el-button type="primary"  size="small"
        @click="addImgs"
         >新增</el-button
          >
          
      </div>
      <!-- 展示列表 -->
      <div>
         <div v-if="list&&list.length>0">
            <div class="imgList" v-loading="loading">
                <div class="imgLi" v-for="item in list" :key="item.id">
                  <div
                  @click="change(item)"
                  class="delete-pic"
                 >
                 <img class="img" v-if="!item.check" src="@/assets/img/ai/check.png" alt="">
                 <img class="img" v-else  src="@/assets/img/ai/checked.png" alt="">
                </div>
                 <img   @click="change(item)" class="captureImg" :src="item.img" alt="">
              
                 <div class="time" :title="item.time">{{item.time}}</div>
                </div>
                </div>
            </div>
            <div class="noImgs" v-else>
              暂无图集
            </div>
         </div>
         <div class="pages">
          <el-pagination
            background
            align="center"
            :current-page="currentPage"
            :page-sizes="[8, 16, 24]"
            :page-size="pageSize"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
         </div>
         </div>
      <imgs :visible="visible" @close-callback="handleClose" :rowImg="rowImg"></imgs>
    </div>
</template>
<script>
import * as api from "@/api/ai/org.js";
import imgs from './imgs.vue'
export default {
  components: { imgs },
  props:{
    rowImg:{},
    code:{},
    troubleId:{}
  },
  created(){
    this.fetchData()
  },
    data(){
        return{
        loading:true,
        currentPage: 1,
        pageSize: 16,
        total: 0,
        visible:false,
        list:[],
        }
    },
    methods:{
      back(){
        this.loading = false
        this.$emit("back",this.code,this.troubleId);
    },
      deleteMultis(){
        let deleteMulti=[]
        this.list.map(item=>{
          if(item.check){
            deleteMulti.push({
              id:item.id,
              img:item.img,
              troubleInfoId:item.troubleInfoId
            })
          }
        })
        if(deleteMulti.length<=0){
          this.$message.warning('请选中要删除的图片')
        }else{
            this.$confirm("确定要删除隐患图片吗?删除后将不可恢复。", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params={
            atlas:deleteMulti,
            id:this.rowImg.id
          }
          api.deleteImgsLists(params).then(res=>{
            if(res.code===0){
              this.$message.success('批量删除成功')
              this.currentPage = 1;
              this.fetchData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
        }
      },
      change(item){
           item.check=!item.check
           this.$forceUpdate()
      },
      addImgs(){
          this.visible=true
      },
      // 获取列表
      fetchData() {
      this.loading = true;
      let params={
        current:this.currentPage,
        size:this.pageSize,
        id:this.rowImg.id
      }
      api
        .getImgsLists(params)
        .then((res) => {
          this.list = res.result.list;
          this.list.map(item=>{
              item.check=false
          })
          this.total = res.result.total;
          this.loading = false;
        })
        .catch();
    },

    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.fetchData();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },

    // 关闭弹框
     handleClose(){
        this.visible=false
        this.fetchData();
      }
    }
   
}
</script >

<style lang="scss" scoped>
.photosContainer{
    width:98%;
    margin: 0 auto;
    .topTitle{
      padding:20PX;
      .notityTitle {
    cursor: pointer;
    font-size: 18PX;
    font-weight: 520;
    color: #0a1933;
    // padding-bottom: 20PX;
    // border-bottom: 1PX solid #f3f3f5;
    margin: 0 auto;
  }
    }

 .line{
        width: 100%;
        height: 1PX;
        border-top: 1PX solid #f3f3f5;
        margin-bottom: 20px;
    }
 .imgList {
  width: 100%;
  display: flex;
  font-size: 16px;
  flex-wrap: wrap;
//   padding: 0 12px；
}
.noImgs{
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 16PX;
  color: #0a1933;
}
.time{
  min-width:100px;
  text-align:left;
  margin-top:5PX;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.message{
    cursor: pointer;
    font-size: 18PX;
    font-weight: 400;
    color: #0a1933;
}
.btn-group{
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 20px;
}
.hiddleImgs{
  margin-left: 15PX;
  margin-bottom: 15PX;
  font-size: 18PX;
  font-weight: 550;
  color: #0a1933;
}
.imgLi {
 width: calc(100% / 8);
 padding:15px 5px;
}
@media screen and (max-width: 900px) {
.imgLi{
  width: calc(100% / 4 ) !important; 
 padding:15px 5px;
}
.captureImg{
  display: block;
  width:100%;
  // height:100%;
  height: 250px !important;
}

.delete-pic{
    position:absolute;
    cursor: pointer ;
    margin-left: 10px !important;
    margin-top: 20px !important;
  }
  .img{
    width: 40px !important;
    height: 40px !important;
  }
}
.delete-pic{
    position:absolute;
    cursor: pointer;
    margin-left: 5px;
    margin-top: 10px;
  }
  .img{
    width: 20px;
    height: 20px;
  }
.pages{
   padding: 20px;
   display: flex;
   flex-direction: row-reverse;
}
.number{
font-size: 16PX;
font-weight: 400;
color: #0A1933;
}
.name{
color: #FF3A3A;
}
.captureImg{
  display: block;
  width:100%;
  // height:100%;
  height: 150px;
}
}
</style>