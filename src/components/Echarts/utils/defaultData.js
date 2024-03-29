// 容器必须字段
export const defaultContainer = {
    unit: "px", // 单位 px(默认) | %
    background: "", // 背景颜色
    theme: "light",
    height: 1200,
    filter: {}, // 过滤条件
    ignoreFilter: [],
    dataSource: { // 全局数据源
        method: "",
        url: "",
        respProp: "", // 响应映射字段，用.隔开
    },
    attribute: { // 全局属性，比如颜色配置，该属性在代码编辑器中可获得
        reqType: "auto", // auto|action，请求类型
        colors: {}, // 颜色
    },
    listenKey: [], // 监听filter中的字段，当reqType为auto时有效
    list: [] // 报表列表
}

export const defaultAuthorization = {
    key: "Authorization",
    value: "Authorization",
    baseUrl: "http://localhost:8080",
}

export const defaultHooks = {
    responseData: {
        globalData: {}
    },
    resize: {}, // 函数
    redraw: {},
    $echart: {},
    chartData: {}, // 数据，可能套用太多层，方便获取
    pickAsyncData:{},
}

export const defaultChartConfig = {
    listenKey: [], // 监听过滤条件的字段
    dataSource: [], // 数据源
    codding: "", // 代码编辑器
    attribute: { // 属性
        name: "", // 自定义标识
        tooltip: { // 提示框属性
            alwaysShow: false, // 一直显示提示框
            seriesIndex: 0, // 显示第几个series
            dataIndex: 1, // 显示第几个数据
        },
    },
    data: {
        // 渲染数据
        tooltip: {
            trigger: "axis",
        },
        title: {
            text: "",
            left: "left",
            textStyle: {
                fontStyle: "normal",
                color: "",
            },
            subtext: "",
        },
        legend: {
            orient: "horizontal",
        },
    },
}