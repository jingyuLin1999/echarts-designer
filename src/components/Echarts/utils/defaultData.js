// 容器必须字段
export const defaultContainer = {
    unit: "px", // 单位 px(默认) | %
    background: "#F9F6F6", // 背景颜色
    theme: "light",
    height: 1200,
    filter: {}, // 过滤条件
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