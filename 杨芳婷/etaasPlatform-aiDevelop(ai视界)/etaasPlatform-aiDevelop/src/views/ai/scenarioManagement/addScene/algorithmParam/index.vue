<template>
  <div class="algorithmParamContainer">
    <!-- 烟火识别、人员检测 -->
    <el-form
      v-if="algName === 'fire'  || algName=== 'person' ||algName=== 'smoke'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formFireRules"
      ref="formFire"
      :model="formFire"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formFire.confidenceLevel"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >请输入0-1之间的数值,置信度越低,越容易触发告警</span
        >
      </el-form-item>
      <el-form-item label="告警间隔(秒)" prop="alarmInterval">
        <el-input
          v-model="formFire.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
    </el-form>
      <!-- 人员密度 -->
    <el-form
      v-if="algName === 'person_density'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formDensityRules"
      ref="formDensity"
      :model="formDensity"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formDensity.confidenceLevel"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >产生事件/告警的阈值,请输入0-1之间的数值</span
        >
      </el-form-item>
      <el-form-item label="告警人数" prop="alarmNum">
        <el-input
          v-model="formDensity.alarmNum"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">超过设定人数则进行告警,最低不小于10人</span>
      </el-form-item>
      <el-form-item label="告警间隔(秒)" prop="alarmInterval">
        <el-input
          v-model="formDensity.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
    </el-form>
    <!-- 人员聚集 -->
    <el-form
      v-if="algName=== 'person_gather'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formGatherRules"
      ref="formGather"
      :model="formGather"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formGather.confidenceLevel"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >产生事件/告警的阈值,请输入0-1之间的数值</span
        >
      </el-form-item>
      <el-form-item label="告警人数" prop="alarmNum">
        <el-input
          v-model="formGather.alarmNum"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">超过设定人数则进行告警,最大不超过10人</span>
      </el-form-item>
      <el-form-item label="告警间隔(秒)" prop="alarmInterval">
        <el-input
          v-model="formGather.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
    </el-form>
    <!-- 非法入侵 -->
     <el-form
      v-if="algName === 'person_illegal'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formillegaRules"
      ref="formillega"
      :model="formillega"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formillega.confidenceLevel"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >请输入0-1之间的数值,置信度越低,越容易触发告警</span
        >
      </el-form-item>
      <el-form-item label="告警间隔(秒)" prop="alarmInterval">
        <el-input
          v-model="formillega.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
      <el-form-item label="智能联动" prop="belt">
         <el-select
          v-model="formillega.belt"
          placeholder="请选择智能联动"
           class="inputStyle"
          @input="algorInput"
          clearable
        >
          <el-option  v-for="item in beltList" 
              :key="item.id" :label="item.deviceName"
            :value="item.id">
          </el-option>
         
        </el-select>
        
        <span class="algorithTips">请选择智能联动</span>
      </el-form-item>
       <el-form-item label="目标尺寸限制" prop="needFix">
        <el-select
          v-model="formillega.needFix"
          placeholder="请选择"
           class="inputStyle"
          @input="algorInput"
          @change="needChange"
          clearable
        >
          <el-option  v-for="item in needList" 
              :key="item.id" :label="item.name"
            :value="item.id">
          </el-option>
         
        </el-select>
        <span class="algorithTips">小于设定图形尺寸的目标不会判定为事件</span>
      </el-form-item>
      <el-form-item label="最小宽度" prop="width" v-if="widthheightshow">
        <el-input
          v-model="formillega.width"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips"></span>
      </el-form-item>
      <el-form-item label="最小高度" prop="height" v-if="widthheightshow">
        <el-input
          v-model="formillega.height"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips"></span>
      </el-form-item>
    </el-form>
    <!-- 人员摔倒 -->
    <el-form
      v-if="algName === 'person_fall'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formfallRules"
      ref="formfall"
      :model="formfall"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formfall.confidenceLevel"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >请输入0-1之间的数值,置信度越低,越容易触发告警</span
        >
      </el-form-item>
      <el-form-item label="告警间隔(秒)" prop="alarmInterval">
        <el-input
          v-model="formfall.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
      <el-form-item label="长宽比" prop="percentage">
        <el-input
        maxlength="10"
          v-model="formfall.percentage"
          class="inputStyle"
          @input="algorInput"
        ></el-input>
        
        <span class="algorithTips">请输入长宽比</span>
      </el-form-item>
       <el-form-item label="目标尺寸限制" prop="needFix">
        <el-select
          v-model="formfall.needFix"
          placeholder="请选择"
           class="inputStyle"
          @input="algorInput"
          @change="needChange"
          clearable
        >
          <el-option  v-for="item in needList" 
              :key="item.id" :label="item.name"
            :value="item.id">
          </el-option>
         
        </el-select>
        <span class="algorithTips">小于设定图形尺寸的目标不会判定为事件</span>
      </el-form-item>
      <el-form-item label="最小宽度" prop="width" v-if="widthheightshow">
        <el-input
          v-model="formfall.width"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips"></span>
      </el-form-item>
      <el-form-item label="最小高度" prop="height" v-if="widthheightshow">
        <el-input
          v-model="formfall.height"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips"></span>
      </el-form-item>
    </el-form>
    <!-- 车辆占道 -->
     <el-form
      v-if="algName === 'car_captured'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formCarRules"
      ref="formCar"
      :model="formCar"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formCar.confidenceLevel"
          @change="handleChange"
          onkeydown="value=value.replace(/^0[0-9]|^[2-9]|^1[0-9]|^1\.|[^\d.]/g,'')"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >请输入0-1之间的数值,置信度越低,越容易触发告警</span
        >
      </el-form-item>
      <el-form-item label="告警间隔(秒)" prop="alarmInterval">
        <el-input
          v-model="formCar.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
      <el-form-item label="徘徊时间(秒)" prop="wanderTime">
        <el-input
          v-model="formCar.wanderTime"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">请设置车辆占道的时间</span>
      </el-form-item>
       <el-form-item label="目标尺寸限制" prop="needFix">
        <el-select
          v-model="formCar.needFix"
          placeholder="请选择"
           class="inputStyle"
          @input="algorInput"
          @change="needChange"
          clearable
        >
          <el-option  v-for="item in needList" 
              :key="item.id" :label="item.name"
            :value="item.id">
          </el-option>
         
        </el-select>
        <span class="algorithTips">小于设定图形尺寸的目标不会判定为事件</span>
      </el-form-item>
      <el-form-item label="最小宽度" prop="width" v-if="widthheightshow">
        <el-input
          v-model="formCar.width"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips"></span>
      </el-form-item>
      <el-form-item label="最小高度" prop="height" v-if="widthheightshow">
        <el-input
          v-model="formCar.height"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips"></span>
      </el-form-item>
    </el-form>
     <!-- 人员徘徊 -->
     <el-form
      v-if="algName === 'person_wander'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formWanderRules"
      ref="formWander"
      :model="formWander"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formWander.confidenceLevel"
          @change="handleChange"
          onkeydown="value=value.replace(/^0[0-9]|^[2-9]|^1[0-9]|^1\.|[^\d.]/g,'')"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >请输入0-1之间的数值,置信度越低,越容易触发告警</span
        >
      </el-form-item>
      <el-form-item label="告警间隔(秒)" prop="alarmInterval">
        <el-input
          v-model="formWander.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
      <el-form-item label="徘徊时间(秒)" prop="wanderTime">
        <el-input
          v-model="formWander.wanderTime"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">请设置人员徘徊的时间</span>
      </el-form-item>
    </el-form>
    <!-- 人脸识别 -->
    <el-form
      v-if="algName === 'face'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formFaceRules"
      ref="formFace"
      :model="formFace"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formFace.confidenceLevel"
          @change="handleChange"
          onkeydown="value=value.replace(/^0[0-9]|^[2-9]|^1[0-9]|^1\.|[^\d.]/g,'')"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >请输入0-1之间的数值,置信度越低,越容易触发告警</span
        >
      </el-form-item>
      <el-form-item label="人脸库" prop="face">
        <el-select
          v-model="formFace.face"
          placeholder="请选择活动区域"
          class="inputStyle"
          @input="algorInput"
        >
        <el-option 
        v-for="(item,index) in faceList" 
        :key="index" 
        :label="item.name" 
        :value="item.number">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="告警逻辑" prop="alarmLogic">
        <el-select
          v-model="formFace.alarmLogic"
          placeholder="请选择活动区域"
           class="inputStyle"
          @input="algorInput"
        >
          <el-option label="命中告警" value="命中告警"></el-option>
          <el-option label="未命中告警" value="未命中告警"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="告警间隔(秒)" prop="alarmInterval">
        <el-input
          v-model="formFace.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
    </el-form>
    <!-- 人脸抓拍 -->
    <el-form
      v-if="algName === 'face_captured'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formFaceCapturedRules"
      ref="formFaceCaptured"
      :model="formFaceCaptured"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formFaceCaptured.confidenceLevel"
          @change="handleChange"
          onkeydown="value=value.replace(/^0[0-9]|^[2-9]|^1[0-9]|^1\.|[^\d.]/g,'')"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >请输入0-1之间的数值,置信度越低,越容易触发告警</span
        >
      </el-form-item>
      <el-form-item label="人脸库" prop="face">
        <el-select
          v-model="formFaceCaptured.face"
          placeholder="请选择人脸库"
          class="inputStyle"
          @input="algorInput"
        >
         <el-option 
          v-for="(item,index) in faceList" 
          :key="index" 
          :label="item.name" 
          :value="item.number">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="抓拍间隔(秒)" prop="capturedInterval">
        <el-input
          v-model="formFaceCaptured.capturedInterval"
          class="inputStyle"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复抓拍</span>
      </el-form-item>
    </el-form>
    <!-- 设备检测-->
    <el-form
      v-if="algName === 'belt'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formBeltRules"
      ref="formBelt"
      :model="formBelt"
      size="mini"
    >
     
      <el-form-item label="输出时间(秒)" prop="alarmInterval">
        <el-input
          v-model="formBelt.alarmInterval"
          class="inputStyle"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">设定输出设备状态的时间间隔,最低不小于3s</span>
      </el-form-item>
    </el-form>
     <!-- 睡岗检测 -->
    <el-form
      v-if="algName === 'person_sleep'"
      :label-position="labelPosition"
      label-width="140px"
      :rules="formDetectionRules"
      ref="formDetection"
      :model="formDetection"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formDetection.confidenceLevel"
          @change="handleChange"
          onkeydown="value=value.replace(/^0[0-9]|^[2-9]|^1[0-9]|^1\.|[^\d.]/g,'')"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >请输入0-1之间的数值,置信度越低,越容易触发告警</span
        >
      </el-form-item>
     
      <el-form-item label="睡岗判定时间(分钟)" prop="sleepTime">
        <el-input
          v-model="formDetection.sleepTime"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
      </el-form-item>
      <el-form-item label="告警间隔(分钟)" prop="alarmInterval">
        <el-input
          v-model="formDetection.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
    </el-form>
    <!-- 离岗检测 -->
    <el-form
      v-if="algName === 'person_leave'"
      :label-position="labelPosition"
      label-width="120px"
      :rules="formPersonLeaveRules"
      ref="formPersonLeave"
      :model="formPersonLeave"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formPersonLeave.confidenceLevel"
          @change="handleChange"
          onkeydown="value=value.replace(/^0[0-9]|^[2-9]|^1[0-9]|^1\.|[^\d.]/g,'')"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips">请输入算法的识别精度</span>
      </el-form-item>
      <el-form-item label="检测人数" prop="number">
        <el-input
          v-model="formPersonLeave.number"
          class="inputStyle"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">小于设定人数则判断有人员离岗</span>
      </el-form-item>
      <el-form-item label="离岗时间(分钟)" prop="leaveTime">
        <el-input
          v-model="formPersonLeave.leaveTime"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">连续多长时间岗位空缺则判断为离岗</span>
      </el-form-item>
      <el-form-item label="告警间隔(分钟)" prop="alarmInterval">
        <el-input
          v-model="formPersonLeave.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
    </el-form>
       <!--  杂物占道-->
    <el-form
      v-if="algName === 'deep_lab'"
      :label-position="labelPosition"
      label-width="130px"
      :rules="formDeepLabRules"
      ref="formDeepLab"
      :model="formDeepLab"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formDeepLab.confidenceLevel"
          @change="handleChange"
          onkeydown="value=value.replace(/^0[0-9]|^[2-9]|^1[0-9]|^1\.|[^\d.]/g,'')"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips">请输入0-1之间的数值,置信度越低,越容易触发告警</span>
      </el-form-item>
    
      <el-form-item label="占道判定时间(分钟)" prop="occupyTime">
        <el-input
          v-model="formDeepLab.occupyTime"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <!-- <span class="algorithTips">连续多长时间岗位空缺则判断为离岗</span> -->
      </el-form-item>
        <el-form-item label="占道画面比例(%)" prop="number">
        <el-input
          v-model="formDeepLab.number"
          class="inputStyle"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">杂物画面占视频画面最小告警比例</span>
      </el-form-item>
      <el-form-item label="告警间隔(分钟)" prop="alarmInterval">
        <el-input
          v-model="formDeepLab.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
    </el-form>
     <!-- 灭火器 -->
      <el-form
      v-if="algName === 'extinguisher'||algName === 'exbox'"
      :label-position="labelPosition"
      label-width="140px"
      :rules="formExtingRules"
      ref="formExting"
      :model="formExting"
      size="mini"
    >
      <el-form-item label="置信度" prop="confidenceLevel">
        <el-input
          v-model="formExting.confidenceLevel"
          @change="handleChange"
          onkeydown="value=value.replace(/^0[0-9]|^[2-9]|^1[0-9]|^1\.|[^\d.]/g,'')"
          @input="algorInput"
          class="inputStyle"
        ></el-input>
        <span class="algorithTips"
          >请输入0-1之间的数值,置信度越低,越容易触发告警</span
        >
      </el-form-item>
     
      <el-form-item label="告警间隔(分钟)" prop="alarmInterval">
        <el-input
          v-model="formExting.alarmInterval"
          class="inputStyle"
          onkeydown="value=value.replace(/^(0+)|[^\d]+/g,'')"
          @input="algorInput"
        ></el-input>
        <span class="algorithTips">在设定时间内同一算法不会重复告警</span>
      </el-form-item>
    </el-form>
     
      <el-button size="small" class="btn" @click="reduction">还原默认值</el-button>
  </div>
