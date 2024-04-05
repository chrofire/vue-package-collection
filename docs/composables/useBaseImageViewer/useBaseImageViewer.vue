<template>
    <div>
        <el-button @click="preview">预览图片, 关闭时自动销毁</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { useBaseImageViewer } from '@/composables/useBaseImageViewer'

const genImage = (width = 100, height = 100, bgColor = '#fff') => {
    const canvasEl = document.createElement('canvas')
    canvasEl.width = width
    canvasEl.height = height
    const ctx = canvasEl.getContext('2d')
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height)
    return canvasEl.toDataURL('image/png')
}

const { vnode, destroy, ImageViewer } = useBaseImageViewer()

const preview = () => {
    ImageViewer({
        urlList: [genImage(1000, 500, '#fff')]
    })

    const instance = vnode.value

    instance.component.props.hideOnClickModal = true
    setTimeout(() => {
        setTimeout(() => {
            destroy()
        }, 2000)
        instance.component.props.urlList = [genImage(1000, 500, '#000')]
    }, 2000)
}
</script>

<style lang="scss" scoped></style>
