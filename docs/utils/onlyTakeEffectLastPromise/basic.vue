<template>
    <div class="flex flex-col gap-10px">
        <div class="flex">
            <el-button @click="call()">调用</el-button>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { onlyTakeEffectLastPromise } from '@/utils/promise'

const asyncFn = async (value, ms, success = true) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            success ? resolve(value) : reject(value)
        }, ms)
    })
}

const wrappedAsyncFn = onlyTakeEffectLastPromise(asyncFn)

let startTime
let id = 0

const call = async () => {
    if (!startTime) {
        startTime = +new Date()
    }

    id++

    try {
        const res = await wrappedAsyncFn(id, 1000, true)
        console.log(res, +new Date() - startTime)
    } catch (error) {
        console.log(`error`, error, +new Date() - startTime)
    } finally {
        startTime = undefined
    }
}
</script>

<style lang="scss" scoped></style>
