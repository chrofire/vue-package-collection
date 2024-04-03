import { createImperativePromise } from '@/utils/promise'
import { h, mergeProps, onBeforeUnmount, render } from 'vue'
import BaseDialog from './index.vue'

/**
 * 函数式调用 BaseDialog
 * @param {import('element-plus').DialogProps} props BaseDialog Props
 * @param {{
 *  instance?: import('vue').ComponentInternalInstance,
 *  appContext?: import('vue').AppContext
 * }} options 选项
 */
export const BaseDialogInstance = (props = {}, options = {}) => {
    const { instance, appContext } = options
    const { onClosed: _onClosed = () => {}, ...args } = props

    // 重写 onClosed (过渡动画结束时)
    const onClosed = () => {
        destroy()
        _onClosed()
    }

    const defaultProps = {
        modalValue: true
    }

    const _props = mergeProps({}, defaultProps, args, {
        // 覆盖 onClosed
        onClosed
    })

    // 创建 vnode
    let vnode = h(BaseDialog, _props)
    // 添加 上下文
    vnode.appContext = appContext
    // 创建 容器
    let container = document.createElement('div')
    // 将 vnode 渲染到 容器 中
    render(vnode, container)
    // 将 容器 添加到 body 中
    document.body.appendChild(container)

    // 销毁
    const destroy = () => {
        if (container) {
            render(null, container)
            container.remove()
        }
        vnode = null
        container = null
    }

    // 存在组件实例时关联销毁函数
    instance && onBeforeUnmount(() => {
        destroy()
    }, instance)

    return {
        vnode,
        component: vnode.component,
        exposed: vnode.component.exposed,
        destroy
    }
}

/**
 * 函数式调用 BaseDialog (promise ver)
 * @param {Record<string, unknown>} props BaseDialog Props
 * @param {{
 *  instance?: import('vue').ComponentInternalInstance,
 *  appContext?: import('vue').AppContext,
 *  fullResult?: boolean
 * }} options 选项
 */
export const BaseDialogPromise = (props = {}, options = {}) => {
    const { instance, appContext, fullResult } = options
    const {
        onClosed: _onClosed = () => {},
        onOk: _onOk = () => {},
        onCancel: _onCancel = () => {},
        ...args
    } = props

    const { promise, resolve } = createImperativePromise()

    const onClosed = () => {
        destroy()
        _onClosed()
    }

    const onOk = async () => {
        const result = {
            data: null,
            error: null,
            success: false
        }
        try {
            result.data = await _onOk()
            result.success = true
        } catch (error) {
            result.error = error
            result.success = false
        }
        resolve({ type: 'ok', ...result })
        vnode.component.props.modalValue = false
    }

    const onCancel = async () => {
        const result = {
            data: null,
            error: null,
            success: false
        }
        try {
            result.data = await _onCancel()
            result.success = true
        } catch (error) {
            result.data = error
            result.success = false
        }
        resolve({ type: 'cancel', ...result })
        vnode.component.props.modalValue = false
    }

    const defaultProps = {}

    const _props = mergeProps({}, defaultProps, args, {
        onClosed,
        onOk,
        onCancel,
        // 覆盖弹窗开启状态
        modalValue: true
    })

    // 创建 vnode
    let vnode = h(BaseDialog, _props)
    // 添加 上下文
    vnode.appContext = appContext
    // 创建 容器
    let container = document.createElement('div')
    // 将 vnode 渲染到 容器 中
    render(vnode, container)
    // 将 容器 添加到 body 中
    document.body.appendChild(container)

    // 销毁
    const destroy = () => {
        if (container) {
            render(null, container)
            container.remove()
        }
        vnode = null
        container = null
    }

    // 存在组件实例时关联销毁函数
    instance && onBeforeUnmount(() => {
        destroy()
    }, instance)

    if (fullResult) {
        return {
            vnode,
            component: vnode.component,
            exposed: vnode.component.exposed,
            promise
        }
    }

    return promise
}
