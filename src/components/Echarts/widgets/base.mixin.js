import Base from "./base.vue";
export default {
    components: { Base },
    props: {
        chartData: { type: Object, default: () => ({}) },
        design: { type: Boolean, default: true }, // 是否是设计模式
        hooks: { type: Object, default: () => ({}) },
    }
}