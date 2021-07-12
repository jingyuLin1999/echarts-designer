import Base from "./base.vue";
export default {
    components: { Base },
    props: {
        chartData: { type: Object, default: () => ({}) }
    }
}