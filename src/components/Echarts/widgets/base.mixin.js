import Base from "../widgets/base.vue";
import { mergeDeepRight } from "ramda";
import eventbus from "../utils/eventbus";
import { chartApi, isUrl, strToObj } from "../utils";

export default {
    components: { Base },
    props: {
        chartData: { type: Object, default: () => ({}) },
        design: { type: Boolean, default: true }, // 是否是设计模式
        hooks: { type: Object, default: () => ({}) },
        echarts: { type: Object, default: () => ({}) }, // 所有的数据
        chartsHandle: { type: Object, default: () => ({}) },
        isMobile: { type: Boolean, default: false },
        context: { type: Object, default: () => ({}) },
    },
    inject: ["chartId"],
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
            let chartId = this.chartData.id;
            this.$setFieldAttr();
            this._registerEvents();
            this.hooks.pickAsyncData[chartId] = this.pickAsyncData;
            this.loadCompleteDispatch();
            if (this.echarts.attribute.reqType == "init") {
                this.pickAsyncData()
            }
        },
        loadCompleteDispatch() {
            // 等所有字段都渲染完成在派发options依赖
            if (this.context.loadCompletedTimeout)
                clearTimeout(this.context.loadCompletedTimeout);
            this.context.loadCompletedTimeout = setTimeout(() => {
                this.context.loadCompleted = true;
            }, 100)
        },
        $setFieldAttr() {
            const defaultFieldAttr = this.defaultFieldAttr();
            const mergeData = mergeDeepRight(defaultFieldAttr, this.chartData);
            Object.assign(this.chartData, mergeData)
        },
        async pickAsyncData() {
            let asyncPaths = this.chartData.dataSource;
            if (asyncPaths.length == 0) return;
            if (!this.hooks.responseData[this.chartData.id]) this.hooks.responseData[this.chartData.id] = {};
            // 排除不需要的字段
            let { filter, ignoreFilter } = this.echarts;
            let cloneFilter = JSON.parse(JSON.stringify(filter));
            ignoreFilter.map(key => {
                this.$delete(cloneFilter, key)
            })
            // 组装并获取数据
            let responseArr = [];
            for (let index = 0; index < asyncPaths.length; index++) {
                try {
                    let pathItem = asyncPaths[index];
                    let { method, url, params } = pathItem;
                    let queryCondition = Object.assign({ ...pathItem },
                        { params: strToObj(params), filter: cloneFilter });
                    if (method && url) { // && isUrl(url)  代理时，可能不是标准的http,可能是/api，
                        let response = await chartApi(queryCondition);
                        responseArr.push(response);
                    };
                } catch (e) { } finally {
                    this.emit("responseHttpNum", 1);
                }
            }
            if (responseArr.length == 0) return;
            this.hooks.responseData[this.chartData.id] = responseArr;
            this.runCode();
            // 加载完成,必须放在runCode后，因为第一个请求的参数可能会被第二个请求用到，所以需要runCode赋值后才能发起第二个请求
            this.emit("event", 'loadSuccess', this.chartData);
        },
        runCode() {
            try {
                let { codding, id } = this.chartData;
                let filter = this.echarts.filter;
                let attribute = this.echarts.attribute;
                let responseData = this.hooks.responseData[id];
                let globalData = this.hooks.responseData.globalData;
                let $echart = this.hooks.$echart[id];
                if (typeof codding == "function") { // 有可能是function,代码字符创修改很不方便
                    let result = codding({ filter, attribute, responseData, globalData, $echart, allConfig: this.echarts });
                    if (result) this.chartData.data = result;
                } else if (codding.length > 0) { // 有可能是代码字符，因为function无法保存到服务器上
                    let result = eval(codding);
                    if (result) this.chartData.data = result;
                }
            } catch (e) {
                console.log(e)
            }
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
            if (chartHandle) {
                let allConfig = this.echarts;
                chartHandle.on("click", (params) => {
                    params.allConfig = allConfig;
                    this.emitEventParams(params);
                });
            }
        },
        // 发送图表事件参数
        emitEventParams(params) {
            let { id, attribute } = this.chartData;
            this.emit("event", attribute.name || id, params);
        },
        // 设置其他widget的高度
        setOtherWidgetH(newHeight = 0) {
            let { chartData, echarts } = this
            let disHeight = newHeight - chartData.px.height;
            if (disHeight == 0) return;
            this.chartData.px.height = newHeight;
            let baseY = chartData.px.y;
            echarts.list.map(item => {
                if (item.px.y > baseY && chartData.id != item.id)
                    item.px.y += disHeight;
            })
        },
        // 宽度已改变
        clientSizeChanged() { },
        // 触发搜索
        dispacthToSearch() {
            if (this.chartData.dataSource.length > 0)
                this.pickAsyncData();
            else this.runCode(); // 子组件依赖全局变量时，当全局变量改变了，不需请求，但逻辑需要重新执行
        },
        // 注册全局总线
        _registerEvents() {
            eventbus.$on(`${this.chartId}:canvasResize`, this.clientSizeChanged);
            eventbus.$on(`${this.chartId}:dispacthToSearch`, this.dispacthToSearch);
        },
        // 注销eventbus
        _unregisterEvents() {
            eventbus.$off(`${this.chartId}:canvasResize`);
            eventbus.$off(`${this.chartId}:dispacthToSearch`);
        },
    },
    beforeDestroy() {
        this._unregisterEvents();
    },
}