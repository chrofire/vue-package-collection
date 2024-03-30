/**
 * 生成 uuid
 */
export const genUUID = () => {
    // 创建一个 url
    const tempUrl = URL.createObjectURL(new Blob())
    // url 转换成 字符串
    const uuid = tempUrl.toString()
    // 释放 url
    URL.revokeObjectURL(tempUrl)
    // 截取 uuid
    return uuid.slice(uuid.lastIndexOf('/') + 1)
}
