
import { baseForm, baseSchema } from "./base";

export const form = {
    ...baseForm,
    layout: [
        {
            title: "标题",
            name: "title",
            widget: "input",
            size: "mini"
        },
        {
            title: "背景颜色",
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
}

export const schema = {
    ...baseSchema
}

export const values = {

}



