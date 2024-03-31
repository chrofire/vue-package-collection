<template>
    <div>
        <BaseButton lock :unlockDelay="2000" @click="handleClick">单击</BaseButton>
    </div>
</template>

<script lang="jsx" setup>
import { promiseTimeout } from '@vueuse/core'
import { BaseButton } from '@/components'

const handleClick = async event => {
    event.preventDefault()
    console.log(`handleClick start`)
    await promiseTimeout(1000)
    console.log(`handleClick end`)
}
</script>

<style lang="scss" scoped></style>
