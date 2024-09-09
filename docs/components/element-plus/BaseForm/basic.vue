<template>
    <div>
        <BaseForm ref="baseFormRef" v-bind="state">
            <template #field6Slot="{ formItem, formData }">
                <el-input
                    class="w-100%"
                    v-model="formData[formItem.prop]"
                ></el-input>
            </template>
        </BaseForm>
        <el-button @click="() => baseFormRef.validate()">校验</el-button>
        <el-button @click="() => baseFormRef.clearValidate()">清除校验</el-button>
        <el-button @click="() => baseFormRef.resetFields()">重置表单</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { BaseForm } from '@/components'
import { ElInputNumber } from 'element-plus'
import { reactive, ref } from 'vue'

const baseFormRef = ref(null)

const state = reactive({
    labelWidth: '90px',
    rowProps: {},
    formData: {},
    formList: [
        {
            renderType: 'input',
            prop: 'field1',
            label: '字段1',
            rules: [
                { required: true, message: '字段1不能为空', trigger: 'blur' },
                { min: 3, message: '字段1长度最短3个字符', trigger: 'blur' },
                { max: 20, message: '字段1长度最长20个字符', trigger: 'blur' }
            ]
        },
        {
            renderType: 'checkbox-group',
            prop: 'field2',
            label: '字段2',
            props: {
                options: Array.from({ length: 5 }, (_, i) => {
                    return {
                        label: `label-${i + 1}`,
                        value: `value-${i + 1}`
                    }
                })
            }
        },
        {
            renderType: 'radio-group',
            prop: 'field3',
            label: '字段3',
            props: {
                options: Array.from({ length: 5 }, (_, i) => {
                    return {
                        label: `label-${i + 1}`,
                        value: `value-${i + 1}`
                    }
                })
            }
        },
        {
            renderType: 'select',
            prop: 'field4',
            label: '字段4',
            props: {
                class: 'w-100%',
                options: Array.from({ length: 10 }, (_, i) => {
                    return {
                        label: `label-${i + 1}`,
                        value: `value-${i + 1}`
                    }
                }),
                clearable: true
            },
            col: {
                span: 12
            }
        },
        {
            prop: 'field5',
            label: '字段5',
            render: ({ formItem, formData }) => {
                return (
                    <ElInputNumber
                        class="w-100%"
                        v-model={formData[formItem.prop]}
                        min={1}
                        max={10}
                    ></ElInputNumber>
                )
            },
            col: {
                span: 12
            }
        },
        {
            prop: 'field6',
            label: '字段6',
            slotName: 'field6Slot',
            col: {
                span: 12
            }
        }
    ]
})
</script>

<style lang="scss" scoped></style>
