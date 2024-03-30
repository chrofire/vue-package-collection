<template>
    <div class="flex flex-col gap-10px">
        <el-input v-model="content" type="textarea" :rows="5"></el-input>
        <div class="flex">
            <el-button @click="genAndDownload">生成txt并下载</el-button>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { downloadBlob } from '@/utils/blob'
import { ref } from 'vue'

const content = ref('')

const genAndDownload = () => {
    const blob = new Blob([content.value], { type: 'text/plain' })

    downloadBlob(blob, `text-${new Date().getTime()}.txt`)

    content.value = ''
}
</script>

<style lang="scss" scoped></style>
