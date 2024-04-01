<template>
    <div>
        <BaseSelect v-bind="info"></BaseSelect>
        <pre>{{ JSON.stringify(info.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseSelect } from '@/components'
import { reactive } from 'vue'

const info = reactive({
    modelValue: '',
    'onUpdate:modelValue': value => info.modelValue = value,
    options: Array.from({ length: 10 }, (_, i) => {
        return {
            label: `group-${i + 1}`,
            children: Array.from({ length: 10 }, (_, j) => {
                const option = {
                    valueField: `group-${i + 1}-value-${j + 1}`,
                    labelField: `group-${i + 1}-label-${j + 1}`
                }
                return option
            })
        }
    }),
    getOptionProps: rawOption => {
        const { valueField, labelField, ...args } = rawOption
        return {
            key: valueField,
            ...args,
            label: labelField,
            value: valueField
        }
    },
    labelRender: rawOption => {
        return rawOption.labelField
    },
    clearable: true
})
</script>

<style lang="scss" scoped></style>
