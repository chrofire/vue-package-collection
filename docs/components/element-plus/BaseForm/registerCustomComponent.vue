<template>
    <div>
        <BaseForm @register="registerForm" v-bind="formProps"></BaseForm>
        <!-- useBaseFormState 的方法 直接在模板中使用需要加 (), 否则会传入 Event, 导致异常 -->
        <el-button @click="validate()">校验</el-button>
        <el-button @click="clearValidate()">清除校验</el-button>
        <el-button @click="resetFields()">重置表单</el-button>
        <el-button @click="() => console.log(getFormData())">获取表单数据</el-button>
        <el-button @click="setFormData('field2', 'set')">设置表单数据</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { BaseForm, registerBaseFormComponent, useBaseFormState } from '@/components'
import { ElInput } from 'element-plus'
import { h } from 'vue'

registerBaseFormComponent('custom-input', {
    component: ElInput,
    render: ({ componentInfo, formItem, formData }) => {
        const { props = {}, slots = {}, prop } = formItem
        return h(
            componentInfo.component,
            {
                modelValue: formData.value[prop],
                'onUpdate:modelValue': value => formData.value[prop] = value,
                ...props
            },
            {
                prepend: () => {
                    return 'custom'
                },
                ...slots
            }
        )
    }
})

const [
    registerForm,
    { componentProps: formProps, getFormData, setFormData, validate, resetFields, clearValidate }
] = useBaseFormState({
    labelWidth: '90px',
    formList: [
        {
            renderType: 'input',
            prop: 'field1',
            label: '字段1',
            rules: [
                { required: true, message: '字段1不能为空', trigger: 'blur' },
                { min: 3, message: '字段1长度最短3个字符', trigger: 'blur' },
                { max: 20, message: '字段1长度最长20个字符', trigger: 'blur' }
            ],

            slots: {
                prepend: () => 'prepend'
            }
        },
        {
            renderType: 'custom-input',
            prop: 'field2',
            label: '字段2',
            props: {}
        }
    ],
    formData: {}
})
</script>

<style lang="scss" scoped></style>
