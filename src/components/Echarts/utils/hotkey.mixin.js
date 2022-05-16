import hotkeys from "hotkeys-js";
import { Message } from "element-ui";
import { _debounce } from "./index"

export default {
    data() {
        return {
            activeItem: {},
            echartList: [],
            cloneItem: {},
            ctrlSdebounce: null,
        }
    },
    mounted() {
        this.initKeysDebounce();
    },
    methods: {
        initKeysDebounce() {
            let { echarts } = this;
            this.ctrlSdebounce = _debounce(() => {
                localStorage.setItem("echarts-designer", JSON.stringify(echarts))
                Message({ type: "success", message: "成功保存至本地" })
            }, 100)
        },
        initHotKey(activeItem, echartList) {
            this.activeItem = activeItem;
            this.echartList = echartList;
            this.onKeyDown();
            this.onCopy();
            this.onStick();
            this.onDelete();
            this.onSave();
        },
        /**-----------------键盘事件--------------------- **/
        onKeyDown() {
            hotkeys("*", (event, handler) => {
                switch (event.key) {
                    case "ArrowLeft": event.preventDefault(); this.activeItem.px.x -= 1; break;
                    case "ArrowRight": event.preventDefault(); this.activeItem.px.x += 1; break;
                    case "ArrowUp": event.preventDefault(); this.activeItem.px.y -= 1; break;
                    case "ArrowDown": event.preventDefault(); this.activeItem.px.y += 1; break;
                }
            });
        },
        onCopy() {
            let cloneItem = JSON.parse(JSON.stringify(this.activeItem));
            hotkeys("ctrl+c", (event, handler) => {
                cloneItem.id = Math.random().toString(16).slice(2, 12);
                cloneItem.px.x += 0.5;
                cloneItem.px.y += 0.5;
                this.cloneItem = cloneItem
            });
        },
        onStick() {
            hotkeys("ctrl+v", (event, handler) => {
                let hasItem = this.echartList.find(item => item.id == this.cloneItem.id)
                if (!hasItem) this.echartList.push(this.cloneItem)
            });
        },
        onDelete() {
            hotkeys("del", () => {
                const chartIndex = this.echartList.findIndex(item => item.id == this.activeItem.id)
                this.echartList.splice(chartIndex, 1);
            })
        },
        onSave() {
            hotkeys("ctrl+s", (event) => {
                event.preventDefault();
                this.ctrlSdebounce();
            })
        }
    }
}