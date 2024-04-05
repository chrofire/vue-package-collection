import { ElLoading } from 'element-plus'
import { toValue } from 'vue'

/**
 * useLoading
 * @param {{
 *  target?: import('vue').MaybeRefOrGetter<HTMLElement>,
 *  [key: string]: unknown
 * }} options 选项
 */
export const useLoading = (options = {}) => {
    let instance = null

    let target = null

    const start = () => {
        if (instance) return

        const { target: _target } = options
        target = toValue(_target)
        instance = ElLoading.service({
            ...options,
            target
        })
    }

    const stop = () => {
        instance?.close()
        instance = null
        target = null
    }

    return {
        start,
        stop
    }
}
