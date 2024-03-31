import { getCurrentInstance } from 'vue'

export const useRender = (/** @type {import('vue').RenderFunction} */ render) => {
    /** @type {import('vue').ComponentInternalInstance & { render: import('vue').RenderFunction }} */
    const instance = getCurrentInstance()

    if (!instance) {
        console.warn(`useRender 只能在 setup 函数中使用`)
        return
    }

    // instance.render = render
    // 生产环境中, SFC中如果没有定义 <template>, instance.render 会被覆盖成空函数 () => {}

    Object.defineProperty(instance, 'render', {
        get: () => render,
        // setter 解决生产环境 render 被覆盖成空函数
        set: () => {}
    })
}
