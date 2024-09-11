import type { MaybeRefOrGetter } from 'vue'
import type { CreateDictOpts } from '../utils/data.types'

export type UseCustomDictOpts = {
    /** 获取数据函数 */
    fetchFn: (...args: unknown[]) => Promise<unknown[]>,
    /** 参数 */
    params?: MaybeRefOrGetter<unknown>,
    /** 转换结果函数 */
    transformResultFn?: (context: { result: unknown[], state: Record<string, unknown> }) => void,
    /** 立即执行 */
    immediate?: boolean
} & CreateDictOpts
