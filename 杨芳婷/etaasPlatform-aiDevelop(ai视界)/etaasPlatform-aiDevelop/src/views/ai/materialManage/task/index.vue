<template>
    <div class="deviceContainer">
      <div class="deviceContent">
        <div class="content">
          <div class="deviceTop">
            <el-form
              ref="form"
              :model="form"
            size="small"
            :rules="rules"
              label-width="110px"
            >
               <el-row
          :gutter="10"
        >
          <!-- 搜索框组件 -->
          <template>
            <el-col
             :sm="24"
              :md="8"
              :lg="6"
              :xl="6"
            >
        <el-form-item label="任务名称" label-width="80px" class="sm-width" prop="name">
                <el-input placeholder="请输入" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
  
            <el-col 
              :sm="24"
              :md="6"
              :lg="6"
              :xl="6">
               <el-form-item label-width="10px" style="float:left;margin-right:0px;">
         <el-button @click="handleCheck" type="primary" size="small"
                  >搜索</el-button
                >
                <el-button @click="handleReset" size="small">清空</el-button>
          </el-form-item>
            </el-col>
          </template>
        </el-row> 
            </el-form>
          </div>
        <div style="float: right;margin-top:16px; margin-right: 0px; margin-bottom: 16px">
              <el-button
                size="small"
                type="primary"
                @click="advancedConfig()"
                >添加</el-button
              >
            </div>
          <div class="deviceTable id_style">
            <el-table
              v-loading="loading"
              :data="tableData"
              :cell-style="cellstyle"
              style="width: 100%"
            >
              <el-table-column
                prop="name"
                min-width="100"
                show-overflow-tooltip
                label="任务名称"
              >
              </el-table-column>
              <el-table-column
                prop="deviceName"
                min-width="80"
                label="设备名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="deviceName"
                min-width="80"
                label="采集时段"
                show-overflow-tooltip
              >
              <template  slot-scope="scope">
                {{scope.row.startTime}}-{{scope.row.endTime}}
              </template>
              </el-table-column>
              <el-table-column
                prop="num"
                min-width="80"
                label="采集数量"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="rate"
                min-width="80"
                label="采集频率"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="deviceStatus"
                min-width="80"
                label="设备状态"
                show-overflow-tooltip
              >
              <template slot-scope="scope">
                   <span v-if="scope.row.deviceStatus==='运行中'">{{scope.row.deviceStatus}}</span>
                   <span v-else>{{scope.row.deviceStatus}}</span>
                 </template>
              </el-table-column>
              <el-table-column
                prop="status"
                min-width="80"
                label="任务状态"
                show-overflow-tooltip
              >
                 <template slot-scope="scope">
                  {{scope.row.status?`执行中`:'已结束'}}({{scope.row.count}}/{{scope.row.num}})
                 </template>
              </el-table-column>
              <el-table-column
                prop="createdTime"
                width="80"
                show-overflow-tooltip
                label="创建时间"
              >
              </el-table-column>
              <el-table-column width="150" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    :disabled="scope.row.status?false:true"
                    @click="stop(scope.row.id)"
                    >终止</el-button
                  >
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleDelete(scope.row.id)"
                    >删除</el-button
                  >
                  <el-button
                    type="text"
                    size="mini"
                    @click="download(scope.row)"
                    >下载</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--分页器-->
          <div class="alogrithm_page">
            <el-pagination
              style="float: right"
              background
              align="center"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <edit
        :visible="visible"
        :id="id"
        @close-callback="handleClose"
        @close-callback1="reload"
        :title="title"
      >
      </edit>
    </div>
  </template>
  <script>
  import * as apis from "@/api/ai/task";
  import edit from "./edit";
  export default {
    components: {
      edit
    },
    data() {
      return {
        advancedConfigVisible:false,
        loading: true,
        form: {},
        currentPage: 1,
        pageSize: 10,
        total: 0,
        id: "",
        title: "添加任务",
        showAdd: false,
        showImport: false,
        visible: false,
        tableData: [],
        formData: {},
        rules:{
          name:[{
            max:50,message: "算法名称不可超过50个字符", trigger: "blur" 
          }],
          scene:[{
            max:50,message: "算法请求场景不可超过50个字符", trigger: "blur" 
          }],
        }
      };
    },
    created() {
      this.fetchData(this.form);
    },
    methods: {
       ToBreak(val){
        if(val && val.length > 250){
           return val.substring(0,250)+'<br/>'+val.substring(250,val.length)
        }else{
          return val;
        }   
      },
      // 关闭高级配置弹框
  closeConfig(){
     this.advancedConfigVisible=false
     },
      // 高级配置
      advancedConfig(){
          this.visible=true
      },
      count(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1;
      },
      cellstyle({ columnIndex }) {
        if (columnIndex === 0) {
          return "padding-left:24px;";
        } else {
          return "";
        }
      },
      // 获取数据
      fetchData(params) {
        this.loading = true;
        const pageSize = this.pageSize;
        const pageNum = this.currentPage;
        params.limit = pageSize;
        params.current = pageNum;
        apis
          .getList(params)
          .then((res) => {
            this.tableData = res.result.list;
            this.total = res.result.total;
            this.loading = false;
          })
          .catch();
      },

    //   终止任务
      stop(id) {
        this.$confirm(
            "确定终止任务后无法找回,请谨慎操作",
          "确认要终止这条任务吗",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            const params = {
              id: id,
            };
            apis
              .stop(params)
              .then(() => {
                this.fetchData(this.form);
                this.$message({
                  type: "success",
                  message: "操作成功",
                });
              })
              .catch();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消成功",
            });
          });
      },
    //   下载zip
    download(row){
       const link = document.createElement("a");
     // 注意，在跨域的时候这个download属性无效
     //   link.download = "设备模板.zip";
       link.href =row.filePath
       document.body.appendChild(link);
       link.click();
     },
      // 编辑
      editForm(id, row) {
        this.formData = JSON.parse(JSON.stringify(row));
        this.id = id;
        this.visible = true;
      },
      // 删除
      handleDelete(id) {
        this.$confirm(
          "确定删除后当前内容将无法找回,请谨慎操作",
          "确认要删除这条内容吗",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            const params = {
              id: id,
            };
            apis
              .taskDelete(params)
              .then(() => {
                this.fetchData(this.form);
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              })
              .catch();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除",
            });
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
      handleClose() {
        this.visible = false;
        this.fetchData(this.form);
      },
      reload() {
        this.visible = false;
        this.fetchData(this.form);
      },
      handleReset() {
        this.form = {};
        this.currentPage = 1;
        this.fetchData(this.form);
      },
      handleCheck() {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.currentPage = 1;
              this.fetchData(this.form);
            }
          })
        
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .deviceContainer {
    width: 100%;
    .harmResultDanger{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
    .id_style {
      /deep/.el-table th:first-child {
        padding-left: 24px;
      }
    }
    .deviceContent {
      width: 97%;
      margin: 24px auto;
      height: 100%;
      box-sizing: border-box;
      border-radius: 8px;
      box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
      background:#fff;
    }
    /deep/.el-button.is-disabled,
    .el-button.is-disabled:focus,
    .el-button.is-disabled:hover {
      color: #a0cfff;
      cursor: not-allowed;
    }
    .content {
      width: 95%;
      margin: 0 auto;
      padding-top: 24px;
      //background: #0E6DB7;
    }
    .deviceTop {
      border-bottom: 1px solid rgba(10, 25, 51, 0.05);
      padding-bottom: 24px;
      ::v-deep .el-input__inner {
        padding: 0 0 0 16px;
      }
       @media screen and (max-width: 992px) {
    .sm-width {
     /deep/.el-form-item__label {
      width:110PX !important;
  }
  /deep/.el-form-item__content{
     margin-left: 110PX !important;
  }
    }
  }
    }
    .deviceCenter {
      height: 40px;
      margin-bottom: 16px;
      //background: #0A1933;
    }
    .deviceTable {
      width: 100%;
      margin-top: 24px;
      //background: #0A1933;
    }
    .alogrithm_page {
      margin-top: 24px;
      padding-bottom: 24px;
      height: 45px;
    }
  }
  </style>
  