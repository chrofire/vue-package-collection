/**
 * @typedef {{
 *  id: string,
 *  label: string,
 *  children?: TreeNode[]
 * }} TreeNode
 */

/**
* 创建树形数据
* @param {number} arrayLength 数组长度
* @param {number} maxDeep 最大深度
* @param {number} maxChildrenLength 最大 children 长度
* @param {string} key 唯一 key
* @param {number} _deep 内部深度变量
* @returns {TreeNode[]}
* @example
// 创建 长度为 5, 深度为 2, children最大长度为 3 的树形数据
const data = createTreeData(5, 2, 3)
*/
export const createTreeData = (arrayLength, maxDeep, maxChildrenLength, key = 'node', _deep = 1) => {
    let id = 0
    return Array.from({ length: arrayLength }).map(() => {
        // children数组长度
        const childrenLength = _deep === maxDeep ? 0 : Math.round(Math.random() * maxChildrenLength)
        // 节点key
        const nodeKey = `${key}-${++id}`
        return {
            id: nodeKey,
            label: nodeKey,
            // 达到最大深度时, children 为 undefined
            children: childrenLength
                ? createTreeData(childrenLength, maxDeep, maxChildrenLength, nodeKey, _deep + 1)
                : undefined
        }
    })
}

/**
* 数组 转 树
* @param {unknown[]} list 数组
* @param {{
*   idField?: string,
*   parentIdField?: string,
*   childrenField?: string,
*   fullResult?: boolean
* }} options 选项
* @example
const result = listToTree([], { fullResult: true })
*/
export const listToTree = (list, options = {}) => {
    const {
        idField = `id`,
        parentIdField = `parentId`,
        childrenField = `children`,
        fullResult = false
    } = options

    const _list = []
    const map = {}
    const tree = []

    list.forEach(node => {
        node = { ...node }
        _list.push(node)
        map[node[idField]] = node
    })

    _list.forEach(node => {
        const parent = map[node[parentIdField]]
        if (parent) {
            void (parent[childrenField] || (parent[childrenField] = [])).push(node)
        } else {
            tree.push(node)
        }
    })

    if (fullResult) {
        return {
            list: _list,
            map,
            tree
        }
    }

    return tree
}

/**
* 树 转 数组
* @param {unknown[]} tree 树
* @param {{
*   childrenField?: string,
*   fullResult?: boolean
* }} options 选项
* @example
const result = treeToList([], { fullResult: true })
*/
export const treeToList = (tree, options = {}) => {
    const { childrenField = `children`, fullResult = false } = options

    const list = []

    function recursion (data) {
        data.forEach(node => {
            node = { ...node }

            list.push(node)

            const children = node[childrenField]

            if (Array.isArray(children)) {
                recursion(children)
            }

            // 删除 children 字段
            delete node[childrenField]
        })
    }

    recursion(tree)

    if (fullResult) {
        return {
            list,
            tree
        }
    }

    return list
}

/**
* 树 转 节点映射
* @param {unknown[]} tree 树
* @param {{
*   idField?: string,
*   childrenField?: string,
*   _map?: Record<string, unknown[]>
* }} options 选项
* @returns {Record<string, unknown[]>} 节点映射
* @example
const result = treeToMap([])
*/
export const treeToMap = (tree, options = {}) => {
    const { idField = `id`, childrenField = `children`, _map = {}} = options

    tree.forEach(node => {
        _map[node[idField]] = node

        const children = node[childrenField]

        if (Array.isArray(children)) {
            treeToMap(children, {
                idField,
                childrenField,
                _map
            })
        }
    })

    return _map
}

/**
* 过滤掉树指定节点及其子节点
* @param {unknown[]} tree 树
* @param {unknown[]} idList 需要过滤掉的节点id数组
* @param {{
*   idField?: boolean,
*   childrenField?: string
* }} options 选项
* @returns {unknown[]}
* @example
const result = filterTreeNodes([])
*/
export const filterTreeNodes = (tree, idList = [], options = {}) => {
    const { idField = `id`, childrenField = `children` } = options

    const list = tree.map(node => {
        if (idList.includes(node[idField])) {
            return null
        }

        if (!node[childrenField]) return node

        return {
            ...node,
            [childrenField]: filterTreeNodes(node[childrenField], idList, options)
        }
    })

    return list.filter(Boolean)
}

/**
* 递归查找第一个符合条件的节点
* @param {unknown[]} tree 树
* @param {(node: Record<string, unknown>) => boolean} condition 条件
* @param {{
*   childrenField?: string
* }} options 选项
* @example
const result = findTreeNode([])
*/
export const findTreeNode = (tree, condition = node => false, options = {}) => {
    const { childrenField = `children` } = options
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]

        if (condition(node)) {
            return node
        }

        if (Array.isArray(node[childrenField])) {
            const result = findTreeNode(node[childrenField], condition, options)
            if (result) {
                return result
            }
        }
    }
}
