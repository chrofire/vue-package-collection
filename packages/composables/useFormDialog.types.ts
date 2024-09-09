import type { VNodeChild } from 'vue'

export type FormProps = {
    formList: unknown[],
    formData?: Record<string, unknown>,
    defaultFormData?: Record<string, unknown>
} & Record<string, unknown>

export type UseFormDialogOpts = {
    /** api函数对象 */
    api: { add: Function, update: Function, custom?: Function },
    /** BaseForm props */
    formProps: FormProps,
    /** BaseDialog props */
    mergeDialogProps?: Record<string, unknown>,
    /** 完全自定义 onOk */
    customOnOk?: () => unknown,
    /** 转换提交的表单数据 */
    transformSubmitFormData?: (opState: string, formData: Record<string, unknown>) => Record<string, unknown>,
    /** 确认前 */
    onBeforeOk?: (opState: string, formData: Record<string, unknown>) => boolean | undefined,
    /** 确认后 */
    onAfterOk?: () => void,
    /** 完全自定义 onCancel */
    customOnCancel?: () => unknown,
    /** 取消前 */
    onBeforeCancel?: (opState: string, formData: Record<string, unknown>) => boolean | undefined,
    /** 取消后 */
    onAfterCancel?: () => void,
    /** 弹窗 打开前 */
    onBeforeOpen?: (opState: string, record?: Record<string, unknown>) => boolean | undefined,
    /** 弹窗 打开中 */
    onOpen?: (opState: string, record?: Record<string, unknown>) => boolean | undefined,
    /** 弹窗 打开后 */
    onAfterOpen?: (opState: string, record?: Record<string, unknown>) => boolean | undefined,
    /** 完全自定义 重置弹窗 */
    customReset?: () => unknown,
    /** 成功消息 */
    okMessage?: string,
    /** headerRender vnode 包装 */
    headerRenderWrapper?: (context: { opState: string, headerLabel: string }) => VNodeChild
}
