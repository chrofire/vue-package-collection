<template>
    <div>
        <BaseCheckboxGroup v-bind="info"></BaseCheckboxGroup>
        <pre>{{ JSON.stringify(info.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseCheckboxGroup } from '@/components'
import { reactive } from 'vue'

const info = reactive({
    modelValue: [],
    'onUpdate:modelValue': value => info.modelValue = value,
    // optionType: 'button',
    options: Array.from({ length: 10 }, (_, i) => {
        const id = i + 1
        return {
            field1: `value-${id}`,
            field2: `label-${id}`
        }
    }),
    fieldNames: {
        label: 'field2',
        value: 'field1'
    }
})
</script>

<style lang="scss" scoped></style>
