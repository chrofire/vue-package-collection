<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import { computed, nextTick, reactive, ref, useAttrs } from 'vue'

/**
 * @typedef {
    boolean
    | {
        x?: boolean
        y?: boolean
    }} IKeepRatio
 */

/**
 * @typedef {{
        widthRatio: number,
        heightRatio: number,
        scaleRatio: number
    }} IScaleRatioInfo
 */

/**
 * @typedef {{
        outerElRef: import('vue').Ref<HTMLDivElement>,
        innerElRef: import('vue').Ref<HTMLDivElement>,
        scaleRatioInfo: IScaleRatioInfo,
        innerElStyle: import('vue').ComputedRef<CSSProperties>,
        calcScaleRatio: () => void,
        update: () => void
    }} ScaleWrapperExpose
 */

defineOptions({
    name: 'ScaleWrapper',
    inheritAttrs: false
})

const props = defineProps({
    /** 设计稿宽度 */
    width: {
        type: Number,
        default: 1920
    },
    /** 设计稿高度 */
    height: {
        type: Number,
        default: 1080
    },
    /** 自动缩放 */
    autoScale: {
        type: Boolean,
        default: true
    },
    /** 保持比例 */
    keepRatio: {
        /** @type {import('vue').PropType<IKeepRatio>} */
        type: [Boolean, Object],
        default: true
    },
    /** 延迟 */
    delay: {
        type: Number,
        default: 100
    },
    /** resize 事件 */
    onResize: {
        /** @type {import('vue').PropType<() => void>} */
        type: Function
    }
})

const attrs = useAttrs()

/**
 * @type {{
 *  default: () => import('vue').VNodeChild
 * }}
 */
const slots = defineSlots()

/** @type {import('vue').Ref<HTMLDivElement>} */
const outerElRef = ref()
/** @type {import('vue').Ref<HTMLDivElement>} */
const innerElRef = ref()

/** @type {IScaleRatioInfo} */
const scaleRatioInfo = reactive({
    widthRatio: 1,
    heightRatio: 1,
    scaleRatio: 1
})

const innerElStyle = computed(() => {
    const baseStyle = {
        width: `${props.width}px`,
        height: `${props.height}px`
    }

    const transformParams = [`translate3d(-50%, -50%, 0)`]

    if (typeof props.keepRatio === 'boolean') {
        props.keepRatio
            ? transformParams.push(`scale3d(${scaleRatioInfo.scaleRatio}, ${scaleRatioInfo.scaleRatio}, 1)`)
            : transformParams.push(`scale3d(${scaleRatioInfo.widthRatio}, ${scaleRatioInfo.heightRatio}, 1)`)
    } else {
        transformParams.push(
            `scale3d(${props.keepRatio.x ? scaleRatioInfo.scaleRatio : scaleRatioInfo.widthRatio}, ${
                props.keepRatio.y ? scaleRatioInfo.scaleRatio : scaleRatioInfo.heightRatio
            }, 1)`
        )
    }

    /** @type {import('vue').CSSProperties} */
    const scaleStyle = {
        ...baseStyle,
        transition: `transform 0.3s`,
        transform: transformParams.join(' '),
        transformOrigin: `center center`
    }

    return scaleStyle
})

const calcScaleRatio = () => {
    // 容器宽高
    const wrapperWidth = outerElRef.value.clientWidth
    const wrapperHeight = outerElRef.value.clientHeight

    // 容器宽高 和 设计宽高 的 比例
    const widthRatio = wrapperWidth / props.width
    const heightRatio = wrapperHeight / props.height

    return {
        // 宽度缩放比例
        widthRatio,
        // 高度缩放比例
        heightRatio,
        // 宽高最小缩放比例
        scaleRatio: Math.min(widthRatio, heightRatio)
    }
}

const update = () => {
    const _scaleRatioInfo = calcScaleRatio()
    Object.assign(scaleRatioInfo, _scaleRatioInfo)
}

const handleResize = useDebounceFn(async () => {
    update()
    await nextTick()
    props.onResize?.()
}, props.delay)

useResizeObserver(outerElRef, () => {
    props.autoScale && handleResize()
})

defineExpose(/** @type {ScaleWrapperExpose} */ ({
    outerElRef,
    innerElRef,
    scaleRatioInfo,
    innerElStyle,
    calcScaleRatio,
    update
}))

useRender(() => {
    return (
        <div class="scale-wrapper" ref={outerElRef} {...attrs}>
            <div
                class="scale-wrapper__inner"
                ref={innerElRef}
                style={[innerElStyle.value]}
            >
                {slots.default?.()}
            </div>
        </div>
    )
})
</script>

<style lang="scss" scoped>
.scale-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .scale-wrapper__inner {
        position: absolute;
        top: 50%;
        left: 50%;
    }
}
</style>
