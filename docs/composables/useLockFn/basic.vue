<template>
    <div class="flex flex-col gap-10px">
        <div class="flex items-center gap-10px">
            <el-button @click="_useLockFn">useLockFn</el-button>
            <div>isLocked: {{ _useLockFn.isLocked }}</div>
        </div>
        <div>
            <el-button @click="_createLockFn">createLockFn</el-button>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { createLockFn, useLockFn } from '@/composables/useLockFn'
import { promiseTimeout } from '@vueuse/core'

const fn = async () => {
    console.log(`fn start`)
    await promiseTimeout(1000)
    console.log(`fn end`)
}

const _useLockFn = useLockFn(fn)

const _createLockFn = createLockFn(fn, 1000)

</script>

<style lang="scss" scoped></style>
