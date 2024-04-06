<template>
    <div>
        <BaseRender :render="render" :state="state"></BaseRender>
        <el-button @click="state.num++">add</el-button>
    </div>
</template>

<script lang="jsx" setup>
import { BaseRender } from '@/components'
import { h, reactive } from 'vue'

const state = reactive({
    num: 0
})

const render = ({ state }) => {
    return h('div', { class: 'text-red' }, `渲染器-${state.num}`)
}
</script>

<style lang="scss" scoped></style>
