<template>
    <div class="flex flex-col gap-10px">
        <GanttChart
            ref="GanttChartRef"
            class="h-500px!"
            :fieldNames="{
                key: 'id',
                label: 'id',
                startDate: 'start',
                endDate: 'end'
            }"
            :leftListWidth="200"
            :treeList="treeList"
            startDate="2020-01-01"
            endDate="2020-05-05"
            :fillEndDate="true"
        >
            <template #leftListHeader></template>
            <template #leftListRowItem="{ item, toggleNode }"></template>
            <template #rightListRowItem="{ item }"></template>
        </GanttChart>
        <div>
            <el-button @click="console.log(GanttChartRef)">打印实例</el-button>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { GanttChart } from '@/components'
import { reactive, ref } from 'vue'

const GanttChartRef = ref()

const treeList = reactive(
    Array.from({ length: 20 }, ((_, _one) => {
        const one = _one + 1
        return {
            id: `${one}`,
            start: `2020-01-01`,
            end: `2020-05-05`,
            color: '#333',
            children: Array.from({ length: 2 }, ((_, _two) => {
                const two = _two + 1
                return {
                    id: `${one}-${two}`,
                    start: `2020-0${two}-0${two}`,
                    end: `2020-0${two + 1}-01`,
                    color: 'red',
                    children: Array.from({ length: 1 }, ((_, _three) => {
                        const three = _three + 1
                        return {
                            id: `${one}-${two}-${three}`,
                            start: `2020-0${two}-0${two + 1}`,
                            end: `2020-0${two + 1}-01`,
                            color: 'blue'
                        }
                    }))
                }
            }))
        }
    }))
)
</script>

<style lang="scss" scoped></style>
