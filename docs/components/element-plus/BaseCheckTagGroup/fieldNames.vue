<template>
    <div>
        <BaseCheckTagGroup v-bind="state"></BaseCheckTagGroup>
        <pre>{{ JSON.stringify(state.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseCheckTagGroup } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    modelValue: [],
    'onUpdate:modelValue': value => state.modelValue = value,
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
