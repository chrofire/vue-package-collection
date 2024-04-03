import Component from './index.vue'
import { BaseDialogInstance, BaseDialogPromise } from './createBaseDialog'

Component.instance = BaseDialogInstance
Component.promise = BaseDialogPromise

/** @type {typeof Component & { instance: typeof BaseDialogInstance, promise: typeof BaseDialogPromise }} */
export const BaseDialog = Component

export default Component

export * from './createBaseDialog'
export * from './useBaseDialogState'
