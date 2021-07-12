// 图表左侧组件树形数据
export const chartWidgets = [
    {
        title: "柱形图",
        icon: "el-icon-pie-chart",
        children: [
            {
                title: "基础柱形图",
                widget: "bar",
                width: 250,
                height: 180,
                wp: null,
                hp: null,
                x: 0,
                y: 0,
                xp: null,
                yp: null,
                chart: {
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
                },
            },
            { title: "条形图" },
        ],
    },
]
