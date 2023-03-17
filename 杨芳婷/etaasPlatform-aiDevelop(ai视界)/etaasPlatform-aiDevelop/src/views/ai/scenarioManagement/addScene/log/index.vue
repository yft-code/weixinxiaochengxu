<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      :inline="true"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="时间" prop="time">
        <el-date-picker
              :append-to-body="false"
              popper-class="pickerPopper"
              @change="change"
              class="data"
              v-model="ruleForm.time"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-select
          v-model="ruleForm.type"
          placeholder="请选择"
          @change="handleChange"
        >
          <el-option
            v-for="item in operateList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" size="small"
          >搜索</el-button
        >
        <el-button @click="resetForm()" size="small">清空</el-button>
      </el-form-item>
    </el-form>
    <div class="scenarioManagementTable id_style">
      <el-table
        class="scenarioManagementTables"
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column prop="time"  align="left" label="时间" >
          
        </el-table-column>
        <el-table-column  prop="type" align="left" label="操作类型">
        </el-table-column>
        <el-table-column  prop="userName" align="left" label="用户">
        </el-table-column>
        
      </el-table>

      <div class="form_pg">
        <el-pagination
          class="paginationLog"
          align="center"
           background
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLog } from '@/api/ai/log'
import * as deviceApi from '@/api/digital/device';
export default {
props: {
    item: [],
    algorithmicLayoutForm:{}
  },
  data() {
    return {
      loading: true,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      ruleForm: {
        startTime:'',
        endTime:'',
        time:'',
      },
      operateList: [
        {
          name:'启用算法',
          id:'启用算法'
        },
        {
          name:'编辑算法',
          id:'编辑算法'
        },
        {
          name:'定时布控',
          id:'定时布控'
        },
        {
          name:'定时撤控',
          id:'定时撤控'
        },
        {
          name:'停用算法',
          id:'停用算法'
        }
      ],
    };
  },
  mounted(){
     this.initData(this.item.algId);
  },
  watch:{
    'item.algId': {
      handler(newVal, oldVal) {
       this.ruleForm = {};
       this.initData(newVal);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    initData(algId){
      let that = this;
      that.loading = true;
      const params = {
        current: this.currentPage,
        limit: this.pageSize,
        type:this.ruleForm.type,
        startTime: this.ruleForm.startTime,
        endTime: this.ruleForm.endTime,
        deviceId: this.algorithmicLayoutForm.id,
        algId: algId
        //deviceId:'08638fb6-3a75-4f46-82eb-06fb638d51cb',
        //algId:'84d58430-4409-41c1-92b8-1426ead609c8'
      };
      getLog(params)
        .then((res) => {
          that.loading = false;
          if(res.result && res.result.list){
            that.tableData =  res.result.list;
            that.total = res.result.total;
          }
        })
        .catch(()=>{
          that.loading = false;
        });
    },

    // 时间处理
    change(e) {
      if (e) {
        this.ruleForm.startTime = e[0];
        this.ruleForm.endTime = e[1];
      } else {
        this.ruleForm.startTime = "";
        this.ruleForm.endTime = "";
      }
    },
    handleSearch() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.initData(this.item.algId);
    },
    resetForm() {
      this.ruleForm = {};
      this.currentPage = 1;
      this.pageSize = 10;
      this.initData(this.item.algId);
    },
    handleChange() {},
    handleCurrentChange() {},
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.initData(this.item.algId);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initData(this.item.algId);
    },
  },
};
</script>

<style lang="scss" scoped>
.paginationLog{
  float:right;
  margin-top:16px;
  margin-bottom:16px;
}
.clear{
  clear:both;
}
.scenarioManagementTable {
  width: 100%;
  .scenarioManagementTables {
    width: 100%;
  }
}
</style>