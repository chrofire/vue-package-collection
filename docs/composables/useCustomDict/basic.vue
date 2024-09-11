<template>
    <div class="flex flex-col gap-10px">
        <pre>list: {{ JSON.stringify(list, null, 4) }}</pre>
        <pre>map: {{ JSON.stringify(map, null, 4) }}</pre>
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
    return Array.from({ length: 5 }, (_, i) => {
        const id = i + 1
        return {
            id,
            name: `${Math.random().toString()}`
        }
    })
}

const { list, map, refresh, reset } = useCustomDict({
    fetchFn: api,
    fromLabel: 'name',
    fromValue: 'id',
    immediate: true
})
</script>

<style lang="scss" scoped></style>
