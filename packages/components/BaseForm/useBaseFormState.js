import { ref, unref } from 'vue'

export const useBaseFormState = props => {
    let _exposeData = {}

    const getExposeData = () => _exposeData

    const register = data => {
        _exposeData = data
    }

    const componentProps = ref(props)

    const exposeData = {
        _componentProps: componentProps,
        componentProps: unref(componentProps),
        getInstance: () => {
            return getExposeData()?.formRef
        },
        getFormData: () => {
            return unref(props).formData
        },
        setFormData: (...args) => {
            if (typeof args[0] === 'string') {
                unref(componentProps).formData[args[0]] = args[1]
            } else {
                unref(componentProps).formData = args[0]
            }
        },
        validate: (...args) => {
            return getExposeData()?.validate(...args)
        },
        validateField: (...args) => {
            return getExposeData()?.validateField(...args)
        },
        resetFields: (...args) => {
            return getExposeData()?.resetFields(...args)
        },
        scrollToField: (...args) => {
            return getExposeData()?.scrollToField(...args)
        },
        clearValidate: (...args) => {
            return getExposeData()?.clearValidate(...args)
        }
    }

    return [register, exposeData]
}
