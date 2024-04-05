<template>
    <div>
        <el-button @click="preview">预览图片, 关闭时自动销毁</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { BaseImageViewer } from '@/composables/useBaseImageViewer'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

const genImage = (width = 100, height = 100, bgColor = '#fff') => {
    const canvasEl = document.createElement('canvas')
    canvasEl.width = width
    canvasEl.height = height
    const ctx = canvasEl.getContext('2d')
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height)
    return canvasEl.toDataURL('image/png')
}

const preview = () => {
    const context = BaseImageViewer({
        urlList: [genImage(1000, 500, '#fff')]
    }, {
        instance
    })

    // context.component.props.hideOnClickModal = true
    // setTimeout(() => {
    //     setTimeout(() => {
    //         context.destroy()
    //     }, 2000)
    //     context.component.props.urlList = [genImage(1000, 500, '#000')]
    // }, 2000)
}
</script>

<style lang="scss" scoped></style>
