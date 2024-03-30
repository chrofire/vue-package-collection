/**
 * @template {keyof HTMLElementEventMap} K
 * @typedef {(this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown} RegisterListener
 */

/**
 * @typedef {boolean | AddEventListenerOptions} RegisterAddOptions
 */

/**
 * @typedef {boolean | EventListenerOptions} RegisterRemoveOptions
 */

/**
 * @typedef {{
 *  add?: RegisterAddOptions,
 *  remove?: RegisterRemoveOptions
 * }} RegisterOptions
 */

/**
* 注册 HTML 元素 事件 (返回注销函数)
* @template {keyof HTMLElementEventMap} K
* @param {HTMLElement} el
* @param {K} type
* @param {RegisterListener<K>} listener
* @param {RegisterOptions=} options
*/
export const registerHtmlElEvent = (
    el,
    type,
    listener,
    options
) => {
    const { add, remove } = options || { add: { passive: true }}

    el.addEventListener(type, listener, add)

    return () => el.removeEventListener(type, listener, remove)
}

/**
* 创建事件清理函数
* @template {(...args: unknown[]) => unknown} T
*/
export const createEventCleanup = () => {
    /** @type {T[]} */
    const cleanupList = []

    const cleanup = () => {
        cleanupList.forEach(fn => fn())
        cleanupList.length = 0
    }

    return {
        cleanupList,
        cleanup
    }
}
