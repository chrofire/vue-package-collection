<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { ElButton, ElDialog } from 'element-plus'
import { computed, h, ref, useAttrs, useSlots } from 'vue'

defineOptions({
    name: 'BaseDialog',
    inheritAttrs: false
})

const props = defineProps({
    /** 绑定值 */
    modalValue: {
        type: Boolean,
        default: undefined
    },
    /** 更新:绑定值 */
    'onUpdate:modelValue': {
        type: Function
    },
    /** header 渲染器 */
    headerRender: {
        type: [Function, String, Number]
    },
    /** 默认内容 渲染器 */
    render: {
        type: Function
    },
    /** footer 渲染器 */
    footerRender: {
        type: Function
    },
    /** 确认按钮内容 渲染器 */
    okButtonContentRender: {
        type: [Function, String, Number],
        default: () => '确认'
    },
    /** 确认按钮 props */
    okButtonProps: {
        type: Object,
        default: () => ({})
    },
    /** 确认按钮 loading */
    okLoading: {
        type: Boolean,
        default: false
    },
    /** 取消按钮内容 渲染器 */
    cancelButtonContentRender: {
        type: [Function, String],
        default: () => '取消'
    },
    /** 取消按钮 props */
    cancelButtonProps: {
        type: Object,
        default: () => ({})
    },
    /** 确认按钮点击事件 */
    onOk: {
        type: Function,
        default: () => {}
    },
    /** 取消按钮点击事件 */
    onCancel: {
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

const dialogRef = ref(null)

const internalVisible = ref(false)

// 内部的 visible, 可被外部 v-model 替代
const visible = computed({
    get: () => {
        if (typeof props.modalValue === 'undefined') {
            return internalVisible.value
        }
        return props.modalValue
    },
    set: value => {
        if (typeof props.modalValue === 'undefined') {
            internalVisible.value = value
            return
        }
        props['onUpdate:modelValue']?.(value)
    }
})

const setVisible = (bool = false) => {
    visible.value = bool
}

// header
const getHeaderRender = () => {
    return (
        (typeof props.headerRender === 'function' && (() => props.headerRender()))
        || (slots.header && (() => slots.header()))
        || (() =>
            h(
                'div',
                {
                    class: `el-dialog__title`,
                    style: { minHeight: `var(--el-dialog-font-line-height)` }
                },
                props.headerRender
            ))
    )
}

// default
const getDefaultRender = () => {
    return (
        (props.render && (() => props.render()))
        || (slots.default && (() => slots.default()))
        || null
    )
}

// footer
const defaultFooterRender = () => {
    const okButtonProps = {
        type: 'primary',
        size: 'default',
        onClick: props.onOk,
        loading: props.okLoading,
        ...props.okButtonProps
    }

    const cancelButtonProps = {
        size: 'default',
        onClick: props.onCancel,
        ...props.cancelButtonProps
    }

    return [
        h(
            ElButton,
            okButtonProps,
            typeof props.okButtonContentRender === 'function'
                ? props.okButtonContentRender
                : { default: () => props.okButtonContentRender }
        ),
        h(
            ElButton,
            cancelButtonProps,
            typeof props.cancelButtonContentRender === 'function'
                ? props.cancelButtonContentRender
                : { default: () => props.cancelButtonContentRender }
        )
    ]
}

const getFooterRender = () => {
    return (
        (props.footerRender && (() => props.footerRender()))
        || (slots.footer && (() => slots.footer()))
        || (() => defaultFooterRender())
    )
}

// 点击右上角关闭按钮触发
const beforeClose = done => {
    done()
    props.onCancel()
}

const exposeData = {
    dialogRef,
    visible,
    setVisible
}

props.onRegister(exposeData)
defineExpose(exposeData)

useRender(() => {
    const { title, ...restAttrs } = attrs
    return h(
        ElDialog,
        {
            ref: dialogRef,
            appendToBody: true,
            closeOnClickModal: false,
            modelValue: visible.value,
            'onUpdate:modelValue': value => (visible.value = value),
            beforeClose,
            ...restAttrs
        },
        {
            header: getHeaderRender(),
            default: getDefaultRender(),
            footer: getFooterRender()
        }
    )
})
</script>

<style lang="scss" scoped></style>
