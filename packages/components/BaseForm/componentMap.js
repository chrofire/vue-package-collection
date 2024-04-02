import {
    ElAutocomplete,
    ElCascader,
    ElColorPicker,
    ElDatePicker,
    ElInput,
    ElInputNumber,
    ElRate,
    ElSlider,
    ElSwitch,
    ElTimePicker,
    ElTimeSelect,
    ElTransfer,
    ElTreeSelect,
    ElUpload
} from 'element-plus'
import { h } from 'vue'
import BaseCheckboxGroup from '@/components/BaseCheckboxGroup/index.vue'
import BaseRadioGroup from '@/components/BaseRadioGroup/index.vue'
import BaseSelect from '@/components/BaseSelect/index.vue'

/**
 * @typedef {{
 *  component: Component,
 *  props?: Record<string, unknown>,
 *  slots?: Record<string, unknown>,
 *  render?: () => VNodeChild
 *}} BaseFormComponentItem
 */

/** @type {Map<string, BaseFormComponentItem>} */
export const baseFormComponentMap = new Map()

/**
 * 注册表单组件
 * @param {string} key
 * @param {BaseFormComponentItem} value
 * @returns
 */
export const registerBaseFormComponent = (key, value) => {
    return baseFormComponentMap.set(key, value)
}

/**
 * 取消注册表单组件
 * @param {string} key
 */
export const unregisterBaseFormComponent = key => {
    return baseFormComponentMap.delete(key)
}

/**
 * 是否已注册表单组件
 * @param {string} key
 */
export const isRegisteredBaseFormComponent = key => {
    return baseFormComponentMap.has(key)
}

registerBaseFormComponent('autocomplete', {
    component: ElAutocomplete
})

registerBaseFormComponent('cascader', {
    component: ElCascader
})

registerBaseFormComponent('checkbox-group', {
    component: BaseCheckboxGroup
})

registerBaseFormComponent('color-picker', {
    component: ElColorPicker
})

registerBaseFormComponent('date-picker', {
    component: ElDatePicker
})

registerBaseFormComponent('input', {
    component: ElInput
})

registerBaseFormComponent('input-number', {
    component: ElInputNumber
})

registerBaseFormComponent('radio-group', {
    component: BaseRadioGroup
})

registerBaseFormComponent('rate', {
    component: ElRate
})

registerBaseFormComponent('select', {
    component: BaseSelect
})

registerBaseFormComponent('slider', {
    component: ElSlider
})

registerBaseFormComponent('switch', {
    component: ElSwitch
})

registerBaseFormComponent('time-picker', {
    component: ElTimePicker
})

registerBaseFormComponent('time-select', {
    component: ElTimeSelect
})

registerBaseFormComponent('transfer', {
    component: ElTransfer
})

registerBaseFormComponent('tree-select', {
    component: ElTreeSelect
})

registerBaseFormComponent('upload', {
    component: ElUpload,
    render: ({ componentInfo, formItem, formData }) => {
        const { props = {}, slots = {}, prop } = formItem
        return h(
            componentInfo.component,
            {
                fileList: formData.value[prop],
                'onUpdate:fileList': value => (formData.value[prop] = value),
                ...props
            },
            {
                ...slots
            }
        )
    }
})
