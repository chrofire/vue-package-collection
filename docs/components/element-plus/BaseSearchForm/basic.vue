<template>
    <div>
        <BaseSearchForm
            ref="BaseSearchFormRef"
            :formList="formList"
            @search="({ formData }) => console.log(formData.value)"
            @reset="({ formData }) => console.log(formData.value)"
        ></BaseSearchForm>
        <div>{{ searchFormData }}</div>
    </div>
</template>

<script lang="jsx" setup>
import { BaseSearchForm } from '@/components'
import { computed, reactive, ref, unref } from 'vue'

const BaseSearchFormRef = ref()

const searchFormData = computed(() => {
    const formData = unref(BaseSearchFormRef)?.data
    // const formData = unref(BaseSearchFormRef)?.formData || {}
    return {
        ...formData
    }
})

const formList = reactive([
    {
        renderType: 'date-picker',
        prop: 'datePicker',
        label: '日期选择器',
        props: {
            type: 'daterange',
            class: 'w-100%!',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
            clearable: true
        }
    },
    {
        renderType: 'input',
        prop: 'input',
        label: '输入框',
        props: {
            clearable: true
        }
    },
    {
        renderType: 'input-number',
        prop: 'inputNumber',
        label: '数字输入框',
        props: {
            class: 'w-100%!',
            controlsPosition: 'right'
        }
    },
    {
        renderType: 'slider',
        prop: 'slider',
        label: '滑动输入条',
        props: {}
    },
    {
        renderType: 'switch',
        prop: 'switch',
        label: '开关',
        props: {
            activeValue: 1,
            inactiveValue: 0,
            activeText: '开',
            inactiveText: '关'
        }
    },
    {
        renderType: 'time-picker',
        prop: 'timePicker',
        label: '时间选择器',
        props: {
            class: 'w-100%!',
            clearable: true
        }
    },
    {
        renderType: 'time-select',
        prop: 'timeSelect',
        label: '时间选择',
        props: {
            class: 'w-100%!',
            start: '00:00',
            step: '00:30',
            end: '23:30',
            clearable: true,
            placeholder: ''
        }
    }
])
</script>

<style lang="scss" scoped></style>
