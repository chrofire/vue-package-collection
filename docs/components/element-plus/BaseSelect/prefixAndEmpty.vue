<template>
    <div>
        <BaseSelect v-bind="info">
            <template #prefix>template prefix</template>
            <template #empty>template empty</template>
        </BaseSelect>
        <pre>{{ JSON.stringify(info.modelValue, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BaseSelect } from '@/components'
import { reactive } from 'vue'

const info = reactive({
    modelValue: '',
    'onUpdate:modelValue': value => info.modelValue = value,
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
