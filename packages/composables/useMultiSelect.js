import { toValue, reactive, computed } from 'vue'

/**
 * 多选状态
 * @template {Record<string | number, unknown>} Row
 * @param {import('./useMultiSelect.types').UseMultiSelectOpts<Row>} options 选项
 */
export const useMultiSelect = options => {
    const {
        keyField = 'id',
        list = [],
        toggleRowSelect,
        max,
        isSingle = false,
        isAllowCancel = false
    } = options

    /**
     * keyField 类型
     * @typedef {string | number} Key
     */

    /**
     * 列表映射
     * @type {import('vue').ComputedRef<Map<Key, Row>>}
     */
    const listMap = computed(() => {
        return toValue(list).reduce((prev, current) => {
            prev.set(current[keyField], current)
            return prev
        }, new Map())
    })

    /**
     * 选中映射
     * @type {import('vue').UnwrapNestedRefs<Map<Key, Row>>}
     */
    const selectedMap = reactive(new Map())

    /** 是否已选中 */
    const isSelected = (/** @type {Row} */ row) => {
        return selectedMap.has(row[keyField])
    }

    /** 更新行选中状态 */
    const updateRowSelect = (/** @type {Row} */ row) => {
        // 单选
        if (isSingle) {
            if (isSelected(row)) {
                // 已选中
                // 允许取消则清除所有选中项
                if (isAllowCancel) selectedMap.clear()
            } else {
                // 未选中
                selectedMap.clear()
                selectedMap.set(row[keyField], row)
            }
            updateView()
            return
        }

        // 多选
        if (isSelected(row)) {
            // 已选中
            selectedMap.delete(row[keyField])
        } else {
            // 未选中
            // 最大值限制
            if (typeof max === 'number' && selectedMap.size >= max) return
            selectedMap.set(row[keyField], row)
        }
        updateView()
    }

    /** 更新视图 */
    const updateView = () => {
        toValue(listMap).forEach(row => {
            toggleRowSelect(row, isSelected(row))
        })
    }

    /** 清除 */
    const clear = () => {
        selectedMap.clear()
        updateView()
    }

    /** 同步最新的行数据到 selectedMap */
    const syncLatestData = () => {
        toValue(listMap).forEach(row => {
            isSelected(row) && selectedMap.set(row[keyField], row)
        })
    }

    return {
        listMap,
        selectedMap,
        isSelected,
        updateRowSelect,
        updateView,
        clear,
        syncLatestData
    }
}
