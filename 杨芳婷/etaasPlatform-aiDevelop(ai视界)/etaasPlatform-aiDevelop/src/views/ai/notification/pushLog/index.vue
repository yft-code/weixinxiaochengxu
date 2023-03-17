<template>
  <div class="deviceContainer">
    <div class="deviceContent"> 
      <div class="content">
        <div class="mailContent">邮箱</div>
            <div class="deviceTop">
              <el-form
                :model="form"
                size="small"
                label-width="80px"
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
     <el-form-item label="告警时间">
                  <el-date-picker
                    style="width:100%"
                    @change="change"
                    v-model="warningTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="~"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :picker-options="pickerOptions"
                    popper-class="pickerPopper"
                    ref="pickerPopper"
                  >
                  </el-date-picker>
                </el-form-item>
          </el-col>
           <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
            <el-form-item label="预警名称">
                  <el-select
                   style="width:100%"
                    @change="changeWarningName"
                    v-model="form.warningId"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in WarningNameList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
          </el-col>

          <el-col 
            :sm="24"
            :md="8"
            :lg="12"
            :xl="12">
             <el-form-item style="float:right;margin-right:0px;">
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
              <div class="id_style">
                <el-table
                  v-loading="loading"
                  :data="tableData"
                  :cell-style="cellstyle"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="id"
                    label="事件编号"
                    show-overflow-tooltip
                    min-width="200"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        @click="warningNumber(scope.row)"
                      >
                        <span style="font-size:15px"> {{ scope.row.eventNum }}</span></el-button
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    min-width="150"
                    label="告警时间"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    min-width="150"
                    label="预警名称"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{ scope.row.warning.name }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="level"
                    min-width="150"
                    show-overflow-tooltip
                    label="预警等级"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.warning.levelName }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    min-width="150"
                    show-overflow-tooltip
                    label="推送内容"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    min-width="150"
                    show-overflow-tooltip
                    label="推送用户"
                  >
                    <template slot-scope="scope">
                      <div v-if="scope.row.details.length > 0">
                        <span
                          v-for="(item, index) in scope.row.details"
                          :key="index"
                        >
                          {{ item.username }}
                        </span>
                      </div>
                      <div v-else>--</div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="result"
                    min-width="150"
                    show-overflow-tooltip
                    label="推送结果"
                  >
                    <template slot-scope="scope">
                      <div v-if="scope.row.details.length > 0">
                        <span class="active" v-if="scope.row.sendSuccess !== 0"
                          >{{ scope.row.sendSuccess }}成功</span
                        >
                        <span class="activeNo" v-if="scope.row.sendError !== 0"
                          >{{ scope.row.sendError }}失败</span
                        >
                      </div>
                      <div v-else>--</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        @click="detail(scope.row)"
                        >明细</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
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

      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="邮件" name="first">
          <div class="content">
            <div class="deviceTop">
              <el-form
                :model="form"
                size="small"
                label-width="80px"
              >
               <el-row
           :gutter="10"
             >
        <template>
          <el-col
           :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
     <el-form-item label="告警时间">
                  <el-date-picker
                    style="width:100%"
                    @change="change"
                    v-model="warningTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="~"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :picker-options="pickerOptions"
                    popper-class="pickerPopper"
                    ref="pickerPopper"
                  >
                  </el-date-picker>
                </el-form-item>
          </el-col>
           <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
            <el-form-item label="预警名称">
                  <el-select
                   style="width:100%"
                    @change="changeWarningName"
                    v-model="form.warningId"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in WarningNameList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
          </el-col>

          <el-col 
            :sm="24"
            :md="8"
            :lg="12"
            :xl="12">
             <el-form-item style="float:right;margin-right:0px;">
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
              <div class="id_style">
                <el-table
                  v-loading="loading"
                  :data="tableData"
                  :cell-style="cellstyle"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="id"
                    label="事件编号"
                    show-overflow-tooltip
                    min-width="200"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        @click="warningNumber(scope.row)"
                      >
                        <span style="font-size:15px"> {{ scope.row.eventNum }}</span></el-button
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    min-width="150"
                    label="告警时间"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    min-width="150"
                    label="预警名称"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{ scope.row.warning.name }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="level"
                    min-width="150"
                    show-overflow-tooltip
                    label="预警等级"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.warning.levelName }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    min-width="150"
                    show-overflow-tooltip
                    label="推送内容"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    min-width="150"
                    show-overflow-tooltip
                    label="推送用户"
                  >
                    <template slot-scope="scope">
                      <div v-if="scope.row.details.length > 0">
                        <span
                          v-for="(item, index) in scope.row.details"
                          :key="index"
                        >
                          {{ item.username }}
                        </span>
                      </div>
                      <div v-else>--</div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="result"
                    min-width="150"
                    show-overflow-tooltip
                    label="推送结果"
                  >
                    <template slot-scope="scope">
                      <div v-if="scope.row.details.length > 0">
                        <span class="active" v-if="scope.row.sendSuccess !== 0"
                          >{{ scope.row.sendSuccess }}成功</span
                        >
                        <span class="activeNo" v-if="scope.row.sendError !== 0"
                          >{{ scope.row.sendError }}失败</span
                        >
                      </div>
                      <div v-else>--</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        @click="detail(scope.row)"
                        >明细</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
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
        <el-tab-pane label="短信" name="second">
          <div class="noData">该功能暂未开放,敬请期待</div>
        </el-tab-pane>
        <el-tab-pane label="虚拟拨号" name="third">
          <div class="noData">该功能暂未开放,敬请期待</div>
        </el-tab-pane>
      </el-tabs> -->
      </div>
    </div>
    <detail
      :numberName="numberName"
      :details="details"
      :detailsPage="detailsPage"
      :visible="visible"
      @close-callback="handleClose"
    ></detail>
    <numberDetail
      :warningNumberId="warningNumberId"
      :numberName="numberName"
      :visible="numberVisible"
      @close-callback-number="handleCloseNumberDetail"
    ></numberDetail>
  </div>
