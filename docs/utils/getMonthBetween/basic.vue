<template>
    <div class="flex flex-col gap-10px">
        <div class="flex">
            <el-button @click="result = getMonthBetween('2021-01-01', '2021-05-05')">获取</el-button>
            <el-button @click="result = void 0">重置</el-button>
        </div>
        <pre>result: {{ JSON.stringify(result, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { getMonthBetween } from '@/utils/time'
import { ref } from 'vue'

const result = ref(void 0)
</script>

<style lang="scss" scoped></style>
