import { randomRgbColor } from './color'

/**
 * 生成占位图片
 * @param {number} width 宽度
 * @param {number} height 高度
 * @param {{
 *  textContent?: string,
 *  randomColor?: boolean,
 *  color?: string,
 *  textColor?: string,
 *  fontSize?: number,
 *  dataURL?: boolean,
 *  blob?: boolean,
 *  objectURL?: boolean
 * }} options 选项
 */
export const genPlaceholderImage = async (width = 100, height = 100, options = {}) => {
    let {
        textContent = `${width} X ${height}`,
        randomColor = true,
        color = '#000',
        textColor = '#fff',
        fontSize = Math.floor(width / 10),
        dataURL = true,
        blob = false,
        objectURL = false
    } = options

    randomColor && (color = randomRgbColor())

    // 创建 canvas
    const canvasEl = document.createElement('canvas')
    // 设置 canvas 宽高
    canvasEl.width = width
    canvasEl.height = height

    // 创建 画布
    const ctx = canvasEl.getContext('2d')
    // 设置 画布 背景色
    ctx.fillStyle = color
    // 填充 画布 背景
    ctx.fillRect(0, 0, width, height)

    // 设置 画布 字体大小
    ctx.font = `${fontSize}px ${ctx.font.split(' ').pop()}`
    // 设置 画布 字体颜色
    ctx.fillStyle = textColor

    // 获取 文本 尺寸
    const textMetrics = ctx.measureText(textContent)
    // 文本 字符串 的 宽度
    const textWidth = textMetrics.width
    // 文本 字符串 的 高度
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
    // 填充 文本 到 画布 中间
    ctx.fillText(
        textContent,
        width / 2 - textWidth / 2,
        height / 2 + textHeight / 2
    )

    // 返回 画布 图片
    const result = {
        /** @type {string | null} */
        dataURL: dataURL ? canvasEl.toDataURL('image/png') : null,
        /** @type {Blob | null} */
        blob: null,
        /** @type {string | null} */
        objectURL: null
    }

    if (blob || objectURL) {
        const _blob = await new Promise(resolve => {
            canvasEl.toBlob(blob => {
                // 二进制文件对象
                resolve(blob)
            }, 'image/png')
        })
        if (blob) Object.assign(result, { blob: _blob })
        if (objectURL) {
            Object.assign(result, { objectURL: URL.createObjectURL(_blob) })
        }
        return result
    } else {
        return result
    }
}
