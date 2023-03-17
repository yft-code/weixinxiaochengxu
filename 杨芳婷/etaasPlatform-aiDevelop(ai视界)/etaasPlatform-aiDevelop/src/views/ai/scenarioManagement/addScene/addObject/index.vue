<template>
  <div class="tkAddObject">
    <el-dialog
      title="添加通知"
      :visible.sync="visible"
      width="1150px"
      :close-on-click-modal="false"
      :before-close="Close"
    >
      <div class="form_br"></div>
      <el-form
        :inline="true"
        :model="form"
        class="demo-form-inline"
        size="mini"
      >
        <el-form-item label="所属部门">
          <el-cascader
            ref="cascader"
            v-model="form.organizationId"
            :options="jgList"
            :props="{
              checkStrictly: true,
              expandTrigger: 'hover',
              emitPath: false,
            }"
            @change="changeCascader"
          >
            <template slot-scope="{ node, data }">
              <div @click="cascaderClick(data)">
                <span>{{ data.name }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </div>
            </template>
          </el-cascader>
        </el-form-item>
        <!-- <el-form-item label="所属部门">
          <el-select v-model="form.departId"
            @change="departChange"
            placeholder="请选择">
            <el-option
                v-for="item in bmList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="姓名" class="tempMaringLeft">
          <el-select v-model="form.name" placeholder="请选择">
            <el-option
              v-for="item in userData"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="工号">
          <el-input v-model="form.workNumber"  placeholder="请输入"></el-input>
        </el-form-item> -->
        <el-form-item style="float: right">
          <el-button size="mini" type="primary" @click="handleCheck"
            >搜索</el-button
          >
          <el-button size="mini" @click="handleReset">清空</el-button>
        </el-form-item>
      </el-form>
      <el-table
        max-height="307"
        v-loading="loading"
        ref="multipleTableObjectInner"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ 'font-size': '16PX' }"
        :cell-style="{ 'font-size': '15PX' }"
      >
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="编号" width="60">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="organization"
          label="所属机构"
        >
          <template slot-scope="scope">
            {{ scope.row.organization ? scope.row.organization : "--" }}
          </template>
        </el-table-column>
        <!-- <el-table-column
            show-overflow-tooltip
            prop="department"
            label="部门"
        >
          <template slot-scope="scope">
            {{scope.row.department?scope.row.department:'--'}}
          </template>
        </el-table-column> -->
        <el-table-column show-overflow-tooltip prop="name" label="姓名">
          <template slot-scope="scope">
            {{ scope.row.name ? scope.row.name : "--" }}
          </template>
        </el-table-column>

        <el-table-column show-overflow-tooltip prop="phone" label="电话">
          <template slot-scope="scope">
            {{ scope.row.phone ? scope.row.phone : "--" }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="email" label="邮箱">
          <template slot-scope="scope">
            {{ scope.row.email ? scope.row.email : "--" }}
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="Close">返 回</el-button>
        <el-button size="mini" type="primary" @click="handleCloseAddObject"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  userPageList,
  getUserListOrg,
  listDepart,
  getUserDetailInfo,
  queryUserId,
} from "../../../../../api/ai/scenarioManagement";
import { getUserInfo } from "@/api/ai/warningEvent";
export default {
  name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    editObject: {},
    tableDataFlag2: {},
    removeIndex2: {
      type: String,
      default: "",
    },
    dynamicTags: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      firstTime: true, //判断是不是第一次进入页面
      userData: [],
      aa: [],
      jgList: [],
      bmList: [],
      current: 1,
      size: 9999,
      loading: false,
      tableData: [],
      userIds: [],
      multipleSelection: [],
      form: {
        name: "",
      },
    };
  },
  watch: {
    visible(val) {
      if (val) {
        let that = this;
        let arr = [];
        that.dynamicTags.map(element=>{
          that.tableData.map(val=>{
            if(val.id === element.id){
              arr.push(val)
            }
          })
        })
        if (that.dynamicTags.length !== 0) {
          setTimeout(() => {
            that.$refs.multipleTableObjectInner.clearSelection();
            arr.map((element) => {
                that.$refs.multipleTableObjectInner.toggleRowSelection(
                  element,
                  true
                );
              
            });
          });
        } else {
          if (that.$refs.multipleTableObjectInner) {
            that.$refs.multipleTableObjectInner.clearSelection();
          }
        }
      }
    },
  },
  created() {
    // this.listDepart()
    this.getUserListOrg();
    this.getUser();
    this.getUserPageList(this.form);
  },
  methods: {
    cascaderClick(nodeData) {
      this.form.organization = nodeData.value;
      this.$refs.cascader.checkedValue = nodeData.value;
      this.$refs.cascader.computePresentText();
      this.$refs.cascader.toggleDropDownVisible(false);
    },

    changeCascader(val) {
      this.getUser(val);
    },

    async getUser() {
      let params = {
        pageSize: 99999,
        pageNum: 1,
      };
      let arr = [];
      let id;
      if (
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")) &&
        JSON.parse(localStorage.getItem("userInfo"))["aiHorizon"]
      ) {
        id = JSON.parse(localStorage.getItem("userInfo"))["aiHorizon"].id;
        let param = {
          id: id,
        };
        await queryUserId(param)
          .then((res) => {
            if (res.code === 0) {
              if (res.result)
                res.result.organizations.map((element) => {
                  params["id"] = element.organizationId;
                  userPageList(params)
                    .then((response) => {
                      if (response.code === 0) {
                        response.result.list.map((val2) => {
                          this.userData.push({
                            id: val2.id,
                            username: val2.name,
                          });
                        });
                        this.userData = this.deWeightThree(this.userData, "id");
                      }
                    })
                    .catch();
                });
            }
          })
          .catch();
      }
    },
    //去重数组
    deWeightThree(arr, value) {
      let map = new Map();
      for (let item of arr) {
        if (!map.has(item[value])) {
          map.set(item[value], item);
        }
      }
      return [...map.values()];
    },

    departChange() {
      this.form.name = "";
      let params = {
        departId: this.form.departId,
      };
      getUserInfo(params)
        .then((res) => {
          this.userData = res.result;
          //  console.log(res)
          //  if(res.code === 0){
          //     this.userList=res.result
          //     if(this.deviceList.userId){
          //        this.deviceList.userId = ''
          //     }

          //     this.changeDataSecond();
          //  }
        })
        .catch();
    },
    listDepart() {
      listDepart().then((res) => {
        this.bmList = res.result;
      });
    },
    Close() {
      this.$message({
        message: "取消成功!",
        type: "success",
      });
      this.multipleSelection = this.aa;
      this.handleClose();
    },

    getUserListOrg() {
      let id;
      if (
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo"))["aiHorizon"]
      ) {
        id = JSON.parse(localStorage.getItem("userInfo"))["aiHorizon"].id;
        let param = {
          id: id,
        };
        getUserDetailInfo(param).then((response) => {
          //改造数据,增加value和label
          if (
            response.result &&
            response.result &&
            response.result.length !== 0
          ) {
            response.result.map((element) => {
              element.label = element.name;
              element.value = element.id;
              if (element.children && element.children.length !== 0) {
                element.children.map((val) => {
                  val.label = val.name;
                  val.value = val.id;
                  if (val.children && val.children.length !== 0) {
                    val.children.map((val2, index2) => {
                      val2.label = val2.name;
                      val2.value = val2.id;
                      if (val2.children && val2.children.length !== 0) {
                      } else {
                        val2.children = "";
                      }
                    });
                  } else {
                    val.children = "";
                  }
                });
              } else {
                element.children = "";
              }
            });
            this.jgList = response.result;
          }
        });
      }
    },

    handleCheck() {
      this.currentPage = 1;
      this.pageSize = 999;
      this.getUserPageList(this.form);
    },
    handleReset() {
      this.current = 1;
      this.size = 999;
      this.form = {
        departId: "",
        name: "",
        workNumber: "",
        organization: "",
      };
      this.getUser("");
      this.getUserPageList(this.form);
    },
    getUserPageList(params) {
      this.loading = true;
      const size = this.size;
      const current = this.current;
      params.pageSize = size;
      params.pageNum = current;
      userPageList(params).then((res) => {
        this.loading = false;
        let arr = [];

        res.result.list.map((element) => {
          arr.push({
            id: element.id,
            username: element.name,
          });
          element.organization = [];
          element.organizations.map((val) => {
            element.organization.push(val.organizationName);
          });
          element.organization = element.organization.join(",");
        });
        if (this.firstTime) {
          this.userData = arr;
        }
        this.firstTime = false;
        this.tableData = res.result.list;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCloseAddObject() {
      this.handleClose();
    },
    handleClose() {
      this.$emit("close-callback3", this.multipleSelection);
    },
  },
};
</script>

<style scoped lang="scss">
.tkAddObject {
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
.tempMaringLeft {
  margin-left: 30px;
}
</style>
