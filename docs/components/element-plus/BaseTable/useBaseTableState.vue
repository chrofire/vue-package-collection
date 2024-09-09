<template>
    <div class="h-300px">
        <BaseTable ref="baseTableRef" @register="registerTable" v-bind="tableProps"></BaseTable>
    </div>
</template>

<script lang="jsx" setup>
import { BaseTable, useBaseTableState } from '@/components'
import { ref } from 'vue'

const baseTableRef = ref()

const [registerTable, { componentProps: tableProps }] = useBaseTableState({
    autoHeight: true,
    rowKey: row => row.id,
    columns: [
        {
            prop: 'field1',
            label: '字段1'
        },
        {
            prop: 'field2',
            label: '字段2'
        },
        {
            prop: 'field3',
            label: '字段3',
            render: ({ column, row }) => {
                const value = row[column.property]
                return <span class="text-red">{value}</span>
            }
        }
    ],
    data: Array.from({ length: 20 }, (_, i) => {
        const id = i + 1
        return {
            id,
            field1: `字段1-${id}`,
            field2: `字段2-${id}`,
            field3: `字段3-${id}`
        }
    })
})
</script>

<style lang="scss" scoped></style>
