/**
 * 创建 命令式 promise
 * @description 用于 在 promise 外部 调用 resolve reject cancel
 * @param {Promise<unknown>=} _promise promise 实例
 */
export const createImperativePromise = _promise => {
    let resolve = null
    let reject = null

    // promise 实例
    const promise = new Promise((_resolve, _reject) => {
        // 保存 resolve & reject
        resolve = _resolve
        reject = _reject
    })

    // 执行 resolve
    const execResolve = value => {
        resolve && resolve(value)
    }

    // 执行 reject
    const execReject = reason => {
        reject && reject(reason)
    }

    // 执行 cancel
    const execCancel = () => {
        // 置空, 让 promise 永远不会 resolve/reject
        resolve = null
        reject = null
    }

    // 如果传入了 promise, 则在 promise状态变更后自动触发 resolve/reject
    _promise && _promise.then(execResolve, execReject)

    return {
        promise,
        resolve: execResolve,
        reject: execReject,
        cancel: execCancel
    }
}

/**
 * 创建并发异步任务
 * @param {number} max 最大并发数
 */
export const createConcurrentTask = (max = 3) => {
    // 任务队列
    const queue = []

    // 执行任务
    const doTask = () => {
        // 没有达到并发上限, 并且队列中还有任务
        while (max > 0 && queue.length > 0) {
            // 取出 队首 任务
            const task = queue.shift()
            // 并发数 减 1
            max--
            task().finally(() => {
                // 任务完成后 恢复 并发数 加 1
                max++
                // 执行任务, 可能还有任务可以执行
                doTask()
            })
        }
    }

    // 添加任务
    const addTask = (...task) => {
        // 添加任务进队列
        queue.push(...task)
        // 执行任务
        doTask()
    }

    return {
        addTask
    }
}

/**
 * 只生效 最后一次 promise
 * @description 包装一个异步函数, 连续调用这个异步函数, 只让最后一次的 promise 生效
 * (在每次调用异步函数前, cancel 掉上一次调用返回的promise)
 * @param {(...args: unknown[]) => Promise<unknown>} asyncFn 异步函数
 */
export const onlyTakeEffectLastPromise = asyncFn => {
    // 上一次 命令式 promise 的 cancel 方法
    let cancelPrevious = null

    // 包装传入的异步函数
    const wrappedAsyncFn = (...args) => {
        // 先 cancel 上一次 promise
        cancelPrevious && cancelPrevious()

        // 执行异步函数
        const _promise = asyncFn(...args)

        // 创建 指令式 promise, 保存 cancel 方法
        const { promise, cancel } = createImperativePromise(_promise)
        cancelPrevious = cancel

        // 每次调用 wrappedAsyncFn, 上一次的 promise 的 resolve/reject 被置空
        // 即 上一次的 promise 的状态 永远是 pending

        return promise
    }

    return wrappedAsyncFn
}
