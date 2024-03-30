<template>
    <div class="flex flex-col gap-10px">
        <div class="flex flex-col">
            <div v-for="item in list" :key="item.id" :ref="el => item.el = el">{{ item.label }}</div>
        </div>
        <div class="flex gap-10px">
            <el-button @click="() => {
                const id = Math.random()
                list.push({
                    id,
                    label: `label-${id}`,
                    el: null
                })
            }">push</el-button>
            <el-button @click="() => list.length && list.pop()">pop</el-button>
            <el-button @click="cleanup">cleanup</el-button>
            <el-button @click="console.log(cleanupList)">logCleanupList</el-button>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { registerHtmlElEvent, createEventCleanup } from '@/utils/dom'
import { onBeforeUnmount, ref, watch } from 'vue'

const list = ref(Array.from({ length: 1 }, (_, i) => {
    const id = i + 1
    return {
        id,
        label: `label-${id}`,
        el: null
    }
}))

const { cleanupList, cleanup } = createEventCleanup()

const clickHandler = (/** @type {MouseEvent} */ e) => {
    console.log(e, cleanupList)
}

watch(
    list,
    () => {
        cleanup()

        list.value.forEach(item => {
            const el = item.el
            if (!el) return
            cleanupList.push(registerHtmlElEvent(el, 'click', clickHandler))
        })
    },
    {
        deep: true
    }
)

onBeforeUnmount(() => {
    cleanup()
})
</script>

<style lang="scss" scoped></style>
