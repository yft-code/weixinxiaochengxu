<template>
    <div class="wrapper" >
        <div class="search-con">
            <el-row v-for="(row, index) in condition" :key="index" :gutter="50">

                <el-col v-for="(col, i) in row" :key="i" :span="Math.floor(24 / column)">
                    <div class="condition-item">
                        <span class="item-label" :style="{ width: col.labelWidth + 'px' }">{{ col.label + ':' }}</span>
                        <el-input v-if="col.type === 'input'" :placeholder="col.placeholder ? col.placeholder : '请输入'" v-model="col[col.name]" :style="{ width: `calc(100% - ${ col.labelWidth ? col.labelWidth: 80 }px)`}"></el-input>

                        <el-select v-if="col.type === 'select'" :placeholder="col.placeholder ? col.placeholder : '请选择'" v-model="col[col.name]" 
                        :style="{ width: `calc(100% - ${ col.labelWidth ? col.labelWidth: 80 }px)`}" @change="col.change">
                            <el-option
                                v-for="(item, optIndex) in col.options"
                                :key="optIndex"
                                :label="col.labelName ? item[col.labelName] : item.label"
                                :value="col.valueName ? item[col.valueName] : item.value">
                            </el-option>
                        </el-select>
                        <div v-if="col.type === 'double-select'" class="double-select" :style="{ width: `calc(100% - ${ col.labelWidth ? col.labelWidth: 80 }px)`}">
                            <el-select :placeholder="col.placeholder ? col.placeholder : '请选择'" v-model="col[col.name1]" class="double-first">
                                <el-option
                                    v-for="(item, optIndex) in col.options1"
                                    :key="optIndex"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select :placeholder="col.placeholder ? col.placeholder : '请选择'" v-model="col[col.name2]">
                                <el-option
                                    v-for="(item, optIndex) in col.options2"
                                    :key="optIndex"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>

                        <el-date-picker
                            :style="{ width: `calc(100% - ${ col.labelWidth ? col.labelWidth: 80 }px)`}"
                            v-if="col.type === 'date'"
                            v-model="col[col.name]"
                            type="date"
                            value-format="YYYY-MM-DD"
                            :placeholder="col.placeholder ? col.placeholder : '请选择日期'">
                        </el-date-picker>

                        <el-date-picker
                            :style="{ width: `calc(100% - ${ col.labelWidth ? col.labelWidth: 80 }px)`}"
                            v-if="col.type === 'daterange'"
                            v-model="col[col.name]"
                            type="daterange"
                            value-format="YYYY-MM-DD"
                            range-separator="-"
                            :start-placeholder="col.startPlaceHolder ? col.startPlaceHolder : '开始日期'"
                            :end-placeholder="col.endPlaceHolder ? col.endPlaceHolder : '结束日期'"
                        ></el-date-picker>

                        <el-date-picker
                            :style="{ width: `calc(100% - ${ col.labelWidth ? col.labelWidth: 80 }px)`}"
                            v-if="col.type === 'datetimerange'"
                            v-model="col[col.name]"
                            type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            range-separator="-"
                            :start-placeholder="col.startPlaceHolder ? col.startPlaceHolder : '开始时间'"
                            :end-placeholder="col.endPlaceHolder ? col.endPlaceHolder : '结束时间'"
                        ></el-date-picker>
                    </div>
                </el-col>

                <el-col v-if="index + 1 === condition.length && row.length !== column" :span="buttonSpan" class="btn-style">
                    <el-button
                        v-for="(button, index) in buttonList"
                        :key="index"
                        :type="button.type"
                        @click="button.handler"
                    >{{ button.name }}</el-button>
                </el-col>
            </el-row>

            <!--处理刚好有4个查询条件的情况-->
            <el-row v-if="condition[condition.length - 1].length === column">
                <el-col :span="buttonSpan" class="btn-style-with-four">
                    <el-button
                        v-for="(button, index) in buttonList"
                        :key="index"
                        :type="button.type"
                        @click="button.handler"
                    >{{ button.name }}</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SearchCondition',
        props: {
            conditionList: {
                type: Array,
                default: () => []
            },
            column: {
                type: Number,
                default: 4
            },
            buttons: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
              condition: [],
              buttonSpan: 0,
              buttonList: []
            }
        },
        mounted() {
          this.buttonSpan = Math.floor(24 / this.column)
          this.buttonList = this.buttons.length > 0 ? this.buttons : [
            {
              type: 'primary',
              name: '查询',
              handler: this.search
            },
            {
              type: 'default',
              name: '重置',
              handler: this.reset
            }
          ]
        },
        watch : {
          conditionList: {
            handler: (val) => {
              if (val && val.length) {
                for (const item of val) {
                  item[item.name] = item.default || ''
                }

                let index = 0
                this.condition.splice(0)
                while(index < val.length) {
                  this.condition.push(val.slice(index, index + this.column))
                  index += this.column
                }
                // 处理按钮所占比例
                this.buttonSpan = (this.column - (val.length % this.column)) * (Math.floor(24 / this.column))
              }
            },
            immediate: true
          }
        },
        methods: {
            search() {
              const params = {}
              for (const row of this.condition) {
                for (const col of row) {
                  params[col.name] = col[col.name]
                }
              }
              this.$emit('search', params)
            },
            reset() {
              for (const row of this.condition) {
                for (const col of row) {
                  col[col.name] = ''
                }
              }
              this.$emit('reset')
            }
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        width: calc(100% - 40px);
        border-radius: 5px;
        background-color: #fff;
        padding: 20px;
        .el-row {
            margin-bottom: 10px;
        }
        .condition-item {
            display: flex;
            .item-label {
                display: inline-block;
                width: 80px;
                font-size: 13px;
                color: #333333;
                position: relative;
                top: 6px;
            }
            /*
            .el-select {
                width: 100%;
            }
            .el-input {
                width: 100%;
            }*/
        }
        .double-select {
            display: flex;
            .double-first {
                margin-right: 10px;
            }
        }
        .btn-style {
            display: flex;
            justify-content: flex-start
        }
        .btn-style-with-four {
            display: flex;
            justify-content: flex-end;
        }
    }
</style>
