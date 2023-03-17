<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
        <div class="notityTitle" @click="back">
          <img
            width="28"
            style="padding-top: -20PX"
            src="@/assets/img/ai/back.png"
            alt=""
          />
          &nbsp;返回时间模板
        </div>
        <!-- 查看模板详情 -->
        <div class="checkContainer" v-if="!addShown" v-loading="loading">
          <div class="checkContent">
            <div style="display: flex">
              <div class="modeTitle">模板名称</div>
              <div class="modelContent">{{ nameForm.title }}</div>
            </div>
            <div style="display: flex; margin-top: 24PX">
              <div class="modeTitle">时间范围</div>
              <div>
                <div class="modelContent">
                  星期一:
                  <span v-for="item in tips" :key="item">
                     {{item}},
                  </span>
                </div>
                <div class="modelTime">
                  星期二:<span v-for="item in  timeListsTwo" :key="item">
                     {{item}},
                  </span>
                 
                </div>
                <div class="modelTime">
                  星期三:<span v-for="item in  timeListsThree" :key="item">
                     {{item}},
                  </span>
                </div>
                <div class="modelTime">
                  星期四:<span v-for="item in  timeListsFour" :key="item">
                     {{item}},
                  </span>
                </div>
                <div class="modelTime">
                  星期五:<span v-for="item in  timeListsFive" :key="item">
                     {{item}},
                  </span>
                </div>
                <div class="modelTime">
                  星期六:<span v-for="item in  timeListsSix" :key="item">
                     {{item}},
                  </span>
                </div>
                <div class="modelTime">
                  星期七:<span v-for="item in  timeListsSeven" :key="item">
                     {{item}},
                  </span>
                </div>
              </div>
            </div>
            <div style="display: flex; margin-top: 24PX">
              <div class="modeTitle">模板说明</div>
              <div>
                <div class="modelContent">
                  {{ descForm.desc ? descForm.desc : "--" }}
                </div>
                <div class="btnGroup">
                  <el-button size="small" @click="edit">编辑</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 添加和编辑 -->
        <div v-if="addShown" style="width:80%;margin:0 auto;margin-top: 60px;">
          <div>
            <el-form :model="nameForm" label-width="80px" ref="nameForm" class="demo-ruleForm">
                  <el-form-item
                    label="模板名称"
                    prop="title"
                    :rules="[
                      { required: true, message: '模板名称不能为空' },
                      {
                        max: 10,
                        message: '模板名称长度不能超过10',
                      },
                      { validator: validateName, trigger: ['blur'] },
                    ]"
                  >
                    <el-input
                      v-model="nameForm.title"
                      placeholder="请输入模板名称"
                    ></el-input>
                  </el-form-item>
                  <!-- <el-form-item
                    label="操作提示"
                  >
                  点击向右滑动为选中，反之取消
                  </el-form-item> -->
                </el-form>
          </div>
          <div>
    <div class="tipss">
          操作提示：点击向右滑动为选中，反之取消。
    </div>
          </div>
           <!-- 周一 -->
    <div class="hours-container">
      <div class="week-name">星期一</div>
      <div v-for="(item, index) in hours"
           :key="index"
           class="hours-item">
        <div class="hours-item-value"
             style="border-right:1px solid #ccc">
          <div :class="compClass(12 * item)"
               @click="handleClick(12 * item)"
               @mouseover="handleHover(12 * item)"></div>
          <div :class="compClass(12 * item + 1)"
               @click="handleClick(12 * item + 1)"
               @mouseover="handleHover(12 * item + 1)"></div>
          <div :class="compClass(12 * item + 2)"
               @click="handleClick(12 * item + 2)"
               @mouseover="handleHover(12 * item + 2)"></div>
          <div :class="compClass(12 * item + 3)"
               @click="handleClick(12 * item + 3)"
               @mouseover="handleHover(12 * item + 3)"></div>
          <div :class="compClass(12 * item + 4)"
               @click="handleClick(12 * item + 4)"
               @mouseover="handleHover(12 * item + 4)"></div>
          <div :class="compClass(12 * item + 5)"
               @click="handleClick(12 * item + 5)"
               @mouseover="handleHover(12 * item + 5)"></div>
          <div :class="compClass(12 * item + 6)"
               @click="handleClick(12 * item + 6)"
               @mouseover="handleHover(12 * item + 6)"></div>
          <div :class="compClass(12 * item + 7)"
               @click="handleClick(12 * item + 7)"
               @mouseover="handleHover(12 * item + 7)"></div>
          <div :class="compClass(12 * item + 8)"
               @click="handleClick(12 * item + 8)"
               @mouseover="handleHover(12 * item + 8)"></div>
          <div :class="compClass(12 * item + 9)"
               @click="handleClick(12 * item + 9)"
               @mouseover="handleHover(12 * item + 9)"></div>
          <div :class="compClass(12 * item + 10)"
               @click="handleClick(12 * item + 10)"
               @mouseover="handleHover(12 * item + 10)"></div>
          <div :class="compClass(12 * item + 11)"
               @click="handleClick(12 * item + 11)"
               @mouseover="handleHover(12 * item + 11)"></div>
        </div>
        <div class="hours-item-header">
          <span v-if="index%2 === 0">{{ timeHours[index] }}</span>
        </div>
      </div>
    </div>
   <!-- 周二 -->
    <div class="hours-container">
      <div class="week-name">星期二</div>
      <div v-for="(item, index) in hours"
           :key="index"
           class="hours-item">
        <div class="hours-item-value"
             style="border-right:1px solid #ccc">
          <div :class="compClassTwo(12 * item)"
               @click="handleClickTwo(12 * item)"
               @mouseover="handleHoverTwo(12 * item)"></div>
          <div :class="compClassTwo(12 * item + 1)"
               @click="handleClickTwo(12 * item + 1)"
               @mouseover="handleHoverTwo(12 * item + 1)"></div>
          <div :class="compClassTwo(12 * item + 2)"
               @click="handleClickTwo(12 * item + 2)"
               @mouseover="handleHoverTwo(12 * item + 2)"></div>
          <div :class="compClassTwo(12 * item + 3)"
               @click="handleClickTwo(12 * item + 3)"
               @mouseover="handleHoverTwo(12 * item + 3)"></div>
          <div :class="compClassTwo(12 * item + 4)"
               @click="handleClickTwo(12 * item + 4)"
               @mouseover="handleHoverTwo(12 * item + 4)"></div>
          <div :class="compClassTwo(12 * item + 5)"
               @click="handleClickTwo(12 * item + 5)"
               @mouseover="handleHoverTwo(12 * item + 5)"></div>
          <div :class="compClassTwo(12 * item + 6)"
               @click="handleClickTwo(12 * item + 6)"
               @mouseover="handleHoverTwo(12 * item + 6)"></div>
          <div :class="compClassTwo(12 * item + 7)"
               @click="handleClickTwo(12 * item + 7)"
               @mouseover="handleHoverTwo(12 * item + 7)"></div>
          <div :class="compClassTwo(12 * item + 8)"
               @click="handleClickTwo(12 * item + 8)"
               @mouseover="handleHoverTwo(12 * item + 8)"></div>
          <div :class="compClassTwo(12 * item + 9)"
               @click="handleClickTwo(12 * item + 9)"
               @mouseover="handleHoverTwo(12 * item + 9)"></div>
          <div :class="compClassTwo(12 * item + 10)"
               @click="handleClickTwo(12 * item + 10)"
               @mouseover="handleHoverTwo(12 * item + 10)"></div>
          <div :class="compClassTwo(12 * item + 11)"
               @click="handleClickTwo(12 * item + 11)"
               @mouseover="handleHoverTwo(12 * item + 11)"></div>
        </div>
        <div class="hours-item-header">
          <span v-if="index%2 === 0">{{ timeHours[index] }}</span>
        </div>
      </div>
    </div>
    <!-- 周三 -->
    <div class="hours-container">
      <div class="week-name">星期三</div>
      <div v-for="(item, index) in hours"
           :key="index"
           class="hours-item">
        <div class="hours-item-value"
             style="border-right:1px solid #ccc">
          <div :class="compClassThree(12 * item)"
               @click="handleClickThree(12 * item)"
               @mouseover="handleHoverThree(12 * item)"></div>
          <div :class="compClassThree(12 * item + 1)"
               @click="handleClickThree(12 * item + 1)"
               @mouseover="handleHoverThree(12 * item + 1)"></div>
          <div :class="compClassThree(12 * item + 2)"
               @click="handleClickThree(12 * item + 2)"
               @mouseover="handleHoverThree(12 * item + 2)"></div>
          <div :class="compClassThree(12 * item + 3)"
               @click="handleClickThree(12 * item + 3)"
               @mouseover="handleHoverThree(12 * item + 3)"></div>
          <div :class="compClassThree(12 * item + 4)"
               @click="handleClickThree(12 * item + 4)"
               @mouseover="handleHoverThree(12 * item + 4)"></div>
          <div :class="compClassThree(12 * item + 5)"
               @click="handleClickThree(12 * item + 5)"
               @mouseover="handleHoverThree(12 * item + 5)"></div>
          <div :class="compClassThree(12 * item + 6)"
               @click="handleClickThree(12 * item + 6)"
               @mouseover="handleHoverThree(12 * item + 6)"></div>
          <div :class="compClassThree(12 * item + 7)"
               @click="handleClickThree(12 * item + 7)"
               @mouseover="handleHoverThree(12 * item + 7)"></div>
          <div :class="compClassThree(12 * item + 8)"
               @click="handleClickThree(12 * item + 8)"
               @mouseover="handleHoverThree(12 * item + 8)"></div>
          <div :class="compClassThree(12 * item + 9)"
               @click="handleClickThree(12 * item + 9)"
               @mouseover="handleHoverThree(12 * item + 9)"></div>
          <div :class="compClassThree(12 * item + 10)"
               @click="handleClickThree(12 * item + 10)"
               @mouseover="handleHoverThree(12 * item + 10)"></div>
          <div :class="compClassThree(12 * item + 11)"
               @click="handleClickThree(12 * item + 11)"
               @mouseover="handleHoverThree(12 * item + 11)"></div>
        </div>
        <div class="hours-item-header">
          <span v-if="index%2 === 0">{{ timeHours[index] }}</span>
        </div>
      </div>
    </div>
    <!-- 周四 -->
    <div class="hours-container">
      <div class="week-name">星期四</div>
      <div v-for="(item, index) in hours"
           :key="index"
           class="hours-item">
        <div class="hours-item-value"
             style="border-right:1px solid #ccc">
          <div :class="compClassFour(12 * item)"
               @click="handleClickFour(12 * item)"
               @mouseover="handleHoverFour(12 * item)"></div>
          <div :class="compClassFour(12 * item + 1)"
               @click="handleClickFour(12 * item + 1)"
               @mouseover="handleHoverFour(12 * item + 1)"></div>
          <div :class="compClassFour(12 * item + 2)"
               @click="handleClickFour(12 * item + 2)"
               @mouseover="handleHoverFour(12 * item + 2)"></div>
          <div :class="compClassFour(12 * item + 3)"
               @click="handleClickFour(12 * item + 3)"
               @mouseover="handleHoverFour(12 * item + 3)"></div>
          <div :class="compClassFour(12 * item + 4)"
               @click="handleClickFour(12 * item + 4)"
               @mouseover="handleHoverFour(12 * item + 4)"></div>
          <div :class="compClassFour(12 * item + 5)"
               @click="handleClickFour(12 * item + 5)"
               @mouseover="handleHoverFour(12 * item + 5)"></div>
          <div :class="compClassFour(12 * item + 6)"
               @click="handleClickFour(12 * item + 6)"
               @mouseover="handleHoverFour(12 * item + 6)"></div>
          <div :class="compClassFour(12 * item + 7)"
               @click="handleClickFour(12 * item + 7)"
               @mouseover="handleHoverFour(12 * item + 7)"></div>
          <div :class="compClassFour(12 * item + 8)"
               @click="handleClickFour(12 * item + 8)"
               @mouseover="handleHoverFour(12 * item + 8)"></div>
          <div :class="compClassFour(12 * item + 9)"
               @click="handleClickFour(12 * item + 9)"
               @mouseover="handleHoverFour(12 * item + 9)"></div>
          <div :class="compClassFour(12 * item + 10)"
               @click="handleClickFour(12 * item + 10)"
               @mouseover="handleHoverFour(12 * item + 10)"></div>
          <div :class="compClassFour(12 * item + 11)"
               @click="handleClickFour(12 * item + 11)"
               @mouseover="handleHoverFour(12 * item + 11)"></div>
        </div>
        <div class="hours-item-header">
          <span v-if="index%2 === 0">{{ timeHours[index] }}</span>
        </div>
      </div>
    </div>
    <!-- 周五 -->
    <div class="hours-container">
      <div class="week-name">星期五</div>
      <div v-for="(item, index) in hours"
           :key="index"
           class="hours-item">
        <div class="hours-item-value"
             style="border-right:1px solid #ccc">
          <div :class="compClassFive(12 * item)"
               @click="handleClickFive(12 * item)"
               @mouseover="handleHoverFive(12 * item)"></div>
          <div :class="compClassFive(12 * item + 1)"
               @click="handleClickFive(12 * item + 1)"
               @mouseover="handleHoverFive(12 * item + 1)"></div>
          <div :class="compClassFive(12 * item + 2)"
               @click="handleClickFive(12 * item + 2)"
               @mouseover="handleHoverFive(12 * item + 2)"></div>
          <div :class="compClassFive(12 * item + 3)"
               @click="handleClickFive(12 * item + 3)"
               @mouseover="handleHoverFive(12 * item + 3)"></div>
          <div :class="compClassFive(12 * item + 4)"
               @click="handleClickFive(12 * item + 4)"
               @mouseover="handleHoverFive(12 * item + 4)"></div>
          <div :class="compClassFive(12 * item + 5)"
               @click="handleClickFive(12 * item + 5)"
               @mouseover="handleHoverFive(12 * item + 5)"></div>
          <div :class="compClassFive(12 * item + 6)"
               @click="handleClickFive(12 * item + 6)"
               @mouseover="handleHoverFive(12 * item + 6)"></div>
          <div :class="compClassFive(12 * item + 7)"
               @click="handleClickFive(12 * item + 7)"
               @mouseover="handleHoverFive(12 * item + 7)"></div>
          <div :class="compClassFive(12 * item + 8)"
               @click="handleClickFive(12 * item + 8)"
               @mouseover="handleHoverFive(12 * item + 8)"></div>
          <div :class="compClassFive(12 * item + 9)"
               @click="handleClickFive(12 * item + 9)"
               @mouseover="handleHoverFive(12 * item + 9)"></div>
          <div :class="compClassFive(12 * item + 10)"
               @click="handleClickFive(12 * item + 10)"
               @mouseover="handleHoverFive(12 * item + 10)"></div>
          <div :class="compClassFive(12 * item + 11)"
               @click="handleClickFive(12 * item + 11)"
               @mouseover="handleHoverFive(12 * item + 11)"></div>
        </div>
        <div class="hours-item-header">
          <span v-if="index%2 === 0">{{ timeHours[index] }}</span>
        </div>
      </div>
    </div>
    <!-- 周六 -->
    <div class="hours-container">
      <div class="week-name">星期六</div>
      <div v-for="(item, index) in hours"
           :key="index"
           class="hours-item">
        <div class="hours-item-value"
             style="border-right:1px solid #ccc">
          <div :class="compClassSix(12 * item)"
               @click="handleClickSix(12 * item)"
               @mouseover="handleHoverSix(12 * item)"></div>
          <div :class="compClassSix(12 * item + 1)"
               @click="handleClickSix(12 * item + 1)"
               @mouseover="handleHoverSix(12 * item + 1)"></div>
          <div :class="compClassSix(12 * item + 2)"
               @click="handleClickSix(12 * item + 2)"
               @mouseover="handleHoverSix(12 * item + 2)"></div>
          <div :class="compClassSix(12 * item + 3)"
               @click="handleClickSix(12 * item + 3)"
               @mouseover="handleHoverSix(12 * item + 3)"></div>
          <div :class="compClassSix(12 * item + 4)"
               @click="handleClickSix(12 * item + 4)"
               @mouseover="handleHoverSix(12 * item + 4)"></div>
          <div :class="compClassSix(12 * item + 5)"
               @click="handleClickSix(12 * item + 5)"
               @mouseover="handleHoverSix(12 * item + 5)"></div>
          <div :class="compClassSix(12 * item + 6)"
               @click="handleClickSix(12 * item + 6)"
               @mouseover="handleHoverSix(12 * item + 6)"></div>
          <div :class="compClassSix(12 * item + 7)"
               @click="handleClickSix(12 * item + 7)"
               @mouseover="handleHoverSix(12 * item + 7)"></div>
          <div :class="compClassSix(12 * item + 8)"
               @click="handleClickSix(12 * item + 8)"
               @mouseover="handleHoverSix(12 * item + 8)"></div>
          <div :class="compClassSix(12 * item + 9)"
               @click="handleClickSix(12 * item + 9)"
               @mouseover="handleHoverSix(12 * item + 9)"></div>
          <div :class="compClassSix(12 * item + 10)"
               @click="handleClickSix(12 * item + 10)"
               @mouseover="handleHoverSix(12 * item + 10)"></div>
          <div :class="compClassSix(12 * item + 11)"
               @click="handleClickSix(12 * item + 11)"
               @mouseover="handleHoverSix(12 * item + 11)"></div>
        </div>
         <div class="hours-item-header">
          <span v-if="index%2 === 0">{{ timeHours[index] }}</span>
        </div> 
      </div>
    </div>
    <!-- 周日 -->
    <div class="hours-container">
      <div class="week-name">星期日</div>
      <div v-for="(item, index) in hours"
           :key="index"
           class="hours-item">
        <div class="hours-item-value"
             style="border-right:1px solid #ccc">
          <div :class="compClassSeven(12 * item)"
               @click="handleClickSeven(12 * item)"
               @mouseover="handleHoverSeven(12 * item)"></div>
          <div :class="compClassSeven(12 * item + 1)"
               @click="handleClickSeven(12 * item + 1)"
               @mouseover="handleHoverSeven(12 * item + 1)"></div>
          <div :class="compClassSeven(12 * item + 2)"
               @click="handleClickSeven(12 * item + 2)"
               @mouseover="handleHoverSeven(12 * item + 2)"></div>
          <div :class="compClassSeven(12 * item + 3)"
               @click="handleClickSeven(12 * item + 3)"
               @mouseover="handleHoverSeven(12 * item + 3)"></div>
          <div :class="compClassSeven(12 * item + 4)"
               @click="handleClickSeven(12 * item + 4)"
               @mouseover="handleHoverSeven(12 * item + 4)"></div>
          <div :class="compClassSeven(12 * item + 5)"
               @click="handleClickSeven(12 * item + 5)"
               @mouseover="handleHoverSeven(12 * item + 5)"></div>
          <div :class="compClassSeven(12 * item + 6)"
               @click="handleClickSeven(12 * item + 6)"
               @mouseover="handleHoverSeven(12 * item + 6)"></div>
          <div :class="compClassSeven(12 * item + 7)"
               @click="handleClickSeven(12 * item + 7)"
               @mouseover="handleHoverSeven(12 * item + 7)"></div>
          <div :class="compClassSeven(12 * item + 8)"
               @click="handleClickSeven(12 * item + 8)"
               @mouseover="handleHoverSeven(12 * item + 8)"></div>
          <div :class="compClassSeven(12 * item + 9)"
               @click="handleClickSeven(12 * item + 9)"
               @mouseover="handleHoverSeven(12 * item + 9)"></div>
          <div :class="compClassSeven(12 * item + 10)"
               @click="handleClickSeven(12 * item + 10)"
               @mouseover="handleHoverSeven(12 * item + 10)"></div>
          <div :class="compClassSeven(12 * item + 11)"
               @click="handleClickSeven(12 * item + 11)"
               @mouseover="handleHoverSeven(12 * item + 11)"></div>
        </div>
        <div class="hours-item-header">
          <span v-if="index%2 === 0">{{ timeHours[index] }}</span>
        </div>
      </div>
    </div>
    <div  class="margins"><span class="tipss">周一已选时间段：</span>
      <span v-if="tips&&tips.length>0">
        <span class=""
            style="color:#1890ff"
            v-for="(items,index) in tips"
            :key="index">{{ items.replace("24:00","23:59:59")}},</span>
      </span>
      
            <span v-else class="fontw times"
            style="color:#1890ff">00:00-00-00</span>
    </div>
