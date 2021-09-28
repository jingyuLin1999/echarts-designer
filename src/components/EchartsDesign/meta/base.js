export const baseForm = {
    border: false, // 显示边框
    grid: false, // 表单内部栅栏
    labelSuffix: true, // 字段标题后缀内容，默认' : '
    labelWidth: "90px", // 标签宽度,默认50px
    validator: "input", // submit
    labelAlign: "right", // 标签对齐, 默认右对齐, 可选左对齐left
    labelInline: true, // 字段标题显示位置, 默认true左侧left,false显示在top上方
}

export const baseLayout = [
    {
        title: "边框类型", // 优先级小于shema中定义的title
        widget: "select",
        name: "borderType",
        size: "small",
        options: [
            {
                value: "1",
                label: "四角闪烁",
            },
            {
                value: "3",
                label: "多线边框",
            },
            {
                value: "4",
                label: "正半开边",
            },
            {
                value: "8",
                label: "奔跑光束",
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
                value: "11",
                label: "边带标题",
            },
            {
                value: "12",
                label: "四角发亮",
            },
            {
                value: "1110",
                label: "无边框",
            },
        ],
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
