<template>
    <div>
        <BaseTabs v-bind="state"></BaseTabs>
    </div>
</template>

<script lang="jsx" setup>
import { BaseTabs } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    modelValue: '',
    'onUpdate:modelValue': value => state.modelValue = value,
    items: Array.from({ length: 5 }, (_, i) => {
        return {
            name: `name-${i + 1}`,
            label: `label-${i + 1}`,
            valueRender: item => {
                return (
                    <div class="w-100% h-50px flex justify-center items-center">
                        <div>{item.name}</div>
                    </div>
                )
            }
        }
    })
})
</script>

<style lang="scss" scoped></style>