<div  class="margins"><span class="tipss">周二已选时间段：</span>
  <span v-if="timeListsTwo&&timeListsTwo.length>0">
    <span class="fontw times"
            style="color:#1890ff"
            v-for="(items,index) in timeListsTwo"
            :key="index">{{ items.replace("24:00","23:59:59") }}，</span>
  </span>
    
            <span v-else class="fontw times"
            style="color:#1890ff">00:00-00-00</span>
    </div>
    <div  class="margins"><span class="tipss">周三已选时间段：</span>
      <span v-if="timeListsThree&&timeListsThree.length>0">
        <span class="fontw times"
            style="color:#1890ff"
            v-for="(items,index) in timeListsThree"
            :key="index">{{ items.replace("24:00","23:59:59") }}，</span>
      </span>
     
            <span v-else class="fontw times"
            style="color:#1890ff">00:00-00-00</span>
    </div>
    <div class="margins"><span class="tipss">周四已选时间段：</span>
      <span v-if="timeListsFour&&timeListsFour.length>0">
        <span class="fontw times"
            style="color:#1890ff"
            v-for="(items,index) in timeListsFour"
            :key="index">{{ items.replace("24:00","23:59:59") }}，</span>
      </span>
      
            <span v-else class="fontw times"
            style="color:#1890ff">00:00-00-00</span>
    </div>
    <div class="margins"><span class="tipss">周五已选时间段：</span>
      <span v-if="timeListsFive&&timeListsFive.length>0">
        <span class="fontw times"
            style="color:#1890ff"
            v-for="(items,index) in timeListsFive"
            :key="index">{{ items.replace("24:00","23:59:59") }}，</span>
      </span>
            <span v-else class="fontw times"
            style="color:#1890ff">00:00-00-00</span>
    </div>
    <div class="margins"><span class="tipss">周六已选时间段：</span>
      <span v-if="timeListsSix&&timeListsSix.length>0">
        <span class="fontw times"
            style="color:#1890ff"
            v-for="(items,index) in timeListsSix"
            :key="index">{{ items.replace("24:00","23:59:59") }}，</span>
      </span>
     
            <span v-else class="fontw times"
            style="color:#1890ff">00:00-00-00</span>
    </div>
    <div class="margins"><span class="tipss">周日已选时间段：</span>
      <span v-if="timeListsSeven&&timeListsSeven.length>0">
      <span  class="fontw times"
            style="color:#1890ff"
            v-for="(items,index) in timeListsSeven"
            :key="index">{{ items.replace("24:00","23:59:59") }},</span>
      </span>
        <span v-else class="fontw times"
            style="color:#1890ff">00:00-00-00</span>
    </div>
    <div style="margin-top:30px;">
      <el-form
      label-width="80px"
                    :model="descForm"
                    ref="descForm"
                    class="demo-ruleForm"
                  >
                    <el-form-item
                    label="模板说明"
                      prop="desc"
                      :rules="[
                        {
                          max: 100,
                          message: '模板描述长度超过100',
                          trigger: ['blur'],
                        },
                      ]"
                    >
                      <el-input
                        placeholder="请输入模板说明"
                        type="textarea"
                        v-model="descForm.desc"
                      ></el-input>
                    </el-form-item>
                  </el-form>
  
    </div>
    <div class="btnGroup">
                  <el-button size="small" @click="back">取消</el-button>
                  <el-button :loading="saveLoading" type="primary" size="small" @click="save()"
                    >保存</el-button
                  >
                </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as tapi from "@/api/ai/timeModel";
