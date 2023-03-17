<template>
  <div class="detail">
    <div v-if="showNum" class="detail-num">{{ data.number }}</div>
    <div class="detail-msg">
      <span class="detail-title">{{ data.title }}</span>
      <img :src="isUp(data.odds) ? arrowsPic.up : arrowsPic.down" class="detail-icon">
      <span :class="isUp(data.odds) ? 'detail-odds detail-odds-up' : 'detail-odds detail-odds-down'">
        {{ deleteMinusSign(data.odds) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: {
    data: {
      type: Object,
      default: () => ({
        number: 0,
        title: '',
        odds: ''
      })
    },
    showNum: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 箭头图标
      arrowsPic: {
        up: require('@/assets/img/left/up-arrow.svg'),
        down: require('@/assets/img/left/down-arrow.svg')
      }
    }
  },
  methods: {
    // 判断是否是上升
    isUp(num) {
      return num[0] !== '-'
    },
    // 去除负数前的符号
    deleteMinusSign(num) {
      return num[0] === '-' ? num.slice(1) : num
    }
  }
}
</script>

<style scoped lang="scss">
.detail {
  position: absolute;
  &-num {
    font-size: 1.4vw;
    color: #5CA4FF;
    font-weight: 700;
    margin-bottom: 5%;
  }
  &-msg {
    display: flex;
    .detail-title {
      flex: 1;
      display: inline-block;
      color: #FFFFFF;
      font-size: 0.5vw;
      font-weight: 500;
    }
    .detail-icon {
      font-size: 0.3vw;
      display: inline-block;
    }
    .detail-odds {
      display: inline-block;
      font-size: 0.3vw;
      font-weight: 600;
      &-up {
        color: #8EEC80;
      }
      &-down {
        color: #FF6B64;
      }
    }
  }
}
</style>