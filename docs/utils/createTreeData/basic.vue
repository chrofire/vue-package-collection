<template>
    <div class="flex flex-col gap-10px">
        <div class="flex flex-col gap-10px">
            <div class="flex flex-col gap-10px">
                <div class="row">
                    <div class="label">数组长度</div>
                    <el-input-number class="input" :min="0" v-model="state.arrayLength"></el-input-number>
                </div>
                <div class="row">
                    <div class="label">最大深度</div>
                    <el-input-number class="input" :min="0" v-model="state.maxDeep"></el-input-number>
                </div>
                <div class="row">
                    <div class="label">最大 children 长度</div>
                    <el-input-number class="input" :min="0" v-model="state.maxChildrenLength"></el-input-number>
                </div>
                <div class="row">
                    <div class="label">唯一 key</div>
                    <el-input class="input" v-model="state.key"></el-input>
                </div>
            </div>
            <div>
                <el-button class="w-100px" @click="create()">创建</el-button>
                <el-button class="w-100px" @click="data = void 0">重置</el-button>
            </div>
        </div>
        <pre>data: {{ JSON.stringify(data, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { createTreeData } from '@/utils/tree'
import { reactive, ref } from 'vue'

const state = reactive({
    arrayLength: 5,
    maxDeep: 2,
    maxChildrenLength: 3,
    key: 'node'
})

const data = ref(void 0)

const create = async () => {
    const { arrayLength, maxDeep, maxChildrenLength, key } = state
    const result = createTreeData(arrayLength, maxDeep, maxChildrenLength, key)
    data.value = result
}
</script>

<style lang="scss" scoped>
.row {
    display: flex;
    align-items: center;
    .label {
        flex-shrink: 0;
        width: 145px;
    }
    .input {
        flex: 1 0;
        max-width: 200px;
        :deep() {
            .el-input__inner {
                text-align: center;
            }
        }
    }
}
</style>
