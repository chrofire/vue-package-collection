<template>
    <div>
        <BasePagination v-bind="info">
            <div>template</div>
        </BasePagination>
        <pre>{{ JSON.stringify(info.paginationData, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BasePagination } from '@/components'
import { reactive } from 'vue'

const info = reactive({
    ref: value => info.instanceRef = value,
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
