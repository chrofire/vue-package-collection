import { ref, onBeforeUpdate } from 'vue'

/**
 * 响应式 slot
 * @template {Record<string, (...args: unknown[]) => unknown>} T
 * @param {T} slots 插槽对象
 * @param {keyof T} slotName 插槽名
 */
export const useSlotRef = (slots, slotName) => {
    const slot = ref(slots[slotName])

    // https://cn.vuejs.org/api/composition-api-setup.html#setup-context
    // slots` 的属性不是响应式的, 如果想要基于 `slots` 的改变来执行副作用, 那么应该在 `onBeforeUpdate` 生命周期钩子中编写相关逻辑
    onBeforeUpdate(() => {
        const newSlot = slots[slotName]
        if (slot.value !== newSlot) {
            slot.value = newSlot
        }
    })

    return slot
}
