<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { useElementBounding, useRafFn } from '@vueuse/core'
import { cloneVNode, computed, reactive, ref, useAttrs } from 'vue'

defineOptions({
    name: 'SeamlessScroll',
    inheritAttrs: false
})

const props = defineProps({
    /** 自动滚动 */
    auto: {
        type: Boolean,
        default: true
    },
    /** 滚动方向 */
    direction: {
        /** @type {import('vue').PropType<typeof directionList[number]>} */
        type: String,
        default: 'up'
    },
    /** 鼠标悬停 */
    hoverStop: {
        type: Boolean,
        default: true
    },
    /** 滚轮滚动 */
    wheel: {
        type: Boolean,
        default: true
    },
    /** 自动滚动步进 px */
    step: {
        type: Number,
        default: 1
    },
    /** 滚轮滚动步进 px */
    wheelStep: {
        type: Number,
        default: 16
    }
})

const attrs = useAttrs()

/**
 * @type {{
 *  default: () => import('vue').VNodeChild
 * }}
 */
const slots = defineSlots()

// 方向列表
const directionList = /** @type {const} */ (['up', 'down', 'left', 'right'])

/**
 * 外容器元素
 * @type {import('vue').Ref<HTMLDivElement>}
 */
const outerElRef = ref()
/**
 * 内容器元素
 * @type {import('vue').Ref<HTMLDivElement>}
 */
const innerElRef = ref()
/**
 * 模板元素
 * @type {import('vue').Ref<HTMLDivElement>}
 */
const templateElRef = ref()

/** 外容器 DOMRect */
const outerElRect = reactive(useElementBounding(outerElRef))
/** 模板元素 DOMRect */
const templateElRect = reactive(useElementBounding(templateElRef))

/**
 * 内容器元素 x 轴偏移
 * @type {import('vue').Ref<number>}
 */
const innerElX = ref(0)
/**
 * 内容器元素 y 轴偏移
 * @type {import('vue').Ref<number>}
 */
const innerElY = ref(0)
/**
 * 内容器元素样式
 * @type {import('vue').ComputedRef<import('vue').CSSProperties>}
 */
const innerElStyle = computed(() => {
    return {
        transform: `translate3d(${innerElX.value}px, ${innerElY.value}px, 0)`,
        display: ['left', 'right'].includes(props.direction) ? 'inline-flex' : 'block'
    }
})

// 无缝滚动原理
// 只偏移一个模板元素的宽或高, 超过时恢复, 重复该逻辑
const { pause: stopScroll, resume: startScroll } = useRafFn(
    () => {
        if (!props.auto) return
        // 没有传入 默认插槽
        if (!slots.default) return

        if (props.direction === 'up') {
            // 向上滚动, translateY 是 负值
            // 向上滚动的距离 >= 一个模板元素的高度, 则重置偏移
            if (Math.abs(innerElY.value) >= templateElRect.height) {
                innerElY.value = 0
            }
            innerElY.value -= props.step
        }

        if (props.direction === 'down') {
            // 向下滚动, translateY 是 正值
            // 向下滚动 的距离 >= 0 时 内容器元素上面没有其他内容, 导致留白
            // 需要 向上滚动 一个模板元素的高度
            if (innerElY.value >= 0) {
                innerElY.value = -templateElRect.height
            }
            innerElY.value += props.step
        }

        if (props.direction === 'left') {
            // 同 向上滚动, 方向为 X 轴
            if (Math.abs(innerElX.value) >= templateElRect.width) {
                innerElX.value = 0
            }
            innerElX.value -= props.step
        }

        if (props.direction === 'right') {
            // 同 向下滚动, 方向为 X 轴
            if (innerElX.value >= 0) {
                innerElX.value = -templateElRect.width
            }
            innerElX.value += props.step
        }
    },
    {
        immediate: true
    }
)

// 生成模板元素 vnode
const genTemplateElVNode = () => {
    return (
        <div
            class='seamless-scroll__block-wrapper'
            style={{
                overflow: 'hidden'
            }}
        >
            {slots.default?.()}
        </div>
    )
}

