<template>
    <div class="flex flex-col gap-10px">
        <div class="flex flex-wrap gap-10px [&>.el-button]:ml-0px">
            <el-button @click="create()">创建</el-button>
            <el-button @click="state.resolve?.()">resolve</el-button>
            <el-button @click="state.reject?.()">reject</el-button>
            <el-button @click="state.cancel?.()">cancel</el-button>
            <el-button @click="reset()">重置</el-button>
        </div>
        <pre>result: {{ JSON.stringify(state, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { createImperativePromise } from '@/utils/promise'
import { reactive } from 'vue'

const state = reactive({
    promise: null,
    promiseState: null,
    resolve: null,
    reject: null,
    cancel: null
})

const create = async () => {
    const { promise, resolve, reject, cancel } = createImperativePromise()
    Object.assign(state, { promise, resolve, reject, cancel })

    try {
        state.promiseState = 'pending'
        await state.promise
        state.promiseState = 'fulfilled'
    } catch (error) {
        state.promiseState = 'rejected'
    }
}

const reset = () => {
    Object.assign(state, {
        promise: null,
        promiseState: null,
        resolve: null,
        reject: null,
        cancel: null
    })
}
</script>

<style lang="scss" scoped></style>
