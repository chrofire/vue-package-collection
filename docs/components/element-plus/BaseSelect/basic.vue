<template>
    <div>
        <BaseSelect v-bind="state"></BaseSelect>
        <pre>{{ JSON.stringify(state.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseSelect } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    modelValue: '',
    'onUpdate:modelValue': value => state.modelValue = value,
    options: Array.from({ length: 10 }, (_, i) => {
        const id = i + 1
        return {
            value: `value-${id}`,
            label: `label-${id}`
        }
    }),
    clearable: true
})
</script>

<style lang="scss" scoped></style>
