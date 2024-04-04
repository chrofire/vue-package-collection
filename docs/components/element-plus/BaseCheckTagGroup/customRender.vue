<template>
    <div>
        <BaseCheckTagGroup v-bind="state">
            <template #label="option">{{ `template-${option.label}` }}</template>
        </BaseCheckTagGroup>
        <pre>{{ JSON.stringify(state.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseCheckTagGroup } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    modelValue: [],
    'onUpdate:modelValue': value => state.modelValue = value,
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
