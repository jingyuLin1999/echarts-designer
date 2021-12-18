<template>
  <div
    class="card-wrapper"
    :style="{
      background: echarts.background,
    }"
  >
    <div
      class="card"
      v-for="(cardItem, index) in chartData.data"
      :key="index"
      :style="{
        background: echarts.theme,
        marginRight: `${chartData.distance}px`,
        width: 100 / (chartData.data.length || 1) + '%',
      }"
    >
      <div
        class="card-icon"
        :style="{
          color: cardIdx == index ? '#fff' : cardItem.iconColor,
          background: cardIdx == index ? cardItem.iconColor : '',
        }"
        @mouseover="cardIdx = index"
        @mouseout="cardIdx = -1"
      >
        <i :class="cardItem.icon"></i>
      </div>
      <div class="card-msg-wrapper">
        <div
          class="card-title"
          :style="{
            color: chartData.titleColor,
            fontSize: chartData.titleSize,
          }"
        >
          {{ cardItem.title }}
        </div>
        <div
          class="card-value"
          :style="{
            color: chartData.valueColor,
            fontSize: chartData.valueSize,
          }"
        >
          <count-to
            :startVal="0"
            :endVal="cardItem.value"
            :duration="2000"
          ></count-to>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseMixin from "../utils/base.mixin";
import countTo from "vue-count-to";
export default {
  name: "card",
  mixins: [BaseMixin],
  components: { countTo },
  data() {
    return {
      cardIdx: -1,
    };
  },
  methods: {
    defaultFieldAttr() {
      return {
        titleColor: "#8c8c8c",
        valueColor: "#333",
        titleSize: "15px",
        valueSize: "23px",
        data: [
          {
            title: "卡片标题",
            icon: "el-icon-user-solid",
            iconColor: "#4FCAC6",
            value: 666,
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.card-wrapper {
  width: 99.8%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  > .card {
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    box-sizing: border-box;
    > .card-icon {
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 60px;
      align-items: center;
    }
    > .card-icon:hover {
      border-radius: 10px;
    }
    > .card-msg-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-weight: 600;
      > .card-title {
        color: #8c8c8c;
        font-size: 15px;
      }
      > .card-value {
        margin-top: 12px;
        color: #333;
        font-size: 23px;
      }
    }
  }
  > .card:last-child {
    margin-right: 0 !important;
  }
}
</style>