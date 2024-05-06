<template>
    <div class="chart-content">
        <div class="left-list" ref="leftListElRef">
            <template v-for="item in flattenList" :key="item.key">
                <slot name="leftListRowItem" v-bind="getBindContext(item)">
                    <div
                        class="default-row-item"
                        v-if="item.isShow"
                        :style="{
                            // 10 为最左侧基本间距
                            paddingLeft: `${10 + (item.level - 1) * ganttChartContext.leftListIndentWidth}px`
                        }"
                    >
                        <div
                            class="toggle-btn"
                            v-if="item.children?.length"
                            @click="toggleNode(item, !item.isExpand)"
                        >
                            {{ item.isExpand ? '▲' : '▼' }}
                        </div>
                        <div class="toggle-btn-placeholder" v-else></div>
                        <div class="label">{{ item.label }}</div>
                    </div>
                </slot>
            </template>
        </div>
        <div class="right-list" ref="rightListElRef">
            <template v-for="item in flattenList" :key="item.key">
                <slot name="rightListRowItem" v-bind="getBindContext(item)">
                    <div
                        class="default-row-item"
                        v-if="item.isShow"
                        :style="{ width: `${ganttChartContext.fullWidth}px` }"
                    >
                        <template v-if="item.startDate && item.endDate">
                            <div class="default-row-item-block" :style="getBlockStyle(item)"></div>
                        </template>
                    </div>
                </slot>
            </template>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { useScrollSync } from '@/composables/useScrollSync'
import dayjs from 'dayjs'
import { computed, inject, ref, watch } from 'vue'

defineOptions({
    name: 'GanttChartContent'
})

const ganttChartContext = inject('ganttChartKey')

const leftListElRef = ref()
const rightListElRef = ref()
const timeLineElRef = computed(() => {
    return ganttChartContext.TimeLineRef?.timeLineElRef
})

// 同步左右列表垂直滚动
useScrollSync({
    list: () => [leftListElRef.value, rightListElRef.value],
    x: false,
    y: true
})

// 同步右列表和时间轴横向滚动
useScrollSync({
    list: () => [rightListElRef.value, timeLineElRef.value],
    x: true,
    y: false
})

const expandKeySet = ref(new Set([]))
const showKeySet = ref(new Set([]))

watch(
    () => ganttChartContext.treeList,
    list => {
        // 初始化显示第一层
        const keyList = list.map(rawNode => rawNode[ganttChartContext.fieldNames.key])
        showKeySet.value = new Set(keyList)
    },
    {
        immediate: true
    }
)

// 树扁平化
const flattenTree = (treeList = []) => {
    const flattenList = []

    function traverse (list, level) {
        const _list = []
        list.forEach(rawNode => {
            // 从 原节点数据中 取 key
            const key = rawNode[ganttChartContext.fieldNames.key]

            // 规范化节点
            const node = {
                key,
                level,
                data: rawNode,
                label: rawNode[ganttChartContext.fieldNames.label],
                startDate: rawNode[ganttChartContext.fieldNames.startDate],
                endDate: rawNode[ganttChartContext.fieldNames.endDate],
                color: rawNode[ganttChartContext.fieldNames.color],
                isExpand: expandKeySet.value.has(key),
                isShow: showKeySet.value.has(key)
            }

            _list.push(node)
            flattenList.push(node)

            // 从 原节点数据中 取 children
            const children = rawNode[ganttChartContext.fieldNames.children]

            if (Array.isArray(children)) {
                node.children = traverse(children, level + 1)
            }
        })
        return _list
    }

    traverse(treeList, 1)

    return flattenList
}

// 展开 / 折叠 节点
const toggleNode = (node, expand) => {
    expand ? expandKeySet.value.add(node.key) : expandKeySet.value.delete(node.key)
    if (expand) {
        // 展开
        recursionSetIsShowByIsExpand(node)
    } else {
        // 折叠
        recursionSetIsShow(node, false)
    }
}

// 根据 node 的 isExpand, 递归设置 children 的 isShow
const recursionSetIsShowByIsExpand = node => {
    node.children?.forEach(child => {
        expandKeySet.value.has(node.key)
            ? showKeySet.value.add(child.key)
            : showKeySet.value.delete(child.key)
        if (Array.isArray(child.children)) {
            recursionSetIsShowByIsExpand(child)
        }
    })
}

// 递归设置 node.children 的 isShow
const recursionSetIsShow = (node, isShow) => {
    node.children?.forEach(child => {
        isShow ? showKeySet.value.add(child.key) : showKeySet.value.delete(child.key)
        if (Array.isArray(child.children)) {
            recursionSetIsShow(child, isShow)
        }
    })
}

/**
 * 获取块状态
 * @param {{
 *  startDate: string,
 *  endDate: string,
 *  chartStartDate: string,
 *  dayWidth: number
 * }} options 选项
 */
