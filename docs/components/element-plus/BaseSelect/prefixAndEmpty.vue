<template>
    <div>
        <BaseSelect v-bind="state">
            <template #prefix>template prefix</template>
            <template #empty>template empty</template>
        </BaseSelect>
        <pre>{{ JSON.stringify(state.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseSelect } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    modelValue: '',
    'onUpdate:modelValue': value => state.modelValue = value,
    options: [],
    prefixRender: () => {
        return <div>render prefix</div>
    },
    emptyRender: () => {
        return <div class="flex justify-center items-center">render empty</div>
    }
})
</script>

<style lang="scss" scoped></style>
