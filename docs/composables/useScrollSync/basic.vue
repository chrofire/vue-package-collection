<template>
    <div class="flex gap-10px">
        <div ref="container1Ref" class="flex-[1_0] max-w-200px h-300px flex flex-col gap-5px overflow-auto">
            <div
                v-for="item in list"
                :key="item.id"
                class="w-300px min-h-30px flex justify-center items-center bg-gray color-#fff"
            >
                {{ item.label }}
            </div>
        </div>
        <div ref="container2Ref" class="flex-[1_0] max-w-200px h-300px flex flex-col gap-5px overflow-auto">
            <div
                v-for="item in list"
                :key="item.id"
                class="w-600px min-h-100px flex justify-center items-center bg-gray color-#fff"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { useScrollSync } from '@/composables/useScrollSync'
import { reactive, ref } from 'vue'

const list = reactive(
    Array.from({ length: 50 }, (_, i) => {
        const id = i + 1
        return {
            id,
            label: `label-${id}`
        }
    })
)

/** @type {import('vue').Ref<HTMLElement>} */
const container1Ref = ref()
/** @type {import('vue').Ref<HTMLElement>} */
const container2Ref = ref()

/** @type {import('vue').Ref<HTMLElement[]>} */
const elRefList = ref([])

const y = ref(true)

useScrollSync({
    // list: elRefList,
    list: () => [container1Ref.value, container2Ref.value],
    y
})

// setTimeout(() => {
//     elRefList.value.push(container1Ref.value)
//     setTimeout(() => {
//         elRefList.value.push(container2Ref.value)
//         setTimeout(() => {
//             elRefList.value.pop()
//         }, 2000)
//     }, 1000)
// }, 1000)
// setTimeout(() => {
//     y.value = true
// }, 1000)
</script>

<style lang="scss" scoped>

</style>
