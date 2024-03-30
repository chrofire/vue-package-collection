<template>
    <div class="flex flex-col gap-10px">
        <div class="flex">
            <el-button @click="result = genUUID()">生成</el-button>
            <el-button @click="result = void 0">重置</el-button>
        </div>
        <div>result: {{ result }}</div>
    </div>
</template>

<script lang="jsx" setup>
import { genUUID } from '@/utils/genUUID'
import { ref } from 'vue'

const result = ref(void 0)
</script>

<style lang="scss" scoped></style>
