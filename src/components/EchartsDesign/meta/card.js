
import { baseForm, widgetLayout, baseSchema, coddeButton, borderLayout } from "./base";

export const form = {
    ...baseForm,
    ...coddeButton,
    layout: [
        { ...borderLayout },
        {
            widget: "grid",
            title: "栅格布局",
            showTitle: false,
            isClicked: false,
            fields: [
                [{
                    title: "标题",
                    name: "titleColor",
                    widget: "colorpicker",
                    predefineColors: ["#8c8c8c"], // 预定义颜色
                    disabled: false,
                    size: "small", // 选项： medium / small / mini
                    showAlpha: false,
                    popperClass: "",
                    colorFormat: "", //单位选项：hsl / hsv / hex / rgb 说明：写入 v-model 的颜色的格式
                }],
                [
                    {
                        title: "统计值",
                        name: "valueColor",
                        widget: "colorpicker",
                        predefineColors: ["#333"],
                        disabled: false,
                        size: "small",
                        showAlpha: false,
                        popperClass: "",
                        colorFormat: "",
                    },
                ]
            ]
        },
        {
            title: "标题字体",
            name: "titleSize",
            widget: "input",
            size: "mini"
        },
        {
            title: "值字体",
            name: "valueSize",
            widget: "input",
            size: "mini"
        },
        {
            title: "卡片间隔",
            name: "distance",
            widget: "inputnumber",
        },
        {
            title: "卡片",
            widget: "draggablelist",
            name: "data",
            template: {
                title: "登入次数",
                icon: "el-icon-user-solid",
                iconColor: "#4FCAC6",
                fontSize: "25px",
                value: 65621,
            },
            editKeys: ["icon", "iconColor", "title", "fontSize"],
        },
        {
            title: "数据接口",
            widget: "draggablelist",
            name: "dataSource",
            template: { method: "get", url: "http://", params: "" },
            editKeys: ["method", "url", "params"],
        },

    ],
}

export const schema = {
    ...baseSchema
}

export const values = {

}



