<template>
    <div
        class="gantt-chart"
        :style="{
            '--gantt-chart-header-height': `${props.headerHeight}px`,
            '--gantt-chart-row-height': `${props.rowHeight}px`,
            '--gantt-chart-left-list-width': `${props.leftListWidth}px`,
            '--gantt-chart-right-list-cell-width': `${props.rightListCellWidth}px`
        }"
    >
        <div class="gantt-chart__header">
            <div
                class="gantt-chart__left-list-header"
            >
                <slot name="leftListHeader"></slot>
            </div>
            <TimeLine
                ref="TimeLineRef"
                class="gantt-chart__time-line"
                :axisList="props.axisList"
                :dayWidth="props.dayWidth"
                :startDate="props.startDate"
                :endDate="props.endDate"
            >
            </TimeLine>
        </div>
        <div class="gantt-chart__body">
            <ChartContent ref="ChartContentRef">
                <template #leftListRowItem="ctx">
                    <slot name="leftListRowItem" v-bind="ctx"></slot>
                </template>
                <template #rightListRowItem="ctx">
                    <slot name="rightListRowItem" v-bind="ctx"></slot>
                </template>
            </ChartContent>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { computed, provide, reactive, ref, toRefs } from 'vue'
import ChartContent from './ChartContent.vue'
import TimeLine from './TimeLine.vue'

defineOptions({
    name: 'GanttChart'
})

const props = defineProps({
    /** 树形数据 */
    treeList: {
        type: Array,
        default: () => []
    },
    /** 自定义字段名 */
    fieldNames: {
        type: Object,
        default: () => ({})
    },
    /** 表头高度 */
    headerHeight: {
        type: Number,
        default: 90
    },
    /** 行高度 */
    rowHeight: {
        type: Number,
        default: 46
    },
    /** 左侧列表宽度 */
    leftListWidth: {
        type: Number,
        default: 100
    },
    /** 左侧列表树缩进宽度 */
    leftListIndentWidth: {
        type: Number,
        default: 30
    },
    /** 右列表单元格宽度 */
    rightListCellWidth: {
        type: Number,
        default: 24
    },
    /** 显示的轴列表 */
    axisList: {
        /** @type {import('vue').PropType<('year' | 'month' | 'day')[]>} */
        type: Array
    },
    /** 一天的宽度 (基准宽度) */
    dayWidth: {
        type: Number,
        default: 24
    },
    /** 开始日期 */
    startDate: {
        type: String,
        default: ''
    },
    /** 结束日期 */
    endDate: {
        type: String,
        default: ''
    },
    /** 填充结束时间 HH:mm:ss:SSS 为 23:59:59:999 */
    fillEndDate: {
        type: Boolean,
        default: false
    }
})

const TimeLineRef = ref()
const ChartContentRef = ref()

// 时间轴完整宽度
const fullWidth = computed(() => {
    return TimeLineRef.value?.fullWidth || 0
})

// 填充默认字段
function fillFieldNames (fieldNames = {}) {
    const { key, label, children, startDate, endDate, color } = fieldNames || {}

    return {
        key: key || 'id',
        label: label || 'label',
        children: children || 'children',
        startDate: startDate || 'startDate',
        endDate: endDate || 'endDate',
        color: color || 'color'
    }
}

const fieldNames = computed(() => {
    return fillFieldNames(props.fieldNames)
})

const context = reactive({
    ...toRefs(props),
    fullWidth,
    fieldNames,
    TimeLineRef,
    ChartContentRef
})

provide(
    'ganttChartKey',
    context
)

defineExpose(context)
</script>

<style lang="scss" scoped>
.gantt-chart {
    --gantt-chart-bg-color: #f7f7fa;
    --gantt-chart-text-color: rgba(0, 0, 0, 0.88);
    --gantt-chart-border-color: rgba(1, 0, 0, 0.16);
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid var(--gantt-chart-border-color);
    .gantt-chart__header {
        height: var(--gantt-chart-header-height);
        width: 100%;
        display: flex;
        .gantt-chart__left-list-header {
            width: var(--gantt-chart-left-list-width);
            flex-shrink: 0;
            border-right: 1px solid var(--gantt-chart-border-color);
            border-bottom: 1px solid var(--gantt-chart-border-color);
            overflow: auto;
        }
        :deep() {
            .gantt-chart__time-line {
                width: 100%;
                overflow-x: hidden;
                --time-line-bg-color: var(--gantt-chart-bg-color);
                --time-line-text-color: var(--gantt-chart-text-color);
                --time-line-border-color: var(--gantt-chart-border-color);
            }
        }
    }
    .gantt-chart__body {
        flex: 1 0;
        min-height: 0;
    }
}
</style>
