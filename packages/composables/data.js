import { cloneDeep } from 'lodash-es'
import { reactive, ref, toRefs, toValue } from 'vue'

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

/**
 * 自定义字典
 * @param {import('./data.types').UseCustomDictOpts} options 选项
 * @example
const { list, map, refresh, reset } = useCustomDict({
    fetchFn: async () => [],
    params: {},
    immediate: true
})
 */
export const useCustomDict = options => {
    const {
        fetchFn = async () => {},
        params = {},
        labelFieldKey = 'label',
        labelField = 'label',
        valueFieldKey = 'value',
        valueField = 'value',
        transformResultFn,
        immediate = true
    } = options || {}

    /**
     * @type {{ list: unknown[], map: Record<string, unknown> }}
     */
    const state = reactive({
        list: [],
        map: {}
    })

    /** 刷新 */
    const refresh = () => {
        return fetchFn(toValue(params))
            .then((result = []) => {
                // 转换结果
                if (typeof transformResultFn === 'function') {
                    transformResultFn({ result, state })
                    return
                }

                const map = {}

                const list = result.map(item => {
                    const label = item[labelField]
                    const value = item[valueField]
                    const result = {
                        ...item,
                        // 覆盖
                        [labelFieldKey]: label,
                        [valueFieldKey]: value
                    }
                    map[value] = result
                    return result
                })

                Object.assign(state, {
                    map,
                    list
                })
            })
            .catch(error => {
                // reset()
            })
    }

    /** 重置 */
    const reset = () => {
        Object.assign(state, {
            list: [],
            map: {}
        })
    }

    // 立即执行
    if (immediate) refresh()

    return {
        ...toRefs(state),
        refresh,
        reset
    }
}
