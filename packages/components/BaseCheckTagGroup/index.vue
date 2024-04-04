<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { ElCheckTag } from 'element-plus'
import { computed, h, mergeProps, ref, useAttrs, useSlots } from 'vue'

defineOptions({
    name: 'BaseCheckTagGroup',
    inheritAttrs: false
})

const props = defineProps({
    /** 选中值数组 */
    modelValue: {
        type: Array
    },
    /** 更新:选中值数组 */
    'onUpdate:modelValue': {
        type: Function
    },
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
    /** label 渲染器 */
    labelRender: {
        type: Function
    }
})

const attrs = useAttrs()

const slots = useSlots()

/** 填充默认字段 */
function fillFieldNames (fieldNames = {}) {
    const { value, label } = fieldNames || {}

    return {
        value: value || 'value',
        label: label || 'label'
    }
}

const checkTagGroupRef = ref(null)

const _fieldNames = computed(() => {
    return fillFieldNames(props.fieldNames)
})

const _modelValue = computed(() => {
    const value = new Set(props.modelValue || [])
    return [...value]
})

const defaultGetOptionProps = rawOption => {
    const { labelRender, ...args } = rawOption
    // const label = rawOption[_fieldNames.value.label]
    const value = rawOption[_fieldNames.value.value]

    return mergeProps({
        key: value,
        checked: _modelValue.value.includes(value),
        onChange: checked => {
            const list = new Set(_modelValue.value)
            if (checked) {
                list.add(value)
            } else {
                list.delete(value)
            }
            const newList = [...list]
            props['onUpdate:modelValue']?.(newList)
        }
    }, args)
}

const _getOptionProps = computed(() => {
    return defaultGetOptionProps
})

defineExpose({
    checkTagGroupRef
})

useRender(() => {
    return h(
        'div',
        {
            ref: checkTagGroupRef,
            class: 'base-check-tag-group',
            ...attrs
        },
        {
            default: () =>
                props.options.map(rawOption => {
                    const option = _getOptionProps.value(rawOption)
                    return h(
                        ElCheckTag,
                        // Option props
                        option,
                        // 用于显示
                        (rawOption.labelRender && (() => rawOption.labelRender(rawOption)))
                        || (props.labelRender && (() => props.labelRender(rawOption)))
                        || (slots.label && (() => slots.label(rawOption)))
                        || (() => rawOption[_fieldNames.value.label])
                    )
                })
        }
    )
})
</script>

<style lang="scss" scoped>
.base-check-tag-group {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 10px;
}
</style>
