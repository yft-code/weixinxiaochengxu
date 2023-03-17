<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
          <el-form
          ref="deviceForm"
          :model="form"
         size="small"
           label-width="105px">
      <el-row
        :gutter="-10"
      >
        <!-- 搜索框组件 -->
        <template>
          
       <el-form-item style="float:right;margin-right:0">
        
          <el-button type="primary" size="small" @click="addClick"
            >新增隐患库</el-button
          >
          </el-form-item>

        </template>
      </el-row>
    </el-form>
        <div class="form_br"></div>
        <div class="deviceTable">
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            tooltip-effect="dark"
          >
           
            <el-table-column prop="num" label="序号">
            </el-table-column>
            <el-table-column
            
              prop="code"
              label="库编号"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="隐患库名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="sum"
              label="隐患信息"
              show-overflow-tooltip
            >
             
            </el-table-column>
            <el-table-column
              prop="comment"
              label="说明"
              show-overflow-tooltip
            >
             
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="threshold"
              label="比对阈值"
            >
            </el-table-column>
            <el-table-column
             
              prop="active"
              label="是否启用"
            >
             <template slot-scope="scope">
                  <div
                    :class="{
                      isActive: scope.row.active,
                      isUnActive: !scope.row.active,
                    }"
                    @click="changeStyle(scope.row)"
                  ></div>
                </template>
  
            </el-table-column>

            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="editClick(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="mini"
                  @click="deleteClick(scope.row)"
                  >删除</el-button
                >
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
          <div class="clear"></div>
        </div>
      </div>
     
    </div>
       <el-dialog
       :title="title"
        :visible.sync="visible"
        width="600px"
        :before-close="handleClose"
    >
     <div class="edit_input">
        <div class="input_container">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
            size="mini"
          >
            <el-form-item label="隐患库名称" prop="name">
              <el-input
       
                placeholder="请输入隐患库名称"
                v-model="ruleForm.name"
                class="dialogInput"
              ></el-input>
            </el-form-item>
            <el-form-item label="比对阈值" prop="threshold">
              <el-input
                class="dialogInput"
                placeholder="请输入比对阈值"
                v-model="ruleForm.threshold"
              ></el-input>
            </el-form-item>
            
          
            
            <el-form-item label="说明" prop="comment">
              <el-input
                type="textarea" 
                class="dialogInput"
                placeholder="请输入说明"
                v-model="ruleForm.comment"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="visible = false">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="makeSure"
          :disabled="disabled"
          >确 定</el-button
        >
      </span> 
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/ai/dangerlibManage.js";
export default {
  data() {
    const validateThreshold = (rule, value, callback) => {
      let reg = /^0\.[0-9]{1,2}$|^0{1}$|^1{1}$|^1\.[0]{1,2}$/;
      if(value === ''||value === null||value === undefined){
        callback(new Error("请输入比对阈值"));
      }else if (!reg.test(Number(value))) {
        callback(new Error("请输入0到1之间的小数,最多两位"));
      }else{
        callback();
      }
    }
    const validateName = (rule, value, callback) => {
      if(value === ''||value === null||value === undefined){
        callback(new Error("请输入隐患库名称"));
      }else if (value.length > 30) {
        callback(new Error("隐患库名称不超过30个字符"));
      }else{
        callback();
      }
    }
    return {
      loading: true,
      visible:false,
      ruleForm:{},
      // 楼层列表
      form: {
      
      },
      title:'新增隐患库',
      row: {},
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      currentSelect:{},
      disabled:false,
      rules:{
         threshold:[
           {  required: true,trigger: "blur",validator:validateThreshold },
         ],
          name:[
           {  required: true,trigger: "blur",validator:validateName },
         ],
         comment:[
           {
             max:500, message:'说明不能超过500个字符', trigger: "blur"
           }
         ]
      }
    };
  },
  watch: {
   
  },
  created() {

    this.fetchData(this.form);
  },
  mounted() {

  },
  methods: {
    //获取列表
    fetchData(params) {
      this.loading = true;
      const limit = this.pageSize;
      const current = this.currentPage;
      params.limit = limit;
      params.current = current;
      api
        .gethiddenList(params)
        .then((res) => {
          if(res.result && res.result.list){
            this.tableData = res.result.list;
            this.tableData.map((element,index)=>{
              element.num = (this.currentPage - 1)*10 + index + 1;
            })
            this.total = res.result.total;
            this.loading = false;
          }
         
        })
        .catch();
    },
    deleteClick(row) {
      let params = {
        id:row.id
      }
       this.$confirm(
        "确定删除后当前内容将无法找回，请谨慎操作！",
        "确认要删除这条内容吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
               api
                .deletehiddenList(params)
                .then((res) => {
                  this.$message({
                    type: "success",
                    message: res.message,
                  });
                  this.fetchData(this.form);
                })
                  
                })
        .catch(() => {
        
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
   Close(){

   },
   editClick(row) {
     this.visible = true;
     if(this.$refs['ruleForm']){
       this.$refs['ruleForm'].resetFields();
     }
     this.ruleForm = JSON.parse(JSON.stringify(row));
     this.title="编辑隐患库"
   },

   addClick(){
     this.ruleForm={}
     this.visible = true;
     if(this.$refs['ruleForm']){
       this.$refs['ruleForm'].resetFields();
     } 
     this.title="新增隐患库"
   },
   handleClose(){
     this.visible=false
   },
   makeSure(){
       this.$refs.ruleForm.validate((valid) => {
        if (valid) {
           this.disabled = true;
            let params = this.ruleForm
            if(this.title === '编辑隐患库'){
              api.updatehiddenList(params)
              .then(res=>{
                this.$message({
                    type: "success",
                    message: res.message,
                  });
                  this.visible = false;
                  this.disabled = false;
                  this.fetchData(this.form);
                   
              })
              .catch(()=>{
                this.visible = false;
                this.disabled = false;
              })
            }else{
              api.addhiddenList(params)
              .then(res=>{
                this.$message({
                    type: "success",
                    message: res.message,
                  });
                  this.visible = false;
                  this.disabled = false;
                   this.fetchData(this.form);
              })
              .catch(()=>{
                this.visible = false;
                this.disabled = false;
              })
            }
        }
        })
   },
   changeStyle(){

   }
  },
};
</script>
<style lang="scss" scoped>
.isActive {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    border: royalblue 8px solid;
  }
  .clear{
    clear:both;
  }
  .isUnActive {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    border: #dfe1e4 4px solid;
  }
  .dialogInput{
    width:90%;
  }
.deviceContainer {
  .closeIcon {
    line-height: 13px;
    cursor: pointer;
    font-size: 22px;
    margin-left: 30px;
    color: lightgrey;
  }
  .checkWay {
    height: 32px;
    line-height: 13px;
    border-radius: 4px;
    color: rgba(10, 25, 51, 0.5);
    font-size: 18px;
  }
  .checkDialogTitle {
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 600;
    color: #0a1933;
    line-height: 13px;
    padding-left: 16px;
    float: left;
  }
  .checkEvent {
    float: right;
    padding-left: 16px;
    padding-right: 8px;
    min-width: 115px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    color: #347fff;
    font-size: 18px;
    margin-right: 0px;
  }
  .checkDialogWarning {
    float: left;
    padding-left: 16px;
    padding-right: 8px;
    min-width: 115px;
    height: 32px;
    line-height: 32px;
    background: #ff3a3a;
    border-radius: 4px;
    color: #fff;
    font-size: 18px;
    margin-left: 16px;
  }
  .checkDialogisWarning {
    float: left;
    padding-left: 16px;
    padding-right: 8px;
    min-width: 115px;
    height: 32px;
    line-height: 32px;
    background: lightgray;
    border-radius: 4px;
    color: #fff;
    font-size: 18px;
    margin-left: 16px;
  }
  .icon-word {
    margin-left: 6px;
    cursor: pointer;
    font-size: 18px;
    color: #347fff;
  }
  width: 100%;
  .deviceContent {
    width: 97%;
    margin: 24px auto;
    border-radius: 8px;
    box-sizing: border-box;
    background:#fff;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    @media screen and (max-width: 1680px) {
      .pickerdata {
        width: 420px;
      }
    }
    .content {
      padding-top: 24px;
      width: 95%;
      margin: 0 auto;
        /deep/.el-select{
      width:100% !important;
    }
    }
    /deep/.el-date-editor .el-range-separator {
      color: #979797 !important;
      width: 8%;
      font-size: 12px;
    }
    /deep/ .el-date-editor .el-range__icon {
      position: absolute;
      right: 5px;
      top: 1px;
      color: #c0c4cc;
    }
    /deep/.el-date-editor--daterange.el-input__inner {
      width: 338px;
    }
    /deep/.el-range-editor--small .el-range-input {
      font-size: 12px;
    }
    /deep/.el-icon-time:before {
      content: "\e78e";
    }
    /deep/ .el-button--primary.is-disabled,
    .el-button--primary.is-disabled:active,
    .el-button--primary.is-disabled:focus,
    .el-button--primary.is-disabled:hover {
      color: #fff;
      background-color: darkblue;
      background-color: rgb(153, 191, 255);
      cursor: not-allowed;
      border-color: #a0cfff;
    }
   
    .form_br {
      width: 100%;
      margin-top: 16px;
      height: 1px;
      background-color: #f3f3f5;
    }
    .deviceTable {
      width: 100%;
    }
    .form_pg {
      height: 65px;
      padding-bottom: 24px;
      margin-top: 24px;
      margin-right: 0;
    }
 
  }
}
</style>