// 生成复制模板元素 vnode
const genRepeatTemplateElVNode = computed(() => {
    if (props.direction === 'up' || props.direction === 'down') {
        // 滚动可视区的高度 小于 模板元素的高度, 那么只额外生成一个模板元素
        if (outerElRect.height <= templateElRect.height) return genTemplateElVNode()

        // 根据 滚动可视区的高度 和 模板元素的高度 计算额外重复模板元素的最大数量
        const repeatNum = Math.ceil(outerElRect.height / templateElRect.height)

        if (!Number.isInteger(repeatNum)) return null

        return Array.from({ length: repeatNum }, () => {
            return genTemplateElVNode()
        })
    }

    if (props.direction === 'left' || props.direction === 'right') {
        if (outerElRect.width <= templateElRect.width) return genTemplateElVNode()

        const repeatNum = Math.ceil(outerElRect.width / templateElRect.width)

        if (!Number.isInteger(repeatNum)) return null

        return Array.from({ length: repeatNum }, () => {
            return genTemplateElVNode()
        })
    }

    return null
})

/**
  * 获取最小偏移量
  * @param {'x' | 'y'} axis 轴
  * @param {number} value 偏移量
  */
const getMinOffset = (axis, value) => {
    const length = axis === 'x' ? templateElRect.width : templateElRect.height
    // 最小偏移量
    let minOffset = value % length
    // 以 Y 轴为例, minOffset > 0 时 向下偏移, 导致元素上方留白
    // 需要往上偏移一个模板元素的高度 (减)
    if (minOffset > 0) {
        minOffset = minOffset - length
    }
    // -模板高度 < minOffset <= 0
    return minOffset
}

/** @type {import('vue').HTMLAttributes} */
const innerElAttrs = {
    onTouchstart: e => {
        e.preventDefault()
        stopScroll()

        const touch = e.changedTouches.item(0)
        // touch位置 坐标
        const startX = touch.clientX
        const startY = touch.clientY

        // 初始偏移量: touch时 内容器元素 的偏移量
        const startInnerElX = innerElX.value
        const startInnerElY = innerElY.value

        document.addEventListener('touchmove', touchmove)
        document.addEventListener('touchend', touchend)

        function touchmove (/** @type {TouchEvent} */ e) {
            const touch = e.changedTouches.item(0)
            // 当前 touch位置 相对于 初始偏移量 的偏移
            const offsetX = touch.clientX - startX
            const offsetY = touch.clientY - startY

            if (props.direction === 'up' || props.direction === 'down') {
                const offset = startInnerElY + offsetY
                innerElY.value = getMinOffset('y', offset)
            }

            if (props.direction === 'left' || props.direction === 'right') {
                const offset = startInnerElX + offsetX
                innerElX.value = getMinOffset('x', offset)
            }
        }

        function touchend (/** @type {TouchEvent} */ e) {
            document.removeEventListener('touchmove', touchmove)
            document.removeEventListener('touchend', touchend)
            startScroll()
        }
    },
    onMouseenter: () => {
        if (props.hoverStop) {
            stopScroll()
        }
    },
    onMouseleave: () => {
        if (props.hoverStop) {
            startScroll()
        }
    },
    onWheel: e => {
        // 滚轮事件默认会触发页面滚动
        e.preventDefault()
        if (!props.wheel) return

        if (props.direction === 'up' || props.direction === 'down') {
            let offset
            if (e.deltaY > 0) {
                // 滚轮向下滚, dom 向上滚动
                offset = innerElY.value - props.wheelStep
            } else {
                // 滚轮向上滚, dom 向下滚动
                offset = innerElY.value + props.wheelStep
            }
            innerElY.value = getMinOffset('y', offset)
        }

        if (props.direction === 'left' || props.direction === 'right') {
            let offset
            if (e.deltaY > 0) {
                // 滚轮向下滚, dom 向左滚动
                offset = innerElX.value - props.wheelStep
            } else {
                // 滚轮向上滚, dom 向右滚动
                offset = innerElX.value + props.wheelStep
            }
            innerElX.value = getMinOffset('x', offset)
        }
    }
}

useRender(() => {
    return (
        <div class={['seamless-scroll']} ref={outerElRef} {...attrs}>
            <div
                class={['seamless-scroll__inner']}
                ref={innerElRef}
                style={[innerElStyle.value]}
                {...innerElAttrs}
            >
                {cloneVNode(genTemplateElVNode(), {
                    ref: templateElRef
                })}
                {genRepeatTemplateElVNode.value}
            </div>
        </div>
    )
})
</script>

<style lang="scss" scoped>
.seamless-scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
