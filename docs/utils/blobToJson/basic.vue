<template>
    <div class="flex flex-col gap-10px">
        <div class="flex">
            <el-button @click="result = gen()">生成</el-button>
            <el-button @click="result = void 0">重置</el-button>
        </div>
        <pre>result: {{ JSON.stringify(result, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { blobToJson } from '@/utils/blob'
import { ref } from 'vue'

const result = ref(void 0)

const gen = async () => {
    // 原始json数据
    const rawJsonData = {
        timestamp: new Date().getTime()
    }

    // json数据转成字符串
    const rawJsonString = JSON.stringify(rawJsonData)

    const blob = new Blob([rawJsonString], { type: 'application/json' })

    const jsonData = await blobToJson(blob)

    result.value = jsonData
}
</script>

<style lang="scss" scoped></style>
