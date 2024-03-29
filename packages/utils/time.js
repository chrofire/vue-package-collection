/**
 * 获取两个时间点之间的年份数组
 * @param {string} start 开始时间
 * @param {string} end 结束时间
 * @example
const result = getYearBetween('2021-01-01', '2025-01-01')
result: [2021, 2022, 2023, 2024, 2025]
 */
export const getYearBetween = (start, end) => {
    // 结果数组
    const result = []
    // 开始时间
    const startTime = new Date(start)
    // 结束时间
    const endTime = new Date(end)
    // 开始年份
    let startYear = startTime.getFullYear()
    // 结束年份
    const endYear = endTime.getFullYear()
    // 循环
    while (endYear >= startYear) {
        // 推入结果数组
        result.push(startYear)

        // 年份++
        startYear++
    }
    // 返回结果
    return result
}

/**
 * 获取两个时间点之间的月份数组
 * @param {string} start 开始时间
 * @param {string} end 结束时间
 * @example
const result = getMonthBetween('2021-01-01', '2021-05-05')
result: ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05']
 */
export const getMonthBetween = (start, end) => {
    // 结果数组
    const result = []

    // 开始时间
    const startTime = new Date(start)
    // 初始化为 1 号
    startTime.setDate(1)
    // 初始化为 0 点
    startTime.setHours(0, 0, 0, 0)

    // 结束时间
    const endTime = new Date(end)
    // 初始化为 1 号
    endTime.setDate(1)
    // 初始化为 0 点
    endTime.setHours(0, 0, 0, 0)

    // 循环
    while (endTime.getTime() >= startTime.getTime()) {
        // 开始年份
        const year = startTime.getFullYear()
        // 开始月份
        let month = (startTime.getMonth() + 1).toString()
        // 月份格式补全: 1 => 01
        if (month.length === 1) {
            month = `0${month}`
        }
        // 推入结果数组
        result.push(`${year}-${month}`)

        // 月份++, getMonth() 是从 0 开始的, 上面已经++了, 不需要再次++
        startTime.setMonth(Number(month))
    }
    // 返回结果
    return result
}

/**
 * 获取两个时间点之间的日期数组
 * @param {string} start 开始时间
 * @param {string} end 结束时间
 * @example
const result = getDateBetween('2021-01-01', '2021-02-01')
result: ['2021-01-01', '2021-01-02', ... , '2021-02-01']
 */
export const getDateBetween = (start, end) => {
    // 结果数组
    const result = []

    // 开始时间
    const startTime = new Date(start)
    // 初始化为 0 点
    startTime.setHours(0, 0, 0, 0)

    // 结束时间
    const endTime = new Date(end)
    // 初始化为 0 点
    endTime.setHours(0, 0, 0, 0)

    // 循环
    while (endTime.getTime() >= startTime.getTime()) {
        // 开始年份
        const year = startTime.getFullYear()
        // 开始月份
        let month = (startTime.getMonth() + 1).toString()
        // 开始日期
        let day = (startTime.getDate()).toString()
        // 月份格式补全: 1 => 01
        if (month.length === 1) {
            month = `0${month}`
        }
        // 日期格式补全: 1 => 01
        if (day.length === 1) {
            day = `0${day}`
        }
        // 推入结果数组
        result.push(`${year}-${month}-${day}`)

        // 日期++, Number: 日期格式补全 后 为 字符串, 需要还原成数字
        startTime.setDate(Number(day) + 1)
    }
    // 返回结果
    return result
}
