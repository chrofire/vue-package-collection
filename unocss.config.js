import { defineConfig, presetIcons } from 'unocss'
import { presetMini } from 'unocss'

export default defineConfig({
    presets: [
        presetMini(),
        presetIcons({
            // 默认 只支持 块级元素
            // 添加 行内元素 支持
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle'
            }
        })
    ],
    variants: [
        {
            match: s => {
                if (s.startsWith('i-')) {
                    return {
                        matcher: s,
                        selector: s => {
                            if (s.startsWith('.dark')) return s
                            return s.startsWith('.') ? `${s}` : s
                        }
                    }
                }
            }
        }
    ]
})
