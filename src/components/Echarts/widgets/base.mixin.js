import Base from "./base.vue";
import { chartApi, isUrl, strToObj } from "../utils";
import { mergeDeepRight } from "ramda";
export default {
    components: { Base },
    props: {
        chartData: { type: Object, default: () => ({}) },
        design: { type: Boolean, default: true }, // 是否是设计模式
        hooks: { type: Object, default: () => ({}) },
        echarts: { type: Object, default: () => ({}) },
    },
    watch: {
        "chartData.dataSource": {
            handler(newVal, oldVal) {
                this.pickAsyncData();
            },
            deep: true,
        },
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            this.$setFieldAttr();
            this.pickAsyncData();
        },
        $setFieldAttr() {
            const defaultFieldAttr = this.defaultFieldAttr();
            const mergeData = mergeDeepRight(defaultFieldAttr, this.chartData);
            Object.assign(this.chartData, mergeData)
        },
        async pickAsyncData() {
            const asyncPaths = this.chartData.dataSource;
            if (!asyncPaths.length) return;
            const promiseAll = [];
            this.chartData.responseData = {};
            asyncPaths.map((pathItem) => {
                const { method, url, params } = pathItem;
                const queryCondition = Object.assign({ ...pathItem },
                    { params: strToObj(params), filter: this.echarts.filter });
                if (method && url) promiseAll.push(chartApi(queryCondition));
            });
            if (promiseAll.length == 0) return;
            await Promise.all(promiseAll)
                .then((response) => {
                    this.chartData.responseData = response.payload || response;
                    if (response) this.runCode();
                }).catch((e) => {
                    console.warn(e)
                });
        },
        runCode() {
            let { codding, responseData } = this.chartData;
            if (codding.length > 0) {
                codding = codding.replace(/return/g, "")
                const result = eval(codding);
                if (result && this.checkEchartField(result))
                    this.chartData.data = result;
            } else if (this.checkEchartField(responseData))
                this.chartData.data = result;
        },
        checkEchartField(fields) {
            // TODO 需要对responseData格式进行校验，符合echarts标准数据格式才能赋值，否则报错
            let validate = true;
            const echartMustFields = ["xAxis", "yAxis", "series", "dataset"];
            for (let index = 0; index < echartMustFields.length; index++) {
                const key = echartMustFields[index];
                if (!fields[key]) validate = false;
                if (!fields[key]) break;
            }
            return validate;
        },
    },
}