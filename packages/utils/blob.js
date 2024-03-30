/**
 * 下载 blob
 * @param {Blob} blob
 * @param {string} fileName 文件名
 */
export const downloadBlob = (blob, fileName = `example-${new Date().getTime()}.txt`) => {
    const el = document.createElement('a')
    el.style.display = 'none'
    el.download = fileName
    // create
    el.href = URL.createObjectURL(blob)
    document.body.appendChild(el)
    // trigger
    el.click()
    // revoke
    URL.revokeObjectURL(el.href)
    document.body.removeChild(el)
}

/**
 * blob 转 base64
 * @param {Blob} blob
 */
export const blobToBase64 = blob => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            resolve(reader.result)
        }
        reader.onerror = () => {
            reject(reader)
        }
    })
}

/**
 * blob 转 json
 * @param {Blob} blob
 */
export const blobToJson = blob => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsText(blob, 'utf-8')
        reader.onloadend = () => {
            resolve(JSON.parse(reader.result))
        }
        reader.onerror = () => {
            reject(reader)
        }
    })
}
