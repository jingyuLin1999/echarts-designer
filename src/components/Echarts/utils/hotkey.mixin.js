import hotkeys from "hotkeys-js";
import short from "short-uuid";
export default {
    data() {
        return {
            activeItem: {},
            echartList: [],
            cloneItem: {},
        }
    },
    methods: {
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
            let { activeItem } = this;
            document.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case "ArrowLeft": activeItem.px.x -= 1; break;
                    case "ArrowRight": activeItem.px.x += 1; break;
                    case "ArrowUp": activeItem.px.y -= 1; break;
                    case "ArrowDown": activeItem.px.y += 1; break;
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
                cloneItem.id = short.generate();
                cloneItem.px.x += 10;
                cloneItem.px.y += 10;
                this.cloneItem = cloneItem
            });
        },
        onStick() {
            let { echartList } = this;
            hotkeys("ctrl+v", (event, handler) => {
                // echartList.push(this.cloneItem)
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
            let { echarts } = this;
            hotkeys("ctrl+s", (event) => {
                event.preventDefault();
                localStorage.setItem("echarts-designer", JSON.stringify(echarts))
            })
        }
    }
}