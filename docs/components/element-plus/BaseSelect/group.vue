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
        return {
            label: `group-${i + 1}`,
            disabled: i + 1 > 5 ? true : false,
            children: Array.from({ length: 10 }, (_, j) => {
                return {
                    value: `group-${i + 1}-value-${j + 1}`,
                    label: `group-${i + 1}-label-${j + 1}`
                }
            })
        }
    }),
    clearable: true
})
</script>

<style lang="scss" scoped></style>
