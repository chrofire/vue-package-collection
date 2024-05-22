<template>
    <div class="flex flex-col gap-10px">
        <NumTo start="0.000" :end="num"></NumTo>
        <NumTo start="0.000" :end="num" addPlusSymbol></NumTo>
        <div>
            <el-button @click="num = +getRandomNum()">随机正值</el-button>
            <el-button @click="num = -getRandomNum()">随机负值</el-button>
            <el-button @click="num = null">非法值</el-button>
            <el-button @click="num = '+10000.000'">+10000.000</el-button>
            <el-button @click="num = '-10000.000'">-10000.000</el-button>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { NumTo } from '@/components'
import { ref } from 'vue'

const num = ref()

const getRandomNum = () => {
    return (Math.random() * 1000).toFixed(2)
}
</script>

<style lang="scss" scoped>

</style>
