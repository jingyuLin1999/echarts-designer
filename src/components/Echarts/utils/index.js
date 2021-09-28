import http from "./http";
export async function chartApi({ data, config } = {}) {
    // const { url, method } = config;
    // const { payload } = await http({
    //     url: url || "",
    //     method: method || 'post',
    //     data
    // })
    // return payload;
    let bb = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ a: 132 })
        }, 2000)
    })
    return bb;
}

/**
 * 防抖函数
 * @param {function} fn
 * @param {number} delay
 * let debounce = debounce(fn, delay); debounce()
 */
 export function _debounce(fn, delay) {
    let timer
    return function () {
      let context = this
      let args = arguments
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }