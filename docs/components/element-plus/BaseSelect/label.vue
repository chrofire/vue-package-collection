<template>
    <div>
        <BaseSelect v-bind="info">
            <template #label="option">{{ `template-${option.label}` }}</template>
        </BaseSelect>
        <pre>{{ JSON.stringify(info.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseSelect } from '@/components'
import { h, reactive } from 'vue'

const info = reactive({
    modelValue: '',
    'onUpdate:modelValue': value => info.modelValue = value,
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
