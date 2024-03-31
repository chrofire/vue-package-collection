<template>
    <div class="flex flex-col gap-10px">
        <div>{{ data }}</div>
        <div class="flex">
            <el-button @click="data = { num: 10 }">设置数据</el-button>
            <el-button @click="updateDataCache({ num: 1 })">更新缓存</el-button>
            <el-button @click="resetData()">重置数据</el-button>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { useData } from '@/composables/data'

const { data, resetData, updateDataCache } = useData({})
</script>

<style lang="scss" scoped></style>
