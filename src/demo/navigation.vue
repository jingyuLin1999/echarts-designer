<template>
  <div class="border-demo-page">
    <!-- <div class="title">导航一</div>
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
</CoolNavigation> -->
    <div class="title">导航三</div>
    <CoolNavigation class="nav3" navTitle="数字化工厂" widget="nav3" :menu="menu" :menuSize="menuSize" menuBgColor="#324156"
      textColor="#EFF0F6" :internation="false" defaultActiveMenu="/dashboard">
    </CoolNavigation>
  </div>
</template>

<script>
import CoolNavigation from "@/components/CoolNavigation";
export default {
  components: { CoolNavigation },
  data() {
    return {
      menuSize: [120, 34],
      menu: [
        {
          path: "/",
          redirect: "/dashboard",
          children: [
            {
              name: "dashboard",
              path: "dashboard",
              meta: { icon: "el-icon-help", title: "设备实时OEE" }, // menus.macRealtimeOee
            },
          ],
        },
        {
          path: "/oee",
          redirect: "/oee-calcu",
          meta: { icon: "el-icon-help", title: "OEE分析" }, // coolMenu1  OEE分析
          children: [
            {
              name: 'oee-shift',
              path: 'oee-shift',
              meta: { title: '工序班次OEE', icon: "el-icon-help" }
            },
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
          meta: { icon: "el-icon-help", title: "菜单二11" },
          children: [
            {
              name: "mac-status",
              path: "mac-status",
              meta: { icon: "el-icon-help", title: "菜单三" },
            },
            {
              name: "mac-history-status",
              path: "mac-history-status",
              meta: { icon: "el-icon-help", title: "menus.macRealtimeOee" },
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
                  children: [
                    {
                      name: "tool-test28",
                      path: "tool-test28",
                      meta: { icon: "el-icon-help", title: "菜单二八" },
                    },
                    {
                      name: "tool-test29",
                      path: "tool-test29",
                      meta: { icon: "el-icon-help", title: "菜单二九" },
                    },
                    {
                      name: "tool-test30",
                      path: "tool-test30",
                      meta: { icon: "el-icon-help", title: "菜单三十" },
                    },
                  ]
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
              children: [
                {
                  name: "tool-test33",
                  path: "tool-test33",
                  meta: { icon: "el-icon-help", title: "菜单33" },
                },
                {
                  name: "tool-test32",
                  path: "tool-test32",
                  meta: { icon: "el-icon-help", title: "菜单32" },
                },
                {
                  name: "tool-test31",
                  path: "tool-test31",
                  meta: { icon: "el-icon-help", title: "菜单三十一" },
                },
              ]
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
          path: "/export",
          redirect: "/export-data",
          meta: { icon: "el-icon-help", title: "菜单八一" },
          children: [
            {
              name: "export-82",
              path: "export-82",
              meta: { icon: "el-icon-help", title: "菜单82" },
            },
            {
              name: "export-80",
              path: "export-80",
              meta: { icon: "el-icon-help", title: "菜单八二" },
              children: [
                {
                  name: "export-81",
                  path: "export-81",
                  meta: { icon: "el-icon-help", title: "菜单81" },
                },
                {
                  name: "export-83",
                  path: "export-83",
                  meta: { icon: "el-icon-help", title: "菜单83" },
                },
              ],
            },
          ],
        },
        {
          name: "export-84",
          path: "/echarts-designer",
          meta: { icon: "el-icon-help", title: "设计器233", hidden: false },
          children: [
            {
              name: "export-85",
              path: "export-85",
              meta: { icon: "el-icon-help", title: "菜单8511111111111" },
            },
          ]
        },
        {
          name: "export-86",
          path: "/86menu",
          meta: { icon: "el-icon-help", title: "86菜单", hidden: false },
        },
        { path: '*', redirect: '/', hidden: true }
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

  // background: linear-gradient(
  //   90deg,
  //   #020c28 0,
  //   #0b1e62 30%,
  //   #0c2371 50%,
  //   #0b1e62 70%,
  //   #020c28 100%
  // );
  .title {
    font-size: 21px;
    color: #fff;
  }
}
</style>