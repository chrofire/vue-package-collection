<template>
    <div>
        <BaseSelect v-bind="info"></BaseSelect>
        <pre>{{ JSON.stringify(info.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseSelect } from '@/components'
import { reactive } from 'vue'

const info = reactive({
    modelValue: '',
    'onUpdate:modelValue': value => info.modelValue = value,
    options: Array.from({ length: 10 }, (_, i) => {
        const id = i + 1
        return {
            value: `value-${id}`,
            label: `label-${id}`
        }
    }),
    bindObject: true,
    // 对象 清空 会变成 空字符串
    clearable: true
})
</script>

<style lang="scss" scoped></style>
