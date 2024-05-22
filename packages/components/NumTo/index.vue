<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { computed, mergeProps, ref, toValue, useAttrs, useSlots, watch } from 'vue'

defineOptions({
    name: 'NumTo',
    inheritAttrs: true
})

/**
 * @typedef { 'list' | 'item' | 'dot' | 'comma' | 'symbol' | 'num' } className 类名
 */

const props = defineProps({
    /** 开始值 */
    start: {
        /** @type {import('vue').PropType<number | string  | null | undefined | (() => number | string  | null | undefined)>} */
        type: [Number, String, Function],
        default: 0
    },
    /** 结束值 */
    end: {
        /** @type {import('vue').PropType<number | string  | null | undefined | (() => number | string  | null | undefined)>} */
        type: [Number, String, Function],
        default: undefined
    },
    /** 结束值非法时隐藏内容 */
    hideIllegalEnd: {
        type: Boolean,
        default: false
    },
    /** 添加 千分位逗号 */
    addComma: {
        type: Boolean,
        default: false
    },
    /** 添加 +号 */
    addPlusSymbol: {
        type: Boolean,
        default: false
    },
    /** 元素包装 */
    itemWrapper: {
        type: Boolean,
        default: false
    },
    /** useTransition options */
    transitionOptions: {
        type: Object,
        default: () => ({})
    },
    /** 类名 */
    classes: {
        /** @type {import('vue').PropType<Record<className, import('vue').HTMLAttributes['class']>>} */
        type: Object,
        default: () => ({})
    },
    /** 样式 */
    styles: {
        /** @type {import('vue').PropType<Record<className, import('vue').HTMLAttributes['style']>>} */
        type: Object,
        default: () => ({})
    }
})

const attrs = useAttrs()

const slots = useSlots()

const elRef = ref()

const startValue = computed(() => {
    let { numberValue, stringValue } = normalizedValue(props.start)
    if (numberValue === null) {
        numberValue = 0
        stringValue = String(numberValue)
    }
    return {
        /** @type {number} */
        number: numberValue,
        string: stringValue
    }
})

const endValue = computed(() => {
    let { numberValue, stringValue } = normalizedValue(props.end)
    let isIllegal = false
    if (numberValue === null) {
        isIllegal = true
        numberValue = startValue.value.number
        stringValue = startValue.value.string
    }
    return {
        isIllegal,
        /** @type {number} */
        number: numberValue,
        string: stringValue
    }
})

// 动态值
const source = ref(startValue.value.number)

const output = useTransition(source, {
    duration: 2000,
    transition: TransitionPresets.easeInOutCubic,
    ...props.transitionOptions
})

/**
 * 规格化值, 非法值返回 `{ numberValue: null, stringValue: '' }`
 * @description 非法值: `null`, `undefined`, `''`
 */
function normalizedValue (_value) {
    const value = toValue(_value)

    const result = {
        numberValue: null,
        stringValue: ''
    }

    // null, undefined, ''
    if ([null, void 0].includes(value) || String(value).trim() === '') return result

    const numberValue = Number(value)

    if (Number.isNaN(numberValue)) return result

    Object.assign(result, {
        numberValue,
        stringValue: String(value)
    })

    return result
}

const valueList = computed(() => {
    const { string: stringValue, isIllegal } = endValue.value

    if (isIllegal && props.hideIllegalEnd) return []

    // 目标值
    let [targetLeft = '', targetRight = ''] = stringValue.split('.')
    let targetLeftSymbol = ''
    let targetLeftContent = targetLeft
    if (['-', '+'].includes(targetLeft[0])) {
        targetLeftSymbol = targetLeft[0]
        targetLeftContent = targetLeft.slice(1)
    }

    // 输出值
    const fixedOutput = output.value.toFixed(targetRight.length)
    const [leftOutput = '', rightOutput = ''] = fixedOutput.split('.')
    let leftOutputSymbol = ''
    let leftOutputContent = leftOutput
    // leftOutput 没有 +号 的情况
    if (leftOutput[0] === '-') {
        leftOutputSymbol = leftOutput[0]
        leftOutputContent = leftOutput.slice(1)
    }

    let padFixedLeftSymbol = ''
    if (output.value > 0) padFixedLeftSymbol = props.addPlusSymbol ? '+' : ''
    if (output.value < 0) padFixedLeftSymbol = '-'
    if (output.value === 0) padFixedLeftSymbol = targetLeftSymbol

    // 填充 0
    const padFixedLeftContent = leftOutputContent.padStart(targetLeftContent.length, '0')

    const padFixedRight = rightOutput.length ? `.${rightOutput}` : ''

    let padFixedOutput = `${padFixedLeftSymbol}${padFixedLeftContent}${padFixedRight}`

    if (props.addComma) {
        padFixedOutput = padFixedOutput.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return padFixedOutput.split('')
})

watch(endValue, () => {
    source.value = endValue.value.number
}, {
    immediate: true
})

defineExpose({
    elRef,
    normalizedValue,
    valueList
})

useRender(() => {
    return (
        <div class={['num-to', props.classes.list]} style={props.styles.list} ref={elRef} {...attrs}>
            {valueList.value.map((item, index) => {
                const key = `${index}-${item}`
                let content

                if (item === '.') {
                    content = <div class={props.classes.dot} style={props.styles.dot}>.</div>
                } else if (item === ',') {
                    content = <div class={props.classes.comma} style={props.styles.comma}>,</div>
                } else if (item === '-' || item === '+') {
                    content = <div class={props.classes.symbol} style={props.styles.symbol}>{ item }</div>
                } else {
                    content = <div class={props.classes.num} style={props.styles.num}>{ item }</div>
                }

                if (props.itemWrapper) {
                    return <div key={key} class={props.classes.item} style={props.styles.item}>{content}</div>
                }
                return mergeProps(content, { key })
            })}
        </div>
    )
})
</script>

<style lang="scss" scoped>
.num-to {
    display: inline-flex;
}
</style>
