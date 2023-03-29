<template>
  <div class="border-demo-page">
    <div class="title">导航一</div>
    <CoolNavigation
      navTitle="工厂看板"
      widget="nav1"
      :menu="menu"
      :menuSize="[120, 34]"
      menuBgColor="#324156"
      textColor="#EFF0F6"
      defaultActiveMenu="/tool/tool-cut/tool-test0"
    ></CoolNavigation>
    <div class="title">导航二</div>
    <CoolNavigation
      class="nav2"
      navTitle="数字化工厂"
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
              meta: { icon: "el-icon-help", title: "菜单一" },
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
              meta: { icon: "el-icon-help", title: "菜单二" },
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
              meta: { icon: "el-icon-help", title: "菜单三" },
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
              meta: { icon: "el-icon-help", title: "菜单四" },
            },
          ],
        },
        {
          path: "/tool",
          redirect: "/tool-cut",
          meta: { icon: "el-icon-help", title: "菜单五" },
          children: [
            {
              name: "tool-cut",
              path: "tool-cut",
              meta: { icon: "el-icon-help", title: "菜单六" },
              children: [
                {
                  name: "tool-test0",
                  path: "tool-test0",
                  meta: { icon: "el-icon-help", title: "菜单七" },
                },
                {
                  name: "tool-test1",
                  path: "tool-test1",
                  meta: { icon: "el-icon-help", title: "菜单八" },
                },
              ],
            },
            {
              name: "tool-offset",
              path: "tool-offset",
              meta: { icon: "el-icon-help", title: "菜单九" },
            },
          ],
        },
        {
          path: "/yieldrate",
          redirect: "/yieldrate-group",
          meta: { icon: "el-icon-help", title: "菜单十" },
          children: [
            {
              name: "yieldrate-group",
              path: "yieldrate-group",
              meta: { icon: "el-icon-help", title: "菜单十一" },
            },
            {
              name: "yieldrate-item",
              path: "yieldrate-item",
              meta: { icon: "el-icon-help", title: "菜单十二" },
            },
            {
              name: "yieldrate-classify",
              path: "yieldrate-classify",
              meta: { icon: "el-icon-help", title: "菜单十三" },
            },
            {
              name: "yieldrate-all",
              path: "yieldrate-all",
              meta: { icon: "el-icon-help", title: "菜单十四" },
            },
            {
              name: "yieldrate-change",
              path: "yieldrate-change",
              meta: { icon: "el-icon-help", title: "菜单十五" },
            },
            {
              name: "mac-yieldrate",
              path: "mac-yieldrate",
              meta: { icon: "el-icon-help", title: "菜单十六" },
            },
          ],
        },
        {
          path: "/mac-status",
          redirect: "/mac-history-status",
          children: [
            {
              name: "mac-history-status",
              path: "mac-history-status",
              meta: { icon: "el-icon-help", title: "菜单十七" },
            },
          ],
        },
        {
          path: "/export",
          redirect: "/export-data",
          children: [
            {
              name: "export-data",
              path: "export-data",
              meta: { icon: "el-icon-help", title: "菜单十八" },
            },
          ],
        },
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
  .title {
    font-size: 21px;
    color: #fff;
  }
}
</style>