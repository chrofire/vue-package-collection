<template>
    <div class="">
        <el-button @click="open">选择文件</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { openFilePicker } from '@/utils/file'

const open = async () => {
    const fileList = await openFilePicker({ throwError: false, multiple: true })
    console.log(`fileList:`, fileList)
}
</script>

<style lang="scss" scoped></style>