export default {
  props: {
    flag: {},
    row: {},
    addShow: {},
  },
  watch: {
    addShow: {
      handler(newVal, oldVal) {
        this.addShown = newVal;
        if (!this.addShown) {
          this.checkDetail();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      saveLoading:false,
      name: "",
      loading: true,
      descForm: {
        desc: "",
      },
      nameForm: {
        title: "",
      },
      nameMark: false,
      timeMark: false,
      descMark: false,
      addShown: false,
      editFlag: false,
      // 时间模板
      // eslint-disable-next-line vue/no-dupe-keys
      flagOne:true,
      editOne:true,
      hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      timeHours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],// 选项
      selectStart: false,// 开始
      startIndex: '0',// 开始下标
      timeRangeList: [],// 选择的时间段
      timeRangeListIndex: [0],// 选中的下标
      tempRangeIndex: [],// 预选下标
      tips:[] ,//提示操作
      endHour: '',//选择结束时间
      endMin: '',//选择结束分钟
      startHour: '',//开始时间
      startMin: '',//开始时间
      sendTimeList: [],
      arrOne:[],
      // =====周二
      editTwo:true,
      flagTwo:true,
      selectStartTwo: false,// 开始
      startIndexTwo: '0',// 开始下标
      timeRangeListTwo: [],// 选择的时间段
      timeListTwo: [0],// 选中的下标
      tempStartTwo: [],// 预选下标
      timeListsTwo: [],//提示操作
      closeHourTwo: '',//选择结束时间
      closeMinTwo: '',//选择结束分钟
      beginHourTwo: '',//开始时间
      beginMinTwo: '',//开始时间
      sendTimeLists: [],
      arrTwo:[],
      // 周三
      editThree:true,
      flagThree:true,
      selectStartThree: false,// 开始
      startIndexThree: '0',// 开始下标
      timeRangeListThree: [],// 选择的时间段
      timeListThree: [0],// 选中的下标
      tempStartThree: [],// 预选下标
      timeListsThree: [],//提示操作
      closeHourThree: '',//选择结束时间
      closeMinThree: '',//选择结束分钟
      beginHourThree: '',//开始时间
      beginMinThree: '',//开始时间
      sendTimeListThree: [],
      arrThree:[],
      // 周四  加了编辑功能
      selectStartFour: false,// 开始
      startIndexFour: '0',// 开始下标
      timeRangeListFour: [],// 选择的时间段
      timeListFour: [0],// 选中的下标
      tempStartFour: [],// 预选下标
      timeListsFour: [],//提示操作
      closeHourFour: '',//选择结束时间
      closeMinFour: '',//选择结束分钟
      beginHourFour: '',//开始时间
      beginMinFour: '',//开始时间
      sendTimeListFour: [],
      editFour:true,
      flagFour:true,
      arrFour:[],
      // 周五
      selectStartFive: false,// 开始
      startIndexFive: '0',// 开始下标
      timeRangeListFive: [],// 选择的时间段
      timeListFive: [0],// 选中的下标
      tempStartFive: [],// 预选下标
      timeListsFive: [],//提示操作
      closeHourFive: '',//选择结束时间
      closeMinFive: '',//选择结束分钟
      beginHourFive: '',//开始时间
      beginMinFive: '',//开始时间
      sendTimeListFive: [],
      editFive:true,
      flagFive:true,
      arrFive:[],
      // 周六
      selectStartSix: false,// 开始
      startIndexSix: '0',// 开始下标
      timeRangeListSix: [],// 选择的时间段
      timeListSix: [0],// 选中的下标
      tempStartSix: [],// 预选下标
      timeListsSix: [],//时间段
      closeHourSix: '',//选择结束时间
      closeMinSix: '',//选择结束分钟
      beginHourSix: '',//开始时间
      beginMinSix: '',//开始时间
      sendTimeListSix: [],
      editSix:true,
      flagSix:true,
      arrSix:[],
      // 周日
      selectStartSeven: false,// 开始
      startIndexSeven: '0',// 开始下标
      timeRangeListSeven: [],// 选择的时间段
      timeListSeven: [0],// 选中的下标
      tempStartSeven: [],// 预选下标
      timeListsSeven: [],//时间段
      closeHourSeven: '',//选择结束时间
      closeMinSeven: '',//选择结束分钟
      beginHourSeven: '',//开始时间
      beginMinSeven: '',//开始时间
      sendTimeListSeven: [],
      editSeven:true,
      flagSeven:true,
      arrSeven:[],//接收点位进行回显
      arr:[]
    };
  },
  mounted () {
    this.transformedIndex();
    this.transformedSection();
    this.transformedIndexTwo();
    this.transformedSectionTwo();
    this.transformedIndexThree();
    this.transformedSectionThree();
    this.transformedIndexFour();
    this.transformedSectionFour();
    this.transformedIndexFive();
    this.transformedSectionFive();
    this.transformedIndexSix();
    this.transformedSectionSix();
    this.transformedIndexSeven();
    this.transformedSectionSeven();
  },
  methods: {
     // 周一
    // 时间区间转换成下标区间
    transformedIndex () {
      this.timeRangeListIndex = [];
      this.timeRangeList = this.sendTimeList;
      this.timeRangeList.forEach(element => {
        const [startTime, endTime] = element.match(/\d+\\:\d+/g);
        if (startTime && endTime) {
          let [startHour, startMin] = startTime.split(':');
          let [endHour, endMin] = endTime.split(':');
          if (startHour && startMin && endHour && endMin) {
            let startNum, endNum;
            if (startMin === '00') {
              startNum = 12 * parseInt(startHour);
            } else {
              startNum = 12 * parseInt(startHour) + 1;
            }
            if (endMin === '00') {
              endNum = 12 * parseInt(endHour) - 1;
            } else {
              endNum = 12 * parseInt(endHour);
            }
            while (endNum >= startNum) {
              this.timeRangeListIndex.push(startNum);
              startNum++;
            }
          } else {
            this.$message.error("时间段格式不正确");
          }
        } else {
          this.$message.error("没有拿到开始时间或结束时间或者时间段格式不对");
        }
      });
   if(!this.editOne){
      this.tips = this.timeRangeList && this.timeRangeList.length > 0 ? this.timeRangeList : '';
   }
    },
    // 下标区间转换成时间区间
    transformedSection () {
      this.timeRangeList = [];
      // Array.from(new Set(this.timeRangeList))
      let startTime = '', endTime = '', len = this.hours.length;
      for (let index = this.hours[0] * 12; index < 12 * (len + 1); index++) {
        if (this.timeRangeListIndex.indexOf(index) > -1) {
          // 如果有开始时间，直接确定结束时间
          if (startTime) {
            // debugger
            this.endHour = Math.floor((index + 1) / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.endHour === this.startHour) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.endMin = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.endHour < 10 ? '0' + this.endHour : this.endHour}:${this.endMin}`;
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.endMin = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.endHour < 10 ? '0' + this.endHour : this.endHour}:${this.endMin}`;
            }
          } else {
            // 没有开始时间，确定当前点为开始时间
            // debugger
            this.startHour = Math.floor(index / 12);
            let startTimeAll = 5 * (index % 12) === 5 ? '05' : 5 * ((index) % 12)
            this.startMin = index % 12 === 0 ? "00" : startTimeAll;
            startTime = `${this.startHour < 10 ? '0' + this.startHour : this.startHour}:${this.startMin}`;
          }
          // 如果是最后一格，直接结束
          if (index === 12 * this.hours.length + 1) {
            endTime = `${Math.floor((index + 1) / 12)}:00`;
            this.timeRangeList.push(`${startTime ? startTime : "23:30"}-${endTime}`);
            startTime = '';
            endTime = '';
          }
        } else {
          // 若这个点不在选择区间，确定一个时间段
          if (startTime && endTime) {
            this.timeRangeList.push(`${startTime}-${endTime}`);
            startTime = '';
            endTime = '';
          } else if (startTime && !endTime) {
            // 这里可能只选半个小时
            this.endHour = Math.floor(index / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.endHour === this.startHour) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.endMin = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.endHour < 10 ? '0' + this.endHour : this.endHour}:${this.endMin}`;
              this.timeRangeList.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.endMin = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.endHour < 10 ? '0' + this.endHour : this.endHour}:${this.endMin}`;
              this.timeRangeList.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            }
          }
        }
      }
      if(!this.editOne){
      this.tips = this.timeRangeList && this.timeRangeList.length > 0 ? this.timeRangeList : '';
   }
    },
    // 点击事件
    handleClick (index) {
      this.editOne=false
      if (this.selectStart) {
        // 双击取反
        if (index === this.startIndex) {
          if (this.timeRangeListIndex.indexOf(index) > -1) {
            this.timeRangeListIndex.splice(this.timeRangeListIndex.indexOf(index), 1);
          } else {
            this.timeRangeListIndex.push(this.startIndex);
          }
        } else if (index > this.startIndex) {
          // 选取数据--向右添加，向左取消
          while (index >= this.startIndex) {
            this.timeRangeListIndex.push(this.startIndex);
            this.startIndex++;
          }
          this.timeRangeListIndex = Array.from(new Set(this.timeRangeListIndex));
        } else {
          // 删除数据
          while (this.startIndex >= index) {
            if (this.timeRangeListIndex.indexOf(index) > -1) {
              this.timeRangeListIndex.splice(this.timeRangeListIndex.indexOf(index), 1);
            }
            index++;
          }
        }
        this.startIndex = '';
        this.tempRangeIndex = [];
        this.transformedSection();
      } else {
        this.startIndex = index;
      }
      this.selectStart = !this.selectStart;
    },
    // 预选区间
    handleHover (index) {
      if (this.selectStart) {
        this.tempRangeIndex = [];
        // 选取数据--向右添加，向左取消
        if (index > this.startIndex) {
          while (index >= this.startIndex) {
            this.tempRangeIndex.push(index);
            index--;
          }
        } else {
          // 删除数据
          while (this.startIndex >= index) {
            this.tempRangeIndex.push(index);
            index++;
          }
        }
      }
    },
  
    // 是否选中，计算className
    compClass (index) {
      if (index === this.startIndex) {
        return 'hours-item-left preSelected';
      }
      if (index >= this.startIndex) {
        if (this.tempRangeIndex.indexOf(index) > -1) {
          return 'hours-item-left preSelected';
        }
      } else {
        if (this.tempRangeIndex.indexOf(index) > -1) {
          return 'hours-item-left unSelected';
        }
      }
      if(this.flagOne){
        this.getNewtype(index)
      }
      return this.timeRangeListIndex.indexOf(index) > -1 ? 'hours-item-left selected' : 'hours-item-left';
    },
    getNewtype(index){
      this.timeRangeListIndex=this.arrOne
      this.flagOne=false
    },
    compItem (item) {
      // 不足10前面补0
      return item < 10 ? `0${item}` : item;
    },
    // ===周二
      // 时间区间转换成下标区间
      transformedIndexTwo () {
      this.timeListTwo = [];
      this.timeRangeListTwo = this.sendTimeLists;
      this.timeRangeListTwo.forEach(element => {
        const [startTime, endTime] = element.match(/\d+\\:\d+/g);
        if (startTime && endTime) {
          let [startHour, startMin] = startTime.split(':');
          let [endHour, endMin] = endTime.split(':');
          if (startHour && startMin && endHour && endMin) {
            let startNum, endNum;
            if (startMin === '00') {
              startNum = 12 * parseInt(startHour);
            } else {
              startNum = 12 * parseInt(startHour) + 1;
            }
            if (endMin === '00') {
              endNum = 12 * parseInt(endHour) - 1;
            } else {
              endNum = 12 * parseInt(endHour);
            }
            while (endNum >= startNum) {
              this.timeListTwo.push(startNum);
              startNum++;
            }
          } else {
            this.$message.error("时间段格式不正确");
          }
        } else {
          this.$message.error("没有拿到开始时间或结束时间或者时间段格式不对");
        }
      });
     if(!this.editTwo){
      this.timeListsTwo = this.timeRangeListTwo && this.timeRangeListTwo.length > 0 ? this.timeRangeListTwo : '';
     }
     
    },
    // 下标区间转换成时间区间
    transformedSectionTwo () {
      this.timeRangeListTwo = [];
      // Array.from(new Set(this.timeRangeListTwo))
      let startTime = '', endTime = '', len = this.hours.length;
      for (let index = this.hours[0] * 12; index < 12 * (len + 1); index++) {
        if (this.timeListTwo.indexOf(index) > -1) {
          // 如果有开始时间，直接确定结束时间
          if (startTime) {
            // debugger
            this.closeHourTwo = Math.floor((index + 1) / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourTwo === this.beginHourTwo) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinTwo = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourTwo < 10 ? '0' + this.closeHourTwo : this.closeHourTwo}:${this.closeMinTwo}`;
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinTwo = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourTwo < 10 ? '0' + this.closeHourTwo : this.closeHourTwo}:${this.closeMinTwo}`;
            }
          } else {
            // 没有开始时间，确定当前点为开始时间
            // debugger
            this.beginHourTwo = Math.floor(index / 12);
            let startTimeAll = 5 * (index % 12) === 5 ? '05' : 5 * ((index) % 12)
            this.beginMinTwo = index % 12 === 0 ? "00" : startTimeAll;
            startTime = `${this.beginHourTwo < 10 ? '0' + this.beginHourTwo : this.beginHourTwo}:${this.beginMinTwo}`;
          }
          // 如果是最后一格，直接结束
          if (index === 12 * this.hours.length + 1) {
            endTime = `${Math.floor((index + 1) / 12)}:00`;
            this.timeRangeListTwo.push(`${startTime ? startTime : "23:30"}-${endTime}`);
            startTime = '';
            endTime = '';
          }
        } else {
          // 若这个点不在选择区间，确定一个时间段
          if (startTime && endTime) {
            this.timeRangeListTwo.push(`${startTime}-${endTime}`);
            startTime = '';
            endTime = '';
          } else if (startTime && !endTime) {
            // 这里可能只选半个小时
            this.closeHourTwo = Math.floor(index / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourTwo === this.beginHourTwo) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinTwo = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourTwo < 10 ? '0' + this.closeHourTwo : this.closeHourTwo}:${this.closeMinTwo}`;
              this.timeRangeListTwo.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinTwo = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourTwo < 10 ? '0' + this.closeHourTwo : this.closeHourTwo}:${this.closeMinTwo}`;
              this.timeRangeListTwo.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            }
          }
        }
      }
      if(!this.editTwo){
      this.timeListsTwo = this.timeRangeListTwo && this.timeRangeListTwo.length > 0 ? this.timeRangeListTwo : '';
     }
    },
    // 点击事件
    handleClickTwo (index) {
      this.editTwo=false
      if (this.selectStartTwo) {
        // 双击取反
        if (index === this.Two) {
          if (this.timeListTwo.indexOf(index) > -1) {
            this.timeListTwo.splice(this.timeListTwo.indexOf(index), 1);
          } else {
            this.timeListTwo.push(this.Two);
          }
        } else if (index > this.Two) {
          // 选取数据--向右添加，向左取消
          while (index >= this.Two) {
            this.timeListTwo.push(this.Two);
            this.Two++;
          }
          this.timeListTwo = Array.from(new Set(this.timeListTwo));
        } else {
          // 删除数据
          while (this.Two >= index) {
            if (this.timeListTwo.indexOf(index) > -1) {
              this.timeListTwo.splice(this.timeListTwo.indexOf(index), 1);
            }
            index++;
          }
        }
        this.Two = '';
        this.tempStartTwo = [];
        this.transformedSectionTwo();
      } else {
        this.Two = index;
      }
      this.selectStartTwo = !this.selectStartTwo;
    },
    // 预选区间
    handleHoverTwo (index) {
      if (this.selectStartTwo) {
        this.tempStartTwo = [];
        // 选取数据--向右添加，向左取消
        if (index > this.Two) {
          while (index >= this.Two) {
            this.tempStartTwo.push(index);
            index--;
          }
        } else {
          // 删除数据
          while (this.Two >= index) {
            this.tempStartTwo.push(index);
            index++;
          }
        }
      }
    },
  
    // 是否选中，计算className
    compClassTwo (index) {
      if (index === this.Two) {
        return 'hours-item-left preSelected';
      }
      if (index >= this.Two) {
        if (this.tempStartTwo.indexOf(index) > -1) {
          return 'hours-item-left preSelected';
        }
      } else {
        if (this.tempStartTwo.indexOf(index) > -1) {
          return 'hours-item-left unSelected';
        }
      }
      if(this.flagTwo){
          if(index===299){
           this.loading=false
      }
        this.getNewClass(index)
      }
      return this.timeListTwo.indexOf(index) > -1 ? 'hours-item-left selected' : 'hours-item-left';
    },
    getNewClass(index){
      this.timeListTwo=this.arrTwo
      this.flagTwo=false
    },
    compItemTwo (item) {
      // 不足10前面补0
      return item < 10 ? `0${item}` : item;
    },
