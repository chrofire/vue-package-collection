<template>
    <div class="flex flex-col gap-10px">
        <div class="flex">
            <el-button @click="result = gen()">生成</el-button>
            <el-button @click="result = void 0">重置</el-button>
        </div>
        <div>
            result:
            <img v-if="result" :src="result" />
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { genPlaceholderImage } from '@/utils/genPlaceholderImage'
import { ref } from 'vue'

const result = ref(void 0)

const gen = async () => {
    const { dataURL, blob, objectURL } = await genPlaceholderImage(200, 100, {
        randomColor: true
    })
    result.value = dataURL
}
</script>

<style lang="scss" scoped></style>
