<template>
    <div>
        <BasePagination v-bind="state">
            <div>template</div>
        </BasePagination>
        <pre>{{ JSON.stringify(state.paginationData, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BasePagination } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    ref: value => state.instanceRef = value,
    instanceRef: null,
    paginationData: {
        pageNum: 1,
        pageSize: 10,
        total: 50
    },
    layout: `total, sizes, prev, pager, next, slot`,
    render: () => {
        return 'render'
    }
})
</script>

<style lang="scss" scoped></style>
