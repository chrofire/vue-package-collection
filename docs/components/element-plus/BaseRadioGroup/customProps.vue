<template>
    <div>
        <BaseRadioGroup v-bind="info"></BaseRadioGroup>
        <pre>{{ JSON.stringify(info.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseRadioGroup } from '@/components'
import { reactive } from 'vue'

const info = reactive({
    modelValue: '',
    'onUpdate:modelValue': value => info.modelValue = value,
    // optionType: 'button',
    options: Array.from({ length: 10 }, (_, i) => {
        const id = i + 1
        return {
            field1: `value-${id}`,
            field2: `label-${id}`
        }
    }),
    getOptionProps: rawOption => {
        const { field1 } = rawOption
        return {
            key: field1,
            label: field1,
            value: field1
        }
    },
    labelRender: rawOption => {
        return rawOption.field2
    }
})
</script>

<style lang="scss" scoped></style>
