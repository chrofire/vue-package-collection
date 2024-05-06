<template>
    <div class="time-line" ref="timeLineElRef">
        <div class="time-line__wrapper" :style="{ width: `${fullWidth}px` }">
            <div class="time-line__axis-list year-list" v-if="axisList.includes('year')">
                <div
                    class="time-line__axis-list-item year-item"
                    v-for="item in state.yearList"
                    :key="item.rawData"
                    :style="{ width: `${item.width}px` }"
                >
                    <slot name="year" :item="item">
                        <div class="default-content">{{ item.year }}年</div>
                    </slot>
                </div>
            </div>
            <div class="time-line__axis-list month-list" v-if="axisList.includes('quarter')">
                <div
                    class="time-line__axis-list-item quarter-item"
                    v-for="item in state.quarterList"
                    :key="item.rawData"
                    :style="{ width: `${item.width}px` }"
                >
                    <slot name="quarter" :item="item">
                        <div class="default-content">{{ item.rawData }}</div>
                    </slot>
                </div>
            </div>
            <div class="time-line__axis-list month-list" v-if="axisList.includes('month')">
                <div
                    class="time-line__axis-list-item month-item"
                    v-for="item in state.monthList"
                    :key="item.rawData"
                    :style="{ width: `${item.width}px` }"
                >
                    <slot name="month" :item="item">
                        <div class="default-content">{{ item.month }}月</div>
                    </slot>
                </div>
            </div>
            <div class="time-line__axis-list day-list" v-if="axisList.includes('day')">
                <div
                    class="time-line__axis-list-item day-item"
                    v-for="item in state.dayList"
                    :key="item.rawData"
                    :style="{ width: `${item.width}px` }"
                >
                    <slot name="day" :item="item">
                        <div class="default-content">{{ item.day }}</div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="jsx" setup>
import { getDateBetween } from '@/utils/time'
import { groupBy } from 'lodash-es'
import { computed, reactive, ref, watch } from 'vue'

defineOptions({
    name: 'GanttChartTimeLine'
})

const props = defineProps({
    /** 显示的轴列表 */
    axisList: {
        /** @type {import('vue').PropType<('year' | 'quarter' | 'month' | 'day')[]>} */
        type: Array,
        default: () => ['year', 'month', 'day']
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
    }
})

/** @type {import('vue').Ref<HTMLElement>} */
const timeLineElRef = ref()

const state = reactive({
    /** @type {import('./types').YearItem[]} */
    yearList: [],
    /** @type {import('./types').QuarterItem[]} */
    quarterList: [],
    /** @type {import('./types').MonthItem[]} */
    monthList: [],
    /** @type {import('./types').DayItem[]} */
    dayList: []
})

/** 完整宽度 */
const fullWidth = computed(() => state.dayList.reduce((prev, current) => prev + current.width, 0))

/**
 * 生成列表
 * @param {string} startDate
 * @param {string} endDate
 */
const genList = (startDate, endDate) => {
    // 天
    const dayList = getDateBetween(startDate, endDate).map(item => {
        const [year, month, day] = item.split('-')
        const quarter = Math.ceil(Number(month) / 3)
        return {
            // 原始数据
            rawData: item,
            year,
            quarter,
            month,
            day,
            yearMonth: `${year}-${month}`,
            yearQuarter: `${year}-Q${quarter}`,
            width: getItemWidth('day')
        }
    })

    // 年
    // 划分每一年的 天 数组
    const yearMap = groupBy(dayList, 'year')
    const yearList = [...new Set(dayList.map(item => item.year))].map(item => {
        // 当前年的 天 数组
        const dayList = yearMap[item]
        return {
            rawData: item,
            year: item,
            dayList,
            width: getItemWidth('year', dayList)
        }
    })

    // 季
    // 划分每个季度的 天 数组
    const yearQuarterMap = groupBy(dayList, 'yearQuarter')
    const quarterList = [...new Set(dayList.map(item => item.yearQuarter))].map(item => {
        let [year, quarter] = item.split('-')
        quarter = Number(quarter.slice(1))
        // 当前年季的 天 数组
        const dayList = yearQuarterMap[item]
        return {
            rawData: item,
            year,
            quarter,
            dayList,
            width: getItemWidth('quarter', dayList)
        }
    })

    // 月
    // 划分每个月的 天 数组
    const yearMonthMap = groupBy(dayList, 'yearMonth')
    const monthList = [...new Set(dayList.map(item => item.yearMonth))].map(item => {
        const [year, month] = item.split('-')
        // 当前年月的 天 数组
        const dayList = yearMonthMap[item]
        return {
            rawData: item,
            year,
            month,
            dayList,
            width: getItemWidth('month', dayList)
        }
    })

    return {
        yearList,
        quarterList,
        monthList,
        dayList
    }
}

/**
 * 获取 天 | 月 | 季 | 年 的宽度
 * @template {{ width: number }} T
 * @param {'day' | 'month' | 'year'} type
 * @param {T[]} dayList
 */
const getItemWidth = (type, dayList = []) => {
    switch (type) {
        case 'day': {
            return props.dayWidth
        }
        case 'month':
        case 'quarter':
        case 'year': {
            return dayList.reduce((prev, item) => prev + item.width, 0)
        }
        default:
            return 0
    }
}

/** 重置状态 */
const resetState = () => {
    Object.assign(state, {
        yearList: [],
        quarterList: [],
        monthList: [],
        dayList: []
    })
}

watch(
    () => [props.startDate, props.endDate],
    newVal => {
        const [startDate, endDate] = newVal
        if (!startDate || !endDate) return resetState()

        resetState()
        const listData = genList(startDate, endDate)
        Object.assign(state, listData)
    },
    {
        immediate: true
    }
)

defineExpose({
    timeLineElRef,
    state,
    fullWidth
})
</script>

<style lang="scss" scoped>
.time-line {
    --time-line-bg-color: #f7f7fa;
    --time-line-text-color: rgba(0, 0, 0, 0.88);
    --time-line-border-color: rgba(5, 5, 5, 0.08);
    width: 100%;
    height: 100%;
    overflow: scroll;
    .time-line__wrapper {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        background-color: var(--time-line-bg-color);
        .time-line__axis-list {
            flex: 1 0;
            display: flex;
            border-bottom: 1px solid var(--time-line-border-color);
            .time-line__axis-list-item {
                display: flex;
                border-right: 1px solid var(--time-line-border-color);
                overflow: hidden;
                &:last-child {
                    border-right: none;
                }
                .default-content {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--time-line-text-color);
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
