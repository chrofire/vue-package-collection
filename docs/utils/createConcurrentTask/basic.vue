<template>
    <div class="flex flex-col gap-10px">
        <div class="flex">
            <el-button @click="create()">创建</el-button>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { createConcurrentTask } from '@/utils/promise'

const create = async () => {
    const { addTask } = createConcurrentTask(3)
    let startTime = +new Date()

    function createPromiseTask (data, ms = 1000) {
        return async () => {
            const res = await new Promise(resolve => {
                setTimeout(() => {
                    resolve(data)
                }, ms)
            })
            console.log(res, +new Date() - startTime)
        }
    }

    addTask(createPromiseTask(1, 1000))
    addTask(createPromiseTask(2, 2000), createPromiseTask(3, 2000))
    addTask(...[createPromiseTask(4, 3000), createPromiseTask(5, 3000)])

    // round1: [1, 2, 3]
    // 1 1000
    // round2: [2, 3, 4]
    // 2 2000
    // 3 2000
    // round3: [4, 5]
    // 4 4000
    // 5 5000
    // []
}
</script>

<style lang="scss" scoped></style>
