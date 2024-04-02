<template>
    <div class="flex flex-col">
        <div class="mb-5px">
            <span>单选 : </span>
            <el-button @click="() => {
                tableProps.singleSelect = !tableProps.singleSelect
                setSingleSelect()
            }">
                singleSelect: {{ tableProps.singleSelect }}
            </el-button>
            <el-button
                @click="setSingleSelect(tableProps.data[1])"
                :disabled="!tableProps.singleSelect"
            >
                setSingleSelect 第 2 行
            </el-button>
            <el-button @click="console.log(getSingleSelect())" :disabled="!tableProps.singleSelect">
                getSingleSelect log
            </el-button>
        </div>
        <div class="mb-5px">
            <span>多选 : </span>
            <el-button @click="() => {
                multipleSelect = !multipleSelect
                clearSelection()
            }">
                multipleSelect: {{ multipleSelect }}
            </el-button>
            <el-button @click="setMultipleSelect([tableProps.data[0], tableProps.data[2]])">
                setMultipleSelect: 第 1, 3 行
            </el-button>
        </div>
        <div class="mb-5px">
            <span>单项多选 : </span>
            <el-button
                @click="() => {
                    tableProps.singleItemMultipleSelect = !tableProps.singleItemMultipleSelect
                    clearSelection()
                }"
            >
                singleItemMultipleSelect: {{ tableProps.singleItemMultipleSelect }}
            </el-button>
            <el-button
                @click="setSingleItemMultipleSelect(tableProps.data[1])"
            >
                setSingleItemMultipleSelect 第 2 行
            </el-button>
        </div>
        <div class="mb-5px">
            <el-button @click="console.log(getMultipleSelect())">getMultipleSelect log</el-button>
            <el-button @click="clearSelection()">clearSelection</el-button>
        </div>
    </div>
    <div class="h-300px">
        <BaseTable ref="BaseTableRef" @register="registerTable" v-bind="tableProps"></BaseTable>
    </div>
</template>

<script lang="jsx" setup>
import { BaseTable, useBaseTableState } from '@/components'
import { computed, ref } from 'vue'

const BaseTableRef = ref()

const multipleSelect = ref(false)

const computedColumns = computed(() => {
    const _columns = [
        {
            type: 'selection'
        },
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
            label: '字段3'
        }
    ]
    if (multipleSelect.value) return _columns
    return _columns.filter(column => column.type !== 'selection')
})
const [
    registerTable,
    {
        componentProps: tableProps,
        setSingleSelect,
        getSingleSelect,
        setMultipleSelect,
        setSingleItemMultipleSelect,
        getMultipleSelect,
        clearSelection
    }
] = useBaseTableState({
    autoHeight: true,
    singleSelect: false,
    singleItemMultipleSelect: false,
    rowKey: row => row.id,
    columns: computedColumns,
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
