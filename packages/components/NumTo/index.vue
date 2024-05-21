<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { computed, mergeProps, ref, toValue, useAttrs, useSlots, watch } from 'vue'

defineOptions({
    name: 'NumTo',
    inheritAttrs: true
})

const props = defineProps({
    /** 开始值 */
    start: {
        type: Number,
        default: 0
    },
    /** 结束值 */
    end: {
        /** @type {import('vue').PropType<number | string  | null | undefined | (() => number | string  | null | undefined)>} */
        type: [Number, String, Function],
        default: undefined
    },
    /** 结束值非法时, 回滚到开始值 */
    rollbackToStart: {
        type: Boolean,
        default: true
    },
    /** 添加千分位逗号 */
    addComma: {
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
        /** @type {import('vue').PropType<Record<'list' | 'item' | 'dot' | 'comma' | 'num', import('vue').HTMLAttributes['class']>>} */
        type: Object,
        default: () => ({})
    },
    /** 样式 */
    styles: {
        /** @type {import('vue').PropType<Record<'list' | 'item' | 'dot' | 'comma' | 'num', import('vue').HTMLAttributes['style']>>} */
        type: Object,
        default: () => ({})
    }
})

const attrs = useAttrs()

const slots = useSlots()

const elRef = ref()

// 动态值
const source = ref(props.start)

const output = useTransition(source, {
    duration: 2000,
    transition: TransitionPresets.easeInOutCubic,
    ...props.transitionOptions
})

/**
 * 获取合法的数值, 非法值返回 null
 */
const getValidNum = _value => {
    const value = toValue(_value)

    // null, undefined, ''
    if ([null, void 0].includes(value) || String(value).trim() === '') return null

    const numValue = Number(value)

    if (Number.isNaN(numValue)) return null

    return numValue
}

const valueList = computed(() => {
    let numEnd = getValidNum(props.end)

    if (numEnd === null) {
        if (props.rollbackToStart) numEnd = props.start
        else return []
    }

    const stringEnd = String(numEnd)

    const [left = '', right = ''] = stringEnd.split('.')

    const fixedOutput = output.value.toFixed(right.length)
    const [leftOutput = '', rightOutput = ''] = fixedOutput.split('.')
    // 填充 0
    let padFixedOutput = `${leftOutput.padStart(left.length, '0')}${rightOutput.length ? `.${rightOutput}` : ''}`

    if (props.addComma) {
        padFixedOutput = padFixedOutput.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return padFixedOutput.split('')
})

watch(() => props.end, () => {
    const numEnd = getValidNum(props.end)
    if (numEnd === null) {
        source.value = props.start
    } else {
        source.value = numEnd
    }
}, {
    immediate: true
})

defineExpose({
    elRef,
    getValidNum,
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
