// 图表左侧组件树形数据
export const chartWidgets = [
    {
        id: "1",
        title: "图表名称",
        icon: "el-icon-pie-chart",
        children: [
            {
                // 报表数据
                title: "柱形图",
                widget: "bar", // 组件名称
                borderType: "1",
                px: { "x": 255, "y": 389, "width": 379, "height": 231, "z": 999 },
                "%": { "x": 0.1842485549132948, "y": 0.4151547491995731, "width": 0.2738439306358382, "height": 0.24653148345784417 },
                dataSource: [],
                codding: "", // 逻辑
                responseData: [], // 响应数据
                data: {
                    title: {
                        text: "ECharts 入门示例",
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
                }, // 图标数据
            },
            {
                id: "2",
                title: "折线图",
                widget: "bar",
                borderType: "8",
                px: { x: 0, y: 0, width: 890, height: 337, z: 999 },
                "%": {
                    x: 0,
                    y: 0.45,
                    width: 0.5614161849710982,
                    height: 0.35965848452508004,
                },
                dataSource: [
                    // 数据源
                    {
                        method: "get",
                        url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
                    },
                ],
                codding: "", // 逻辑
                responseData: [], // 响应数据
                data: {
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
                id: "3",
                title: "饼状图",
                widget: "pie",
                borderType: "8",
                px: { x: 0, y: 0, width: 350, height: 337, z: 999 },
                "%": {
                    x: 0.6,
                    y: 0,
                    width: 0.3614161849710982,
                    height: 0.35965848452508004,
                },
                dataSource: [
                    // 数据源
                    {
                        method: "get",
                        url: "http://yapi.smart-xwork.cn/mock/99307/echarts/asyncPath",
                    },
                ],
                codding: "", // 逻辑
                responseData: [], // 响应数据
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
        ],
    },
]
