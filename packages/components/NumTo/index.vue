<template>
    <div class="num-to" :class="classes.list" :style="styles.list">
        <template v-for="(item, index) in numList" :key="index">
            <div v-if="item === '.'" :class="classes.dot" :style="styles.dot">.</div>
            <div v-else-if="item === ','" :class="classes.comma" :style="styles.comma">,</div>
            <div v-else :class="classes.num" :style="styles.num">{{ item }}</div>
        </template>
    </div>
</template>

<script lang="jsx" setup>
import { TransitionPresets, useTransition } from '@vueuse/core'
import { computed, ref, toValue, useAttrs, useSlots, watchEffect } from 'vue'

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
        /** @type {import('vue').PropType<number | string | (() => number) | null>} */
        type: [Number, String, Function],
        default: 0
    },
    /** 添加千分位逗号 */
    addComma: {
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
        /** @type {import('vue').PropType<Record<'list' | 'dot' | 'comma' | 'num', import('vue').HTMLAttributes['class']>>} */
        type: Object,
        default: () => ({})
    },
    /** 样式 */
    styles: {
        /** @type {import('vue').PropType<Record<'list' | 'dot' | 'comma' | 'num', import('vue').HTMLAttributes['style']>>} */
        type: Object,
        default: () => ({})
    }
})

const attrs = useAttrs()

const slots = useSlots()

// 动态值
const source = ref(props.start)

const output = useTransition(source, {
    duration: 2000,
    transition: TransitionPresets.easeInOutCubic,
    ...props.transitionOptions
})

const numList = computed(() => {
    if (typeof props.end === 'undefined' || props.end === null) return ['0']

    const dotSplit = Number(props.end).toString().split('.')
    const fixedLength = dotSplit.length <= 1 ? 0 : dotSplit.pop().length
    const num = output.value.toFixed(fixedLength).toString()
    let resultNum = num.padStart(String(toValue(props.end)).length, '0')
    if (props.addComma) {
        resultNum = resultNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    return resultNum.split('')
})

watchEffect(() => {
    const targetValue = toValue(props.end)
    if (typeof targetValue !== 'number') return
    source.value = toValue(props.end)
})
</script>

<style lang="scss" scoped>
.num-to {
    display: inline-flex;
}
</style>
