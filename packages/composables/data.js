import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'

/**
 * 数据
 * @param {unknown} initialValue 初始数据
 * @example
const { data, resetData, updateDataCache } = useData()
 */
export const useData = initialValue => {
    /** 缓存 */
    let cache
    /** 数据 */
    const data = ref(initialValue)

    updateDataCache(initialValue)

    /** 重置数据 为 缓存数据 */
    function resetData () {
        data.value = cloneDeep(cache)
    }

    /** 更新 缓存数据 */
    function updateDataCache (_data) {
        cache = cloneDeep(_data)
    }

    return {
        data,
        resetData,
        updateDataCache
    }
}
