<template>
    <div class="h-450px b b-solid">
        <ScaleWrapper>
            <div class="content-wrapper">
                <div v-for="item in 10" :key="item" class="item">{{ item }}</div>
            </div>
        </ScaleWrapper>
    </div>
</template>

<script lang="jsx" setup>
import { ScaleWrapper } from '@/components'

</script>

<style lang="scss" scoped>
.content-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
    .item {
        width: 200px;
        height: 200px;
        border: 1px solid;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
