<template>
  <div class="userContainer">
    <div class="deviceContent">
        <el-tabs v-model="activeName" @tab-click="handleClick">
     <el-tab-pane label="人脸信息" name="first">
        <div class="content">
        <div class="deviceTop">
           <el-form   
            :model="form"
            size="small" 
            label-width="50px">
      <el-row
        :gutter="10"
      >
        <template>
          <el-col
           :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
      <el-form-item label="姓名" class="sm-width">
              <el-input placeholder="请输入" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
          <el-form-item label="身份ID"  label-width="70px" class="sm-width">
              <el-input
                placeholder="请输入"
                v-model="form.identityId"
              ></el-input>
            </el-form-item>
          </el-col>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
          <el-form-item label="所属脸库" label-width="80px" class="sm-width">
                <el-select
                style="width:100%"
                 v-model="face"
               :popper-append-to-body="false"
               placeholder="请选择"
               @change="changeFace"
            >
              <el-option
                v-for="item in faceLists"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            </el-form-item>
          </el-col>
                <el-col
            :sm="24"
            :md="24"
            :lg="6"
            :xl="6"
          >
     <el-form-item style="float:right;margin-right: 0px">
              <el-button size="small" @click="handleCheck" type="primary"
                >搜索</el-button
              >
              <el-button size="small" @click="handleReset">清空</el-button>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
        </div>
        <div class="deviceTable">
          <div style="float: right; margin-right: 0px; margin-bottom: 16px">
            <el-button
              size="small"
              @click="handleAdd('添加人脸')"
              type="primary"
              >添加人脸</el-button
            >
          </div>
          <div class="id_style">
            <el-table
              
              v-loading="loading"
              :data="tableData"
              :cell-style="cellstyle"
              style="width: 100%"
            >
              <el-table-column
                label="编号"
                :index="count"
                type="index"
                width="120"
              >
              </el-table-column>
              <el-table-column prop="path" label="照片">
                <template slot-scope="scope">
                  <img :src="scope.row.path+'?' + new Date()" height="40" width="40" />
                </template>
              </el-table-column>
              <el-table-column prop="name" label="姓名" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="identityId"
                show-overflow-tooltip
                label="身份ID"
              >
              </el-table-column>
               <el-table-column
                prop="faceDbName"
                min-width="150"
                label="所属脸库"
              >
              </el-table-column>
              <el-table-column
                prop="remark"
                show-overflow-tooltip
                label="备注"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.remark ? scope.row.remark : "--"
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="155">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="editForm(scope.row, '编辑人脸')"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleDelete(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--分页器-->
        </div>
        <div class="alogrithm_page">
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
    </el-tab-pane>
    <el-tab-pane label="脸库信息" name="second">
      <face-message ref="face"></face-message>
    </el-tab-pane>
  </el-tabs>
    </div>
    <edit
      :faceLists="editfaceLists"
      :visible="visible"
      :id="id"
      :row="row"
      :type="type"
      @close-callback="handleClose"
      @close-callback1="reload"
      :title="title"
    >
    </edit>
  </div>
</template>
<script>
import edit from "./edit";
import * as api from "@/api/ai/userManager.js";
import FaceMessage from './faceMessage.vue';
export default {
  components: {
    edit,
    FaceMessage
  },
  data() {
    return {
      face:'',
      activeName: 'first',
      num: 0,
      loading: true,
      active: "",
      id: "",
      form: {},
      row: {},
      type: "",
      total: 0,
      page: {
        beginPageIndex: 1,
        pageCurrent: 1,
        endPageIndex: 8,
        pageSize: 10,
        totalCount: 100,
        totalPage: 0,
      },
      currentPage: 1,
      pageSize: 10,
      title: "",
      showAdd: false,
      showImport: false,
      visible: false,
      tableData: [],
      faceLists:[],
      editfaceLists:[],
      value: "",
      level: "",
      file: "",
    };
  },
  created() {
    this.fetchData(this.form);
    this.faceList()
  },
  methods: {
    // 
    changeFace(e){
        if(e==='-1000'){
          this.form.faceDbId=''
        }else{
          this.form.faceDbId=e
        }
    },
     handleClick(tab, event) {
      // console.log(tab, event);
      if(this.activeName==='first'){
        this.faceList()
        this.fetchData(this.form)
      }else{
        this.$refs.face.fetchData({})
      }
      },
    count(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    cellstyle({ columnIndex }) {
      if (columnIndex === 0) {
        return "padding-left:24px;font-size:15PX";
      } else {
        return "font-size:15PX";
      }
    },
    changeStyle(row) {
      this.loading = true;
      const params = {
        id: row.id,
      };
      if (row.isActive === false) {
        row.isActive = true;
        api
          .blackUpdate(params)
          .then(() => {
            this.loading = false;
            this.$message({
              type: "success",
              message: "设置成功",
            });
            this.fetchData(this.form);
          })
          .catch(() => {
            this.loading = false;
            // this.$message({
            //         type: 'warning',
            //         message: '设置失败'
            //       });
            row.isActive = false;
          });
        return;
      } else {
        row.isActive = false;
        api
          .WhiteUpdate(params)
          .then(() => {
            this.loading = false;
            this.$message({
              type: "success",
              message: "取消设置成功",
            });
            this.fetchData(this.form);
          })
          .catch(() => {
            this.loading = false;
            // this.$message({
            //         type: 'warning',
            //         message: '设置失败'
            //       });
            row.isActive = false;
            row.isActive = true;
          });
      }
    },
    // 获取脸库名称
      faceList() {
      let faceList=[]
      api.allFace().then((res) => {
      if(res.result){
         faceList=res.result
      }
        this.editfaceLists=JSON.parse(JSON.stringify(faceList));
        faceList&&faceList.length>0&&faceList.unshift({id:'-1000',name:'全部'})
        this.faceLists=faceList
      });
    },
    // 获取数据
    fetchData(params) {
      this.loading = true;
      const limit = this.pageSize;
      const current = this.currentPage;
      params.limit = limit;
      params.current = current;
      api
        .getUser(params)
        .then((res) => {
          console.log('res',res);
          // this.tableData&&this.tableData.length>0&&this.tableData.map(item=>{
          //    item.path=''
          // })
          // console.log('this.tableData',this.tableData);
          // setTimeout(()=>{
          //   console.log('path',this.tableData);
          //   this.tableData = JSON.parse(JSON.stringify(res.result.list));
          // })
          this.tableData = res.result.list
          this.total = res.result.total;
          this.loading = false;
        })
        .catch();
    },
    //添加
    handleAdd(val) {
      this.title = val;
      this.type = "add";
      this.visible = true;
    },
    // 编辑
    editForm(row, val) {
      this.row = JSON.parse(JSON.stringify(row));
      this.title = val;
      this.type = "edit";
      this.visible = true;
    },
    // 删除
    handleDelete(id) {
      this.$confirm("确定删除后当前内容将无法找回,请谨慎操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          const params = {
            id: id,
          };
          api
            .deleteUser(params)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.fetchData(this.form);
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    handleClose() {
      this.visible = false;
      this.fetchData(this.form)
    },
    reload() {
      // this.visible=false
      this.fetchData(this.form);
    },
    handleReset() {
      this.form = {};
      this.face=''
      this.currentPage = 1;
      this.fetchData(this.form);
    },
    handleCheck() {
      this.currentPage = 1;
      this.fetchData(this.form);
    },
    handleImport() {
      this.showImport = true;
    },
    closeCallback() {
      this.showImport = false;
      this.showAdd = false;
    },
    handleSizeChange(val) {
       this.tableData&&this.tableData.length>0&&this.tableData.map(item=>{
        item.path=''
      })
      this.currentPage = 1;
      this.pageSize = val;
      this.fetchData(this.form);
    },
    handleCurrentChange(val) {
      this.tableData&&this.tableData.length>0&&this.tableData.map(item=>{
        item.path=''
      })
      this.currentPage = val;
      this.fetchData(this.form);
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__nav {
  margin-left: 40px;
}
/deep/ .el-select-dropdown {
  z-index: 10 !important;
}
.userContainer {
  /deep/.el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 22px;
    bottom: 0;
    width: 97%;
    margin: 0 auto;
    height: 2px;
    background-color: rgba(10, 25, 51, 0.05) !important;
    z-index: 1;
}
  /deep/.el-button--primary .el-button--primary {
    background: #347fff;
    border-color: #347fff;
    color: #fff;
  }
  width: 100%;
  .id_style {
    /deep/.el-table th:first-child {
      padding-left: 24px;
    }
  }
  .deviceContent {
    width: 97%;
    padding-top:10px;
    margin: 24px auto;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
    .content {
      width: 95%;
      margin: 0 auto;
      padding-top: 24px;
    }
  }
  .isActiveClass {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    border: royalblue 8px solid;
  }
  .isActiveClass1 {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    border: #dfe1e4 4px solid;
  }
  .deviceTop {
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(10, 25, 51, 0.05);
    @media screen and (max-width: 768px) {
  .sm-width {
   /deep/.el-form-item__label {
    width:80PX !important;
}
/deep/.el-form-item__content{
   margin-left: 80PX !important;
}
  }
}
  }
  .deviceTable {
    width: 100%;
    margin-top: 24px;
  }
  .alogrithm_page {
    margin-top: 24px;
    padding-bottom: 24px;
    height: 45px;
  }
}
</style>
