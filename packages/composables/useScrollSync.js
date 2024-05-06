import { createEventCleanup, registerHtmlElEvent } from '@/utils/dom'
import { onBeforeUnmount, ref, toValue, unref, watch } from 'vue'

/**
 * 同步滚动
 * @param {import('./useScrollSync.types').UseScrollSyncOpts} options 选项
 */
export const useScrollSync = options => {
    const { list, x: allowScrollX = true, y: allowScrollY = true } = options

    /**
     * 当前聚焦的元素
     * @type {import('vue').Ref<HTMLElement>}
     */
    const currentFocusEl = ref()

    const { cleanupList: pointerEnterCleanupList, cleanup: pointerEnterCleanup } = createEventCleanup()
    const { cleanupList: scrollCleanupList, cleanup: scrollCleanup } = createEventCleanup()

    watch(
        () => toValue(list),
        _list => {
            // 重置
            pointerEnterCleanup()
            scrollCleanup()
            currentFocusEl.value = null

            _list.forEach(item => {
                const scrollEl = item
                if (!scrollEl) return
                pointerEnterCleanupList.push(registerHtmlElEvent(scrollEl, 'pointerenter', pointerEnterHandler))
            })
        },
        {
            deep: true
        }
    )

    const pointerEnterHandler = (/** @type {PointerEvent} */ e) => {
        currentFocusEl.value = e.currentTarget
    }

    // 只监听 聚焦的元素 的 滚动事件
    watch(currentFocusEl, newVal => {
        // 每次切换聚焦的元素时重置
        scrollCleanup()
        if (!newVal) return
        scrollCleanupList.push(registerHtmlElEvent(newVal, 'scroll', scrollHandler))
    })

    const scrollHandler = (/** @type {Event} */ e) => {
        // 滚动的元素
        const target = e.target

        const { scrollTop, scrollHeight, offsetHeight, scrollLeft, scrollWidth, offsetWidth }
            = target

        // scrollHeight - offsetHeight = 未展示部分高度之和
        const heightRatio = scrollTop / (scrollHeight - offsetHeight)
        const widthRatio = scrollLeft / (scrollWidth - offsetWidth)

        // 修改其他滚动元素的偏移量
        const effectList = toValue(list).filter(el => el !== e.target)
        effectList.forEach(effectEl => {
            if (!effectEl) return

            if (unref(allowScrollY)) {
                effectEl.scrollTop = Math.round(
                    heightRatio * (effectEl.scrollHeight - effectEl.offsetHeight)
                )
            }

            if (unref(allowScrollX)) {
                effectEl.scrollLeft = Math.round(
                    widthRatio * (effectEl.scrollWidth - effectEl.offsetWidth)
                )
            }
        })
    }

    onBeforeUnmount(() => {
        pointerEnterCleanup()
        scrollCleanup()
    })
}
