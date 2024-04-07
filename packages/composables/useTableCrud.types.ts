import type { MaybeRefOrGetter } from 'vue'

export type UseTableCrudOpts = {
    /** 查询参数 */
    searchParams?: MaybeRefOrGetter<Record<string, unknown>>,
    /** 列表 api 函数 */
    listApi?: Function,
    /** 删除 api 函数 */
    deleteApi?: Function,
    /** 列表 api 函数 是否返回分页数据 */
    isPageList?: boolean,
    /** 执行 列表 api 时是否传递分页参数 */
    withPaginationParams?: boolean,
    /** onMounted 时执行 列表 api 函数 */
    getListDataOnMounted?: boolean,
    /** 删除 api 查询参数 { [deleteKey]: row[deleteValueKey] } */
    deleteKey?: string,
    /** 删除 api 查询参数 { [deleteKey]: row[deleteValueKey] } */
    deleteValueKey?: string,
    /** 删除确认消息 */
    deleteConfirmMessage?: string,
    /** 获取列表数据成功后 */
    onAfterGetListData?: Function
}
