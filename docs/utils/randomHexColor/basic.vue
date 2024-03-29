<template>
    <div class="flex flex-col gap-10px">
        <div class="flex">
            <el-button @click="result = randomHexColor()">生成</el-button>
            <el-button @click="result = void 0">重置</el-button>
        </div>
        <div>result: <span :style="{ backgroundColor: result }">{{ result }}</span></div>
    </div>
</template>

<script lang="jsx" setup>
import { randomHexColor } from '@/utils/color'
import { ref } from 'vue'

const result = ref(void 0)
</script>

<style lang="scss" scoped></style>
