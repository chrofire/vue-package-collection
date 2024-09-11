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
export const createTreeData = (
    arrayLength,
    maxDeep,
    maxChildrenLength,
    key = 'node',
    _deep = 1
) => {
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
* @param {Record<string, unknown>[]} list 数组
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
* @param {Record<string, unknown>[]} tree 树
* @param {{
*   idField?: string,
*   childrenField?: string,
*   fullResult?: boolean
* }} options 选项
* @example
const result = treeToList([], { fullResult: true })
*/
export const treeToList = (tree, options = {}) => {
    const { idField = `id`, childrenField = `children`, fullResult = false } = options

    const list = []
    const map = {}
    const _tree = []

    function recursion (data, level = 1) {
        data.forEach(node => {
            const children = node[childrenField]

            node = { ...node }

            map[node[idField]] = node

            if (level === 1) {
                _tree.push(node)
            }

            list.push(node)

            if (Array.isArray(children)) {
                recursion(children, level + 1)
            }
        })
    }

    recursion(tree)

    if (fullResult) {
        return {
            list,
            map,
            tree: _tree
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
* 根据条件过滤掉树节点及其子节点
* @param {unknown[]} tree 树
* @param {(node: Record<string, unknown>) => boolean} condition 条件
* @param {{
*   childrenField?: string
* }} options 选项
* @returns {unknown[]}
* @example
const result = filterTreeNodes([], () => false)
*/
export const filterTreeNodes = (tree, condition = node => false, options = {}) => {
    const { childrenField = `children` } = options

    const list = []

    tree.forEach(node => {
        if (!condition(node)) {
            const newNode = { ...node }

            const children = newNode[childrenField]

            if (Array.isArray(children) && children.length) {
                newNode[childrenField] = filterTreeNodes(children, condition, options)
            }

            list.push(newNode)
        }
    })

    return list
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
