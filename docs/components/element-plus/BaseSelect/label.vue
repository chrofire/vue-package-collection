<template>
    <div>
        <BaseSelect v-bind="state">
            <template #label="option">{{ `template-${option.label}` }}</template>
        </BaseSelect>
        <pre>{{ JSON.stringify(state.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseSelect } from '@/components'
import { h, reactive } from 'vue'

const state = reactive({
    modelValue: '',
    'onUpdate:modelValue': value => state.modelValue = value,
    options: Array.from({ length: 10 }, (_, i) => {
        const id = i + 1
        if (i === 0) {
            return {
                value: `value-${id}`,
                label: `label-${id}`,
                labelRender: rawOption => {
                    return h('span', { style: { color: 'red' }}, rawOption.label)
                }
            }
        }
        return {
            value: `value-${id}`,
            label: `label-${id}`
        }
    }),
    labelRender: rawOption => {
        return h('span', { style: { color: 'blue' }}, rawOption.label)
    },
    clearable: true
})
</script>

<style lang="scss" scoped></style>
