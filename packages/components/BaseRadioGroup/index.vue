<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { ElRadio, ElRadioButton, ElRadioGroup } from 'element-plus'
import { computed, h, ref, useAttrs, useSlots } from 'vue'

defineOptions({
    name: 'BaseRadioGroup',
    inheritAttrs: false
})

const props = defineProps({
    /** 按钮类型 */
    optionType: {
        type: String,
        default: 'radio',
        validator: val => ['radio', 'button'].includes(val)
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
    /** 转换 option数据 作为 option组件 的 props */
    getOptionProps: {
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
    const { value, label } = fieldNames || {}

    return {
        value: value || 'value',
        label: label || 'label'
    }
}

const checkboxGroupRef = ref(null)

const _fieldNames = computed(() => {
    return fillFieldNames(props.fieldNames)
})

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

const _getOptionProps = computed(() => {
    return props.getOptionProps || defaultGetOptionProps
})

defineExpose({
    checkboxGroupRef
})

useRender(() => {
    const OptionComponent = props.optionType === `button` ? ElRadioButton : ElRadio

    return h(
        ElRadioGroup,
        {
            ref: checkboxGroupRef,
            ...attrs
        },
        {
            default: () =>
                props.options.map(rawOption => {
                    const option = _getOptionProps.value(rawOption)
                    return h(
                        OptionComponent,
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

<style lang="scss" scoped></style>
