<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { ElCol, ElForm, ElFormItem, ElRow, ElTooltip } from 'element-plus'
import { computed, h, mergeProps, ref, toValue, unref, useAttrs, useSlots } from 'vue'
import { baseFormComponentMap, isRegisteredBaseFormComponent } from './componentMap'

defineOptions({
    name: 'BaseForm',
    inheritAttrs: false
})

/**
 * @typedef {{
 *  extraContext?: unknown,
 *  renderType?: string,
 *  props?: Record<string, unknown>,
 *  slots?: Record<string, import('vue').VNodeChild>,
 *  slotName?: string,
 *  label?: string,
 *  labelRender?: () => import('vue').VNodeChild,
 *  errorRender?: () => ,
 *  colProps?: import('element-plus').ColProps,
 *  isShow?: import('vue').MaybeRefOrGetter<boolean>
 * } & import('element-plus').FormItemProps} FormListItem
 */

const props = defineProps({
    /** 表单项 */
    formList: {
        /** @type {FormListItem[]} */
        type: Array,
        default: () => []
    },
    /** Row Props */
    rowProps: {
        /** @type {import('element-plus').RowProps} */
        type: Object,
        default: () => ({})
    },
    /** 表单数据对象 */
    formData: {
        type: Object,
        default: () => ({})
    },
    /** 更新:表单数据对象 */
    'onUpdate:formData': {
        type: Function,
        default: () => {}
    },
    /** 注册事件 */
    onRegister: {
        type: Function,
        default: () => {}
    }
})

const attrs = useAttrs()

const slots = useSlots()


const formRef = ref(null)

const formData = computed({
    // 外部 修改 formData
    // formProps.formData = {...} 触发 get
    get () {
        return props.formData
    },
    // 内部 修改 formData
    // formData.value = {...} 触发 set
    // 需要 外部 监听 update:formData 或 v-model:formData 修改 formData 的 值
    set (val) {
        props['onUpdate:formData'](val)
    }
})

// 生成表单列表
const genFormItems = formItems => {
    return formItems.map(formItem => {
        const {
            /** 过滤额外的字段 start */
            extraContext,
            renderType,
            props,
            slots,
            slotName,
            label,
            labelRender,
            errorRender,
            colProps = {},
            isShow,
            /** 过滤额外的字段 end */
            ...formItemArgs
        } = formItem

        const formItemProps = {
            ...formItemArgs
        }

        const formItemSlots = {
            default: () => genFormItem(formItem),
            label: () => renderLabel(formItem),
            error: ({ error }) => errorRender?.(error)
        }

        const vnode = h(ElCol, { key: formItem.prop, ...colProps }, () =>
            h(ElFormItem, formItemProps, formItemSlots))

        if (typeof isShow !== 'undefined') {
            return toValue(isShow) ? vnode : null
        }

        return vnode
    })
}

// 生成表单项
const genFormItem = formItem => {
    const { renderType, render, prop, slotName } = formItem

    const scopeData = {
        formItem,
        formData: unref(formData)
    }

    // renderType 配置使用已注册的组件
    if (typeof renderType === 'string') {
        const isRegistered = isRegisteredBaseFormComponent(renderType)
        if (!isRegistered) return h('span', '未注册组件')

        return genRegisteredComponent(formItem)
    }

    // 使用渲染函数
    if (typeof render === 'function') return render(scopeData)

    // 不存在内容渲染函数, 取插槽内容
    if (!render) return slots[slotName || prop]?.(scopeData)
}

// 标签渲染函数
const renderLabel = formItem => {
    const { label, labelRender, help, helpRender } = formItem

    const scopeData = {
        formItem,
        formData: unref(formData)
    }

    const labelVnode = typeof labelRender === 'function' ? labelRender(scopeData) : label

    let helpVnode

    if (help) {
        helpVnode = (
            <ElTooltip
                class='help-label-tooltip'
                effect="dark"
                placement="top"
                persistent={false}
            >
                {{
                    default: () => <i class='i-ep-question-filled cursor-pointer'></i>,
                    content: () => (
                        <div>{help}</div>
                    )
                }}
            </ElTooltip>
        )
    }

    if (typeof helpRender === 'function') helpVnode = helpRender(scopeData)

    if (helpVnode) {
        return (
            <div class='help-label'>
                <div class='help-label-content'>{labelVnode}</div>
                {helpVnode}
            </div>
        )
    }

    return labelVnode
}

// 生成自定义组件 vnode
const genRegisteredComponent = formItem => {
    const { renderType, props = {}, slots = {}, prop } = formItem
    const componentInfo = baseFormComponentMap.get(renderType)
    const hasCustomRender = typeof componentInfo.render === 'function'

    // 存在自定义渲染器
    if (hasCustomRender) {
        return componentInfo.render({
            componentInfo,
            formItem,
            formData
        })
    }

    // 默认
    return h(
        componentInfo.component,
        {
            modelValue: formData.value[prop],
            'onUpdate:modelValue': value => (formData.value[prop] = value),
            ...mergeProps({}, componentInfo.props || {}, props)
        },
        {
            ...(componentInfo.slots || {}),
            ...slots
        }
    )
}

const validate = async (fullResult = false) => {
    const result = {
        valid: null,
        errors: null
    }
    try {
        result.valid = await unref(formRef).validate()
    } catch (errors) {
        Object.assign(result, {
            valid: false,
            errors
        })
    }
    if (fullResult) return result
    return result.valid
}
const validateField = (...args) => unref(formRef).validateField(...args)
const resetFields = (...args) => unref(formRef).resetFields(...args)
const clearValidate = (...args) => unref(formRef).clearValidate(...args)
const scrollToField = (...args) => unref(formRef).scrollToField(...args)

const formMethods = {
    validate,
    validateField,
    resetFields,
    clearValidate,
    scrollToField
}

const exposeData = {
    formRef,
    ...formMethods
}

props.onRegister(exposeData)
defineExpose(exposeData)

useRender(() => {
    return h(
        ElForm,
        {
            ref: formRef,
            model: formData.value,
            labelWidth: '100px',
            ...attrs
        },
        () =>
            h(ElRow, props.rowProps, () => {
                return genFormItems(props.formList)
            })
    )
})
</script>

<style lang="scss" scoped>
.help-label {
    display: inline-flex;
    align-items: center;
    gap: 2px;
}
</style>
