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
