<template>
  <div class="algorithm_update">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="600px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="edit_input">
        <div class="input_container">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="150px"
            class="demo-ruleForm"
            size="mini"
          >
            <el-form-item label="预警等级名称" prop="name">
              <el-input
                style="width: 252px"
                maxlength="100"
                placeholder="请输入预警等级名称"
                v-model="ruleForm.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="预警权重" prop="order">
              <el-input
                style="width: 252px"
                maxlength="4"
                placeholder="请输入预警权重"
                v-model.number="ruleForm.order"
              ></el-input>
            </el-form-item>
            <el-form-item
              style="position: relative"
              label="预警色"
              prop="color"
            >
              <el-color-picker
                v-model="ruleForm.color"
                show-alpha
              ></el-color-picker>
              <span style="position: absolute; top: 0px; left: 40px">{{
                colorRgbaToHex(ruleForm.color)
              }}</span>
            </el-form-item>
            <el-form-item label="预警等级说明" prop="comment">
              <el-input
                maxlength="1000"
                style="width: 252px"
                type="textarea"
                placeholder="请输入预警等级说明,描述此类事件处理指引"
                v-model="ruleForm.comment"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button
          size="mini"
          :type="primary"
          @click="submit('ruleForm')"
          :loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/ai/warningManage";
import { levelSave, levelUpdate, levelInfo } from "@/api/ai/warningManage";
export default {
  name: "edit",
  props: {
    primary: {},
    editbutton: {},
    row: {},
    control: {},
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {},
    type: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      colorOpacity: {
        100: "ff",
        99: "fc",
        98: "fa",
        97: "f7",
        96: "f5",
        95: "f2",
        94: "f0",
        93: "ed",
        92: "eb",
        91: "e8",
        90: "e6",
        89: "e3",
        88: "e0",
        87: "de",
        86: "db",
        85: "d9",
        84: "d6",
        83: "d4",
        82: "d1",
        81: "cf",
        80: "cc",
        79: "c9",
        78: "c7",
        77: "c4",
        76: "c2",
        75: "bf",
        74: "bd",
        73: "ba",
        72: "b8",
        71: "b5",
        70: "b3",
        69: "b0",
        68: "ad",
        67: "ab",
        66: "a8",
        65: "a6",
        64: "a3",
        63: "a1",
        62: "9e",
        61: "9c",
        60: "99",
        59: "96",
        58: "94",
        57: "91",
        56: "8f",
        55: "8c",
        54: "8a",
        53: "87",
        52: "85",
        51: "82",
        50: "80",
        49: "7d",
        48: "7a",
        47: "78",
        46: "75",
        45: "73",
        44: "70",
        43: "6e",
        42: "6b",
        41: "69",
        40: "66",
        39: "63",
        38: "61",
        37: "5e",
        36: "5c",
        35: "59",
        34: "57",
        33: "54",
        32: "52",
        31: "4f",
        30: "4d",
        29: "4a",
        28: "47",
        27: "45",
        26: "42",
        25: "40",
        24: "3d",
        23: "3b",
        22: "38",
        21: "36",
        20: "33",
        19: "30",
        18: "2e",
        17: "2b",
        16: "29",
        15: "26",
        14: "24",
        13: "21",
        12: "1f",
        11: "1c",
        10: "1a",
        9: "17",
        8: "14",
        7: "12",
        6: "0f",
        5: "0d",
        4: "0a",
        3: "08",
        2: "05",
        1: "03",
        0: "00",
      },
      loading: false,
      ruleForm: {
        name: "",
        order: "",
        color: "",
        comment: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入预警等级名称", trigger: "blur" },
          // { max:50, message: '预警名称最多输入50个字符', trigger: 'blur' },
          // {
          //   pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
          //   message:'预警名称不能包含特殊字符',
          // },
        ],
        order: [
          { required: true, message: "预警权重不能为空", trigger: "blur" },
          { pattern: /^\+?[0-9]\d*$/, message: "请输入0~9999的正整数" },
        ],
        color: [
          { required: true, message: "预警色不能为空", trigger: "change" },
        ],
        comment: [
          { required: false, message: "预警等级说明不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    visible() {
      if (this.type === "edit") {
        this.ruleForm = this.row;
      } else {
        this.ruleForm = {
          name: "",
          order: "",
          color: "",
          comment: "",
        };
      }
    },
  },
  created() {},
  methods: {
    colorRgbaToHex(color) {
      let that = color;
      // 如果是rgba颜色表示
      if (/^(rgba|RGBA)/.test(that)) {
        let aColor = that.replace(/(?:\(|\)|rgba|RGBA)*/g, "").split(",");
        let opacity = aColor.pop();
        let opacityHax = !isNaN(opacity)
          ? this.colorOpacity[Number(opacity) * 100]
          : "";

        let strHex = "#";
        for (let i = 0; i < aColor.length; i++) {
          let hex = Number(aColor[i]).toString(16);
          if (hex.length < 2) {
            hex = "0" + hex;
          }
          strHex += hex;
        }
        strHex = strHex + opacityHax;
        if (strHex.length !== 9) {
          strHex = that;
        }
        return strHex;
      }
      return that;
    },
    // 关闭弹框
    handleClose() {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      this.$emit("close-callback");
    },
    handleClose1() {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      this.$emit("close-callback1");
    },
    // 确定
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === "add") {
            const params = {
              name: this.ruleForm.name,
              order: this.ruleForm.order,
              color: this.colorRgbaToHex(this.ruleForm.color),
              comment: this.ruleForm.comment,
            };
            levelSave(params).then((res) => {
              this.handleClose1();
              this.$message({
                message: "添加成功",
                type: "success",
              });
            });
          } else {
            const params = {
              id: this.ruleForm.id,
              name: this.ruleForm.name,
              order: this.ruleForm.order,
              color: this.colorRgbaToHex(this.ruleForm.color),
              comment: this.ruleForm.comment,
            };
            levelUpdate(params).then((res) => {
              this.handleClose1();
              this.$message({
                message: "编辑成功",
                type: "success",
              });
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-color-picker__trigger {
  padding: 0;
  border: 0px solid #e6e6e6;
}
/deep/ .el-color-picker__icon {
  display: none;
}
/deep/ .el-color-picker__color {
  border: 0px solid #e6e6e6;
}
.algorithm_update {
  ::v-deep.el-dialog__body {
    // border-bottom: 1px solid  rgba(10, 25, 51, 0.05);
  }
  /deep/.el-form-item__label {
    font-weight: 400;
    font-size: 14px;
    color: #0a1933;
  }
  .edit_input {
    width: 99%;
    // margin-top: -30px;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
  }
  .input_container {
    width: 66%;
    margin: 10px auto;
  }
  ::v-deep .el-dialog__title {
    color: #0a1933;
    // line-height: 60px;
    font-weight: 550;
  }
  .input_border {
    width: 99%;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
    // margin: -50px auto;
    margin-bottom: 20px;
  }
  .box_check {
    ::v-deep .el-radio__inner {
      border-radius: 0;
    }
  }
}
</style>
