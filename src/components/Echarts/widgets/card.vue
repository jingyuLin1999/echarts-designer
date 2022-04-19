<template>
  <div class="card-widget">
    <FlexBoxContainer
      :boxSize="[120, 108]"
      :style="styles"
      :margin="chartData.attribute.distance"
      @domResize="onDomResize"
    >
      <div
        class="card"
        v-for="(cardItem, index) in chartData.data"
        :key="index"
        @mouseover="cardIdx = index"
        @mouseout="cardIdx = -1"
      >
        <div
          class="card-icon"
          :style="{
            color: cardIdx == index ? '#fff' : cardItem.iconColor,
            background: cardIdx == index ? cardItem.iconColor : '',
          }"
        >
          <i :class="cardItem.icon"></i>
        </div>
        <div class="card-msg">
          <div
            class="msg-title"
            :style="{
              color:
                cardIdx == index
                  ? cardItem.iconColor
                  : chartData.attribute.titleColor,
              fontSize: chartData.attribute.titleSize,
            }"
          >
            {{ cardItem.title }}
          </div>
          <countTo
            :style="{
              color:
                cardIdx == index
                  ? cardItem.iconColor
                  : chartData.attribute.valueColor,
              fontSize: chartData.attribute.valueSize,
            }"
            class="msg-value"
            :startVal="0"
            :endVal="cardItem.value"
            :duration="2000"
          />
        </div>
      </div>
    </FlexBoxContainer>
  </div>
</template>
<script>
import countTo from "vue-count-to";
import BaseMixin from "./base.mixin";
import FlexBoxContainer from "@/components/FlexBoxContainer";
export default {
  name: "card",
  mixins: [BaseMixin],
  components: { countTo, FlexBoxContainer },
  data() {
    return {
      cardIdx: -1,
      height: 0,
    };
  },
  computed: {
    styles() {
      let { bgColor } = this.chartData.attribute;
      return {
        "--bgColor": bgColor,
      };
    },
  },
  methods: {
    defaultFieldAttr() {
      return {
        attribute: {
          bgColor: "",
          titleColor: "#8c8c8c",
          valueColor: "#333",
          titleSize: "15px",
          valueSize: "23px",
        },
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
    onDomResize({ height: newHeight, disHeight }) {
      // if (disHeight == 0) return;
      this.moveWidgetY(newHeight);
    },
  },
};
</script>
<style lang="scss">
.card-widget {
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bgColor);
    box-sizing: border-box;
    padding: 10px;
    .card-icon {
      width: 75px;
      height: 75px;
      font-size: 55px;
      border-radius: 8px;
      text-align: center;
    }
    .card-msg {
      width: calc(100% - 75px);
      height: 100%;
      min-width: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      .msg-title {
        font-size: 16px;
      }
      .msg-value {
        margin-top: 6px;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
</style>