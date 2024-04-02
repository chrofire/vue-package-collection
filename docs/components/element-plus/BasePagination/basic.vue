<template>
    <div>
        <BasePagination v-bind="info"></BasePagination>
        <pre>{{ JSON.stringify(info.paginationData, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { BasePagination } from '@/components'
import { reactive } from 'vue'

const info = reactive({
    paginationData: {
        pageNum: 1,
        pageSize: 10,
        total: 50
    },
    onChange (params) {
        console.log(params)
    }
})
</script>

<style lang="scss" scoped></style>
