export type DayItem = {
    rawData: string,
    year: string,
    quarter: number,
    month: string,
    day: string,
    yearMonth: string,
    yearQuarter: string,
    width: number
}

export type YearItem = {
    rawData: string,
    year: string,
    dayList: DayItem[],
    width: number
}

export type QuarterItem = {
    rawData: string,
    year: string,
    quarter: number,
    dayList: DayItem[],
    width: number
}

export type MonthItem = {
    rawData: string,
    year: string,
    month: string,
    dayList: DayItem[],
    width: number
}
