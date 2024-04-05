<template>
    <div>
        <BaseTabs v-bind="state">
            <template #name-1="item">
                <div class="w-100% h-50px flex justify-center items-center">
                    <div>template {{ item.name }}</div>
                </div>
            </template>
        </BaseTabs>
    </div>
</template>

<script lang="jsx" setup>
import { BaseTabs } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    ref: value => state.instanceRef = value,
    instanceRef: null,
    modelValue: '',
    'onUpdate:modelValue': value => state.modelValue = value,
    items: Array.from({ length: 5 }, (_, i) => {
        return {
            name: `name-${i + 1}`,
            label: `label-${i + 1}`,
            labelRender: item => {
                return `labelRender ${item.label}`
            },
            valueRender: item => {
                return (
                    <div class="w-100% h-50px flex justify-center items-center">
                        <div>valueRender {item.name}</div>
                    </div>
                )
            }
        }
    })
})
</script>

<style lang="scss" scoped></style>
