<template>
    <BaseDescriptions v-bind="state">
        <template #prop-1Label="item">
            <div>labelTemplate {{ item.label }}</div>
        </template>
        <template #prop-1="item">
            <div>valueTemplate {{ item.value }}</div>
        </template>
    </BaseDescriptions>
</template>

<script lang="jsx" setup>
import { BaseDescriptions } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    border: true,
    items: Array.from({ length: 5 }, (_, i) => {
        return {
            // 作为 插槽名
            prop: `prop-${i + 1}`,
            label: `label-${i + 1}`,
            value: `value-${i + 1}`,
            // labelRender: item => {
            //     return <div>labelRender {item.label}</div>
            // },
            valueRender: item => {
                return <div>valueRender {item.value}</div>
            }
        }
    })
})
</script>

<style lang="scss" scoped></style>
