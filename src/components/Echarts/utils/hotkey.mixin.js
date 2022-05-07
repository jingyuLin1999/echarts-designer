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
            // this.onKeyDown();
            this.onCopy();
            this.onStick();
            this.onDelete();
            this.onSave();
        },
        /**-----------------键盘事件--------------------- **/
        onKeyDown() {
            let { activeItem } = this;
            document.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case "ArrowLeft": event.preventDefault(); activeItem.px.x -= 1; break;
                    case "ArrowRight": event.preventDefault(); activeItem.px.x += 1; break;
                    case "ArrowUp": event.preventDefault(); activeItem.px.y -= 1; break;
                    case "ArrowDown": event.preventDefault(); activeItem.px.y += 1; break;
                }
            });
        },
        onKeyUp(activeItem) {
            document.addEventListener('keyup', (event) => { });
        },
        onCopy() {
            let { activeItem } = this;
            let cloneItem = JSON.parse(JSON.stringify(activeItem));
            hotkeys("ctrl+c", (event, handler) => {
                cloneItem.id = Math.random().toString(16).slice(2, 12);
                cloneItem.px.x += 10;
                cloneItem.px.y += 10;
                this.cloneItem = cloneItem
            });
        },
        onStick() {
            let { echartList } = this;
            hotkeys("ctrl+v", (event, handler) => {
                let hasItem = echartList.find(item => item.id == this.cloneItem.id)
                if (!hasItem) echartList.push(this.cloneItem)
            });
        },
        onDelete() {
            let { activeItem, echartList } = this;
            hotkeys("del", () => {
                const chartIndex = echartList.findIndex(item => item.id == activeItem.id)
                echartList.splice(chartIndex, 1);
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