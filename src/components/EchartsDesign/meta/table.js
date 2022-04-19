
import { baseForm, widgetLayout, baseSchema, coddeButton, borderLayout } from "./base";

export const form = {
    ...baseForm,
    ...coddeButton,
    layout: [
        { ...borderLayout },
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
            template: { method: "get", url: "http://" },
            editKeys: ["method", "url", "params"],
        },
    ],
}

export const schema = {
    ...baseSchema
}

export const values = {

}



