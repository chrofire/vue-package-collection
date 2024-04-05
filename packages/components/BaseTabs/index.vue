<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { ElTabPane, ElTabs } from 'element-plus'
import { h, ref, useAttrs, useSlots } from 'vue'

defineOptions({
    name: 'BaseTabs',
    inheritAttrs: false
})

const props = defineProps({
    /** items 数组 */
    items: {
        type: Array,
        default: () => []
    }
})

const attrs = useAttrs()

const slots = useSlots()

const tabsRef = ref(null)

const filterAttrs = attrs => {
    const { labelRender, ...args } = attrs
    return {
        ...args
    }
}
const filterItemProps = item => {
    const { valueRender, labelRender, name, ...args } = item
    return {
        key: name,
        name,
        ...args
    }
}

defineExpose({
    tabsRef
})

useRender(() => {
    return h(
        ElTabs,
        {
            ref: tabsRef,
            ...filterAttrs(attrs)
        },
        () =>
            props.items.map(item => {
                return h(ElTabPane, filterItemProps(item), {
                    default:
                        (item.valueRender && (() => item.valueRender(item)))
                        || (slots[item.name] && (() => slots[item.name](item)))
                        || null,
                    label:
                        (item.labelRender && (() => item.labelRender(item)))
                        || (slots[`${item.name}Label`]
                            && (() => slots[`${item.name}Label`](item)))
                        || (() => item.label)
                })
            })
    )
})
</script>

<style lang="scss" scoped></style>
