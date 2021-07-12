/*
	
	为组件增加拖动处理混合

	1.使组件内的元素可以被拖动
	2.使组件内的元素可以接受拖动

	组件提供以下事件，被混合类可以重载。

		onDragstart(source,event)
		//被拖动的元素在拖动过程中持续触发。
		onDrag(event)
		onDragend(event)
		//当拖曳元素进入目标元素的时候触发的事件，
		onDragenter(event)
		onDragleave(event)
		//拖拽元素在目标元素上移动的时候触发的事件
		onDragover(event)
		//被拖拽的元素在目标元素上同时鼠标放开触发的事件
		onDrop(target,data,event)
	使用方法：
	一、将本模块混合到Vue组件
	  import DnDMixin from "mixins/dnd.mixins"
	  mixins:[ DnDMixin ]
    二、拖动组件，即将混合的VUE组件内部的DOM元素拖动到其他地方
      	例：拖动li到其他地方
      	<ul class="tree">
			<li class="node" data="http://mockjs.com"></li>
			<li class="node" data="{type:"vue",url:"a.vue",params:{}}"></li>
			<li class="node" data=""></li>
      	</ul>
        1.配置拖动参数
			dragOptions :{
				enabled:true,  //允许拖动
				selector:'li.node' 或 []    //设置多个选择符,
			}
		2.设置拖动数据
		在Vue组件中添加onSetDragData
		methods:{
		    onDragstart(source,event){
		      var $li=$(source)
		      //返回数据，只能是字符串，在目标上触发onDrop时传入
		     return $li.attr("data")
             // 也可以返回
             return {
                 data:$li.attr("data"),
                 dragimage:"提供一个拖动图片或者Element"
             }
             // 如果要取消拖动,则返回false
		    },
		}
	三.放置拖动
		例:接收li拖动
      	<div class="tree">
		</div>
        1.配置拖动参数
			dropOptions :{
				enabled:true,
				selector:[],
				effect:"move",
                acceptType:"text",
                preventDefault:true
			}

		2.接收拖动数据
		当拖动结束放置时，触发onDrop事件
		onDrop(target,data,event){
		}

 */
import $ from "jquery";
var DnDMixin = {
	data() {
		return {
			//可拖动
			dragOptions: {
				enabled: true,
				selector: []
			},
			//可放置
			dropOptions: {
				enabled: true,
				selector: [],
				effect: "move"
			}
		}
	},
	methods: {
		//当拖动对象放在上面后调用
		onDrop(event,x,z) {
			console.log(event)
		},
		_onDragStart(event) {
			var r = true
			let oEvent = event.originalEvent
			if (this.onDragstart) {
				//result={data:"",dragImage:"拖动图标或者元素"}
				// result字符串
				let result = this.onDragstart(oEvent.target, oEvent)
				if (result === false) {
					r = result
				} else if (typeof result === "string") {
					oEvent.dataTransfer.setData("text", result)
				} else if (typeof result === "object") {
					let { data, dragImage } = result
					oEvent.dataTransfer.setData("text", data)
					if (dragImage) oEvent.dataTransfer.setDragImage(dragImage, 0, 0)
				}
			}
			return r
		},
		//被拖动的元素在拖动过程中持续触发。
		_onDrag(event) {
			if (this.onDrag) {
				this.onDrag(event.originalEvent)
			}
		},
		_onDragEnd(event) {
			if (this.onDragend) {
				this.onDragend(event.originalEvent)
			}
		},
		//当拖曳元素进入目标元素的时候触发的事件，
		_onDragenter(event) {
			var r = true
			if (this.onDragenter) {
				r = this.onDragenter(event.originalEvent)
			}
			if (r !== false) {
				let dt = event.originalEvent.dataTransfer
				dt.dropEffect = this.droppable.effect
				$(event.target).addClass("dragenter")
			}
		},
		_onDragleave(event) {
			var r = true
			if (this.onDragleave) {
				r = this.onDragleave(event.originalEvent)
			}
			if (r !== false) {
				$(event.target).removeClass("dragenter")
			}
		},
		//拖拽元素在目标元素上移动的时候触发的事件
		_onDragover(event) {
			var r = true
			if (this.onDragover) {
				r = this.onDragover(event.originalEvent)
			}
			if (r !== false) {
				event.preventDefault()
			}
		},
		//被拖拽的元素在目标元素上同时鼠标放开触发的事件
		_onDrop(event) {
			$(event.target).removeClass("dragenter")
			var oEvent = event.originalEvent
			if (this.onDrop) {
				this.onDrop(
					oEvent.target,
					oEvent.dataTransfer.getData("text"),
					oEvent)
				if (this.dropOptions.preventDefault !== false) event.preventDefault()
			}
		},
		draggable(ele, enabled = true) {
			$(ele).removeAttr("draggable").off("dragstart dragend")
			if (enabled) {
				$(ele).attr("draggable", enabled)
					.on("dragstart", this._onDragStart)
					.on("dragend", this._onDragEnd)
					.on("drag", this._onDrag)
			}
		},
		droppable(ele, enabled = true) {
			$(ele).removeAttr("droppable").off("dragenter dragleave dragover drop")
			if (enabled) {
				$(ele).attr("droppable", enabled)
					.on("dragenter", this._onDragenter)
					.on("dragleave", this._onDragleave)
					.on("dragover", this._onDragover)
					.on("drop", this._onDrop)
			}
		},
		dndEnabled() {
			let targetSelectors = ""
			if (this.dragOptions.selector) {
				targetSelectors = Array.isArray(this.dragOptions.selector) ? this.dragOptions.selector.join(",") : this.dragOptions.selector
				this.draggable($(this.$el).find(targetSelectors), this.dragOptions.enabled)
			}
			if (this.dropOptions.selector) {
				targetSelectors = Array.isArray(this.dropOptions.selector) ? this.dropOptions.selector.join(",") : this.dropOptions.selector
				this.droppable($(this.$el).find(targetSelectors), this.dropOptions.enabled)
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.dndEnabled()
		})
	}
}

export default DnDMixin