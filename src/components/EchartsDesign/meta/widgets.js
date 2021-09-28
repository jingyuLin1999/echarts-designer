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
                border: { type: "1", title: "" },
                px: {
                    x: 0, // x坐标
                    y: 0, // y坐标
                    width: 250, // 图标宽
                    height: 180, // 图标高
                },
                "%": {
                    x: 0,
                    y: 0,
                    width: 250,
                    height: 180,
                },
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
            { title: "条形图" },
        ],
    },
]
