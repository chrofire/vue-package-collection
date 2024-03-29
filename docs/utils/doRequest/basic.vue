<template>
    <div class="flex flex-col gap-10px">
        <div class="flex">
            <el-button @click="exec()">执行</el-button>
            <el-button @click="data = void 0">重置</el-button>
        </div>
        <pre>data: {{ JSON.stringify(data, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { doRequest } from '@/utils/data'
import { promiseTimeout } from '@vueuse/core'
import { ref } from 'vue'

const data = ref(void 0)

const api = async () => {
    await promiseTimeout(1000)
    return Array.from({ length: 5 }, (_, i) => {
        const id = i + 1
        return {
            id,
            label: `${Math.random().toString()}`
        }
    })
}

const exec = async () => {
    const result = await doRequest(api)
    data.value = result
}
</script>

<style lang="scss" scoped></style>
