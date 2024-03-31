import type { MaybeRefOrGetter } from 'vue'

export type UseCustomDictOpts = {
    /** 获取数据函数 */
    fetchFn: (...args: unknown[]) => Promise<unknown>,
    /** 参数 */
    params?: MaybeRefOrGetter<unknown>,
    /** label 键名 */
    labelFieldKey?: string,
    /** label 取值字段 */
    labelField?: string,
    /** value 键名 */
    valueFieldKey?: string,
    /** value 取值字段 */
    valueField?: string,
    /** 转换结果函数 */
    transformResultFn?: (context: { list: unknown[], map: Record<string, unknown> }) => void,
    /** 立即执行 */
    immediate?: boolean
}
