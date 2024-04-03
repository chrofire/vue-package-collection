<template>
    <div>
        <BaseForm ref="BaseFormRef" v-bind="state"></BaseForm>
    </div>
</template>

<script lang="jsx" setup>
import { BaseForm } from '@/components'
import { reactive, ref } from 'vue'

const BaseFormRef = ref(null)

const state = reactive({
    labelWidth: '90px',
    rowProps: {},
    formData: {},
    formList: [
        {
            renderType: 'input',
            prop: 'field1',
            label: '字段1',
            help: '帮助标签',
            labelRender: () => <div class='font-700'>字段1</div>
        },
        {
            renderType: 'input',
            prop: 'field2',
            label: '字段2'
        }
    ]
})
</script>

<style lang="scss" scoped></style>
