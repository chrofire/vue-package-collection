/**
 * 执行请求
 * @param {(params?: unknown) => Promise<unknown>} fetchFn 获取数据函数
 * @param {Record<string, unknown>} params 参数
 * @param {{ defaultResult?: unknown }} options 选项
 * @returns {Promise<unknown>} 结果
 * @example
const result = await doRequest(async () => [], {}, { defaultResult: [] })
 */
export const doRequest = (fetchFn, params = {}, options = {}) => {
    const { defaultResult = [] } = options

    return new Promise(async resolve => {
        try {
            const result = (await fetchFn(params)) || defaultResult
            resolve(result)
        } catch (error) {
            resolve(defaultResult)
        }
    })
}

export const CreateDictListType =/** @type {const} */ ({
    PURE_LIST: 'PURE_LIST',
    LIST: 'LIST',
    TREE: 'TREE'
})

/**
 * 创建字典
 * @description
 * ```js
 * 1. 纯列表 ['a', 'b']
 * 2. 列表 [{ label: 'a', value: 'a' }]
 * 3. 树形列表 [{ label: 'a', value: 'a', children: [{ label: 'b', value: 'b' }] }]
 * ```
 * @template {Record<string, unknown> | string | number} T
 * @param {T[]} list
 * @param {import ('./data.types').CreateDictOpts=} options
 * @returns
 */
export function createDict (list, options) {
    const {
        fromLabel = 'label',
        fromValue = 'value',
        fromChildren = 'children',
        toLabel = 'label',
        toValue = 'value',
        toChildren = 'children',
        listType = createDict.ListType.LIST
    } = options || {}

    /** @type {Record<string, unknown>} */
    const _map = {}

    // pureList
    function traversePureList (/** @type {(string | number)[]} */ list = []) {
        return list.map(item => {
            const label = item
            const value = item

            const _item = {
                [toLabel]: label,
                [toValue]: value
            }

            _map[value] = _item

            return _item
        })
    }

    // list | tree
    function traverseList (/** @type {Record<string, any>[]} */ list = []) {
        return list.map(item => {
            item = { ...item }
            const label = item[fromLabel]
            const value = item[fromValue]
            const children = item[fromChildren]

            const _item = {
                ...item,
                [toLabel]: label,
                [toValue]: value
            }

            _map[value] = _item

            if (
                listType === createDict.ListType.TREE
                && Array.isArray(children)
                && children.length
            ) {
                Reflect.deleteProperty(_item, fromChildren)
                Reflect.set(_item, toChildren, traverseList(children))
            }

            return _item
        })
    }

    /** @type {Record<string, any>[]} */
    let _list = []

    switch (listType) {
        case createDict.ListType.PURE_LIST: {
            _list = traversePureList(list)
            break
        }
        case createDict.ListType.LIST:
        case createDict.ListType.TREE: {
            _list = traverseList(list)
            break
        }
        default:
            break
    }

    return {
        list: _list,
        map: _map
    }
}
createDict.ListType = CreateDictListType
