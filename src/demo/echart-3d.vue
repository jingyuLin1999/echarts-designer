<template>
    <div class="echart-3d-page">
        <Echarts :echarts="charts" :design="false" />
    </div>
</template>

<script>
import Echarts from "@/components/Echarts";
export default {
    components: { Echarts },
    data() {
        return {
            charts: {
                id: "myChart",
                title: "图表名称",
                theme: "dark",
                background: "#0D194B",
                widget: "canvas",
                filter: {
                },
                dataSource: {
                },
                listenKey: [],
                ignoreFilter: [],
                attribute: {
                    reqType: "action", // action || auto || init
                    gridW: "10px",
                    colors: {
                        // 全局颜色设置
                        theme: "#0D194B",
                        fontColor: "#37D0FA",
                        btnColor: "#F8F4F4",
                        btnBgColor: "#232B60",
                        activeColor: "#4F9FFE",
                        dateRangeBgColor: "#999",
                        multiOptionBgColor: "#ddd",
                        tableBorderColor: "#4780BA",
                    },
                },
                list: [
                    {
                        id: "1",
                        title: "饼图3d",
                        widget: "d3",
                        listenKey: [],
                        attribute: {

                        },
                        border: {
                            type: "8",
                            reverse: true,
                            color: [],
                        },
                        pct: { "x": 0.1636, "y": 0.1396, "width": 0.2608, "height": 0.3557 },
                        px: { "x": 266, "y": 133, "width": 424, "height": 339, "z": 999 },
                        dataSource: [],
                        codding: "",
                        data: {
                            tooltip: {
                                show: false,
                            },
                            xAxis3D: {
                                name: null,
                                type: 'category',
                                data: ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a'],
                                axisLabel: {
                                    show: true,
                                    color: '#fff',
                                    rotate: 45,
                                    interval: 0
                                }
                            },
                            yAxis3D: {
                                name: null,
                                type: 'category',
                                data: [],
                            },
                            zAxis3D: {
                                name: null,
                                type: 'value',
                                axisLabel: {
                                    show: true,
                                    color: '#fff',
                                }
                            },
                            grid3D: {
                                boxWidth: 210,
                                boxDepth: 15,
                                viewControl: {
                                    autoRotate: false,
                                    rotateSensitivity: 0,  // 禁用旋转手势
                                    zoomSensitivity: 0,  // 禁用缩放
                                    alpha: 5,  // 水平旋转角度，控制视角[0, 360]
                                    beta: 5,   // 垂直旋转角度，控制视角[-90 90]
                                    distance: 150  // 初始视距
                                },
                                axisPointer: {
                                    show: false  // 禁用辅助线显示
                                }
                            },
                            series: [
                                {
                                    type: 'bar3D',
                                    data: [
                                        { value: [0, 0, 10], itemStyle: { color: '#43B0FD' } },
                                        { value: [1, 0, 5], itemStyle: { color: '#7068DD' } },
                                        { value: [2, 0, 2], itemStyle: { color: '#30E575' } },
                                        { value: [3, 0, 8], itemStyle: { color: '#E16738' } },
                                        { value: [4, 0, 15], itemStyle: { color: '#87A3D4' } },
                                        { value: [5, 0, 0], itemStyle: { color: '#46E1CA' } },
                                        { value: [6, 0, 30], itemStyle: { color: '#FAB46C' } },
                                        { value: [7, 0, 15], itemStyle: { color: '#97E7E1' } },
                                    ],
                                    label: {
                                        fontSize: 16,
                                        borderWidth: 1,
                                        show: true,  // 显示标签
                                        position: 'top',  // 标签位置在柱形顶部
                                        formatter: function (params) {
                                            return params.value[2];  // 显示 z 值
                                        },
                                    },
                                    barSize: [10, 10],
                                    shading: 'lambert',  // 设置阴影效果
                                    // emphasis: {
                                    //     label: {
                                    //         fontSize: 20,
                                    //         color: '#900'
                                    //     },
                                    //     itemStyle: {
                                    //         color: '#900'
                                    //     }
                                    // }
                                }
                            ]
                        }
                    },
                    {
                        id: "2",
                        title: "饼图3d",
                        widget: "d3",
                        listenKey: [],
                        attribute: {

                        },
                        border: {
                            type: "7",
                            reverse: true,
                            color: [],
                        },
                        pct: { "x": 0.4465, "y": 0.1406, "width": 0.3895, "height": 0.3536 },
                        px: { "x": 726, "y": 134, "width": 633.327, "height": 337, "z": 999 },
                        dataSource: [],
                        codding: "",
                        data: {
                            tooltip: {
                                show: false,
                            },
                            xAxis3D: {
                                name: null,
                                type: 'category',
                                data: ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a'],
                                axisLabel: {
                                    show: true,
                                    color: '#fff',
                                    rotate: 45,
                                    interval: 0
                                }
                            },
                            yAxis3D: {
                                name: null,
                                type: 'category',
                                data: [],
                            },
                            zAxis3D: {
                                name: null,
                                type: 'value',
                                axisLabel: {
                                    show: true,
                                    color: '#fff',
                                }
                            },
                            grid3D: {
                                boxWidth: 210,
                                boxDepth: 15,
                                viewControl: {
                                    autoRotate: false,
                                    rotateSensitivity: 0,  // 禁用旋转手势
                                    zoomSensitivity: 0,  // 禁用缩放
                                    alpha: 5,  // 水平旋转角度，控制视角[0, 360]
                                    beta: 5,   // 垂直旋转角度，控制视角[-90 90]
                                    distance: 150  // 初始视距
                                },
                                axisPointer: {
                                    show: false  // 禁用辅助线显示
                                }
                            },
                            series: [
                                {
                                    type: 'bar3D',
                                    data: [
                                        { value: [0, 0, 10], itemStyle: { color: '#43B0FD' } },
                                        { value: [1, 0, 5], itemStyle: { color: '#7068DD' } },
                                        { value: [2, 0, 2], itemStyle: { color: '#30E575' } },
                                        { value: [3, 0, 8], itemStyle: { color: '#E16738' } },
                                        { value: [4, 0, 15], itemStyle: { color: '#87A3D4' } },
                                        { value: [5, 0, 0], itemStyle: { color: '#46E1CA' } },
                                        { value: [6, 0, 30], itemStyle: { color: '#FAB46C' } },
                                        { value: [7, 0, 15], itemStyle: { color: '#97E7E1' } },
                                    ],
                                    label: {
                                        fontSize: 16,
                                        borderWidth: 1,
                                        show: true,  // 显示标签
                                        position: 'top',  // 标签位置在柱形顶部
                                        formatter: function (params) {
                                            return params.value[2];  // 显示 z 值
                                        },
                                    },
                                    barSize: [10, 10],
                                    shading: 'lambert',  // 设置阴影效果
                                    // emphasis: {
                                    //     label: {
                                    //         fontSize: 20,
                                    //         color: '#900'
                                    //     },
                                    //     itemStyle: {
                                    //         color: '#900'
                                    //     }
                                    // }
                                }
                            ]
                        }
                    },
                ]
            }
        }
    },
}
</script>

<style lang="scss">
.echart-3d-page {
    width: 100%;
    height: 100%;
}
</style>