import http from "./http";

/**
 * API接口
 * @param {Object} config 请求参数
 * @return {Object} 
 */
export function chartApi(config = {}) {
  const { url, method, params } = config;
  return http({
    url: url || "",
    method: method || 'post',
    [method == 'get' ? "params" : "data"]: params
  })
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

/**
 * 判断是否是URL
 * @param {String} url
 * @return {Boolean} 
 */
export function isUrl(url) {
  let Exp = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;
  return Exp.test(url);
}