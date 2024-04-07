import { useToggle } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { isFunction } from 'lodash-es'
import { computed, nextTick, reactive, ref, toValue, unref } from 'vue'

// 表单弹窗操作状态
export const FORM_DIALOG_OP_STATE = {
    ADD: 'add',
    UPDATE: 'update',
    VIEW: 'view',
    CUSTOM: 'custom'
}

// 关闭表单弹窗后 部分操作的延迟时间
export const FORM_DIALOG_CLOSE_DELAY_TIME = 260

/**
 * useFormDialog
 * @param {import('./useFormDialog.types').UseFormDialogOpts} options 选项
 */
export const useFormDialog = (options = {}) => {
    const {
        api,
        formProps,
        mergeDialogProps = {},
        // 确认
        customOnOk,
        transformSubmitFormData,
        onBeforeOk,
        onAfterOk,
        // 取消
        customOnCancel,
        onBeforeCancel,
        onAfterCancel,
        // 弹窗
        onBeforeOpen,
        onOpen,
        onAfterOpen,
        customReset,
        // 消息
        okMessage = '保存成功',
        // headerRender 包装
        headerRenderWrapper
    } = options

    // BaseForm实例 ref
    const BaseFormRef = ref(null)

    // 操作状态 add | update | view | custom
    const opState = ref('')

    // 点击确认时 按钮的加载状态
    const [okLoading, toggleOkLoading] = useToggle(false)

    // footer 渲染器
    const footerRender = computed(() => {
        if (opState.value === 'view') return () => null
        return null
    })

    const headerLabel = ref('')

    const _headerRenderWrapper = computed(() => {
        return headerRenderWrapper?.({
            opState: opState.value,
            headerLabel: headerLabel.value
        }) || `${headerLabel.value}`
    })

    // 弹窗 props
    const dialogProps = reactive({
        width: 800,
        modelValue: false,
        'onUpdate:modelValue': value => (dialogProps.modelValue = value),
        headerRender: _headerRenderWrapper,
        footerRender,
        // 确认
        onOk: async () => {
            // 完全自定义 onOk
            if (isFunction(customOnOk)) {
                return await customOnOk()
            }

            // 默认 表单弹窗 确认逻辑

            // 校验表单
            const valid = await unref(BaseFormRef).validate()
            if (!valid) return

            // 提交的表单数据
            let submitFormData = {
                ...formProps.formData
            }

            // 转换提交的表单数据
            if (isFunction(transformSubmitFormData)) {
                submitFormData = await transformSubmitFormData(submitFormData)
            }

            // 确认前
            if (isFunction(onBeforeOk)) {
                // 返回布尔值确认是否终止执行
                const needReturn = await onBeforeOk(opState.value, submitFormData)
                if (typeof needReturn === 'boolean' && needReturn === false) return
            }

            // 确认按钮 加载中
            toggleOkLoading(true)

            try {
                // 根据操作状态调用对应接口
                switch (opState.value) {
                    case FORM_DIALOG_OP_STATE.ADD: {
                        await api.add(submitFormData)
                        break
                    }
                    case FORM_DIALOG_OP_STATE.UPDATE: {
                        await api.update(submitFormData)
                        break
                    }
                    case FORM_DIALOG_OP_STATE.CUSTOM: {
                        await api.custom(submitFormData)
                        break
                    }
                    default:
                        break
                }

                // 关闭弹窗
                toggleDialog(false)

                // 成功消息
                okMessage && ElMessage.success(okMessage)

                // 重置弹窗
                resetDialog()

                // 确认后
                if (isFunction(onAfterOk)) {
                    await onAfterOk()
                }
            } catch (error) {
                // 捕获错误
                console.log(`[useFormDialog] Error`, error)
            } finally {
                // 延迟 修改 按钮 loading, 防止重复提交
                setTimeout(() => {
                    toggleOkLoading(false)
                }, FORM_DIALOG_CLOSE_DELAY_TIME)
            }
        },
        // 取消
        onCancel: async () => {
            // 完全自定义 onCancel
            if (isFunction(customOnCancel)) {
                return await customOnCancel()
            }

            // 取消前
            if (isFunction(onBeforeCancel)) {
                // 返回布尔值确认是否终止执行
                const needReturn = await onBeforeCancel(opState.value, submitFormData)
                if (typeof needReturn === 'boolean' && needReturn === false) return
            }

            // 关闭弹窗
            toggleDialog(false)

            // 重置弹窗
            resetDialog()

            // 取消后
            if (isFunction(onAfterCancel)) {
                await onAfterCancel()
            }
        },
        okLoading,
        ...mergeDialogProps
    })

    /**
     * 切换弹窗打开状态
     * @param {boolean} bool
     */
    const toggleDialog = bool => {
        dialogProps.modelValue = bool
    }

    /**
     * 打开弹窗
     * @param {string} _opState
     * @param {Record<string, unknown>=} record
     */
    const openDialog = async (_opState, record) => {
        // 弹窗 打开前
        if (isFunction(onBeforeOpen)) {
            // 返回布尔值确认是否终止执行
            const needReturn = await onBeforeOpen(_opState, record)
            if (typeof needReturn === 'boolean' && needReturn === false) return
        }

        // 打开中
        if (isFunction(onOpen)) {
            await onOpen(_opState, record)
        } else {
            // 更新 操作状态
            opState.value = _opState

            // 打开弹窗
            toggleDialog(true)
            await nextTick()

            // 重置表单数据
            unref(BaseFormRef).formRef.resetFields()
            // 默认表单数据
            const defaultFormData = toValue(formProps.defaultFormData) || {}

            switch (opState.value) {
                case 'add': {
                    headerLabel.value = '新增'

                    formProps.formData = {
                        ...defaultFormData,
                        ...record
                    }
                    formProps.disabled = false
                    break
                }
                case 'update': {
                    headerLabel.value = '编辑'

                    formProps.formData = {
                        ...record
                    }
                    formProps.disabled = false
                    break
                }
                case 'view': {
                    headerLabel.value = '查看'

                    formProps.formData = {
                        ...record
                    }
                    formProps.disabled = true
                    break
                }
                case 'custom': {
                    formProps.formData = {
                        ...record
                    }
                    formProps.disabled = false
                    break
                }
                default:
                    break
            }
        }

        // 弹窗 打开后
        if (isFunction(onAfterOpen)) {
            onAfterOpen(_opState, record)
        }
    }

    /** 重置弹窗 */
    const resetDialog = async () => {
        // 完全自定义 重置弹窗
        if (isFunction(customReset)) {
            return await customReset()
        }

        // 重置操作状态
        setTimeout(() => {
            opState.value = ''
            headerLabel.value = ''
        }, FORM_DIALOG_CLOSE_DELAY_TIME)
        // 重置表单
        unref(BaseFormRef).formRef.resetFields()
        const defaultFormData = toValue(formProps.defaultFormData) || {}
        formProps.formData = {
            ...defaultFormData
        }
    }

    return {
        /** BaseForm实例 ref */
        BaseFormRef,
        /** 操作状态 */
        opState,
        /** 弹窗 props */
        dialogProps,
        /** 确认按钮 loading */
        okLoading,
        /** 切换弹窗打开状态 */
        toggleDialog,
        /** 打开弹窗 */
        openDialog,
        /** 重置弹窗 */
        resetDialog,
        /** 切换 确认按钮 loading */
        toggleOkLoading
    }
}
