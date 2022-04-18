
import { baseForm, baseSchema, coddeButton, borderLayout } from "./base";

export const form = {
    ...baseForm,
    ...coddeButton,
    layout: [
        { ...borderLayout },
        {
            title: "表边框",
            widget: "select",
            name: "data.form.border",
            size: "small",
            options: [
                {
                    value: true,
                    label: "是",
                },
                {
                    value: false,
                    label: "否",
                },
            ],
        },
        {
            title: "表栅栏",
            widget: "select",
            name: "data.form.grid",
            size: "small",
            options: [
                {
                    value: true,
                    label: "是",
                },
                {
                    value: false,
                    label: "否",
                },
            ],
        },
        {
            title: "对齐方式",
            widget: "select",
            name: "data.form.labelAlign",
            size: "small",
            options: [
                {
                    value: "right",
                    label: "靠右",
                },
                {
                    value: "left",
                    label: "靠左",
                }
            ],
        },
        {
            title: "标签后缀",
            widget: "input",
            name: "data.form.labelSuffix",
            size: "small",
        },
        {
            title: "标签宽度",
            widget: "input",
            name: "data.form.labelWidth",
            size: "small",
        },
        {
            title: "标识",
            widget: "input",
            description: "自定义标识",
            name: "data.form.name",
            size: "small"
        },
        {
            title: "数据接口",
            widget: "draggablelist",
            name: "dataSource",
            template: { method: "get", url: "http://"},
            editKeys: ["method", "url"],
        },
        {
            title: "说明",
            widget: "slot",
            name: "slot",
            html: "代码编辑规则请见-><a target='_blank' href='https://github.com/jingyuLin1999/richform'>richform</a>",
        },
    ],
}

export const schema = {
    ...baseSchema
}

export const values = {

}



