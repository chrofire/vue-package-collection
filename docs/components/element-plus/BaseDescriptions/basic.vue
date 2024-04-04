<template>
    <BaseDescriptions v-bind="state">
        <template #title>templateTitle</template>
        <template #extra>templateExtra</template>
    </BaseDescriptions>
</template>

<script lang="jsx" setup>
import { BaseDescriptions } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    border: true,
    title: '标题',
    extra: '操作区',
    items: Array.from({ length: 5 }, (_, i) => {
        return {
            prop: `prop-${i + 1}`,
            label: `label-${i + 1}`,
            value: `value-${i + 1}`
        }
    }),
    // titleRender: () => {
    //     return 'titleRender'
    // },
    extraRender: () => {
        return 'extraRender'
    }
})
</script>

<style lang="scss" scoped></style>
