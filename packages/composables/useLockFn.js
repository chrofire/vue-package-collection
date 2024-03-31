import { ref } from 'vue'

/**
 * @name useLockFn (ref ver)
 * @description 用于给一个异步函数增加竞态锁, 防止并发执行
 * @param {(...args: unknown[]) => Promise<unknown>} asyncFn 异步函数
 * @param {number=} delay 用于延时解锁
 */
export const useLockFn = (asyncFn, delay) => {
    const isLocked = ref(false)

    const unlock = () => {
        if (typeof delay === 'number') {
            setTimeout(() => {
                isLocked.value = false
            }, delay)
        } else {
            isLocked.value = false
        }
    }

    const fn = async (...args) => {
        if (isLocked.value) return

        isLocked.value = true
        try {
            const result = await asyncFn(...args)
            unlock()
            return result
        } catch (error) {
            unlock()
            throw error
        }
    }

    Object.defineProperty(fn, 'isLocked', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: isLocked
    })

    return fn
}

/**
 * @name createLockFn (closure ver)
 * @description 用于给一个异步函数增加竞态锁, 防止并发执行
 * @param {(...args: unknown[]) => Promise<unknown>} asyncFn 异步函数
 * @param {number=} delay 用于延时解锁
 */
export const createLockFn = (asyncFn, delay) => {
    let isLocked = false

    const unlock = () => {
        if (typeof delay === 'number') {
            setTimeout(() => {
                isLocked = false
            }, delay)
        } else {
            isLocked = false
        }
    }

    return async (...args) => {
        if (isLocked) return

        isLocked = true
        try {
            const result = await asyncFn(...args)
            unlock()
            return result
        } catch (error) {
            unlock()
            throw error
        }
    }
}
