<template>
  <div class="border-demo-page">
    <CoolNavigation
      class="border-demo"
      navTitle="工厂看板"
      widget="nav1"
      :menu="menu"
      :menuSize="[120, 34]"
    ></CoolNavigation>
  </div>
</template>

<script>
import CoolNavigation from "../components/CoolNavigation";
export default {
  components: { CoolNavigation },
  data() {
    return {
      menu: [
        { title: "OEE", path: "/echarts" },
        { title: "OEE数据分析", path: "/echarts1" },
        { title: "设备生产状态", path: "/echarts3" },
        { title: "生产品质状态", path: "/echarts4" },
        { title: "刀具切削监测", path: "/echarts5" },
        { title: "首件刀补监测", path: "/echarts6" },
        { title: "小组良品率", path: "/echarts7" },
        { title: "单项良率", path: "/echarts8" },
        { title: "单机归类", path: "/echarts9" },
        { title: "全分组良率", path: "/echarts10" },
        { title: "良率变化", path: "/echarts11" },
        { title: "设备良率分析", path: "/echarts12" },
        { title: "机床历史状态", path: "/echarts14" },
        { title: "数据导出", path: "/echarts15" },
      ],
    };
  },
};
</script>

<style lang="scss">
.border-demo-page {
  width: 100%;
  height: 100%;
  background: #061f57;
  .border-demo {
    width: 100%;
    height: 65px;
    background: #061f57;
  }
}
</style>