<template>
    <div>
        <GanttChartTimeLine
            class="h-125px!"
            :axisList="['year', 'quarter', 'month', 'day']"
            startDate="2020-01-01"
            endDate="2021-01-15"
        ></GanttChartTimeLine>
    </div>
</template>

<script lang="jsx" setup>
import { GanttChartTimeLine } from '@/components'
</script>

<style lang="scss" scoped></style>