// 周三
 // 时间区间转换成下标区间
 transformedIndexThree () {
      this.timeListThree = [];
      this.timeRangeListThree = this.sendTimeListThree;
      this.timeRangeListThree.forEach(element => {
        const [startTime, endTime] = element.match(/\d+\\:\d+/g);
        if (startTime && endTime) {
          let [startHour, startMin] = startTime.split(':');
          let [endHour, endMin] = endTime.split(':');
          if (startHour && startMin && endHour && endMin) {
            let startNum, endNum;
            if (startMin === '00') {
              startNum = 12 * parseInt(startHour);
            } else {
              startNum = 12 * parseInt(startHour) + 1;
            }
            if (endMin === '00') {
              endNum = 12 * parseInt(endHour) - 1;
            } else {
              endNum = 12 * parseInt(endHour);
            }
            while (endNum >= startNum) {
              this.timeListThree.push(startNum);
              startNum++;
            }
          } else {
            this.$message.error("时间段格式不正确");
          }
        } else {
          this.$message.error("没有拿到开始时间或结束时间或者时间段格式不对");
        }
      });
      if(!this.editThree){
        this.timeListsThree = this.timeRangeListThree && this.timeRangeListThree.length > 0 ? this.timeRangeListThree : '';
      }
    },
    // 下标区间转换成时间区间
    transformedSectionThree () {
      this.timeRangeListThree = [];
      // Array.from(new Set(this.timeRangeListThree))
      let startTime = '', endTime = '', len = this.hours.length;
      for (let index = this.hours[0] * 12; index < 12 * (len + 1); index++) {
        if (this.timeListThree.indexOf(index) > -1) {
          // 如果有开始时间，直接确定结束时间
          if (startTime) {
            // debugger
            this.closeHourThree = Math.floor((index + 1) / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourThree === this.beginHourThree) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinThree = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourThree < 10 ? '0' + this.closeHourThree : this.closeHourThree}:${this.closeMinThree}`;
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinThree = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourThree < 10 ? '0' + this.closeHourThree : this.closeHourThree}:${this.closeMinThree}`;
            }
          } else {
            // 没有开始时间，确定当前点为开始时间
            // debugger
            this.beginHourThree = Math.floor(index / 12);
            let startTimeAll = 5 * (index % 12) === 5 ? '05' : 5 * ((index) % 12)
            this.beginMinThree = index % 12 === 0 ? "00" : startTimeAll;
            startTime = `${this.beginHourThree < 10 ? '0' + this.beginHourThree : this.beginHourThree}:${this.beginMinThree}`;
          }
          // 如果是最后一格，直接结束
          if (index === 12 * this.hours.length + 1) {
            endTime = `${Math.floor((index + 1) / 12)}:00`;
            this.timeRangeListThree.push(`${startTime ? startTime : "23:30"}-${endTime}`);
            startTime = '';
            endTime = '';
          }
        } else {
          // 若这个点不在选择区间，确定一个时间段
          if (startTime && endTime) {
            this.timeRangeListThree.push(`${startTime}-${endTime}`);
            startTime = '';
            endTime = '';
          } else if (startTime && !endTime) {
            // 这里可能只选半个小时
            this.closeHourThree = Math.floor(index / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourThree === this.beginHourThree) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinThree = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourThree < 10 ? '0' + this.closeHourThree : this.closeHourThree}:${this.closeMinThree}`;
              this.timeRangeListThree.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinThree = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourThree < 10 ? '0' + this.closeHourThree : this.closeHourThree}:${this.closeMinThree}`;
              this.timeRangeListThree.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            }
          }
        }
      }
      if(!this.editThree){
        this.timeListsThree = this.timeRangeListThree && this.timeRangeListThree.length > 0 ? this.timeRangeListThree : '';
      }
    },
    // 点击事件
    handleClickThree (index) {
      this.editThree=false
      if (this.selectStartThree) {
        // 双击取反
        if (index === this.Three) {
          if (this.timeListThree.indexOf(index) > -1) {
            this.timeListThree.splice(this.timeListThree.indexOf(index), 1);
          } else {
            this.timeListThree.push(this.Three);
          }
        } else if (index > this.Three) {
          // 选取数据--向右添加，向左取消
          while (index >= this.Three) {
            this.timeListThree.push(this.Three);
            this.Three++;
          }
          this.timeListThree = Array.from(new Set(this.timeListThree));
        } else {
          // 删除数据
          while (this.Three >= index) {
            if (this.timeListThree.indexOf(index) > -1) {
              this.timeListThree.splice(this.timeListThree.indexOf(index), 1);
            }
            index++;
          }
        }
        this.Three = '';
        this.tempStartThree = [];
        this.transformedSectionThree();
      } else {
        this.Three = index;
      }
      this.selectStartThree = !this.selectStartThree;
    },
    // 预选区间
    handleHoverThree (index) {
      if (this.selectStartThree) {
        this.tempStartThree = [];
        // 选取数据--向右添加，向左取消
        if (index > this.Three) {
          while (index >= this.Three) {
            this.tempStartThree.push(index);
            index--;
          }
        } else {
          // 删除数据
          while (this.Three >= index) {
            this.tempStartThree.push(index);
            index++;
          }
        }
      }
    },
  
    // 是否选中，计算className
    compClassThree (index) {
      if (index === this.startIndexThree) {
        return 'hours-item-left preSelected';
      }
      if (index >= this.startIndexThree) {
        if (this.tempStartThree.indexOf(index) > -1) {
          return 'hours-item-left preSelected';
        }
      } else {
        if (this.tempStartThree.indexOf(index) > -1) {
          return 'hours-item-left unSelected';
        }
      }
      if(this.flagThree){
        this.getNewClassThree(index)
      }
      return this.timeListThree.indexOf(index) > -1 ? 'hours-item-left selected' : 'hours-item-left';
    },
    getNewClassThree(index){
      this.timeListThree=this.arrThree
      this.flagThree=false
    },
    compItemThree (item) {
      // 不足10前面补0
      return item < 10 ? `0${item}` : item;
    },
    // 周四
       // 时间区间转换成下标区间
       transformedIndexFour () {
      this.timeListFour = [];
      this.timeRangeListFour = this.sendTimeListFour;
      this.timeRangeListFour.forEach(element => {
        const [startTime, endTime] = element.match(/\d+\\:\d+/g);
        if (startTime && endTime) {
          let [startHour, startMin] = startTime.split(':');
          let [endHour, endMin] = endTime.split(':');
          if (startHour && startMin && endHour && endMin) {
            let startNum, endNum;
            if (startMin === '00') {
              startNum = 12 * parseInt(startHour);
            } else {
              startNum = 12 * parseInt(startHour) + 1;
            }
            if (endMin === '00') {
              endNum = 12 * parseInt(endHour) - 1;
            } else {
              endNum = 12 * parseInt(endHour);
            }
            while (endNum >= startNum) {
              this.timeListFour.push(startNum);
              startNum++;
            }
          } else {
            this.$message.error("时间段格式不正确");
          }
        } else {
          this.$message.error("没有拿到开始时间或结束时间或者时间段格式不对");
        }
      });
      // eslint-disable-next-line no-constant-condition
      if(!this.editFour){
        this.timeListsFour = this.timeRangeListFour && this.timeRangeListFour.length > 0 ? this.timeRangeListFour : '';
      }
    },
    // 下标区间转换成时间区间
    transformedSectionFour () {
      this.timeRangeListFour = [];
      // Array.from(new Set(this.timeRangeListFour))
      let startTime = '', endTime = '', len = this.hours.length;
      for (let index = this.hours[0] * 12; index < 12 * (len + 1); index++) {
        if (this.timeListFour.indexOf(index) > -1) {
          // 如果有开始时间，直接确定结束时间
          if (startTime) {
            // debugger
            this.closeHourFour = Math.floor((index + 1) / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourFour === this.beginHourFour) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinFour = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourFour < 10 ? '0' + this.closeHourFour : this.closeHourFour}:${this.closeMinFour}`;
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinFour = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourFour < 10 ? '0' + this.closeHourFour : this.closeHourFour}:${this.closeMinFour}`;
            }
          } else {
            // 没有开始时间，确定当前点为开始时间
            // debugger
            this.beginHourFour = Math.floor(index / 12);
            let startTimeAll = 5 * (index % 12) === 5 ? '05' : 5 * ((index) % 12)
            this.beginMinFour = index % 12 === 0 ? "00" : startTimeAll;
            startTime = `${this.beginHourFour < 10 ? '0' + this.beginHourFour : this.beginHourFour}:${this.beginMinFour}`;
          }
          // 如果是最后一格，直接结束
          if (index === 12 * this.hours.length + 1) {
            endTime = `${Math.floor((index + 1) / 12)}:00`;
            this.timeRangeListFour.push(`${startTime ? startTime : "23:30"}-${endTime}`);
            startTime = '';
            endTime = '';
          }
        } else {
          // 若这个点不在选择区间，确定一个时间段
          if (startTime && endTime) {
            this.timeRangeListFour.push(`${startTime}-${endTime}`);
            startTime = '';
            endTime = '';
          } else if (startTime && !endTime) {
            // 这里可能只选半个小时
            this.closeHourFour = Math.floor(index / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourFour === this.beginHourFour) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinFour = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourFour < 10 ? '0' + this.closeHourFour : this.closeHourFour}:${this.closeMinFour}`;
              this.timeRangeListFour.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinFour = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourFour < 10 ? '0' + this.closeHourFour : this.closeHourFour}:${this.closeMinFour}`;
              this.timeRangeListFour.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            }
          }
        }
      }
      if(!this.editFour){
        this.timeListsFour = this.timeRangeListFour && this.timeRangeListFour.length > 0 ? this.timeRangeListFour : '';
      }
    },
    // 点击事件
    handleClickFour (index) {
      this.editFour=false
      if (this.selectStartFour) {
        // 双击取反
        if (index === this.Four) {
          if (this.timeListFour.indexOf(index) > -1) {
            this.timeListFour.splice(this.timeListFour.indexOf(index), 1);
          } else {
            this.timeListFour.push(this.Four);
          }
        } else if (index > this.Four) {
          // 选取数据--向右添加，向左取消
          while (index >= this.Four) {
            this.timeListFour.push(this.Four);
            this.Four++;
          }
          this.timeListFour = Array.from(new Set(this.timeListFour));
        } else {
          // 删除数据
          while (this.Four >= index) {
            if (this.timeListFour.indexOf(index) > -1) {
              this.timeListFour.splice(this.timeListFour.indexOf(index), 1);
            }
            index++;
          }
        }
        this.Four = '';
        this.tempStartFour = [];
        this.transformedSectionFour();
      } else {
        this.Four = index;
      }
      this.selectStartFour = !this.selectStartFour;
    },
    // 预选区间
    handleHoverFour (index) {
      if (this.selectStartFour) {
        this.tempStartFour = [];
        // 选取数据--向右添加，向左取消
        if (index > this.Four) {
          while (index >= this.Four) {
            this.tempStartFour.push(index);
            index--;
          }
        } else {
          // 删除数据
          while (this.Four >= index) {
            this.tempStartFour.push(index);
            index++;
          }
        }
      }
    },
  
    // 是否选中，计算className
    compClassFour (index) {
      if (index === this.startIndexFour) {
        return 'hours-item-left preSelected';
      }
      if (index >= this.startIndexFour) {
        if (this.tempStartFour.indexOf(index) > -1) {
          return 'hours-item-left preSelected';
        }
      } else {
        if (this.tempStartFour.indexOf(index) > -1) {
          return 'hours-item-left unSelected';
        }
      }
      if(this.flagFour){
        this.getNewClassFour(index)
      }
      return this.timeListFour.indexOf(index) > -1 ? 'hours-item-left selected' : 'hours-item-left';
    },
    getNewClassFour(index){
      this.timeListFour=this.arrFour
      this.flagFour=false
    },
    compItemFour (item) {
      // 不足10前面补0
      return item < 10 ? `0${item}` : item;
    },
    // 周五
      // 时间区间转换成下标区间
      transformedIndexFive () {
      this.timeListFive = [];
      this.timeRangeListFive = this.sendTimeListFive;
      this.timeRangeListFive.forEach(element => {
        const [startTime, endTime] = element.match(/\d+\\:\d+/g);
        if (startTime && endTime) {
          let [startHour, startMin] = startTime.split(':');
          let [endHour, endMin] = endTime.split(':');
          if (startHour && startMin && endHour && endMin) {
            let startNum, endNum;
            if (startMin === '00') {
              startNum = 12 * parseInt(startHour);
            } else {
              startNum = 12 * parseInt(startHour) + 1;
            }
            if (endMin === '00') {
              endNum = 12 * parseInt(endHour) - 1;
            } else {
              endNum = 12 * parseInt(endHour);
            }
            while (endNum >= startNum) {
              this.timeListFive.push(startNum);
              startNum++;
            }
          } else {
            this.$message.error("时间段格式不正确");
          }
        } else {
          this.$message.error("没有拿到开始时间或结束时间或者时间段格式不对");
        }
      });
      // eslint-disable-next-line no-constant-condition
      if(!this.editFive){
        this.timeListsFive = this.timeRangeListFive && this.timeRangeListFive.length > 0 ? this.timeRangeListFive : '';
      }
    },
    // 下标区间转换成时间区间
    transformedSectionFive () {
      this.timeRangeListFive = [];
      // Array.from(new Set(this.timeRangeListFive))
      let startTime = '', endTime = '', len = this.hours.length;
      for (let index = this.hours[0] * 12; index < 12 * (len + 1); index++) {
        if (this.timeListFive.indexOf(index) > -1) {
          // 如果有开始时间，直接确定结束时间
          if (startTime) {
            // debugger
            this.closeHourFive = Math.floor((index + 1) / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourFive === this.beginHourFive) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinFive = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourFive < 10 ? '0' + this.closeHourFive : this.closeHourFive}:${this.closeMinFive}`;
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinFive = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourFive < 10 ? '0' + this.closeHourFive : this.closeHourFive}:${this.closeMinFive}`;
            }
          } else {
            // 没有开始时间，确定当前点为开始时间
            // debugger
            this.beginHourFive = Math.floor(index / 12);
            let startTimeAll = 5 * (index % 12) === 5 ? '05' : 5 * ((index) % 12)
            this.beginMinFive = index % 12 === 0 ? "00" : startTimeAll;
            startTime = `${this.beginHourFive < 10 ? '0' + this.beginHourFive : this.beginHourFive}:${this.beginMinFive}`;
          }
          // 如果是最后一格，直接结束
          if (index === 12 * this.hours.length + 1) {
            endTime = `${Math.floor((index + 1) / 12)}:00`;
            this.timeRangeListFive.push(`${startTime ? startTime : "23:30"}-${endTime}`);
            startTime = '';
            endTime = '';
          }
        } else {
          // 若这个点不在选择区间，确定一个时间段
          if (startTime && endTime) {
            this.timeRangeListFive.push(`${startTime}-${endTime}`);
            startTime = '';
            endTime = '';
          } else if (startTime && !endTime) {
            // 这里可能只选半个小时
            this.closeHourFive = Math.floor(index / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourFive === this.beginHourFive) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinFive = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourFive < 10 ? '0' + this.closeHourFive : this.closeHourFive}:${this.closeMinFive}`;
              this.timeRangeListFive.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinFive = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourFive < 10 ? '0' + this.closeHourFive : this.closeHourFive}:${this.closeMinFive}`;
              this.timeRangeListFive.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            }
          }
        }
      }
      if(!this.editFive){
        this.timeListsFive = this.timeRangeListFive && this.timeRangeListFive.length > 0 ? this.timeRangeListFive : '';
      }
    },
    // 点击事件
    handleClickFive (index) {
      this.editFive=false
      if (this.selectStartFive) {
        // 双击取反
        if (index === this.Five) {
          if (this.timeListFive.indexOf(index) > -1) {
            this.timeListFive.splice(this.timeListFive.indexOf(index), 1);
          } else {
            this.timeListFive.push(this.Five);
          }
        } else if (index > this.Five) {
          // 选取数据--向右添加，向左取消
          while (index >= this.Five) {
            this.timeListFive.push(this.Five);
            this.Five++;
          }
          this.timeListFive = Array.from(new Set(this.timeListFive));
        } else {
          // 删除数据
          while (this.Five >= index) {
            if (this.timeListFive.indexOf(index) > -1) {
              this.timeListFive.splice(this.timeListFive.indexOf(index), 1);
            }
            index++;
          }
        }
        this.Five = '';
        this.tempStartFive = [];
        this.transformedSectionFive();
      } else {
        this.Five = index;
      }
      this.selectStartFive = !this.selectStartFive;
    },
    // 预选区间
    handleHoverFive (index) {
      if (this.selectStartFive) {
        this.tempStartFive = [];
        // 选取数据--向右添加，向左取消
        if (index > this.Five) {
          while (index >= this.Five) {
            this.tempStartFive.push(index);
            index--;
          }
        } else {
          // 删除数据
          while (this.Five >= index) {
            this.tempStartFive.push(index);
            index++;
          }
        }
      }
    },
  
    // 是否选中，计算className
    compClassFive (index) {
      if (index === this.startIndexFive) {
        return 'hours-item-left preSelected';
      }
      if (index >= this.startIndexFive) {
        if (this.tempStartFive.indexOf(index) > -1) {
          return 'hours-item-left preSelected';
        }
      } else {
        if (this.tempStartFive.indexOf(index) > -1) {
          return 'hours-item-left unSelected';
        }
      }
      if(this.flagFive){
        this.getNewClassFive(index)
      }
      return this.timeListFive.indexOf(index) > -1 ? 'hours-item-left selected' : 'hours-item-left';
    },
    getNewClassFive(index){
      this.timeListFive=this.arrFive
      this.flagFive=false
    },
    compItemFive (item) {
      // 不足10前面补0
      return item < 10 ? `0${item}` : item;
    },
    // 周六
    // 时间区间转换成下标区间
    transformedIndexSix () {
      this.timeListSix = [];
      this.timeRangeListSix = this.sendTimeListSix;
      this.timeRangeListSix.forEach(element => {
        const [startTime, endTime] = element.match(/\d+\\:\d+/g);
        if (startTime && endTime) {
          let [startHour, startMin] = startTime.split(':');
          let [endHour, endMin] = endTime.split(':');
          if (startHour && startMin && endHour && endMin) {
            let startNum, endNum;
            if (startMin === '00') {
              startNum = 12 * parseInt(startHour);
            } else {
              startNum = 12 * parseInt(startHour) + 1;
            }
            if (endMin === '00') {
              endNum = 12 * parseInt(endHour) - 1;
            } else {
              endNum = 12 * parseInt(endHour);
            }
            while (endNum >= startNum) {
              this.timeListSix.push(startNum);
              startNum++;
            }
          } else {
            this.$message.error("时间段格式不正确");
          }
        } else {
          this.$message.error("没有拿到开始时间或结束时间或者时间段格式不对");
        }
      });
      // eslint-disable-next-line no-constant-condition
      if(!this.editSix){
        this.timeListsSix = this.timeRangeListSix && this.timeRangeListSix.length > 0 ? this.timeRangeListSix : '';
      }
    },
    // 下标区间转换成时间区间
    transformedSectionSix () {
      this.timeRangeListSix = [];
      // Array.from(new Set(this.timeRangeListSix))
      let startTime = '', endTime = '', len = this.hours.length;
      for (let index = this.hours[0] * 12; index < 12 * (len + 1); index++) {
        if (this.timeListSix.indexOf(index) > -1) {
          // 如果有开始时间，直接确定结束时间
          if (startTime) {
            // debugger
            this.closeHourSix = Math.floor((index + 1) / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourSix === this.beginHourSix) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinSix = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourSix < 10 ? '0' + this.closeHourSix : this.closeHourSix}:${this.closeMinSix}`;
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinSix = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourSix < 10 ? '0' + this.closeHourSix : this.closeHourSix}:${this.closeMinSix}`;
            }
          } else {
            // 没有开始时间，确定当前点为开始时间
            // debugger
            this.beginHourSix = Math.floor(index / 12);
            let startTimeAll = 5 * (index % 12) === 5 ? '05' : 5 * ((index) % 12)
            this.beginMinSix = index % 12 === 0 ? "00" : startTimeAll;
            startTime = `${this.beginHourSix < 10 ? '0' + this.beginHourSix : this.beginHourSix}:${this.beginMinSix}`;
          }
          // 如果是最后一格，直接结束
          if (index === 12 * this.hours.length + 1) {
            endTime = `${Math.floor((index + 1) / 12)}:00`;
            this.timeRangeListSix.push(`${startTime ? startTime : "23:30"}-${endTime}`);
            startTime = '';
            endTime = '';
          }
        } else {
          // 若这个点不在选择区间，确定一个时间段
          if (startTime && endTime) {
            this.timeRangeListSix.push(`${startTime}-${endTime}`);
            startTime = '';
            endTime = '';
          } else if (startTime && !endTime) {
            // 这里可能只选半个小时
            this.closeHourSix = Math.floor(index / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourSix === this.beginHourSix) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinSix = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourSix < 10 ? '0' + this.closeHourSix : this.closeHourSix}:${this.closeMinSix}`;
              this.timeRangeListSix.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinSix = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourSix < 10 ? '0' + this.closeHourSix : this.closeHourSix}:${this.closeMinSix}`;
              this.timeRangeListSix.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            }
          }
        }
      }
      if(!this.editSix){
        this.timeListsSix = this.timeRangeListSix && this.timeRangeListSix.length > 0 ? this.timeRangeListSix : '';
      }
    },
    // 点击事件
    handleClickSix (index) {
      this.editSix=false
      if (this.selectStartSix) {
        // 双击取反
        if (index === this.Six) {
          if (this.timeListSix.indexOf(index) > -1) {
            this.timeListSix.splice(this.timeListSix.indexOf(index), 1);
          } else {
            this.timeListSix.push(this.Six);
          }
        } else if (index > this.Six) {
          // 选取数据--向右添加，向左取消
          while (index >= this.Six) {
            this.timeListSix.push(this.Six);
            this.Six++;
          }
          this.timeListSix = Array.from(new Set(this.timeListSix));
        } else {
          // 删除数据
          while (this.Six >= index) {
            if (this.timeListSix.indexOf(index) > -1) {
              this.timeListSix.splice(this.timeListSix.indexOf(index), 1);
            }
            index++;
          }
        }
        this.Six = '';
        this.tempStartSix = [];
        this.transformedSectionSix();
      } else {
        this.Six = index;
      }
      this.selectStartSix = !this.selectStartSix;
    },
    // 预选区间
    handleHoverSix (index) {
      if (this.selectStartSix) {
        this.tempStartSix = [];
        // 选取数据--向右添加，向左取消
        if (index > this.Six) {
          while (index >= this.Six) {
            this.tempStartSix.push(index);
            index--;
          }
        } else {
          // 删除数据
          while (this.Six >= index) {
            this.tempStartSix.push(index);
            index++;
          }
        }
      }
    },
  
    // 是否选中，计算className
    compClassSix (index) {
      if (index === this.startIndexSix) {
        return 'hours-item-left preSelected';
      }
      if (index >= this.startIndexSix) {
        if (this.tempStartSix.indexOf(index) > -1) {
          return 'hours-item-left preSelected';
        }
      } else {
        if (this.tempStartSix.indexOf(index) > -1) {
          return 'hours-item-left unSelected';
        }
      }
      if(this.flagSix){
        this.getNewClassSix(index)
      }
      return this.timeListSix.indexOf(index) > -1 ? 'hours-item-left selected' : 'hours-item-left';
    },
    getNewClassSix(index){
      this.timeListSix=this.arrSix
      this.flagSix=false
    },
    compItemSix (item) {
      // 不足10前面补0
      return item < 10 ? `0${item}` : item;
    },
