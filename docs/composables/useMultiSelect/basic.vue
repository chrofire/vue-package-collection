<template>
    <div class="">
        <div class="flex flex-col">
            <el-checkbox
                v-for="item in state.list"
                :key="item.id"
                :modelValue="item.selected"
                :label="item.label"
                @change="updateRowSelect(item)"
            ></el-checkbox>
        </div>
        <div class="flex">
            <el-button @click="prev">上一页</el-button>
            <div class="w-50px flex justify-center items-center">{{ state.pageNum }}</div>
            <el-button @click="next">下一页</el-button>
        </div>
        <div v-for="item in selectedMap.values()" :key="item.id" class="flex gap-10px">
            <div>{{ item.label }}</div>
            <div class="select-none scale-x-[1.2] cursor-pointer" @click="updateRowSelect(item)">
                X
            </div>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { useMultiSelect } from '@/composables/useMultiSelect'
import { useOffsetPagination } from '@vueuse/core'
import { nextTick, reactive, watch } from 'vue'

/**
 * @typedef {{
 *  id: number,
 *  label: string,
 *  selected?: boolean
 *  }} Data
 */

/** @type {Data[]} */
const tableData = Array.from({ length: 80 }, (_, i) => {
    return {
        id: i + 1,
        label: `label-${i + 1}`
    }
})

const state = reactive({
    /** @type {Data[]} */
    list: [],
    pageSize: 10,
    pageNum: 1,
    total: 1
})

const api = (/** @type {{ pageNum: number, pageSize: number }} */ params) => {
    const { pageNum, pageSize } = params
    return new Promise(resolve => {
        const start = (pageNum - 1) * pageSize
        const end = start + pageSize
        setTimeout(() => {
            resolve({
                list: tableData.slice(start, end).map(item => ({ ...item })),
                pageSize,
                pageNum,
                total: tableData.length
            })
        }, 100)
    })
}

const fetchData = (/** @type {{ pageNum: number, pageSize: number }} */ params) => {
    return api(params).then(res => {
        Object.assign(state, res)
    })
}

/** @type {import('@vueuse/core').UseOffsetPaginationOptions['onPageChange']} */
const onPaginationChange = ctx => {
    const { currentPage: pageNum, currentPageSize: pageSize } = ctx
    fetchData({ pageNum, pageSize })
}

const { prev, next } = useOffsetPagination({
    total: tableData.length,
    page: state.pageNum,
    pageSize: state.pageSize,
    onPageChange: onPaginationChange,
    onPageSizeChange: onPaginationChange
})

fetchData({ pageNum: state.pageNum, pageSize: state.pageSize })

const { updateRowSelect, updateView, syncLatestData, selectedMap } = useMultiSelect({
    keyField: 'id',
    list: () => state.list,
    max: 2,
    // isSingle: true,
    // isAllowCancel: true,
    toggleRowSelect: (row, select) => {
        row.selected = Boolean(select)
    }
})

watch(
    () => state.list,
    async () => {
        await nextTick()
        updateView()
        // syncLatestData()
    }
)
</script>

<style lang="scss" scoped></style>
