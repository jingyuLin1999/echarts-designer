<template>
  <div class="border-demo-page">
    <CoolNavigation
      navTitle="工厂看板"
      widget="nav1"
      :menu="menu"
      :menuSize="[120, 34]"
      menuBgColor="#324156"
      textColor="#EFF0F6"
      defaultActiveMenu="/tool/tool-cut/tool-test0"
    ></CoolNavigation>
    <CoolNavigation
      class="nav2"
      navTitle="声发射智慧管控平台"
      widget="nav2"
      :menu="menu"
      :menuSize="[120, 34]"
      menuBgColor="#324156"
      textColor="#EFF0F6"
      defaultActiveMenu="/product/product-status"
    >
      <template #logo> <span></span></template>
    </CoolNavigation>
  </div>
</template>

<script>
import CoolNavigation from "@/components/CoolNavigation";
export default {
  components: { CoolNavigation },
  data() {
    return {
      menu: [
        {
          path: "/",
          redirect: "/dashboard",
          children: [
            {
              name: "dashboard",
              path: "dashboard",
              meta: { icon: "el-icon-help", title: "OEE" },
            },
          ],
        },
        {
          path: "/oee",
          redirect: "/oee-calcu",
          children: [
            {
              name: "oee-calcu",
              path: "oee-calcu",
              meta: { icon: "el-icon-help", title: "OEE数据分析" },
            },
          ],
        },
        {
          path: "/mac",
          redirect: "/mac-status",
          children: [
            {
              name: "mac-status",
              path: "mac-status",
              meta: { icon: "el-icon-help", title: "设备生产状态" },
            },
          ],
        },
        {
          path: "/product",
          redirect: "/product-status",
          children: [
            {
              name: "product-status",
              path: "product-status",
              meta: { icon: "el-icon-help", title: "生产品质状态" },
            },
          ],
        },
        // {
        //   path: "/tool",
        //   redirect: "/tool-cut",
        //   meta: { icon: "el-icon-help", title: "刀具" },
        //   children: [
        //     {
        //       name: "tool-cut",
        //       path: "tool-cut",
        //       meta: { icon: "el-icon-help", title: "刀具切削监测" },
        //       children: [
        //         {
        //           name: "tool-test0",
        //           path: "tool-test0",
        //           meta: { icon: "el-icon-help", title: "TOOL_TEST0" },
        //         },
        //         {
        //           name: "tool-test1",
        //           path: "tool-test1",
        //           meta: { icon: "el-icon-help", title: "TOOL_TEST1" },
        //         },
        //       ],
        //     },
        //     {
        //       name: "tool-offset",
        //       path: "tool-offset",
        //       meta: { icon: "el-icon-help", title: "首件刀补监测" },
        //     },
        //   ],
        // },
        // {
        //   path: "/yieldrate",
        //   redirect: "/yieldrate-group",
        //   meta: { icon: "el-icon-help", title: "良品率" },
        //   children: [
        //     {
        //       name: "yieldrate-group",
        //       path: "yieldrate-group",
        //       meta: { icon: "el-icon-help", title: "小组良品率" },
        //     },
        //     {
        //       name: "yieldrate-item",
        //       path: "yieldrate-item",
        //       meta: { icon: "el-icon-help", title: "单项良率" },
        //     },
        //     {
        //       name: "yieldrate-classify",
        //       path: "yieldrate-classify",
        //       meta: { icon: "el-icon-help", title: "单机归类" },
        //     },
        //     {
        //       name: "yieldrate-all",
        //       path: "yieldrate-all",
        //       meta: { icon: "el-icon-help", title: "全分组良率" },
        //     },
        //     {
        //       name: "yieldrate-change",
        //       path: "yieldrate-change",
        //       meta: { icon: "el-icon-help", title: "良率变化" },
        //     },
        //     {
        //       name: "mac-yieldrate",
        //       path: "mac-yieldrate",
        //       meta: { icon: "el-icon-help", title: "设备良率分析" },
        //     },
        //   ],
        // },
        {
          path: "/mac-status",
          redirect: "/mac-history-status",
          children: [
            {
              name: "mac-history-status",
              path: "mac-history-status",
              meta: { icon: "el-icon-help", title: "机床历史状态" },
            },
          ],
        },
        // {
        //   path: "/export",
        //   redirect: "/export-data",
        //   children: [
        //     {
        //       name: "export-data",
        //       path: "export-data",
        //       meta: { icon: "el-icon-help", title: "数据导出" },
        //     },
        //   ],
        // },
        {
          path: "/echarts-designer",
          meta: { icon: "el-icon-help", title: "设计器", hidden: true },
        },
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
}
</style>