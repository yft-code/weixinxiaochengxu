<template>
  <div>
    <!-- 控制对应控件列的显隐 -->
    <el-popover
      v-model="isShow"
      :width="width"
      trigger="click"
      :placement="placement"
    >
      <div>
        <span>自定义列</span>
        <div class="custom-radio-box">
          <el-radio-group v-model="defaultRadio" @change="handleRadioSelect">
            <template v-for="(item, index) in radioArr">
              <el-radio :key="`${item.label}${index}`" :label="item.label">{{
                item.title
              }}</el-radio>
            </template>
          </el-radio-group>
        </div>
      </div>
      <el-divider />
      <div class="custom-content-checkbox">
        <div>
          <el-checkbox-group
            v-model="checkedTableColumns"
            :min="1"
            @change="setCustomArr"
          >
            <el-row>
              <el-col
                v-for="(item, index) in tableColumns"
                :key="index"
                :sm="24"
                :md="8"
              >
                <!-- fixShow：是否固定永远显示的列  -->
                <el-checkbox v-show="!item.fixShow" :label="item.prop">
                  {{ item.label == "#" ? "行号列" : item.label }}
                </el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>
      </div>
      <el-button
        slot="reference"
        :type="isShow ? 'primary' : ''"
        class="custom-button"
      >
        <span class="custom-button-span">{{ title }}</span>
      </el-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: "LzCustomheader",
  props: {
    // 自定义列数组
    tableColumns: {
      type: Array,
      default: () => [],
    },
    // radioArr 类型
    radioArr: {
      type: Array,
      default: () => [
        {
          label: "default",
          title: "默认列",
        },
        {
          label: "all",
          title: "全选",
        },
        {
          label: "none",
          title: "全不选",
        },
      ],
    },
    // 默认的选中类型
    defaultRadioInfo: {
      type: String,
      default: "default",
    },
    // 按钮的title名称
    title: {
      type: String,
      default: "自定义列",
    },
    // 重置为默认项
    resetDefault: {
      type: Boolean,
      default: false,
    },
    // popover的宽度
    width: {
      type: Number,
      default: 500,
    },
    // popover的弹出方向
    placement: {
      type: String,
      default: "right-start",
    },
  },
  data() {
    return {
      // 记录临时选中的列
      bindTableColumns: [],
      // 选中框的列
      checkedTableColumns: [],
      // 默认的选中类型
      defaultRadio: "",
      // 控制显示隐藏
      isShow: false,
    };
  },
  watch: {
    // 重置为默认项
    resetDefault(val) {
      if (val) {
        this.defaultRadio = "default";
        this.handleRadioSelect(this.defaultRadio);
        this.$emit("reset-finish");
      }
    },
  },
  mounted() {
    this.defaultRadio = this.defaultRadioInfo;
    this.handleRadioSelect(this.defaultRadio);
  },
  methods: {
    setCustomArr(arr) {
      this.checkedTableColumns = arr;
      // table列
      const columns = this.tableColumns;
      const arrInfo = [];
      for (const item of columns) {
        if (item.fixShow) {
          arrInfo.push({ ...item });
        } else {
          for (const info of arr) {
            if (item.prop === info) {
              arrInfo.push({ ...item });
            }
          }
        }
      }
      this.bindTableColumns = arrInfo;
      this.$emit("getColumns", this.bindTableColumns);
    },
    handleRadioSelect(e) {
      if (e === "all") {
        // 全选
        this.checkedTableColumns = this.tableColumns.map(
          (column) => column.prop
        );
        this.bindTableColumns = this.tableColumns;
        this.$emit("getColumns", this.bindTableColumns);
      } else if (e === "none") {
        // 全不选 保留固定选项
        this.checkedTableColumns = [];
        this.bindTableColumns = this.tableColumns.filter(
          (column) => column.fixShow
        );
        this.$emit("getColumns", this.bindTableColumns);
      } else if (e === "default") {
        // 根据show显示隐藏
        this.bindTableColumns = this.tableColumns.filter(
          (column) => column.show
        );
        this.checkedTableColumns = this.bindTableColumns.map(
          (column) => column.prop
        );
        this.$emit("getColumns", this.bindTableColumns);
      }
    },
  },
};
</script>

<style scoped>
.el-divider--horizontal {
  margin: 10px 0;
}
.el-checkbox {
  margin-bottom: 5px;
}
.custom-radio-box {
  float: right;
}
</style>
