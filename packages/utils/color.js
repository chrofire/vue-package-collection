/**
 * 随机生成RGB颜色
 */
export const randomRgbColor = () => {
    // 随机生成256以内的值
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    // 返回rgb(r, g, b)格式颜色
    return `rgb(${r}, ${g}, ${b})`
}

/**
 * 随机生成RGBA颜色
 */
export const randomRgbaColor = () => {
    // 随机生成256以内的值
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    // 随机生成1以内的值
    const alpha = Math.random().toFixed(2)
    // 返回rgba(r, g, b, a)格式颜色
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * 随机生成十六进制颜色
 */
export const randomHexColor = () => {
    // 随机生成256以内的值 并转成16进制
    const r = Math.floor(Math.random() * 256).toString(16)
    const g = Math.floor(Math.random() * 256).toString(16)
    const b = Math.floor(Math.random() * 256).toString(16)
    // 返回Hex格式颜色
    return `#${r}${g}${b}`
}
