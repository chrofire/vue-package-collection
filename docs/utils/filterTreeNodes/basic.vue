<template>
    <div class="flex flex-col gap-10px">
        <div class="flex">
            <el-button @click="result = filterTreeNodes(source, node => ['1-1'].includes(node.id))">过滤</el-button>
            <el-button @click="result = void 0">重置</el-button>
        </div>
        <pre>source: {{ JSON.stringify(source, null, 4) }}</pre>
        <pre>result: {{ JSON.stringify(result, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { filterTreeNodes } from '@/utils/tree'
import { ref } from 'vue'

const source = ref([
    {
        id: '1',
        label: '1',
        children: [
            {
                id: '1-1',
                label: '1-1'
            }
        ]
    },
    {
        id: '2',
        label: '2'
    }
])

const result = ref(void 0)
</script>

<style lang="scss" scoped></style>
