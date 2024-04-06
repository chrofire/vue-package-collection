<template>
    <div>
        <BaseRender :render="render" :state="state"></BaseRender>
        <el-button @click="state.num++">add</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { BaseRender } from '@/components'
import { reactive } from 'vue'

const state = reactive({
    num: 0
})

const render = ({ state }) => {
    return <div class="text-blue">{`渲染器-${state.num}`}</div>
}
</script>

<style lang="scss" scoped></style>
