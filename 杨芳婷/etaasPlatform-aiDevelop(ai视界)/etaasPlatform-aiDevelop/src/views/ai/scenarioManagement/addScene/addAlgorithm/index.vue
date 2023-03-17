<template>
  <div class="tkAddAlgorithm">
    <el-dialog
      title="添加算法"
      :visible.sync="visible"
      width="60%"
      :close-on-click-modal="false"
      :before-close="Close"
      
    >
      <div class="form_br"></div>
      <el-form
        :inline="true"
        class="demo-form-inline"
        style="display: flex; justify-content: space-between"
        size="mini"
      >
        <el-form-item label="算法名称">
          <el-input
            v-model="algorithmList.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-right: 0">
          <el-button size="mini" type="primary" @click="handleCheck"
            >搜索</el-button
          >
          <el-button size="mini" @click="handleReset">清空</el-button>
        </el-form-item>
      </el-form>
      <el-table
        max-height="307"
        v-loading="loading"
        ref="multipleTableAlgorithmInner"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ 'font-size': '16PX' }"
        :cell-style="{ 'font-size': '15PX' }"
      >
        <el-table-column align="center" type="selection" width="55" :selectable="selectEnable">
        </el-table-column>
        <el-table-column type="index" label="编号" width="70">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="算法名称">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="scene"
          label="智能算法请求场景"
        >
          <template slot-scope="scope">
            {{ scope.row.scene ? scope.row.scene : "--" }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="description"
          label="功能概述"
        >
          <template slot-scope="scope">
            {{ scope.row.description ? scope.row.description : "--" }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="state" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state === '未授权'" style="color: red">
              {{ scope.row.state ? scope.row.state : "--" }}</span
            >
            <span v-else  style="color: rgb(82, 196, 26);">
              {{ scope.row.state ? scope.row.state : "--" }}</span
            >
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="available" label="剩余路数">
          <template slot-scope="scope">
              <span :style="{color:(scope.row.available===0?'red':'')}">{{scope.row.available}}</span>
            </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="Close">返 回</el-button>
        <el-button size="mini" type="primary" @click="handleCloseAddAlogorithm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAlgorithm } from "../../../../../api/ai/algorithmManage";
import { deviceControlAlg } from "@/api/ai/newScenarioManagement.js";
export default {
  name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    tableDataFlag1: {},
    algorithForm:[],
    algList:[]
  },
  data() {
    return {
      aa: [],
      algIds: [],
      currentPage: 1,
      pageSize: 999,
      loading: false,
      tableData: [],
      multipleSelection: [],
      algorithmList: {
        name: "",
      },
    };
  },
  watch: {
    visible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.defaultChecked();
        }
      },
      immediate: true,
      deep: true,
    },

  },
  created() {
    this.getAlgorithmList(this.algorithmList);
  },
  mounted() {
     this.$bus.$on('setAlgorValue',(id)=>{
        this.tableData.map((element) => {
          if (element.id === id||element.available===0) {
           element.choosed = true;
           this.$forceUpdate()
           this.selectEnable(element)
          }
      });
     })
      this.$bus.$on('deleteCurrnetalgorit',(id)=>{
        this.tableData.map((element) => {
      
          if (element.id === id||element.available===0) {
           element.choosed = false;
           this.$forceUpdate()
           this.selectEnable(element)
          }
     
      });
     })
  },
  methods: {
    defaultChecked() {
      let that = this;
      let arr = [];
      that.tableData.map((element) => {
        that.algorithForm && that.algorithForm.map((val) => {
          if (element.id === val.id) {
            arr.push(element);
          }
        });
      });
      that.tableData.map((element) => {
        that.algList && that.algList.map((val) => {
          if (element.id === val.algId) {
            arr.push(element);
          }
        });
      });
      if(arr.length  !== 0){
        setTimeout(()=>{
          if(that.$refs.multipleTableAlgorithmInner){
               that.$refs.multipleTableAlgorithmInner.clearSelection();
              arr.map((element) => {
                that.$nextTick(() => {
                  that.$refs.multipleTableAlgorithmInner.toggleRowSelection(
                    element,
                    true
                  );
                });
              })
          }
       
        });
      }else{
        if(that.$refs.multipleTableAlgorithmInner){
          that.$refs.multipleTableAlgorithmInner.clearSelection();
        } 
      }
    },

    selectEnable(row) {
      // for (const j in that.algorithForm) {
        // 如果和想要的id相同（等于1） 
        if (row.choosed) {
          return false; // 禁用
        } else {
          return true; // 不禁用
        }
     // }
    },
    Close() {
      this.multipleSelection = this.aa;
      this.handleClose();
    },
    handleCheck() {
      this.currentPage = 1;
      this.pageSize = 999;
      this.getAlgorithmList(this.algorithmList);
    },
    handleReset() {
      this.currentPage = 1;
      this.pageSize = 999;
      this.algorithmList = {
        name: "",
      };
      this.getAlgorithmList(this.algorithmList);
    },
    getAlgorithmList(params) {
      this.loading = true;
      const pageSize = this.pageSize;
      const pageNum = this.currentPage;
      params.pageSize = pageSize;
      params.pageNum = pageNum;
      getAlgorithm(params)
        .then((res) => {
          this.loading = false;
          this.tableData = res.result.list;
          this.tableData.map((element) => {
            this.algorithForm && this.algorithForm.map((val) => {
              if (element.id === val.id||element.available===0) {
              element.choosed =  true;
              }
            });
          });
          this.defaultChecked();
        })
        .catch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCloseAddAlogorithm() {
      this.$emit("toAlogorithm", this.multipleSelection);
    },
    handleClose() {
      this.$emit("close-callback2", this.multipleSelection);
    },
  },
};
</script>

<style scoped lang="scss">
.tkAddAlgorithm {
  ::v-deep .el-form-item__label {
    font-size: 14px;
  }
  .form_br {
    width: 100%;
    height: 1px;
    background-color: #f3f3f5;
    margin-bottom: 20px;
  }
}
</style>
