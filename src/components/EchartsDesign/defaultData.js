import { baseForm, baseSchema } from "./meta/base";

export const formTemplate = baseForm;
export const schemaTemplate = baseSchema;

// 提交图表
export const defaultChartSchema = {
    title: {
        type: "string",
        minLength: 1,
        require: true,
    }
}

export const defaultChartLayout = [
    {
        title: "图表名称",
        name: "title",
        widget: "input",
        size: "samll",
    },
    {
        title: "图标",
        description: "element icon",
        name: "icon",
        widget: "input",
        size: "samll",
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

// 提交报表
export const defaultReportSchema = {
    title: {
        type: "string",
        minLength: 1,
        require: true,
    }
}

export const defaultReportLayout = [
    {
        title: "报表名称",
        name: "title",
        widget: "input",
        size: "samll",
    },
    {
        title: "图标",
        description: "element icon",
        name: "icon",
        widget: "input",
        size: "samll",
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
