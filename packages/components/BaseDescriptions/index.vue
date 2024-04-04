<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { h, ref, useAttrs, useSlots } from 'vue'

defineOptions({
    name: 'BaseDescriptions',
    inheritAttrs: false
})

const props = defineProps({
    /** items 数组 */
    items: {
        type: Array,
        default: () => []
    },
    /** 左上方 标题 渲染器 */
    titleRender: {
        type: Function
    },
    /** 右上方 操作区 渲染器 */
    extraRender: {
        type: Function
    }
})

const attrs = useAttrs()

const slots = useSlots()

const descriptionsRef = ref(null)

const filterAttrs = attrs => {
    const { titleRender, extraRender, ...args } = attrs
    return {
        ...args
    }
}
const filterItemProps = item => {
    const { valueRender, labelRender, prop, ...args } = item
    return {
        // 取 prop 作为 key
        key: prop,
        ...args
    }
}

defineExpose({
    descriptionsRef
})

useRender(() => {
    return h(
        ElDescriptions,
        {
            ref: descriptionsRef,
            ...filterAttrs(attrs)
        },
        {
            default: () =>
                props.items.map(item => {
                    return h(ElDescriptionsItem, filterItemProps(item), {
                        default:
                            (item.valueRender && (() => item.valueRender(item)))
                            || (slots[item.prop] && (() => slots[item.prop](item)))
                            || (() => item.value),
                        label:
                            (item.labelRender && (() => item.labelRender(item)))
                            || (slots[`${item.prop}Label`] && (() => slots[`${item.prop}Label`](item)))
                            || (() => item.label)
                    })
                }),
            title:
                (props.titleRender && (() => props.titleRender()))
                || (slots.title && (() => slots.title()))
                || null,
            extra:
                (props.extraRender && (() => props.extraRender()))
                || (slots.extra && (() => slots.extra()))
                || null
        }
    )
})
</script>

<style lang="scss" scoped></style>
