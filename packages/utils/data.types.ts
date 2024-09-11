import type { CreateDictListType } from './data'

export type CreateDictListTypeValue = typeof CreateDictListType[keyof typeof CreateDictListType]

export type CreateDictOpts = {
    /** label 取值字段 */
    fromLabel?: string,
    /** value 取值字段 */
    fromValue?: string,
    /** children 取值字段 */
    fromChildren?: string,
    /** label 键名 */
    toLabel?: string,
    /** value 键名 */
    toValue?: string,
    /** children 键名 */
    toChildren?: string,
    /** 列表类型 */
    listType?: CreateDictListTypeValue
}
