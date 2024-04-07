<template>
    <BaseDialog v-bind="dialogProps">
        <BaseForm ref="BaseFormRef" v-bind="formProps"></BaseForm>
    </BaseDialog>
</template>

<script lang="jsx" setup>
import { BaseDialog, BaseForm } from '@/components'
import { useFormDialog } from '@/composables/useFormDialog'
import { promiseTimeout } from '@vueuse/core'
import { reactive } from 'vue'

const props = defineProps({
    fullList: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['submit'])

const formProps = reactive({
    labelWidth: '100px',
    formList: [
        {
            renderType: 'input',
            prop: 'field1',
            label: '字段1',
            rules: { required: true, message: '字段必填', trigger: 'blur' },
            colProps: {
                span: 12
            }
        },
        {
            renderType: 'input',
            prop: 'field2',
            label: '字段2',
            rules: { required: true, message: '字段必填', trigger: 'blur' },
            colProps: {
                span: 12
            }
        }
    ],
    formData: {},
    defaultFormData: () => ({})
})

const { BaseFormRef, dialogProps, toggleDialog, openDialog } = useFormDialog({
    api: {
        add: async row => {
            await promiseTimeout(500)
            props.fullList.push(row)
        },
        update: async row => {
            await promiseTimeout(500)
            const index = props.fullList.findIndex(item => item.id === row.id)
            props.fullList.splice(index, 1, row)
        }
    },
    headerRenderWrapper: ({ headerLabel }) => `${headerLabel}`,
    formProps,
    transformSubmitFormData: formData => formData,
    mergeDialogProps: {
        width: 600
    },
    onAfterOk: () => {
        emit('submit')
    }
})

defineExpose({
    toggleDialog,
    openDialog
})
</script>

<style lang="scss" scoped></style>
