<template>
  <div class="table-widget">
    <ready-table
      :showToolBar="chartData.data.showToolBar"
      :showToolBtns="chartData.data.showToolBtns"
      :colors="chartData.data.colors"
      :addConfig="chartData.data.addConfig"
      :deleteConfig="chartData.data.deleteConfig"
      :updateConfig="chartData.data.updateConfig"
      :selectConfig="chartData.data.selectConfig"
      :importConfig="chartData.data.importConfig"
      :token="chartData.data.token"
      :defaultProp="chartData.data.defaultProp"
      :formRules="chartData.data.formRules"
      :hooks="tableHooks"
      :fields="chartData.data.fields"
      :tableData="chartData.data.tableData"
      :showPageBar="chartData.data.showPageBar"
      :showCheckbox="chartData.data.showCheckbox"
      :showHeader="chartData.data.showHeader"
      :showSeq="chartData.data.showSeq"
    >
    </ready-table>
  </div>
</template>

<script>
import BaseMixin from "./base.mixin";
import { ReadyTable } from "ready-table";
export default {
  mixins: [BaseMixin],
  components: { ReadyTable },
  data() {
    return {
      tableHooks: {},
    };
  },
  methods: {
    defaultFieldAttr() {
      return {
        fields: [], // 字段
        showToolBtns: {
          // 按钮权限
          import: false,
          export: true,
          update: false,
          delete: false,
          search: false,
          add: false,
          refresh: true,
          exportable: {
            filter: false,
          },
        },
        colors: {
          // 颜色
          theme: "#0D194B",
          fontColor: "#37D0FA",
          btnColor: "#F8F4F4",
          btnBgColor: "#232B60",
          activeColor: "#4F9FFE",
          dateRangeBgColor: "#999",
          multiOptionBgColor: "#ddd",
          tableBorderColor: "#4780BA",
        },
        addConfig: {},
        deleteConfig: {},
        updateConfig: {},
        selectConfig: {},
        importConfig: {},
        token: {
          key: "",
          value: "",
          baseUrl: "",
        },
        defaultProp: {
          data: "",
          total: "",
        },
        formRules: {},
        tableData: [], // 数据
        showToolBar: true,
        showPageBar: true,
        showCheckbox: true,
        showHeader: true,
      };
    },
  },
};
</script>

<style lang="scss">
</style>