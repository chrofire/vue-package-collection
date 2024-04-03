<template>
    <div>
        <BaseRadioGroup v-bind="state"></BaseRadioGroup>
        <pre>{{ JSON.stringify(state.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseRadioGroup } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    modelValue: '',
    'onUpdate:modelValue': value => state.modelValue = value,
    // optionType: 'button',
    options: Array.from({ length: 10 }, (_, i) => {
        const id = i + 1
        return {
            label: `label-${id}`,
            value: `value-${id}`
        }
    })
})
</script>

<style lang="scss" scoped></style>
