<template>
  <div class="orgContainer viewIndex banner">
    <div  style="display: flex;" v-if="showPhotos">
      <div class="org_tree">
       <org ref="org" @fetch="fetch" @changePhoto="changePhoto"/>
    </div>
    <div class="message_user">
      <div class="inner_user">
        <div class="top_message">
          <p class="base_message">隐患库编码:{{code?code:'--'}}</p>
          <div class="right-message">
              <div>
                <el-input
        v-model="form.name"
        size="small"
        placeholder="请输入隐患点名称"
        @keyup.enter.native="search"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
      </el-input>
              </div>
              <div style="margin-left:30px">
                <el-button
              size="small"
              @click="addDanger"
              type="primary"
              >新增隐患点</el-button
            >
              </div>
          </div>
        </div>
        <div style="margin-top:20px">
          <el-table
            v-loading="loading"
            :header-cell-style="{ 'font-size': '16PX' }"
            :cell-style="{ 'font-size': '15PX' }"
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            tooltip-effect="dark"
          >
            <el-table-column
              prop="code"
              label="编号"
              width="145"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="name" min-width="110" label="隐患点名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="period"
              label="整改周期(天)"
              min-width="110"
            >
            <template slot-scope="scope">
              <div>{{scope.row.period?scope.row.period:'--'}}</div>
             </template>
            </el-table-column>
            <el-table-column
              prop="type"
              label="隐患类型"
              show-overflow-tooltip
            >
            <template slot-scope="scope">
              <div>{{scope.row.type?scope.row.type:'--'}}</div>
             </template>
            </el-table-column>
            <el-table-column
              prop="category"
              label="隐患分类"
              show-overflow-tooltip
            >
            <template slot-scope="scope">
              <div>{{scope.row.category?scope.row.category:'--'}}</div>
             </template>
            </el-table-column>
             <el-table-column prop="harmResult"  label="危害后果">
               <template slot-scope="scope">
                 <el-tooltip class="item" effect="dark" placement="top"><div  v-html="ToBreak(scope.row.harmResult)" slot="content"></div>
                  <div class="harmResultDanger">{{scope.row.harmResult}}</div>
                 </el-tooltip>
             </template>
            </el-table-column>
            <el-table-column
              prop="atlasNum"
              label="隐患图集"
              show-overflow-tooltip
            >
             <template slot-scope="scope">
              <div @click="showImgs(scope.row)" class="atlas">{{scope.row.atlasNum}}</div>
             </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="250">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="checkSample(scope.row)"
                  >查看规范样例</el-button>

                   <el-button
                  type="text"
                  size="mini"
                  @click="editPoint(scope.row)"
                  >编辑</el-button>
                   <el-button
                  type="text"
                  size="mini"
                  @click="handleDelete(scope.row.id)"
                  >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
         <div class="form_pg">
          <el-pagination
            style="float: right"
            background
            align="center"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    </div>
    <div style="width:100%">
      <add-danger :row="row" 
                  :type="type" 
                  :troubleId="troubleId" 
                  :visible="visible" 
                  :title="title" 
                  @close-callback="handleClose"></add-danger>
      <checksample @close="close" :type="type" :arr="arr" :innerVisible="innerVisible"></checksample>
      <photos  v-if="!showPhotos" @back="back" :code="code" :rowImg="rowImg" :troubleId="troubleId"></photos>
    </div>
  </div>
</template>
<script>

import * as api from "@/api/ai/org.js";
import Org from './org.vue'
import addDanger from './addDanger.vue'
import checksample from './checkSample.vue'
import photos from './photos.vue'
import { re } from 'mathjs';
export default {
  name: 'Index',
  components: {
    Org,
    addDanger,
    checksample,
    photos
  },
  data() {
    return{
      photos:true,
      code:'',
      showPhotos:true,
       arr:{},
      innerVisible:false,
      visible:false,
      value:'',
      title: "",
      type:'',
      videoLoading: false,
      length: "",
      loading: false,
      // 建筑列表
      row: {},
      tableData: [],
      deviceList: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      form:{
        name:''
      },
      troubleId:'',
      rowImg:{},
    }
  },
  mounted() {
  },
  created() {
  },
   methods: {
    back(){
        this.photos=false
        this.showPhotos=true
        this.fetchData(this.form)
    },
    showImgs(row){
        this.showPhotos=false
        this.rowImg = JSON.parse(JSON.stringify(row))
    },
    // 编辑点
    editPoint(row){
      this.row = JSON.parse(JSON.stringify(row))
      this.title = '编辑隐患点'
      this.type='edit'
      this.visible = true
    },
    // 删除点
       handleDelete(id) {
      this.$confirm("确定删除后当前内容将无法找回,请谨慎操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: id,
          };
          api.deletePoint(params).then((res) => {
            this.$message.success('删除成功')
            this.fetchData(this.form)
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },

    changePhoto(){
      this.photos=true
    },

    fetch(code,id){
      if(this.photos){
      this.form.name=''
      this.code=code
      this.troubleId=id
      this.fetchData(this.form)
      }
     
    },
    // 关闭规范样例
    close(){
    this.type='check'
    this.innerVisible=false
   
    },
    // 查看规范样例
    checkSample(row){
       this.arr=row
      this.innerVisible=true
    },
    // 关闭
    handleClose(){
      this.visible=false
      this.fetchData(this.form)
    },
    // 新增隐患点
    addDanger(){
        this.visible=true
        this.title='新增隐患点'
        this.type='add'
    },
    search(){
      this.currentPage = 1;
      this.fetchData(this.form);
    },

    //获取视频列表
    fetchData(params) {
      this.loading = true;
      const limit = this.pageSize;
      const current = this.currentPage;
      params.troubleId=this.troubleId
      params.size= limit;
      params.current = current;
      api
        .getLists(params)
        .then((res) => {
          this.tableData = res.result.list;
          // 对时间进行处理
          this.total = res.result.total;
          this.loading = false;
        })
        .catch();
    },
    ToBreak(val){
      if(val && val.length > 250){
         return val.substring(0,250)+'<br/>'+val.substring(250,val.length)
      }else{
        return val;
      }   
    },
    // 时间处理
    change(e) {
      if (e) {
        this.form.videoStartTime = e[0];
        this.form.videoEndTime = e[1];
      }
    },

    // 园区
    getParkNameList() {
      getParknameList().then((res) => {
        this.parkNameList = res.result;
      });
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.fetchData(this.form);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(this.form);
    },
  },
}
</script>

<style lang="scss" scoped>
.harmResultDanger{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.orgContainer{
    width:97%;
    margin: 24px auto;
    border-radius: 8px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    .org_tree{
      padding:15px;
        width: 25%;
        border-right: 1px solid #f3f3f5 ;
        // background: blue;
    }
    .atlas{
      cursor: pointer;
      color:rgba(52, 127, 255, 1),
      
    }
    .message_user{
        width: 75%;
        .inner_user{
          margin: 15px;
          .top_message{
            display: flex;
            align-items:center;
            justify-content: space-between;
          }
          .right-message{
              display: flex;
            justify-content: space-between;
          }
        }
        .sencod_container{
          width: 100%;
          display: flex;
          margin-top: 15px;
          justify-content: space-between;
          padding-bottom: 15px;
          border-bottom: 1px solid #f3f3f5;
        }
        .base_message{
          color:#0A1933;
          font-weight: 550;
          font-size: 14PX;
        }
     .form_pg {
      height: 45px;
      padding-bottom: 24px;
      margin-top: 24px;
      margin-right: 0;
    }
    }
}
</style>
