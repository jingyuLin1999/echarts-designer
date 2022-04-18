import Base from "../widgets/base.vue";
import { chartApi, isUrl, strToObj } from "../utils";
import { mergeDeepRight } from "ramda";
import eventbus from "../utils/eventbus";
export default {
    components: { Base },
    props: {
        chartData: { type: Object, default: () => ({}) },
        design: { type: Boolean, default: true }, // 是否是设计模式
        hooks: { type: Object, default: () => ({}) },
        echarts: { type: Object, default: () => ({}) },
        chartsHandle: { type: Object, default: () => ({}) },
        isMobile: { type: Boolean, default: false },
    },
    inject: ["responseData", "chartId"],
    data() {
        return {
            filterHistory: { ...this.chartData.filter },
        }
    },
    watch: {
        "chartData.dataSource": {
            handler(newVal, oldVal) {
                this.pickAsyncData();
            },
            deep: true,
        },
        "echarts.filter": {
            handler(newVal, oldVal) {
                let listenKeyArr = this.chartData.listenKey;
                if (!listenKeyArr || (Array.isArray(listenKeyArr) && listenKeyArr.length == 0)) return;
                let isFind = listenKeyArr.find(key => (Object.keys(newVal).includes(key) && this.filterHistory[key] != newVal[key]));
                this.filterHistory = JSON.parse(JSON.stringify(newVal)); // 更新历史记录
                // 当所监听的字段都有值时，才发起请求
                let hasValue = listenKeyArr.find(key => (newVal[key] == undefined || newVal[key] == null));
                if (hasValue || !isFind) return;
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
            let asyncPaths = this.chartData.dataSource;
            if (asyncPaths.length == 0) return;
            let promiseAll = [];
            if (!this.responseData[this.chartData.id]) this.responseData[this.chartData.id] = {};
            asyncPaths.map((pathItem) => {
                let { method, url, params } = pathItem;
                // if (!isUrl(url)) pathItem.url = sessionStorage.getItem("report-baseUrl") + url;
                let queryCondition = Object.assign({ ...pathItem },
                    { params: strToObj(params), filter: Object.assign({}, this.echarts.filter, this.echarts.customField) });
                if (method && url) promiseAll.push(chartApi(queryCondition));
            });
            if (promiseAll.length == 0) return;
            await Promise.all(promiseAll)
                .then((response) => {
                    this.responseData[this.chartData.id] = response.payload || response;
                    if (response) this.runCode();
                }).catch((e) => {
                    // console.warn("url获取异步数据失败", e)
                });
        },
        runCode() {
            let { codding, id } = this.chartData;
            let filter = this.echarts.filter;
            let responseData = this.responseData[id];
            let globalData = this.responseData.globalData;
            if (codding.length > 0) {
                codding = codding.replace(/return/g, "")
                const result = eval(codding);
                if (result) this.chartData.data = result;
            }
            // else this.chartData.data = responseData;
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
        emit() {
            // 全局总线
            if (arguments.length > 0) {
                arguments[0] = `${this.chartId}:${arguments[0]}`;
                eventbus.$emit(...arguments);
            }
        },
        // 注册图表事件 
        // TODO 事件拓展 
        _registerChartEvent() {
            let chartHandle = this.chartsHandle[this.chartData.id];
            chartHandle.on("click", (params) => {
                this.emitEventParams(params);
            });
        },
        // 发送图表事件参数
        emitEventParams(params) {
            let { id, attribute } = this.chartData;
            this.emit("event", attribute.name || id, params);
        },
        // 
        moveWidgetY(newHeight = 0) {
            let { chartData, echarts } = this
            let disHeight = newHeight - chartData.px.height;
            this.chartData.px.height = newHeight;

            let baseY = chartData.px.y
            echarts.list.map(item => {
                if (item.px.y > baseY) {
                    item.px.y += disHeight;
                }
            })
        }
    },
}