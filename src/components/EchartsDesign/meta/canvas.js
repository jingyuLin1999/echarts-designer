
import { baseForm, baseSchema } from "./base";

export const form = {
    ...baseForm,
    layout: [
        {
            title: "标题",
            name: "title",
            widget: "input",
            size: "small"
        },
        {
            title: "画布高度",
            name: "height",
            widget: "inputnumber",
            max: 80000,
            step: 10,
            size: "small",
        },
        {
            title: "请求类型",
            name: "dataSource.method",
            widget: "select",
            size: "small",
            placeholder: "post或get",
            options: [
                { label: "Get", value: 'get' },
                { label: "Post", value: 'post' },
            ]
        },
        {
            title: "请求路径",
            name: "dataSource.url",
            widget: "input",
            size: "small",
        },
        {
            title: "映射字段",
            widget: "input",
            name: "dataSource.respProp",
            size: "small",
            description: "字段用.隔开，如：payload.data",
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
            widget: "grid",
            title: "栅格布局",
            showTitle: false,
            isClicked: false,
            fields: [
                [
                    {
                        title: "背景颜色",
                        name: "background",
                        widget: "colorpicker",
                        predefineColors: ["#110c2a", "#fff"], // 预定义颜色
                        disabled: false,
                        size: "small", // 选项： medium / small / mini
                        showAlpha: false,
                        popperClass: "",
                        colorFormat: "", //单位选项：hsl / hsv / hex / rgb 说明：写入 v-model 的颜色的格式
                    },
                ],
                [
                    {
                        title: "主题颜色",
                        name: "theme",
                        widget: "colorpicker",
                        predefineColors: ["#110c2a", "#fff"], // 预定义颜色
                        disabled: false,
                        size: "small", // 选项： medium / small / mini
                        showAlpha: false,
                        popperClass: "",
                        colorFormat: "", //单位选项：hsl / hsv / hex / rgb 说明：写入 v-model 的颜色的格式
                    },
                ],
            ],
        },
        // { // todo richform json editor
        //     title: "过滤字段",
        //     widget: "input",
        //     type: "textarea",
        //     name: "filter",
        //     size: "small",
        //     rows: 3
        // },
    ],
}

export const schema = {
    ...baseSchema
}

export const values = {

}