</template>
<script>
import { getLogList, warningList } from "../../../../api/ai/pushLog";
import detail from "./detail";
import numberDetail from "./numberDetail";

export default {
  components: {
    detail,
    numberDetail,
  },
  data() {
    return {
      numberName: "",
      visible: false,
      numberVisible: false,
      warningNumberId: "",
      details: [],
      detailsPage: [],
      loading: false,
      tableData: [],
      activeName: "first",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      warningTime: "",
      form: {
        warningId: "",
        start: "",
        end: "",
      },
      WarningNameList: [],
      pickerOptions: {
        disabledDate: (time) => {},
      },
    };
  },
  watch:{
    warningTime(n,o){
      if(n===null){
        this.warningTime = ''
        this.form.start = ''
        this.form.end = ''
        // this.fetchData(this.form);
      }
    }
  },
  created() {
    this.fetchData(this.form);
    this.getWarningList();
  },
  methods: {
    // 时间处理
    change(e) {
      if (e) {
        this.form.start = e[0];
        this.form.end = e[1];
      }
    },
    // 关闭明细弹框
    handleClose() {
      this.visible = false;
    },

    getWarningList() {
      warningList().then((res) => {
        this.WarningNameList = res.result;
      });
    },
    // 关闭事件编号弹框
    handleCloseNumberDetail() {
      this.numberVisible = false;
    },

    // 切换
    handleClick(tab, event) {
      if (this.activeName === "first") {
        this.currentPage = 1;
        this.pageSize = 10;
        this.fetchData(this.form);
      } else if (this.activeName === "second") {
      } else {
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

    // 获取数据
    fetchData(params) {
      this.loading = true;
      const limit = this.pageSize;
      const current = this.currentPage;
      params.limit = limit;
      params.current = current;
      getLogList(params).then((res) => {
        this.loading = false;
        this.tableData = res.result.list;
        this.total = res.result.total;
      });
    },

    // 搜索
    handleCheck() {
      this.fetchData(this.form);
    },

    // 清空
    handleReset() {
      this.warningTime = "";
      (this.currentPage = 1),
        (this.pageSize = 10),
        (this.form = {
          warningId: "",
          start: "",
          end: "",
        });
      this.fetchData(this.form);
    },

    changeWarningName(val) {
      this.form.warningId = val;
    },

    // 打开明细弹框
    detail(row) {
      this.numberName = row.eventNum;
      this.details = row.details;
      this.detailsPage = row.details.slice(0, 10);
      this.visible = true;
    },

    // 打开事件编号弹框
    warningNumber(row) {
      this.numberName = row.eventNum;
      this.warningNumberId = row.eventId;
      this.numberVisible = true;
    },

    // 分页
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
};
</script>
<style>
.el-tooltip__popper {
  max-width: 600px;
}
</style>
<style lang="scss" scoped>
.mailContent{
  color:#409EFF;
  font-size: 14px;
  line-height: 40px;
  height:40px;
  border-bottom:2px solid #409EFF;
  width:40px;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 16px;
}
.mailContents{
  color:#409EFF;
  font-size: 14px;
  line-height: 40px;
  height:40px;
  border-bottom:2px solid #409EFF;
  width:40px;
  cursor: pointer;
  font-weight: 500;
  margin-bottom:48px;
}
.noData {
  // height: 60px;
  line-height: 60px;
  margin-left: 30px;
  font-weight: 400;
  font-size: 16px;
  color: #0a1933;
  padding-bottom: 20px;
}
.active {
  color: #02d624;
}
.activeNo {
  color: #ff3a3a;
}
.circle {
  display: inline-block;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  margin: 0;
  margin-right: 5px;
}
.fileNameWarning {
  cursor: pointer;
}
/deep/ .el-tabs__nav {
  margin-left: 40px;
}
/deep/ .el-select-dropdown {
  z-index: 10 !important;
}
.deviceContainer {
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
    margin: 24px auto;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
  }
  .content {
    width: 95%;
    margin: 0 auto;
    padding-top: 24px;
    //background: #0E6DB7;
  }
  .deviceTop {
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(10, 25, 51, 0.05);
    ::v-deep .el-input__inner {
      padding: 0 0 0 16px;
    }

  }
  .deviceCenter {
    height: 40px;
    margin-bottom: 16px;
    //background: #0A1933;
  }
  .deviceTable {
    margin-top: 24px;
    //background: #0A1933;
    ///deep/.el-table--fit {
    //   border-right: 1px solid #EBEEF5;
    //   border-left: 1px solid #EBEEF5;
    // }
  }
  .alogrithm_page {
    margin-top: 24px;
    padding-bottom: 24px;
    height: 45px;
  }
}
</style>
