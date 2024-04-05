import { ElImageViewer } from 'element-plus'
import { h, mergeProps, onBeforeUnmount, render, shallowRef, getCurrentInstance } from 'vue'

const defaultProps = {
    zoomRate: 1.25,
    urlList: []
}

const imageViewerWrapperClassName = '.el-image-viewer__wrapper'

// 函数式调用, 立即执行
export const BaseImageViewer = (
    /** @type {import('element-plus').ImageViewerProps} */
    props = {},
    options = {}
) => {
    const { instance, appContext } = options

    const { onClose: _onClose = () => {}, ...args } = props

    // 重写 onClose
    const onClose = () => {
        destroy()
        _onClose()
    }

    const _props = mergeProps({}, defaultProps, args, {
        // 覆盖 onClose
        onClose
    })

    // 创建 vnode
    let vnode = h(ElImageViewer, _props)
    // 添加 上下文
    vnode.appContext = appContext
    // 创建 容器
    let container = document.createElement('div')
    // 将 vnode 渲染到 容器 中
    render(vnode, container)
    // 将 容器 添加到 body 中
    document.body.appendChild(container)
    // 处理滚动穿透
    container.querySelector(imageViewerWrapperClassName)?.addEventListener('wheel', e => {
        e.preventDefault()
    })

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
        component: vnode.component,
        destroy
    }
}

// 组合式函数
export const useBaseImageViewer = (options = {}) => {
    let { instance, appContext } = options

    // 补全组件实例
    if (!instance) {
        instance = getCurrentInstance()
    }

    const vnode = shallowRef()
    let container

    const ImageViewer = (props = {}) => {
        // 每次调用时先销毁
        destroy()

        const { onClose: _onClose = () => {}, ...args } = props

        // 重写 onClose
        const onClose = () => {
            destroy()
            _onClose()
        }

        const defaultProps = {
            zoomRate: 1.25,
            urlList: []
        }

        const _props = mergeProps({}, defaultProps, args, {
            // 覆盖 onClose
            onClose
        })

        // 创建 vnode
        vnode.value = h(ElImageViewer, _props)
        vnode.value.appContext = appContext
        // 创建 容器
        container = document.createElement('div')
        // 将 vnode 渲染到 容器 中
        render(vnode.value, container)
        // 将 容器 添加到 body 中
        document.body.appendChild(container)
        // 处理滚动穿透
        container.querySelector(imageViewerWrapperClassName)?.addEventListener('wheel', e => {
            e.preventDefault()
        })
    }

    // 销毁
    const destroy = () => {
        if (container) {
            render(null, container)
            container.remove()
        }
        vnode.value = null
        container = null
    }

    instance && onBeforeUnmount(() => {
        destroy()
    }, instance)

    return {
        vnode,
        destroy,
        ImageViewer
    }
}
