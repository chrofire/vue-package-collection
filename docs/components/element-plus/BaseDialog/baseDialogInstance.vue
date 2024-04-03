<template>
    <div>
        <el-button @click="open">open</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { BaseDialog } from '@/components'
import { useNow } from '@vueuse/core'
import { ElButton } from 'element-plus'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

const now = useNow()

const open = () => {
    const context = BaseDialog.instance(
        {
            headerRender: '标题',
            render: () => {
                return (
                    <div>
                        <div>{now.value.toString()}</div>
                        <ElButton
                            onClick={() => {
                                context.component.props.headerRender = now.value.getTime()
                            }}
                        >
                            更新 header
                        </ElButton>
                    </div>
                )
            },
            onOk: () => {
                context.component.props.modalValue = false
            },
            onCancel: () => {
                context.component.props.modalValue = false
            }
        },
        {
            instance
        }
    )
}
</script>

<style lang="scss" scoped></style>