const getBlockState = (options = {}) => {
    let { startDate, endDate, chartStartDate, dayWidth = 0, fillEndDate } = options

    if (!startDate || !endDate || !chartStartDate) {
        return {
            left: 0,
            width: 0
        }
    }

    const oneHourWidth = dayWidth / 24

    if (fillEndDate) {
        endDate = dayjs(endDate).endOf('days').format('YYYY-MM-DD HH:mm:ss:SSS')
    }

    // dayjs(a).diff(b, 'hours') => a - b
    const offsetHour = dayjs(startDate).diff(chartStartDate, 'hours')
    const durationHour = dayjs(endDate).diff(startDate, 'hours')

    const left = oneHourWidth * offsetHour
    const width = oneHourWidth * durationHour

    return {
        left,
        width
    }
}

const getBlockStyle = item => {
    // 当前项的开始结束日期
    const { startDate, endDate } = item

    // 时间轴的开始和结束日期
    const { startDate: chartStartDate, endDate: chartEndDate } = ganttChartContext

    const { left, width } = getBlockState({
        startDate,
        endDate,
        chartStartDate,
        dayWidth: ganttChartContext.dayWidth,
        fillEndDate: ganttChartContext.fillEndDate
    })

    return {
        left: `${left}px`,
        width: `${width}px`,
        backgroundColor: item.color
    }
}

/**
 * 生成单元格样式
 * @param {{
 *  color: string,
 *  cellWidth: number,
 *  cellHeight: number,
 *  borderWidth: number
 * }} options 选项
 */
const genCellBgStyle = (options = {}) => {
    const { color, cellWidth, cellHeight, borderWidth } = options
    // 横线
    const horizontalLine = `
    linear-gradient(
        transparent calc(100% - ${borderWidth}px),
        ${color} calc(100% - ${borderWidth}px),
        ${color} 100%
    )
    `.trim()

    // 竖线
    const verticalLine = `
    linear-gradient(
        90deg,
        transparent calc(100% - ${borderWidth}px),
        ${color} calc(100% - ${borderWidth}px),
        ${color} 100%
    )
    `.trim()

    /** @type {import('vue').CSSProperties} */
    const style = {
        backgroundImage: `${horizontalLine}, ${verticalLine}`,
        backgroundSize: `${cellWidth}px ${cellHeight}px`
    }

    return style
}

const flattenList = computed(() => {
    const treeList = ganttChartContext.treeList || []
    const _list = flattenTree(treeList)
    return _list
})

const getBindContext = item => {
    return {
        item,
        toggleNode,
        getBlockState,
        getBlockStyle,
        ganttChartContext
    }
}

defineExpose({
    rightListElRef,
    leftListElRef,
    toggleNode,
    getBlockState,
    genCellBgStyle
})
</script>

<style lang="scss" scoped>
@mixin genCellBg(
    $color: rgba(255, 255, 255),
    $cellWidth: 24px,
    $cellHeight: 30px,
    $borderWidth: 1px
) {
    background-image:
        // 横线
        linear-gradient(
            transparent calc(100% - $borderWidth),
            $color calc(100% - $borderWidth),
            $color 100%
        ),
        // 竖线
        linear-gradient(
            90deg,
            transparent calc(100% - $borderWidth),
            $color calc(100% - $borderWidth),
            $color 100%
        );
    background-size: $cellWidth $cellHeight;
}
.chart-content {
    width: 100%;
    height: 100%;
    display: flex;
    .left-list {
        flex-shrink: 0;
        width: var(--gantt-chart-left-list-width);
        display: flex;
        flex-flow: column nowrap;
        overflow: scroll;
        &::-webkit-scrollbar {
            width: 0;
        }
        :deep() {
            .default-row-item {
                flex-shrink: 0;
                height: var(--gantt-chart-row-height);
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                gap: 4px;
                border-bottom: 1px solid var(--gantt-chart-border-color);
                border-right: 1px solid var(--gantt-chart-border-color);
                .toggle-btn {
                    width: 20px;
                    height: 20px;
                    font-size: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;
                    transform: scaleX(1.2);
                }
                .toggle-btn-placeholder {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
    .right-list {
        flex: 1 0;
        overflow: scroll;
        :deep() {
            .default-row-item {
                position: relative;
                height: var(--gantt-chart-row-height);
                @include genCellBg(
                    var(--gantt-chart-border-color),
                    var(--gantt-chart-right-list-cell-width),
                    var(--gantt-chart-row-height),
                    1px
                );
                .default-row-item-block {
                    --block-y-offset: 10px;
                    position: absolute;
                    top: var(--block-y-offset);
                    height: calc(var(--gantt-chart-row-height) - (var(--block-y-offset) * 2));
                }
            }
        }
    }
}
</style>
