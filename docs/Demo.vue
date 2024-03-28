<template>
    <div class="w-100%">
        <el-button>按钮</el-button>
        <button>按钮</button>
        <i class="i-ep-close"></i>
        <Test></Test>
    </div>
</template>

<script lang="jsx" setup>
import components from '@/components'

const Test = () => {
    return (
        <div>content</div>
    )
}

console.log(components)
</script>

<style lang="scss" scoped>

</style>
