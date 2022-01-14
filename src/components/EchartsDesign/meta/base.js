export const baseForm = {
    border: false, // 显示边框
    grid: false, // 表单内部栅栏
    labelSuffix: ":", // 字段标题后缀内容，默认' : '
    labelWidth: "90px", // 标签宽度,默认50px
    validator: "input", // submit
    labelAlign: "right", // 标签对齐, 默认右对齐, 可选左对齐left
    labelInline: true, // 字段标题显示位置, 默认true左侧left,false显示在top上方
}

// 按钮
export const coddeButton = {
    actions: [
        {
            name: "codding",
            type: "", // 按键类型,默认为primary，具体可见element button
            title: "编辑代码",
            icon: "",
            right: false,
            visible: true,
            top: false,
            size: "mini", // medium / small / mini
        },
    ],
}

export const borderLayout = {
    title: "边框类型", // 优先级小于shema中定义的title
    widget: "select",
    name: "border.type",
    size: "small",
    options: [
        {
            value: "1",
            label: "四角闪烁",
        },
        {
            value: "2",
            label: "双线边框",
        },
        {
            value: "6",
            label: "间断边框",
        },
        {
            value: "7",
            label: "直角亮光",
        },
        {
            value: "8",
            label: "正奔跑光",
        },
        {
            value: "9",
            label: "不规则边",
        },
        {
            value: "10",
            label: "四边光晕",
        },
        {
            value: "12",
            label: "四角弯曲",
        },
        {
            value: "13",
            label: "左上凸起",
        },
        {
            value: "0",
            label: "无边框",
        },
    ],
}

export const widgetLayout = [
    borderLayout,
    {
        title: "标题",
        widget: "input",
        name: "data.title.text",
        size: "small",
    },
    {
        title: "子标题",
        widget: "input",
        name: "data.title.subtext",
        size: "small",
    },
    {
        title: "图例方向",
        widget: "select",
        name: "data.legend.orient",
        size: "small",
        options: [
            { label: "垂直", value: "vertical" },
            { label: "水平", value: "horizontal" },
        ]
    },
    {
        title: "标识",
        widget: "input",
        description: "自定义标识，用于事件区分图表",
        name: "attribute.name",
        size: "small"
    },
    {
        title: "监听字段",
        widget: "draggablelist",
        name: "listenKey",
        template: "",
        editKeys: [],
        description: "监听字段和filter下的键值匹配且filter对应键值改变，会发起http到后台过滤",
    },
    {
        title: "数据接口",
        widget: "draggablelist",
        name: "dataSource",
        template: { method: "get", url: "http://", params: "" },
        editKeys: ["method", "url", "params"],
    },
]

export const baseValues = {

}

export const baseSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "设备属性",
    description: "A product from Acme's catalog",
    type: "object",
    properties: {}
}