</template>

<script>
import { getAlgorithm,getBeltList } from "@/api/ai/newScenarioManagement.js";
import { getfaceInfo } from "@/api/ai/algorithmManage.js";
import { log } from 'mathjs';
export default {
  props: {
    algId: {
      type: String,
      default: "",
    },
    algParam: {
      type: String,
      default: "",
    },
    item: {
      type: Object,
      default: {},
    },
  },
  watch: {
    item: {
      handler(val) {
        if(val){
          // console.log('this.algorithmList',this.algorithmList);
          if(this.algorithmList && this.algorithmList.length !== 0){
            this.algorithmList.map((item) => { 
             
              if (val.algId === item.id) {
                this.algName = item.code;
                return;
              }
            });
          }else{
            this.algName = val.algCode
          }
          if (!val.algParam) {
            this.$store.state.algorParameter = this.initData();
            if(this.algName === 'face'){
              this.formFace.face = this.faceList[0];
              this.$store.state.algorParameter =  this.formFace;
            }else if(this.algName === 'face_captured'){
              this.formFaceCaptured.face = this.faceList[0];
              this.$store.state.algorParameter =  this.formFaceCaptured
            }else if(this.algName==='belt'){
              this.$store.state.algorParameter =  this.formBelt
            }else if(this.algName === 'person_illegal' ) {
              if(this.formillega.needFix === '0'){
                this.widthheightshow = false
              }else{
                this.widthheightshow = true
              }
            }else if(this.algName === 'person_fall' ) {
              if(this.formfall.needFix === '0'){
                this.widthheightshow = false
              }else{
                this.widthheightshow = true
              }
            }else if(this.algName === 'car_captured'){
              if(this.formCar.needFix === '0'){
                this.widthheightshow = false
              }else{
                this.widthheightshow = true
              }
            }
          } else {
            this.$store.state.algorParameter = eval(
              "(" + val.algParam + ")"
            );
            this.initDataSecond();
            if(this.algName === 'person_illegal' ) {
              if(this.formillega.needFix === '0'){
                this.widthheightshow = false
              }else{
                this.widthheightshow = true
              }
            }else if(this.algName === 'person_fall') {
              if(this.formfall.needFix === '0'){
                this.widthheightshow = false
              }else{
                this.widthheightshow = true
              }
            } else if(this.algName === 'car_captured'){
              if(this.formCar.needFix === '0'){
                this.widthheightshow = false
              }else{
                this.widthheightshow = true
              }
            }
          } 
        }
       
      },
      immediate: true,
      deep: true,
    },
    algParam: {
      handler(newVal, oldVal) {},
    },
    algId: {
      handler(newVal, oldVal) {
        this.algId = newVal;
        this.algorithmList &&
          this.algorithmList.map((item) => {
            if (this.algId === item.id) {
              this.algName = item.code;
              return;
            }
          });
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    var checkConfidence = (rule, value, callback) => {
       let reg = /^(0.\d+|0|1)$/;
          if (!reg.test(value)) {
            callback(new Error('请输入正确的置信度'));
          }else{
            callback();
          }
     
      };
      var checkPercent = (rule, value, callback) => {
       let reg = /^(\d(\.\d{1,10})?|10)$/;
          if (!reg.test(value)) {
            callback(new Error('请输入0-10之间的数'));
          }else{
            callback();
          }
     
      };
    return {
      needList:[
        {
          id:"1",
          name:'是'
        },
        {
          id:"0",
          name:'否'
        }
      ],
      widthheightshow:false,
      beltList:[],
      formillegaRules:{
         confidenceLevel: [
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
        alarmInterval: [
          { required: true, message: "请输入告警间隔(秒)", trigger: "blur" },
        ],
        belt:[
          { required: false, message: "请选择智能联动", trigger: "change" },
        ],
        needFix:[
          { required: true, message: "请选择目标尺寸限制", trigger: "change" },
        ],
        width:[
          { required: true, message: "请输入最小宽度", trigger: "blur" },
        ],
        height:[
          { required: true, message: "请输入最小高度", trigger: "blur" },
        ],
      },
      formfallRules:{
         confidenceLevel: [
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
        alarmInterval: [
          { required: true, message: "请输入告警间隔(秒)", trigger: "blur" },
        ],
        percentage:[
          { required: false, trigger: "blur",validator: checkPercent },
        ],
        needFix:[
          { required: true, message: "请选择目标尺寸限制", trigger: "change" },
        ],
        width:[
          { required: true, message: "请输入最小宽度", trigger: "blur" },
        ],
        height:[
          { required: true, message: "请输入最小高度", trigger: "blur" },
        ],
      },
      formillega:{
         confidenceLevel:0,
         alarmInterval:10,
         belt:'',
         needFix:'0'
      },
      formfall:{
         confidenceLevel:0,
         alarmInterval:10,
         needFix:'0',
         percentage:'',
      },
      formDensity:{
        confidenceLevel:0,
        alarmNum:10,
        alarmInterval:10,
      },
      formDensityRules:{
        confidenceLevel: [
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
        alarmNum:[
          { required: true, message: "请输入告警人数", trigger: "blur" },
        ],
        alarmInterval: [
          { required: true, message: "请输入告警间隔(秒)", trigger: "blur" },
        ],
      },
      formGather:{
        confidenceLevel:0,
        alarmNum:10,
        alarmInterval:10,
      },
      formGatherRules:{
        confidenceLevel: [
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
        alarmNum:[
          { required: true, message: "请输入告警人数", trigger: "blur" },
        ],
        alarmInterval: [
          { required: true, message: "请输入告警间隔(秒)", trigger: "blur" },
        ],
      },
      formBelt:{
        alarmInterval: 10,
      },
      formBeltRules:{
        alarmInterval: [
          { required: true, message: "请输入告警间隔(秒)", trigger: "blur" },
        ],
      },
      formFire: {
        confidenceLevel: 0,
        alarmInterval: 10,
      },
      faceList:[],
      formFireRules: {
        confidenceLevel: [
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
        alarmInterval: [
          { required: true, message: "请输入告警间隔(秒)", trigger: "blur" },
        ],
      },
      formPersonIllegal: {
        confidenceLevel: 0,
        alarmInterval: 10,
      },
      formFace: {
        confidenceLevel: 0,
        face: "",
        alarmLogic: "命中告警",
        alarmInterval: 10,
      },
      formFaceRules: {
        face: [{ required: true, message: "请选择人脸库", trigger: "change" }],
        alarmLogic: [
          { required: true, message: "请选择告警逻辑", trigger: "change" },
        ],
        alarmInterval: [
          { required: true, message: "请输入告警间隔(秒)", trigger: "blur" },
        ],
         confidenceLevel: [
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
      },
      formCar: {
       confidenceLevel:0,
       alarmInterval:10,
       wanderTime:10,
       needFix:'0'
      },
      formCarRules: { 
        needFix:[
          { required: true, message: "请选择目标尺寸限制", trigger: "change" },
        ],
        confidenceLevel:[
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
         alarmInterval: [
          { required: true, message: "请输入告警间隔(秒)", trigger: "blur" },
        ],
         wanderTime: [
          { required: true, message: "", trigger: "blur" },
        ],
        width:[
          { required: true, message: "请输入最小宽度", trigger: "blur" },
        ],
        height:[
          { required: true, message: "请输入最小高度", trigger: "blur" },
        ],
       
      },
      formFaceCaptured: {
        confidenceLevel: 0,
        face: "",
        capturedInterval: 10,
        alarmLogic: "命中告警",
      },
      formFaceCapturedRules: { 
        face:[
         { required: true, message: "请选择人脸库", trigger: "change" },
        ],
        capturedInterval: [
          { required: true, message: "请输入抓拍间隔(秒)", trigger: "blur" },
        ],
        confidenceLevel: [
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
       
      },
      formPersonLeave: {
        confidenceLevel: 0,
        number: 10,
        leaveTime: 10,
        alarmInterval: 10,
      },
      formPersonLeaveRules: {
        number: [
          { required: true, message: "请输入检测人数", trigger: "blur" },
        ],
        leaveTime: [
          { required: true, message: "请输入离岗时间(分钟)", trigger: "blur" },
        ],
        alarmInterval: [
          { required: true, message: "请输入告警间隔(分钟)", trigger: "blur" },
        ],
         confidenceLevel: [
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
      },
        formDeepLab: {
        confidenceLevel: 0,
        number: 10,
        occupyTime: 0,
        alarmInterval: 10,
      },
      formDeepLabRules: {
        number: [
          { required: true, message: "请输入占道画面比例", trigger: "blur" },
          {pattern: /^([0-9][0-9]{0,1}|99)$/, message: "仅可输入数字在0-100直接", trigger: "blur"}
        ],
        occupyTime: [
          { required: true, message: "请输入占道判定(分钟)", trigger: "blur" },
        ],
        alarmInterval: [
          { required: true, message: "请输入告警间隔(分钟)", trigger: "blur" },
        ],
         confidenceLevel: [
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
      },
      formWanderRules:{
        confidenceLevel:[
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
         alarmInterval: [
          { required: true, message: "请输入告警间隔(秒)", trigger: "blur" },
        ],
         wanderTime: [
          { required: true, message: "请输入徘徊时间(秒)", trigger: "blur" },
        ],
      },
      formWander:{
       confidenceLevel:0,
       alarmInterval:10,
       wanderTime:10
      },
      formDetection:{
        confidenceLevel:0,
        sleepTime:10,
        alarmInterval:10
      },
      formDetectionRules:{
        confidenceLevel:[
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
          sleepTime: [
          { required: true, message: "请输入睡岗判定时间(分钟)", trigger: "blur" },
        ],
         alarmInterval: [
          { required: true, message: "请输入告警间隔(分钟)", trigger: "blur" },
        ],
      },
      formExting:{
         confidenceLevel:0,
         alarmInterval:10
      },
      formExtingRules:{
         confidenceLevel:[
          { required: false, trigger: "blur",validator: checkConfidence },
        ],
         alarmInterval: [
          { required: true, message: "请输入告警间隔(分钟)", trigger: "blur" },
        ],
      },
      algorithmList: [],
      algName: "",
      labelPosition: "right",
    };
  },
  created() {
    this.getFace();
    this.getData();
  },
  beforeDestroy(){
    this.$bus.$off('basicValidSuccess')
    this.$bus.$off('basicValid')
  },
  mounted() {
    this.$bus.$on('basicValid',()=>{
       switch (this.algName) {
        case "belt":
          this.$refs.formBelt.validate((valid) => {
            if(valid){
               this.$bus.$emit('basicValidSuccess')
            }else{
              this.$message.error('请完成算法参数!')
            }
          })
         break;
        case "fire":
          
           this.$refs.formFire.validate((valid) => {
             if(valid){
                this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
            case "smoke":
           this.$refs.formFire.validate((valid) => {
             if(valid){
                this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
         case "person":
           this.$refs.formFire.validate((valid) => {
             if(valid){
                this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
        case "person_illegal":
          this.$refs.formillega.validate((valid) => {
             if(valid){
                this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
          case "person_fall":
          this.$refs.formfall.validate((valid) => {
             if(valid){
                this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
        case "face":
          this.$refs.formFace.validate((valid) => {
             if(valid){
                this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
        case "face_captured":
           this.$refs.formFaceCaptured.validate((valid) => {
             if(valid){
                this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
        case "person_leave":
           this.$refs.formPersonLeave.validate((valid) => {
             if(valid){
               this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
             case "deep_lab":
           this.$refs.formDeepLab.validate((valid) => {
             if(valid){
               this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
       case "person_sleep":
           this.$refs.formDetection.validate((valid) => {
             if(valid){
               this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
      case "person_wander":
         this.$refs.formWander.validate((valid) => {
             if(valid){
               this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
          break;
       case "extinguisher":
         this.$refs.formExting.validate((valid) => {
             if(valid){
               this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
        break;
         case "exbox":
         this.$refs.formExting.validate((valid) => {
             if(valid){
               this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
        break;
        case "car_captured":
         this.$refs.formCar.validate((valid) => {
             if(valid){
               this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
        break;
         case "person_density":
         this.$refs.formDensity.validate((valid) => {
             if(valid){
               this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
        break;
         case "person_gather":
         this.$refs.formGather.validate((valid) => {
             if(valid){
               this.$bus.$emit('basicValidSuccess')
             }else{
               this.$message.error('请完成算法参数!')
             }
           })
        break;
      }
      
    })
  },
  methods: {
    needChange(val){
      if(val === '0'){
        this.widthheightshow = false
      }else{
         this.widthheightshow = true
      }
    },
     getData() {
  
      getBeltList()
        .then((res) => {
          if(res.result){
            this.beltList = res.result;

          }
        })
        .catch();
     },
    reduction(){
      this.initDataThird();
      //  if (!this.item.algParam) {
      //       this.initDataThird();
      //     } else {
      //       this.$store.state.algorParameter = eval(
      //         "(" + this.item.algParam + ")"
      //       );
      //       this.initDataSecond();
      //     }
    },
    
    getFace(){
       getfaceInfo()
        .then((res) => {
          this.fetchData();
          if(res.result){
            this.faceList = res.result;
           
          }
           
        })
        .catch();
    },

    algorInput() {
      this.$store.state.algorParameter = this.initData();
    },

    initData() {
      switch (this.algName) {
        case "belt":
          return this.formBelt;
          break;
        case "fire":
          return this.formFire;
          break;
        case "smoke":
          return this.formFire;
          break;
        case "person":
          return this.formFire;
        break;
        case "person_illegal":
          return this.formillega;
          break;
          case "person_fall":
          return this.formfall;
          break;
        case "face":
          return this.formFace;
          break;
        case "face_captured":
          return this.formFaceCaptured;
          break;
        case "person_leave":
          return this.formPersonLeave;
          break;
             case "deep_lab":
          return this.formDeepLab;
          break;
        case "person_sleep":
           return this.formDetection;
        break;
        case "person_wander":
          return this.formWander;
        break;
        case "extinguisher":
          return this.formExting;
        break;
          case "exbox":
          return this.formExting;
        break;
        case "car_captured":
          return this.formCar;
        break;
        case "person_density":
          return this.formDensity;
        break;
         case "person_gather":
          return this.formGather;
        break;
      }
    },
    initDataSecond() {
      switch (this.algName) {
        case "belt":
          this.formBelt = eval("(" + this.item.algParam + ")");
          break;
        case "fire":
          this.formFire = eval("(" + this.item.algParam + ")");
          break;
             case "smoke":
          this.formFire = eval("(" + this.item.algParam + ")");
          break;
        case "person":
          this.formFire = eval("(" + this.item.algParam + ")");
        break;
        case "person_illegal":
          this.formillega = eval("(" + this.item.algParam + ")");
          break;
          case "person_fall":
          this.formfall = eval("(" + this.item.algParam + ")");
          break;
        case "face":
          this.formFace = eval("(" + this.item.algParam + ")");
          break;
        case "face_captured":
          this.formFaceCaptured = eval("(" + this.item.algParam + ")");
          break;
        case "person_leave":
          this.formPersonLeave = eval("(" + this.item.algParam + ")");
          break;
          case "deep_lab":
          this.formDeepLab = eval("(" + this.item.algParam + ")");
          break;
        case "person_sleep":
          this.formDetection = eval("(" + this.item.algParam + ")");
        break;
        case "person_wander":
          return this.formWander = eval("(" + this.item.algParam + ")");
        break;
        case "extinguisher":
          return this.formExting = eval("(" + this.item.algParam + ")");
        break;
        case "exbox":
          return this.formExting = eval("(" + this.item.algParam + ")");
        break;
        case "car_captured":
          return this.formCar = eval("(" + this.item.algParam + ")");
        break;
        case "person_density":
          return this.formDensity = eval("(" + this.item.algParam + ")");
        break;
         case "person_gather":
          return this.formGather= eval("(" + this.item.algParam + ")");
        break;
      }
    },
   
    initDataThird() {
      switch (this.algName) {
        case "belt":
          this.formBelt ={
            alarmInterval:10
          };
          this.$store.state.algorParameter = this.formFire;
        break;
        case "fire":
          this.formFire = {
            confidenceLevel: 0,
            alarmInterval: 10,
          };
           this.$store.state.algorParameter = this.formFire;
          break;
            case "smoke":
          this.formFire = {
            confidenceLevel: 0,
            alarmInterval: 10,
          };
           this.$store.state.algorParameter = this.formFire;
          break;
         case "person":
          this.formFire = {
            confidenceLevel: 0,
            alarmInterval: 10,
          };
           this.$store.state.algorParameter = this.formFire;
          break;
        case "person_illegal":
          this.formillega = {
            confidenceLevel: 0,
            alarmInterval: 10,
            belt:'',
            needFix:'0'
          };
           this.$store.state.algorParameter = this.formillega;
           this.widthheightshow = false
          break;
          case "person_fall":
          this.formfall = {
            confidenceLevel: 0,
            alarmInterval: 10,
            needFix:'0',
            percentage:'',
          };
           this.$store.state.algorParameter = this.formfall;
           this.widthheightshow = false
          break;
        case "face":
          this.formFace = {
            confidenceLevel: 0,
            face: this.faceList && this.faceList[0],
            alarmLogic: "命中告警",
            alarmInterval: 10,
          };
          this.$store.state.algorParameter = this.formFace; 
          break;
        case "face_captured":
          this.formFaceCaptured = {
             confidenceLevel: 0,
             face: this.faceList && this.faceList[0],
             capturedInterval: 10,
             alarmLogic: "命中告警",
          };
           this.$store.state.algorParameter= this.formFaceCaptured;
          break;
        case "person_leave":
          this.formPersonLeave = {
            confidenceLevel: 0,
            number: 10,
            leaveTime: 10,
            alarmInterval: 10,
          };
          this.$store.state.algorParameter =this.formPersonLeave;
          break;
           case "deep_lab":
          this.formDeepLab = {
            confidenceLevel: 0,
            number: 10,
            occupyTime: 0,
            alarmInterval: 10,
          };
          this.$store.state.algorParameter =this.formDeepLab;
          break;
        case "person_sleep":
          this.formDetection = {
            confidenceLevel:0,
            sleepTime:10,
            alarmInterval:10
        },
         this.$store.state.algorParameter =this.formDetection;
          break;
        case "person_wander":
          this.formWander = {
            confidenceLevel:0,
            wanderTime:10,
            alarmInterval:10
        },
         this.$store.state.algorParameter =this.formWander;
          break; 
        case "extinguisher":
          return this.formExting = {
              confidenceLevel:0,
              alarmInterval:10
          };
          this.$store.state.algorParameter =this.formExting;
        break; 
          case "exbox":
          return this.formExting = {
              confidenceLevel:0,
              alarmInterval:10
          };
          this.$store.state.algorParameter =this.formExting;
        break; 
        case "car_captured":
          this.formCar = {
            confidenceLevel:0,
            wanderTime:10,
            alarmInterval:10,
            needFix:'0'
        },
         this.$store.state.algorParameter =this.formCar;
          this.widthheightshow = false
          break; 
        case "person_density":
          this.formDensity =  {
              confidenceLevel:0,
              alarmNum:10,
              alarmInterval:10
          };
        break;
         case "person_gather":
          return this.formGather= {
              confidenceLevel:0,
              alarmNum:10,
              alarmInterval:10
          };
        break;
      }
    },
    save() {
      this.$refs.formFire.validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    fetchData() {
      const params = {
        pageSize: 9999,
        pageNum: 1,
      };
      getAlgorithm(params)
        .then((res) => {
          this.algorithmList = res.result.list;
          this.algorithmList &&
            this.algorithmList.map((item) => {
        
              if (this.algId === item.id) {
                this.algName = item.code;
                return;
              }
            });
          if (!this.item.algParam) {
            this.$store.state.algorParameter = this.initData();
            if(this.algName === 'face'){
              this.formFace.face = this.faceList[0];
              this.$store.state.algorParameter =  this.formFace;
            }else if(this.algName === 'face_captured'){
              this.formFaceCaptured.face = this.faceList[0];
              this.$store.state.algorParameter =  this.formFaceCaptured
            }
          } else {
            this.$store.state.algorParameter = eval(
              "(" + this.item.algParam + ")"
            );
            this.initDataSecond();
          }
        })
        .catch();
    },
    handleChange(value) {},
  },
};
</script>

<style lang="scss" scoped>
.btn {
  margin-bottom:16px;
}
.tip {
  margin-left: 16px;
}
.inputStyle {
  width: 252px;
  margin-right: 16px;
}
.algorithTips {
  color: #0a1933;
  opacity: 0.5;
}
</style>