<template>
    <div class="flex flex-col gap-10px">
        <div>list: {{ list }}</div>
        <div>map: {{ map }}</div>
        <div class="flex">
            <el-button @click="refresh()">刷新</el-button>
            <el-button @click="reset()">重置</el-button>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { useCustomDict } from '@/composables/data'
import { promiseTimeout } from '@vueuse/core'

const api = async () => {
    await promiseTimeout(300)
    return Array.from({ length: 10 }, (_, i) => {
        const id = i + 1
        return {
            id,
            label: `${Math.random().toString()}`
        }
    })
}

const { list, map, refresh, reset } = useCustomDict({
    fetchFn: api,
    labelField: 'label',
    valueField: 'id',
    immediate: true
})
</script>

<style lang="scss" scoped></style>
