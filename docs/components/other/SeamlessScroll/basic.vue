<template>
    <div>
        <div class="max-w-500px h-300px">
            <SeamlessScroll :step="0.4" :wheelStep="20">
                <div class="item" v-for="item in list" :key="item.id">
                    <span>{{ item.id }}</span>
                    <span>{{ item.content }}</span>
                    <span>{{ item.date }}</span>
                </div>
            </SeamlessScroll>
        </div>
        <el-button @click="push">push</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { SeamlessScroll } from '@/components'
import { ref } from 'vue'

const list = ref(Array.from({ length: 2 }, (_, _i) => {
    const i = _i + 1
    return {
        id: i,
        content: `content-${i}`,
        date: +new Date()
    }
}))

const push = () => {
    const last = list.value[list.value.length - 1]
    list.value.push({
        id: last.id + 1,
        content: `${last.content.split('-').shift()}-${last.id + 1}`,
        date: +new Date()
    })
}
</script>

<style lang="scss" scoped>
.item {
    padding: 10px;
    border: 1px solid green;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}
</style>
