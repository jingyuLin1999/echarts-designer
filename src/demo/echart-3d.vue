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
                        id: "0",
                        title: "饼图3d",
                        widget: "d3pie1",
                        listenKey: [],
                        attribute: {

                        },
                        border: {
                            type: "7",
                            reverse: true,
                            color: [],
                        },
                        pct: { "x": 0.1642, "y": 0.0766, "width": 0.4068, "height": 0.4187 },
                        px: { "x": 214, "y": 73, "width": 530, "height": 399, "z": 999 },
                        dataSource: [],
                        codding: "",
                        data: {
                            legend: {
                                show: false
                            },
                            animation: true,
                            tooltip: {
                                formatter: (params) => {
                                    if (
                                        params.seriesName !== 'mouseoutSeries' &&
                                        params.seriesName !== 'pie2d'
                                    ) {
                                        return `${params.seriesName
                                            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
                                            };"></span>${option.series[params.seriesIndex].pieData.value + '%'
                                            }`
                                    }
                                },
                                textStyle: {
                                    fontSize: 14
                                }
                            },
                            title: {
                                x: 'center',
                                top: '20',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 22
                                }
                            },
                            // backgroundColor: '#0E3567',
                            labelLine: {
                                show: true,
                                lineStyle: {
                                    color: '#7BC0CB'
                                },
                                normal: {
                                    show: true,
                                    length: 10,
                                    length2: 10
                                }
                            },
                            label: {
                                show: true,
                                position: 'outside',
                                formatter: '{b} \n{d}%',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '12px'
                                }
                            },
                            xAxis3D: {
                                min: -1,
                                max: 1
                            },
                            yAxis3D: {
                                min: -1,
                                max: 1
                            },
                            zAxis3D: {
                                min: -1,
                                max: 1
                            },
                            grid3D: {
                                show: false,
                                boxHeight: 0.01,
                                // top: '30%',
                                bottom: '50%',
                                // environment: "rgba(255,255,255,0)",
                                viewControl: {
                                    distance: 300,
                                    alpha: 35,
                                    beta: 60,
                                    autoRotate: false, // 自动旋转
                                    rotateSensitivity: 0,  // 禁用旋转手势
                                    zoomSensitivity: 0,  // 禁用缩放
                                }
                            },
                            series: [

                            ]
                        }
                    },
                    {
                        id: "1",
                        title: "饼图3d",
                        widget: "d3pie",
                        listenKey: [],
                        attribute: {

                        },
                        border: {
                            type: "8",
                            reverse: true,
                            color: [],
                        },
                        pct: { "x": 0.1636, "y": 0.3296, "width": 0.4068, "height": 0.4187 },
                        px: { "x": 266, "y": 533, "width": 424, "height": 339, "z": 999 },
                        dataSource: [],
                        codding: "",
                        data: {
                            legend: {
                                show: false
                            },
                            animation: true,
                            tooltip: {
                                formatter: (params) => {
                                    if (
                                        params.seriesName !== 'mouseoutSeries' &&
                                        params.seriesName !== 'pie2d'
                                    ) {
                                        return `${params.seriesName
                                            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
                                            };"></span>${option.series[params.seriesIndex].pieData.value + '%'
                                            }`
                                    }
                                },
                                textStyle: {
                                    fontSize: 14
                                }
                            },
                            title: {
                                x: 'center',
                                top: '20',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 22
                                }
                            },
                            // backgroundColor: '#0E3567',
                            labelLine: {
                                show: true,
                                lineStyle: {
                                    color: '#7BC0CB'
                                },
                                normal: {
                                    show: true,
                                    length: 10,
                                    length2: 10
                                }
                            },
                            label: {
                                show: false,
                                position: 'outside',
                                formatter: '{b} \n{d}%',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '12px'
                                }
                            },
                            xAxis3D: {
                                min: -1,
                                max: 1
                            },
                            yAxis3D: {
                                min: -1,
                                max: 1
                            },
                            zAxis3D: {
                                min: -1,
                                max: 1
                            },
                            grid3D: {
                                show: false,
                                boxHeight: 0.01,
                                // top: '30%',
                                bottom: '50%',
                                // environment: "rgba(255,255,255,0)",
                                viewControl: {
                                    distance: 300,
                                    alpha: 35,
                                    beta: 60,
                                    autoRotate: false, // 自动旋转
                                    rotateSensitivity: 0,  // 禁用旋转手势
                                    zoomSensitivity: 0,  // 禁用缩放
                                }
                            },
                            series: [
                                {
                                    name: '国际货代',
                                    value: 13.87,
                                    itemStyle: {
                                        opacity: 1,
                                        color: '#7bc35a'
                                    }
                                },
                                {
                                    name: '租赁业务',
                                    value: 0.6,
                                    itemStyle: {
                                        opacity: 1,
                                        color: '#2f97df'
                                    }
                                },
                                {
                                    name: '仓储装卸',
                                    value: 9.53,
                                    itemStyle: {
                                        opacity: 1,
                                        color: '#4268d6'
                                    }
                                },
                                {
                                    name: '干线运输',
                                    value: 72.17,
                                    itemStyle: {
                                        opacity: 1,
                                        color: '#d35e5f'
                                    }
                                },
                                {
                                    name: '配送业务',
                                    value: 3.67,
                                    itemStyle: {
                                        opacity: 1,
                                        color: '#c2c763'
                                    }
                                },
                                {
                                    name: '其他业务',
                                    value: 0.17,
                                    itemStyle: {
                                        opacity: 1,
                                        color: '#8fdffe'
                                    }
                                }
                            ]
                        }
                    },
                    // {
                    //     id: "2",
                    //     title: "饼图3d",
                    //     widget: "d3",
                    //     listenKey: [],
                    //     attribute: {

                    //     },
                    //     border: {
                    //         type: "7",
                    //         reverse: true,
                    //         color: [],
                    //     },
                    //     pct: { "x": 0.4465, "y": 0.1406, "width": 0.3895, "height": 0.3536 },
                    //     px: { "x": 726, "y": 134, "width": 633.327, "height": 337, "z": 999 },
                    //     dataSource: [],
                    //     codding: "",
                    //     data: {
                    //         tooltip: {
                    //             show: false,
                    //         },
                    //         xAxis3D: {
                    //             name: null,
                    //             type: 'category',
                    //             data: ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a'],
                    //             axisLabel: {
                    //                 show: true,
                    //                 color: '#fff',
                    //                 rotate: 45,
                    //                 interval: 0
                    //             }
                    //         },
                    //         yAxis3D: {
                    //             name: null,
                    //             type: 'category',
                    //             data: [],
                    //         },
                    //         zAxis3D: {
                    //             name: null,
                    //             type: 'value',
                    //             axisLabel: {
                    //                 show: true,
                    //                 color: '#fff',
                    //             }
                    //         },
                    //         grid3D: {
                    //             boxWidth: 210,
                    //             boxDepth: 15,
                    //             viewControl: {
                    //                 autoRotate: false,
                    //                 rotateSensitivity: 0,  // 禁用旋转手势
                    //                 zoomSensitivity: 0,  // 禁用缩放
                    //                 alpha: 5,  // 水平旋转角度，控制视角[0, 360]
                    //                 beta: 5,   // 垂直旋转角度，控制视角[-90 90]
                    //                 distance: 150  // 初始视距
                    //             },
                    //             axisPointer: {
                    //                 show: false  // 禁用辅助线显示
                    //             }
                    //         },
                    //         series: [
                    //             {
                    //                 type: 'bar3D',
                    //                 data: [
                    //                     { value: [0, 0, 10], itemStyle: { color: '#43B0FD' } },
                    //                     { value: [1, 0, 5], itemStyle: { color: '#7068DD' } },
                    //                     { value: [2, 0, 2], itemStyle: { color: '#30E575' } },
                    //                     { value: [3, 0, 8], itemStyle: { color: '#E16738' } },
                    //                     { value: [4, 0, 15], itemStyle: { color: '#87A3D4' } },
                    //                     { value: [5, 0, 0], itemStyle: { color: '#46E1CA' } },
                    //                     { value: [6, 0, 30], itemStyle: { color: '#FAB46C' } },
                    //                     { value: [7, 0, 15], itemStyle: { color: '#97E7E1' } },
                    //                 ],
                    //                 label: {
                    //                     fontSize: 16,
                    //                     borderWidth: 1,
                    //                     show: true,  // 显示标签
                    //                     position: 'top',  // 标签位置在柱形顶部
                    //                     formatter: function (params) {
                    //                         return params.value[2];  // 显示 z 值
                    //                     },
                    //                 },
                    //                 barSize: [10, 10],
                    //                 shading: 'lambert',  // 设置阴影效果
                    //                 // emphasis: {
                    //                 //     label: {
                    //                 //         fontSize: 20,
                    //                 //         color: '#900'
                    //                 //     },
                    //                 //     itemStyle: {
                    //                 //         color: '#900'
                    //                 //     }
                    //                 // }
                    //             }
                    //         ]
                    //     }
                    // },
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