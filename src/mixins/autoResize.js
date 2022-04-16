import { debounce, observerDomResize } from '@/utils'

export default {
  data() {
    return {
      dom: '',

      width: 0,
      height: 0,

      disWidth: 0,
      disHeight: 0,

      debounceInitWHFun: '',

      domObserver: '',

      debounceTime: 10, // ms
    }
  },
  methods: {
    async autoResizeMixinInit() {
      const { initWH, getDebounceInitWHFun, bindDomResizeCallback, afterAutoResizeMixinInit } = this

      await initWH(false)

      getDebounceInitWHFun()

      bindDomResizeCallback()

      if (typeof afterAutoResizeMixinInit === 'function') afterAutoResizeMixinInit()
    },
    initWH(resize = true) {
      const { $nextTick, $refs, ref, onResize } = this

      return new Promise(resolve => {
        $nextTick(_ => {
          const dom = this.dom = $refs[ref]

          const newWidth = dom ? dom.clientWidth : 0
          const newHeight = dom ? dom.clientHeight : 0

          this.disWidth = newWidth - this.width
          this.disHeight = newHeight - this.height

          this.width = newWidth
          this.height = newHeight

          if (!dom) {
            // console.warn('Failed to get dom node, component rendering may be abnormal!')
          } else if (!this.width || !this.height) {
            // console.warn('Component width or height is 0px, rendering abnormality may occur!')
          }

          if (typeof onResize === 'function' && resize && (this.disWidth != 0 || this.disHeight != 0)) onResize()

          resolve()
        })
      })
    },
    getDebounceInitWHFun() {
      const { initWH, debounceTime } = this

      this.debounceInitWHFun = debounce(debounceTime, initWH)
    },
    bindDomResizeCallback() {
      const { dom, debounceInitWHFun } = this

      this.domObserver = observerDomResize(dom, debounceInitWHFun)

      window.addEventListener('resize', debounceInitWHFun)
    },
    unbindDomResizeCallback() {
      let { domObserver, debounceInitWHFun } = this

      if (!domObserver) return

      domObserver.disconnect()
      domObserver.takeRecords()
      domObserver = null

      window.removeEventListener('resize', debounceInitWHFun)
    }
  },
  mounted() {
    const { autoResizeMixinInit } = this

    autoResizeMixinInit()
  },
  beforeDestroy() {
    const { unbindDomResizeCallback } = this

    unbindDomResizeCallback()
  }
}
