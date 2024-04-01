<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import { computed, h, ref, useAttrs, useSlots } from 'vue'

defineOptions({
    name: 'BaseSelect',
    inheritAttrs: false
})

const props = defineProps({
    /** options 数组 */
    options: {
        type: Array,
        default: () => []
    },
    /** 自定义字段名 */
    fieldNames: {
        type: Object,
        default: () => ({})
    },
    /**
     * 绑定 对象
     * 启用 bindObject 会自动设置 Select 组件的 valueKey, 取值为 props.fieldNames.value
     */
    bindObject: {
        type: Boolean,
        default: false
    },
    /** 转换 option数据 作为 Option Group 组件 的 props */
    getGroupProps: {
        type: Function
    },
    /** 转换 option数据 作为 Option 组件 的 props */
    getOptionProps: {
        type: Function
    },
    /** 下拉列表顶部的内容 渲染器 */
    headerRender: {
        type: Function
    },
    /** 下拉列表底部的内容 渲染器 */
    footerRender: {
        type: Function
    },
    /** Select 组件头部内容 渲染器 */
    prefixRender: {
        type: Function
    },
    /** 无选项时的列表 渲染器 */
    emptyRender: {
        type: Function
    },
    /** Select 组件自定义标签内容 渲染器 */
    tagRender: {
        type: Function
    },
    /** Select 组件自定义loading内容 渲染器 */
    loadingRender: {
        type: Function
    },
    /** label 渲染器 */
    labelRender: {
        type: Function
    }
})

const attrs = useAttrs()

const slots = useSlots()

/** 填充默认字段 */
function fillFieldNames (fieldNames = {}) {
    const { value, label, children } = fieldNames || {}

    return {
        value: value || 'value',
        label: label || 'label',
        children: children || 'children'
    }
}

const selectRef = ref(null)

const _fieldNames = computed(() => {
    return fillFieldNames(props.fieldNames)
})

const _getGroupProps = computed(() => {
    // 传入 getGroupProps
    if (props.getGroupProps) return props.getGroupProps
    // 默认
    return defaultGetGroupProps
})

const _getOptionProps = computed(() => {
    // 传入 getOptionProps
    if (props.getOptionProps) return props.getOptionProps
    // 绑定 对象
    if (props.bindObject) return objectGetOptionProps
    // 默认
    return defaultGetOptionProps
})

const optionRender = rawOption => {
    const option = _getOptionProps.value(rawOption)

    return h(
        ElOption,
        option,
        (rawOption.labelRender && (() => rawOption.labelRender(rawOption)))
        || (props.labelRender && (() => props.labelRender(rawOption)))
        || (slots.label && (() => slots.label(rawOption)))
        || (() => rawOption[_fieldNames.value.label])
    )
}

const defaultGetGroupProps = rawOption => {
    const { label, ...args } = rawOption
    delete args[_fieldNames.value.children]
    return {
        key: label,
        label,
        ...args
    }
}

const defaultGetOptionProps = rawOption => {
    const { labelRender, ...args } = rawOption
    const label = rawOption[_fieldNames.value.label]
    const value = rawOption[_fieldNames.value.value]
    return {
        key: value,
        ...args,
        label,
        value
    }
}

const objectGetOptionProps = rawOption => {
    const { labelRender, ...args } = rawOption
    const label = rawOption[_fieldNames.value.label]
    const value = rawOption[_fieldNames.value.value]
    return {
        key: value,
        ...args,
        label,
        value: rawOption
    }
}

const createSlot = slotName => {
    const renderName = `${slotName}Render`
    return (props[renderName] && ((...scope) => props[renderName](...scope)))
        || (slots[slotName] && ((...scope) => slots[slotName](...scope)))
        || null
}

defineExpose({
    selectRef
})

useRender(() => {
    return h(
        ElSelect,
        {
            ref: selectRef,
            placeholder: '',
            ...attrs,
            valueKey: props.bindObject ? _fieldNames.value.value : undefined
        },
        {
            default: () => {
                return props.options.map(rawOption => {
                    const children = rawOption[_fieldNames.value.children]
                    if (children && Array.isArray(children)) {
                        // Option Group
                        return h(ElOptionGroup, _getGroupProps.value(rawOption), () =>
                            children.map(opt => optionRender(opt)))
                    } else {
                        // Option
                        return optionRender(rawOption)
                    }
                })
            },
            header: createSlot('header'),
            footer: createSlot('footer'),
            prefix: createSlot('prefix'),
            empty: createSlot('empty'),
            tag: createSlot('tag'),
            loading: createSlot('loading')
        }
    )
})
</script>

<style lang="scss" scoped></style>
