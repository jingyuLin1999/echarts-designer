// 图表左侧组件树形数据
export const chartWidgets = [
    {
        id: "1",
        title: "图表名称",
        icon: "el-icon-pie-chart",
        children: [
            {
                id: "echarts-designer-card",
                title: "卡片图",
                widget: "card",
                listenKey: [],
                attribute: {
                    name: "",
                    titleColor: "#8c8c8c",
                    valueColor: "#333",
                    titleSize: "15px",
                    valueSize: "23px",
                    distance: 10,
                },
                border: {
                    type: "0",
                    reverse: false,
                    color: [],
                },
                px: { "x": 2, "width": 1001, "y": 40.5, "z": 999, "height": 113 },
                pct: { "x": 0.0018181818181818182, "width": 0.91, "y": 0.0432230522945571, "height": 0.12059765208110992 },
                dataSource: [],
                codding: "", // 逻辑
                data: [
                    {
                        title: "登入次数",
                        icon: "el-icon-video-camera-solid",
                        iconColor: "#4FCAC6",
                        value: 65621,
                    },
                    {
                        title: "用户数",
                        icon: "el-icon-user-solid",
                        iconColor: "#48A4F6",
                        value: 555,
                    },
                    {
                        title: "设备数",
                        icon: "el-icon-s-platform",
                        iconColor: "#EF4C6D",
                        value: 85621,
                    },
                    {
                        title: "刀具数",
                        icon: "el-icon-knife-fork",
                        iconColor: "#43C0A3",
                        value: 955,
                    },
                ],
            },
            {
                // 报表数据
                id: "echarts-designer-bar",
                title: "柱形图",
                widget: "bar", // 组件名称
                listenKey: [],
                attribute: {
                    name: "",
                },
                border: {
                    type: "8",
                    reverse: false,
                    color: [],
                },
                px: {
                    "x": 20,
                    "y": 20,
                    "width": 441.2478323699422,
                    "height": 337,
                    "z": 999
                },
                pct: {
                    "x": 0.0176522506619594,
                    "y": 0.021344717182497332,
                    "width": 0.38945086705202314,
                    "height": 0.35965848452508004
                },
                dataSource: [],
                codding: "", // 逻辑
                data: { // 图标数据
                    title: {
                        text: "ECharts 入门示例",
                        left: "left",
                        textStyle: {
                            fontStyle: "normal",
                            color: "#f00",
                        },
                        subtext: "",
                    },
                    legend: {
                        orient: "horizontal",
                        right: 10,
                        top: 0,
                        bottom: 0,
                    },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                    },
                    yAxis: {},
                    series: [
                        {
                            name: "销量",
                            type: "bar",
                            data: [5, 20, 36, 10, 10, 20],
                        },
                    ],
                },
            },
            {
                id: "echarts-designer-2",
                title: "折线图",
                widget: "bar",
                listenKey: [],
                attribute: {
                    name: "",
                },
                border: {
                    type: "8",
                    reverse: false,
                    color: [],
                },
                px: {
                    "x": 20,
                    "y": 20,
                    "width": 441.2478323699422,
                    "height": 337,
                    "z": 999
                },
                pct: {
                    "x": 0.0176522506619594,
                    "y": 0.021344717182497332,
                    "width": 0.38945086705202314,
                    "height": 0.35965848452508004
                },
                dataSource: [
                    {
                        method: "get",
                        url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
                    },
                ],
                codding: "",
                data: {
                    title: {
                        text: "折线图",
                        left: "left",
                        textStyle: {
                            fontStyle: "normal",
                            color: "",
                        },
                        subtext: "",
                    },
                    legend: {
                        orient: "horizontal",
                        right: 10,
                        top: 0,
                        bottom: 0,
                    },
                    xAxis: {
                        type: "category",
                        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    },
                    yAxis: {
                        type: "value",
                    },
                    series: [
                        {
                            data: [150, 230, 224, 218, 135, 147, 260],
                            type: "line",
                        },
                    ],
                },
            },
            {
                id: "echarts-designer-3",
                title: "饼状图",
                widget: "pie",
                listenKey: [],
                attribute: {
                    name: "",
                },
                border: {
                    type: "8",
                    reverse: false,
                    color: [],
                },
                px: { x: 0, y: 0, width: 350, height: 337, z: 999 },
                pct: {
                    x: 0.6,
                    y: 0,
                    width: 0.3614161849710982,
                    height: 0.35965848452508004,
                },
                dataSource: [
                    {
                        method: "get",
                        url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
                    },
                ],
                codding: "",
                data: {
                    title: {
                        text: "Referer of a Website",
                        subtext: "Fake Data",
                        left: "center",
                    },
                    tooltip: {
                        trigger: "item",
                    },
                    legend: {
                        orient: "vertical",
                        left: "left",
                    },
                    series: [
                        {
                            name: "Access From",
                            type: "pie",
                            radius: "50%",
                            data: [
                                { value: 1048, name: "Search Engine" },
                                { value: 735, name: "Direct" },
                                { value: 580, name: "Email" },
                                { value: 484, name: "Union Ads" },
                                { value: 300, name: "Video Ads" },
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0
                                },
                            },
                        },
                    ],
                },
            },
            {
                id: "form-4",
                title: "富表单",
                widget: "form",
                listenKey: [],
                attribute: {
                    name: "",
                    border: false,
                    grid: false,
                    labelSuffix: ":",
                    labelWidth: "80px",
                    validator: "input",
                    labelAlign: "right",
                    labelInline: true,
                    actions: [],
                },
                border: {
                    type: "8",
                    reverse: true,
                    color: [],
                },
                px: {
                    x: 0,
                    width: 964,
                    y: 11,
                    z: 999,
                    height: 68,
                },
                pct: {
                    x: 0,
                    width: 0.9968976215098242,
                    y: 0.011739594450373533,
                    height: 0.07257203842049093,
                },
                dataSource: [],
                codding: "",
                data: {
                    layout: [],
                    schema: {},
                },
            },
        ],
    },
]
