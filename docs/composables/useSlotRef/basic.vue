<template>
    <div>
        <el-button @click="toggleShow(!show)">toggleShow</el-button>
        <Demo>
            <template #custom v-if="show">
                {{ num }}
            </template>
        </Demo>
    </div>
</template>

<script lang="jsx" setup>
import { useSlotRef } from '@/composables/useSlotRef'
import { defineComponent, onBeforeUnmount, ref, watch } from 'vue'

const show = ref(true)
const toggleShow = bool => {
    show.value = bool
}

const num = ref(0)
let timer = setInterval(() => {
    num.value++
}, 1000)

onBeforeUnmount(() => {
    clearInterval(timer)
})

const Demo = defineComponent({
    /** @type {import('vue').SlotsType<{ custom?: () => import('vue').VNodeChild }>} */
    slots: Object,
    setup (props, { slots }) {
        const customSlot = useSlotRef(slots, 'custom')

        // 非响应式
        watch(() => slots.custom, () => {
            console.log(`slot`, slots)
        })

        // 响应式
        watch(customSlot, () => {
            console.log(`customSlot`, slots)
        })

        return () => {
            return (
                <div>
                    <div>Demo</div>
                    <div>{slots.custom?.()}</div>
                    <div>{customSlot.value?.()}</div>
                </div>
            )
        }
    }
})
</script>

<style lang="scss" scoped></style>
