<template>
    <div>
        <BaseRadioGroup v-bind="info">
            <template #label="option">{{ `template-${option.label}` }}</template>
        </BaseRadioGroup>
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
    fieldNames: {
        value: 'label'
    },
    options: Array.from({ length: 10 }, (_, i) => {
        const id = i + 1
        if (i === 0) {
            return {
                label: `label-${id}`,
                labelRender: rawOption => {
                    return <span class="text-red">{rawOption.label}</span>
                }
            }
        }
        return {
            label: `label-${id}`
        }
    }),
    labelRender: rawOption => {
        return `render-${rawOption.label}`
    }
})
</script>

<style lang="scss" scoped></style>
