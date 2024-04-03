<template>
    <div>
        <el-button @click="setVisible(true)">打开</el-button>
        <BaseDialog @register="registerDialog" v-bind="dialogProps"></BaseDialog>
    </div>
</template>

<script lang="jsx" setup>
import { BaseDialog, useBaseDialogState } from '@/components'
import { ElButton } from 'element-plus'

const [registerDialog, { componentProps: dialogProps, setVisible }] = useBaseDialogState({
    okButtonProps: {
        onClick: () => setVisible(false)
    },
    cancelButtonProps: {
        onClick: () => setVisible(false)
    },
    // 关闭按钮拦截
    beforeClose: done => {
        done()
    },
    headerRender: () => {
        return <div class='text-gray'>headerRender</div>
    },
    render: () => {
        return (
            <div>
                <div class='text-red'>render</div>
                <ElButton
                    onClick={() => {
                        dialogProps.headerRender = +new Date()
                    }}
                >
                    更新 header
                </ElButton>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped></style>
