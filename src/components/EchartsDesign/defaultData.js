import { baseForm, baseSchema } from "./meta/base";
// 图表
export const chartSchema = {
    ...baseSchema,
    properties: {
        title: {
            type: "string",
            minLength: 1,
            require: true,
        },
    },
}

export const chartForm = {
    ...baseForm,
    grid: true,
    layout: [
        {
            title: "图表名称",
            name: "title",
            widget: "input",
            size: "small",
        },
        {
            title: "图标",
            description: "element icon",
            name: "icon",
            widget: "input",
            size: "small",
        },
        {
            title: "父节点",
            widget: "tree",
            name: "parentid",
            isShowCheckbox: false,
            onlyCheckedKeys: true,
            nodeKey: "id",
            default: "0",
            defaultProps: {
                // 字段对应关系
                label: "title",
            },
            options: [],
            description: "若没选择默认为根节点",
        },
        {
            title: "描述",
            name: "description",
            widget: "input",
            type: "textarea",
            size: "mini",
            rows: 3,
        },
    ]
}


// 报表
export const reportSchema = {
    ...baseSchema,
    properties: {
        title: {
            type: "string",
            minLength: 1,
            require: true,
        },
    }
}

export const reportForm = {
    ...baseForm,
    grid: true,
    layout: [
        {
            title: "报表名称",
            name: "title",
            widget: "input",
            size: "small",
        },
        {
            title: "图标",
            description: "element icon",
            name: "icon",
            widget: "input",
            size: "small",
        },
        {
            title: "父节点",
            widget: "tree",
            name: "parentid",
            isShowCheckbox: false,
            onlyCheckedKeys: true,
            nodeKey: "id",
            default: "0",
            defaultProps: {
                // 字段对应关系
                label: "title",
            },
            options: [],
            description: "若没选择默认为根节点",
        },
        {
            title: "描述",
            name: "description",
            widget: "input",
            type: "textarea",
            size: "mini",
            rows: 3,
        }
    ]

}