<template>
    <div class="flex flex-col gap-10px">
        <NumTo :end="num"></NumTo>
        <div>
            <el-button @click="random">random</el-button>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { NumTo } from '@/components'
import { onMounted, ref } from 'vue'

const num = ref()

const random = () => {
    num.value = +(Math.random() * 1000).toFixed(2)
}

onMounted(random)
</script>

<style lang="scss" scoped>

</style>
