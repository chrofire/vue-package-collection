/**
 * @typedef {{
 *    throwError?: boolean,
 *    errorMessage?: string
 *} & Partial<Pick<HTMLInputElement, 'accept' | 'multiple'>>} OpenFilePickerOpts
 */

/**
 * 选择文件
 * @param {OpenFilePickerOpts=} options 选项
 * @example
 * const fileList = await openFilePicker({ accept: '.xls,.xlsx' })
 */
export async function openFilePicker (options) {
    const {
        accept = '*',
        multiple = false,
        throwError = true,
        errorMessage = '未选择文件'
    } = options || {}

    /** @type {(value: File[]) => void} */
    let resolve
    /** @type {(reason: Error) => void} */
    let reject
    /** @type {Promise<File[]>} */
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve
        reject = _reject
    })

    /** @type {HTMLInputElement | null} */
    let inputEl = document.createElement('input')
    inputEl.type = 'file'
    inputEl.accept = accept
    inputEl.multiple = multiple

    // 确定
    inputEl.onchange = e => {
        /** @type {HTMLInputElement} */
        const target = e.target
        const files = Array.from(target.files)
        inputEl = null
        resolve(files)
    }

    // 取消
    inputEl.oncancel = e => {
        /** @type {HTMLInputElement} */
        const target = e.target
        const files = Array.from(target.files)
        inputEl = null
        throwError ? reject(new Error(errorMessage)) : resolve(files)
    }

    inputEl.click()

    return promise
}
