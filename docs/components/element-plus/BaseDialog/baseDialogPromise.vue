<template>
    <div>
        <el-button @click="open">open</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { BaseDialog } from '@/components'
import { promiseTimeout } from '@vueuse/core'
import { ElButton } from 'element-plus'
import { getCurrentInstance, ref } from 'vue'

const instance = getCurrentInstance()

const num = ref(0)
const inc = () => {
    num.value++
}

const open = async () => {
    // const result = await BaseDialog.promise({
    //     headerRender: '标题',
    //     render: () => {
    //         return <div>{now.value.toString()}</div>
    //     },
    //     onOk: () => {
    //         throw new Error('error')
    //         // return now.value.toString()
    //     }
    // }, {
    //     instance
    // })
    // console.log(result)

    const { promise, component } = BaseDialog.promise(
        {
            headerRender: '标题',
            render: () => {
                return (
                    <div>
                        <div>{num.value}</div>
                        <ElButton onClick={inc}>inc</ElButton>
                        <ElButton
                            onClick={() => {
                                component.props.headerRender = +new Date()
                            }}
                        >
                            更新 header
                        </ElButton>
                    </div>
                )
            },
            onOk: async () => {
                component.props.okLoading = true
                await promiseTimeout(500)
                setTimeout(() => {
                    component.props.okLoading = false
                }, 300)
                return num.value
            }
        },
        {
            instance,
            fullResult: true
        }
    )

    const result = await promise

    console.log(result)
}
</script>

<style lang="scss" scoped></style>
