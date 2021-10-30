import hotkeys from "hotkeys-js";
import short from "short-uuid";
export default {
    data() {
        return {
            activeItem: {},
        }
    },
    methods: {
        initHotKey(activeItem, parent) {
            this.onKeyDown();
            this.onCopy(activeItem);
            this.onStick(parent);
            this.onDelete(parent);
        },
        /**-----------------键盘事件--------------------- **/
        onKeyDown() {
            document.addEventListener('keydown', (event) => {
                let activeItem = this.activeItem;
                // switch (event.key) {
                //     case "ArrowLeft": activeItem.px.x -= 1; break;
                //     case "ArrowRight": activeItem.px.x += 1; break;
                //     case "ArrowUp": activeItem.px.y -= 1; break;
                //     case "ArrowDown": activeItem.px.y += 1; break;
                // }
            });
        },
        onKeyUp(activeItem) {
            document.addEventListener('keyup', (event) => { });
        },
        onCopy(activeItem) {
            let cloneItem = JSON.parse(JSON.stringify(activeItem));
            hotkeys("ctrl+c", (event, handler) => {
                this.activeItem = cloneItem
            });
        },
        onStick(parent) {
            hotkeys("ctrl+v", (event, handler) => {
                this.activeItem.id = short.generate();
                this.activeItem.px.x += 10;
                this.activeItem.px.y += 10;
                parent.push(this.activeItem)
            });
        },
        onDelete(parent) {
            hotkeys("del", () => {
                const chartIndex = parent.findIndex(item => item.id == this.activeItem.id)
                parent.splice(chartIndex, 1);
            })
        }
    }
}