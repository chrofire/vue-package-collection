<template>
    <div>
        <el-button @click="tableProps.autoHeight = !tableProps.autoHeight">
            autoHeight: {{ tableProps.autoHeight }}
        </el-button>
        <el-slider v-model="sliderVal" :min="200" :max="600" :disabled="!tableProps.autoHeight" />
    </div>
    <div
        :style="{
            height: tableProps.autoHeight ? `${sliderVal}px` : undefined
        }"
    >
        <BaseTable ref="baseTableRef" @register="registerTable" v-bind="tableProps"></BaseTable>
    </div>
</template>

<script lang="jsx" setup>
import { BaseTable, useBaseTableState } from '@/components'
import { ref } from 'vue'

const baseTableRef = ref()

const sliderVal = ref(200)

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
            cellRenderer: ({ column, row }) => {
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