//  周日
  // 时间区间转换成下标区间
  transformedIndexSeven () {
      this.timeListSeven = [];
      this.timeRangeListSeven = this.sendTimeListSeven;
      this.timeRangeListSeven.forEach(element => {
        const [startTime, endTime] = element.match(/\d+\\:\d+/g);
        if (startTime && endTime) {
          let [startHour, startMin] = startTime.split(':');
          let [endHour, endMin] = endTime.split(':');
          if (startHour && startMin && endHour && endMin) {
            let startNum, endNum;
            if (startMin === '00') {
              startNum = 12 * parseInt(startHour);
            } else {
              startNum = 12 * parseInt(startHour) + 1;
            }
            if (endMin === '00') {
              endNum = 12 * parseInt(endHour) - 1;
            } else {
              endNum = 12 * parseInt(endHour);
            }
            while (endNum >= startNum) {
              this.timeListSeven.push(startNum);
              startNum++;
            }
          } else {
            this.$message.error("时间段格式不正确");
          }
        } else {
          this.$message.error("没有拿到开始时间或结束时间或者时间段格式不对");
        }
      });
      // eslint-disable-next-line no-constant-condition
      if(!this.editSeven){
        this.timeListsSeven = this.timeRangeListSeven && this.timeRangeListSeven.length > 0 ? this.timeRangeListSeven : '';
      }
    },
    // 下标区间转换成时间区间
    transformedSectionSeven () {
      this.timeRangeListSeven = [];
      // Array.from(new Set(this.timeRangeListSeven))
      let startTime = '', endTime = '', len = this.hours.length;
      for (let index = this.hours[0] * 12; index < 12 * (len + 1); index++) {
        if (this.timeListSeven.indexOf(index) > -1) {
          // 如果有开始时间，直接确定结束时间
          if (startTime) {
            // debugger
            this.closeHourSeven = Math.floor((index + 1) / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourSeven === this.beginHourSeven) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinSeven = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourSeven < 10 ? '0' + this.closeHourSeven : this.closeHourSeven}:${this.closeMinSeven}`;
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinSeven = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourSeven < 10 ? '0' + this.closeHourSeven : this.closeHourSeven}:${this.closeMinSeven}`;
            }
          } else {
            // 没有开始时间，确定当前点为开始时间
            // debugger
            this.beginHourSeven = Math.floor(index / 12);
            let startTimeAll = 5 * (index % 12) === 5 ? '05' : 5 * ((index) % 12)
            this.beginMinSeven = index % 12 === 0 ? "00" : startTimeAll;
            startTime = `${this.beginHourSeven < 10 ? '0' + this.beginHourSeven : this.beginHourSeven}:${this.beginMinSeven}`;
          }
          // 如果是最后一格，直接结束
          if (index === 12 * this.hours.length + 1) {
            endTime = `${Math.floor((index + 1) / 12)}:00`;
            this.timeRangeListSeven.push(`${startTime ? startTime : "23:30"}-${endTime}`);
            startTime = '';
            endTime = '';
          }
        } else {
          // 若这个点不在选择区间，确定一个时间段
          if (startTime && endTime) {
            this.timeRangeListSeven.push(`${startTime}-${endTime}`);
            startTime = '';
            endTime = '';
          } else if (startTime && !endTime) {
            // 这里可能只选半个小时
            this.closeHourSeven = Math.floor(index / 12);
            //判断是否重复选择选择下标开始结束时间
            if (this.closeHourSeven === this.beginHourSeven) {
              let endTimeAll = 5 * ((index) % 12) === 5 ? '05' : 5 * ((index) % 12)
              this.closeMinSeven = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourSeven < 10 ? '0' + this.closeHourSeven : this.closeHourSeven}:${this.closeMinSeven}`;
              this.timeRangeListSeven.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            } else {
              let endTimeAll = 5 * ((index + 1) % 12) === 5 ? '05' : 5 * ((index + 1) % 12)
              this.closeMinSeven = (index + 1) % 12 === 0 ? "00" : endTimeAll;
              endTime = `${this.closeHourSeven < 10 ? '0' + this.closeHourSeven : this.closeHourSeven}:${this.closeMinSeven}`;
              this.timeRangeListSeven.push(`${startTime}-${endTime}`);
              startTime = '';
              endTime = '';
            }
          }
        }
      }
      if(!this.editSeven){
        this.timeListsSeven = this.timeRangeListSeven && this.timeRangeListSeven.length > 0 ? this.timeRangeListSeven : '';
      }
    },
    // 点击事件
    handleClickSeven (index) {
      this.editSeven=false
      if (this.selectStartSeven) {
        // 双击取反
        if (index === this.Seven) {
          if (this.timeListSeven.indexOf(index) > -1) {
            this.timeListSeven.splice(this.timeListSeven.indexOf(index), 1);
          } else {
            this.timeListSeven.push(this.Seven);
          }
        } else if (index > this.Seven) {
          // 选取数据--向右添加，向左取消
          while (index >= this.Seven) {
            this.timeListSeven.push(this.Seven);
            this.Seven++;
          }
          this.timeListSeven = Array.from(new Set(this.timeListSeven));
        } else {
          // 删除数据
          while (this.Seven >= index) {
            if (this.timeListSeven.indexOf(index) > -1) {
              this.timeListSeven.splice(this.timeListSeven.indexOf(index), 1);
            }
            index++;
          }
        }
        this.Seven = '';
        this.tempStartSeven = [];
        this.transformedSectionSeven();
      } else {
        this.Seven = index;
      }
      this.selectStartSeven = !this.selectStartSeven;
    },
    // 预选区间
    handleHoverSeven (index) {
      if (this.selectStartSeven) {
        this.tempStartSeven = [];
        // 选取数据--向右添加，向左取消
        if (index > this.Seven) {
          while (index >= this.Seven) {
            this.tempStartSeven.push(index);
            index--;
          }
        } else {
          // 删除数据
          while (this.Seven >= index) {
            this.tempStartSeven.push(index);
            index++;
          }
        }
      }
    },
  
    // 是否选中，计算className
    compClassSeven (index) {
      if (index === this.startIndexSeven) {
        return 'hours-item-left preSelected';
      }
      if (index >= this.startIndexSeven) {
        if (this.tempStartSeven.indexOf(index) > -1) {
          return 'hours-item-left preSelected';
        }
      } else {
        if (this.tempStartSeven.indexOf(index) > -1) {
          return 'hours-item-left unSelected';
        }
      }
      if(this.flagSeven){
        this.getNewClassSeven(index)
      }
      return this.timeListSeven.indexOf(index) > -1 ? 'hours-item-left selected' : 'hours-item-left';
    },
    getNewClassSeven(index){
      this.timeListSeven=this.arrSeven
      this.flagSeven=false
    },
    compItemSeven (item) {
      // 不足10前面补0
      return item < 10 ? `0${item}` : item;
    },
 
    // ======
    // 检验模板名称重复
    async validateName(rule, value, callback) {
      if (this.name !== this.nameForm.title) {
        // 添加时候才进行此检验，编辑不校验
        const { result } = await tapi.isNameConflict({ name: value });
        if (result) {
          callback(new Error("该模板名称已存在，请重新填写"));
          this.nameMark=false
        }else{
          this.nameMark=true
        }
      }
      // 调用接口查找名称是否重复, 是的话调出相关数据
      callback();
    }, 
    // 查看详情信息(row后端未返回所有字段)
    checkDetail() {
      this.loading = true;
      const params = {
        id: this.row && this.row.id,
      };
      tapi
        .checkTime(params)
        .then((res) => {
          this.name = res.result && res.result.name;
          this.nameForm.title = res.result && res.result.name;
          this.descForm.desc = res.result && res.result.description;
          this.loading = false;
          res.result &&
            res.result.timeIntervalsInfo.map((item) => {
              if (item.day === "1") {
                 this.tips=item.time
                 this.arrOne=item.mark
              }
              if (item.day === "2") {
                this.timeListsTwo=item.time
                this.arrTwo=item.mark
              }
              if (item.day === "3") {
                this.timeListsThree=item.time
                this.arrThree=item.mark
              }
              if (item.day === "4") {
                this.timeListsFour=item.time
                this.arrFour=item.mark
              }
              if (item.day === "5") {
                this.timeListsFive=item.time
                this.arrFive=item.mark
              }
              if (item.day === "6") {
                this.timeListsSix=item.time
                this.arrSix=item.mark
              }
              if (item.day === "7") {
                this.timeListsSeven=item.time
                this.arrSeven=item.mark
              }
            });
        })
        .catch();
    },
    
    // 多表单检验
    saveForm() {
      this.$refs["nameForm"].validate((valid) => {
        if (valid) {
          this.nameMark = true;
        } else {
          this.nameMark = false
        }
      });

      // this.$refs["timeForm"].validate((valid) => {
      //   if (valid) {
      //     this.timeMark = true;
      //   } else {
      //     this.timeMark = false;
      //   }
      // });

      this.$refs["descForm"].validate((valid) => {
        if (valid) {
          this.descMark = true;
        } else {
          this.descMark = false;
        }
      });
    },

    // 保存
    save() {
      this.saveForm();
      if (this.nameMark && this.descMark) {
        this.saveLoading = true
        let date=['00:00-00:00']
        this.tips=this.tips.map(item=>{
          if(item.indexOf('24:00')>-1){
            item=item.replace("24:00","23:59:59")
          }
          return item
        })
        this.timeListsTwo=this. timeListsTwo.map(item=>{
          if(item.indexOf('24:00')>-1){
            item=item.replace("24:00","23:59:59")
          }
          return item
        })
        this.timeListsThree=this. timeListsThree.map(item=>{
          if(item.indexOf('24:00')>-1){
            item=item.replace("24:00","23:59:59")
          }
          return item
        })
        this.timeListsFour=this. timeListsFour.map(item=>{
          if(item.indexOf('24:00')>-1){
            item=item.replace("24:00","23:59:59")
          }
          return item
        })
        this.timeListsFive=this. timeListsFive.map(item=>{
          if(item.indexOf('24:00')>-1){
            item=item.replace("24:00","23:59:59")
          }
          return item
        })
        this.timeListsSix=this. timeListsSix.map(item=>{
          if(item.indexOf('24:00')>-1){
            item=item.replace("24:00","23:59:59")
          }
          return item
        })
        this.timeListsSeven=this. timeListsSeven.map(item=>{
          if(item.indexOf('24:00')>-1){
            item=item.replace("24:00","23:59:59")
          }
          return item
        })
          // 未选择时间的话,checked为0
        let mon = {
          day: "1",
          time:this.tips&&this.tips.length>0?this.tips:date,
          checked:this.tips&&this.tips.length>0?1:0,
        };
        let tue = {
          day: "2",
          time: (this.timeListsTwo&&this.timeListsTwo.length>0)?this.timeListsTwo:date,
          checked:this.timeListsTwo&&this.timeListsTwo.length>0?1:0,
        };
        let wed = {
          day: "3",
          time: (this.timeListsThree&&this.timeListsThree.length>0)?this.timeListsThree:date,
          checked:this.timeListsThree&&this.timeListsThree.length>0?1:0,
        };
      
        let thur = {
          day: "4",
          time: (this.timeListsFour&&this.timeListsFour.length>0)?this.timeListsFour:date,
          checked:this.timeListsFour&&this.timeListFour.length>0?1:0,
        };
        let fri = {
          day: "5",
          time:(this.timeListsFive&&this.timeListsFive.length>0)?this.timeListsFive:date,
          checked:this.timeListsFive&&this.timeListsFive.length>0?1:0,
        };
        let sat = {
         
          day: "6",
          time: (this.timeListsSix&&this.timeListsSix.length>0)?this.timeListsSix:date,
          checked:this.timeListsSix&&this.timeListsSix.length>0?1:0,
        };
        let sun = {
          day: "7",
          time: (this.timeListsSeven&&this.timeListsSeven.length>0)?this.timeListsSeven:date,
          checked:this.timeListsSeven&&this.timeListsSeven.length>0?1:0,
        };
        let timeIntervalsInfo = [];
        timeIntervalsInfo.push(mon, tue, wed, thur, fri, sat, sun);
  
        if (!this.editFlag) {
          const params = {
            description: this.descForm.desc,
            name: this.nameForm.title,
            timeIntervalsInfo,
          };
          tapi
            .addTimeModel(params)
            .then((res) => {
              if (res.code === 0) {
                this.back();
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.$parent.fetchData({});
              }
            })
            .catch(()=>{
              this.saveLoading = false
            });
        } else {
          // 编辑
          const params = {
            id: this.row && this.row.id,
            description: this.descForm.desc,
            name: this.nameForm.title,
            timeIntervalsInfo,
          };
          tapi
            .updateTimeModel(params)
            .then((res) => {
              if (res.code === 0) {
                this.back();
                this.$message({
                  message: "编辑成功",
                  type: "success",
                });
                this.$parent.fetchData({});
              }
            })
            .catch(()=>{
              this.saveLoading = false
            });
        }
      }
    },
    // 编辑
    edit() {
      this.addShown = true;
      this.editFlag = true;
    },
    //   返回
    back() {
        this.saveLoading = false
      this.$emit("back");
    },

    //数据校验,重置数据
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.deviceContainer {
  .margins{
    margin-top:10PX;
  }
  .tipss{
    color:#606266;
    font-size:14px;
    margin-left:1.2%;
    margin-bottom: 20px;
  }
  .hours-container {
  margin-left: 1.5%;
  display: flex;
  cursor: pointer;
  margin-top: 10px;
  .week-name{
    width:70PX;
  }
  .hours-item {
    width: 4%;
    height: 45px;
    // border: 1px solid #c2d0f3;
    border-right: none;
    text-align: center;
    &:last-child {
      .hours-item-value {
        display: none;
      }
      .hours-item-header {
        border-top: none;
        margin-top: 12px;
        margin-left: -25px;
      }
    }
 
    .hours-item-header {
      text-align: left;
      position: relative;
      margin-left: -20%;
      width: 100%;
      height: 30px;
      line-height: 30px;
      border-top: 1px solid #ccc;
 
      &:last-child {
        width: 150%;
      }
    }
    .hours-item-value {
      width: 100%;
      height: 12px;
      box-sizing: border-box;
      display: flex;
      &:first-child {
        border-left: 1px solid #ccc;
      }
      &:last-child {
        border-right: 1px solid #ccc;
      }
      .hours-item-left,
      .hours-item-right {
        width: 50%;
        height: 11px;
        margin-top: 1px;
        // border-right: 1px solid #ccc;
 
        box-sizing: border-box;
        &:last-child {
          border-right: none;
        }
      }
    }
    // 已选中的颜色
    .selected {
      background-color: rgba(0, 87, 255, 0.4);
      border-bottom: 1px solid #ccc;
    }
    .preSelected {
      background-color: rgba(255, 148, 49, 0.4);
      border-bottom: 1px solid #ccc;
    }
    .unSelected {
      background-color: #ffffff;
      border-bottom: 1px solid #ccc;
    }
  }
}
.tips {
  // width: auto;
  border-radius: 4px;
  line-height: 30px;
  border: 1px solid #1890ff;
  background: rgba(53, 158, 255, 0.05);
  padding: 5px 20px;
  position: absolute;
  .times {
    margin-right: 0px;
  }
}
  /deep/[class*=" el-icon-"],
  [class^="el-icon-"] {
    font-family: element-icons !important;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /deep/.el-checkbox__input.is-checked .el-checkbox__inner::after {
    -webkit-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1);
  }
  /deep/.el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 1PX solid #fff;
    border-left: 0;
    border-top: 0;
    height: 15PX;
    left: 10PX;
    position: absolute;
    top: 1PX;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 3PX;
    -webkit-transition: -webkit-transform 0.15s ease-in 0.05s;
    transition: -webkit-transform 0.15s ease-in 0.05s;
    transition: transform 0.15s ease-in 0.05s;
    transition: transform 0.15s ease-in 0.05s,
      -webkit-transform 0.15s ease-in 0.05s;
    -webkit-transform-origin: center;
    transform-origin: center;
  }
  /deep/.el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 50% !important;
  }
  /deep/.el-col-1 {
    width: 4.16667%;
    padding-top: 2PX;
  }
  /deep/.el-checkbox__inner {
    width: 25PX;
    height: 25PX;
  }
  /deep/.el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: 18PX;
    color: #606266;
    background-color: #FFF;
    background-image: none;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
/deep/.el-input__inner {
  font-size: 18PX;
}
  .event {
    font-size: 14PX;
    border-radius: 4PX;
    padding: 5PX 0 5PX 0;
    min-width: 80PX;
    cursor: pointer;
    text-align: center;
    border: 1PX solid #347fff;
    margin-left: 10PX;
    color: #347fff;
  }
  .btnGroup {
    margin-top: 25PX;
    padding-bottom: 25PX;
  }
  .back {
    font-size: 20PX;
    font-weight: 400;
    color: #0a1933;
  }
  .notityTitle {
    cursor: pointer;
    font-size: 18PX;
    font-weight: 400;
    color: #0a1933;
    padding-bottom: 20PX;
    border-bottom: 1PX solid #f3f3f5;
    margin: 0 auto;
  }
  .checkContainer {
    margin-top: 100PX;
    display: flex;
    justify-content: center; /* 水平居中 */
    width: 100%;
    .checkContent {
      .modeTitle {
        min-width: 90PX;
        font-size: 18PX;
        font-weight: 400;
        color: #0a1933;
      }
      .modeTitles {
        min-width: 96PX;
        font-size: 18PX;
        font-weight: 400;
        color: #0a1933;
        padding-right: 16PX;
        padding-top: 6PX;
      }
      .timeTitle {
        min-width: 90PX;
        font-size: 18PX;
        font-weight: 400;
        color: #0a1933;
        padding-right: 16PX;
      }
      .modelTime {
        margin-top: 16PX;
        font-size: 18PX;
        font-weight: 400;
        color: rgba(10, 25, 51, 0.65);
      }
      .modelContent {
        font-size: 18PX;
        font-weight: 400;
        color: rgba(10, 25, 51, 0.65);
        width: 100%;
        /deep/.el-form-item {
          margin-bottom: 4PX;
        }
      }
      /deep/.el-textarea {
        position: relative;
        display: inline-block;
        width: 238%;
        vertical-align: bottom;
        font-size: 14PX;
      }
      /deep/.el-form-item__label {
        font-size: 18PX;
      }
      /deep/.el-form-item__content {
        font-size: 18PX;
      }
    }
  }

  .variable {
    min-width: 70PX;
    font-size: 16PX;
    padding-top: 5PX;
    color: #347fff;
  }
  .modelExample {
    margin-top: 20PX;
  }
  .emailExample {
    width: 100%;
    border-radius: 8PX;
    box-sizing: border-box;
    box-shadow: 0PX 0PX 7PX -3PX rgba(33, 72, 141, 0.3);
  }
  .emailContent {
    width: 98%;
    margin: 0 auto;
  }
  .exampleTitle {
    height: 50PX;
    line-height: 50PX;
    border-radius: 8PX;
    font-size: 18PX;
    font-weight: 400;
    color: #0a1933;
    border-bottom: 1PX solid rgba(10, 25, 51, 0.05);
  }
  .emailTitle {
    margin-top: 15PX;
    font-size: 20PX;
    font-weight: 400;
    color: #0a1933;
  }
  .emailMessage {
    color: rgba(10, 25, 51, 0.65);
    margin-top: 15PX;
    font-size: 16PX;
  }
  .emailBody {
    margin-top: 20PX;
    font-size: 18PX;
    font-weight: 400;
    color: #0a1933;
  }
  .pic {
    margin-top: 10PX;
    padding-bottom: 10PX;
  }
  .modeForm {
    margin-top: 20PX;
    // /deep/.el-form-item__label {
    //   text-align: right;
    //   vertical-align: middle;
    //   float: left;
    //   width: 90PX !important;
    //   font-size: 16PX;
    //   color: #606266;
    //   line-height: 40PX;
    //   padding: 0 12PX 0 0;
    //   -webkit-box-sizing: border-box;
    //   box-sizing: border-box;
    // }
    // /deep/.el-form-item__content {
    //   line-height: 40PX;
    //   margin-left: 90PX !important;
    //   position: relative;
    //   font-size: 16PX;
    // }
  }
  width: 100%;
  .deviceContent {
    width: 97%;
    margin: 24px auto;
    border-radius: 8px;
    box-sizing: border-box;
    background:#fff;
    // box-shadow: 0PX 0PX 7PX -3PX rgba(33, 72, 141, 0.2);
    .pickerdata {
      width: 350PX;
    }
    .content {
      padding-top: 24px;
      // width: 95%;
      margin: 0 auto;
    }
  }
}
</style>