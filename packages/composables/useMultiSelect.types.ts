import { MaybeRefOrGetter } from "vue"

export type UseMultiSelectOpts<Row> = {
    /** key 字段 */
    keyField?: string,
    /** 列表 */
    list: MaybeRefOrGetter<Row[]>,
    /** 最大值 (多选可用) */
    max?: number,
    /** 是否单选 */
    isSingle?: boolean,
    /** 是否允许取消选中 (单选可用) */
    isAllowCancel?: boolean,
    /** 切换行选中 */
    toggleRowSelect: (row: Row, select?: boolean) => void
}
