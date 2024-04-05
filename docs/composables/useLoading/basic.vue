<template>
    <div>
        <div ref="container" class="w-200px h-100px bg-gray mb-10px"></div>
        <el-button @click="loading.start()">start</el-button>
        <el-button @click="loading.stop()">stop</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { useLoading } from '@/composables/useLoading'
import { ref } from 'vue'

const container = ref(null)

// ref
const loading = useLoading({ target: container })

// () => dom
// const loading = useLoading({ target: () => container.value })
</script>

<style lang="scss" scoped></style>
